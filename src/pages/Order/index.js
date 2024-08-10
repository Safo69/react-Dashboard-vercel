import {Avatar,  Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function Orders() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then(res => {
                setDataSource(res.products);
                setLoading(false);
            })
            .catch(() => setLoading(false)); 
    }, []);

    return (
        <Space size={20} direction="vertical" style={{ marginTop: 20 }}>
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                columns={[
                    {
                        title: "id",
                        dataIndex: "id",
                    },
                    {
                        title: "Thumbnail",
                        dataIndex: "thumbnail",
                        render: (thumbnailUrl) => <Avatar src={thumbnailUrl} />,
                    },
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => <span>${value}</span>,
                    },
                    {
                        title: "Discount Percentage",
                        dataIndex: "discountPercentage",
                        render: (value) => <span>{value}%</span>,
                    },{
                        
                  title:"total",
                  dataIndex:"total",
                    },
                   
                ]}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    pageSize: 5, // Shows 5 products per page
                }} 
                locale={{ emptyText: 'No data available' }}
            />
        </Space>
    );
}

export default Orders;
