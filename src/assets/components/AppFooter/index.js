import { Typography } from "antd";

function Appfooter() {
    return (
        <div className="Appfooter">
            <Typography.Link href="tel:+07508593906">+07508593906</Typography.Link>
            <Typography.Link href="https://www.google.com" target="_blank">
                Privacy Policy
            </Typography.Link>
            <Typography.Link href="https://www.instagram.com" target="_blank">
                Terms of Use
            </Typography.Link>
        </div>
    );
}

export default Appfooter;
