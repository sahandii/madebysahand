import axios from "axios";
import { Project } from "@/data/projects";
import Image, { StaticImageData } from "next/image";
import UploadContainer from "@/components/admin/UploadContainer";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

interface Props {
	projectSlug: Project["title"] | undefined;
	uploadedImages: string[];
	setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
	thumbnail?: boolean;
	thumbnailImg?: StaticImageData | string;
	setThumbnailImg?: React.Dispatch<React.SetStateAction<StaticImageData | string>>;
	className?: string;
}

const MediaUploader: React.FC<Props> = ({ projectSlug, uploadedImages, setUploadedImages, thumbnail, thumbnailImg, setThumbnailImg }) => {
	const uploadFiles = async (files: File[]) => {
		const formData = new FormData();
		files.forEach((file) => formData.append("files", file));
		formData.append("projectSlug", projectSlug as string);
		formData.append("thumbnail", String(thumbnail));

		try {
			const response = await axios.post("/api/admin/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			const uploadedFiles = response.data.files;

			const imageUrls = uploadedFiles.map((file: Express.Multer.File) => ({
				src: `/media/${projectSlug}/${file.filename}`,
				width: 1920, // Replace with actual width if available
				height: 1080, // Replace with actual height if available
				alt: `${file.filename}`,
			}));

			if (thumbnail) {
				setThumbnailImg?.(imageUrls[0] as StaticImageData);
			} else {
				setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error("Error response data:", error.response?.data);
				console.error("Error response status:", error.response?.status);
				console.error("Error response headers:", error.response?.headers);
			} else {
				console.error("Error message:", error);
			}
		}
	};

	return (
		<div className="flex flex-col gap-5">
			{thumbnail ? ( //
				thumbnailImg ? (
					<div className="relative h-full">
						<UploadContainer className="w-full max-lg:aspect-video" thumbnail={thumbnail} thumbnailImg={thumbnailImg} uploadFiles={uploadFiles} />
						<div className="pointer-events-none absolute left-[50%] top-[50%] h-[calc(100%-1.5em)] w-[calc(100%-1.5em)] translate-x-[-50%] translate-y-[-50%] transform-gpu">
							<div
								onClick={() => {
									thumbnailImg && setThumbnailImg?.("");
								}}
								className="pointer-events-auto absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-white bg-opacity-60 px-2 py-1 text-xs uppercase tracking-wide backdrop-blur-md hover:bg-opacity-80"
							>
								<small>Clear</small>
							</div>
							<Image //
								draggable={false}
								fill
								src={
									thumbnailImg //
										? thumbnailImg
										: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23b1b1b1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-image-up'%3E%3Cpath d='M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21'/%3E%3Cpath d='m14 19.5 3-3 3 3'/%3E%3Cpath d='M17 22v-5.5'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3C/svg%3E"
								}
								className={`pointer-events-none h-full rounded-sm object-cover`}
								alt="Thumbnail image"
							/>
						</div>
					</div>
				) : (
					<UploadContainer thumbnail={thumbnail} uploadFiles={uploadFiles} />
				)
			) : (
				<div className="grid grid-cols-2 gap-5">
					<div>
						{uploadedImages.map((image, index) => (
							<Image //
								className="rounded-lg object-contain"
								width={150}
								height={150}
								key={index}
								src={image}
								alt={`Uploaded preview ${index + 1}`}
							/>
						))}
					</div>
					<UploadContainer thumbnail={thumbnail} uploadFiles={uploadFiles} />
				</div>
			)}
		</div>
	);
};

export default MediaUploader;
