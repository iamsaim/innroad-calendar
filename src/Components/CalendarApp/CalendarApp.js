import { Button } from "antd";
import moment from "moment";
import PropTypes from 'prop-types';
import { useState } from "react";
import { connect } from "react-redux";
import { addEvent } from "../../redux/Actions/eventAction";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import EventForm from "./EventForm";
import "./CalendarApp.css";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const CalendarApp = function CalendarApp({ addEventProp, events }) {
    const [showModalForm, setShowModalForm] = useState(false);
    const [eventDate, setEventDate] = useState();
    const [count, SetCount] = useState(0);
    const [month, setMonth] = useState(new Date())

    const OnCancel = () => {
        setShowModalForm(false)
        setEventDate("");
        SetCount(count + 1);
    };

    const AddEvent = (values) => {
        const event = {
            type: 'success',
            content: `${values.eventName}! From: ${moment(values.startTime).format("hh:mm:ss a")}! 
            To: ${moment(values.endTime).format("hh:mm:ss a")}!`,
            date: values.date,
        };
        addEventProp(event);
        OnCancel();
    };
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
                events={events}
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

CalendarApp.propTypes = {
    addEventProp: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(Object).isRequired,
}

function mapStateToProps(state) {

    return {
        events: state.events,
    }
}
const mapDispatchToProps = {
    addEventProp: addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarApp);