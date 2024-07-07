import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id, image } = req.query;

	try {
		const filePath = path.join(process.cwd(), "public", "media", id as string, image as string);

		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			return res.status(200).json({ deleted: true });
		} else {
			return res.status(404).json({ error: "File not found" });
		}
	} catch (err) {
		return res.status(500).json({ error: "Failed to delete file" });
	}
}
