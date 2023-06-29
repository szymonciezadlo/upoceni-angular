import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { PlayerService } from './services/player.service';
import { GameInfoComponent } from './game/game-info/game-info.component';
import { UserPlayerComponent } from './game/user-player/user-player.component';
import { GamesListComponent } from './userGames/games-list/games-list.component';
import { CalendarComponent } from './userGames/calendar/calendar.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { GameService } from './services/game.service';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayersListComponent } from './game/players-list/players-list.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameInfoComponent,
    UserPlayerComponent,
    GamesListComponent,
    CalendarComponent,
    CreateGameComponent,
    LoginComponent,
    NavigationHeaderComponent,
    AddPlayerComponent,
    PlayersListComponent,
    AddGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlayerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
