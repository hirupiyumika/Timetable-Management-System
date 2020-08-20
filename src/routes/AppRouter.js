import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AddStudent from "./../components/pages/AddStudent";
import UpdateStudent from "./../components/pages/UpdateStudent";
import ViewStudent from "./../components/pages/ViewStudent";
import AddAcademicYearAndSemester from "./../components/pages/AddAcademicYearAndSemester";
import UpdateAcademicYearAndSemester from "./../components/pages/UpdateAcademicYearAndSemester";
import ViewAcademicYearAndSemester from "./../components/pages/ViewAcademicYearAndSemester";
import Home from "../components/pages/Home";
import AddProgramme from "./../components/pages/AddProgramme";
import UpdateProgramme from "./../components/pages/UpdateProgramme";
import ViewProgramme from "./../components/pages/ViewProgramme";
import AddGroup from "./../components/pages/AddGroup";
import UpdateGroup from "../components/pages/UpdateGroup";
import ViewGroup from "../components/pages/ViewGroup";
import AddSubGroup from "./../components/pages/AddSubGroup";
import UpdateSubGroup from "./../components/pages/UpdateSubGroup";
import ViewSubGroup from "./../components/pages/ViewSubGroup";
import AddTag from "./../components/pages/AddTag";
import UpdateTag from "../components/pages/UpdateTag";
import ViewTag from "./../components/pages/ViewTag";

class AppRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addStudent" component={AddStudent} />
          <Route path="/updateStudent" component={UpdateStudent} />
          <Route path="/viewStudent" component={ViewStudent} />
          <Route
            path="/addAcademicYearAndSemester"
            component={AddAcademicYearAndSemester}
          />
          <Route
            path="/updateAcademicYearAndSemester"
            component={UpdateAcademicYearAndSemester}
          />
          <Route
            path="/viewAcademicYearAndSemester"
            component={ViewAcademicYearAndSemester}
          />
          <Route path="/addProgramme" component={AddProgramme} />
          <Route path="/updateProgramme" component={UpdateProgramme} />
          <Route path="/viewProgramme" component={ViewProgramme} />
          <Route path="/addGroup" component={AddGroup} />
          <Route path="/updateGroup" component={UpdateGroup} />
          <Route path="/viewGroup" component={ViewGroup} />
          <Route path="/addSubGroup" component={AddSubGroup} />
          <Route path="/updateSubGroup" component={UpdateSubGroup} />
          <Route path="/viewSubGroup" component={ViewSubGroup} />
          <Route path="/addTag" component={AddTag} />
          <Route path="/updateTag" component={UpdateTag} />
          <Route path="/viewTag" component={ViewTag} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AppRouter;
