import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const StyledNavigation = styled.div`
  flex-basis: clamp(280px, 20%, 320px);
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
    position: relative;
  }

  a {
    display: block;
    border-radius: 6px;
    padding: 8px;
  }

  a,
  a:visited {
    text-decoration: none;
    color: var(--context-background);
  }

  a[aria-current="page"] {
    font-weight: bold;
    position: relative;
  }

  a[aria-current="page"]:before {
    content: "";
    border-left: 3px solid var(--purple);
    position: absolute;
    left: 0px;
    height: 22px;
  }

  a:hover:not(a[aria-current="page"]):not(.no-link) {
    color: var(--purple);
    cursor: pointer;
    background-color: var(--light-code);
  }

  ul {
    list-style: none;
  }

  @media only screen and (max-width: 800px) {
    font-size: 1.7rem;
  }
`;

export function Navigation() {
  return (
    <StyledNavigation>
      <a className="no-link" href="/">
        <h1>
          TRIGGER{" "}
          <sup>
            v0.21 <img src="/lightning.png" />
          </sup>
        </h1>
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/">Welcome</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/installation">Installation</Link>
          </li>
          <li>
            <Link to="/example">Example</Link>
          </li>
          <li>
            <Link to="/api">API</Link>
          </li>
          <li>
            <Link to="/getting-started">Getting Started</Link>
            <ul>
              <li>
                <Link to="/getting-started/store-setup">
                  Setting up your store
                </Link>
              </li>
              <li>
                <Link to="/getting-started/using-store">Using your store</Link>
              </li>
              <li>
                <Link to="/getting-started/working-with-tables">
                  Working with Tables
                </Link>
              </li>
              <li>
                <Link to="/getting-started/working-with-singles">
                  Working with Singles
                </Link>
              </li>
              <li>
                <Link to="/getting-started/working-with-queues">
                  Working with Queues
                </Link>
              </li>
              <li>
                <Link to="/getting-started/working-with-triggers">
                  Working with Triggers
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://github.com/datahookinc/trigger"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.npmjs.com/package/@datahook/trigger"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </li>
        </ul>
      </nav>
    </StyledNavigation>
  );
}
