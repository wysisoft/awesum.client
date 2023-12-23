
import type { ServerFollower } from "./ServerFollower";

export interface ServerGetCurrentUserInfoResponse {
    manualId: string;
    authenticationType: string;
    email: string;
    id: string;
    appId: string;
    followers: Array<ServerFollower>;
}
