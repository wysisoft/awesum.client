
import type { ServerFollower } from "./ServerFollower";

export interface ServerGetCurrentUserInfoResponse {
    manualId: string;
    authenticationType: string;
    email: string;
    id: number;
    appId: string;
    followers: Array<ServerFollower>;
}
