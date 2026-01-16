export const typeDefs = `
  type User {
    id: ID!
    username: String!
    description: String
    posts: [Post!]
    followers: [User!]
    following: [User!]
  }

  type Post {
    id: ID!
    content: String!
    imageUrl: String
    author: User!
    likes: [Like!]
    comments: [Comment!]
  }

  type Like {
    id: ID!
    user: User!
    post: Post!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    post: Post!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    posts: [Post!]
    post(id: ID!): Post
  }
`;
