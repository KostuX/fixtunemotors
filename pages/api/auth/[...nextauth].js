import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        // Replace this with your database validation logic
        if (username === "admin" && password === "password123") {
          return { id: 1, name: "Admin User", email: "admin@example.com" };
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  secret: "process.env.NEXTAUTH_SECRET",
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days (default)
    updateAge: 0, // Disable automatic session updates
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Set JWT expiration to 30 days
  },
};

export default NextAuth(authOptions);