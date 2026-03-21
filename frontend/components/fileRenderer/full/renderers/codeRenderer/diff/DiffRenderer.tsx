"use client";

import { Code } from "@/types/code";
import { notFound } from "next/navigation";
import { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

interface DiffRendererProps {
	resource: Code;
	snapshotId: string;
}

export default function DiffRenderer({ resource, snapshotId }: DiffRendererProps) {
	const snapshot = resource.snapshots.find((snapshot) => snapshot.id === snapshotId);


	if (!snapshot) {
		notFound();
	}

	console.log(snapshot)

	return (
		<div className="col-span-12 bg-surface mx-auto p-md rounded-lg">
			<p>
				Snapshot
			</p>
			<p>
				{snapshot.fileVersions.length} files were changed.
			</p>
			<p>
				{snapshot.addedFiles.length > 0 ? snapshot.addedFiles.length + " were added." : ""}
			</p>
			<p>
				{snapshot.deletedFiles.length > 0 ? snapshot.deletedFiles.length + " were deleted." : ""}
			</p>
		</div>
	);
};