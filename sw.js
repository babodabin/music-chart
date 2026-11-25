// 마이 뮤직: 인터넷이 되면 항상 새 파일, 안 되면 저장해 둔 파일. 캐시 이름은 index.html의 APP_VERSION을 따라감
const CACHE='mymusic-'+new URL(self.location.href).searchParams.get('v');
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','mymusic-180.png?v=2'])));
});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mymusic-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/sermon/')) return; // YouTube·말씀 페이지는 건드리지 않음
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){ const copy=r.clone(); e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy))); }
    return r;
  }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||(e.request.mode==='navigate'?caches.match('./'):undefined)||Response.error())));
});
