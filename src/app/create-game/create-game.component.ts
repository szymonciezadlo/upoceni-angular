import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CreateGameDTO } from '../models/create-gameDTO.model';
import { PlayerDTO } from '../models/playerDTO.model';
import { User } from '../models/user.model';
import { GroupDTO } from '../models/groupDTO.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
})
export class CreateGameComponent {
  date: string;
  players: Map<number,User> = new Map();
  group?: GroupDTO;

  constructor(route: ActivatedRoute, private router: Router, private gameService: GameService) {
    let params = route.snapshot.params;
    // this.date = params['year'] + '-' + params['month'] + '-' + params['day'];
    this.date = new Date(params['year'], +params['month']-1, +params['day']+1)
      .toISOString()
      .slice(0, 10);
    // console.log(new Date(params['year'], params['month']-1, params['day']));
  }

  onSubmit(form: NgForm) {
    if (!form.form.valid) {
      return;
    }
    let formValues = form.form.value;
    let newGame: CreateGameDTO = {
      date: new Date(formValues.date + " " + formValues.time),
      place: formValues.place,
      maxPlayers: formValues.maxPlayers,
      minPlayers: formValues.minPlayers,
      durationMin: formValues.durationMin,
      cost: formValues.cost,
      groupId: this.group?.id,
      players: Array.from(this.players).map((user) => user[0]),
    };

    this.gameService.createGame(newGame).subscribe(game => { 
      this.router.navigate(['/game', game.id]);
    });
  }

  addUserToPlayers(user: User) {
    if (!this.players.has(user.id)) {
      this.players.set(user.id, user);
    }
  }

  addGroupToGame(group: GroupDTO) {
    console.log(group);
    this.group = group;
    group.members.forEach(member => {
      this.addUserToPlayers(member);
    });
  }

  deleteGroup() {
    this.group = undefined;
  }

  deletePlayer(playerId: number) {
    this.players.delete(playerId)
  }
}
