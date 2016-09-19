#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class RoleList(RightModel,BaseModel):
    """
    角色信息列表
    """
    __tablename__ = 'bk_role_list'

    RoleId = Column('fi_id', Integer, primary_key=True)     #角色ID
    RoleName = Column('fs_role_name', String(100))           #角色名称
    Desc = Column('fs_desc',String(255))                    #描述
    Create = Column('fs_create', Integer)              #创建人ID
    CreateTime = Column('ft_create_time', DateTime)         #创建时间
    Update = Column('fs_update', Integer)              #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)         #修改时间

    def toDict(self):
        return {
            'RoleId': self.RoleId,
            'RoleName':self.RoleName,
            'Desc':self.Desc,
            'Create':self.Create,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'Update':self.Update,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
