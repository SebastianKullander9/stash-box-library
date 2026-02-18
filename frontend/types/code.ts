import { ResourceTag } from "./resource";

export type CodeVersion = {
	id: string;
	content: string;
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

export type Code = {
	id: string;
	title: string;
	description: string;
	codeFiles: CodeFile[];
	tags: ResourceTag[];
	createdAt: Date;
	updatedAt: Date;
}