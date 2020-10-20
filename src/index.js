const { PrismaClient } = require('@prisma/client')
const { GraphQLServer } = require('graphql-yoga')

const prisma = new PrismaClient()

const getLink = (parent, args, context) => {
  return context.prisma.link.findFirst({
    where: { id: parseInt(args.id) }
  })
}

const updateLink = (parent, args, context) => {
  return context.prisma.link.update({
    where: { id: parseInt(args.id) },
    data: { url: args.url, description: args.description }
  })
}

const deleteLink = (parent, args, context) => {
  return context.prisma.link.delete({
    where: { id: parseInt(args.id) }
  })
}

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
    get: getLink
  },
  Mutation: {
    post: async (parent, args, context) => {
      const newLink = await context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        }
      })
      return newLink
    },
    update: updateLink,
    delete: deleteLink
  },
}

const server = new GraphQLServer({
  // Can receive an object or a string
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))