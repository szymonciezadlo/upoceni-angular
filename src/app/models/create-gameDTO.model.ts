export interface CreateGameDTO {
  date: Date;
  place: string;
  maxPlayers: number;
  minPlayers: number;
  durationMin: number;
  cost: number;
  groupId?: number;
  players: number[];
}
