import React from 'react';
import { Navigation } from '../components/navigation';
import { ContentWrapper } from '../components/contentWrapper';
import Layout from '../components/layout';
import MDX from '../content/overview.mdx';

export default function Overview() {
    return (
        <Layout pageTitle="Overview">
            <Navigation />
            <ContentWrapper>
                <MDX />
            </ContentWrapper>
        </Layout>
    )
}