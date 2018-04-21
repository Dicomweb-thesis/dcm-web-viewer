import {Action} from '@ngrx/store';

export function loginReducer(state: boolean = false, action: Action,) {

  switch (action.type) {
    case 'LOGIN':
      return state = true;
    case 'LOGOUT':
      return state = false;
    default:
      return state;
  }

}

