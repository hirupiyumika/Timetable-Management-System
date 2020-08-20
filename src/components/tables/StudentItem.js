import React from "react";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import EditButton from "./../common/EditButton";
import DeleteButton from "./../common/DeleteButton";

const StudentItem = ({
  student: {
    _id,
    academicYearAndSemester,
    programme,
    mainGroup,
    mainGroupID,
    subGroup,
    subGroupID,
    createdDate,
  },
  deleteStudent,
  filterStudent,
}) => {
  return (
    <tr>
      <td>{academicYearAndSemester}</td>
      <td>{programme}</td>
      <td>{mainGroup}</td>
      <td>{subGroup}</td>
      <td>{subGroupID}</td>
      <td></td>
      <td>
        <Link to="/updateStudent">
          <Button
            variant="primary"
            size="sm"
            onClick={() => filterStudent(_id)}
          >
            <EditButton />
          </Button>
        </Link>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteStudent(_id)}>
          <DeleteButton />
        </Button>
      </td>
    </tr>
  );
};

export default StudentItem;
