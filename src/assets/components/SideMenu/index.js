import React, { useEffect, useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import {
  AppstoreAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

function AppMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState('/');
  const [open, setOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const { pathname } = location;
    setSelectedKeys(pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <AppstoreAddOutlined />,
      key: '/',
    },
    {
      label: 'Inventory',
      icon: <ShopOutlined />,
      key: '/inventory',
    },
    {
      label: 'Orders',
      icon: <ShoppingCartOutlined />,
      key: '/orders',
    },
    {
      label: 'Customers',
      icon: <UserAddOutlined />,
      key: '/customers',
    },
  ];

  const renderMenu = () => (
    <Menu
      mode="inline"
      onClick={(e) => {
        navigate(e.key);
        if (isMobile) {
          setOpen(false); 
        }
      }}
      selectedKeys={[selectedKeys]}
      items={menuItems}
      style={{ height: '100%', borderRight: 0 }}
    />
  );

  return (
    <>
      {/* Header */}
      <div className="app-header">
        {isMobile && (
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)} 
            className="menu-toggle-button"
          />
        )}
        <h1 className="app-title">navMenu</h1>
      </div>

      {/* Side Menu for Desktop */}
      {!isMobile && <div className="side-menu">{renderMenu()}</div>}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer style={{width:'250px'}}
          title="Menu"
          placement="left"
          onClose={() => setOpen(false)} 
          open={open} 
        >
          {renderMenu()}
        </Drawer>
      )}
    </>
  );
}

export default AppMenu;
