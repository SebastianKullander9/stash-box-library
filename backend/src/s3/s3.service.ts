import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
	private s3: S3Client;

	constructor() {
		if (
			!process.env.AWS_REGION ||
			!process.env.AWS_S3_ACCESS_KEY ||
			!process.env.AWS_S3_SECRET_KEY ||
			!process.env.AWS_S3_BUCKET_NAME
		) {
			throw new Error("Missing AWS environment variables");
		}

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
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: fileName,
			Body: fileBuffer,
			ContentType: contentType,
			ACL: "public-read",
		});

		await this.s3.send(command);

		return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
	}
}
