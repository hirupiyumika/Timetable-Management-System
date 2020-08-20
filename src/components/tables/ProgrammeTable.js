import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import ProgrammeItem from "./../tables/ProgrammeItem";

const ProgrammeTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const { programmes, filterProgramme, deleteProgramme } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Added Date</th>
                  <th>Added Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((programme) => (
                  <ProgrammeItem
                    key={programme._id}
                    programme={programme}
                    deleteProgramme={deleteProgramme}
                    filterProgramme={filterProgramme}
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

export default ProgrammeTable;
