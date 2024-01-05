import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDTO } from 'src/app/models/gameDTO.model';
import { PlayerDTO } from 'src/app/models/playerDTO.model';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-user-player',
  templateUrl: './user-player.component.html',
  styleUrls: ['./user-player.component.css'],
})
export class UserPlayerComponent implements OnInit {
  userPlayer?: PlayerDTO;
  @Input() getStylePlayer!: Function;
  gameSub!: Subscription;
  player!: Subscription;
  game?: GameDTO;

  constructor(
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.player = this.gameService.userPlayer.subscribe(
      (player) => (this.userPlayer = player)
    );
    this.gameSub = this.gameService.gameSubject.subscribe((gameDTO) => {
      this.userPlayer = gameDTO.userPlayer;
      this.game = gameDTO;
    });
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();
    this.player.unsubscribe();
  }

  onDecisionClick(approve: boolean) {
    if (this.userPlayer && !!this.game) {
      this.gameService.updateUserPlayerStatus(
        approve ? 'APPROVED' : 'DECLINED',
        this.game.id
      );
    }
  }

  checkIfIsSlotForPlayer(){
    if (this.game){
      return this.game.approvedPlayers < this.game.maxPlayers;
    }
    return false;
  }
}
