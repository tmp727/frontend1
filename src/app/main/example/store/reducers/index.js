import {combineReducers} from 'redux';
import widgets from './widgets.reducer';
import projects from './projects.reducer';
import courses from './courses.reducer';

const reducer = combineReducers({
    widgets,
    projects,
    courses,
});

export default reducer;
