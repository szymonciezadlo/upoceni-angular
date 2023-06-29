import { Component, EventEmitter, Output } from '@angular/core';
import { GroupDTO } from '../models/groupDTO.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  groups: GroupDTO[] = [];
  chosenGroup?: GroupDTO;
  isTyping: boolean = false;
  @Output() newGroupEmitter = new EventEmitter<GroupDTO>();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getSuggestedGroups('').subscribe(groups => this.groups = groups);
   }
  
  onSubmit() {
    if (this.chosenGroup) {
      this.newGroupEmitter.emit(this.chosenGroup);
      this.chosenGroup = undefined;
    }
  }

  onInputChange(group: string) {
    this.groupService.getSuggestedGroups(group).subscribe(groups => this.groups = groups);
  }

  changeIsTyping(status: boolean) {
    setTimeout(() => this.isTyping = status, 200);
  }

  chooseGroup(group: GroupDTO) {
    this.chosenGroup = group;
  }
}