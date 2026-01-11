import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload/GraphQLUpload.mjs";

interface ProcessedFile {
	filename: string;
	buffer: Buffer;
	mimetype: string;
}

@Injectable()
export class FileUploadService {
	async processUploads(files: Promise<FileUpload>[]): Promise<ProcessedFile[]> {
		const processedFiles: ProcessedFile[] = [];

		for (const filePromise of files) {
			const file = await filePromise;
			const buffer = await this.streamToBuffer(file.createReadStream());

			processedFiles.push({
				filename: file.filename,
				buffer,
				mimetype: file.mimetype,
			});
		}

		return processedFiles;
	}

	private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
		const chunks: Buffer[] = [];
		for await (const chunk of stream) {
			chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
		}
		return Buffer.concat(chunks);
	}
}
