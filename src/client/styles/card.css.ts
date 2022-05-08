import styled from "styled-components";
import { shakeAnim } from "./shake.css";

export const CardStyle = styled.div`
    ${(props: { selected: boolean }) => (props.selected ? shakeAnim : "")}

    width: 48px;
    height: 64px;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    padding: 4px;
    background-color: #fff;
    border: 1px solid black;
    position: relative;
    font-weight: bold;

    top: ${(props) => (props.selected ? "-3px" : "0")};

    .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .cardid {
        font-size: 12px;
        color: gray;
    }

    .suit0 .point {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }

    .suit {
        font-size: 24px;
        text-align: center;
    }

    .suit1,
    .suit3,
    .point14 {
        color: coral;
    }

    .suit2,
    .suit4,
    .point13 {
        color: black;
    }

    @keyframes shakeTopx {
        0%,
        100% {
            transform: rotate(0deg);
            transform-origin: 50% 0;
        }

        5% {
            transform: rotate(2deg);
        }

        10%,
        20%,
        30% {
            transform: rotate(-4deg);
        }

        15%,
        25%,
        35% {
            transform: rotate(4deg);
        }

        40% {
            transform: rotate(-2deg);
        }

        45% {
            transform: rotate(2deg);
        }

        50% {
            transform: rotate(0deg);
        }
    }
`;
