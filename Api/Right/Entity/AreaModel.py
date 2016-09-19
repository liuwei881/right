#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class UserRoleList(RightModel,BaseModel):
    """
    区域列表
    """
    __tablename__ = 'bk_area_list'

    AreaId = Column('fi_area_id', Integer, primary_key=True)    #区域ID
    AreaName = Column('fs_area_name', String(100))              #区域名称
    ParentArea = Column('fi_parent_area',Integer)               #上级区域
    Postcode = Column('fs_postcode', String(10))                #邮编
    Comment = Column('fs_comment', String(100))                 #备注
    CreateId = Column('fi_create_id', Integer)                  #创建人ID
    CreateTime = Column('ft_create_time', DateTime)             #创建时间
    UpdateId = Column('fi_update_id', Integer)                  #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)             #修改时间

    def toDict(self):
        return {
            'AreaId': self.AreaId,
            'AreaName':self.AreaName,
            'ParentArea':self.ParentArea,
            'Postcode':self.Postcode,
            'Comment':self.Comment,
            'CreateId':self.CreateId,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'UpdateId':self.UpdateId,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
