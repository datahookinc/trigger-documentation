import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.main`
    display: flex;
    overflow: auto;
    grid-area: content;
    width: 100%;
    height: calc(100vh - 35px);

    @media only screen and (max-width: 800px) {
        display: block;

        h1 {
            text-align: center;
        }
    }
`;

type Props = {
    children: React.ReactNode;
}

export function Content({ children }: Props) {
    return (
        <StyledContent>
            { children }
        </StyledContent>
    )
}
