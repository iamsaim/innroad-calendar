/* eslint-disable no-debugger */
import 'antd/dist/antd.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import style from './Calendar.module.scss'

const Week = function week({ firstDay, getCurrentDay, setChildCurrentDay,
    lastDay, handleClick, dateCellRender }) {
    debugger;
    return <tr>
        {(function RenderWeek(rows, i) {
            let counter = i;
            // while (counter <= len) {
            if (counter === firstDay.getDay() + 1 && getCurrentDay() === 0) {
                setChildCurrentDay(1);
            }
            if (getCurrentDay() === 0) {
                rows.push(<td> </td>)
            }
            else {
                if (getCurrentDay() <= lastDay.getDate()) {

                    const clickDate = moment(new Date().setDate(getCurrentDay()));
                    rows.push(<td>
                        <div className={getCurrentDay() === new Date().getDate() ?
                            style.currentDay : style.day} onClick={() => {
                                handleClick(clickDate)
                            }} aria-hidden="true">
                            {getCurrentDay()}
                            {dateCellRender(getCurrentDay())}
                        </div>
                    </td>)
                }
                setChildCurrentDay(getCurrentDay() + 1);
            }
            counter += 1;

            // }
            return rows;
        })([], 1)}
    </tr>
};

Week.propTypes = {
    dateCellRender: PropTypes.func.isRequired,
    firstDay: PropTypes.instanceOf(Date).isRequired,
    getCurrentDay: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    lastDay: PropTypes.instanceOf(Date).isRequired,
    setChildCurrentDay: PropTypes.func.isRequired,

}

export default Week;