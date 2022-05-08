import styled from "styled-components";

export const RestartStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0;
    animation: show 0.5s ease 3.5s 1 normal forwards;

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .title {
        text-align: center;
        font-size: 32px;
        color: #1371c3;
        font-weight: bold;
    }

    .button {
        width: 120px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;
        height: 38px;
        line-height: 38px;
        color: #fff;
        background-color: #1371c3;
        user-select: none;
        cursor: pointer;
    }

    .rank {
        margin: 60px 0 100px;
        font-size: 18px;

        span {
            color: #1371c3;
            font-weight: 900;
            font-size: 28px;
            display: inline-block;
            width: 120px;
        }

        .comment {
            font-size: 12px;
            color: #aaa;
            padding-left: 2px;
            margin-bottom: 10px;
        }
    }
`;
