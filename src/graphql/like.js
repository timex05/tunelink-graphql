import prisma from "../utils/prisma.js";

const typeDefs = `
  type Like {
    id: ID!
    createdAt: String!
    userId: String!
    linktreeId: String!
  }

  type Query {
    likes: [Like!]!
    like(id: ID!): Like
  }
`;

const resolvers = {
  Query: {
    likes: () => prisma.like.findMany(),
    like: (_, { id }) => prisma.like.findUnique({ where: { id } }),
  },
};

export default { typeDefs, resolvers };
