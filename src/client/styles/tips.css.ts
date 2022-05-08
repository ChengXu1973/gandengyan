import styled from "styled-components";
import { shadowCss } from "./shadow.css";

export const TipsStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    div {
        width: 260px;
        padding: 10px;
        color: #1371c3;
        background-color: #fff;
        word-break: break-all;
        margin-top: 10px;
        ${shadowCss}
    }

    .error {
        color: coral;
    }

    .fade {
        opacity: 0;
        transition: all 0.5s;
    }
`;
