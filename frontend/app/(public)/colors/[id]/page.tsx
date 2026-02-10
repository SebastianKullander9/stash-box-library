import { getOneColorPalette } from "@/actions/colorPalette";

export default async function ViewColor({ params }: { params: { id: string } }) {
	const colorPalette = await getOneColorPalette(params.id);

	console.log(colorPalette);

	return (
		<div>
			<p>color palette</p>
		</div>
	);
};