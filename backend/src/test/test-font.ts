import { FontService } from "../../src/resources/services/font-metadata.service";
import * as fs from "fs";
import * as path from "path";

function testFont() {
	const fontService = new FontService();

	// Read a font file from your local system
	const fontPath = path.join(__dirname, "PPPangaia-medium.otf");
	const buffer = fs.readFileSync(fontPath);

	// Convert Buffer to ArrayBuffer
	const arrayBuffer = buffer.buffer.slice(
		buffer.byteOffset,
		buffer.byteOffset + buffer.byteLength
	);

	try {
		const result = fontService.parseFont(arrayBuffer);
		console.log("Font metadata:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error parsing font:", error);
	}
}

testFont();
