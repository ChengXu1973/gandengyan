import styled from "styled-components";

export const LoginStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1371c3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    z-index: 99;

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

    div {
        margin-top: 60px;
        cursor: pointer;
        user-select: none;
        text-align: center;
        height: 60px;
        line-height: 60px;
        width: 260px;
        border: 4px solid #fff;
    }
`;
