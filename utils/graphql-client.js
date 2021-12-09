// utils/graphql-client.js

import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';

console.log(process.env.NEXT_PUBLIC_FAUNA_SECRET);

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
    'X-Schema-Preview': 'partial-update-mutation',
  },
});