import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Service from "../components/Service/Service";
import { styled } from "styled-components";
import brazilianStates from "../brazilianStates";

export default function ServicesPage() {
    const { userData } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const filterCategory = useRef(null);
    const filterUF = useRef(null);
    const navigate = useNavigate();

    function getUrl() {
        let url = '/services';
        const category = filterCategory.current ? parseInt(filterCategory.current.value) : NaN;
        const uf = filterUF.current ? filterUF.current.value : '';
    
        if (!isNaN(category) && brazilianStates.includes(uf)) {
            url += `?category=${category}&state=${uf}`;
        } else if (!isNaN(category)) {
            url += `?category=${category}`;
        } else if (brazilianStates.includes(uf)) {
            url += `?state=${uf}`;
        }
        return url;
    }

    function getCategories() {
        axios
            .get(`${import.meta.env.VITE_API_URL}/categories`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            })
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("user");
                navigate("/");
                if (error.response) {
                    return alert(`${error.response.data} Error ${error.response.status}: ${error.response.statusText}`);
                }
                alert(error.message);
            });
    }

    function getServices() {
        const url = getUrl();
        axios
            .get(`${import.meta.env.VITE_API_URL}${url}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            })
            .then((response) => {
                if (pageLoading) {
                    setPageLoading(false);
                }
                setServices(response.data);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("user");
                navigate("/");
                if (error.response) {
                    return alert(`${error.response.data} Error ${error.response.status}: ${error.response.statusText}`);
                }
                alert(error.message);
            });
    }

    useEffect(() => {
        if (userData && userData.token) {
            getServices();
            getCategories();
        }
    }, []);

    return (
        <PageContainer>
            <TopBar />
            <Main>
                {pageLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <Title>
                            <h2>Get a service today!</h2>
                        </Title>
                        <OptionsContainer>
                            <div>
                                <label htmlFor="category-filter">Category :</label>
                                <select id="category-filter" ref={filterCategory} onChange={getServices}>
                                    <option value="all">All</option>
                                    {categories.map((category, index) => (
                                        <option value={category.id} key={index}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="uf-filter">UF :</label>
                                <select id="uf-filter" ref={filterUF} onChange={getServices}>
                                    <option value="all">All</option>
                                    {brazilianStates.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </OptionsContainer>
                        <Container>
                            {services.length === 0 ? (
                                <p>No services available</p>
                            ) : (
                                services.map((dailyHabit, index) => (
                                    <Service key={index} info={dailyHabit} token={userData.token} />
                                ))
                            )}
                        </Container>
                    </>
                )}
            </Main>
            <Menu />
        </PageContainer>
    );
}

const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
    padding: 0px 20px;
    gap: 10px;
    margin-top: 30px;

    div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    label {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    select {
        outline: none;
        border: none;
        font-size: 16px;
        text-align: center;
        font-family: inherit;
        padding: 5px 2px;
        border-radius: 10px;

        option {
            padding: 0;
        }
    }
`;
