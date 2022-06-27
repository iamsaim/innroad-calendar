import React from "react";
import { Modal, Form, Input, TimePicker, Button } from "antd";

const EventForm = ({ show, AddEvent, date, OnCancel }) => {

    const onFinish = (values) => {
        AddEvent(values);
    };


    return (
        <Modal
            title="Add Event"
            visible={show}
            onCancel={OnCancel}
            footer={null}

        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    "date": date
                }}
            >
                <Form.Item
                    label="Event"
                    name="eventName"
                    rules={[{ required: true, message: 'Please give your event name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"

                >
                    <Input disabled={true} />
                </Form.Item>



                <Form.Item
                    label="Start time"
                    name="startTime"
                    rules={[{ required: true, message: 'Please give your event start time' }]}
                >
                    <TimePicker />
                </Form.Item>

                <Form.Item
                    label="End time"
                    name="endTime"
                    rules={[{ required: true, message: 'Please give your event end time' }]}
                >
                    <TimePicker />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: false, message: 'Please give description (Optional)' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EventForm;
