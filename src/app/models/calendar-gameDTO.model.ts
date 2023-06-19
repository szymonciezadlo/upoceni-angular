export interface CalendarGameDTO {
    id: number;
    date: Date;
    durationMin: number;
    groupDTO: {
      groupId: number;
      groupName: string;
    };
    userStatus: string;
  }
  