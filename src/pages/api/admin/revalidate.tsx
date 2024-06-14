// pages/api/admin/revalidate.tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;

	try {
		// Revalidate the specific project page
		await res.revalidate(`/case/${id}`);
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).json({ error: "Failed to revalidate" });
	}
}
