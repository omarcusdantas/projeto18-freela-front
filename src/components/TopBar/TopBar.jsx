import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../UserContext";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { Bar, Container, UserContainer, LogoutIcon } from "./style"

export default function TopBar() {
    const { userData } = useContext(UserContext);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    function logout() {
        MySwal.fire({
            title: "Logout?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            width: 300,
            confirmButtonColor: "#52B6FF"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                navigate("/");
            }
        });
    }

    useEffect(() => {
        if (!userData || !userData.name || !userData.token) {
            navigate("/");
        }
    }, []);

    return (
        <Bar>
            <Container>
                <h1>SkillHarbor</h1>
                <UserContainer>
                    <h2>{userData && userData.name? userData.name : ""}</h2>
                    <button onClick={logout}><LogoutIcon /></button>
                </UserContainer>
            </Container>
        </Bar>
    );
}
