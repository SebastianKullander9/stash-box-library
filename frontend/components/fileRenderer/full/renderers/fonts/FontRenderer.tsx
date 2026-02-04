import { Resource } from "@/types";
import { ResourceFile } from "@/types";
import DownloadButton from "@/components/ui/buttons/DownloadButton";
import Tags from "@/components/ui/tags/Tags";
import FontDisplay from "./FontDisplay";
import StaticFontStyles from "./StaticFontStyles";

interface FontRendererProps {
	resource: Resource;
}

export default function FontRenderer({ resource }: FontRendererProps) {
	const files: ResourceFile[] = resource.files;

	return (
		<section className="grid grid-span-12 gap-xl pb-24">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-md">
					<div>
						<h1 className="heading-3">
							{resource.title}
						</h1>
						<p className="text-text-secondary">
							{resource.description}
						</p>
					</div>
					<div className="flex flex-row gap-4">
						<Tags resource={resource} />
					</div>
				</div>
				<div className="inline-block">
					<DownloadButton label="Get font" url="temp" />
				</div>
			</div>
			<div className="bg-surface rounded-2xl p-xl">
				<FontDisplay resource={resource} />
			</div>
			<div className="flex flex-col gap-xl">
				<h2 className="heading-3">
					Styles
				</h2>
				<StaticFontStyles files={files} />
			</div>
		</section>
	);
};