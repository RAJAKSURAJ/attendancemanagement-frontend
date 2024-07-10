import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getStudentsByrollNo as action } from "../actions/studentActions";
import AttendanceTable from "../components/attendanceTable";

const AttendanceView = () => {
  const [rollNo, setrollNo] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(rollNo));
  };

  const changerollNo = (e) => {
    setrollNo(e.target.value);
  };
  return (
    <>
      <h2>Take Attendance</h2>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          value={rollNo}
          name="rollNo"
          placeholder="Enter Roll No"
          className="mr-sm-2 ml-sm-5"
          onChange={(e) => changerollNo(e)}
        ></Form.Control>
        <Button type="submit" onClick={submitHandler}>
          Get Students
        </Button>
      </Form>
      <AttendanceTable rollNo={rollNo} />
    </>
  );
};

export default AttendanceView;
