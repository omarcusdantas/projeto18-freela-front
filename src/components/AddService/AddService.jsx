import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Container, WeekContainer, ButtonContainer } from "./style";

export default function AddHabit(props) {
    const { toggleAddHabit, updateHabits, token } = props;
    const [isDisabled, setIsDisabled] = React.useState(false);
    const inputNameRef = React.useRef(null);


    // Validate habit informations
    function registerHabit() {
        const inputName = inputNameRef.current.value;

        setIsDisabled(true);
        const data = {
            name: inputName,
            days: days,
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/habits`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateHabits();
                toggleAddHabit();
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

    return (
        <Container>
            <input 
                type="text" 
                placeholder="title" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2"
                required 
            />
            <input 
                type="text" 
                placeholder="category" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2"
                required 
            />
            <input 
                type="text" 
                placeholder="description" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2"
                required 
            />
            <input 
                type="text" 
                placeholder="image url" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2" 
                required
            />
            <input 
                type="number" 
                placeholder="price" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2" 
                required
            />
            <WeekContainer>
            </WeekContainer>
            <ButtonContainer>
                <button onClick={() => toggleAddHabit()} disabled={isDisabled}>
                    Cancel
                </button>
                <button onClick={registerHabit} disabled={isDisabled}>
                    {isDisabled && <ThreeDots height="13px" color="#ffffff"></ThreeDots>}
                    {!isDisabled && "Save"}
                </button>
            </ButtonContainer>
        </Container>
    );
}
