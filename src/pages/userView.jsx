import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import UserCard from "../components/userCard";
import { Link } from "react-router-dom";
import "./userView.css";

function UserView(){

    const[viewData, setViewData] = useState([]);
    const[loading, setLoading] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const result = await fetch(`https://dummyjson.com/users/${id}`);
            const data = await result.json();

            setViewData([data]);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    return(
        <div className="userView">
            <div className="cardHead">
                <h1>User View</h1>
            </div>
            <div className="userData">
                <UserCard viewData={viewData} loading={loading} />
            </div>
            <Link to="/home"><button className="viewButton" type="button">Back</button></Link>
        </div>
    );
}

export default UserView;