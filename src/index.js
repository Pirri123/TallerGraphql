const {GraphQLServer} = require('graphql-yoga')

//typedef
const typeDefs = `
type Query{
    info: String!
    feed: [Link!]!
}

type Link{
    id: ID!
    description: String!
    url: String!
}
`
let links = [{
    id: 'link0',
    url: 'tallerGraphQL.com',
    description: 'Un Taller de GraphQL'
    },
    {
        id: 'link1',
        url: 'ITESM.mx',
        description: 'La pagina del tec'
}]
//resolvers
const resolvers = {
    Query: {
        info: () => `El api para un clon de HackerNews`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}
//Inicio de Servidor
const server = new GraphQLServer({
    typeDefs,
    resolvers
})
server.start(() => console.log("Server is running at localhost:4000"))