import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Project } from "@/data/projects";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface Props {
	projectSlug: Project["title"] | undefined;
	uploadedImages: string[];
	setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
	thumbnail?: boolean;
	thumbnailImg?: StaticImageData | undefined;
	setThumbnailImg?: React.Dispatch<React.SetStateAction<StaticImageData | undefined>>;
}

const UploaderContainer = styled.div`
	transition: background-image 150ms ease-in-out 0s;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23d4d8d4' stroke-width='2' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	border-radius: 10px;
	padding: 5em;
	text-align: center;
	&.drag-over {
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2314b8a5' stroke-width='4' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	}
`;

const ImagePreview = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;

	img {
		max-width: 150px;
		max-height: 150px;
		margin: 10px;
	}
`;

const MediaUploader: React.FC<Props> = ({ projectSlug, uploadedImages, setUploadedImages, thumbnail, thumbnailImg, setThumbnailImg }) => {
	const [dragOver, setDragOver] = useState(false);
	const [message, setMessage] = useState("Drag & Drop or ");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
		setMessage("Drop to upload");
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		setMessage("Drag & Drop or ");
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		setMessage("Drag & Drop or ");

		const files = Array.from(e.dataTransfer.files);
		uploadFiles(files);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			uploadFiles(files);
		}
	};

	const uploadFiles = async (files: File[]) => {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append("files", file);
		});
		formData.append("projectSlug", projectSlug as string); // Append projectSlug from prop
		formData.append("thumbnail", String(thumbnail)); // Append thumbnail from prop
		try {
			const response = await axios.post("/api/admin/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const uploadedFiles = response.data.files;
			const imageUrls = uploadedFiles.map((file: Express.Multer.File) => `/images/${projectSlug}/${file.filename}`);

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

	const handleBrowseClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={dragOver ? "drag-over" : ""}>
				<span className="flex flex-col items-center text-zinc-400">
					<CloudUpload className="h-[3em] w-[3em]" />
					<p>
						{message}
						{!dragOver && (
							<a href="#" className="underline" onClick={handleBrowseClick}>
								browse
							</a>
						)}
					</p>
				</span>
				<input type="file" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
			</UploaderContainer>
			{(thumbnailImg !== undefined || uploadedImages.length > 0) && (
				<ImagePreview>
					{thumbnailImg ? ( //
						<Image className="rounded-lg object-cover" width={150} height={150} src={thumbnailImg || ""} alt={`Thumbnail`} />
					) : (
						uploadedImages.map((image, index) => <Image className="rounded-lg object-cover" width={150} height={150} key={index} src={image} alt={`Uploaded preview ${index + 1}`} />)
					)}
				</ImagePreview>
			)}
		</>
	);
};

export default MediaUploader;
