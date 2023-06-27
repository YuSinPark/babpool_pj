self.addEventListener("install", function (e) {
  console.log("설치중");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("활성화 됨");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const restaurantId = e.data.json().data.restaurantId;

  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage({ restaurantId }); // restaurantId 데이터 전달
    });
  });

  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    data: {
      restaurantId: restaurantId
    },
    ...resultData,
  };  
  self.registration.showNotification(notificationTitle, notificationOptions); // 웹 푸시에 대한 알림 노출하는 부분
});

  // 웹 푸시 알림 클릭하면, 어떤 URL을 열어주는 등과 같은 추가적인 기능 구현부분
  // 사장님의 경우엔 지금 들어온 주문 내역서를 보여주는 걸로 하자
self.addEventListener("notificationclick", function (event) {
  const url = `/MyStore/${event.notification.data.restaurantId}/OrderManagement`;
  event.notification.close();
  event.waitUntil(
    clients.openWindow(url)
    );
});