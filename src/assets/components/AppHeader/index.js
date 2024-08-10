import { Badge, Drawer, Image, List, Space, Typography } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComment, getOrders } from '../../../API';

function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    useEffect(() => {
        getComment().then(res => {
            setComments(res.comments);
        });
        getOrders().then(res => {
            setOrders(res.products);
        });
    }, []);

    return (
        <div className="AppHeader">
            <Image
                width={40}
                src="/hi.png"
                alt="Logo"
            />
            <Typography.Title level={4} className="title">Safo Dashboard</Typography.Title>
            <Space className='icons'>
                <Badge count={comments.length} dot>
                    <MailOutlined 
                        style={{ fontSize: 24 }} 
                        onClick={() => setCommentsOpen(true)} 
                    />
                </Badge>
                <Badge count={orders.length}>
                    <BellFilled 
                        style={{ fontSize: 24 }} 
                        onClick={() => setNotificationOpen(true)} 
                    />
                </Badge>
            </Space>
            <Drawer 
                title="Comments" 
                open={commentsOpen} 
                onClose={() => setCommentsOpen(false)} 
                maskClosable
            >
                <List 
                    dataSource={comments} 
                    renderItem={item => (
                    <List.Item>{item.body}</List.Item>
                    )}
                />
            </Drawer>
            <Drawer 
                title="Notification" 
                open={notificationOpen} 
                onClose={() => setNotificationOpen(false)} 
                maskClosable
            >
               <List 
                    dataSource={orders} 
                    renderItem={item => (
                    <List.Item>
                        <Typography.Text strong>{item.title}</Typography.Text> 
                        has been ordered!</List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
}

export default AppHeader;
