import { 
    initializeApp, 
    getApp, 
    getApps, 
    cert, 
    App 
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const service_key = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
  )

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(service_key),
    });
} else {
    app = getApp();
}

const adminDB = getFirestore(app);
export { app as adminApp ,adminDB };
