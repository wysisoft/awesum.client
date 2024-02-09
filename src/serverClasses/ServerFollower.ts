export interface ServerFollower {
    id: number;
    leaderAppId: number;
    followerAppId: number;
    followerName: string;
    followerEmail: string;
    leaderName: string;
    leaderEmail: string;
    lastModified: string;
    leaderAccepted: boolean;
    leaderRemoved: boolean;
    uniqueId: string;
    deleted: boolean;
    followerLoginId: string;
    version: number;
    databaseId: number;
    initiatedBy: number;
    followerDatabaseGroup: string;
}
