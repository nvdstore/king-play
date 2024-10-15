import fs from 'fs';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { env } from '$env/dynamic/private';

export type UploadParams = {
	file: File;
	dirname?: string;
	filename?: string;
};

export type CloudinaryUploadParams = {};

export async function upload(params: UploadParams) {
	// Configuration
	cloudinary.config({
		cloud_name: env.CLOUDINARY_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
	});

	const buff = await params.file.arrayBuffer();
	const uploadResult: UploadApiResponse | undefined = await new Promise((resolve) => {
		cloudinary.uploader
			.upload_stream({ folder: `user-upload/${params.dirname}` }, (error, uploadResult) => {
				return resolve(uploadResult);
			})
			.end(Buffer.from(buff));
	});

	return uploadResult?.url ?? '';
}
