export interface ServerDatabase {
    id: number | null;
    name: string | null;
    lastModified: string | null;
    deleted: boolean | null;
    version: number | null;
    order: number | null;
    loginid: string | null;
    uniqueId: string | null;
    groupName: string | null;
    appId: number | null;
}
