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
            render: (thumbnailUrl) => <Avatar src={thumbnailUrl} size={48} />, // Adjust size for small devices
            width: 80,
        },
        {
            title: "Title",
            dataIndex: "title",
            width: 150,
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
            width: 100,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => <Rate value={rating} allowHalf disabled />,
            width: 100,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            width: 100,
        },
        {
            title: "Category",
            dataIndex: "category",
            width: 120,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            width: 120,
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Space size={20} direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={4} className="dashboard-title">Inventory</Typography.Title>
                <Table className="table-inventory"
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        pageSize: 5, // Number of products per page
                    }}
                    scroll={{ x: 'max-content' }} // Allow horizontal scroll to accommodate all columns
                    locale={{ emptyText: 'No data available' }}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }} // Consistent styling
                />
            </Space>
        </div>
    );
}

export default Inventory;
