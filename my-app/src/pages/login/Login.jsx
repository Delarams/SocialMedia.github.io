import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import "./login.scss"
import { Link } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const handleLogin = ()=>{
        login();
    };

    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
                         maxime officiis neque enim sunt incidunt nobis voluptate, aliquam aperiam repellat, asperiores dolor quae nihil hic eos recusandae quibusdam. Debitis, quam.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                    

                </div>
                <div className="right"> 
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Login