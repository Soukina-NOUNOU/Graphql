# Graphql
GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. The GraphQL specification was open-sourced in 2015 and has since been implemented in a variety of programming languages. GraphQL isn’t tied to any specific database or storage engine—it is backed by your existing code and data.

# Query

- User

Récupérer tous les utilisateurs avec leurs data :
```
query GetAllUsers {
  users {
    id
    username
    description
  }
}
```

Récupérer un utilisateur by id
```
query GetUser {
  user(id: "1") {
    id
    username
    description
  }
}
```

Utilisateur avec toutes ses données

query GetCompleteUser {
  user(id: "1") {
    id
    username
    description
    posts {
      id
      content
      imageUrl
    }
    followers {
      id
      username
      description
    }
    following {
      id
      username
      description
    }
  }
}


Utilisateur avec ses abonnés et abonnements

```
query GetUserWithFollowers {
  user(id: "1") {
    username
    followers {
      id
      username
    }
    following {
      id
      username
    }
  }
}
```

Tous les utilisateurs avec leur réseau 

```
query GetSocialNetwork {
  users {
    username
    followers {
      username
    }
    following {
      username
    }
  }
}
  
```

- Posts

Récupérer tous les posts
```
query GetPostsWithAuthor {
  posts {
    id
    content
    imageUrl
    author {
      id
      username
      description
    }
  }
}
```

Post avec likes et commentaires
```
query GetPostWithInteractions {
  post(id: "3") {
    id
    content
    imageUrl
    author {
      id
      username
    }
    likes {
      id
      user {
        id
        username
      }
    }
    comments {
      id
      text
      user {
        id
        username
      }
    }
  }
}
```

Post complet avec toutes les données
```
query GetCompletePost {
  post(id: "3") {
    id
    content
    imageUrl
    author {
      id
      username
      description
    }
    likes {
      id
      user {
        id
        username
      }
      post {
        id
        content
      }
    }
    comments {
      id
      text
      user {
        id
        username
      }
      post {
        id
        content
      }
    }
  }
}
```

- Complexe Request

Feed social complet
````
query GetSocialFeed {
  posts {
    id
    content
    imageUrl
    author {
      id
      username
      description
      followers {
        id
        username
      }
    }
    likes {
      id
      user {
        id
        username
      }
    }
    comments {
      id
      text
      user {
        id
        username
        posts {
          id
          content
        }
      }
    }
  }
}
```

Profil utilisateur avec activité complète
```
query GetUserProfile {
  user(id: "1") {
    id
    username
    description
    posts {
      id
      content
      imageUrl
      likes {
        id
        user {
          id
          username
        }
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
    }
    followers {
      id
      username
      posts {
        id
        content
      }
    }
    following {
      id
      username
      posts {
        id
        content
      }
    }
  }
}
```

Réseau social d'un utilisateur
```
query GetUserNetwork {
  user(id: "1") {
    username
    followers {
      id
      username
      following {
        id
        username
      }
      posts {
        id
        content
        likes {
          user {
            username
          }
        }
      }
    }
  }
}
```