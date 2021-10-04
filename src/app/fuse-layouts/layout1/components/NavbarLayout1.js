import React, {useState} from 'react';
import {AppBar, Hidden, Icon, Select, MenuItem, Button, TextField, FormControl, InputLabel, OutlinedInput} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import clsx from 'clsx';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import {makeStyles} from '@material-ui/styles';
import * as Actions from 'app/main/example/store/actions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles({
    content: {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background                  : 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat            : 'no-repeat',
        backgroundSize              : '100% 40px, 100% 10px',
        backgroundAttachment        : 'local, scroll'
    }
});

function NavbarLayout1(props)
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        {
            'id'   : 0,
            'value': 'web',
            'label': 'Web'
        },
        {
            'id'   : 1,
            'value': 'firebase',
            'label': 'Firebase'
        },
        {
            'id'   : 2,
            'value': 'cloud',
            'label': 'Cloud'
        },
        {
            'id'   : 3,
            'value': 'android',
            'label': 'Android'
        }
    ];

    function handleSearchText(event)
    {
        setSearchText(event.target.value);
    }
    function handleSelectedCategory(event)
    {
        setSelectedCategory(event.target.value);
    }
    return (
        <div className={clsx("flex flex-col overflow-hidden h-full", props.className)}>

            <AppBar
                color="primary"
                position="static"
                elevation={0}
                className="flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
            >

                <div className="flex flex-1 pr-8">
                    <Logo/>
                </div>

                <Hidden mdDown>
                    <NavbarFoldedToggleButton className="w-40 h-40 p-0"/>
                </Hidden>

                <Hidden lgUp>
                    <NavbarMobileToggleButton className="w-40 h-40 p-0">
                        <Icon>arrow_back</Icon>
                    </NavbarMobileToggleButton>
                </Hidden>
            </AppBar>

            <FuseScrollbars className={clsx(classes.content)}>

                {/* <UserNavbarHeader/>

                <Navigation layout="vertical"/> */}
            <div className="flex flex-col w-full flex-shrink">
            <TextField
                        label="Search for a course"
                        placeholder="Enter a keyword..."
                        className="my-16 mx-16"
                        value={searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={handleSearchText}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true
                        }}
            />
            <FormControl className="flex mx-16" variant="outlined">
                <InputLabel htmlFor="category-label-placeholder">
                    Category
                </InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={handleSelectedCategory}
                    input={
                        <OutlinedInput
                            labelWidth={("category".length * 9)}
                            name="category"
                            id="category-label-placeholder"
                        />
                    }
                >
                    <MenuItem value="all">
                        <em>All</em>
                    </MenuItem>

                    {categories.map(category => (
                        <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                onClick={() => {
                    dispatch(Actions.getCourses(searchText, selectedCategory));
                }}
                variant="contained"
                color="primary"
                className="m-16"
            >
                Apply
            </Button>
            </div>
            </FuseScrollbars>
            
        </div>
    );
}

export default NavbarLayout1;