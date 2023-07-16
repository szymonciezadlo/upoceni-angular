import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
})
export class GroupCreateComponent {

  constructor(private groupService: GroupService){}
  
  onSubmit(groupForm: NgForm) {
    if (groupForm.form.invalid) {
      return;
    }
    let values = groupForm.form.value;
    this.groupService.createGroup(values.name, values.rules);
  }
}
