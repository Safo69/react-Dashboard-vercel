import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.total);
            setRevenue(res.discountedTotal);
        });

        getInventory().then((res) => {
            setInventory(res.total);
        });

        getCustomers().then((res) => {
            setCustomers(res.total);
        });
    }, []);

    return (
        <div>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space size={20} direction="horizontal">
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0, 255, 0, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={orders}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0, 0, 255, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Inventory"}
                    value={inventory}
                />
                <DashboardCard
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0, 255, 255, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customers"}
                    value={customers}
                />
                <DashboardCard
                    icon={
                        <DollarCircleOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255, 0, 0, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Revenue"}
                    value={revenue}
                />
            </Space>
            <br /><br />
            <Space>
                <RecentOrders />
                <DashboardChart />
            </Space>
        </div>
    );
}

function DashboardCard({ icon, title, value }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then((res) => {
                console.log(res);
                if (res && res.products) {
                    setDataSource(res.products.slice(0, 5)); // Use slice instead of splice
                } else {
                    console.error("API response does not contain products:", res);
                    setDataSource([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Typography.Text>Recent Orders</Typography.Text>
            <Table
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                        key: "title",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                        key: "quantity",
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedTotal",
                        key: "discountedTotal",
                    },
                ]}
                rowKey="id"
            />
        </>
    );
}

function DashboardChart() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        getRevenue()
            .then((res) => {
                console.log('API response:', res);

                if (res && res.carts) {
                    const labels = res.carts.map((cart) => `User-${cart.userId}`);
                    const data = res.carts.map((cart) => cart.discountedTotal);

                    const updatedChartData = {
                        labels,
                        datasets: [
                            {
                                label: "Revenue",
                                data: data,
                                backgroundColor: "rgba(255, 0, 0, 1)",
                            },
                        ],
                    };

                    setChartData(updatedChartData);
                } else {
                    console.error("API response does not contain carts:", res);

                    setChartData({
                        labels: [],
                        datasets: [
                            {
                                label: "Revenue",
                                data: [],
                                backgroundColor: "rgba(255, 0, 0, 1)",
                            },
                        ],
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching revenue:", error);

                setChartData({
                    labels: [],
                    datasets: [
                        {
                            label: "Revenue",
                            data: [],
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                });
            });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Order Revenue",
            },
        },
    };

    return (
        <Card style={{ width: 500, height: 350, marginLeft: 40 }}>
            <Bar options={options} data={chartData} />
        </Card>
    );
}

export default Dashboard;
