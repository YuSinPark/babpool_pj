import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    alert("알림설정을 허용해주셔야 서비스 이용이 가능합니다.")
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })

    if (token) console.log("token: ", token);
    else console.log("Can not get Token");

  return token;
}