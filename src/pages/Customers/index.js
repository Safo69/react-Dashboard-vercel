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
                setDataSource(res.users);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <Space size={20} direction="vertical" style={{ marginTop: 20 }}>
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table
                columns={[
                    {
                        title: "Photo",
                        dataIndex: "image",
                        render: (image) => <Avatar src={image} />,
                    },
                    {
                        title: "First Name",
                        dataIndex: "firstName",
                    },
                    {
                        title: "Last Name",
                        dataIndex: "lastName",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        title: "Phone",
                        dataIndex: "phone",
                    },
                    {
                        title: "Address",
                        dataIndex: "address",
                        render: (address) => {
                            return (
                                <span>{address.address}, {address.city}</span>
                            );
                        }
                    },
                ]}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    pageSize: 5, // Shows 5 customers per page
                }}
                locale={{ emptyText: 'No data available' }}
            />
        </Space>
    );
}

export default Customers;
