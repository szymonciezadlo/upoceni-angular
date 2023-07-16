import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerDTO } from 'src/app/models/playerDTO.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent {
  @Input() players: PlayerDTO[] = [];

  @Input() getStylePlayer!: (status: string) => {};
  // @Input() deleteUser!: (player: PlayerDTO) => void ;
  @Output() deleteUserEmitter = new EventEmitter<PlayerDTO>();
  constructor() { }

  deleteUser(user: PlayerDTO) {
    this.deleteUserEmitter.emit(user);
  }

}
