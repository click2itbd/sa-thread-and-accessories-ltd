module.exports=[59869,e=>{"use strict";var t=e.i(7731),a=e.i(64090),r=e.i(15367),s=e.i(78011);let i=new Map,o=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];async function n(e){try{let n=e.headers.get("x-forwarded-for")||"unknown",l=Date.now();if("unknown"!==n){let e=(i.get(n)||[]).filter(e=>l-e<6e4);if(e.length>=3)return Response.json({success:!1,error:"Too many requests. Please try again later."},{status:429});e.push(l),i.set(n,e)}let d=await e.formData(),c=d.get("name")?.toString()||"",p=d.get("email")?.toString()||"",u=d.get("phone")?.toString()||"",f=d.get("department")?.toString()||"",g=d.get("experience")?.toString()||"",h=d.get("education")?.toString()||"",m=d.get("expectedSalary")?.toString()||"",v=d.get("message")?.toString()||"",x=d.get("honeypot")?.toString()||"",R=d.get("resume");if(x)return Response.json({success:!0,message:"Application sent successfully"});if(!c||!p||!u||!f||!g||!v)return Response.json({success:!1,error:"Missing required fields."},{status:400});let w="";if(!R||"object"!=typeof R||!(R.size>0))return Response.json({success:!1,error:"Resume file is required."},{status:400});{let e,t,a;if(!o.includes(R.type))return Response.json({success:!1,error:"Invalid resume file type."},{status:400});if(R.size>5242880)return Response.json({success:!1,error:"Resume file too large (max 5MB)."},{status:400});let s=await R.arrayBuffer(),i=Buffer.from(s),n=(e=process.env.IMAGEKIT_PUBLIC_KEY,t=process.env.IMAGEKIT_PRIVATE_KEY,a=process.env.IMAGEKIT_URL_ENDPOINT,e&&t&&a?new r.default({publicKey:e,privateKey:t,urlEndpoint:a}):null);if(n)try{w=(await n.upload({file:i,fileName:R.name||`resume-${Date.now()}`,folder:"sathread/applications"})).url}catch(e){console.warn("ImageKit upload failed:",e.message)}let l=Buffer.from(s).toString("base64");[].push({filename:R.name||"resume",content:l})}await (0,a.default)(),await t.default.create({fullName:c,email:p,phone:u,appliedPosition:f,cvFile:w,coverLetter:v});let b=!1;try{let e={from:(0,s.getFromAddress)(),to:(0,s.getToAddress)(),replyTo:p,subject:`New Job Application: ${c} — ${f}`,html:`
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
            .grid { display: table; width: 100%; margin-bottom: 24px; }
            .grid-row { display: table-row; }
            .grid-cell { display: table-cell; width: 50%; padding-bottom: 20px; vertical-align: top; }
            .footer { background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 0; font-size: 12px; color: #8c98a4; }
            .attachment-note { background-color: #f0f4ff; border: 1px solid #dbe4ff; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #1F4D2C; margin-top: 8px; }
          </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SA Thread &amp; Accessories</h1>
                <p>New Job Application</p>
              </div>
              <div class="content">
                <div class="grid">
                  <div class="grid-row">
                    <div class="grid-cell">
                      <span class="label">Full Name</span>
                      <p class="value">${c}</p>
                    </div>
                    <div class="grid-cell">
                      <span class="label">Phone Number</span>
                      <p class="value">${u}</p>
                    </div>
                  </div>
                  <div class="grid-row">
                    <div class="grid-cell">
                      <span class="label">Email Address</span>
                      <p class="value"><a href="mailto:${p}" style="color: #1F4D2C; text-decoration: none; font-weight: 600;">${p}</a></p>
                    </div>
                    <div class="grid-cell">
                      <span class="label">Department / Section</span>
                      <p class="value">${f}</p>
                    </div>
                  </div>
                  <div class="grid-row">
                    <div class="grid-cell">
                      <span class="label">Experience Level</span>
                      <p class="value">${g}</p>
                    </div>
                    <div class="grid-cell">
                      <span class="label">Education</span>
                      <p class="value">${h||"—"}</p>
                    </div>
                  </div>
                  <div class="grid-row">
                    <div class="grid-cell">
                      <span class="label">Expected Salary</span>
                      <p class="value">${m||"—"}</p>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <span class="label">Cover Letter / Message</span>
                  <div class="message-box">${v}</div>
                </div>

                <div class="attachment-note">
                  📎 Resume/CV attached: <strong>${R.name}</strong>
                </div>
              </div>
              <div class="footer">
                <p>This email was automatically generated from your website careers form.</p>
              </div>
            </div>
          </body>
          </html>
        `};await s.transporter.sendMail(e),b=!0}catch(e){console.error("SMTP email send failed:",e)}return Response.json({success:!0,data:{emailSent:b},message:b?"Application sent successfully":"Application saved but email notification failed. We will contact you soon."})}catch(e){return Response.json({success:!1,error:e.message},{status:500})}}e.s(["POST",0,n])},5945,e=>{"use strict";var t=e.i(47909),a=e.i(68972),r=e.i(96250),s=e.i(59756),i=e.i(61916),o=e.i(74677),n=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),p=e.i(47587),u=e.i(66012),f=e.i(70101),g=e.i(26937),h=e.i(10372),m=e.i(93695);e.i(52474);var v=e.i(220);let x=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/careers/route",pathname:"/api/careers",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/careers/route.js",nextConfigOutput:"standalone",userland:()=>e.r(59869),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:w,serverHooks:b}=x;async function y(e,t,r){r.requestMeta&&(0,s.setRequestMeta)(e,r.requestMeta),x.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/careers/route";R=R.replace(/\/index$/,"")||"/";let w=await x.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!w)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:b,deploymentId:y,params:E,nextConfig:A,parsedUrl:C,isDraftMode:S,prerenderManifest:T,routerServerContext:P,isOnDemandRevalidate:N,revalidateOnlyGenerated:I,resolvedPathname:_,clientReferenceManifest:M,serverActionsManifest:O}=w,k=(0,n.normalizeAppPath)(R),q=!!(T.dynamicRoutes[k]||T.routes[_]),D=async()=>((null==P?void 0:P.render404)?await P.render404(e,t,C,!1):t.end("This page could not be found"),null);if(q&&!S){let e=!!T.routes[_],t=T.dynamicRoutes[k];if(t&&!1===t.fallback&&!e){if(A.adapterPath)return await D();throw new m.NoFallbackError}}let H=null;!q||x.isDev||S||(H="/index"===(H=_)?"/":H);let $=!0===x.isDev||!q,j=q&&!$;O&&M&&(0,o.setManifestsSingleton)({page:R,clientReferenceManifest:M,serverActionsManifest:O});let U=e.method||"GET",F=(0,i.getTracer)(),K=F.getActiveScopeSpan(),B=!!(null==P?void 0:P.isWrappedByNextServer),L=!!(0,s.getRequestMeta)(e,"minimalMode"),z=(0,s.getRequestMeta)(e,"incrementalCache")||await x.getIncrementalCache(e,A,T,L);null==z||z.resetRequestCache(),globalThis.__incrementalCache=z;let G={params:E,previewProps:T.preview,renderOpts:{experimental:{authInterrupts:!!A.experimental.authInterrupts,useCacheTimeout:A.experimental.useCacheTimeout},cacheComponents:!!A.cacheComponents,validationLevel:A.experimental.instantInsights.validationLevel,supportsDynamicResponse:$,incrementalCache:z,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:A.cacheLife,staticPageGenerationTimeout:A.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,s)=>x.onRequestError(e,t,r,s,P)},sharedContext:{buildId:b,deploymentId:y}},V=new l.NodeNextRequest(e),W=new l.NodeNextResponse(t),X=d.NextRequestAdapter.fromNodeNextRequest(V,(0,d.signalFromNodeResponse)(t)),Y=async({previousCacheEntry:a})=>{try{if(!L&&N&&I&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await x.handle(X,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let i=G.renderOpts.pendingWaitUntil;i&&r.waitUntil&&(r.waitUntil(i),i=void 0);let o=G.renderOpts.collectedTags;if(!q)return await (0,u.sendResponse)(V,W,s,i),null;{let e=await s.blob(),t=(0,f.toNodeOutgoingHttpHeaders)(s.headers);o&&(t[h.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,r=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=h.INFINITE_CACHE?!1!==a&&a>0?A.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await x.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:N})},!1,P),t}},J=async(s,o)=>{try{var n,l;let s=await x.handleResponse({req:e,nextConfig:A,cacheKey:H,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:N,revalidateOnlyGenerated:I,responseGenerator:Y,waitUntil:r.waitUntil,isMinimalMode:L});if(!q)return;if((null==s||null==(n=s.value)?void 0:n.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(l=s.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});L||t.setHeader("x-nextjs-cache",N?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,f.fromNodeOutgoingHttpHeaders)(s.value.headers);L&&q||i.delete(h.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,g.getCacheControlHeader)(s.cacheControl)),await (0,u.sendResponse)(V,W,new Response(s.value.body,{headers:i,status:s.value.status||200}));return}catch(t){if(t instanceof m.NoFallbackError||await x.onRequestError(e,t,{routerKind:"App Router",routePath:k,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:N})},!1,P),q)throw t;await (0,u.sendResponse)(V,W,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:i.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let a=F.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==c.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||k,n=`${U} ${r}`;s.setAttributes({"next.route":r,"http.route":r,"next.span_name":n}),s.updateName(n),o&&o!==s&&(o.setAttribute("http.route",r),o.updateName(n))})()}};if(B&&K)await J(K,void 0);else{let t=F.getActiveScopeSpan();await F.withPropagatedContext(e.headers,()=>F.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${R}`,kind:i.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},e=>J(e,t)),void 0,!B)}}e.s(["handler",0,y,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:w})},"routeModule",0,x,"serverHooks",0,b,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,w])}];

//# sourceMappingURL=_14isshh._.js.map