const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')
const resolvers = {
    Query: {
      profile: async ({ userId }) => {
        if (!userId) throw new Error("Not-authenticated");
        return prisma.user.findUnique({ where: { id: userId } });
      },
    },
    Mutation: {
      signup: async ({input }) => {
        const { username, email, password } = input;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { username, email, password: hashedPassword },
        });
        return `User ${user.username} created successfully`;
      },
      login: async ({ input }) => {
        const { email, password } = input;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");
  
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");
  
        const token = jwt.sign({ userId: user.id }, JWT_SECRET , {
          expiresIn: "1h",
        });
  
        return token;
      },
    },
  };
  
module.exports = {resolvers}
