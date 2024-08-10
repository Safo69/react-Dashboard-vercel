import { Typography } from "antd";

function Appfooter() {
    return <div className="Appfooter">
        <Typography.Link href="tel+07508593906">+07508593906</Typography.Link>
        <Typography.Link href="www.google.com" target="_blank">
        Privacy Policy
        </Typography.Link>
        <Typography.Link href="www.instagram.com" target="_blank">
        Terms of use</Typography.Link>


    </div>;

    
}
export default Appfooter;