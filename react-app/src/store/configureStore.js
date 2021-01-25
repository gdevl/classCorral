import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import classrooms from "./classrooms";
import currentUser from "./current_user";
import currentClassroomId from "./current_classroom";
import currentClassroomMeta from "./classroom_meta";
import groups from "./groups";
import roster from "./roster";
import groups_defined from "./define_groups";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    classrooms,
    currentClassroomMeta,
    currentUser,
    currentClassroomId,
    groups,
    groups_defined,
    roster,
});

const configureStore = (initialState) => {
    return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
