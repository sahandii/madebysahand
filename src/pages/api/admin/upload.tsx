import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import { verifyIdToken } from "@/firebase/firebaseAdmin";

// Extend NextApiRequest to include files and user properties
interface ExtendedNextApiRequest extends NextApiRequest {
	files: Express.Multer.File[];
	user?: any;
}

// Multer setup for file uploads
const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const ext = path.extname(file.originalname).toLowerCase();
			if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
				cb(null, "public/images");
			} else if ([".mp4", ".mov", ".avi"].includes(ext)) {
				cb(null, "public/videos");
			} else {
				cb(new Error("Invalid file type"), "");
			}
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

// Middleware to verify Firebase token
const verifyToken = async (req: ExtendedNextApiRequest, res: NextApiResponse, next: (error?: any) => void) => {
	const token = req.headers.authorization?.split("Bearer ")[1];

	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const decodedToken = await verifyIdToken(token);
		req.user = decodedToken; // Attach the decoded token to the request object
		next();
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized" });
	}
};

// @ts-ignore: Unreachable code error
const apiRoute = nextConnect<ExtendedNextApiRequest, NextApiResponse>({
	onError(error: any, req: ExtendedNextApiRequest, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something happened! ${error.message}` });
	},
	onNoMatch(req: ExtendedNextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(verifyToken);
apiRoute.use(upload.array("files"));

apiRoute.post((req: ExtendedNextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ files: req.files });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
