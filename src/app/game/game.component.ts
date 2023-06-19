import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PlayerDTO } from '../models/playerDTO.model';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { GameDTO } from '../models/gameDTO.model';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  players: PlayerDTO[] = [];
  gameSub!: Subscription;
  gameId: number;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit() {
    this.gameSub = this.gameService.gameSubject.subscribe((gameDTO) => {
      this.players = gameDTO.players;
    });

    this.gameService
      .fetchGame(this.gameId)
      .subscribe((gameDTO) => {
        this.players = gameDTO.players;
      });
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
  }

  getStylePlayer(status: string) {
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

  deleteUser(player: PlayerDTO) {
    this.gameService.deletePlayer(player, this.gameId);
  }
}
