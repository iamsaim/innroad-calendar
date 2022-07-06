import * as types from "../Constants";

export function addEvent(event) {
    return { type: types.ADD_EVENT_SUCCESS, event };
}
export function getEventsSuccess(events) {
    return { type: types.GET_EVENTS_SUCCESS, events };
}
export function getEvents() {
    return function (dispatch) {
        dispatch(getEventsSuccess);
    };
}