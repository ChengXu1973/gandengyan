import styled from "styled-components";
import { shadowCss } from "./shadow.css";

export const TableStyle = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    background-color: #fff;

    .bottom {
        ${shadowCss}
    }

    .list-container {
        padding: 0 20px;
        height: 100%;
        overflow-y: scroll;
    }

    .list {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .tips {
            width: 100%;
            text-align: center;
            color: ${(props: { isSelf: boolean }) =>
                props.isSelf ? "#1371c3" : "#aaa"};
            font-size: 16px;
            padding: 24px 0;
            font-weight: ${(props) => (props.isSelf ? "bold" : "normal")};
        }
    }

    .win {
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        color: #1371c3;
        font-weight: bold;
    }

    .gameover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        text-align: center;
        ${shadowCss}
    }
`;
