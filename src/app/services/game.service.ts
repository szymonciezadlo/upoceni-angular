import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDTO } from '../models/gameDTO.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { PlayerDTO } from '../models/playerDTO.model';
import { User } from '../models/user.model';
import { CreateGameDTO } from '../models/create-gameDTO.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameSubject = new Subject<GameDTO>();
  game!: GameDTO;
  userPlayer = new Subject<PlayerDTO>();
  constructor(private http: HttpClient) {}

  fetchGame(gameId: number) {
    return this.http
      .get<GameDTO>('http://localhost:8080/game/', {
        params: new HttpParams().append('gameId', gameId),
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((gameDTO) => {
          this.game = gameDTO;
          this.gameSubject.next(gameDTO);
        })
      );
  }

  fetchSuggestedUsers(username: string, gameId: number | undefined) {
    let params = new HttpParams()
      .append('username', username);
    if (gameId) {
      params = params.append('gameId', gameId);
    }
    return this.http
      .get<User[]>('http://localhost:8080/user/suggested', {
        params: params,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  fetchSuggestedUsersFromGroup(username: string, groupId: number) {
    let params = new HttpParams().append('username', username);
    params = params.append('groupId', groupId);
    
    return this.http
      .get<User[]>('http://localhost:8080/user/suggested/group', {
        params: params,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(
      () => new Error('Error from GameService', errorRes.error)
    );
  }

  updateUserPlayerStatus(status: string, gameId: number) {
    return this.http
      .put<PlayerDTO>(
        'http://localhost:8080/game/player',
        {
          gameId: gameId,
          status: status,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe((player) => {
        this.userPlayer.next(player);
      });
  }

  addUserToGame(user: User, gameId: number) {
    return this.http
      .post<[PlayerDTO]>('http://localhost:8080/game/players', [user.id], {
        withCredentials: true,
        params: new HttpParams().append('gameId', gameId + ''),
      })
      .subscribe((players) => {
        this.game.players = players;
        this.gameSubject.next(this.game);
      });
  }

  deletePlayer(player: PlayerDTO, gameId: number) {
    this.http
      .delete<[PlayerDTO]>('http://localhost:8080/game/player', {
        withCredentials: true,
        params: new HttpParams()
          .append('playerId', player.playerId)
          .append('gameId', gameId),
      })
      .subscribe((players) => {
        this.game.players = players;
        this.gameSubject.next(this.game);
      });
  }

  createGame(newGame: CreateGameDTO) {
    return this.http
      .post<GameDTO>('http://localhost:8080/game/', newGame, {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((gameDTO) => {
          this.game = gameDTO;
          this.gameSubject.next(gameDTO);
          
        })
      );
  }
}
/* 
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
players: [
  {
    playerId: number;
    playerName: string;
    status: string;
  }
]; */
