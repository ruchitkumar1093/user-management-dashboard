import "./logOut.css";

function LogOut({ logout }){

    function handleLogout(){
        logout();
    }

    return(
        <div>
            <button className="logOutBtn" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LogOut;