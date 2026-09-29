module.exports=[13815,e=>{"use strict";var t=e.i(77256),a=e.i(64090),r=e.i(78011);let s=new Map;async function n(e){try{let n=e.headers.get("x-forwarded-for")||"unknown",o=Date.now();if("unknown"!==n){let e=(s.get(n)||[]).filter(e=>o-e<6e4);if(e.length>=5)return Response.json({success:!1,error:"Too many requests. Please try again later."},{status:429});e.push(o),s.set(n,e)}let{name:i,email:l,phone:d="",subject:c="Website Inquiry",message:u,honeypot:p}=await e.json().catch(()=>({}));if(p)return Response.json({success:!0,message:"Message sent successfully"});if(!i||!l||!u)return Response.json({success:!1,error:"Name, email and message are required."},{status:400});let h=!1;try{let e={from:(0,r.getFromAddress)(),to:(0,r.getToAddress)(),replyTo:l,subject:`New Contact Form Submission: ${c}`,html:`
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
            .header { background-color: #1F4D2C; padding: 30px 40px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; }
            .content { padding: 40px; }
            .field { margin-bottom: 24px; }
            .label { display: block; font-size: 12px; text-transform: uppercase; color: #8c98a4; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { font-size: 16px; color: #2c3b52; line-height: 1.5; margin: 0; }
            .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 8px; font-size: 15px; color: #4a5568; line-height: 1.6; white-space: pre-wrap; }
            .footer { background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 0; font-size: 12px; color: #8c98a4; }
          </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SA Thread &amp; Accessories</h1>
                <p>New Contact Form Inquiry</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Sender Name</span>
                  <p class="value">${i}</p>
                </div>
                <div class="field">
                  <span class="label">Email Address</span>
                  <p class="value"><a href="mailto:${l}" style="color: #1F4D2C; text-decoration: none; font-weight: 600;">${l}</a></p>
                </div>
                <div class="field">
                  <span class="label">Phone Number</span>
                  <p class="value">${d||"N/A"}</p>
                </div>
                <div class="field">
                  <span class="label">Subject</span>
                  <p class="value" style="font-weight: 600;">${c}</p>
                </div>
                <div class="field">
                  <span class="label">Message</span>
                  <div class="message-box">${u}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was automatically generated from your website contact form.</p>
              </div>
            </div>
          </body>
          </html>
        `};await r.transporter.sendMail(e),h=!0}catch(e){console.error("SMTP email send failed:",e)}return await (0,a.default)(),await t.default.create({fullName:i,email:l,phone:d||"",subject:c||"Website Inquiry",message:u}),Response.json({success:!0,data:{emailSent:h},message:h?"Message sent successfully":"Message saved successfully."})}catch(e){return Response.json({success:!1,error:e.message},{status:500})}}e.s(["POST",0,n])},82502,e=>{"use strict";var t=e.i(47909),a=e.i(68972),r=e.i(96250),s=e.i(59756),n=e.i(61916),o=e.i(74677),i=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),u=e.i(47587),p=e.i(66012),h=e.i(70101),f=e.i(26937),g=e.i(10372),m=e.i(93695);e.i(52474);var v=e.i(220);let R=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/contact/route.js",nextConfigOutput:"standalone",userland:()=>e.r(13815),...{}}),{workAsyncStorage:x,workUnitAsyncStorage:w,serverHooks:b}=R;async function y(e,t,r){r.requestMeta&&(0,s.setRequestMeta)(e,r.requestMeta),R.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/api/contact/route";x=x.replace(/\/index$/,"")||"/";let w=await R.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!w)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:b,deploymentId:y,params:C,nextConfig:E,parsedUrl:A,isDraftMode:T,prerenderManifest:S,routerServerContext:N,isOnDemandRevalidate:P,revalidateOnlyGenerated:q,resolvedPathname:M,clientReferenceManifest:O,serverActionsManifest:k}=w,I=(0,i.normalizeAppPath)(x),_=!!(S.dynamicRoutes[I]||S.routes[M]),H=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,A,!1):t.end("This page could not be found"),null);if(_&&!T){let e=!!S.routes[M],t=S.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if(E.adapterPath)return await H();throw new m.NoFallbackError}}let j=null;!_||R.isDev||T||(j="/index"===(j=M)?"/":j);let D=!0===R.isDev||!_,U=_&&!D;k&&O&&(0,o.setManifestsSingleton)({page:x,clientReferenceManifest:O,serverActionsManifest:k});let F=e.method||"GET",$=(0,n.getTracer)(),K=$.getActiveScopeSpan(),z=!!(null==N?void 0:N.isWrappedByNextServer),B=!!(0,s.getRequestMeta)(e,"minimalMode"),L=(0,s.getRequestMeta)(e,"incrementalCache")||await R.getIncrementalCache(e,E,S,B);null==L||L.resetRequestCache(),globalThis.__incrementalCache=L;let G={params:C,previewProps:S.preview,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts,useCacheTimeout:E.experimental.useCacheTimeout},cacheComponents:!!E.cacheComponents,validationLevel:E.experimental.instantInsights.validationLevel,supportsDynamicResponse:D,incrementalCache:L,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:E.cacheLife,staticPageGenerationTimeout:E.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,s)=>R.onRequestError(e,t,r,s,N)},sharedContext:{buildId:b,deploymentId:y}},W=new l.NodeNextRequest(e),V=new l.NodeNextResponse(t),X=d.NextRequestAdapter.fromNodeNextRequest(W,(0,d.signalFromNodeResponse)(t)),Y=async({previousCacheEntry:a})=>{try{if(!B&&P&&q&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await R.handle(X,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&r.waitUntil&&(r.waitUntil(n),n=void 0);let o=G.renderOpts.collectedTags;if(!_)return await (0,p.sendResponse)(W,V,s,n),null;{let e=await s.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(s.headers);o&&(t[g.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,r=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=g.INFINITE_CACHE?!1!==a&&a>0?E.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:P})},!1,N),t}},Z=async(s,o)=>{try{var i,l;let s=await R.handleResponse({req:e,nextConfig:E,cacheKey:j,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:q,responseGenerator:Y,waitUntil:r.waitUntil,isMinimalMode:B});if(!_)return;if((null==s||null==(i=s.value)?void 0:i.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(l=s.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",P?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,h.fromNodeOutgoingHttpHeaders)(s.value.headers);B&&_||n.delete(g.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,f.getCacheControlHeader)(s.cacheControl)),await (0,p.sendResponse)(W,V,new Response(s.value.body,{headers:n,status:s.value.status||200}));return}catch(t){if(t instanceof m.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:P})},!1,N),_)throw t;await (0,p.sendResponse)(W,V,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:n.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let a=$.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==c.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||I,i=`${F} ${r}`;s.setAttributes({"next.route":r,"http.route":r,"next.span_name":i}),s.updateName(i),o&&o!==s&&(o.setAttribute("http.route",r),o.updateName(i))})()}};if(z&&K)await Z(K,void 0);else{let t=$.getActiveScopeSpan();await $.withPropagatedContext(e.headers,()=>$.trace(c.BaseServerSpan.handleRequest,{spanName:`${F} ${x}`,kind:n.SpanKind.SERVER,attributes:{"http.method":F,"http.target":e.url}},e=>Z(e,t)),void 0,!z)}}e.s(["handler",0,y,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:w})},"routeModule",0,R,"serverHooks",0,b,"workAsyncStorage",0,x,"workUnitAsyncStorage",0,w])}];

//# sourceMappingURL=_0n-yf7q._.js.map