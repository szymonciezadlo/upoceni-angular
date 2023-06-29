import { User } from "./user.model";

export interface GroupDTO{
    id: number,
    name: string,
    members: User[]
}