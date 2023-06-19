import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDTO } from 'src/app/models/gameDTO.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css'],
})
export class GameInfoComponent implements OnInit, OnDestroy {
  gameSub?: Subscription;
  game?: GameDTO;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameSub = this.gameService.gameSubject.subscribe((gameDTO) => {
      this.game = gameDTO;
    });
  }

  ngOnDestroy(): void {
    this.gameSub?.unsubscribe();
  }
}
