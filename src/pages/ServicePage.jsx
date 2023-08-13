import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function ServicePage() {
    const { userData } = useContext(UserContext);
    const [service, setService] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();
    const { idService } = useParams();

    function getService() {
        axios
            .get(`${import.meta.env.VITE_API_URL}/services/${idService}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            })
            .then((response) => {
                setPageLoading(false);
                setService(response.data);
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
            getService();
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
                            <h2>{service.title}</h2>
                            <button onClick={() => navigate("/services")}>
                                <p>x</p>
                            </button>
                        </Title>
                        <Container>
                            <ServiceImage src={service.image} alt="service picture" />
                            <InfoContainer>
                                <h2>Description</h2>
                                <p>{service.description}</p>
                                <p>Category: {service.category}</p>
                                <p>Price: {service.price}$</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p>Contact: <a href="tel:+5561995166051">{service.contact}</a></p>
                                <p>{service.provider}</p>
                                <p>{service.state} - {service.city}</p>
                            </InfoContainer>
                        </Container>
                    </>
                )}
            </Main>
            <Menu />
        </PageContainer>
    );
}

const ServiceImage = styled.img`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 5px;
`;

const InfoContainer = styled.div`
    background-color: white;
    padding: 20px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    width: 100%;

    h2 {
        color: #1ca0ff;
        font-size: 22px;
        margin-bottom: 10px;
    }

    p:not(:first-child, :nth-child(2)) {
        color: #857cff;
    }

    a {
        color: black;
        text-decoration: none;
        width: fit-content;
        font-size: 18px;
        text-decoration: underline;
        letter-spacing: 2px;
    }

    &:nth-child(3) {
        background-color: transparent;
        p {
            background-color: rgba(0, 0, 0, 0.08);
            width: 100%;
            padding: 10px 0;
            border-radius: 10px;
        }
    }
`;