import React from 'react';
import { Navigation } from '../../components/navigation';
import { ContentWrapper } from '../../components/contentWrapper';
import Layout from '../../components/layout';
import MDX from '../../content/getting-started/getting-started.mdx';

export default function GettingStarted() {
    return (
        <Layout pageTitle="Getting Started">
            <Navigation />
            <ContentWrapper>
                <MDX />
            </ContentWrapper>
        </Layout>
    )
}