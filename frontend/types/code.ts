import { ResourceTag } from "./resource";

export type CodeVersion = {
	id: string;
	content: string;
	versionNumber: number;
	createdAt: Date;
}

export type CodeFile = {
	id?: string;
	title: string;
	language: string;
	content: string;
	codeVersions?: CodeVersion[];
	createdAt?: Date;
	updatedAt?: Date;
}

export type DeletedFile = {
	id: string;
	title: string;
	language: string;
	createdAt: Date;
}

export type CodeSnapshot = {
	id: string;
	message: string;
	fileVersions: CodeVersion[];
	addedFiles: CodeFile[];
	deletedFiles: DeletedFile[];
	createdAt: Date;
}

export type Code = {
	id: string;
	title: string;
	description: string;
	codeFiles: CodeFile[];
	snapshots: CodeSnapshot[];
	tags: ResourceTag[];
	createdAt: Date;
	updatedAt: Date;
}

export type CodePage = {
	items: Code[],
	totalCount: number;
	nextOffset: number;
}