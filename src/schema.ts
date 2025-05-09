// src/schema.ts
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userTypeDefs } from './graphql/typeDefs/userTypeDefs';
import { userResolvers } from './graphql/resolvers/userResolvers';

export const typeDefs = [userTypeDefs];
export const resolvers = userResolvers;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
