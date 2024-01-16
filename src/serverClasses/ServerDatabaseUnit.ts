export interface ServerDatabaseUnit {
    id: number;
    type: number;
    name: string;
    order: number;
    lastModified: string;
    databaseId: number;
    appId: number;
    uniqueId: string;
    deleted: boolean;
    databaseTypeId: number;
}
