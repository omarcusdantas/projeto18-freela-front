import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    display: flex;
    gap: 30px;
    align-items: center;

    h3 {
        color: #666666;
        font-size: 20px;
        margin-bottom: 7px;
    }

    img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
    }
`;

export const Text = styled.div`
    p {
        font-size: 13px;
        color: #666666;
        line-height: 16px;
        text-align: left;
    }
`;
