import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  users: User []= [  ] 
  chosenUser?: User;
  isTyping: boolean = false;
  gameId: number;

  constructor(private gameService: GameService, private route: ActivatedRoute) { 
    this.gameId = this.route.snapshot.params['gameId']
  }

  ngOnInit() {
    this.gameService.fetchSuggestedUsers('', this.gameId).subscribe(users => this.users = users);
   }
  
  onSubmit(usernameForm: NgForm) {
    console.log()
    if (this.chosenUser) {
      this.gameService.addUserToGame(this.chosenUser, this.gameId);
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
