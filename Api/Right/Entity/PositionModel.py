#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class PositionList(RightModel,BaseModel):
    """
    职位管理
    """
    __tablename__ = 'bk_position_list'

    PositionId = Column('fi_position_id', Integer, primary_key=True)        #职位ID
    PositionName = Column('fs_position_name', String(100))                  #职位名称
    Desc = Column('fi_desc',String(255))                                    #描述
    ReportTo = Column('fs_report_to', String(255))                              #直属上级
    Is_management = Column('fs_management', String(100))                        #是否管理职位
    Create = Column('fs_create', String(100))                               #创建人ID
    CreateTime = Column('ft_create_time', DateTime)                         #创建时间
    Update = Column('fs_update', String(100))                               #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)                         #修改时间

    def toDict(self):
        return {
            'PositionId': self.PositionId,
            'PositionName':self.PositionName,
            'Desc':self.Desc,
            'ReportTo': self.ReportTo,
            'Is_management':self.Is_management,
            'Create':self.Create,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'Update':self.Update,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
