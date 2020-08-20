import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import AcademicYearAndSemesterItem from "./AcademicYearAndSemesterItem";

const AcademicYearAndSemesterTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const {
          academicYearAndSemesters,
          filterAcademicYearAndSemester,
          deleteAcademicYearAndSemester,
        } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Y & S</th>
                  <th>Added Date</th>
                  <th>Added Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {academicYearAndSemesters.map((academicYearAndSemester) => (
                  <AcademicYearAndSemesterItem
                    key={academicYearAndSemester._id}
                    academicYearAndSemester={academicYearAndSemester}
                    deleteAcademicYearAndSemester={
                      deleteAcademicYearAndSemester
                    }
                    filterAcademicYearAndSemester={
                      filterAcademicYearAndSemester
                    }
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

export default AcademicYearAndSemesterTable;
