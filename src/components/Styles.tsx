import styled from 'styled-components';

export const StyledLink = styled.a`
    
    border-radius: 6px;
    text-decoration: none;
    color: var(--purple);
    display: inline-block;
    padding: 2px 6px 2px 6px;

    :hover {
        background-color: var(--light-code);
    }

    :visited {
        border-radius: 6px;
        text-decoration: none;
        color: var(--purple);
        display: inline-block;
        padding: 2px 6px 2px 6px;
    }
`;