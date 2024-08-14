import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Prism from 'prismjs';
import { ToggleComponent, type AllowedSelection } from '../../components/api-toggle';
import 'prismjs/components/prism-typescript.min.js';
import table from './table';
import single from './single';
import queue from './queue';
import { type Section } from './types';
import { StyledLink } from '../../components/Styles';

type APIData = { [Property in AllowedSelection]: Section }
const data: APIData = {
    table,
    single,
    queue
};

const StyledHeader = styled.span`
    background-color: var(--light-code);
    border-radius: 6px;
    padding: 2px;
    margin-top: 16px;
    font-size: 22px;
    font-weight: lighter;
    display: inline-block;
    font-family: var(--code-font);
    margin-top: 60px;
`;

const StyledList = styled.ul`
    li {
        margin-bottom: 12px;

        .p-name, .p-bracket {
            font-weight: bold;
        }

        .p-optional {
            font-family: var(--code-font);
            font-size: 0.6em;
            vertical-align: middle;
        }

        .p-code {
            font-size: 0.9em
        }
    }
`;

export default function API() {
    const [selectedComponent, setSelectedComponent] = useState<AllowedSelection>(() =>{
        const selectedType = ["table", "single", "queue"];
        const idx = selectedType.indexOf(globalThis.location && globalThis.location.hash.replace("#", ""));
        return idx > -1 ? selectedType[idx] as AllowedSelection : 'table';
    });
    const d = data[selectedComponent];

    useEffect(() => {
        Prism.highlightAll();
    });

    useEffect(() => {
    });

    // <a href="#anchor-name">Jump to the part of the page with the “anchor-name” id </a>
    return (
        <>
            <ToggleComponent component={selectedComponent} setComponent={setSelectedComponent} />
            <h2>{d.name}</h2>
            <span dangerouslySetInnerHTML={{ __html: d.description}}></span>
            <ul>
                {d.api.map(v =>
                <li key={v.name}>
                    <StyledLink href={`#${v.name}`}>{v.name}</StyledLink>
                </li>
                )}
            </ul>
            {
                d.api.map(v =>
                    <div key={v.name}>
                        <StyledHeader id={`${v.name}`}>{v.name}</StyledHeader>
                        <p dangerouslySetInnerHTML={{ __html:  v.description }}></p>
                        <pre className="signature" style={{ marginTop: '16px' }}>
                            <code>{v.signature}</code>
                        </pre>
                        <div>
                            <strong>Parameters</strong>
                            {v.parameters.length > 0 ?
                                <StyledList>
                                    {v.parameters.map(p =>
                                        <li key={p.name}>
                                            <span className="p-name">{p.name} </span>
                                            { p.optional && <span className="p-optional">(optional) </span>}
                                            <span className="p-bracket"> (</span>
                                            <span>
                                                <code className="p-code">
                                                    {p.type}
                                                </code>
                                            </span>
                                            <span className="p-bracket">)</span>
                                            <span>: </span>
                                            <span dangerouslySetInnerHTML={{ __html: p.description }}></span>
                                        </li>
                                    )}
                                </StyledList>
                            :
                            <div style={{ marginBottom: '16px', marginTop: '1em' }}>None</div>
                            }
                        </div>
                        <div>
                            <strong>Returns</strong>
                            <div dangerouslySetInnerHTML={{ __html: v.returns}} style={{ marginTop: '16px', marginBottom: '16px' }}></div>
                        </div>
                        <div>
                            <strong>Examples</strong>
                        </div>
                        { v.examples.map(ex => 
                            <pre style={{ marginTop: '16px' }} key={ex}>
                                <code className="language-typescript" style={{ fontWeight: 'normal' }}>{ex}</code>
                            </pre>
                        )}
                    </div>
                )
            }
        </>
    )
}
