import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Trigger TODO App`,
		siteUrl: `https://www.trigger.datahook.ca`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-styled-components",
		"gatsby-plugin-google-gtag",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-mdx",
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "pages",
				"path": "./src/pages/"
			},
			__key: "pages"
		},
		// {
		// 	resolve: "gatsby-source-filesystem",
		// 	options: {
		// 		name: "tour",
		// 		path: `${__dirname}/tour`,
		// 	},
		// 	__key: "tour",
		// },
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "tour",
				path: `${__dirname}/src/content`,
			},
			__key: "tour",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
	]
};

export default config;
