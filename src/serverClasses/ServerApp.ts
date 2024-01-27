export interface ServerApp {
    id: number | null;
    manualId: string | null;
    email: string | null;
    loginid: string | null;
    name: string | null;
    lastModified: string | null;
    homePageIcon: string | null;
    deleted: boolean | null;
    version: number | null;
    allowedToInitiateFollows: boolean | null;
}
