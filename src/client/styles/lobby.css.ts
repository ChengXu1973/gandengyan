import styled from "styled-components";

export const LobbyStyle = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    overflow: hidden;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.font};

    .button {
        margin: 30px 0;
        height: 60px;
        line-height: 60px;
        width: 260px;
        text-align: center;
        border: 4px solid;
        cursor: pointer;
        user-select: none;
        border-color: ${(props) => props.theme.font};
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        user-select: none;
    }

    input {
        display: block;
        outline-style: none;
        border: 0px;
        width: 260px;
        font-size: 48px;
        background-color: #fff;
        font-weight: bold;
        color: #1371c3;
        text-align: center;
        caret-color: #1371c3;
        height: 68px;
        line-height: 68px;
        margin: 30px 0;
    }

    input::placeholder {
        color: #1371c3;
    }

    input:-ms-placeholder {
        color: #1371c3;
    }

    input::-moz-placeholder {
        color: #1371c3;
    }

    input::-webkit-input-placeholder {
        color: #1371c3;
    }
`;

export const LobbyWhite = {
    font: "#1371c3",
    bg: "#fff",
};

export const LobbyBlue = {
    font: "#fff",
    bg: "#1371c3",
};
