import { Space } from "antd";
import "./assets/css/App.css";
import AppFooter from "./assets/components/AppFooter/index";
import AppHeader from "./assets/components/AppHeader/index";
import PageContent from "./assets/components/PageContent/";
import SideMenu from "./assets/components/SideMenu/index";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <Space className="SideMenuandPageContent" direction="horizontal" size="large">
                <SideMenu />
                <PageContent />
            </Space>
            <AppFooter />
        </div>
    );
}

export default App;
