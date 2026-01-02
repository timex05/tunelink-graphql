import prisma from "../utils/prisma.js";

const typeDefs = `
  type Comment {
    id: ID!
    message: String!
    createdAt: String!
    ownerId: String!
    linktreeId: String!
  }

  type Query {
    comments: [Comment!]!
    comment(id: ID!): Comment
  }
`;

const resolvers = {
  Query: {
    comments: () => prisma.comment.findMany(),
    comment: (_, { id }) => prisma.comment.findUnique({ where: { id } }),
  },
};

export default { typeDefs, resolvers };
