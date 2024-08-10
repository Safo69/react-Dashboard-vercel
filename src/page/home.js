import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>This is the Home page</h1>
           
            <Link to="/user/safa">Safa</Link>
            <br />
            <Link to="/user/ayman">Ayman</Link>
            <br />
        </div>
    );
}
