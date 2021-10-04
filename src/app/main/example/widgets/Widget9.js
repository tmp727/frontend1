import React, {useState} from 'react';
import {Typography, Select, Paper, Divider} from '@material-ui/core';
import {Line} from 'react-chartjs-2';
import _ from 'lodash';

function Widget9(props)
{
    const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
    const widget = _.merge({}, props.widget);

    function handleChangeRange(ev)
    {
        setCurrentRange(ev.target.value);
    }

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">{widget.title}</Typography>

                <Select
                    native
                    value={currentRange}
                    onChange={handleChangeRange}
                    inputProps={{
                        name: 'currentRange'
                    }}
                    disableUnderline={true}
                >
                    {Object.entries(widget.ranges).map(([key, n]) => {
                        return (
                            <option key={key} value={key}>{n}</option>
                        )
                    })}
                </Select>
            </div>
           
            <div className="h-320 min-h-320">
                <Line
                    data={{
                        labels  : widget['weeklySpent'].chart[currentRange].labels,
                        datasets: widget['weeklySpent'].chart[currentRange].datasets
                    }}
                    options={widget['weeklySpent'].chart.options}
                />
            </div>
          
            
        </Paper>
    );
}

export default React.memo(Widget9);
