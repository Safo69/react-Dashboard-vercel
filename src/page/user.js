import { useParams } from "react-router-dom";

export default function User() {
    let parmas =useParams();
    return <div>Hello {parmas.username}</div> ;
    }
    /*dabe brachet bkar bene {username} agar username bakar bene awa bas nawaka dardache ba tanaha balam agar bkeana parmas awa tawani id awanash elagar bakarbene */