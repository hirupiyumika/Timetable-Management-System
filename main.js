const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const AcademicYearAndSemester = require("./models/AcademicYearAndSemster");
const Programme = require("./models/Programme");
const Group = require("./models/Group");
const SubGroup = require("./models/SubGroup");
const Tag = require("./models/Tag");
const Student = require("./models/Student");
const connectDB = require("./config/db");

// database connection
connectDB();

let mainWindow;

let isDev = false;
const isMac = process.platform === "darwin" ? true : false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    backgroundColor: "white",
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

// app.on("ready", createMainWindow);

app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  {
    role: "editMenu",
  },
  {
    label: "Clear All",
    submenu: [
      {
        label: "Clear Academic Year & Semesters",
        click: () => clearAcademicYearAndSemesters(),
      },
      {
        label: "Clear Programmes",
        click: () => clearProgrammes(),
      },
      {
        label: "Clear Groups",
        click: () => clearGroups(),
      },
      {
        label: "Clear Sub Groups",
        click: () => clearSubGroups(),
      },
      {
        label: "Clear Tags",
        click: () => clearTags(),
      },
      {
        label: "Clear Students",
        click: () => clearStudents(),
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { role: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

// clear all students
async function clearStudents() {
  try {
    await Student.deleteMany({});
    mainWindow.webContents.send("students:clear");
  } catch (error) {
    console.log(error);
  }
}
// clear all programmes
async function clearProgrammes() {
  try {
    await Programme.deleteMany({});
    mainWindow.webContents.send("programmes:clear");
  } catch (error) {
    console.log(error);
  }
}

// clear all groups
async function clearGroups() {
  try {
    await Group.deleteMany({});
    mainWindow.webContents.send("groups:clear");
  } catch (error) {
    console.log(error);
  }
}

// clear all sub groups
async function clearSubGroups() {
  try {
    await SubGroup.deleteMany({});
    mainWindow.webContents.send("subGroups:clear");
  } catch (error) {
    console.log(error);
  }
}

// clear all tags
async function clearTags() {
  try {
    await Tag.deleteMany({});
    mainWindow.webContents.send("tags:clear");
  } catch (error) {
    console.log(error);
  }
}

// clear all academic year and semesters
async function clearAcademicYearAndSemesters() {
  try {
    await AcademicYearAndSemester.deleteMany({});
    mainWindow.webContents.send("academicYearAndSemesters:clear");
  } catch (error) {
    console.log(error);
  }
}

// get academic year and semesters from database
ipcMain.on("academicYearAndSemesters:load", sendAcademicYearAndSemesters);
async function sendAcademicYearAndSemesters() {
  try {
    const academicYearAndSemesters = await AcademicYearAndSemester.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send(
      "academicYearAndSemesters:get",
      JSON.stringify(academicYearAndSemesters)
    );
  } catch (error) {
    console.log(error);
  }
}

// get programme
ipcMain.on("programmes:load", sendProgrammes);
async function sendProgrammes() {
  try {
    const programmes = await Programme.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send("programmes:get", JSON.stringify(programmes));
  } catch (error) {
    console.log(error);
  }
}

// get group
ipcMain.on("groups:load", sendGroups);
async function sendGroups() {
  try {
    const groups = await Group.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send("groups:get", JSON.stringify(groups));
  } catch (error) {
    console.log(error);
  }
}

// get sub group
ipcMain.on("subGroups:load", sendSubGroups);
async function sendSubGroups() {
  try {
    const subGroups = await SubGroup.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send("subGroups:get", JSON.stringify(subGroups));
  } catch (error) {
    console.log(error);
  }
}

// get tag
ipcMain.on("tags:load", sendTags);
async function sendTags() {
  try {
    const tags = await Tag.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send("tags:get", JSON.stringify(tags));
  } catch (error) {
    console.log(error);
  }
}

// get students
ipcMain.on("students:load", sendStudents);
async function sendStudents() {
  try {
    const students = await Student.find().sort({
      createdDate: 1,
    });
    mainWindow.webContents.send("students:get", JSON.stringify(students));
  } catch (error) {
    console.log(error);
  }
}

// update academic year and semester
ipcMain.on(
  "academicYearAndSemesters:update",
  async (e, academicYearAndSemester) => {
    // console.log(academicYearAndSemester);
    try {
      await AcademicYearAndSemester.findByIdAndUpdate(
        academicYearAndSemester._id,
        {
          year: academicYearAndSemester.year,
          semester: academicYearAndSemester.semester,
          yearAndSemester: academicYearAndSemester.yearAndSemester,
        }
      );
      sendAcademicYearAndSemesters();
    } catch (error) {
      console.log(error);
    }
  }
);

// update programme
ipcMain.on("programmes:update", async (e, programmeItem) => {
  try {
    await Programme.findByIdAndUpdate(programmeItem._id, {
      programme: programmeItem.programme,
    });
    sendProgrammes();
  } catch (error) {
    console.log(error);
  }
});

// update group
ipcMain.on("groups:update", async (e, groupItem) => {
  try {
    await Group.findByIdAndUpdate(groupItem._id, {
      group: groupItem.group,
    });
    sendGroups();
  } catch (error) {
    console.log(error);
  }
});

// update sub group
ipcMain.on("subGroups:update", async (e, subGroupItem) => {
  try {
    await SubGroup.findByIdAndUpdate(subGroupItem._id, {
      subGroup: subGroupItem.subGroup,
    });
    sendSubGroups();
  } catch (error) {
    console.log(error);
  }
});

// update tag
ipcMain.on("tags:update", async (e, tagItem) => {
  try {
    await Tag.findByIdAndUpdate(tagItem._id, {
      tag: tagItem.tag,
    });
    sendTags();
  } catch (error) {
    console.log(error);
  }
});

// update student
ipcMain.on("students:update", async (e, studentItem) => {
  try {
    await Student.findByIdAndUpdate(studentItem._id, {
      academicYearAndSemester: studentItem.academicYearAndSemester,
      programme: studentItem.programme,
      mainGroup: studentItem.mainGroup,
      mainGroupID: studentItem.mainGroupID,
      subGroup: studentItem.subGroup,
      subGroupID: studentItem.subGroupID,
    });
    sendStudents();
  } catch (error) {
    console.log(error);
  }
});

// create academic year and semester
ipcMain.on(
  "academicYearAndSemesters:add",
  async (e, academicYearAndSemester) => {
    try {
      await AcademicYearAndSemester.create(academicYearAndSemester);
      sendAcademicYearAndSemesters();
    } catch (error) {
      console.log(error);
    }
  }
);

// create programme
ipcMain.on("programmes:add", async (e, programme) => {
  try {
    await Programme.create(programme);
    sendProgrammes();
  } catch (error) {
    console.log(error);
  }
});

// create group
ipcMain.on("groups:add", async (e, group) => {
  try {
    await Group.create(group);
    sendGroups();
  } catch (error) {
    console.log(error);
  }
});

// create sub group
ipcMain.on("subGroups:add", async (e, subGroup) => {
  try {
    await SubGroup.create(subGroup);
    sendSubGroups();
  } catch (error) {
    console.log(error);
  }
});

// create tag
ipcMain.on("tags:add", async (e, tag) => {
  try {
    await Tag.create(tag);
    sendTags();
  } catch (error) {
    console.log(error);
  }
});

// create student
ipcMain.on("students:add", async (e, student) => {
  try {
    await Student.create(student);
    sendStudents();
  } catch (error) {
    console.log(error);
  }
});
// delete academic year and semester
ipcMain.on("academicYearAndSemesters:delete", async (e, id) => {
  try {
    await AcademicYearAndSemester.findOneAndDelete({ _id: id });
    sendAcademicYearAndSemesters();
  } catch (error) {
    console.log(error);
  }
});

// delete programme
ipcMain.on("programmes:delete", async (e, id) => {
  try {
    await Programme.findOneAndDelete({ _id: id });
    sendProgrammes();
  } catch (error) {
    console.log(error);
  }
});

// delete group
ipcMain.on("groups:delete", async (e, id) => {
  try {
    await Group.findOneAndDelete({ _id: id });
    sendGroups();
  } catch (error) {
    console.log(error);
  }
});

// delete sub group
ipcMain.on("subGroups:delete", async (e, id) => {
  try {
    await SubGroup.findOneAndDelete({ _id: id });
    sendSubGroups();
  } catch (error) {
    console.log(error);
  }
});

// delete tag
ipcMain.on("tags:delete", async (e, id) => {
  try {
    await Tag.findOneAndDelete({ _id: id });
    sendTags();
  } catch (error) {
    console.log(error);
  }
});

// delete student
ipcMain.on("students:delete", async (e, id) => {
  try {
    await Student.findOneAndDelete({ _id: id });
    sendStudents();
  } catch (error) {
    console.log(error);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
