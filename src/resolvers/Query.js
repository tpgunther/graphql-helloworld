function feed(parent, args, context, info) {
  return context.prisma.link.findMany()
}

function get(parent, args, context, info) {
  return context.prisma.link.findFirst({
    where: { id: parseInt(args.id) }
  })
}

module.exports = {
  feed,
  get
}