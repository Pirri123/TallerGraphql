const {GraphQLServer} = require('graphql-yoga')
const {prisma} = require('./generated/prisma-client')

//resolvers
const resolvers = {
    Query: {
        info: () => `El api para un clon de HackerNews`,
        feed: (parent, args, context) => {
            return context.prisma.links()
        },
    },
    Mutation: {
        post: (parent, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        },
    },
}
//Inicio de Servidor
const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
    context: {prisma}
})
server.start(() => console.log("Server is running at localhost:4000"))