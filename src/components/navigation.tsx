import React from 'react';
import { Link } from 'gatsby';
import { activePage } from './layout.module.css';
import styled from 'styled-components';

const StyledNavigation = styled.div`
    flex-basis: clamp(260px, 20%, 300px);
    border-right: 1px solid black;
    overflow-y: auto;
    font-size: 1.6rem;

    img {
        width: 24px;
        height: 24px;
        position: absolute;
        padding-left: 10px;
    }

    sup {
        font-size: 18px;
        font-family: monospace;
    }

    h1 {
        margin-left: 20px;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        font-size: 30px;
    }

    a, a:visited {
        text-decoration: none;
        color: var(--context-background);
    }

    a[aria-current="page"] {
        font-weight: bold;
    }

    a:hover:not(a[aria-current="page"]) {
        color: var(--purple);
    }

    ul {
        list-style: none;

        li {
            margin-top: 10px;
        }
    }
`;

export function Navigation() {
    return (
        <StyledNavigation>
            <h1>TRIGGER <sup>v0.6.0 <img src="/lightning.png" /></sup></h1>
            <nav>
                <ul>
                    <li><Link to="/">Overview</Link></li>
                    <li><Link to="/installation">Installation</Link></li>
                    <li>
                        <Link to="/getting-started">Getting Started</Link>
                        <ul>
                            <li><Link to="/getting-started/store">Setting up your store</Link></li>
                            <li><Link to="/getting-started/triggers">Working with triggers</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/api">API</Link></li>
                    <li><Link to="/example">Example</Link></li>
                    <li><Link to="/github">Github</Link></li>
                </ul>
            </nav>
        </StyledNavigation>
    )
}