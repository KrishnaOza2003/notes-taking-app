import { combineReducers } from "redux";
import searchReducer from "./SearchReducer";

const myReducer = combineReducers({
    searchTerm: searchReducer
});

export default myReducer;