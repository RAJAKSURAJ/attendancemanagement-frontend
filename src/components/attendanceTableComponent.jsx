import React, { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAttendance } from "../actions/attendanceActions";
import { Link } from "react-router-dom";
const AttendanceTableComponent = ({
  students,
  attendanceMap,
  setAttendanceMap,
  attendance,
  rollNo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, attendanceMap]);
  const updateAttendance = () => {
    if (attendance) {
      if (!attendance.rollNo.includes(rollNo)) {
        attendance.rollNo.push(rollNo);
      }
    }
    const roomData = attendance ? attendance.rollNo : rollNo;
    const dataData = attendanceMap;
    const detailsData = attendance ? attendance.details : {};
    students.map((student) => {
      detailsData[student._id] = {
        name: student.name,
        contact: student.contact,
        rollNo: student.rollNo,
      };
    });

    dispatch(
      postAttendance({
        rollNo: roomData,
        details: detailsData,
        data: dataData,
      })
    );
  };
  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>NAME</th>
            <th>Attendance</th>

            <th>CONTACT</th>
            <th>CITY</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <>
                <tr key={student._id}>
                  <td>
                    <Link to={`/student/${student._id}`}>{student.name}</Link>
                  </td>
                  <td>
                    <Form>
                      <Form.Group controlId="status">
                        <Form.Control
                          as="select"
                          size="sm"
                          defaultValue={attendanceMap[student._id]}
                          onChange={(e) => {
                            var tempMap = attendanceMap;
                            tempMap[student._id] = e.target.value;
                            setAttendanceMap(tempMap);
                          }}
                        >
                          <option>Present</option>
                          <option>Absent</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>

                  <td>
                    <a href={`tel:${student.contact}`}>{student.contact}</a>
                  </td>
                  <td>{student.city}</td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={updateAttendance}>
        Update Attendance
      </Button>
    </>
  );
};

export default AttendanceTableComponent;
