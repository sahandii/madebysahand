import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the `public/images` folder exists
const baseUploadDir = path.join(process.cwd(), "public/images");
if (!fs.existsSync(baseUploadDir)) {
	fs.mkdirSync(baseUploadDir, { recursive: true });
}

// Configure multer for disk storage
const tmpUploadDir = path.join(process.cwd(), "public/.tmp");
if (!fs.existsSync(tmpUploadDir)) {
	fs.mkdirSync(tmpUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tmpUploadDir);
	},
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 },
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(upload.array("files") as any);

router.post((req: any & { files: Express.Multer.File[] }, res: NextApiResponse) => {
	const files = req.files;
	console.log("router.post() – req.body:", req.body);

	// Ensure req.body.projectSlug is available
	const projectSlug = req.body.projectSlug || "untitled";
	const projectDir = path.join(baseUploadDir, projectSlug);

	if (!fs.existsSync(projectDir)) {
		fs.mkdirSync(projectDir, { recursive: true });
	}

	// Move files to the correct directory
	files.forEach((file: Express.Multer.File) => {
		const tmpPath = path.join(tmpUploadDir, file.filename);
		const targetPath = path.join(projectDir, file.filename);
		fs.renameSync(tmpPath, targetPath);
	});
	res.status(200).json({ message: "Files uploaded successfully", files });
});

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, since we're using multer
	},
};

export default router.handler({
	onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err.stack);
		res.status(500).end(err.message);
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});
