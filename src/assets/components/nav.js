import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <div className="flex">
            <div>
                <h1>Logo</h1>
            </div>
            <div className="flex">
                <Link to={"/"}>Home</Link>
                <Link to={"/contact"}>Contact</Link>
               
            </div>
        </div>
    );
}
