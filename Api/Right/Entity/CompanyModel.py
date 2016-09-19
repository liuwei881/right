#coding=utf-8
from sqlalchemy import Column, Integer, String, Text, DateTime
from lib.Route import BaseModel,RightModel

class CompanyList(RightModel,BaseModel):
    """
    公司列表
    """
    __tablename__ = 'bk_company_list'

    CompanyId = Column('fi_company_id', Integer, primary_key=True)  #公司ID
    ParentCompany = Column('fs_parent_company', String(255))         #上级公司ID
    CompanyName = Column('fs_company_name',String(100))              #公司名称
    Area = Column('fs_area', String(100))                           #区域ID
    Address = Column('fs_address',String(200))                      #地址
    Profession = Column('fs_profession', String(255))               #行业ID
    CompanyNature = Column('fs_company_nature', String(255))             #公司性质
    Scale = Column('fi_scale', Integer)                             #规模
    TelePhone = Column('fs_telephone', String(50))                  #电话
    Fax = Column('fs_fax', String(50))                              #传真
    HomePage = Column('fs_homepage', String(100))                   #主页
    Is_valid = Column('fs_valid', String(100))                          #是否有效"1有效,0无效"
    Comment = Column('fs_comment', String(255))                     #备注
    Create = Column('fs_create', String(100))                       #创建人ID
    CreateTime = Column('ft_create_time', DateTime)                 #创建时间
    Update = Column('fs_update', String(100))                       #修改人ID
    UpdateTime = Column('ft_update_time', DateTime)                 #修改时间

    def toDict(self):
        return {
            'CompanyId': self.CompanyId,
            'ParentCompany':self.ParentCompany,
            'CompanyName':self.CompanyName,
            'Area': self.Area,
            'Address':self.Address,
            'Profession':self.Profession,
            'CompanyNature': self.CompanyNature,
            'Scale':self.Scale,
            'TelePhone':self.TelePhone,
            'Fax': self.Fax,
            'HomePage':self.HomePage,
            'Is_valid':self.Is_valid,
            'Comment':self.Comment,
            'Create':self.Create,
            'CreateTime': self.CreateTime.strftime('%Y-%m-%d %H:%M:%S') if self.CreateTime else '',
            'Update':self.Update,
            'UpdateTime': self.UpdateTime.strftime('%Y-%m-%d %H:%M:%S') if self.UpdateTime else ''
        }
