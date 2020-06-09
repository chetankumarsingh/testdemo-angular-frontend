export class TabMenuModel {
    for: string;
    text: string;
    active: boolean;
    disabled: boolean;
}

export interface User {
    DeptAmtLimit?: number;
    DeptName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    managementType?:string;
  }