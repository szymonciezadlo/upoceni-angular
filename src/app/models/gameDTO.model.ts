import { PlayerDTO } from './playerDTO.model';

export interface GameDTO {
  id: number;
  date: Date;
  place: string;
  maxPlayers: number;
  minPlayers: number;
  durationMin: number;
  approvedPlayers: number;
  costByPlayer?: number;
  minCostByPlayer: number;
  maxCostByPlayer: number;
  groupDTO: {
    groupId: number;
    groupName: string;
  };
  players: [PlayerDTO];
  userPlayer: PlayerDTO;
}
