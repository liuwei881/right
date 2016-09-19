#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class DepartmentList(RightModel,BaseModel):
    """
    部门列表
    """
    __tablename__ = 'bk_department_list'

    DepartmentId = Column('fi_department_id', Integer, primary_key=True)     #部门ID
    CompanyName = Column('fs_company_name', String(255))                             #公司ID
    ParentBusiness = Column('fs_parent_business',String(255))                #上级部门ID
    DepartmentName = Column('fs_department_name',String(100))                #部门名称
    Desc = Column('fs_desc',String(255))                                    #描述
    Is_management = Column('fs_management', String(100))                        #是否管理部门
    Create = Column('fs_create', String(100))                               #创建人ID
    CreateTime = Column('ft_create_time', DateTime)                         #创建时间
    Update = Column('fs_update', String(100))                               #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)                         #修改时间

    def toDict(self):
        return {
            'DepartmentId': self.DepartmentId,
            'CompanyName':self.CompanyName,
            'ParentBusiness':self.ParentBusiness,
            'DepartmentName': self.DepartmentName,
            'Desc':self.Desc,
            'Is_management':self.Is_management,
            'Create':self.Create,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'Update':self.Update,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
