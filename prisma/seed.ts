import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data (in reverse order of dependencies)
  await prisma.follower.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'alice_dev',
        description: 'Full-stack developer passionate about GraphQL and React. Love creating beautiful UIs! 💻✨'
      }
    }),
    prisma.user.create({
      data: {
        username: 'bob_designer',
        description: 'UI/UX Designer & Creative Director. Making the web more beautiful, one pixel at a time 🎨'
      }
    }),
    prisma.user.create({
      data: {
        username: 'charlie_tech',
        description: 'Tech enthusiast and DevOps engineer. Always exploring new technologies and automation tools 🚀'
      }
    }),
    prisma.user.create({
      data: {
        username: 'diana_code',
        description: 'Backend developer specializing in Node.js and databases. Coffee lover ☕ and problem solver 🧩'
      }
    }),
    prisma.user.create({
      data: {
        username: 'emma_frontend',
        description: 'Frontend developer with a passion for React, TypeScript, and creating amazing user experiences 🌟'
      }
    }),
    prisma.user.create({
      data: {
        username: 'frank_mobile',
        description: 'Mobile app developer (iOS & Android). Building the future of mobile experiences 📱'
      }
    })
  ]);

  console.log(`👥 Created ${users.length} users`);

  // Create posts
  const posts = await Promise.all([
    // Alice's posts
    prisma.post.create({
      data: {
        content: 'Just finished building a GraphQL API with Prisma! The developer experience is amazing. The type safety and auto-generation features make development so much faster. 🚀',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        authorId: users[0].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'Working on a new React project with TypeScript. The static typing really helps catch bugs early in development. What are your favorite TypeScript features? 💻',
        authorId: users[0].id
      }
    }),
    
    // Bob's posts
    prisma.post.create({
      data: {
        content: 'New design system completed! Consistency across all our products is now much better. Here\'s a sneak peek of our component library. 🎨',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        authorId: users[1].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'The importance of user research cannot be overstated. Spent the day interviewing users and the insights are incredible! 📊',
        authorId: users[1].id
      }
    }),
    
    // Charlie's posts
    prisma.post.create({
      data: {
        content: 'Just set up a new CI/CD pipeline with GitHub Actions. Deployment time reduced from 30 minutes to 5 minutes! Automation for the win! 🔄',
        imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
        authorId: users[2].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'Docker containers make development environment setup so much easier. No more "it works on my machine" problems! 🐳',
        authorId: users[2].id
      }
    }),
    
    // Diana's posts
    prisma.post.create({
      data: {
        content: 'Database optimization day! Reduced query time by 80% with proper indexing and query optimization. Performance matters! ⚡',
        authorId: users[3].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'Node.js streams are powerful! Just processed a 2GB CSV file without running out of memory. Love the efficiency! 💪',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        authorId: users[3].id
      }
    }),
    
    // Emma's posts
    prisma.post.create({
      data: {
        content: 'CSS Grid and Flexbox together create amazing layouts! Just built a responsive dashboard that looks great on all devices. 📱💻',
        authorId: users[4].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'Accessibility is not optional! Added proper ARIA labels and keyboard navigation to our app. Everyone should be able to use our products! ♿',
        imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
        authorId: users[4].id
      }
    }),
    
    // Frank's posts
    prisma.post.create({
      data: {
        content: 'React Native is amazing! One codebase, two platforms. Just shipped our app to both iOS and Android App Stores! 🎉',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
        authorId: users[5].id
      }
    }),
    prisma.post.create({
      data: {
        content: 'Flutter vs React Native comparison coming soon! Been working with both frameworks and have some interesting insights to share. 🤔',
        authorId: users[5].id
      }
    })
  ]);

  console.log(`📝 Created ${posts.length} posts`);

  // Create followers relationships
  const followers = await Promise.all([
    // Alice follows Bob, Charlie, Diana
    prisma.follower.create({
      data: {
        followerId: users[0].id, // Alice
        followingId: users[1].id  // Bob
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[0].id, // Alice
        followingId: users[2].id  // Charlie
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[0].id, // Alice
        followingId: users[3].id  // Diana
      }
    }),
    
    // Bob follows Alice, Emma, Frank
    prisma.follower.create({
      data: {
        followerId: users[1].id, // Bob
        followingId: users[0].id  // Alice
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[1].id, // Bob
        followingId: users[4].id  // Emma
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[1].id, // Bob
        followingId: users[5].id  // Frank
      }
    }),
    
    // Charlie follows everyone except himself
    prisma.follower.create({
      data: {
        followerId: users[2].id, // Charlie
        followingId: users[0].id  // Alice
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[2].id, // Charlie
        followingId: users[1].id  // Bob
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[2].id, // Charlie
        followingId: users[3].id  // Diana
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[2].id, // Charlie
        followingId: users[4].id  // Emma
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[2].id, // Charlie
        followingId: users[5].id  // Frank
      }
    }),
    
    // Diana follows Alice, Bob, Charlie
    prisma.follower.create({
      data: {
        followerId: users[3].id, // Diana
        followingId: users[0].id  // Alice
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[3].id, // Diana
        followingId: users[1].id  // Bob
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[3].id, // Diana
        followingId: users[2].id  // Charlie
      }
    }),
    
    // Emma follows Alice, Bob, Diana
    prisma.follower.create({
      data: {
        followerId: users[4].id, // Emma
        followingId: users[0].id  // Alice
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[4].id, // Emma
        followingId: users[1].id  // Bob
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[4].id, // Emma
        followingId: users[3].id  // Diana
      }
    }),
    
    // Frank follows Alice, Charlie, Emma
    prisma.follower.create({
      data: {
        followerId: users[5].id, // Frank
        followingId: users[0].id  // Alice
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[5].id, // Frank
        followingId: users[2].id  // Charlie
      }
    }),
    prisma.follower.create({
      data: {
        followerId: users[5].id, // Frank
        followingId: users[4].id  // Emma
      }
    })
  ]);

  console.log(`👥 Created ${followers.length} follower relationships`);

  // Create likes
  const likes = await Promise.all([
    // Alice likes posts from Bob, Charlie, Diana
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[2].id // Bob's design system post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[4].id // Charlie's CI/CD post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[6].id // Diana's database optimization post
      }
    }),
    
    // Bob likes posts from Alice, Emma, Frank
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[0].id // Alice's GraphQL post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[8].id // Emma's CSS post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[10].id // Frank's React Native post
      }
    }),
    
    // Charlie likes multiple posts
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[0].id // Alice's GraphQL post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[1].id // Alice's TypeScript post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[7].id // Diana's Node.js streams post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[9].id // Emma's accessibility post
      }
    }),
    
    // Diana likes posts
    prisma.like.create({
      data: {
        userId: users[3].id,
        postId: posts[1].id // Alice's TypeScript post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[3].id,
        postId: posts[5].id // Charlie's Docker post
      }
    }),
    
    // Emma likes posts
    prisma.like.create({
      data: {
        userId: users[4].id,
        postId: posts[2].id // Bob's design system post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[4].id,
        postId: posts[3].id // Bob's user research post
      }
    }),
    
    // Frank likes posts
    prisma.like.create({
      data: {
        userId: users[5].id,
        postId: posts[4].id // Charlie's CI/CD post
      }
    }),
    prisma.like.create({
      data: {
        userId: users[5].id,
        postId: posts[8].id // Emma's CSS post
      }
    })
  ]);

  console.log(`👍 Created ${likes.length} likes`);

  // Create comments
  const comments = await Promise.all([
    // Comments on Alice's GraphQL post
    prisma.comment.create({
      data: {
        text: 'Totally agree! Prisma makes GraphQL development so smooth. The generated types are a game changer! 🙌',
        userId: users[1].id, // Bob
        postId: posts[0].id
      }
    }),
    prisma.comment.create({
      data: {
        text: 'Have you tried the new Prisma Accelerate? The performance improvements are incredible!',
        userId: users[2].id, // Charlie
        postId: posts[0].id
      }
    }),
    
    // Comments on Bob's design system post
    prisma.comment.create({
      data: {
        text: 'This looks amazing! Would love to see a detailed breakdown of your component architecture.',
        userId: users[0].id, // Alice
        postId: posts[2].id
      }
    }),
    prisma.comment.create({
      data: {
        text: 'Design systems are so important for scaling teams. Great work! 🎨',
        userId: users[4].id, // Emma
        postId: posts[2].id
      }
    }),
    
    // Comments on Charlie's CI/CD post
    prisma.comment.create({
      data: {
        text: 'Amazing improvement! Could you share your GitHub Actions workflow? Always looking to optimize our deployment process.',
        userId: users[3].id, // Diana
        postId: posts[4].id
      }
    }),
    prisma.comment.create({
      data: {
        text: 'From 30 to 5 minutes is incredible! DevOps optimization at its finest 🚀',
        userId: users[5].id, // Frank
        postId: posts[4].id
      }
    }),
    
    // Comments on Diana's database optimization post
    prisma.comment.create({
      data: {
        text: 'Database performance is so critical! What indexing strategy did you use? Always learning new optimization techniques.',
        userId: users[0].id, // Alice
        postId: posts[6].id
      }
    }),
    
    // Comments on Emma's accessibility post
    prisma.comment.create({
      data: {
        text: 'Thank you for highlighting accessibility! It\'s often overlooked but so important for inclusive design.',
        userId: users[1].id, // Bob
        postId: posts[9].id
      }
    }),
    prisma.comment.create({
      data: {
        text: 'Accessibility should be built in from day one, not added as an afterthought. Great initiative! ♿',
        userId: users[2].id, // Charlie
        postId: posts[9].id
      }
    }),
    
    // Comments on Frank's React Native post
    prisma.comment.create({
      data: {
        text: 'Congrats on the launch! React Native is indeed powerful. How was the performance on both platforms?',
        userId: users[3].id, // Diana
        postId: posts[10].id
      }
    }),
    
    // Additional comments for engagement
    prisma.comment.create({
      data: {
        text: 'Love seeing all this tech collaboration! The developer community is amazing 💻',
        userId: users[4].id, // Emma
        postId: posts[11].id
      }
    }),
    prisma.comment.create({
      data: {
        text: 'Looking forward to the Flutter vs React Native comparison! Both have their strengths.',
        userId: users[0].id, // Alice
        postId: posts[11].id
      }
    })
  ]);

  console.log(`💬 Created ${comments.length} comments`);

  // Display summary
  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  👥 Users: ${users.length}`);
  console.log(`  📝 Posts: ${posts.length}`);
  console.log(`  👥 Followers: ${followers.length}`);
  console.log(`  👍 Likes: ${likes.length}`);
  console.log(`  💬 Comments: ${comments.length}`);
  
  console.log('\n👥 User Summary:');
  users.forEach((user, index) => {
    console.log(`  ${index + 1}. ${user.username} (ID: ${user.id})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });