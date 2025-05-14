const { Comment, Like, Post, Profile, User } = require("./index.js");
const { db } = require("./db/connection.js");

describe("Social Sequelzie Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
  });

  // Write your tests here
  describe("One User to One Profile", () => {
    test("associates first user with first profile", async () => {
      //create user
      const user = await User.create({
        username: "john_doe",
        email: "john_doe@example.com",
      });

      //create profile
      const profile = await Profile.create({
        bio: "I'm a software engineer",
        profilePicture: "https://example.com/profile1.jpg",
        birthday: "1990-06-15",
      });

      //add user to profile
      await user.setProfile(profile);
      //get profile from user
      const linkProfile = await user.getProfile();

      expect(linkProfile.id).toBe(profile.id);
    });
  });

  describe("One User to Many Posts and Posts have One User", () => {
    test("associates first user with 2 posts", async () => {
      //create user
      const user = await User.create({
        username: "john_doe",
        email: "john_doe@example.com",
      });

      //create posts
      const post1 = await Post.create({
        title: "Hiking in Yosemite",
        body: "I had an amazing time hiking in Yosemite National Park!",
        createdAt: "2022-03-15T10:30:00.000Z",
      });
      const post2 = await Post.create({
        title: "London Street Photography",
        body: "Here are some of my recent street photography shots from London.",
        createdAt: "2022-03-18T14:15:00.000Z",
      });

      //add posts to user
      await user.addPosts([post1, post2]);
      //get pposts from user
      const posts = await user.getPosts();

      expect(posts[0].id).toBe(post1.id);
    });
  });

  describe("One Post to Many Comments and Comments have One Post", () => {
    test("associates first post with 2 comments", async () => {
      //create post
      const post = await Post.create({
        title: "Hiking in Yosemite",
        body: "I had an amazing time hiking in Yosemite National Park!",
        createdAt: "2022-03-15T10:30:00.000Z",
      });

      //create comments
      const comment1 = await Comment.create({
        body: "This is a great post!",
        createdAt: "2022-01-01T12:00:00Z",
      });
      const comment2 = await Comment.create({
        body: "I completely agree with you.",
        createdAt: "2022-01-02T08:30:00Z",
      });

      //add comments to post
      await post.addComments([comment1, comment2]);
      //get comments from post
      const comments = await post.getComments();

      expect(comments[0].id).toBe(comment1.id);
      expect(comments[1].id).toBe(comment2.id);
    });
  });

  describe("One User to Many Likes and Likes have One User", () => {
    test("associates first user with 2 likes", async () => {
      //create user
      const user = await User.create({
        username: "john_doe",
        email: "john_doe@example.com",
      });

      //find likes
      const like1 = await Like.create({
        reactionType: "👍",
        createdAt: "2022-03-20T10:00:00Z",
      });
      const like2 = await Like.create({
        reactionType: "❤️",
        createdAt: "2022-03-21T12:30:00Z",
      });

      //add likes to user
      await user.addLikes([like1, like2]);
      //get likes from user
      const likes = await user.getLikes();

      expect(likes[0].id).toBe(like1.id);
      expect(likes[1].id).toBe(like2.id);
    });
  });
});
