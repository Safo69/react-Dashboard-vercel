import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getInventory()
            .then(res => {
                setDataSource(res.products);
                setLoading(false);
            })
            .catch(() => setLoading(false)); 
    }, []);

    const columns = [
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (thumbnailUrl) => <Avatar src={thumbnailUrl} size={64} />, // Adjust size
            responsive: ['sm'], // Hide on xs
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
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => <Rate value={rating} allowHalf disabled />,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            responsive: ['md'], // Hide on xs and sm
        },
        {
            title: "Category",
            dataIndex: "category",
            responsive: ['md'], // Hide on xs and sm
        },
        {
            title: "Brand",
            dataIndex: "brand",
            responsive: ['md'], // Hide on xs and sm
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Space size={20} direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={4} className="dashboard-title">Inventory</Typography.Title>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        pageSize: 5, // Number of products per page
                    }}
                    scroll={{ x: true }} // Allow horizontal scroll if needed
                    locale={{ emptyText: 'No data available' }}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }} // Consistent styling
                />
            </Space>
        </div>
    );
}

export default Inventory;
