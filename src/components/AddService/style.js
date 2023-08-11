import styled from "styled-components";

export const Container = styled.form`
    background-color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    max-width: 700px;
    margin: 20px auto;

    input, select, textarea {
        font-size: 20px;
        width: 100%;
        height: 45px;
        padding: 0 11px;
        margin-top: 10px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;

        &::placeholder {
            color: #dbdbdb;
        }
    }

    textarea {
        min-height: 100px;
        padding: 10px;
        max-height: 100px;
        min-width: 100%;
        max-width: 100%;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 23px;

    button:first-child {
        background-color: #ffffff;
        font-size: 16px;
        color: #52b6ff;
        width: 69px;
        height: 20px;
        border-radius: 4.6px;

        &:disabled {
            cursor: default;
        }
    }

    button:nth-child(2) {
        background-color: #52b6ff;
        font-size: 16px;
        color: #ffffff;
        width: 84px;
        height: 35px;
        border-radius: 4.6px;

        &:disabled {
            background-color: #86ccff;
            cursor: default;
        }
    }
`;

export const WeekContainer = styled.div`
    margin: 8px 0 29px 0;
    display: flex;
    gap: 4px;
`;
