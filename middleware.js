import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

export async function middleware(request) {
  const token = request.cookies.get("token");

  if (request.nextUrl.pathname.includes("/tareas")) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      console.log("Token:", token); // Registre el token para depuración

      const data = await jwtVerify(token.value, new TextEncoder().encode("123456"));
      console.log("Payload:", data); // Registre el payload para verificación

      return NextResponse.next();
    } catch (error) {
      console.error("Error:", error); // Registre el error para depuración
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
