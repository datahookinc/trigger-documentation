import React from 'react';
import { Navigation } from '../../components/navigation';
import { ContentWrapper } from '../../components/contentWrapper';
import Layout from '../../components/layout';
import MyMdx from '../../content/getting-started.mdx';

export default function GettingStarted() {
    return (
        <Layout pageTitle="getting-started">
            <Navigation />
            <ContentWrapper>
                Getting Started
                <MyMdx />
            </ContentWrapper>
        </Layout>
    )
}