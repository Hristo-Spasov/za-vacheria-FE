import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";
  const strapi = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = request.nextUrl;
  const isSitemap = url.pathname.startsWith("/sitemap/");
  // console.log(process.env.NODE_ENV, isDev);
  const cspHeader = `
    default-src 'self';
    script-src 'self' ${
      isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`
    } 'unsafe-eval' https://res.cloudinary.com;
    connect-src 'self' ${
      isDev ? strapi : strapi
    }  https://umami.zavecheria.com/api/send;
    style-src 'self' 'unsafe-inline';
    script-src-elem 'self' ${
      isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`
    } https://umami.zavecheria.com;
    img-src 'self' data: https://res.cloudinary.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isSitemap) {
    response.headers.delete("Content-Encoding");
    response.headers.set("Content-Encoding", "gzip");
  }

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
