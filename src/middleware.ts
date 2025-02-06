import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

import { handleAuthorization, handleAuthorized, handleLogin, handleLogout } from "./lib/utils";

export default function middleware(request: NextRequest) {
    switch(request.nextUrl.pathname) {
        case "/login": return handleLogin(request);
        case "/logout": return handleLogout(request);
        case "/authorization": return handleAuthorization(request);
        default: return handleAuthorized(request);
    }
}
 
export const config = {
    matcher: [
        "/", "/login", "/logout", "/authorization", 
        "/musics", "/clips", "/albums", "/playlists", 
        "/events", "/musical-genres", "/settings/:path*",
    ],
};