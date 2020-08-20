import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { StudentConsumer } from "./../../context/StudentContext";
import TagItem from "./../tables/TagItem";

const TagTable = () => {
  return (
    <StudentConsumer>
      {(value) => {
        const { tags, filterTag, deleteTag } = value;
        return (
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Added Date</th>
                  <th>Added Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <TagItem
                    key={tag._id}
                    tag={tag}
                    deleteTag={deleteTag}
                    filterTag={filterTag}
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

export default TagTable;
