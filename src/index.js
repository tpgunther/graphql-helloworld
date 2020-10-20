const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const getLink = (parent, args) => {
  return links.find((link) => {
    return link.id === args.id
  })
}

const updateLink = (parent, args) => {
  const link = getLink(parent, args)
  if (args.url) {
    link.url = args.url
  }
  if (args.description) {
    link.description = args.description
  }
  return link
}

const deleteLink = (parent, args) => {
  const link = getLink(parent, args)
  links = links.filter((link) => {
    return link.id !== args.id
  })
  return link
}

let idCount = 0
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    get: getLink
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    update: updateLink,
    delete: deleteLink
  },
}

const server = new GraphQLServer({
  // Can receive an object or a string
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))