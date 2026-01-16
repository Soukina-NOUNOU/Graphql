import { prisma } from "./lib/prisma";


export const resolvers = {

  users: () => prisma.user.findMany(),
  user: (args: { id: string }) =>
    prisma.user.findUnique({ where: { id: Number(args.id) } }),

  posts: () => prisma.post.findMany(),
  post: (args: { id: string }) =>
    prisma.post.findUnique({ where: { id: Number(args.id) } }),

 
};
