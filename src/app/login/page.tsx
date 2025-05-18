"use client"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login/", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
    const data = await res.json()
    if (!res.ok) {
        toast.error(data.errors)
    }
    else {
        toast.success(data.message);
        router.push("/home");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center  py-2">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col w-full max-w-xs mt-4" onSubmit={handleSubmit}>
        <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <label className="mb-2 text-sm font-medium text-gray-700">Password</label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login 
        </button>
      </form>
    </div>
  )
}
