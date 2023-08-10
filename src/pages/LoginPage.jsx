import { useRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { LoginContainer } from "../styles/template";
import PasswordInput from "../components/PasswordInput";
import logo from "../assets/logo.png";

export default function LoginPage() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const inputRefEmail = useRef(null);
    const persistenceRef = useRef(null);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    function handleForm(event) {
        event.preventDefault();
        setIsDisabled(true);

        const data = {
            email: inputRefEmail.current.value,
            password: inputPassword,
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/signin`, data)
            .then((response) => {
                setIsDisabled(false);
                const userData = {
                    name: response.data.name,
                    token: response.data.token,
                };
                setUserData(userData);

                if (persistenceRef.current.checked) {
                    localStorage.setItem("user", JSON.stringify(userData));
                }

                navigate("/services");
            })
            .catch((error) => {
                setIsDisabled(false);
                console.log(error);
                if (error.response) {
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData(user);
            navigate("/services");
        }
    }, []);

    return (
        <LoginContainer>
            <img src={logo} alt="SkillHarbor" />
            <form onSubmit={handleForm}>
                <input
                    type="email"
                    placeholder="email"
                    required
                    ref={inputRefEmail}
                    disabled={isDisabled}
                    name="email"
                />
                <PasswordInput
                    isSignup={false}
                    inputPassword={inputPassword}
                    setInputPassword={setInputPassword}
                    isDisabled={isDisabled}
                />
                <label>
                    <input 
                        type="checkbox" 
                        ref={persistenceRef}
                        disabled={isDisabled} 
                    />
                    Remember me
                </label>
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Login"}
                </button>
                <Link to="/signup">
                    Don't have an account? Signup!
                </Link>
            </form>
        </LoginContainer>
    );
}
