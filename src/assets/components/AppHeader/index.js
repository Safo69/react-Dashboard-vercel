import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Image, List, Space, Typography, Row, Col } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { getComment, getOrders } from '../../../API';

function AppHeader() {
    // State variables for comments and orders
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    // Fetching comments and orders from API
    useEffect(() => {
        getComment().then(res => {
            setComments(res.comments);
        });
        getOrders().then(res => {
            setOrders(res.products);
        });
    }, []);

    return (
        <div className="AppHeader" style={{ padding: '10px', position:'relative' }}>
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col xs={12} sm={8} md={5}>
                    <Image
                        width={40}
                        src="/hi.png"
                        alt="Logo"
                    />
                </Col>
                <Col xs={12} sm={8} md={12} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Typography.Title level={6} style={{ whiteSpace: 'nowrap',marginLeft:'313px' ,marginBottom:'2rem'}}>SafoDashboard</Typography.Title>
                </Col>
                <Col xs={24} sm={8} md={6} style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-start' }}>
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
                </Col>
            </Row>
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
                            has been ordered!
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
}

export default AppHeader;
