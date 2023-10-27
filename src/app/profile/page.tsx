"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetailes = async () => {
    const response = await axios.get("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p> Profile page </p>
      <h2 className=" p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />


      <button
        onClick={getUserDetailes}
        className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-4"
      >
        Get User Details
      </button>
      <hr />

      <button
        onClick={onLogout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-4"
      >
        Logout
      </button>
    </div>
  );
}
