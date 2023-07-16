import { Game } from "./game.model";
import { User } from "./user.model";

export interface GroupInfoDTO{
    id: number;
    groupName: string;
    members: User[];
    games: Game[];
    rules: string;
}