#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class MenuFunctionList(RightModel,BaseModel):
    """
    菜单功能管理
    """
    __tablename__ = 'bk_menu_function_list'

    FunctionId = Column('fi_function_id', Integer, primary_key=True)    #功能ID
    MenuId = Column('fi_menu_id', Integer)                              #菜单ID
    MenuFunctionName = Column('fs_menu_function',String(100))           #菜单功能名称
    Url = Column('fs_url',String(100))                                  #URL
    CreateId = Column('fi_create_id', Integer)                          #创建人ID
    CreateTime = Column('ft_create_time', DateTime)                     #创建时间
    UpdateId = Column('fi_update_id', Integer)                          #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)                     #修改时间

    def toDict(self):
        return {
            'FunctionId': self.RightId,
            'MenuId':self.UserId,
            'MenuFunctionName':self.MenuFunctionName,
            'Url':self.Url,
            'CreateId':self.CreateId,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'UpdateId':self.UpdateId,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
