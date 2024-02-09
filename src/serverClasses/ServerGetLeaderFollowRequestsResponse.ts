
import type { ServerFollower } from "./ServerFollower";

export interface ServerGetLeaderFollowRequestsResponse {
    followers: Array<ServerFollower>;
}
