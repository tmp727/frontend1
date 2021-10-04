import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Menu, MenuItem, Hidden, Icon, IconButton, Tab, Tabs, Typography, Card, CardContent, Divider, CardActions, Button} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';
import _ from 'lodash';
import clsx from 'clsx';
import Widget5 from './widgets/Widget5';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Widget11 from './widgets/Widget11';
import {makeStyles, useTheme} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    content          : {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    selectedProject  : {
        background  : theme.palette.primary.main,
        color       : theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0'
    },
    projectMenuButton: {
        background  : theme.palette.primary.main,
        color       : theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft  : 1
    },
}));

function Example(props)
{
    const dispatch = useDispatch();
    const widgets = useSelector(({example}) => example.widgets);
    const projects = useSelector(({example}) => example.projects);
    const filteredData = useSelector(({example}) => example.courses);
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [selectedProject, setSelectedProject] = useState({
        id    : 1,
        menuEl: null
    });
    
    const categories = [
        {
            'id'   : 0,
            'value': 'web',
            'label': 'Web',
            'color' : 'rgb(33, 150, 243)'
        },
        {
            'id'   : 1,
            'value': 'firebase',
            'label': 'Firebase',
            'color' : 'rgb(255, 193, 7)'
        },
        {
            'id'   : 2,
            'value': 'cloud',
            'label': 'Cloud',
            'color' : 'rgb(96, 125, 139)'
        },
        {
            'id'   : 3,
            'value': 'android',
            'label': 'Android',
            'color' : 'rgb(76, 175, 80)'
        }
    ];
    const theme = useTheme();

    useEffect(() => {
        dispatch(Actions.getWidgets());
        dispatch(Actions.getProjects());
    }, [dispatch]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChangeProject(id)
    {
        setSelectedProject({
            id,
            menuEl: null
        });
    }

    function handleOpenProjectMenu(event)
    {
        setSelectedProject({
            id    : selectedProject.id,
            menuEl: event.currentTarget
        });
    }

    function handleCloseProjectMenu()
    {
        setSelectedProject({
            id    : selectedProject.id,
            menuEl: null
        });
    }

    if ( !widgets || !projects )
    {
        return null;
    }
    console.log('filteredData', filteredData);
    return (
        <FusePageSimple
            classes={{
                //header      : "min-h-160 h-160",
                //toolbar     : "min-h-48 h-48",
                //rightSidebar: "w-288",
                content     : classes.content,
            }}
            content={
                
                <div className="p-12">
                    <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                    <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget flex w-full sm:w-1/3 p-12">
                                <Widget8 widget={widgets.widget8}/>
                            </div>
                            <div className="widget flex w-full sm:w-1/3 p-12">
                                <Widget9 widget={widgets.widget9}/>
                            </div>
                            <div className="widget flex w-full sm:w-1/3 p-12">
                                <Widget5 widget={widgets.widget5}/>
                            </div>
                    </FuseAnimateGroup>
                    </div>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full border-b-1 px-24"
                    >
                        <Tab className="text-14 font-600 normal-case" label="Home"/>
                        <Tab className="text-14 font-600 normal-case" label="Budget Summary"/>
                        <Tab className="text-14 font-600 normal-case" label="Team Members"/>
                    </Tabs>
                    {tabValue === 0 && ( filteredData && (
                        filteredData.length > 0 ? (
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                                className="flex flex-wrap py-24"
                            >
                                {filteredData.map((course) => {
                                    const category = categories.find(_cat => _cat.value === course.category);
                                    return (
                                        <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
                                            <Card elevation={1} className="flex flex-col h-256">
                                                <div
                                                    className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                                                    style={{
                                                        background: category.color,
                                                        color     : theme.palette.getContrastText(category.color)
                                                    }}
                                                >
                                                    <Typography className="font-medium truncate" color="inherit">{category.label}</Typography>
                                                    <div className="flex items-center justify-center opacity-75">
                                                        <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                                                        <div className="text-16 whitespace-no-wrap">{course.length} min</div>
                                                    </div>
                                                </div>
                                                <CardContent className="flex flex-col flex-auto items-center justify-center">
                                                    <Typography className="text-center text-16 font-400">{course.title}</Typography>
                                                    <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">{course.updated}</Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </FuseAnimateGroup>
                        ) :
                        (
                            <div className="flex flex-1 items-center justify-center">
                                <Typography color="textSecondary" className="text-24 my-24">
                                    No courses found!
                                </Typography>
                            </div>
                        )
                    ))}
                    
                    {tabValue === 1 && (
                        <FuseAnimateGroup
                        className="flex flex-wrap"
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        <div className="widget flex w-full p-12">
                            <Widget11 widget={widgets.widget11}/>
                        </div>
                        </FuseAnimateGroup>
                    )}
                    {tabValue === 2 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget flex w-full p-12">
                                <Widget11 widget={widgets.widget11}/>
                            </div>
                        </FuseAnimateGroup>
                    )}
                </div>
            }
            // rightSidebarContent={
            //     <FuseAnimateGroup
            //         className="w-full"
            //         enter={{
            //             animation: "transition.slideUpBigIn"
            //         }}
            //     >
            //         <div className="widget w-full p-12">
            //             <WidgetNow/>
            //         </div>
            //         <div className="widget w-full p-12">
            //             <WidgetWeather widget={widgets.weatherWidget}/>
            //         </div>
            //     </FuseAnimateGroup>
            // }
            ref={pageLayout}
        />
    );
}

export default withReducer('example', reducer)(Example);
