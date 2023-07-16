import { Injectable } from '@angular/core';
import { GroupDTO } from '../models/groupDTO.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, catchError, map, tap } from 'rxjs';
import { GroupInfoDTO } from '../models/group-infoDTO.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groupsByIdsSubject = new Subject<GroupInfoDTO[]>();
  groupsCredentials = new Subject<GroupDTO[]>();
  groupsByIds: GroupInfoDTO[] = [];
  private chosenGroup: GroupDTO | undefined;

  constructor(private http: HttpClient) {}

  getSuggestedGroups(groupName: string) {
    return this.http.get<GroupDTO[]>('http://localhost:8080/group/suggested', {
      params: new HttpParams().append('groupName', groupName),
      withCredentials: true,
    });
  }

  getUserGroups() {
    return this.http
      .get<GroupDTO[]>('http://localhost:8080/group/user', {
        withCredentials: true,
      })
      .subscribe((response) => {
        this.groupsCredentials.next(response);
        this.getGroupsByIds(response.map((group) => group.id));
      });
  }

  getGroupsByIds(ids: number[]) {
    return this.http
      .post<GroupInfoDTO[]>('http://localhost:8080/group', ids, {
        withCredentials: true,
      })
      .subscribe((response) => {
        this.groupsByIds = response;
        this.groupsByIdsSubject.next(response);
      });
  }

  addMember(groupId: number, userId: number) {
    let params = new HttpParams().append('groupId', groupId);
    params = params.append('userId', userId);

    this.http
      .post<User[]>(
        'http://localhost:8080/group/member',
        {},
        {
          withCredentials: true,
          params: params,
        }
      )
      .subscribe((response) => {
        this.groupsByIds[groupId].members = response;
        this.groupsByIdsSubject.next(this.groupsByIds);
      });
  }

  deleteMember(groupId: number, userId: number) {
    let params = new HttpParams().append('groupId', groupId);
    params = params.append('userId', userId);

    this.http
      .delete<User[]>('http://localhost:8080/group/member', {
        withCredentials: true,
        params: params,
      })
      .subscribe((response) => {
        this.groupsByIds[groupId].members = response;
        this.groupsByIdsSubject.next(this.groupsByIds);
      });
  }

  createGroup(name: string, rules: string) {
    let params = new HttpParams().append('groupName', name);

    this.http
      .post<GroupDTO>(
        'http://localhost:8080/group/create',
        rules,
        {
          withCredentials: true,
          params: params,
        }
      )
      .subscribe((response) => {
        this.getUserGroups();
      });
  }

  deleteGroup(id: number) {
    let params = new HttpParams().append('groupId', id);
    this.http
      .delete<GroupDTO>('http://localhost:8080/group', {
        withCredentials: true,
        params: params,
      })
      .subscribe((response) => {
        this.getUserGroups();
      });
  }

  getChosenGroup(): GroupDTO | undefined {
    let group = this.chosenGroup;
    this.chosenGroup = undefined;
    return group;
  }

  setChosenGroup(group: GroupDTO) {
    this.chosenGroup = group;
  }
}
