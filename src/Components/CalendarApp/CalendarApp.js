import CalendarPicker from "../CalendarPicker/CalendarPicker";
import EventForm from "./EventForm";
import React, { useState, useEffect } from "react"
import moment from "moment";


const CalendarApp = () => {
    const [events, setEvents] = useState([]);
    const [showModalForm, setShowModalForm] = useState(false);
    const [eventDate, setEventDate] = useState();
    const [count, SetCount] = useState(0);

    const OnCancel = () => {
        setShowModalForm(false)
        setEventDate("");
    };

    const AddEvent = (values) => {
        debugger;
        var event = {
            type: 'success',
            content: values.eventName + ' From: ' + moment(values.startTime).format("hh:mm:ss a") + ' To: ' + moment(values.endTime).format("hh:mm:ss a"),
            date: values.date
        }
        setEvents(current => [...current, event]);
        console.log('Success:', values);
        OnCancel();

    };
    useEffect(() => {
        SetCount(count + 1);
    }, [eventDate]);
    return (
        <>
            <CalendarPicker
                setEventDate={setEventDate}
                events={events}
                setShowModalForm={setShowModalForm}
            />
            <EventForm key={count}
                show={showModalForm}
                AddEvent={AddEvent}
                date={eventDate}
                OnCancel={OnCancel}
            />
        </>
    );
};


export default CalendarApp;