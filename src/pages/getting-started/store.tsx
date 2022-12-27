import React from 'react';
import { Navigation } from '../../components/navigation';
import { ContentWrapper } from '../../components/contentWrapper';
import Layout from '../../components/layout';
import StoreMdx from '../../content/store.mdx';

export default function GettingStarted() {
    return (
        <Layout pageTitle="Getting Started | Store">
            <Navigation />
            <ContentWrapper>
                <StoreMdx />
            </ContentWrapper>
        </Layout>
    )
}