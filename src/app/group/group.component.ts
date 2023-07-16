import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { GroupDTO } from '../models/groupDTO.model';
import { GroupInfoDTO } from '../models/group-infoDTO.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  groupsCredentials: GroupDTO[] = [];
  groupsSubs: Subscription;

  constructor(groupService: GroupService) {
    this.groupsSubs = groupService.groupsCredentials.subscribe(groups => this.groupsCredentials = groups);

    groupService.getUserGroups();
  }
}
