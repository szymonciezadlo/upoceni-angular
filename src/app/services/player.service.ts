import { Injectable } from '@angular/core';
import { PlayerDTO } from '../models/playerDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}
  players: PlayerDTO[] = [
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 1, name: 'Szymon Ciężadło', status: 'APPROVED' },
    // { id: 4, name: 'Szymon Ciężadło', status: 'NOT_APPROVED' },
    // { id: 5, name: 'Szymon Ciężadło', status: 'DECLINED' },
  ];

  userPlayer: PlayerDTO = {
    playerId: 1,
    playerName: 'Szymon Ciężadło',
    status: 'APPROVED',
  };

  getUserPlayer() {
    return this.userPlayer;
  }

  getPlayers() {
    return this.players.slice();
  }

  setStatusUserPlayer(status: boolean) {
    this.userPlayer.status = status ? 'APPROVED' : 'DECLINED';
  }
}
