// user.js
import prisma from "../utils/prisma.js";
import linktreeModule from "./linktree.js";

const typeDefs = `
  enum Role { USER ADMIN }
  enum State { ACTIVE PENDING_CONFIRMATION SUSPEND }
  enum DummyProfileType { MALE FEMALE }
  enum AuthProvider { GOOGLE GITHUB }

  type User {
    id: ID!
    email: String!
    nickname: String!
    image: String
    dummyProfileType: DummyProfileType!
    description: String
    oauthId: String
    oauthProvider: AuthProvider
    role: Role!
    isNewsLetter: Boolean!
    createdAt: String!
    updatedAt: String!
    lastlogin: String
    state: State!
    linktrees: [Linktree!]!  
  }

  ${linktreeModule.typeDefs}  

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
  }
`;

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),
    userByEmail: (_, { email }) => prisma.user.findUnique({ where: { email } }),
  },

  User: {
    linktrees: async (parent) => {
      const linktrees = await prisma.linktree.findMany({ where: { ownerId: parent.id } });
      return linktrees.map((lt) => ({
        ...lt,
      }));
    },
  },
  
  Linktree: {
    analytics: async (parent) => {
      const clicks = parent.clicks;
  
      const likesCount = await prisma.like.count({ where: { linktreeId: parent.id } });
      const liked = false;
      const commentsCount = await prisma.comment.count({ where: { linktreeId: parent.id } });
  
      const relevance = clicks * 0.5 + likesCount * 3 + commentsCount * 5;
  
      return {
        clicks,
        likes: { count: likesCount, liked },
        comments: commentsCount,
        relevance,
      };
    },
  },
  
};

export default { typeDefs, resolvers };
