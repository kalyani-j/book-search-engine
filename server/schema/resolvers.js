const { Book, User } = require('../models');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (!user) {
        return { message: "Can't find this user" };
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return { message: 'Wrong password!' };
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args) => {
      console.log(args);
      const { data } = jwt.verify(args.token, secret, { maxAge: expiration });
      console.log(data);
      const book = {
        bookId: args.bookId,
        title: args.title,
        authors: args.authors,
        description: args.description,
        image: args.image,
        link: args.link,
      };
      const updatedUser = await User.findOneAndUpdate(
        { _id: data._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    getSingleUser: async (parent, args) => {
      const { data } = jwt.verify(args.token, secret, { maxAge: expiration });
      console.log(data);
      const foundUser = await User.findOne({
        $or: [{ _id: data ? data._id : args.id }, { username: args.username }],
      });

      return foundUser;
    },
    deleteBook: async (parent, args) => {
      const { data } = jwt.verify(args.token, secret, { maxAge: expiration });
      const updatedUser = await User.findOneAndUpdate(
        { _id: data._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
