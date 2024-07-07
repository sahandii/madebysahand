import * as React from "react";
import { useState, useEffect } from "react";
import { useResponsive } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { GalleryVerticalEnd, Trash2 } from "lucide-react";
import axios from "axios";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { dynamicBlurDataUrl } from "@/components/dynamicBlurDataUrl"; // Import the utility function

interface MediaLibraryProps {
	title: string;
	projectId: string;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ title, projectId }) => {
	const [open, setOpen] = useState(false);
	const [images, setImages] = useState<{ src: string; blurDataURL: string }[]>([]);
	const { isMinWidth } = useResponsive();

	const fetchImages = async () => {
		try {
			const url = `/api/admin/media?id=${projectId}`;
			console.log("Fetching images from:", url); // Log the URL
			const response = await axios.get(url);
			const imagesWithBlurData = await Promise.all(
				response.data.map(async (image: string) => {
					const blurDataURL = await dynamicBlurDataUrl(`/media/${projectId}/${image}`);
					return { src: image, blurDataURL };
				}),
			);
			setImages(imagesWithBlurData);
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	};

	const deleteImage = async (imageSrc: string) => {
		try {
			const url = `/api/admin/deleteImage?id=${projectId}&image=${imageSrc}`;
			await axios.delete(url);
			fetchImages(); // Re-fetch images after deletion
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};

	const renderGallery = () => (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
			{images.map((image, index) => (
				<div key={index} className="group relative">
					<Image
						placeholder="blur"
						src={`/media/${projectId}/${image.src}`}
						alt={`Media ${index}`}
						width={200}
						height={113}
						className="h-auto w-full min-w-[100%] rounded-md border border-slate-300 bg-slate-200"
						blurDataURL={image.blurDataURL} // Add the blurDataURL property
					/>
					<button onClick={() => deleteImage(image.src)} className="absolute right-2 top-2 hidden rounded bg-red-500 p-1 text-white group-hover:block">
						<Trash2 className="h-4 w-4" />
					</button>
				</div>
			))}
		</div>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={fetchImages} size={"icon"} variant="outline" title="Media">
					<GalleryVerticalEnd className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[90em]">
				<DialogHeader className="mb-5">
					<DialogTitle>Media Gallery</DialogTitle>
					<DialogDescription>Manage media files for {title}</DialogDescription>
					<div className="py-3">
						<Separator />
					</div>
				</DialogHeader>
				{renderGallery()}
			</DialogContent>
		</Dialog>
	);
};

export default MediaLibrary;
