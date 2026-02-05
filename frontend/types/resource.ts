export type VariableAxes = {
	tag: string;
	min: number;
	max: number;
}

export type FontMetadata = {
	family: string;
	subfamily: string;
	weight: number;
	isThumbnailFace: boolean;
	isVariable: boolean;
	variableAxes: [VariableAxes, VariableAxes];
}

export type ResourceFile = {
    url: string;
    fileType: string;
    fileRole: string;
	fontMetadata?: FontMetadata;
}

export type ResourceCategory = {
    id: string;
    name: string;
}

export type ResourceTag = {
    id: string;
    name: string;
}

export type ResourceUser = {
    id: string;
    email: string;
}

export type Resource = {
    id: string;
    title: string;
    description: string;
    textContent: string;
    category: ResourceCategory;
    tags: ResourceTag[];
    user: ResourceUser;
    files: ResourceFile[];
    createdAt: Date;
}

export type ResourcePage = {
    items: Resource[];
    totalCount: number;
    nextOffset: number;
}