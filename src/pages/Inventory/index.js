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

    return (
        <Space size={20} direction="vertical" style={{ marginTop: 20 }}>
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table
                columns={[
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
                        title: "Rating",
                        dataIndex: "rating",
                        render :(rating) => { 
                          return <Rate value={rating} allowHalf disabled />;

                           
                          
                        },
                    },
                    {
                        title: "Stock",
                        dataIndex: "stock",
                    },
                    {
                        title: "Category",
                        dataIndex: "category",
                    },
                    {
                        title: "Brand",
                        dataIndex: "brand",
                    },
                ]}
                dataSource={dataSource}
                loading={loading}
                // Uncomment the line below if you don't want pagination and want to see all data at once
                 pagination={{
                    pageSize:5, //awa mabaste la har pageak chande producat neshand bada
                 }} 
                
                locale={{ emptyText: 'No data available' }}
            />
        </Space>
    );
}

export default Inventory;
