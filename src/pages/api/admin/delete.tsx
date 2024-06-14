// pages/api/admin/delete.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;

	try {
		const filePath = path.join(process.cwd(), "out", "case", `${id}.html`);

		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}

		// Optionally, remove the generated JSON data files if they exist
		const dataFilePath = path.join(process.cwd(), "out", "_next", "data", `${id}.json`);

		if (fs.existsSync(dataFilePath)) {
			fs.unlinkSync(dataFilePath);
		}

		return res.json({ deleted: true });
	} catch (err) {
		return res.status(500).json({ error: "Failed to delete" });
	}
}
