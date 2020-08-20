import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import StudentItem from "./../tables/StudentItem";

const StudentTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const { students, filterStudent, deleteStudent } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Program</th>
                  <th>Group</th>
                  <th>SGroup</th>
                  <th>Group ID</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <StudentItem
                    key={student._id}
                    student={student}
                    deleteStudent={deleteStudent}
                    filterStudent={filterStudent}
                  />
                ))}
              </tbody>
            </Table>
          </Container>
        );
      }}
    </StudentConsumer>
  );
};

export default StudentTable;
