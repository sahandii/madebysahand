import clsx from "clsx";
import { useState, useRef } from "react";
import { CloudUpload, ThumbsDown } from "lucide-react";
import styled from "styled-components";
import { StaticImageData } from "next/image";

type Props = {
	thumbnail: boolean | undefined;
	thumbnailImg?: StaticImageData | string;
	uploadFiles: (files: File[]) => Promise<void>;
	className?: string;
};

const UploaderContainer = styled.div`
	display: grid;
	place-content: center;
	position: relative;
	overflow: hidden;
	height: 100%;
	transition: background-image 150ms ease-in-out 0s;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23d4d8d4' stroke-width='2' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	background-size: calc(100% - 1px);
	background-repeat: no-repeat;
	border-radius: 5px;

	&.drag-over {
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%2316A34A' stroke-width='4' stroke-dasharray='10%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
	}
`;

const UploadContainer: React.FC<Props> = ({ thumbnail, thumbnailImg, uploadFiles, className }) => {
	const defaultMessage = thumbnail ? "Drag image to upload" : "Drop file(s) to upload";
	const [dragOver, setDragOver] = useState(false);
	const [message, setMessage] = useState(defaultMessage);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
		setMessage("Drop file here");
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		setMessage(defaultMessage);
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		const files = Array.from(e.dataTransfer.files);
		setMessage(defaultMessage);
		uploadFiles(files);
	};
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			uploadFiles(files);
		}
	};
	const handleBrowseClick = () => {
		fileInputRef.current?.click();
	};
	return (
		<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={clsx(className, { "drag-over": dragOver })}>
			<div className={clsx("relative z-[2] inline-grid place-items-center text-zinc-400", { "text-green-600": dragOver })}>
				{!thumbnailImg && (
					<>
						<CloudUpload className="h-9 w-9" />
						<p className={`select-none text-center text-sm leading-4`}>
							{message} <br />
							{!dragOver && (
								<a href="#" className="underline" onClick={handleBrowseClick}>
									or browse
								</a>
							)}
						</p>
					</>
				)}
			</div>
			<input type="file" multiple={!thumbnail ? true : false} ref={fileInputRef} className="hidden" onChange={handleFileChange} />
		</UploaderContainer>
	);
};

export default UploadContainer;
