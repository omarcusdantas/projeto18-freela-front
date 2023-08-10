import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Service from "../components/Service/Service";
import AddService from "../components/AddService/AddService";

export default function MyServicesPage() {
    const { userData } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [isAddService, setIsAddService] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();

    function getServices() {
        axios
            .get(`${import.meta.env.VITE_API_URL}/services/mine`, {
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
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    useEffect(() => {
        if (userData && userData.token) {
            getServices();
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
                            <h2>My services</h2>
                            <button onClick={() => setIsAddService(!isAddService)}><p>+</p></button>
                        </Title>
                        {   
                            isAddService &&
                            <AddService 
                                toggleAddHabit={setIsAddService} 
                                token={userData.token}
                            />
                        }
                        <Container>
                            {services.length === 0 ? (
                                <p>Add service and start working today!</p>
                            ) : (
                                services.map((dailyHabit, index) => (
                                    <Service
                                        key={index}
                                        info={dailyHabit}
                                        token={userData.token}
                                        type="private"
                                    />
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
