import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Row, Col, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

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
            <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={6}>
        <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("green", "rgba(0, 255, 0, 0.25)")} />}
            title={"Orders"}
            value={orders}
        />
    </Col>
    <Col xs={24} sm={12} lg={6}>
        <DashboardCard
            icon={<ShoppingOutlined style={iconStyle("blue", "rgba(0, 0, 255, 0.25)")} />}
            title={"Inventory"}
            value={inventory}
        />
    </Col>
    <Col xs={24} sm={12} lg={6}>
        <DashboardCard
            icon={<UserOutlined style={iconStyle("purple", "rgba(0, 255, 255, 0.25)")} />}
            title={"Customers"}
            value={customers}
        />
    </Col>
    <Col xs={24} sm={12} lg={6}>
        <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("red", "rgba(255, 0, 0, 0.25)")} />}
            title={"Revenue"}
            value={revenue}
        />
    </Col>
</Row>
<Row gutter={[16, 16]}>
    <Col xs={24} md={24} lg={12}>
        <RecentOrders />
    </Col>
    <Col xs={24} md={24} lg={12}>
        <DashboardChart />
    </Col>
</Row>

        </div>
    );
}

function iconStyle(color, bgColor) {
    return {
        color,
        backgroundColor: bgColor,
        borderRadius: 20,
        fontSize: 24,
        padding: 8,
    };
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
                if (res && res.products) {
                    setDataSource(res.products.slice(0, 5));
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
                const labels = res.carts.map((cart) => `User-${cart.userId}`);
                const data = res.carts.map((cart) => cart.discountedTotal);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Revenue",
                            data,
                            backgroundColor: "rgba(255, 0, 0, 1)",
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error fetching revenue:", error));
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to scale dynamically
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
        <Card className="chart-card" >
            <div className="chart" style={{ position: "relative",height: "100%", minHeight: 200}}>
                <Bar options={options} data={chartData} />
            </div>
        </Card>
    );
}

export default Dashboard;
