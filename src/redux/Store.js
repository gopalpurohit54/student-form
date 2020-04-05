import { createStore } from "redux";
import studentReducer from "./StudentReducer";

const store = createStore(studentReducer);

export default store;
