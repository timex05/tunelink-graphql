import prisma from "../utils/prisma.js";

const typeDefs = `#graphql
  enum Role { USER ADMIN }
  enum State { ACTIVE PENDING_CONFIRMATION SUSPEND }
  enum DummyProfileType { MALE FEMALE }
  enum AuthProvider { GOOGLE GITHUB }

  type LinktreeAnalytics {
    clicks: Int!
    likes: LikeStats!
    comments: Int!
    relevance: Float!
  }

  type LikeStats {
    count: Int!
    liked: Boolean!
  }

  type LinktreeUrls {
    amazonmusic: String
    applemusic: String
    soundcloud: String
    spotify: String
    youtube: String
    youtubemusic: String
    ytId: String
  }

  type Comment {
    id: ID!
    message: String!
    createdAt: String!
    owner: User!
  }

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

  type Linktree {
    id: ID!
    title: String!
    interpret: String!
    album: String
    description: String
    cover: String
    isPublic: Boolean!
    releaseDate: String!
    clicks: Int!
    ownerId: String!

    analytics: LinktreeAnalytics!
    owner: User!
    urls: LinktreeUrls!
    comments: [Comment!]!   # NEU
  }

  type Query {
    linktrees: [Linktree!]!
    linktree(id: ID!): Linktree
  }
`;

const resolvers = {
  Query: {
    linktrees: () => prisma.linktree.findMany(),
    linktree: (_, { id }) => prisma.linktree.findUnique({ where: { id } }),
  },

  Linktree: {
    analytics: async (parent) => {
      const clicks = parent.clicks;

      const likesCount = await prisma.like.count({
        where: { linktreeId: parent.id },
      });

      const liked = false;

      const commentsCount = await prisma.comment.count({
        where: { linktreeId: parent.id },
      });

      const relevance = clicks * 0.5 + likesCount * 3 + commentsCount * 5;

      return {
        clicks,
        likes: { count: likesCount, liked },
        comments: commentsCount,
        relevance,
      };
    },

    owner: async (parent) => {
      return prisma.user.findUnique({ where: { id: parent.ownerId } });
    },

    urls: (parent) => ({
      amazonmusic: parent.amazonmusicUrl,
      applemusic: parent.applemusicUrl,
      soundcloud: parent.soundcloudUrl,
      spotify: parent.spotifyUrl,
      youtube: parent.youtubeUrl,
      youtubemusic: parent.youtubemusicUrl,
      ytId: parent.ytId,
    }),

    comments: async (parent) => {
      return prisma.comment.findMany({
        where: { linktreeId: parent.id },
        orderBy: { createdAt: 'asc' },
      });
    },
  },

  Comment: {
    owner: async (parent) => {
      return prisma.user.findUnique({ where: { id: parent.ownerId } });
    },
  },
};

export default { typeDefs, resolvers };
