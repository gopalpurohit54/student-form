import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addStudent } from "../../redux/StudentActions";
import "./CreateStudent.css";

const initialState = {
  email: "",
  pwd: "",
  rpwd: "",
  gender: "",
  hobby: [],
  country: "",
};

function CreateStudent(props) {
  const [formState, setFormState] = useState(initialState);

  const [errorState, setErrorState] = useState({});
  const history = useHistory();

  const changeHandler = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const checkChangeHandler = (event) => {
    if (event.target.checked) {
      const newHobby = formState.hobby.concat([event.target.value]);
      setFormState({
        ...formState,
        hobby: newHobby,
      });
    } else {
      const newHobby = formState.hobby.filter(
        (hobby) => hobby !== event.target.value
      );
      setFormState({
        ...formState,
        hobby: newHobby,
      });
    }
  };

  const validate = (formState) => {
    if (!formState.email || !/^\S+@\S+\.\S+$/.test(formState.email)) {
      setErrorState({ emailError: "Enter a valid E-mail." });
      return false;
    }
    if (
      props.studentList.find((student) => student.email === formState.email)
    ) {
      setErrorState({
        emailError: "Enter a different E-mail, this already exists.",
      });
      return false;
    }
    if (!formState.pwd) {
      setErrorState({ passwordError: "Enter a password." });
      return false;
    }
    if (!formState.rpwd) {
      setErrorState({ rePasswordError: "Re-Enter a password." });
      return false;
    }
    if (formState.pwd !== formState.rpwd) {
      setErrorState({ passwordMatchError: "Both passwords don't match." });
      return false;
    }
    if (!formState.gender) {
      setErrorState({ genderError: "Please provide a gender." });
      return false;
    }
    if (formState.hobby.length < 2) {
      setErrorState({ hobbyError: "Please select atleast two hobby." });
      return false;
    }
    if (!formState.country) {
      setErrorState({ countryError: "Please select a country" });
      return false;
    }
    setErrorState("");
    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const isValid = validate(formState);
    if (isValid) {
      props.addStudent({
        email: formState.email,
        pwd: formState.pwd,
        gender: formState.gender,
        hobby: formState.hobby,
        country: formState.country,
      });
      history.push("/");
    }
  };

  return (
    <div className="container ">
      <h2>Create Student</h2>
      <form className="col-lg-6" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            required={true}
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={formState.email.value}
            onChange={changeHandler}
          />
          <span>{errorState.emailError}</span>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            required={true}
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pwd"
            value={formState.pwd.value}
            onChange={changeHandler}
          />
          <span>
            {errorState.passwordError || errorState.passwordMatchError}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="rpwd">Re-Enter Password:</label>
          <input
            required={true}
            type="password"
            className="form-control"
            id="rpwd"
            placeholder="Re-Enter password"
            name="rpwd"
            value={formState.rpwd.value}
            onChange={changeHandler}
          />
          <span>
            {errorState.rePasswordError || errorState.passwordMatchError}
          </span>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <label className="radio-inline">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={changeHandler}
            />
            Male
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={changeHandler}
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
              checked={formState.hobby.reading}
              onChange={checkChangeHandler}
            />
            Reading
          </label>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="dancing"
              value="dancing"
              checked={formState.hobby.dancing}
              onChange={checkChangeHandler}
            />
            Dancing
          </label>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="cricket"
              value="cricket"
              checked={formState.hobby.cricket}
              onChange={checkChangeHandler}
            />
            Cricket
          </label>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="football"
              value="football"
              checked={formState.hobby.football}
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
            onChange={changeHandler}
          >
            <option value="">select a country</option>
            <option value="India">India</option>
            <option value="America">America</option>
            <option value="Japan">Japan</option>
            <option value="Singapore">Singapore</option>
          </select>
          <span>{errorState.countryError}</span>
        </div>

        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
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
    addStudent: (formState) => dispatch(addStudent(formState)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
