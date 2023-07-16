import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupInfoDTO } from 'src/app/models/group-infoDTO.model';
import { GroupDTO } from 'src/app/models/groupDTO.model';
import { PlayerDTO } from 'src/app/models/playerDTO.model';
import { User } from 'src/app/models/user.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css'],
})
export class GroupInfoComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  groupsSub: Subscription;
  groupsById: GroupInfoDTO[];
  groupInfo!: GroupInfoDTO;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.groupsById = groupService.groupsByIds;
    this.groupsSub = groupService.groupsByIdsSubject.subscribe((res) => {
      this.groupsById = res;
    });
    this.routeSub = this.route.params.subscribe((params) => {
      this.groupInfo = this.groupsById[params['id']];
    });
  }

  userCardStyle() {
    return {
      color: '#fefdfa',
      'background-color': '#1eb7e6',
    };
  }

  deleteUser(user: PlayerDTO) { 
    if (this.groupInfo) {
      this.groupService.deleteMember(this.groupInfo.id, user.playerId);
    }
   }
  
  addUserToGroup(user: User) {
    if (this.groupInfo) {
      this.groupService.addMember(this.groupInfo.id, user.id);
    }
  }

  mapToPlayers(): PlayerDTO[] {
    if (this.groupInfo) {
      return this.groupInfo.members.map((user) => ({
        playerId: user.id,
        playerName: user.username + '',
        status: '',
      }));
    }
    return [];
  }

  deleteGroup(id: number) {
    this.groupService.deleteGroup(id);
  }

  getGroupDTO() :GroupDTO {
    return { id: this.groupInfo.id, name: this.groupInfo.groupName, members: this.groupInfo.members }
  }

  ngOnInit(): void {
    this.groupsById = this.groupService.groupsByIds;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.groupsSub.unsubscribe();
  }
}
