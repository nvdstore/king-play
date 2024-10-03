import fs from 'fs';

export type UploadParams = {
	file: File;
	dirname?: string;
	filename?: string;
};

export async function upload(params: UploadParams) {
	try {
		if (params.file.size > 0) {
			const dirName = params.dirname ? `/upload/${params.dirname}` : '/upload';
			if (!fs.existsSync(`static${dirName}`)) {
				fs.mkdirSync(`static${dirName}`);
			}

			const fileName = `${dirName}/${params.filename ?? params.file.name}`;
			fs.writeFileSync(`static${fileName}`, Buffer.from(await params.file.arrayBuffer()));

			return fileName;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}
