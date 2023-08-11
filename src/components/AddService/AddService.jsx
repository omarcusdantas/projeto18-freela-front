import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Container, WeekContainer, ButtonContainer } from "./style";
import { schemaService } from "../../schemas/schemaService";

export default function AddHabit(props) {
    const { toggleAddService, updateServices, token } = props;
    const [categories, setCategories] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const inputTitleRef = useRef(null);
    const inputCategoryRef = useRef(null);
    const inputDescriptionRef = useRef(null);
    const inputImageRef = useRef(null);
    const inputPriceRef = useRef(null);

    function registerService(data) {
        setIsDisabled(true);
        axios
            .post(`${import.meta.env.VITE_API_URL}/services`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateServices();
                toggleAddService();
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

    function handleForm(event) {        
        event.preventDefault();
        
        const data = {
            title: inputTitleRef.current.value,
            categoryId: inputCategoryRef.current.value,
            description: inputDescriptionRef.current.value,
            image: inputImageRef.current.value,
            price: inputPriceRef.current.value,
        }

        try {
            schemaService.validateSync(data, { abortEarly: false });
        } catch (validationError) {
            const errors = validationError.errors;
            return alert(errors.join("\n"));
        }

        registerService(data);
    }

    function getCategories() {
        axios
        .get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem("user");
            navigate("/");
            if (error.response) {
                return alert(
                    `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                );
            }
            alert(error.message);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container onSubmit={handleForm}>
            <input 
                type="text" 
                placeholder="title" 
                disabled={isDisabled} 
                ref={inputTitleRef} 
                maxLength="20"
                required 
            />
            <select ref={inputCategoryRef} required>
                <option value="" hidden>category</option>
                {categories.map((category, index) => 
                    <option value={category.id} key={index}>
                        {category.category}
                    </option>
                )}
            </select>
            <textarea 
                type="text" 
                placeholder="description" 
                disabled={isDisabled} 
                ref={inputDescriptionRef} 
                required 
            />
            <input 
                type="text" 
                placeholder="image url" 
                disabled={isDisabled} 
                ref={inputImageRef} 
                required
            />
            <input 
                type="number" 
                placeholder="price" 
                disabled={isDisabled} 
                ref={inputPriceRef}
                required
            />
            <WeekContainer>
            </WeekContainer>
            <ButtonContainer>
                <button onClick={() => toggleAddService()}  disabled={isDisabled} type="button">
                    Cancel
                </button>
                <button disabled={isDisabled}>
                    {isDisabled && <ThreeDots height="13px" color="#ffffff"></ThreeDots>}
                    {!isDisabled && "Save"}
                </button>
            </ButtonContainer>
        </Container>
    );
}
