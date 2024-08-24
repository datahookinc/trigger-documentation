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
        padding-bottom: 40px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 14px;
        
        .instructions-main {
            display: flex;
            overflow: auto;
        }

        @media only screen and (max-width: 800px) {
            padding-bottom: 60px;
            padding-right: 20px;
            padding-top: 0px;
        }
    }

    h1 {
        font-size: 30px;
        text-transform: uppercase;
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
