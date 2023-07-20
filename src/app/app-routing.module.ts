import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GamesListComponent } from './userGames/games-list/games-list.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { GroupInfoComponent } from './group/group-info/group-info.component';
import { GroupInfoDTO } from './models/group-infoDTO.model';
import { GroupCreateComponent } from './group/group-create/group-create.component';

const routes: Routes = [
  { path: 'game/create/:day/:month/:year', component: CreateGameComponent },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'user/games/:year/:month', component: GamesListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'group',
    component: GroupComponent,
    children: [
      { path: 'create', component: GroupCreateComponent },
      { path: ':id', component: GroupInfoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
