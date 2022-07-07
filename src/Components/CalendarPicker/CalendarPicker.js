/* eslint-disable no-debugger */
import 'antd/dist/antd.css';
import { Badge } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Week from './Week';
import style from './Calendar.module.scss'

// const MAX_NO_OF_WEEK = 6;
const MAX_DAYS_IN_WEEK = 7;

const CalendarPicker = function CalendarPicker({ setEventDate, events, setShowModalForm, calendarMonth }) {
    const [currentDay, setCurrentDay] = useState(0);
    const date = calendarMonth;
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    const getListData = (value) => {
        const listData = events.filter(x => x.date.format("MMM Do YY") === value.format("MMM Do YY"))

        return listData || [];
    };

    const dateCellRender = (value) => {

        const listData = getListData(moment(new Date().setDate(value)));
        return (

            <ul className={style.events}>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>

        );
    };

    const handleClick = (clickDate) => {
        setEventDate(clickDate);
        setShowModalForm(true);
    };

    const getCurrentDay = () => currentDay;
    const setChildCurrentDay = (x) => setCurrentDay(x);
    return (

        <table>
            <thead>
                <tr>
                    <td>Sunday</td>
                    <td>Monday</td>
                    <td>Tuesday</td>
                    <td>Wednesday</td>
                    <td>Thursday</td>
                    <td>Friday</td>
                    <td>Saturday</td>
                </tr>
            </thead>

            <tbody>
                {(function (rows, i) {
                    const counter = i;
                    debugger;
                    // while (counter <= len) {
                    rows.push(<Week key={counter}
                        firstDay={firstDay}
                        getCurrentDay={getCurrentDay}
                        setChildCurrentDay={setChildCurrentDay}
                        lastDay={lastDay}
                        handleClick={handleClick}
                        dateCellRender={dateCellRender}
                        MaxDaysInWeek={MAX_DAYS_IN_WEEK}
                    />)
                    //     counter += 1;
                    // }
                    return rows;
                })([], 1)}
            </tbody>
        </table>
    )
};
CalendarPicker.propTypes = {
    calendarMonth: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.arrayOf(Object).isRequired,
    setEventDate: PropTypes.func.isRequired,
    setShowModalForm: PropTypes.func.isRequired,
}
export default CalendarPicker;