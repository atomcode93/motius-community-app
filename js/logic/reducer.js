import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import messageReducer from './message/reducer';
import memberReducer from './member/reducer';
import selectionReducer from './selectedCard/reducer';
import authReducer from './login/reducer';

export const reducer = combineReducers({
    messages: messageReducer,
    members: memberReducer,
    selectedFileID: selectionReducer,
    auth: authReducer
});
