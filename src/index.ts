// src/index.ts
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  schema,
  context: () => ({ prisma })
});

server.listen().then(({ url }) => {
  console.log(`Servidor corriendo en ${url}`);
});
