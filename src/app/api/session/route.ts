import Session from '@/interfaces/Session';
import CryptoHandler from '@/lib/CryptoHandler';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
    try {
        if (!request.cookies.has("session")) {
            throw new Error('Authorization token missing!');
        }
        return NextResponse.json<Session>(CryptoHandler.decode<Session>(request.cookies.get('session')!.value));
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            error: "Forbidden",
            message: error.message,
            path: request.nextUrl.pathname,
            timestamp: new Date().toISOString(),
        }, { status: 400 });
    };
}