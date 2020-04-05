import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateStudent } from "../../redux/StudentActions";

function UpdateStudent(props) {
  const [student, setStudent] = useState();
  const [errorState, setErrorState] = useState({});
  const history = useHistory();

  const changeHandler = (event) => {
    setStudent(
      props.studentList.find((student) => student.email === event.target.value)
    );
  };

  const checkChangeHandler = (event) => {
    if (event.target.checked) {
      const newHobby = student.hobby.concat([event.target.value]);
      setStudent({
        ...student,
        hobby: newHobby,
      });
    } else {
      const newHobby = student.hobby.filter(
        (hobby) => hobby !== event.target.value
      );
      setStudent({
        ...student,
        hobby: newHobby,
      });
    }
  };

  const updateChangeHandler = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const validate = (formState) => {
    if (!formState.gender) {
      setErrorState({ genderError: "Please provide a gender." });
      return false;
    }
    if (formState.hobby.length < 2) {
      setErrorState({ hobbyError: "Please select atleast two hobby" });
      return false;
    }
    setErrorState("");
    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isValid = validate(student);
    if (isValid) {
      props.updateStudent(student);
      history.push("/");
    }
  };

  if (props.studentList.length === 0) {
    return (
      <div className="container">
        <h2>Currently no Students Found.</h2>
      </div>
    );
  }
  return (
    <div className="container ">
      <h2>Update Student</h2>
      <form className="col-lg-6" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <select
            className="form-control"
            name="email"
            id="email"
            onChange={changeHandler}
          >
            <option value="">select an email</option>
            {props.studentList.map((student) => (
              <option key={student.email} value={student.email}>
                {student.email}
              </option>
            ))}
          </select>
        </div>
      </form>
      {student && (
        <form className="col-lg-6" onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label>Gender:</label>
            <label className="radio-inline">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={student.gender === "Male"}
                onChange={updateChangeHandler}
              />
              Male
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={student.gender === "Female"}
                onChange={updateChangeHandler}
              />
              Female
            </label>
            <span className="radio-inline">{errorState.genderError}</span>
          </div>
          <div className="form-group">
            <label>Hobby:</label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="reading"
                value="reading"
                checked={student.hobby.find((hobby) => hobby === "reading")}
                onChange={checkChangeHandler}
              />
              Reading
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="dancing"
                value="dancing"
                checked={student.hobby.find((hobby) => hobby === "dancing")}
                onChange={checkChangeHandler}
              />
              Dancing
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="cricket"
                value="cricket"
                checked={student.hobby.find((hobby) => hobby === "cricket")}
                onChange={checkChangeHandler}
              />
              Cricket
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="football"
                value="football"
                checked={student.hobby.find((hobby) => hobby === "football")}
                onChange={checkChangeHandler}
              />
              Football
            </label>
            <span className="checkbox-inline">{errorState.hobbyError}</span>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <select
              className="form-control"
              name="country"
              id="country"
              onChange={updateChangeHandler}
            >
              <option value="India" selected={student.country === "India"}>
                India
              </option>
              <option value="America" selected={student.country === "America"}>
                America
              </option>
              <option value="Japan" selected={student.country === "Japan"}>
                Japan
              </option>
              <option
                value="Singapore"
                selected={student.country === "Singapore"}
              >
                Singapore
              </option>
            </select>
          </div>

          <button type="submit" className="btn btn-default">
            Update
          </button>
        </form>
      )}
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
    updateStudent: (studentList) => dispatch(updateStudent(studentList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
