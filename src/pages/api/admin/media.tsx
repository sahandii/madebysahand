import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query; // Use 'id' instead of 'projectId'

	// Ensure id is a string
	const projectIdStr = Array.isArray(id) ? id[0] : id;

	// Check if id is defined
	if (!projectIdStr) {
		console.error("Project ID is undefined");
		return res.status(400).json({ error: "Project ID is required" });
	}

	// Log the projectId and directory path
	console.log("Project ID:", projectIdStr);

	// Define the directory path
	const directoryPath = path.join(process.cwd(), "public/media", projectIdStr);
	console.log("Directory Path:", directoryPath);

	// Check if the directory exists
	if (!fs.existsSync(directoryPath)) {
		console.error("Directory does not exist:", directoryPath);
		return res.status(404).json({ error: "Project not found" });
	}

	// Read the directory and get all files
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			console.error("Error reading directory:", err);
			return res.status(500).json({ error: "Error reading directory" });
		}

		// Filter out non-image files if necessary
		const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));

		// Return the list of image filenames
		res.status(200).json(imageFiles);
	});
}
