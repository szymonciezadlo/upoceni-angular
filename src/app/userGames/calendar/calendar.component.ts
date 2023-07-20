import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { CalendarGamesService } from 'src/app/services/calendar-games.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  gamesSub!: Subscription;
  dataSub!: Subscription;
  games!: Game[];
  weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  chosenDate: Date = new Date(2023, 5);
  daysNumbers: number[] = [];
  gamesByDays: Map<number, Game[]> = new Map();

  constructor(
    private userGamesService: CalendarGamesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataSub = this.route.params.subscribe((v) => {
      this.chosenDate = new Date(v['year'], v['month'] - 1);
      this.gamesSub = this.userGamesService
        .getGames(v['year'], v['month'])
        .subscribe((games) => {
          this.games = games;
          this.fillDays();
        });
    });
  }

  ngOnDestroy(): void {
    this.gamesSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  parseDate(date: Date) {
    return (
      this.weekday[date.getDay()] +
      ': ' +
      date.getMonth() +
      '/' +
      date.getDate()
    );
  }

  fillDays() {
    let lastDay: Date = new Date(
      this.chosenDate.getFullYear(),
      this.chosenDate.getMonth() + 1,
      0
    );
    let firstDay: Date = new Date(
      this.chosenDate.getFullYear(),
      this.chosenDate.getMonth(),
      1
    );
    let numberOfDays: number = lastDay.getDate();

    let numberOfDaysMonthBefore: number = new Date(
      this.chosenDate.getFullYear(),
      this.chosenDate.getMonth(),
      0
    ).getDate();
    let daysNumbers = Array.prototype.concat(
      Array(this.parseToMondaySundayWeek(firstDay))
        .fill(1)
        .map(
          (x, i) =>
            numberOfDaysMonthBefore - this.parseToMondaySundayWeek(firstDay) + i +1
        ),
      Array(numberOfDays)
        .fill(1)
        .map((x, i) => i + 1),
      Array(6 - this.parseToMondaySundayWeek(lastDay))
        .fill(1)
        .map((x, i) => i + 1)
    );

    this.daysNumbers = daysNumbers;
    this.gamesByDays.clear();
    this.games.forEach((game) => {
      let day = game.date.getDate();
      let gameArr = this.gamesByDays.get(day);
      if (gameArr === undefined) {
        this.gamesByDays.set(day, [game]);
      } else {
        gameArr.push(game);
      }
    });
  }

  private parseToMondaySundayWeek(day: Date): number {
    return day.getDay() == 0 ? 6 : day.getDay() - 1;
  }

  getDateInWeek(week: number, day: number) {
    return this.daysNumbers[day + 7 * week];
  }

  getWeeks(): number[] {
    let weeks = [];
    for (let i = 0; i <= this.daysNumbers.length / 7 - 1; i++) {
      weeks.push(i);
    }
    return weeks;
  }

  getGamesIfExist(week: number, day: number) {
    let games = this.gamesByDays.get(day+1 + 7 * week);
    if (
      games === undefined ||
      games.length === 0
    ) {
      return;
    }
    return games
      .map((game) => {
        return {
          id: game.id,
          time: game.date,
          description:
            game.date.toLocaleTimeString('pl-PL', {
              hour: '2-digit',
              minute: '2-digit',
            }) +
            ' - ' +
            game.group,
          status: game.userStatus,
        };
      })
      .sort(dateComparator());

    function dateComparator():
      | ((
          a: { id: number; time: Date; description: string; status: string },
          b: { id: number; time: Date; description: string; status: string }
        ) => number)
      | undefined {
      return (a, b) => {
        if (a.time.getTime() > b.time.getTime()) {
          return 1;
        } else if (a.time.getTime() < b.time.getTime()) {
          return -1;
        } else {
          return 0;
        }
      };
    }
  }

  getGameStyle(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'list-group-item list-group-item-success';
      case 'NOT_APPROVED':
        return 'list-group-item list-group-item-warning';
      case 'DECLINED':
        return 'list-group-item list-group-item-danger';
      default:
        return 'list-group-item list-group-item-dark';
    }
  }

  goToGame(id: number) {
    this.router.navigate(['game', id]);
  }

  changeMonth(monthDirection: number) {
    this.router.navigate([
      '/user/games',
      this.chosenDate.getFullYear(),
      this.chosenDate.getMonth() + monthDirection + 1,
    ]);
  }
}
