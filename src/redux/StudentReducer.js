import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "./ActionsTypes";

const initialState = {
  studentList: [],
};
let newStudentList;
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      newStudentList = state.studentList.concat(action.data);
      console.log(newStudentList);
      return {
        ...state,
        studentList: newStudentList,
      };

    case DELETE_STUDENT:
      return {
        ...state,
        studentList: action.data.filter((student) => student.select !== true),
      };

    case UPDATE_STUDENT:
      newStudentList = state.studentList.filter(
        (student) => student.email !== action.data.email
      );
      newStudentList = newStudentList.concat(action.data);
      return {
        ...state,
        studentList: newStudentList,
      };
    default:
      return state;
  }
};

export default studentReducer;
