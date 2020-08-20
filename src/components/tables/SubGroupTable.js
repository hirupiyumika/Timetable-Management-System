import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import SubGroupItem from "./../tables/SubGroupItem";

const SubGroupTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const { subGroups, filterSubGroup, deleteSubGroup } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Sub Group</th>
                  <th>Added Date</th>
                  <th>Added Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subGroups.map((subGroup) => (
                  <SubGroupItem
                    key={subGroup._id}
                    subGroup={subGroup}
                    deleteSubGroup={deleteSubGroup}
                    filterSubGroup={filterSubGroup}
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

export default SubGroupTable;
