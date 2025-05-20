import React from 'react';
import { Menu } from 'antd';
import {QuestionCircleFilled, CreditCardOutlined, LogoutOutlined, HomeOutlined, UploadOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../Types/Types';
import { signOut } from 'firebase/auth';
import { auth } from '../App';
import { UseAuthContext } from '../Context/UseAuthContext';


export const SideNav: React.FC = () => {
  // Define the menu items
  const items: MenuItem[] = [
    { label: 'Dashboard', key: '/admin' , icon :<HomeOutlined/>},
    {label:'upload', key:'/admin/upload', icon: <UploadOutlined/>},
    { label: 'SignOut', key: 'signOut', icon :<LogoutOutlined/> },
    { label: 'Help', key: 'help', icon :<QuestionCircleFilled/> },
    
  ];
  const navigate = useNavigate();
  const{dispatch}=UseAuthContext();

  // Map the items array to the format required by the Menu component
  const menuItems = items.map(item => ({
    label: item.label,
    key: item.key,
    icon: item.icon
  }));

  const handleSignOut = async()=>{
    dispatch({type:'loading', payload:true});
    try{
      await signOut(auth);
      dispatch({type:'loading', payload:false});
    }catch(error){
      console.error(error);
      dispatch({type:'loading', payload:false});
    }
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