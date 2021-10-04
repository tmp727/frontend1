import * as Actions from '../actions';

const initialState = null;

const coursesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COURSES:
            //console.log(action.payload);
            return [...action.payload.exams];
        default:
            return state;
    }
};

export default coursesReducer;
