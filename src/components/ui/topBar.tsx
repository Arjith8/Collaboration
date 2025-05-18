"use client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./themeToggle";

export function TopBar() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">My App</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> router.push("/login")}>
          Login
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={()=> router.push("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
