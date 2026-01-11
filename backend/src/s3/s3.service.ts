import { Injectable } from "@nestjs/common";
import {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

@Injectable()
export class S3Service {
	private s3: S3Client;
	private bucketName: string;

	constructor() {
		if (
			!process.env.AWS_REGION ||
			!process.env.AWS_S3_ACCESS_KEY ||
			!process.env.AWS_S3_SECRET_KEY ||
			!process.env.AWS_S3_BUCKET_NAME
		) {
			throw new Error("Missing AWS environment variables");
		}

		this.bucketName = process.env.AWS_S3_BUCKET_NAME;

		this.s3 = new S3Client({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY,
				secretAccessKey: process.env.AWS_S3_SECRET_KEY,
			},
		});
	}

	async uploadFile(
		fileName: string,
		fileBuffer: Buffer,
		contentType: string,
	): Promise<string> {
		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: fileName,
			Body: fileBuffer,
			ContentType: contentType,
		});

		await this.s3.send(command);

		return fileName;
	}

	async deleteFile(fileKey: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: fileKey,
		});

		await this.s3.send(command);
	}

	async getPresignedUrl(fileKey: string, expiresIn: 7000): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: fileKey,
		});

		return await getSignedUrl(this.s3, command, { expiresIn });
	}
}
