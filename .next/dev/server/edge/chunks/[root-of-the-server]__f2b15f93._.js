(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// middleware.ts (or src/middleware.ts)
__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Replace with your exact production URLs (include https://)
    const strapiUrl = ("TURBOPACK compile-time value", "https://insonix-be-strapi.onrender.com/api") || 'https://your-strapi-app.onrender.com'; // e.g., https://my-strapi.onrender.com
    const frontendUrl = process.env.CLIENT_URL || 'https://your-nextjs.vercel.app'; // your Vercel site
    // Build CSP: allow self + Strapi domain
    const csp = [
        "frame-ancestors 'self'",
        strapiUrl,
        new URL(strapiUrl).origin,
        frontendUrl // optional, for self-embedding if needed
    ].join(' ');
    response.headers.set('Content-Security-Policy', csp);
    // Fallback for older browsers (optional but recommended)
    response.headers.set('X-Frame-Options', `ALLOW-FROM ${strapiUrl}`);
    return response;
}
const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico|api).*)'
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map