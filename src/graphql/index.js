import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import user from "./user.js";
import linktree from "./linktree.js";
import like from "./like.js";
import comment from "./comment.js";
import newsletter from "./newsletter.js";


const typeDefs = mergeTypeDefs([
  user.typeDefs,
  linktree.typeDefs,
  like.typeDefs,
  comment.typeDefs,
  newsletter.typeDefs,
]);

const resolvers = mergeResolvers([
  user.resolvers,
  linktree.resolvers,
  like.resolvers,
  comment.resolvers,
  newsletter.resolvers,
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
