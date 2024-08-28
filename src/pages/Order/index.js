import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function Orders() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then(res => {
                setDataSource(res.products); // Keep the existing data source
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            responsive: ['sm'], // Hide on xs
        },
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (thumbnailUrl) => <Avatar src={thumbnailUrl} size={64} />, // Adjust size
            responsive: ['md'], // Hide on xs and sm
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (value) => <span>${value}</span>,
        },
        {
            title: "Discount Percentage",
            dataIndex: "discountPercentage",
            key: "discountPercentage",
            render: (value) => <span>{value}%</span>,
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (value) => <span>${value}</span>,
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Space size={20} direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={4} className="dashboard-title">Orders</Typography.Title>
                <Table className="table-inventory"
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        pageSize: 7, // Number of items per page
                    }}
                    scroll={{ x: true }} // Allow horizontal scroll if needed
                    locale={{ emptyText: 'No data available' }}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }} // Consistent styling
                />
            </Space>
        </div>
    );
}

export default Orders;
