import prisma from "../utils/prisma.js";

const typeDefs = `
  type Newsletter {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Query {
    newsletters: [Newsletter!]!
    newsletter(id: ID!): Newsletter
  }
`;

const resolvers = {
  Query: {
    newsletters: () => prisma.newsletter.findMany(),
    newsletter: (_, { id }) => prisma.newsletter.findUnique({ where: { id } }),
  },
};

export default { typeDefs, resolvers };
