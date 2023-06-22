import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { GameService } from 'src/app/services/game.service';
import { PlayerDTO } from '../models/playerDTO.model';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  users: User []= [  ] 
  chosenUser?: User;
  isTyping: boolean = false;
  @Input() gameId?: number;
  @Output() newUserEmitter = new EventEmitter<User>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.fetchSuggestedUsers('', this.gameId).subscribe(users => this.users = users);
   }
  
  onSubmit(usernameForm: NgForm) {
    if (this.chosenUser) {
      this.newUserEmitter.emit(this.chosenUser);
      this.chosenUser = undefined;
    }
  }

  onInputChange(username: string) {
    this.gameService.fetchSuggestedUsers(username, this.gameId).subscribe(users => this.users = users);
  }

  changeIsTyping(status: boolean) {
    setTimeout(() => this.isTyping = status, 200);
  }

  chooseUser(user: User, usernameForm: NgForm) {
    this.chosenUser = user;
  }
}
