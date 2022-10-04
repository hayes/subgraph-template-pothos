import { ApolloServer, ContextFunction } from "@apollo/server";
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from "@apollo/server/standalone";

const port = process.env.PORT ?? "4001";
const subgraphName = require("../package.json").name;
import { DataSourceContext } from "./types/DataSourceContext";
import { schema } from "./schema";

const context: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  DataSourceContext
> = async ({ req }) => ({
  auth: req.headers.authorization,
});

async function main() {
  const server = new ApolloServer({
    schema: schema,
  });
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: Number.parseInt(port) },
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run 'rover dev --url ${url} --name ${subgraphName}`);
}

main();
