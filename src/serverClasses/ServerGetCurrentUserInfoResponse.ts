
import type { ServerFollower } from "./ServerFollower";

export interface ServerGetCurrentUserInfoResponse {
    manualId: string | null;
    authenticationType: string | null;
    email: string | null;
    id: string | null;
    appId: string | null;
    followers: Array<ServerFollower> | null;
}
