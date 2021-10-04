import axios from 'axios';

export const GET_COURSES = '[PROJECT DASHBOARD APP] GET COURSES';

export function getCourses(searchText, selectedCategory)
{
    let data = { type: selectedCategory, status: searchText }
    console.log( 'filter info =', data );
    const request = axios.post('http://localhost:8070/exams/find', data);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COURSES,
                payload: response.data
            })
        );
}
