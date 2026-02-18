import express from "express";
import { ApolloServer } from "apollo-server-express";
import prisma from "./utils/prisma.js";


import schema from "./graphql/index.js";

prisma.$connect()
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => console.error("❌ Database connection error:", err));



const app = express();

const server = new ApolloServer({ schema, introspection: true });
await server.start();

server.applyMiddleware({ app, path: "/graphql" });


export default app;