import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req, ev) {
    const { pathname, origin } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect(`${origin}/home`)
    }
    return NextResponse.next()
}