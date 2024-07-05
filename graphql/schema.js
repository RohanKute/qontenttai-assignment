const typeDefs = `
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Query {
        profile: User
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        signup(input: SignupInput!): String
        login(input: LoginInput!): String
    }
`;
