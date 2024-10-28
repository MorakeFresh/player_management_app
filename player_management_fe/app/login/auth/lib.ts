'use server';

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`http://localhost:3000/api/login/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const cookieJar = await cookies();
    cookieJar.set("session", data, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
    });
}

export async function logout() {
    const cookieJar = await cookies();
    cookieJar.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const cookieJar = await cookies();
    const session = cookieJar.get("session")?.value;
    return session ?? null;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const res = NextResponse.next();
    res.cookies.set("session", session, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
    });
    return res;
}
