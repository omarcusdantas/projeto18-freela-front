import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    max-width: 700px;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    align-items: center;
    text-align: left;

    justify-content: ${(props) => {
        if (props.$private) {
            return "center";
        }
        return "start";
    }};

    cursor: ${(props) => {
        if (props.$private) {
            return "default";
        }
        return "pointer";
    }};

    h3 {
        color: #666666;
        font-size: 21px;
        margin-bottom: 7px;
        width: 235px;
    }

    img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
    }

    div:nth-child(4) {
        width: 100%;
        text-align: center;
    }

    > button {
        background-color: transparent;
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 8px;
        cursor: pointer;
        border: none;
    }

    @media (max-width: 460px) {
        text-align: center;
        justify-content: center;
        gap: 20px;

        div p {
            text-align: center;
        }
    }
`;

export const Text = styled.div`
    p {
        font-size: 17px;
        color: #666666;
        line-height: 20px;
        text-align: left;
    }
`;

export const Check = styled.button`
    margin-top: 10px;
    min-width: 69px;
    width: 69px;
    height: 69px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => {
        if (props.$active) {
            return "#8FC549";
        }
        return "#EBEBEB";
    }};

    border: 1px solid
        ${(props) => {
            if (props.$active) {
                return "#8FC549";
            }
            return "#E7E7E7";
        }};

    &:disabled {
        cursor: default;
    }

    img {
        width: 36px;
        height: 28px;
    }
`;
