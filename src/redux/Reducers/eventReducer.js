import * as types from "../Constants";

export const eventReducer = (state = [], action) => {
    debugger;
    switch (action.type) {

        case types.ADD_EVENT_SUCCESS:
            return [...state, { ...action.event }];

        default:
            return state;
    }
};

export default eventReducer;