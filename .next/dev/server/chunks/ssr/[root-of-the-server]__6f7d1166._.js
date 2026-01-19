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
"[project]/app/services/homePageService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "about_us_data",
    ()=>about_us_data,
    "get_case_studies",
    ()=>get_case_studies,
    "get_case_studies_Ids",
    ()=>get_case_studies_Ids,
    "get_case_studies_paginated",
    ()=>get_case_studies_paginated,
    "get_case_study_by_document_id",
    ()=>get_case_study_by_document_id,
    "get_case_study_by_slug",
    ()=>get_case_study_by_slug,
    "get_home_page_data",
    ()=>get_home_page_data,
    "get_what_we_builds",
    ()=>get_what_we_builds,
    "get_what_we_builds_Ids",
    ()=>get_what_we_builds_Ids,
    "get_what_we_builds_by_document_id",
    ()=>get_what_we_builds_by_document_id,
    "get_what_we_builds_by_slug",
    ()=>get_what_we_builds_by_slug,
    "save_newsletter_subscription",
    ()=>save_newsletter_subscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/apiService.ts [app-rsc] (ecmascript)");
;
function get_home_page_data() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/home-page?populate[Main]=*&populate[Our_Legacy][populate]=our_team&populate[Our_Core_Differentiators][populate]=counts').then((res)=>res.data);
}
async function get_what_we_builds() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/what-we-builds', {
        params: {
            'populate[main][populate]': '*',
            'populate[view1][populate]': '*',
            'populate[view2][populate]': '*',
            'populate[view3][populate][image_card][populate][images][populate]': '*',
            'populate[view4][populate]': '*',
            'populate[view5][populate]': '*',
            'populate[view6][populate]': '*',
            'populate[view7][populate]': '*',
            status: 'published'
        }
    });
    return res.data;
}
function get_what_we_builds_Ids() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/what-we-builds?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view4][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*&status=published').then((res)=>res?.data?.data?.map((service)=>service?.slug));
}
function get_what_we_builds_by_slug(slug) {
    const populateQuery = [
        'populate[main][populate]=*',
        'populate[view1][populate]=*',
        'populate[view2][populate]=*',
        'populate[view3][populate][image_card][populate][images][populate]=*',
        'populate[view4][populate]=*',
        'populate[view5][populate]=*',
        'populate[view6][populate]=*',
        'populate[view7][populate]=*'
    ].join('&');
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/what-we-builds?filters[slug][$eq]=${slug}&${populateQuery}`).then((res)=>res.data);
}
function get_what_we_builds_by_document_id(documentId) {
    const populateQuery = [
        'populate[main][populate]=*',
        'populate[view1][populate]=*',
        'populate[view2][populate]=*',
        'populate[view3][populate][image_card][populate][images][populate]=*',
        'populate[view4][populate]=*',
        'populate[view5][populate]=*',
        'populate[view6][populate]=*',
        'populate[view7][populate]=*'
    ].join('&');
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/what-we-builds?filters[documentId][$eq]=${documentId}&${populateQuery}`).then((res)=>res.data);
}
function get_case_studies_Ids() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/case-studies?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*').then((res)=>res?.data?.data?.map((case_study)=>case_study?.slug));
}
function get_case_studies() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/case-studies?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*').then((res)=>res.data);
}
function get_case_studies_paginated(pageno = 1, records = 4) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/case-studies/paginated/list?page=${pageno}&pageSize=${records}&populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*`).then((res)=>res?.data?.data?.results);
}
function get_case_study_by_slug(slug) {
    const populateQuery = [
        'populate[main][populate]=*',
        'populate[view1][populate]=*',
        'populate[view2][populate]=*',
        'populate[view3][populate][image_card][populate][images][populate]=*',
        'populate[view5][populate]=*'
    ].join('&');
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/case-studies?filters[slug][$eq]=${slug}&${populateQuery}`).then((res)=>res.data);
}
function get_case_study_by_document_id(documentId) {
    const populateQuery = [
        'populate[main][populate]=*',
        'populate[view1][populate]=*',
        'populate[view2][populate]=*',
        'populate[view3][populate][image_card][populate][images][populate]=*',
        'populate[view5][populate]=*'
    ].join('&');
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get(`/case-studies?filters[documentId][$eq]=${documentId}&${populateQuery}`).then((res)=>res.data);
}
const save_newsletter_subscription = (data)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].post('/news-letters', {
        data: data
    }).then((res)=>res.data);
};
const about_us_data = ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$apiService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiClient"].get('/about-insonix?populate=*').then((res)=>res.data);
};
}),
"[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(pages)/solutions/startup/[id]/Details.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/solutions/startup/[id]/Details.tsx <module evaluation>", "default");
}),
"[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/(pages)/solutions/startup/[id]/Details.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(pages)/solutions/startup/[id]/Details.tsx", "default");
}),
"[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$solutions$2f$startup$2f5b$id$5d2f$Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$solutions$2f$startup$2f5b$id$5d2f$Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$solutions$2f$startup$2f5b$id$5d2f$Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(pages)/solutions/startup/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "dynamicParams",
    ()=>dynamicParams,
    "generateStaticParams",
    ()=>generateStaticParams,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$homePageService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/homePageService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$solutions$2f$startup$2f5b$id$5d2f$Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(pages)/solutions/startup/[id]/Details.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
const revalidate = 60;
const dynamicParams = true;
async function generateStaticParams() {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$homePageService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["get_case_studies"])();
    return data?.data?.map((b)=>{
        const slug = b.attributes?.slug || b.slug;
        // Ensure slug is a string
        if (!slug || typeof slug !== 'string') return null;
        return {
            id: slug
        };
    }).filter(Boolean); // filter out nulls
}
async function __TURBOPACK__default__export__(props) {
    const resolvedProps = await props;
    const params = await resolvedProps.params;
    const id = params?.id;
    if (!id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$pages$292f$solutions$2f$startup$2f5b$id$5d2f$Details$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        id: id
    }, void 0, false, {
        fileName: "[project]/app/(pages)/solutions/startup/[id]/page.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/(pages)/solutions/startup/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(pages)/solutions/startup/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6f7d1166._.js.map