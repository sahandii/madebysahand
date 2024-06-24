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
	border-radius: 5px;

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
		<div className="flex flex-col gap-5">
			<div className="card-media-uploaded flex h-full flex-col justify-center rounded-md border bg-white p-4">
				<div className="grid grid-cols-2 gap-5">
					<ImagePreview>
						{thumbnail ? ( //
							<Image //
								draggable={false}
								width={1920}
								height={1080}
								src={
									thumbnailImg //
										? thumbnailImg
										: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23b1b1b1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-image-up'%3E%3Cpath d='M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21'/%3E%3Cpath d='m14 19.5 3-3 3 3'/%3E%3Cpath d='M17 22v-5.5'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3C/svg%3E"
								}
								className={`${thumbnailImg ? "object-contain" : "object-scale-down"} flex aspect-video rounded-md border bg-slate-50`}
								alt="Thumbnail image"
							/>
						) : (
							uploadedImages.map((image, index) => (
								<Image //
									className="rounded-lg object-contain"
									width={150}
									height={150}
									key={index}
									src={image}
									alt={`Uploaded preview ${index + 1}`}
								/>
							))
						)}
					</ImagePreview>
					<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={clsx(className, { "drag-over": dragOver })}>
						<div className="pointer-events-none relative z-[2] inline-grid place-items-center text-zinc-400">
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
			</div>
			{/* <div className="card-media-uploaded rounded-md border bg-white">
				{(thumbnailImg || uploadedImages.length > 0) && (
					<div className="m-3 grid max-w-[60px] grid-cols-[200px_1fr]">
						<ImagePreview>
							{thumbnailImg ? ( //
								<Image width={1920} height={1080} src={thumbnailImg} className="flex rounded-md" alt="Thumbnail" />
							) : (
								uploadedImages.map((image, index) => <Image className="rounded-lg object-contain" width={150} height={150} key={index} src={image} alt={`Uploaded preview ${index + 1}`} />)
							)}
						</ImagePreview>
						{thumbnailImg && (
							<div className="ml-2 flex flex-col justify-center text-[14px]">
								<p className="whitespace-nowrap">
									{(thumbnailImg as unknown as string)
										.split("/")
										.pop()
										?.replace(/\.[^/.]+$/, "")}
									.jpg
								</p>
								<p className="cursor-pointer text-red-500 hover:underline">Remove</p>
							</div>
						)}
					</div>
				)}
			</div>
			<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={clsx(className, { "drag-over": dragOver })}>
				<div className="relative z-[2] inline-grid place-items-center text-zinc-400">
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
			</UploaderContainer> */}
		</div>
	);
};

export default MediaUploader;
