#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class DepartmentFunctionList(RightModel,BaseModel):
    """
    部门三级联动列表
    """
    __tablename__ = 'bk_department_function_list'

    DepartmentFunctionId = Column('fi_id', Integer, primary_key=True)
    DepartmentName = Column('fs_department_name', String(50))
    Level = Column('fi_level', Integer)
    Parent = Column('fi_parent', Integer)

    def toDict(self):
        return {
            'DepartmentFunctionId': self.DepartmentFunctionId,
            'DepartmentName':self.DepartmentName,
            'Level':self.Level,
            'Parent':self.Parent
        }
