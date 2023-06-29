import { Injectable } from '@angular/core';
import { GroupDTO } from '../models/groupDTO.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

    getSuggestedGroups(groupName: string) {
        console.log(groupName);
    return this.http.get<GroupDTO[]>(
      'http://localhost:8080/group/suggested',
        {
          params: new HttpParams().append('groupName', groupName),
          withCredentials: true,
        }
    );
  }
}
