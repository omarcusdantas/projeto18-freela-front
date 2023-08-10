import styled from "styled-components";

export const LoginContainer = styled.div`
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin: 68px 0 33px 0;
    }

    form {
        min-height: 447px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;
    }

    input {
        font-size: 20px;
        padding: 0 11px;
        width: 303px;
        height: 45px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;

        &::placeholder {
            color: #dbdbdb;
        }
    }

    button[type="submit"] {
        background-color: #52b6ff;
        color: #ffffff;
        font-size: 20px;
        width: 303px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 4.6px;
        transition: all 0.3s ease;

        &:disabled {
            background-color: #86ccff;
            cursor: default;
        }

        &:not(:disabled):hover {
            background-color: #5470ff;
        }
    }

    div {
        position: relative;
    }

    div > button {
        background-color: transparent;
        font-size: 30px;
        color: #757575;
        padding: 0;
        position: absolute;
        top: 7px;
        right: 7px;
    }

    a {
        font-size: 14px;
        color: #52b6ff;
        margin-top: 25px;
    }

    label {
        color: #7a7a7a;
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #d5d5d5;
        border-radius: 4.6px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    input[type="checkbox"] {
        width: 23px;
        height: 23px;
    }

    #check-password {
        background-color: ${(props) => {
            if (!props.rightPassword) {
                return "#F9C0C0";
            }
        }};
    }
`;

export const PageContainer = styled.div`
    background-color: #f2f2f2;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;

export const Main = styled.div`
    width: 100%;
    max-width: 935px;
    margin-top: 92px;
    margin-bottom: 115px;
    padding: 0 15px;
`;

export const Title = styled.div`
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: end;
    position: relative;

    h2 {
        text-align: center;
        font-size: 23px;
        color: #126ba5;
    }

    button {
        background-color: #52b6ff;
        width: 40px;
        height: 35px;
        border-radius: 4.6px;
        position: absolute;
        right: 0;

        p {
            color: #ffffff;
            font-size: 27px;
            position: absolute;
            top: -2px;
            left: 11.7px;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 29px;

    p {
        font-size: 18px;
        color: #666666;
        line-height: 22px;
        text-align: center;
    }
`;
