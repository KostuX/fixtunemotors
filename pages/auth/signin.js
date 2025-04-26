import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form method="post" action="/api/auth/callback/credentials" className="flex flex-col gap-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input
            name="username"
            type="text"
            required
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}