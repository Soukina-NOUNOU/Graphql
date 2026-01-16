import express from 'express';
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
