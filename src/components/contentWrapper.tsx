import React from 'react';
import styled from 'styled-components';

const StyledContentWrapper = styled.section`
    flex: 1 1;
    font-size: 1.6rem;
    color: var(--dark-purple);
    position: relative;
    box-sizing: border-box;
    background-color: white;
    overflow: auto;
    
    .inner {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        
        .instructions-main {
            display: flex;
            overflow: auto;
        }

        @media only screen and (max-width: 600px) {
            padding-bottom: 40px;
            padding-right: 20px;
        }
    }

    h1 {
        font-size: 30px;
        text-transform: uppercase;
    }

    pre {
        border-radius: 6px;
        background-color: var(--dark-blue);
        color: var(--light-gray);
        padding: 10px;
        margin-right: 20px;
        tab-size: 4;
        overflow-x: auto;
        margin-top: 4px;
    }

`;

type Props = {
    children: React.ReactNode;
}

export function ContentWrapper({ children }: Props) {
    return (
        <StyledContentWrapper>
            <div className="inner">
                {children}
            </div>
        </StyledContentWrapper>
    )
}
