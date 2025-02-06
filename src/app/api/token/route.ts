import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
    try {
        if (!request.cookies.has("accessToken") || 
            !request.cookies.has("refreshToken")) {
            throw new Error('Authorization token missing!');
        }

        return NextResponse.json({ 
            accessToken: request.cookies.get('accessToken')!.value,
            refreshToken: request.cookies.get('refreshToken')!.value,
        });
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