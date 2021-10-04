import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import data from 'app/main/example/store/reducers'
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        data,
        fuse,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
