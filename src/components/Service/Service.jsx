import { Container, Text, Check } from "./style";
import checkImg from "../../assets/check.png";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Service(props) {
    const { info, type, updateServices, token } = props;
    const [isWaiting, setIsWaiting] = useState(false);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    function handleStatus() {
        setIsWaiting(true);

        if (info.active) {
            axios
                .put(`${import.meta.env.VITE_API_URL}/services/${info.id}/inactive`, "", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    updateServices(setIsWaiting);
                })
                .catch((error) => {
                    setIsWaiting(false);
                    console.log(error);
                    if (error.response) {
                        return alert(
                            `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                        );
                    }
                    alert(error.message);
                });
            return;
        }
        axios
            .put(`${import.meta.env.VITE_API_URL}/services/${info.id}/active`, "", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateServices(setIsWaiting);
            })
            .catch((error) => {
                setIsWaiting(false);
                console.log(error);
                if (error.response) {
                    return alert(`${error.response.data} Error ${error.response.status}: ${error.response.statusText}`);
                }
                alert(error.message);
            });
    }

    function deleteService() {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/services/${info.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateServices();
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    function confirmDeleteService() {
        MySwal.fire({
            title: "Delete service?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            width: 300,
            confirmButtonColor: "#52B6FF",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteService();
            }
        });
    }

    function handleClick() {
        if (type !== "private") {
            navigate(`/service/${info.id}`);
        }
    }

    return (
        <Container $private={type==="private"} onClick={handleClick} tabIndex="0">
            <img src={info.image} />
            <Text>
                <h3>{info.title}</h3>
                {type === "private" ? (
                    <div>
                        <p>{info.category}</p>
                        <p>${info.price}</p>
                    </div>
                ) : (
                        <div>
                            <p>{info.state}</p>
                            <p>{info.city}</p>
                        </div>
                )}
            </Text>
            {type === "private" ? (
                    <>
                        <div>
                            <p>Active?</p>
                            <Check onClick={handleStatus} $active={info.active} disabled={isWaiting}>
                                {isWaiting ? <TailSpin width="40" radius="0" color="#ffffff" /> : <img src={checkImg} alt="Check" />}
                            </Check>
                        </div>
                        <div>
                            <p>{info.description}</p>
                        </div>
                        <button id="deleteButton" onClick={confirmDeleteService}>
                            <FaRegTrashCan id="deleteButtonImg"/>
                        </button>
                    </>
                ) : null}
        </Container>
    );
}
