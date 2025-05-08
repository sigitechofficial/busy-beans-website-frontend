import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getToken, getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBt30hw85xHHSBypzw0jRCcOhZak8z4B0g",
  authDomain: "busybeancoffee-253cd.firebaseapp.com",
  projectId: "busybeancoffee-253cd",
  storageBucket: "busybeancoffee-253cd.firebasestorage.app",
  messagingSenderId: "70801840893",
  appId: "1:70801840893:web:fc96a77af8846ca21dfc94",
  measurementId: "G-HR3JJ1ZZXN"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("email");

const messaging = getMessaging(app);

const generateToken = async () => {
  // const permission = await Notification.requestPermission();
  // if (permission === "granted") {
  const token = await getToken(messaging, {
    vapidKey:
      // "BNXuGEz-PtAURt1i307M_ZW0z5Y_mdWF8f1W6WjF3_ldSrNVpYZPgEnp0-WnhmuoRGKT8NVzGtHmdMWCJphhxp0",
      "BOCff8h0dPpPLENH0Io9BPrcOwjhVnTIfvu9RNsZFmOPDFJmVEb_IjtCOzCMPgW8sjSTB8RtDTsj56LSmE-BcYU",
  });
  return token;
  // }
};

export { auth, providerGoogle, generateToken };
