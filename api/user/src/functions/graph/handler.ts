// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { buildSubgraphSchema } from "@apollo/subgraph";
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

// NOTE: Users
import UsersDataSource from '@models/users';
import UsersTypeDefs from '@schemas/users';
import UsersResolvers from '@resolvers/users';

// import RequestSchema from '@functions/graph/schema';

export interface Context {
  dataSources: {
    users: UsersDataSource;
  }
}

const server = new ApolloServer<Context>({
  introspection: true,
  plugins: [ApolloServerPluginInlineTrace()],
  schema: buildSubgraphSchema([
    {
      typeDefs: UsersTypeDefs,
      resolvers: UsersResolvers,
    }
  ]),
});

const requestHandler = handlers.createAPIGatewayProxyEventRequestHandler();
const serverHandler = startServerAndCreateLambdaHandler(server, requestHandler, {
  context: async() => ({
    dataSources: {
      users: new UsersDataSource(),
    },
  })
});

export default middyfy(serverHandler);

// const api: ValidatedEventAPIGatewayProxyEvent<typeof RequestSchema> = async (event) => {
//   return formatJSONResponse({
//     message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
//     event,
//   });
// };

// export const main = middyfy(api);