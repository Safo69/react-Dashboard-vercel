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
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    setSelectedKeys(pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
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
          setVisible(false);
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
            onClick={() => setVisible(true)}
            className="menu-toggle-button"
          />
        )}
        <h1 className="app-title">The navMenu</h1>
      </div>

      {/* Side Menu for Desktop */}
      {!isMobile && <div className="side-menu">{renderMenu()}</div>}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setVisible(false)}
          visible={visible}
          
        >
          {renderMenu()}
        </Drawer>
      )}
    </>
  );
}

export default AppMenu;
