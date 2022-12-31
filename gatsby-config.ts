import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Trigger Documentation`,
		siteUrl: `https://www.trigger.datahook.ca`,
	},
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-styled-components",
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
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "content",
				path: `${__dirname}/src/content`,
			},
			__key: "content",
		},
	]
};

export default config;
