import React from 'react';
import 'antd/dist/antd.css';
import style from './Calendar.module.scss'
import { Badge } from 'antd';
import moment from 'moment';

const MAX_NO_OF_WEEK = 5;
const MAX_DAYS_IN_WEEK = 7;
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const CalendarPicker = ({ setEventDate, events, setShowModalForm }) => {

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    let CurrentDay = 0;

    const getListData = (value) => {
        let listData;

        listData = events.filter(x => x.date.format("MMM Do YY") == value.format("MMM Do YY"))

        return listData || [];
    };

    const dateCellRender = (value) => {

        const listData = getListData(new moment(new Date().setDate(value)));
        return (

            <ul className={style["events"]}>
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

    const RenderWeek = () => {


        return <tr>
            {(function (rows, i, len) {
                while (i <= len) {
                    if (i === firstDay.getDay() + 1 && CurrentDay === 0) {
                        CurrentDay = 1;
                    }
                    if (CurrentDay == 0) {
                        rows.push(<td>


                        </td>)
                    }
                    else {
                        if (CurrentDay <= lastDay.getDate()) {

                            let clickDate = new moment(new Date().setDate(CurrentDay));
                            rows.push(<td>
                                <div className={CurrentDay === new Date().getDate() ? style["currentDay"] : style["day"]} onClick={() => {
                                    handleClick(clickDate)
                                }}>
                                    {CurrentDay}
                                    {dateCellRender(CurrentDay)}
                                </div>
                            </td>)
                        }

                        CurrentDay++;

                    }

                    i++;

                }
                return rows;
            })([], 1, MAX_DAYS_IN_WEEK)}
        </tr>
    }

    return (
        <>
            <div><h3>{monthNames[firstDay.getMonth()]}</h3></div>
            <table>
                <thead>

                    <th>Sunday</th><th>Monday</th><th>Tuesday</th>
                    <th>Wednesday</th><th>Thursday</th><th>Friday</th>
                    <th>Saturday</th>
                </thead>

                <tbody>
                    {(function (rows, i, len) {
                        while (i <= len) {
                            rows.push(RenderWeek())
                            i++;
                        }
                        return rows;
                    })([], 1, MAX_NO_OF_WEEK)}
                </tbody>
            </table>

        </>
    )
};

export default CalendarPicker;