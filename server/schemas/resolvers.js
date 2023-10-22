const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findOne({ _id }).populate('thoughts');
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError("Login credentials are incorrect");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError("Login credentials are incorrect");
            }
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const saveBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book._id } },
                    { new: true },
                ).populate("books");
                return saveBook;
            }
            throw AuthenticationError("You must be logged in to do this! :(");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const userBookRemove = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: { savedBooks: book._id }
                    }, { new: true }
                );
                return userBookRemove;
            }
            throw AuthenticationError("You must be logged in to do this! :(");
        },
    }
}

module.exports = resolvers;