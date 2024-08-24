import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Image, List, Space, Typography, Row, Col } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { getComment, getOrders } from '../../../API';

function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    useEffect(() => {
        getComment().then(res => {
            console.log('Comments:', res.comments); 
            setComments(res.comments);
        });
        getOrders().then(res => {
            console.log('Orders:', res.products); 
            setOrders(res.products);
        });
    }, []);

    return (
        <div className="AppHeader">
            <Row align="middle" justify="space-between">
                <Col>
                    <Image width={40} src="/hi.png" alt="Logo" />
                </Col>
                <Col>
                    <Typography.Title level={4} className="dashboard-title1" style={{ marginTop: '10px' }}>
                        SafoDashboard
                    </Typography.Title>
                </Col>
                <Col>
                    <Space size="large" align="center">
                        <Badge count={comments.length} dot>
                            <MailOutlined 
                                style={{ fontSize: 24 }} 
                                onClick={() => setCommentsOpen(true)} 
                            />
                        </Badge>
                        <Badge count={orders.length} style={{ marginRight: '10rem' }}>
                            <BellFilled 
                                style={{ fontSize: 24 ,marginRight:'10rem' }} 
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
                title="Notifications" 
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
