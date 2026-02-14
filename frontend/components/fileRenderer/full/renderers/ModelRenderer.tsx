"use client";

import { Resource } from "@/types";
import Canvas3d from "@/components/3d-viewer/canvas/Canvas3d";
import FormattedDate from "@/components/ui/date/FormattedDate";
import DownloadButton from "@/components/ui/buttons/DownloadButton";

type ModelProps = {
    resource: Resource;
	colSpan: string;
}

export default function ModelRenderer({ resource, colSpan }: ModelProps) {
    const modelUrl = resource.files[0].url;

    return (
		<div className={`w-full ${colSpan} grid grid-cols-12 gap-xl`}>
			<div className="col-span-6  min-h-screen cursor-pointer">
				<Canvas3d modelUrl={modelUrl} />
			</div>
			<div className="col-span-6 bg-surface rounded-lg p-xl inline-block">
				<div className="flex flex-row justify-between">
					<h1 className="heading-4">
						{resource.title}
					</h1>
					<div className="text-text-tertiary text-xs">
						<FormattedDate createdAt={resource.createdAt} />
					</div>
				</div>
				<div className="text-text-secondary max-w-prose">
					<p>
						{resource.description}
						
					</p>
					<p>
						{resource.textContent}
					</p>
				</div>
				<DownloadButton label="Get model" url="temp" />
			</div>
		</div>
    )
}