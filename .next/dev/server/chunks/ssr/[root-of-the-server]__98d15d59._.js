module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/app/services/apiService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// apiService.ts
__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-rsc] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "https://insonix-be-strapi.onrender.com/api") || 'http://localhost:1337/api';
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
apiClient.interceptors.request.use((config)=>{
    const isPreview = config?.params?.publicationState === 'preview';
    if (isPreview) {
        const token = process.env.STRAPI_PREVIEW_TOKEN;
        if (token) {
            const headers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].AxiosHeaders.from(config.headers || {});
            headers.set('Authorization', `Bearer ${token}`);
            config.headers = headers;
        }
    }
    return config;
}, (error)=>Promise.reject(error));
}),
"[project]/app/services/jobService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createApplication",
    ()=>createApplication,
    "getCareersBenifits",
    ()=>getCareersBenifits,
    "getCareersCulture",
    ()=>getCareersCulture,
    "getFormQuestions",
    ()=>getFormQuestions,
    "getOpening",
    ()=>getOpening,
    "getOpeningBySlug",
    ()=>getOpeningBySlug,
    "getOpenings",
    ()=>getOpenings,
    "getOpenings_Ids",
    ()=>getOpenings_Ids,
    "getPaginatedOpenings",
    ()=>getPaginatedOpenings,
    "submitJobApplication",
    ()=>submitJobApplication
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/apiService.ts [app-rsc] (ecmascript)");
;
function getOpenings() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/job-openings').then((res)=>res.data);
}
function getOpenings_Ids() {
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/job-openings').then((res)=>res.data.data.map((opening)=>opening.slug.toString()));
    return data;
}
function getPaginatedOpenings(pageno = 1, records = 10) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/job-openings?createdAt:desc&pagination[page]=${pageno}&populate=skills&pagination[pageSize]=${records}`).then((res)=>res.data);
}
function getOpening(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/job-openings/${id}?populate=*`).then((res)=>res.data);
}
function createApplication(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].post('/job-applications', {
        data
    }).then((res)=>res.data);
}
async function getOpeningBySlug(slug) {
    const baseParams = {
        populate: 'skills',
        filters: {
            slug: {
                $eq: slug
            }
        }
    };
    const requests = [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/job-openings', {
            params: {
                ...baseParams
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/job-openings', {
            params: {
                ...baseParams,
                status: 'draft'
            }
        })
    ];
    const responses = await Promise.allSettled(requests);
    for (const res of responses){
        if (res.status === 'fulfilled' && res.value.data.data?.[0]) {
            return res.value.data.data[0];
        }
    }
    return null;
}
function getCareersBenifits() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/careers-benefits?createdAt:desc&&populate=*').then((res)=>res.data);
}
function getCareersCulture() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/career-cultures?createdAt:desc&&populate=*').then((res)=>res.data);
}
function getFormQuestions() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/questions').then((res)=>res.data);
}
function submitJobApplication(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].post('/job-applications', {
        data
    }).then((res)=>res.data);
}
}),
"[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Careers_Details",
    ()=>Careers_Details,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Careers_Details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Careers_Details() from the server but Careers_Details is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx <module evaluation>", "Careers_Details");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx <module evaluation>", "default");
}),
"[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Careers_Details",
    ()=>Careers_Details,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Careers_Details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Careers_Details() from the server but Careers_Details is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx", "Careers_Details");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx", "default");
}),
"[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$careers$2f$careersdetail$2f5b$id$5d2f$Careers_Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$careers$2f$careersdetail$2f5b$id$5d2f$Careers_Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$careers$2f$careersdetail$2f5b$id$5d2f$Careers_Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(pages)/careers/careersdetail/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JobPage,
    "dynamicParams",
    ()=>dynamicParams,
    "generateStaticParams",
    ()=>generateStaticParams,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$jobService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/jobService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$careers$2f$careersdetail$2f5b$id$5d2f$Careers_Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(pages)/careers/careersdetail/[id]/Careers_Details.tsx [app-rsc] (ecmascript)");
;
;
;
const revalidate = 60;
const dynamicParams = true;
async function generateStaticParams() {
    try {
        const job = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$jobService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOpenings"])();
        return job?.data?.map((b)=>({
                id: b.slug
            }));
    } catch (err) {
        console.warn('generateStaticParams: failed to fetch blogs', err);
        return [];
    }
}
async function JobPage(props) {
    const resolvedProps = await props;
    const params = await resolvedProps.params;
    const slug = params?.id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$careers$2f$careersdetail$2f5b$id$5d2f$Careers_Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Careers_Details"], {
        slug: slug ?? ''
    }, void 0, false, {
        fileName: "[project]/app/(pages)/careers/careersdetail/[id]/page.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/(pages)/careers/careersdetail/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(pages)/careers/careersdetail/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__98d15d59._.js.map