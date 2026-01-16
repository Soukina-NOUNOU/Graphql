import { prisma } from "./lib/prisma";

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (parent: any, args: { id: string }) =>
      prisma.user.findUnique({ where: { id: Number(args.id) } }),
    posts: () => prisma.post.findMany(),
    post: (parent: any, args: { id: string }) =>
      prisma.post.findUnique({ where: { id: Number(args.id) } }),
  },

  User: {
    posts: (parent: any) =>
      prisma.post.findMany({ where: { authorId: parent.id } }),

    followers: (parent: any) =>
      prisma.follower
        .findMany({
          where: { followingId: parent.id },
          include: { follower: true },
        })
        .then((res) => res.map((r) => r.follower)),

    following: (parent: any) =>
      prisma.follower
        .findMany({
          where: { followerId: parent.id },
          include: { following: true },
        })
        .then((res) => res.map((r) => r.following)),
  },

  Post: {
    author: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.authorId } }),

    likes: (parent: any) =>
      prisma.like.findMany({
        where: { postId: parent.id },
        include: { user: true },
      }),

    comments: (parent: any) =>
      prisma.comment.findMany({
        where: { postId: parent.id },
        include: { user: true },
      }),
  },

  Like: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    post: (parent: any) =>
      prisma.post.findUnique({ where: { id: parent.postId } }),
  },

  Comment: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    post: (parent: any) =>
      prisma.post.findUnique({ where: { id: parent.postId } }),
  },
};
