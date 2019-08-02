import * as UserAction from "../action/user.action";
import { UserProflie } from "src/app/common/model/user-profile.model";


const INIT_DATA: UserProflie = {

  username: '',
  role: [],
  token: '',
};

export function UserReducer(state: UserProflie = INIT_DATA, action: UserAction.Actions) {
  switch (action.type) {
    case UserAction.ADD:
      return Object.assign({}, action.payload);
    case UserAction.REMOVE:
      return INIT_DATA;
    default:
      return state;
  }

}
