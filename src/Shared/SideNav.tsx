import React from 'react';
import { Menu } from 'antd';
import {QuestionCircleFilled, CreditCardOutlined, LogoutOutlined, HomeOutlined, UploadOutlined, SettingOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../Types/Types';


import { UseAuthContext } from '../Context/UseAuthContext';


export const SideNav: React.FC = () => {
  // Define the menu items
  const items: MenuItem[] = [
    { label: 'Dashboard', key: '/admin_jctbdil1$' , icon :<HomeOutlined/>},
    {label:'upload', key:'/admin_jctbdil1$/upload', icon: <UploadOutlined/>},
    { label: 'SignOut', key: 'signOut', icon :<LogoutOutlined/> },
    { label: 'Help', key: 'help', icon :<QuestionCircleFilled/> },
    {label:'settings', key:'settings', icon : <SettingOutlined/>, children:[
      {
        label:"Update Password",
        key:'/admin_jctbdil1$/settings/updatepassword'

      },{
        label:"Accept Admin",
        key:'/admin_jctbdil1$/settings/accept'
      },{
        label:'view admin users',
        key:'/admin_jctdbil1$/settings/adminUsers'
      }
    ]},
    
  ];
  const navigate = useNavigate();
  const{dispatch, user}=UseAuthContext();

  // Map the items array to the format required by the Menu component
  const menuItems = items

  const handleSignOut = async()=>{
    
  if (!user){ return}
    localStorage.removeItem('user');
    dispatch({type:'logout'});
 
  }

  return (
    <Menu
    style={{height: '100%'}}
    onClick={({key})=>{
      if(key == 'signOut'){
        handleSignOut();
        return
      }
      if (key == 'help') {
      window.open('https://wa.link/ubp14t', '_blank');
      return
      }
      
      navigate(key);
    }}
     items={menuItems} />
  );
};