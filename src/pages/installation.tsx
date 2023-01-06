import React from 'react';
import { Navigation } from '../components/navigation';
import { ContentWrapper } from '../components/contentWrapper';
import Layout from '../components/layout';
import MDX from '../content/installation.mdx';
import SEO from '../components/seo';

export default function Installation() {
    return (
        <>
            <Layout>
                <Navigation />
                <ContentWrapper>
                    <MDX />
                </ContentWrapper>
            </Layout>
        </>
    )
}

export const Head = () => <SEO title="Installation" />