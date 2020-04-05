import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "./ActionsTypes";

export const addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    data: student,
  };
};

export const deleteStudent = (studentList) => {
  return {
    type: DELETE_STUDENT,
    data: studentList,
  };
};

export const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    data: student,
  };
};
