import React from "react";
import { Navigation } from "../components/navigation";
import { ContentWrapper } from "../components/contentWrapper";
import Layout from "../components/layout";
import MDX from "../content/welcome.mdx";
import SEO from "../components/seo";

export default function Welcome() {
    return (
        <Layout>
            <Navigation />
            <ContentWrapper>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <MDX />
                </div>
            </ContentWrapper>
        </Layout>
    );
}

export const Head = () => <SEO title="Welcome" />;
