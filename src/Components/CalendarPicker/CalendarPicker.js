import React from 'react';
import 'antd/dist/antd.css';
import './Calendar.css'
import { Badge, Calendar, Select, Typography, Row, Col } from 'antd';

const CalendarPicker = ({ setEventDate, events, setShowModalForm }) => {



    const getListData = (value) => {
        let listData;

        listData = events.filter(x => x.date.format("MMM Do YY") == value.format("MMM Do YY"))

        return listData || [];
    };

    const dateCellRender = (value) => {

        const listData = getListData(value);
        return (

            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content} >
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>

        );
    };

    const onSelect = (value) => {

        setEventDate(value);
        setShowModalForm(true);
    };

    return <Calendar
        dateCellRender={dateCellRender}
        onSelect={onSelect}
        headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
            }
            for (let index = start; index < end; index++) {
                monthOptions.push(
                    <Select.Option className="month-item" key={`${index}`}>
                        {months[index]}
                    </Select.Option>,
                );
            }
            const month = value.month();

            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                    <Select.Option key={i} value={i} className="year-item">
                        {i}
                    </Select.Option>,
                );
            }
            return (
                <div style={{ padding: 8 }}>
                    <Typography.Title level={4}>Events Calendar</Typography.Title>
                    <Row gutter={8}>

                        <Col>
                            <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                className="my-year-select"
                                onChange={newYear => {
                                    const now = value.clone().year(Number(newYear));
                                    onChange(now);
                                }}
                                value={String(year)}
                            >
                                {options}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                value={String(month)}
                                onChange={selectedMonth => {
                                    const newValue = value.clone();
                                    newValue.month(parseInt(selectedMonth, 10));
                                    onChange(newValue);
                                }}
                            >
                                {monthOptions}
                            </Select>
                        </Col>
                    </Row>
                </div>
            );
        }}
    />;
};

export default CalendarPicker;