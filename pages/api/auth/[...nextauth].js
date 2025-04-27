import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getUser from "../../../database/cockroach_db/getUser";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Fetch user from the database
        const db_result = await getUser(username);

        if (db_result.length === 0) {
          return null; // User not found
        }

        const user = db_result[0]; // Assuming the query returns an array of users

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null; // Invalid password
        }

        // Return user object if authentication is successful
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          read: user.read,
          write: user.write,
          edit: user.edit,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days
    updateAge: 0, // Disable automatic session updates
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Set JWT expiration to 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token on initial sign-in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.read = user.read;
        token.write = user.write;
        token.edit = user.edit;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom user data to the session
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.read = token.read;
      session.user.write = token.write;
      session.user.edit = token.edit;
      return session;
    },
  },
};

export default NextAuth(authOptions);