import { Action } from '@ngrx/store';
import { UserProflie } from 'src/app/common/model/user-profile.model';


export const ADD = 'User => ADD';
export const REMOVE = 'User => REMOVE';

export class AddUser implements Action {
  readonly type = ADD
  constructor(public payload: UserProflie) { }
}
export class RemoveUser implements Action {
  readonly type = REMOVE
  constructor() { }
}
export type Actions = AddUser | RemoveUser
