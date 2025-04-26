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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
};

export default NextAuth(authOptions);