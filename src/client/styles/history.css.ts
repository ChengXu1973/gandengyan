import styled from "styled-components";

export const HistoryStyle = styled.div`
    width: 100%;
    overflow: hidden;
    padding: 12px 0;
    border-bottom: 1px solid #efefef;

    .player {
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;

        span {
            color: #aaa;
            font-size: 14px;
            padding-left: 10px;
        }

        .few {
            color: coral;
        }
    }

    .cards {
        padding-top: 10px;
        height: ${64 + 10}px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        overflow-x: scroll;
    }

    .card-wrapper {
        width: 28px;
    }
`;
