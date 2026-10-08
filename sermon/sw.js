// 홈 화면 설치(공유 목록에 '말씀'이 나오게)용. 캐시는 안 하고 그대로 인터넷에서 받음.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
