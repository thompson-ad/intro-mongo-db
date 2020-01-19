const Post = require("./post");

const postByTitle = title => {
  return Post.findOne({ title }).exec(); //findOne for singular
};

const postsForAuthor = authorId => {
  return Post.find({ author: authorId }).exec(); //find for plural
};

const fullPostById = id => {
  return Post.findById(id)
    .populate("author")
    .populate("similarPosts")
    .exec();
};

const allPostsSlim = fieldsToSelect => {
  return Post.find({})
    .select(fieldsToSelect)
    .sort("-createdAt")
    .exec();
};

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    contentLength: { $lt: maxContentLength, $gt: minContentLength }
  }).exec();
};

const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate(
    postId,
    {
      $push: { similarPosts: { $each: similarPosts } } //apply a push operator to the similarPosts field and for each id in the argument simlarPosts push it into this array
    },
    { new: true }
  );
};

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
};
