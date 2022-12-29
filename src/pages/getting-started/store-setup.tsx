import React from 'react';
import { Navigation } from '../../components/navigation';
import { ContentWrapper } from '../../components/contentWrapper';
import Layout from '../../components/layout';
import MDX from '../../content/getting-started/store-setup.mdx';

export default function GettingStarted() {
    return (
        <Layout>
            <Navigation />
            <ContentWrapper>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <MDX />
                </div>
            </ContentWrapper>
        </Layout>
    )
}