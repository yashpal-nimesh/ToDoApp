import { combineReducers } from 'redux';    
import LoginReducer from "./LoginReducer";
import ToDoReducer from "./ToDoReducer";


export default combineReducers({
LoginReducer,
ToDoReducer
});