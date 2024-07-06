const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    profile: async (parent,args,context) => {
      console.log(context)
      const { token } = context;
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const userProfile = await prisma.user.findUnique({
          where: { id: userId },
        });
        return userProfile;
      } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Failed to fetch profile');
      }
    },
  },
  Mutation: {
    signup: async (parent, { input }) => {
      try {
        const { username, email, password } = input;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { username, email, password: hashedPassword },
        });
        return `User ${user.username} created successfully`;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    login: async (parent, { input }) => {
      try {
        const { email, password } = input;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h"});
        return token;
      } catch (error) {
           throw new Error(error);
      }
    },
  },
};

module.exports = { resolvers };

