import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const UploaderContainer = styled.div`
	border: 2px dashed #ccc;
	padding: 20px;
	text-align: center;
	transition: border-color 0.3s;

	&.drag-over {
		border-color: #333;
	}
`;

const MediaUploader: React.FC = () => {
	const [dragOver, setDragOver] = useState(false);
	const [message, setMessage] = useState("Drag files to upload");

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
		setMessage("Drop to upload");
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		setMessage("Drag files to upload");
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		setMessage("Drag files to upload");

		const files = Array.from(e.dataTransfer.files);
		const formData = new FormData();

		files.forEach((file) => {
			formData.append("files", file);
		});

		try {
			const response = await axios.post("/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("Files uploaded successfully:", response.data.files);
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	return (
		<UploaderContainer onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={dragOver ? "drag-over" : ""}>
			{message}
		</UploaderContainer>
	);
};

export default MediaUploader;
