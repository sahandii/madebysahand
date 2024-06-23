import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Project } from "@/data/projects";
import { CloudUpload } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

interface Props {
	projectSlug: Project["title"] | undefined;
	uploadedImages: string[];
	setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
	thumbnail?: boolean;
	thumbnailImg?: StaticImageData | undefined;
	setThumbnailImg?: React.Dispatch<React.SetStateAction<StaticImageData | undefined>>;
	className?: string;
}

const UploaderContainer = styled.div`
	position: relative;
	overflow: hidden;
	height: 100%;
	transition: background-image 150ms ease-in-out 0s;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23d4d8d4' stroke-width='2' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	background-size: calc(100% - 1px);
	background-repeat: no-repeat;
	border-radius: 10px;

	&.drag-over {
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%2314b8a5' stroke-width='4' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	}
`;

const ImagePreview = styled.div``;

const MediaUploader: React.FC<Props> = ({ projectSlug, uploadedImages, setUploadedImages, thumbnail, thumbnailImg, setThumbnailImg, className }) => {
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
		files.forEach((file) => formData.append("files", file));
		formData.append("projectSlug", projectSlug as string);
		formData.append("thumbnail", String(thumbnail));

		try {
			const response = await axios.post("/api/admin/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
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
		fileInputRef.current?.click();
	};

	return (
		<div className="relative">
			<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={clsx(className, { "drag-over": dragOver })}>
				{(thumbnailImg || uploadedImages.length > 0) && (
					<div className="pointer-events-none absolute left-0 top-0 z-[0] grid h-full place-content-center">
						<ImagePreview>
							{thumbnailImg ? ( //
								<Image width={1920} height={1080} src={thumbnailImg} className="aspect-[16/10] object-cover" alt="Thumbnail" />
							) : (
								uploadedImages.map((image, index) => <Image className="rounded-lg object-cover" width={150} height={150} key={index} src={image} alt={`Uploaded preview ${index + 1}`} />)
							)}
						</ImagePreview>
					</div>
				)}
				<div className="relative z-[2] inline-grid place-items-center rounded-xl bg-[rgba(255,255,255,0.9)] p-3 text-zinc-400">
					<CloudUpload className="h-[3em] w-[3em]" />
					<p>
						{message}
						{!dragOver && (
							<a href="#" className="underline" onClick={handleBrowseClick}>
								browse
							</a>
						)}
					</p>
				</div>
				<input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} />
			</UploaderContainer>
		</div>
	);
};

export default MediaUploader;
