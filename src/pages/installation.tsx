import React from 'react';
import { Navigation } from '../components/navigation';
import { ContentWrapper } from '../components/contentWrapper';
import Layout from '../components/layout';
import MDX from '../content/installation.mdx';

export default function Installation() {
    return (
        <Layout pageTitle="Installation">
            <Navigation />
            <ContentWrapper>
                <MDX />
            </ContentWrapper>
        </Layout>
    )
}