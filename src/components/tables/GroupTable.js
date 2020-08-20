import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import GroupItem from "./../tables/GroupItem";

const GroupTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const { groups, filterGroup, deleteGroup } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Added Date</th>
                  <th>Added Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <GroupItem
                    key={group._id}
                    group={group}
                    deleteGroup={deleteGroup}
                    filterGroup={filterGroup}
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

export default GroupTable;
