// Import necessary types and libraries
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";

// Define the base directory for image uploads
const baseUploadDir = path.join(process.cwd(), "public/media");
// Check if the base upload directory exists, if not, create it
if (!fs.existsSync(baseUploadDir)) {
	fs.mkdirSync(baseUploadDir, { recursive: true });
}

// Define a temporary directory for uploads
const tmpUploadDir = path.join(process.cwd(), "public/.tmp");
// Check if the temporary upload directory exists, if not, create it
if (!fs.existsSync(tmpUploadDir)) {
	fs.mkdirSync(tmpUploadDir, { recursive: true });
}

// Configure multer storage settings
const storage = multer.diskStorage({
	// Set the destination for uploaded files
	destination: function (req, file, cb) {
		cb(null, tmpUploadDir);
	},
	// Set the filename for uploaded files
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}`);
	},
});

// Initialize multer with the defined storage settings and file size limit
const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Create a router using next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// Use multer middleware to handle file uploads
router.use(upload.array("files") as any);

// Define the POST route for file uploads
router.post((req: any & { files: Express.Multer.File[] }, res: NextApiResponse) => {
	const files = req.files;
	console.log("router.post() – req.body:", req.body);

	// Get the project slug from the request body or set a default value
	const projectSlug = req.body.projectSlug || "untitled";
	// Define the project directory based on the project slug
	const projectDir = path.join(baseUploadDir, projectSlug);

	// Check if the project directory exists, if not, create it
	if (!fs.existsSync(projectDir)) {
		fs.mkdirSync(projectDir, { recursive: true });
	}

	// Move each uploaded file from the temporary directory to the project directory
	files.forEach((file: Express.Multer.File) => {
		const tmpPath = path.join(tmpUploadDir, file.filename);
		const targetPath = path.join(projectDir, file.filename);
		fs.renameSync(tmpPath, targetPath);
	});
	// Send a success response with the uploaded files information
	res.status(200).json({ message: "Files uploaded successfully", files });
});

// Disable the default body parser for this API route
export const config = {
	api: {
		bodyParser: false,
	},
};

// Export the router handler with custom error handling
export default router.handler({
	onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err.stack);
		res.status(500).end(err.message);
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});
