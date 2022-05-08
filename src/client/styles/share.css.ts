import styled from "styled-components";

export const ShareStyle = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    overflow: hidden;
    background-color: #fff;
    color: #1371c3;

    .roomid {
        text-align: center;
        color: #fff;
        background-color: #1371c3;
        margin-bottom: 30px;
        width: 248px;
        padding: 10px;
    }

    .title {
        font-size: 48px;
        margin-bottom: 20px;
        letter-spacing: 4px;
    }

    .id {
        font-size: 12px;
        font-weight: normal;
        user-select: text;
    }

    .button {
        margin: 30px 0;
        height: 60px;
        line-height: 60px;
        width: 260px;
        text-align: center;
        border: 4px solid #1371c3;
        cursor: pointer;
        user-select: none;
        font-size: 38px;
    }
`;
