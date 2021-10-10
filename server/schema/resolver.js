const { Book, User } = require('../models');

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find({ params });
    },
    book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find({ params });
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const createUser = await Createuser.create(args);
      return createUser;
    },
  },
};
