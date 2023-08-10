import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const Bar = styled.div`
    background-color: #126ba5;
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    z-index: 1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: #ffffff;
        font-family: "Bebas Neue", sans-serif;
        font-size: 39px;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;

export const UserContainer = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    gap: 20px;

    h2 {
        font-size: 18px;
        color: #ffffff;
        text-align: end;
        line-height: 25px;
        text-wrap: balance;
    }

    button {
        background-color: transparent;
        padding: 0;
        height: 25px;
        border: none;
    }
`;

export const LogoutIcon = styled(RiLogoutBoxRLine)`
    font-size: 25px;
    color: #ffffff;
`;
