import { twMerge } from "tailwind-merge";
import { BASE_URL } from "@/services/api";
import Session from "@/interfaces/Session";
import { clsx, type ClassValue } from "clsx";
import { NextRequest, NextResponse } from "next/server";
import CryptoHandler from "./CryptoHandler";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function randomDate(start: Date, end: Date = new Date()): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function randomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
0
export function formatNumber(value: number) {
    return value < 10 ? `0${value}` : value;
}

export function handleResource(filename?:string) {
    return `${BASE_URL}/resources/images/${filename}`;
}

export function buildMaxDaysOfMonths(year:number) {
    return [
        31, // JANUARY
        year % 4 === 0 ? 29 : 28, // FEBRUARY
        31, // MARCH
        30, // APRIL
        31, // MAY
        30, // JUNE
        31, // JULY
        31, // AUGUST
        30, // SEPTEMBER
        31, // OCTOBER
        30, // NOVEMBER
        31, // DECEMBER
    ]
}

export function placeholderName(name:string) {
    const array = name.split(' ');
    return array.length > 1 ? `${array[0].at(0)}${array[1].at(0)}` : array[0].at(0);
}

export function isAuthorized(request: NextRequest): boolean {
    // try {
    //     return new Boolean(
    //     request.cookies.has("session") &&
    //     request.cookies.has("accessToken") && 
    //     request.cookies.has("refreshToken") && 
    //     JWTHandler.decode(request.cookies.get('session')!.value)).valueOf();
    // } catch (error) {
    //     return false;
    // }
    return true;
}

export function buildAuthorization({redirect, userId, artistId, rememberMe, accessToken, refreshToken}:{redirect:string, userId: string, artistId:string, rememberMe?: boolean, accessToken:string, refreshToken:string}) {
    return `/authorization?redirect=${redirect}&userId=${userId}&artistId=${artistId}&rememberMe=${rememberMe}&accessToken=${accessToken}&refreshToken=${refreshToken}`;
}

export function handleAuthorization(request: NextRequest) {
    try {
        const searchParams = new URLSearchParams(request.nextUrl.search);
        if( !searchParams.has("userId") || 
            !searchParams.has("artistId") || 
            !searchParams.has("redirect") || 
            !searchParams.has("rememberMe") || 
            !searchParams.has("accessToken") || 
            !searchParams.has("refreshToken")) {
            throw new Error("Invalid authorization parameters");
        }

        const session: Session = {
            userId: searchParams.get("userId") as string,
            artistId: searchParams.get("artistId") as string,
        }
        const redirect = searchParams.get('redirect') as string;
        const response =  NextResponse.redirect(new URL(redirect, request.url));
        const rememberMe = searchParams.get('rememberMe')?.toLowerCase() === "true";

        response.cookies.set("rememberMe", rememberMe.toString(), {httpOnly: true, path: "/", secure: true, maxAge: rememberMe ? 604800 : undefined}); // 7 Days    
        response.cookies.set("session", CryptoHandler.encode(session), {httpOnly: true, path: "/", secure: true, maxAge: rememberMe ? 86400 : undefined}); // 1 Day
        response.cookies.set("accessToken", searchParams.get("accessToken")!, {httpOnly: true, path: "/", secure: true, maxAge: rememberMe ? 86400 : undefined}); // 1 Day
        response.cookies.set("refreshToken", searchParams.get("refreshToken")!, {httpOnly: true, path: "/", secure: true, maxAge: rememberMe ? 604800 : undefined}); // 7 Days  
        return response;
    } catch (error) {
        return handleLogout(request);
    }
}

export function handleLogin(request:NextRequest) {
    if (isAuthorized(request) && 
        request.cookies.has("rememberMe") && 
        request.cookies.get("rememberMe")?.value.toLowerCase() == "true") {
        return NextResponse.redirect(new URL("/", request.url)); 
    }
    return NextResponse.next();
}

export function handleLogout(request: NextRequest) {
    const response =  NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("session", "", {maxAge: 0});
    response.cookies.set("rememberMe", "", {maxAge: 0});
    response.cookies.set("accessToken", "", {maxAge: 0});
    response.cookies.set("refreshToken", "", {maxAge: 0});   
    return response;
}

export function handleAuthorized(request: NextRequest) {
    return isAuthorized(request) ? NextResponse.next() : handleLogout(request);
}