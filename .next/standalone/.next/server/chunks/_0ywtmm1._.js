module.exports=[72960,e=>{"use strict";var t=e.i(89171),a=e.i(54799),r=e.i(49632),o=e.i(58954),s=e.i(71447),i=e.i(64090),n=e.i(92772),l=e.i(78011);let d=process.env.EMAIL_MODE||"console";async function p({toEmail:e,otp:t,expiryMinutes:a=10}){"smtp"===d?await c({toEmail:e,otp:t,expiryMinutes:a}):function({toEmail:e,otp:t,expiryMinutes:a}){let r="═".repeat(60);console.log(`
${r}`),console.log("  [DEV ONLY] Password Reset OTP"),console.log(`  To:      ${e}`),console.log(`  OTP:     ${t}`),console.log(`  Expires: ${a} minutes`),console.log("  NOTE:    This OTP is shown in console because"),console.log("           EMAIL_MODE=console (development mode)."),console.log("           Set EMAIL_MODE=smtp for real email delivery."),console.log(`${r}
`)}({toEmail:e,otp:t,expiryMinutes:a})}async function c({toEmail:e,otp:t,expiryMinutes:a}){let r=(0,l.createSmtpTransporter)(),o={from:(0,l.getFromAddress)(),to:e,subject:"SA Thread & Accessories Ltd. — Password Reset OTP",html:function({otp:e,expiryMinutes:t}){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset OTP — SA Thread & Accessories Ltd.</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background-color: #1F4D2C; padding: 32px 40px; text-align: center; }
    .header-title { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 0.5px; }
    .header-sub { color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0; }
    .body { padding: 36px 40px; }
    .greeting { color: #1a1a2e; font-size: 16px; margin: 0 0 16px; }
    .description { color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0 0 28px; }
    .otp-box { background: #f0faf4; border: 2px solid #1F4D2C; border-radius: 10px; padding: 24px; text-align: center; margin: 0 0 28px; }
    .otp-label { color: #4a5568; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 10px; }
    .otp-code { color: #1F4D2C; font-size: 40px; font-weight: 700; letter-spacing: 10px; margin: 0; font-variant-numeric: tabular-nums; }
    .otp-expiry { color: #718096; font-size: 13px; margin: 10px 0 0; }
    .warning-box { background: #fffbeb; border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 6px; margin: 0 0 24px; }
    .warning-text { color: #78350f; font-size: 13px; line-height: 1.5; margin: 0; }
    .footer { background: #f7fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e8ecf0; }
    .footer-text { color: #a0aec0; font-size: 12px; margin: 0; }
    .company-name { color: #4a5568; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <p class="header-title">SA Thread &amp; Accessories Ltd.</p>
      <p class="header-sub">Admin Panel — Security Notification</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, Admin</p>
      <p class="description">
        We received a request to reset the password for your admin account.
        Use the one-time password (OTP) below to verify your identity and proceed
        with resetting your password.
      </p>

      <div class="otp-box">
        <p class="otp-label">Your Password Reset OTP</p>
        <p class="otp-code">${e}</p>
        <p class="otp-expiry">This OTP expires in <strong>${t} minutes</strong></p>
      </div>

      <div class="warning-box">
        <p class="warning-text">
          ⚠️ <strong>Security Notice:</strong> If you did not request a password reset,
          please ignore this email. Your account remains secure. Do not share this OTP
          with anyone — our team will never ask for it.
        </p>
      </div>

      <p class="description">
        This OTP is valid for a single use only. After use or expiry, it becomes invalid.
        If you need a new OTP, please use the "Forgot Password" option again.
      </p>
    </div>
    <div class="footer">
      <p class="footer-text">
        &copy; ${new Date().getFullYear()} <span class="company-name">SA Thread &amp; Accessories Ltd.</span><br />
        This is an automated security email. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>`}({otp:t,expiryMinutes:a}),text:function({otp:e,expiryMinutes:t}){return`SA Thread & Accessories Ltd. — Password Reset OTP

Hello, Admin,

We received a request to reset the password for your admin account.

Your Password Reset OTP: ${e}

This OTP expires in ${t} minutes. It is valid for a single use only.

SECURITY NOTICE: If you did not request a password reset, please ignore this email.
Do not share this OTP with anyone.

— SA Thread & Accessories Ltd. (Automated Security Notification)
`}({otp:t,expiryMinutes:a})};await r.sendMail(o)}async function u(e){try{let l=(0,n.getClientIp)(e);if(!n.forgotPasswordLimiter.check(l).allowed)return t.NextResponse.json({error:"Too many requests. Please try again later."},{status:429});let{email:d}=await e.json();if(!d)return t.NextResponse.json({error:"Email is required"},{status:400});await (0,i.default)();let c=await o.default.findOne({email:d.toLowerCase()});if(c&&c.isActive){let e=a.default.randomInt(1e5,999999).toString(),t=await r.default.hash(e,12),o=new Date(Date.now()+3e5);await s.default.create({adminId:c._id,email:c.email,otpHash:t,expiresAt:o}),await p({toEmail:c.email,otp:e,expiryMinutes:5})}return t.NextResponse.json({success:!0,message:"If an account exists with this email, a reset OTP has been sent."})}catch(e){return console.error("Forgot password error:",e),t.NextResponse.json({error:"Internal server error"},{status:500})}}e.s(["POST",0,u],72960)},11728,e=>{"use strict";var t=e.i(47909),a=e.i(68972),r=e.i(96250),o=e.i(59756),s=e.i(61916),i=e.i(74677),n=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),c=e.i(47587),u=e.i(66012),h=e.i(70101),f=e.i(26937),g=e.i(10372),m=e.i(93695);e.i(52474);var x=e.i(220);let w=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/admin/auth/forgot-password/route",pathname:"/api/admin/auth/forgot-password",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/auth/forgot-password/route.js",nextConfigOutput:"standalone",userland:()=>e.r(72960),...{}}),{workAsyncStorage:v,workUnitAsyncStorage:R,serverHooks:y}=w;async function T(e,t,r){r.requestMeta&&(0,o.setRequestMeta)(e,r.requestMeta),w.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/admin/auth/forgot-password/route";v=v.replace(/\/index$/,"")||"/";let R=await w.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:y,deploymentId:T,params:b,nextConfig:E,parsedUrl:A,isDraftMode:P,prerenderManifest:C,routerServerContext:O,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,resolvedPathname:I,clientReferenceManifest:D,serverActionsManifest:_}=R,q=(0,n.normalizeAppPath)(v),M=!!(C.dynamicRoutes[q]||C.routes[I]),k=async()=>((null==O?void 0:O.render404)?await O.render404(e,t,A,!1):t.end("This page could not be found"),null);if(M&&!P){let e=!!C.routes[I],t=C.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(E.adapterPath)return await k();throw new m.NoFallbackError}}let H=null;!M||w.isDev||P||(H="/index"===(H=I)?"/":H);let L=!0===w.isDev||!M,U=M&&!L;_&&D&&(0,i.setManifestsSingleton)({page:v,clientReferenceManifest:D,serverActionsManifest:_});let F=e.method||"GET",$=(0,s.getTracer)(),j=$.getActiveScopeSpan(),z=!!(null==O?void 0:O.isWrappedByNextServer),K=!!(0,o.getRequestMeta)(e,"minimalMode"),B=(0,o.getRequestMeta)(e,"incrementalCache")||await w.getIncrementalCache(e,E,C,K);null==B||B.resetRequestCache(),globalThis.__incrementalCache=B;let Y={params:b,previewProps:C.preview,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts,useCacheTimeout:E.experimental.useCacheTimeout},cacheComponents:!!E.cacheComponents,validationLevel:E.experimental.instantInsights.validationLevel,supportsDynamicResponse:L,incrementalCache:B,hmrRefreshHash:(0,o.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:E.cacheLife,staticPageGenerationTimeout:E.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,o)=>w.onRequestError(e,t,r,o,O)},sharedContext:{buildId:y,deploymentId:T}},G=new l.NodeNextRequest(e),V=new l.NodeNextResponse(t),W=d.NextRequestAdapter.fromNodeNextRequest(G,(0,d.signalFromNodeResponse)(t)),X=async({previousCacheEntry:a})=>{try{if(!K&&S&&N&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await w.handle(W,Y);e.fetchMetrics=Y.renderOpts.fetchMetrics;let s=Y.renderOpts.pendingWaitUntil;s&&r.waitUntil&&(r.waitUntil(s),s=void 0);let i=Y.renderOpts.collectedTags;if(!M)return await (0,u.sendResponse)(G,V,o,s),null;{let e=await o.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(o.headers);i&&(t[g.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==Y.renderOpts.collectedRevalidate&&!(Y.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&Y.renderOpts.collectedRevalidate,r=void 0===Y.renderOpts.collectedExpire||Y.renderOpts.collectedExpire>=g.INFINITE_CACHE?!1!==a&&a>0?E.expireTime:void 0:Y.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await w.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,O),t}},Z=async(o,i)=>{try{var n,l;let o=await w.handleResponse({req:e,nextConfig:E,cacheKey:H,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:N,responseGenerator:X,waitUntil:r.waitUntil,isMinimalMode:K});if(!M)return;if((null==o||null==(n=o.value)?void 0:n.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==o||null==(l=o.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",S?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),P&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let s=(0,h.fromNodeOutgoingHttpHeaders)(o.value.headers);K&&M||s.delete(g.NEXT_CACHE_TAGS_HEADER),!o.cacheControl||t.getHeader("Cache-Control")||s.get("Cache-Control")||s.set("Cache-Control",(0,f.getCacheControlHeader)(o.cacheControl)),await (0,u.sendResponse)(G,V,new Response(o.value.body,{headers:s,status:o.value.status||200}));return}catch(t){if(t instanceof m.NoFallbackError||await w.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:S})},!1,O),M)throw t;await (0,u.sendResponse)(G,V,new Response(null,{status:500}));return}finally{(()=>{if(!o)return;let e=t.statusCode;o.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(o.setStatus({code:s.SpanStatusCode.ERROR}),o.setAttribute("error.type",e.toString()));let a=$.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==p.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||q,n=`${F} ${r}`;o.setAttributes({"next.route":r,"http.route":r,"next.span_name":n}),o.updateName(n),i&&i!==o&&(i.setAttribute("http.route",r),i.updateName(n))})()}};if(z&&j)await Z(j,void 0);else{let t=$.getActiveScopeSpan();await $.withPropagatedContext(e.headers,()=>$.trace(p.BaseServerSpan.handleRequest,{spanName:`${F} ${v}`,kind:s.SpanKind.SERVER,attributes:{"http.method":F,"http.target":e.url}},e=>Z(e,t)),void 0,!z)}}e.s(["handler",0,T,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:v,workUnitAsyncStorage:R})},"routeModule",0,w,"serverHooks",0,y,"workAsyncStorage",0,v,"workUnitAsyncStorage",0,R])}];

//# sourceMappingURL=_0ywtmm1._.js.map