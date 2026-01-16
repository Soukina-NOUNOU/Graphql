import express from 'express';
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const app = express();

// Create executable schema with typeDefs and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
