export interface Center {
  id: string;
  aboutId?: string;
  pageId?: string;
  centerName: string;
  centerNameEn?: string;
  subTitle?: string;
  place?: string;
  about?: string;
  mission?: string;
  vision?: string;
  goals?: Goal[];
}

export interface Goal {
  goalName?: string;
  id?: string;
  aboutId?: string;
}
