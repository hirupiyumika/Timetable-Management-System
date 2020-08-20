import React, { Component } from "react";
import { ipcRenderer } from "electron";
import Swal from "sweetalert2";

const StudentContext = React.createContext();
class StudentProvider extends Component {
  state = {
    academicYearAndSemesters: [],
    programmes: [],
    groups: [],
    subGroups: [],
    tags: [],
    students: [],
    filteredacademicYearAndSemester: {},
    filteredProgramme: {},
    filteredGroup: {},
    filteredSubGroup: {},
    filteredTag: {},
    filteredStudent: {},
    show: false,
    message: "",
    variant: "success",
  };

  // update academic year and semester
  updateAcademicYearAndSemester = (academicYearAndSemester) => {
    if (
      academicYearAndSemester.year === "" ||
      academicYearAndSemester.semester === ""
    ) {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send(
      "academicYearAndSemesters:update",
      academicYearAndSemester
    );
    this.showAlert("year & semster updated");
  };

  // update programme
  updateProgramme = (programmeItem) => {
    if (programmeItem.programme === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("programmes:update", programmeItem);
    this.showAlert("programme updated");
  };

  // update group
  updateGroup = (groupItem) => {
    if (groupItem.group === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("groups:update", groupItem);
    this.showAlert("group updated");
  };

  // update sub group
  updateSubGroup = (subGroupItem) => {
    if (subGroupItem.subGroup === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("subGroups:update", subGroupItem);
    this.showAlert("sub group updated");
  };

  // update tag
  updateTag = (TagItem) => {
    if (TagItem.tag === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("tags:update", TagItem);
    this.showAlert("tag updated");
  };

  // update student
  updateStudent = (studentItem) => {
    if (
      studentItem.academicYearAndSemester === "" ||
      studentItem.programme === "" ||
      studentItem.mainGroup === "" ||
      studentItem.subGroup === ""
    ) {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("students:update", studentItem);
    this.showAlert("student updated");
  };

  // filter academic year and semester
  filterAcademicYearAndSemester = (_id) => {
    const { academicYearAndSemesters } = this.state;

    let tempAcademicYearAndSemesters = [...academicYearAndSemesters];

    const selectedAcademicYearAndSemester = tempAcademicYearAndSemesters.filter(
      (item) => item._id === _id
    );

    this.setState({
      filteredacademicYearAndSemester: selectedAcademicYearAndSemester,
    });
  };

  // filter programme
  filterProgramme = (_id) => {
    const { programmes } = this.state;

    let tempProgrammes = [...programmes];

    const selectedProgram = tempProgrammes.filter((item) => item._id === _id);

    this.setState({
      filteredProgramme: selectedProgram,
    });
  };

  // filter group
  filterGroup = (_id) => {
    const { groups } = this.state;

    let tempGroups = [...groups];

    const selectedGroup = tempGroups.filter((item) => item._id === _id);

    this.setState({
      filteredGroup: selectedGroup,
    });
  };

  // filter sub group
  filterSubGroup = (_id) => {
    const { subGroups } = this.state;

    let tempSubGroups = [...subGroups];

    const selectedSubGroup = tempSubGroups.filter((item) => item._id === _id);

    this.setState({
      filteredSubGroup: selectedSubGroup,
    });
  };

  // filter tag
  filterTag = (_id) => {
    const { tags } = this.state;

    let tempTags = [...tags];

    const selectedTag = tempTags.filter((item) => item._id === _id);

    this.setState({
      filteredTag: selectedTag,
    });
  };

  // filter student
  filterStudent = (_id) => {
    const { students } = this.state;

    let tempStudents = [...students];

    const selectedStudent = tempStudents.filter((item) => item._id === _id);

    this.setState({
      filteredStudent: selectedStudent,
    });
  };

  // delete academic year and semester
  deleteAcademicYearAndSemester = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("academicYearAndSemesters:delete", _id);
          this.showAlert("year & semester removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "year & semester has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };

  // delete program
  deleteProgramme = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("programmes:delete", _id);
          this.showAlert("programme removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "programme has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };

  // delete group
  deleteGroup = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("groups:delete", _id);
          this.showAlert("group removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "group has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };

  // delete sub group
  deleteSubGroup = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("subGroups:delete", _id);
          this.showAlert("sub group removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "sub group has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };

  // delete tag
  deleteTag = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("tags:delete", _id);
          this.showAlert("tag removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "tag has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };

  // delete student
  deleteStudent = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          ipcRenderer.send("students:delete", _id);
          this.showAlert("student removed");
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "student has been deleted",
            showConfirmButton: true,
            timer: 1500,
          }).then(function () {});
        }
      });
    } catch (error) {}
  };
  // add academic year and semester
  addAcademicYearAndSemester = (academicYearAndSemester) => {
    if (
      academicYearAndSemester.year === "" ||
      academicYearAndSemester.semester === ""
    ) {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("academicYearAndSemesters:add", academicYearAndSemester);
    this.showAlert("year & semster added");
  };

  // add programme
  addProgramme = (programme) => {
    if (programme.programme === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("programmes:add", programme);
    this.showAlert("program added");
  };

  // add group
  addGroup = (group) => {
    if (group.group === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("groups:add", group);
    this.showAlert("group added");
  };

  // add sub group
  addSubGroup = (subGroup) => {
    if (subGroup.subGroup === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("subGroups:add", subGroup);
    this.showAlert("sub group added");
  };

  // add tag
  addTag = (tag) => {
    if (tag.tag === "") {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("tags:add", tag);
    this.showAlert("tag added");
  };

  // add student
  addStudent = (student) => {
    if (
      student.academicYearAndSemester === "" ||
      student.programme === "" ||
      student.mainGroup === "" ||
      student.subGroup === ""
    ) {
      this.showAlert("please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("students:add", student);
    this.showAlert("student added");
  };

  // show alert
  showAlert = (message, variant = "success", seconds = 3000) => {
    this.setState({ show: true, message, variant });

    setTimeout(() => {
      this.setState({ show: false, message: "", variant: "success" });
    }, seconds);
  };

  // populate academic year and semsters
  populateAcademicYearAndSemesters() {
    try {
      ipcRenderer.send("academicYearAndSemesters:load");
      ipcRenderer.on(
        "academicYearAndSemesters:get",
        (e, academicYearAndSemesters) => {
          this.setState({
            academicYearAndSemesters: JSON.parse(academicYearAndSemesters),
          });
        }
      );
    } catch (ex) {}
  }

  // populate programmes
  populateProgrammes() {
    try {
      ipcRenderer.send("programmes:load");
      ipcRenderer.on("programmes:get", (e, programmes) => {
        this.setState({
          programmes: JSON.parse(programmes),
        });
      });
    } catch (ex) {}
  }

  // populate groups
  populateGroups() {
    try {
      ipcRenderer.send("groups:load");
      ipcRenderer.on("groups:get", (e, groups) => {
        this.setState({
          groups: JSON.parse(groups),
        });
      });
    } catch (ex) {}
  }

  // populate sub groups
  populateSubGroups() {
    try {
      ipcRenderer.send("subGroups:load");
      ipcRenderer.on("subGroups:get", (e, subGroups) => {
        this.setState({
          subGroups: JSON.parse(subGroups),
        });
      });
    } catch (ex) {}
  }

  // populate  tags
  populateTags() {
    try {
      ipcRenderer.send("tags:load");
      ipcRenderer.on("tags:get", (e, tags) => {
        this.setState({
          tags: JSON.parse(tags),
        });
      });
    } catch (ex) {}
  }

  // populate students
  populateStudents() {
    try {
      ipcRenderer.send("students:load");
      ipcRenderer.on("students:get", (e, students) => {
        this.setState({
          students: JSON.parse(students),
        });
      });
    } catch (ex) {}
  }

  componentDidMount = () => {
    this.populateAcademicYearAndSemesters();
    this.populateProgrammes();
    this.populateGroups();
    this.populateSubGroups();
    this.populateTags();
    this.populateStudents();
    ipcRenderer.on("students:clear", () => {
      this.setState({ students: [] });
      this.showAlert("students cleared");
    });

    ipcRenderer.on("academicYearAndSemesters:clear", () => {
      this.setState({ academicYearAndSemesters: [] });
      this.showAlert("academic year & semesters cleared");
    });

    ipcRenderer.on("programmes:clear", () => {
      this.setState({ programmes: [] });
      this.showAlert("programmes cleared");
    });

    ipcRenderer.on("groups:clear", () => {
      this.setState({ groups: [] });
      this.showAlert("groups cleared");
    });

    ipcRenderer.on("subGroups:clear", () => {
      this.setState({ subGroups: [] });
      this.showAlert("sub groups cleared");
    });

    ipcRenderer.on("tags:clear", () => {
      this.setState({ tags: [] });
      this.showAlert("tags cleared");
    });
  };

  render() {
    return (
      <StudentContext.Provider
        value={{
          ...this.state,
          addAcademicYearAndSemester: this.addAcademicYearAndSemester,
          deleteAcademicYearAndSemester: this.deleteAcademicYearAndSemester,
          filterAcademicYearAndSemester: this.filterAcademicYearAndSemester,
          updateAcademicYearAndSemester: this.updateAcademicYearAndSemester,
          addProgramme: this.addProgramme,
          deleteProgramme: this.deleteProgramme,
          filterProgramme: this.filterProgramme,
          updateProgramme: this.updateProgramme,
          addGroup: this.addGroup,
          deleteGroup: this.deleteGroup,
          filterGroup: this.filterGroup,
          updateGroup: this.updateGroup,
          addSubGroup: this.addSubGroup,
          deleteSubGroup: this.deleteSubGroup,
          filterSubGroup: this.filterSubGroup,
          updateSubGroup: this.updateSubGroup,
          addTag: this.addTag,
          deleteTag: this.deleteTag,
          filterTag: this.filterTag,
          updateTag: this.updateTag,
          addStudent: this.addStudent,
          deleteStudent: this.deleteStudent,
          filterStudent: this.filterStudent,
          updateStudent: this.updateStudent,
        }}
      >
        {this.props.children}
      </StudentContext.Provider>
    );
  }
}

const StudentConsumer = StudentContext.Consumer;
export { StudentProvider, StudentConsumer, StudentContext };
