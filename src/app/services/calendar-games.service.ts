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
  games: Game[] = [
    // {id: 1, group: 'UPOCENI', date: new Date(2023, 5, 5, 18, 30), userStatus: 'APPROVED'},
    // {id: 1, group: 'UPOCENI', date: new Date(2023, 5, 5, 19, 30), userStatus: 'DECLINED'},
    // {id: 1, group: 'UPOCENI', date: new Date(2023, 5, 5, 20, 30), userStatus: 'NOT_APPROVED'},
    // {id: 2, group: 'UPOCENI', date: new Date(2023, 5, 6, 18, 30), userStatus: 'APPROVED'},
    // {id: 3, group: 'UPOCENI', date: new Date(2023, 5, 7, 18, 30), userStatus: 'APPROVED'},
    // {id: 4, group: 'UPOCENI', date: new Date(2023, 5, 8, 18, 30), userStatus: 'APPROVED'},
    // {id: 5, group: 'UPOCENI', date: new Date(2023, 5, 9, 18, 30), userStatus: 'APPROVED'},
    // {id: 6, group: 'UPOCENI', date: new Date(2023, 5, 10, 18, 30), userStatus: 'APPROVED'},
  ];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getGames(year: number, month: number) {
    // return this.games.slice();
    // const headers = new HttpHeaders();
    // headers.set('Cookie',  'auth_by_cookie=17&saimono003&vNxkcAzDJx7D9I0iP9QfsmokudSm1T41SgjeUpsAXkU=;');

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
