import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GamesListComponent } from './userGames/games-list/games-list.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'game/create/:day/:month/:year', component: CreateGameComponent },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'user/:id/games', component: GamesListComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
