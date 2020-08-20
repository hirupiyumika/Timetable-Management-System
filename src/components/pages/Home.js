import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>
          <Link to="/addAcademicYearAndSemester">
            Add Academic Year And Semester
          </Link>
        </p>
        <p>
          <Link to="/viewAcademicYearAndSemester">
            View Academic Year And Semester
          </Link>
        </p>
        <p>
          <Link to="/addProgramme">Add Programme</Link>
        </p>
        <p>
          <Link to="/viewProgramme">View Programme</Link>
        </p>
        <p>
          <Link to="/addGroup">Add Group</Link>
        </p>
        <p>
          <Link to="/viewGroup">View Group</Link>
        </p>
        <p>
          <Link to="/addSubGroup">Add Sub Group</Link>
        </p>
        <p>
          <Link to="/viewSubGroup">View Sub Group</Link>
        </p>
        <p>
          <Link to="/addTag">Add Tag</Link>
        </p>
        <p>
          <Link to="/viewTag">View Tag</Link>
        </p>
        <p>
          <Link to="/addStudent">Add Student</Link>
        </p>
        <p>
          <Link to="/viewStudent">View Student</Link>
        </p>
      </div>
    );
  }
}

export default Home;
