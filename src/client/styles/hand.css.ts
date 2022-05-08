import styled from "styled-components";

export const HandStyle = styled.div`
    max-height: 180px;
    overflow-y: scroll;
    padding: 10px 20px 0;
    margin: 20px 0 10px;

    .hand {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 60px);
        grid-template-rows: repeat(auto-fill, 78px);
        row-gap: 8px;
    }
`;
