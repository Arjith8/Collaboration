import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/client";
import { loginRequestBody } from "../../../../../types/loginRequestBody";
import { checkPassword, generateToken } from "@/lib/auth";


export  async function POST(request: NextRequest){
  const body = await request.json();

  const validatedBody = loginRequestBody.safeParse(body);
  if (!validatedBody.success) {
    console.warn("Invalid request body", validatedBody.error);
    return new Response(JSON.stringify({ errors: "Invalid request body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }); 
  }

  const { email, password } = validatedBody.data;
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) {
    return new Response(JSON.stringify({ errors: "Invalid Email or Password" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const isMatch = await checkPassword(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ errors: "Invalid Email or Password" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const token = generateToken(user.id);

  return new Response(JSON.stringify({ message: "Login successful", token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Strict`,
    },
  });

}
