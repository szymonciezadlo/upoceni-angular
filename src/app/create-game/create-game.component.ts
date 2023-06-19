import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CreateGameDTO } from '../models/create-gameDTO.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
})
export class CreateGameComponent {
  date: string;
  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService) {
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
      date: formValues.date,
      place: formValues.place,
      maxPlayers: formValues.maxPlayers,
      minPlayers: formValues.minPlayers,
      durationMin: formValues.durationMin,
      cost: formValues.cost,
      groupId: 5,
      players: [17],
    };
    this.gameService.createGame(newGame).subscribe(game => { 
      this.router.navigate(['/game', game.id]);
    });
  }
}
