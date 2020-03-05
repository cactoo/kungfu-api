const { ApolloServer, gql } = require("apollo-server")

const typeDefs = gql`
  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String
    releaseDate: String
    rating: Int
    status: Status
    actor: [Actor]
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`

const movies = [
  {
    id: "1",
    title: "5 Deadly Venoms",
    releaseDate: "10-10-1983",
    rating: 5
  },
  {
    id: "2",
    title: "36th Chamger",
    releaseDate: "10-10-1983",
    rating: 5,
    actor: [
      {
        id: "asdsad",
        name: "John"
      }
    ]
  }
]

const resolvers = {
  Query: {
    movies: () => {
      return movies
    },

    movie: (obj, { id }, context) => {
      const foundMovie = movies.find(m => m.id === id)
      return foundMovie
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`)
})
