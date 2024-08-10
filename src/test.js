import { Link } from "react-router-dom";
import { useState } from "react";


export default function Home() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
const [isSuccess,SetSuccess]= useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    const map = {username,email,job};
    console.log(map)
SetSuccess(true);
    };

    return (
        <div>
            <h1>This is the Home page</h1>
            {/* {username} awa lo badear krdn w takid bunawa lo away esh daka */}
         
            <Link to="/user/safa">Safa</Link>
            <br />
            <Link to="/user/ayman">Ayman</Link>
            <br />
            <form onSubmit={handleSubmit}>
                {isSuccess ? (
                <div className="alert">
                Your Post has been created Succesfully</div>) :null}
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <label>Job</label>
                <select onChange={e => setJob(e.target.value)}>
                    <option value="">Select Your Job</option>
                    <option value="teacher">Teacher</option>
                    <option value="backend">Backend Developer</option>
                    <option value="frontend">Frontend Developer</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
