
import type { ServerFollower } from "./ServerFollower";

export interface ServerAddFollowRequestResponse {
    followers: Array<ServerFollower> | null;
}
