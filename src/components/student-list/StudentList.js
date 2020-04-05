import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { deleteStudent } from "../../redux/StudentActions";

function StudentList(props) {
  const [studentList, setStudentList] = useState(props.studentList);

  useEffect(() => {
    setStudentList(
      studentList.map((student) => {
        return { ...student, select: false };
      })
    );
  }, []);

  const checkChangeHandler = (event) => {
    if (event.target.name === "checkAll") {
      setStudentList(
        studentList.map((student) => {
          student.select = event.target.checked;
          return student;
        })
      );
    } else {
      setStudentList(
        studentList.map((student) => {
          if (student.email === event.target.name) {
            student.select = event.target.checked;
          }
          return student;
        })
      );
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setStudentList(studentList.filter((student) => student.select !== true));
    props.deleteStudent(studentList);
  };

  if (studentList.length === 0) {
    return (
      <div className="container">
        <h2>Currently no Students Found.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Students List</h2>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="checkAll"
                onChange={checkChangeHandler}
              />
            </th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.email}>
              <td>
                <input
                  type="checkbox"
                  name={student.email}
                  checked={student.select}
                  onChange={checkChangeHandler}
                />
              </td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>
                {student.hobby.map((hobby) => (
                  <React.Fragment key={hobby}>{hobby + " "}</React.Fragment>
                ))}
              </td>
              <td>{student.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" class="btn btn-danger" onClick={deleteHandler}>
        DELETE
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentList) => dispatch(deleteStudent(studentList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
