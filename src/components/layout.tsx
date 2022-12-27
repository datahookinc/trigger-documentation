import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { 
    container
} from './layout.module.css'; // no type safety; automatically converts kebab case to camelCase for use in JS
import { Footer} from '../components/footer';
import { Content } from '../components/content';

type Props = {
    pageTitle: string;
    children: React.ReactNode;
}

export default function Layout({ pageTitle, children }: Props) {

    // building block query (component query) processed after the page is rendered
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <div className={container}>
            <Content>
                {children}
            </Content>
            <Footer />
        </div>
    )
}