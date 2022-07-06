import CalendarPicker from "../CalendarPicker/CalendarPicker";
import EventForm from "./EventForm";
import React, { useState, useEffect } from "react"
import moment from "moment";
import { addEvent } from "../../redux/Actions/eventAction";
import { connect } from "react-redux";
import { Button } from "antd";
import "./CalendarApp.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const CalendarApp = (props) => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [eventDate, setEventDate] = useState();
    const [count, SetCount] = useState(0);
    const [month, setMonth] = useState(new Date())

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
        props.addEvent(event);
        OnCancel();

    };
    useEffect(() => {
        SetCount(count + 1);
    }, [eventDate]);
    return (
        <>
            <div className="navDiv">
                <Button style={{ marginRight: '20px' }} onClick={() => {
                    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, month.getDate()))
                }
                }>{"<<"}</Button>
                <h3>{monthNames[month.getMonth()]} {month.getFullYear()}</h3>
                <Button style={{ marginLeft: '20px' }} onClick={() => {
                    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, month.getDate()))
                }
                }>{">>"}</Button></div>
            <CalendarPicker
                setEventDate={setEventDate}
                events={props.events}
                setShowModalForm={setShowModalForm}
                calendarMonth={month}
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


function mapStateToProps(state, ownProps) {

    return {
        events: state.events
    }
}
const mapDispatchToProps = {
    addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarApp);