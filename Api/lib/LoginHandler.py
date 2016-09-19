# -*- coding: utf-8 -*-
__author__ = 'Hipeace86'
__datetime__ = '16-3-9'

from lib.urlmap import urlmap
from lib.basehandler import BaseHandler
from lib.tools import md5hash
from tornado import web
import datetime
from lib.RedisCache import RightsCache
from Right.Entity.UserModel import UserList
from Right.Entity.UserRoleModel import UserRoleList
from Right.Entity.RoleRightModel import RoleRightList
from Right.Entity.MenuModel import MenuList
from Right.Entity.UserLoginModel import UserLoginList
from sqlalchemy import desc,or_,and_
import json

@urlmap(r'/right/login')
class LoginHandler(BaseHandler):
    @web.asynchronous
    def get(self):
        account = self.get_argument('user', '')
        password = self.get_argument('password', '')
        passwd = md5hash("".join(["iprun",md5hash(password),"admin"]))
        try:
            user = self.db.query(UserList).filter(and_(UserList.UserAccount == account,UserList.PassWord == passwd,UserList.Is_valid == 1)).first()
            if user:
                self._doLogin(user)
            else:
                self.Result['status'] = 404
                self.Result['info'] = u"用户名不存在"
        except Exception,e:
            self.Result['info'] = u'登陆失败,原因{0}'.format(e)
            self.Result['status'] = 400
        self.finish(self.Result)

    def _doLogin(self,user):
        self.set_secure_cookie('user',str(user.UserId),expires_days=0.5)
        self.set_cookie('d',str(user.Department))
        try:
            if user.UserId == 1:
                objLogLogin = UserLoginList()
                objLogLogin.UserId = user.UserId
                objLogLogin.LoginIp = self.request.headers['X-Real-Ip']
                objLogLogin.LoginTime = datetime.datetime.now()
                self.db.add(objLogLogin)
                self.db.commit()
                self.set_cookie('logid',str(objLogLogin.LoginId))
                self.Result['info'] = u'登陆成功'
                self.Result['status'] = 200
            else :
                rights = {}
                roleid = self.db.query(UserRoleList).filter(UserRoleList.UserId==int(user.UserId)).first().RoleId
                menulist = self.db.query(RoleRightList).filter(RoleRightList.RoleId==roleid).all()
                menuurl = [{self.db.query(MenuList).filter(MenuList.MenuId==i.MenuId).first().Url:[i.MenuPost,i.MenuGet,i.MenuPut,i.MenuDel]} for i in menulist]
                username = self.db.query(UserList).filter(UserList.UserId==user.UserId).first().UserName
                rights[username] = menuurl
                RightsCache.set("User{0}Right".format(user.UserId),json.dumps(rights))
                objLogLogin = UserLoginList()
                objLogLogin.UserId = user.UserId
                objLogLogin.LoginIp = self.request.headers['X-Real-Ip']
                objLogLogin.LoginTime = datetime.datetime.now()
                self.db.add(objLogLogin)
                self.db.commit()
                self.set_cookie('logid',str(objLogLogin.LoginId))
                self.Result['info'] = u'登陆成功'
                self.Result['status'] = 200
        except Exception,e:
            self.Result['info'] = u'您无权访问本平台,原因{0}'.format(e)
            self.Result['status'] = 400

@urlmap(r'/logout')
class LogoutHandler(BaseHandler):
    def get(self):
        logid = self.get_cookie('logid')
        if logid:
            objLogLogin = self.db.query(UserLoginList).get(logid)
            objLogLogin.ExitTime = datetime.datetime.now()
            self.db.add(objLogLogin)
            self.db.commit()
        self.clear_cookie("user")
        self.clear_cookie("logid")
        self.redirect('/#/login')
