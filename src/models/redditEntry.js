var mongoose = require('mongoose');

module.exports = mongoose.model('RedditEntry', {
      Id: String,
      Title: String,
      Date: String,
      Body: String,
      Url: String,
      Upvotes: Number,
      RedditId: String
    }, 'RedditPosts');
