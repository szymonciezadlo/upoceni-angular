import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { GameDTO } from '../models/gameDTO.model';
import { CalendarGameDTO } from '../models/calendar-gameDTO.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarGamesService {
  games: Game[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getGames(year: number, month: number) {
    return this.http
      .get<CalendarGameDTO[]>(
        'http://localhost:8080/game/userByMonthYear?userId=' +
          this.authService.getUserId() +
          '&year=' +
          year +
          '&month=' +
          month,
        { withCredentials: true }
      )
      .pipe(
        map((responseData) => {
          const gamesArr: Game[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const game = responseData[key];
              gamesArr.push({
                id: game.id,
                group: !!game.groupDTO ? game.groupDTO.groupName : 'TEMP GROUP' + '',
                date: new Date(game.date),
                userStatus: game.userStatus,
              });
            }
          }
          return gamesArr;
        })
      );
  }
}
