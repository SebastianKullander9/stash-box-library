import { Injectable } from "@nestjs/common";
import sharp from "sharp";

@Injectable()
export class ImageService {
	async parseImage(image: {
		buffer: Buffer;
	}): Promise<{ width: number; height: number }> {
		const metadata = await sharp(image.buffer).metadata();

		if (!metadata.width || !metadata.height) {
			throw new Error("Unable to extract image dimensions");
		}

		return {
			width: metadata.width,
			height: metadata.height,
		};
	}
}
