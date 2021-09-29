// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ['schema.docs.graphql'],
      documents: ['**/*.{graphql,js,ts,jsx,tsx}'],
      extensions: {
        endpoints: {
          default: {
            url: 'https://api.github.com/graphql',
            // headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          },
        },
      },
    },
  },
}
