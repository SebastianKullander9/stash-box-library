export type ResourceFile = {
    url: string;
    fileType: string;
    fileRole: string;
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