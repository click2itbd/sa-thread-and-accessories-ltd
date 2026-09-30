module.exports=[13815,e=>{"use strict";var t=e.i(77256),a=e.i(64090);let r=new Map;async function s(s){try{let n=s.headers.get("x-forwarded-for")||"unknown",o=Date.now();if("unknown"!==n){let e=(r.get(n)||[]).filter(e=>o-e<6e4);if(e.length>=5)return Response.json({success:!1,error:"Too many requests. Please try again later."},{status:429});e.push(o),r.set(n,e)}let{name:i,email:l,phone:c="",subject:d="Website Inquiry",message:u,honeypot:p}=await s.json().catch(()=>({}));if(p)return Response.json({success:!0,message:"Message sent successfully"});if(!i||!l||!u)return Response.json({success:!1,error:"Name, email and message are required."},{status:400});let h=!1;try{if(process.env.RESEND_API_KEY){let{Resend:t}=e.r(82381),a=new t(process.env.RESEND_API_KEY),{data:r,error:s}=await a.emails.send({from:process.env.RESEND_FROM||"SA Thread & Accessories <onboarding@resend.dev>",to:[process.env.SMTP_TO||"asif.sathread@gmail.com"],reply_to:l,subject:`New Contact Form Submission: ${d}`,text:`New Contact Form Inquiry

Name: ${i}
Email: ${l}
Phone: ${c||"N/A"}
Subject: ${d}

Message:
${u}

--
This email was automatically generated from your website contact form.`,html:`
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
                  <h1>SA Thread &amp; Accessories Ltd.</h1>
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
                    <p class="value">${c||"N/A"}</p>
                  </div>
                  <div class="field">
                    <span class="label">Subject</span>
                    <p class="value" style="font-weight: 600;">${d}</p>
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
          `});s?console.error("Resend email send failed:",s):h=!0}else console.warn("RESEND_API_KEY is not configured.")}catch(e){console.error("Email send failed:",e)}return await (0,a.default)(),await t.default.create({fullName:i,email:l,phone:c||"",subject:d||"Website Inquiry",message:u}),Response.json({success:!0,data:{emailSent:h},message:h?"Message sent successfully":"Message saved successfully."})}catch(e){return Response.json({success:!1,error:e.message},{status:500})}}e.s(["POST",0,s])},82502,e=>{"use strict";var t=e.i(47909),a=e.i(68972),r=e.i(96250),s=e.i(59756),n=e.i(61916),o=e.i(74677),i=e.i(69741),l=e.i(16795),c=e.i(87718),d=e.i(95169),u=e.i(47587),p=e.i(66012),h=e.i(70101),f=e.i(26937),m=e.i(10372),g=e.i(93695);e.i(52474);var v=e.i(220);let R=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/contact/route.js",nextConfigOutput:"standalone",userland:()=>e.r(13815),...{}}),{workAsyncStorage:x,workUnitAsyncStorage:w,serverHooks:b}=R;async function E(e,t,r){r.requestMeta&&(0,s.setRequestMeta)(e,r.requestMeta),R.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/api/contact/route";x=x.replace(/\/index$/,"")||"/";let w=await R.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!w)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:b,deploymentId:E,params:y,nextConfig:C,parsedUrl:A,isDraftMode:S,prerenderManifest:T,routerServerContext:N,isOnDemandRevalidate:P,revalidateOnlyGenerated:_,resolvedPathname:I,clientReferenceManifest:q,serverActionsManifest:M}=w,O=(0,i.normalizeAppPath)(x),k=!!(T.dynamicRoutes[O]||T.routes[I]),D=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,A,!1):t.end("This page could not be found"),null);if(k&&!S){let e=!!T.routes[I],t=T.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(C.adapterPath)return await D();throw new g.NoFallbackError}}let H=null;!k||R.isDev||S||(H="/index"===(H=I)?"/":H);let $=!0===R.isDev||!k,j=k&&!$;M&&q&&(0,o.setManifestsSingleton)({page:x,clientReferenceManifest:q,serverActionsManifest:M});let U=e.method||"GET",F=(0,n.getTracer)(),K=F.getActiveScopeSpan(),L=!!(null==N?void 0:N.isWrappedByNextServer),z=!!(0,s.getRequestMeta)(e,"minimalMode"),B=(0,s.getRequestMeta)(e,"incrementalCache")||await R.getIncrementalCache(e,C,T,z);null==B||B.resetRequestCache(),globalThis.__incrementalCache=B;let G={params:y,previewProps:T.preview,renderOpts:{experimental:{authInterrupts:!!C.experimental.authInterrupts,useCacheTimeout:C.experimental.useCacheTimeout},cacheComponents:!!C.cacheComponents,validationLevel:C.experimental.instantInsights.validationLevel,supportsDynamicResponse:$,incrementalCache:B,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:C.cacheLife,staticPageGenerationTimeout:C.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,s)=>R.onRequestError(e,t,r,s,N)},sharedContext:{buildId:b,deploymentId:E}},W=new l.NodeNextRequest(e),Y=new l.NodeNextResponse(t),V=c.NextRequestAdapter.fromNodeNextRequest(W,(0,c.signalFromNodeResponse)(t)),X=async({previousCacheEntry:a})=>{try{if(!z&&P&&_&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await R.handle(V,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&r.waitUntil&&(r.waitUntil(n),n=void 0);let o=G.renderOpts.collectedTags;if(!k)return await (0,p.sendResponse)(W,Y,s,n),null;{let e=await s.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(s.headers);o&&(t[m.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,r=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=m.INFINITE_CACHE?!1!==a&&a>0?C.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:P})},!1,N),t}},Z=async(s,o)=>{try{var i,l;let s=await R.handleResponse({req:e,nextConfig:C,cacheKey:H,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:_,responseGenerator:X,waitUntil:r.waitUntil,isMinimalMode:z});if(!k)return;if((null==s||null==(i=s.value)?void 0:i.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(l=s.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});z||t.setHeader("x-nextjs-cache",P?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,h.fromNodeOutgoingHttpHeaders)(s.value.headers);z&&k||n.delete(m.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,f.getCacheControlHeader)(s.cacheControl)),await (0,p.sendResponse)(W,Y,new Response(s.value.body,{headers:n,status:s.value.status||200}));return}catch(t){if(t instanceof g.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:P})},!1,N),k)throw t;await (0,p.sendResponse)(W,Y,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:n.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let a=F.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||O,i=`${U} ${r}`;s.setAttributes({"next.route":r,"http.route":r,"next.span_name":i}),s.updateName(i),o&&o!==s&&(o.setAttribute("http.route",r),o.updateName(i))})()}};if(L&&K)await Z(K,void 0);else{let t=F.getActiveScopeSpan();await F.withPropagatedContext(e.headers,()=>F.trace(d.BaseServerSpan.handleRequest,{spanName:`${U} ${x}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},e=>Z(e,t)),void 0,!L)}}e.s(["handler",0,E,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:w})},"routeModule",0,R,"serverHooks",0,b,"workAsyncStorage",0,x,"workUnitAsyncStorage",0,w])}];

//# sourceMappingURL=_0n-yf7q._.js.map