import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";

function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCustomers()
            .then(res => {
                setDataSource(res.users); // Ensure dataSource is set correctly
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const columns = [
        {
            title: "Photo",
            dataIndex: "image",
            key: "image",
            render: (image) => <Avatar src={image} size={64} />, // Adjust size
            responsive: ['md'], // Hide on xs and sm
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (address) => (
                <span>{address.address}, {address.city}</span>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Space size={20} direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={4} className="dashboard-title">Customers</Typography.Title>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        pageSize: 5, // Shows 5 customers per page
                    }}
                    scroll={{ x: true }} // Allow horizontal scroll if needed
                    locale={{ emptyText: 'No data available' }}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }} // Consistent styling
                />
            </Space>
        </div>
    );
}

export default Customers;
