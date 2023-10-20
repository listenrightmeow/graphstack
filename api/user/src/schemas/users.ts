import gql from "graphql-tag";

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Query  {
    getUser(id: ID): User
    heyUser(name: String): String!
  }

  type User @key(fields: "id") @shareable {
    id: ID!
    name: String
  }

  type Mutation {
    createUser(id: ID, name: String): User
    updateUser(id: ID, name: String): User
  }
`;

export default typeDefs;