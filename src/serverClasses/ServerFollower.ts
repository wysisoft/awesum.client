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
}
