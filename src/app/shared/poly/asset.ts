interface File {
    url: string;
}

export interface Asset {
    name: string;
    displayName: string;
    authorName: string;
    description: string;
    thumbnail: File;
}
