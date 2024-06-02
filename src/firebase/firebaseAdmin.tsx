import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

if (!getApps().length) {
	admin.initializeApp({
		credential: admin.credential.applicationDefault(), // Or use `admin.credential.cert(serviceAccount)` if using a service account JSON file
	});
}

export const verifyIdToken = async (token: string) => {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		return decodedToken;
	} catch (error) {
		console.error("Error verifying ID token:", error);
		return null;
	}
};
