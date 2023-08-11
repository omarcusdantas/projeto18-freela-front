import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { LoginContainer } from "../styles/template";
import { ThreeDots } from "react-loader-spinner";
import PasswordInput from "../components/PasswordInput";
import logo from "../assets/logo.png";
import { styled } from "styled-components";
import { schemaSignup } from "../schemas/schemaSignup";

export default function RegisterPage() {
    const inputRefEmail = useRef(null);
    const inputRefName = useRef(null);
    const inputRefPhone = useRef(null);
    const inputRefDDD = useRef(null);

    const [isDisabled, setIsDisabled] = useState(false);
    const [rightPassword, setRightPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputCep, setInputCep] = useState("");
    const [inputState, setInputState] = useState("");
    const [inputCity, setInputCity] = useState("");

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    function successSignup() {
        setIsDisabled(false);
        let timeoutId;

        MySwal
            .fire({
                icon: "success",
                title: "Account created!",
                confirmButtonText: "Go to Login",
                footer: "Or wait 5 seconds for redirect",
                didOpen: () => {
                    timeoutId = setTimeout(() => {
                        MySwal.close();
                        navigate("/");
                    }, 5000);
                },
            })
            .then((result) => {
                if (result.isConfirmed) {
                    clearTimeout(timeoutId);
                    navigate("/");
                }
            });
    }

    function sendInfo(data) {
        axios
            .post(`${import.meta.env.VITE_API_URL}/signup`, data)
            .then(() => successSignup())
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

    function handleForm(event) {
        event.preventDefault();
        const data = {
            email: inputRefEmail.current.value,
            name: inputRefName.current.value,
            phone: inputRefDDD.current.value + inputRefPhone.current.value,
            cep: inputCep,
            state: inputState,
            city: inputCity,
            password: inputPassword,
        };

        if (data.password !== repeatPassword) {
            return alert ("Passwords don't match.");
        }

        try {
            schemaSignup.validateSync(data, { abortEarly: false });
        } catch (validationError) {
            const errors = validationError.errors;
            return alert(errors.join("\n"));
        }
        
        setIsDisabled(true);
        sendInfo(data);
    }

    function validCep(data) {
        if (data.erro) {
            alert("Invalid CEP");
            setIsDisabled(false);
            setInputCep("");
            return;
        }
        setInputState(data.uf);
        setInputCity(data.localidade);
        setIsDisabled(false);
    }

    function checkInputCep(newCep) {
        setInputCep(newCep);

        if (newCep.length === 8) {
            setIsDisabled(true);
            axios
                .get(`https://viacep.com.br/ws/${newCep}/json/`)
                .then((response) => validCep(response.data))
                .catch((error) => {
                    setIsDisabled(false);
                    setInputCep("");
                    console.log(error);
                })
        }
    }

    return (
        <LoginContainer $rightPassword={rightPassword}>
            <img src={logo} alt="SkillHarbor" />
            <form onSubmit={handleForm}>
                <input 
                    type="text" 
                    placeholder="name" 
                    ref={inputRefName} 
                    disabled={isDisabled} 
                    minLength="2"
                    maxLength="15" 
                    name="name"
                    required
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    ref={inputRefEmail} 
                    disabled={isDisabled} 
                    name="email"
                    required
                />
                <DoubleInput>
                    <input 
                        type="tel" 
                        placeholder="ddd" 
                        ref={inputRefDDD} 
                        disabled={isDisabled} 
                        name="ddd"
                        maxLength={2}
                        required
                    />
                    <input 
                        type="tel" 
                        placeholder="phone number" 
                        ref={inputRefPhone} 
                        disabled={isDisabled} 
                        name="phone"
                        maxLength={9}
                        required
                    />
                </DoubleInput>
                <input 
                    type="text" 
                    placeholder="cep (only numbers)" 
                    onChange={(event) => checkInputCep(event.target.value)}
                    value={inputCep}
                    disabled={isDisabled} 
                    name="cep"
                    maxLength={8}
                    required
                />
                <DoubleInput>
                    <input 
                        type="text" 
                        placeholder="uf" 
                        value={inputState}
                        disabled
                        name="state"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="city" 
                        value={inputCity}
                        disabled
                        name="state"
                        required
                    />
                </DoubleInput>
                <PasswordInput
                    isSignup={true}
                    inputPassword={inputPassword}
                    setInputPassword={setInputPassword}
                    isDisabled={isDisabled}
                    setRepeatPassword={setRepeatPassword}
                    setRightPassword={setRightPassword}
                    rightPassword={rightPassword}
                />
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Signup"}
                </button>
                <Link to="/">Do you already have an account? Login!</Link>
            </form>
        </LoginContainer>
    );
}

const DoubleInput = styled.div`
    display: flex;
    
    input:first-child {
        width: 60px;
    }

    input:nth-child(2) {
        margin-left: 5px;
        width: 238px;
    }
`;
