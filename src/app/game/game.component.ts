import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PlayerDTO } from '../models/playerDTO.model';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { GameDTO } from '../models/gameDTO.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  players: PlayerDTO[] = [];
  gameSub!: Subscription;
  gameId: number;
  canAddPlayers: boolean = false;
  canDeletePlayers: boolean = false;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit() {
    this.gameSub = this.gameService.gameSubject.subscribe((gameDTO) => this.fetchGame(gameDTO));

    this.gameService
      .fetchGame(this.gameId)
      .subscribe((gameDTO) => this.fetchGame(gameDTO));
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
  }

  fetchGame(gameDTO: GameDTO) {
    if (gameDTO.authorId === this.authService.getUserIdFromCookie()){
      this.canAddPlayers = true;
      this.canDeletePlayers = true;
    } else {
      this.canAddPlayers = gameDTO.allCanAdd;
      this.canDeletePlayers = gameDTO.allCanDelete;
    }

    this.players = gameDTO.players;
  }

  getStylePlayer(status: string) {
    let style = {
      'color': '#fefdfa',
      'background-color': '#534a32'
    };
    switch (status) {
      case 'APPROVED':
        style['background-color'] = '#00a870';
        break;
      case 'NOT_APPROVED':
        style['background-color'] = '#f3c13a';
        break;
      case 'DECLINED':
        style['background-color'] = '#972715';
        break;
      default:
        style['background-color'] = '#FFA630';
    }
    return style;
  }

  addUserToGame(user: User) {
    this.gameService.addUserToGame(user, this.gameId);
  }

  deleteUser(player: PlayerDTO) {
    this.gameService.deletePlayer(player, this.gameId);
  }
}
