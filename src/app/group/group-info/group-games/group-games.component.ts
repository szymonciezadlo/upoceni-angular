import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameDTO } from 'src/app/models/gameDTO.model';
import { GroupDTO } from 'src/app/models/groupDTO.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-games',
  templateUrl: './group-games.component.html',
  styleUrls: ['./group-games.component.css']
})
export class GroupGamesComponent {
  @Input() games: Game[] = [];
  @Input() group!: GroupDTO;
  
  constructor(private router: Router, private groupService: GroupService){}
  createGame() {
    this.groupService.setChosenGroup(this.group);
    let date = new Date();
    this.router.navigate(['/game/create', date.getDate(), date.getMonth()+1, date.getFullYear()])

  }
}
