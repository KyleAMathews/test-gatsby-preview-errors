console.log(process.env)

// Create NUM_PAGES nodes, split over NUM_TYPES types. Each node has
// the bare minimum of content
exports.sourceNodes = ({ actions: { createNode } }) => {
  for (let i = 0; i < 10; i++) {
    const hasError = Math.random() > 0.5
    const id = i.toString()
    const node = {
      id,
      hasError,
      parent: null,
      children: [],
      internal: {
        type: `hasError`,
        contentDigest: i + hasError.toString(),
      },
    }

    createNode(node)
  }
}

const template = require.resolve(`./src/templates/errors-sometimes.js`)
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(
    `
      {
        allHasError {
          nodes {
            hasError
          }
        }
      }
    `
  )
  result.data.allHasError.nodes.forEach((node, i) => {
    console.log({ node, i })
    createPage({
      path: `/${i}`,
      component: template,
      context: {
        hasError: node.hasError,
      },
    })
  })
}
