/* eslint-disable default-param-last */
import * as types from "../Constants";

export const eventReducer = (state = [], action) => {
    switch (action.type) {

        case types.ADD_EVENT_SUCCESS:
            return [...state, { ...action.event }];

        default:
            return state;
    }
};

export default eventReducer;