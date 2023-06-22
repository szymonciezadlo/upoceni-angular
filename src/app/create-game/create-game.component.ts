import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CreateGameDTO } from '../models/create-gameDTO.model';
import { PlayerDTO } from '../models/playerDTO.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
})
export class CreateGameComponent {
  date: string;
  players: Set<User> = new Set();

  constructor(route: ActivatedRoute, private router: Router, private gameService: GameService) {
    let params = route.snapshot.params;
    // this.date = params['year'] + '-' + params['month'] + '-' + params['day'];
    this.date = new Date(params['year'], +params['month']-1, +params['day']+1)
      .toISOString()
      .slice(0, 10);
    // console.log(new Date(params['year'], params['month']-1, params['day']));
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.form.valid) {
      return;
    }
    let formValues = form.form.value;
    let newGame: CreateGameDTO = {
      date: new Date(formValues.date),
      place: formValues.place,
      maxPlayers: formValues.maxPlayers,
      minPlayers: formValues.minPlayers,
      durationMin: formValues.durationMin,
      cost: formValues.cost,
      groupId: 5,
      players: Array.from(this.players).map(user => user.id),
    };

    this.gameService.createGame(newGame).subscribe(game => { 
      this.router.navigate(['/game', game.id]);
    });
  }

  addUserToPlayers(user: User) {
    if (!this.players.has(user)) {
      this.players.add(user);
    }
  }
}
