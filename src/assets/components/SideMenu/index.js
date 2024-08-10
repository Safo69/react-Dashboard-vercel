import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreAddOutlined, ShopOutlined, ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

function AppMenu() {
    const Location = useLocation();
    const [selectedKeys, setselectedKeys] = useState('/');

    useEffect(() => {
        const pathName = Location.pathname;
        setselectedKeys(pathName);
    }, [Location.pathname]);
    
    const navigate = useNavigate();

    return (
        <div className="sideMenu">
            <Menu
                className="SideMenuvertical"
                mode="vertical"
                onClick={(e) => navigate(e.key)}
                selectedKeys={selectedKeys}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreAddOutlined />,
                        key: '/',
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: '/inventory',
                    },
                    {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: '/orders',
                    },
                    {
                        label: "Customers",
                        icon: <UserAddOutlined />,
                        key: '/customers',
                    },
                ]}
            />
        </div>
    );
}

export default AppMenu;
