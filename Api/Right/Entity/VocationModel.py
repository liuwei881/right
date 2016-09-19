#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class UserRoleList(RightModel,BaseModel):
    """
    行业列表
    """
    __tablename__ = 'bk_vocation_list'

    VocationId = Column('fi_vocation_id', Integer, primary_key=True)    #行业ID
    Name = Column('fs_name', String(100))                               #名称
    ParentVocation = Column('fi_parent_vocation',Integer)                #上级行业
    Comment = Column('fs_comment', String(100))                         #备注
    CreateId = Column('fi_create_id', Integer)                          #创建人ID
    CreateTime = Column('ft_create_time', DateTime)                     #创建时间
    UpdateId = Column('fi_update_id', Integer)                          #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)                     #修改时间

    def toDict(self):
        return {
            'VocationId': self.VocationId,
            'Name':self.Name,
            'ParentVocation':self.ParentVocation,
            'Comment':self.Comment,
            'CreateId':self.CreateId,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'UpdateId':self.UpdateId,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
