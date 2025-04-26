import { getCsrfToken } from "next-auth/react";
import DefaultLayout from '../../layouts/default'
import React, { useEffect, useState } from "react";
import { defaultData } from '../../lib/defaultData'
import { Permanent_Marker } from "next/font/google";
import { Input, Button } from "@heroui/react";
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SignIn({ csrfToken }) {
    const [siteData, setSiteData] = useState(defaultData);  
    
    
    let fonts = {
      marker: marker,
    };
  
  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
    <div className="flex flex-col items-center   h-screen text-center">
      <h1 className="text-4xl font-bold my-24">Sign in</h1>
      <form method="post" action="/api/auth/callback/credentials" className="flex flex-col gap-4">
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <Input
            name="username"
            type="text"
            required
            className=" rounded px-4 py-2 w-full"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <Input
            name="password"
            type="password"
            required
            className=" rounded px-4 py-2 w-full"
            placeholder="Enter your password"
          />
        </div>
        <Button
          type="submit"
          className=" text-white px-4 py-2 rounded hover:bg-blue-600"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}