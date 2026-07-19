import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import "./login.css";
function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const[username, setUsername] = useState("emilys");
    const[password, setPassword] = useState("emilyspass");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await fetch('https://dummyjson.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    username: username,
                    password: password,
                }),
            })

            const data = await result.json();
            if(!result.ok){
                setError("Invalid Credentials");
                return;
            }
            login(data.accessToken);
            navigate("/home");
            setLoading(false);

        }
        catch (error) {
            setError("something went wrong");
        }

        finally{
            setLoading(false);
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginHead">
                <h1>User Management Dashboard</h1>
            </div>
            <form className="loginUser" onSubmit={handleLogin}>
                <h1>Login:</h1>
                <div className="formEl">
                    <label htmlFor="userName">User Name:</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" id="userName" placeholder="Enter User Name" name="userName" />
                </div>
                <div className="formEl">
                    <label htmlFor="password">Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Enter Password" name="password" />
                </div>
                <button className="loginBtn" type="submit">{loading ? "Please Wait..." : "Login"}</button>
                {error ? <p className="loginError">{error}</p> : <p></p>}
            </form>
            <div className="demoCredentials">
            </div>
        </div>
    );
}

export default Login;