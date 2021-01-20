import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { fetchEnrollment, getEnrolledStudents } from '../../store/enrolled';
import { fetchUnenrolled, getUnenrolledStudents } from '../../store/unenrolled';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const EnrollStudents = ({ classroomId }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [left, setLeft] = useState([0, 1, 2, 3]);
    const [right, setRight] = useState([4, 5, 6, 7]);

    useEffect(() => {
        (async () => {
            // get enrolled and unenrolled students
            const requestEnrolled = await fetchEnrollment(classroomId);
            const requestUnenrolled = await fetchUnenrolled(classroomId);
            // console.log('requestEnrolled:');
            // console.log(requestEnrolled);
            // console.log('requestUnenrolled:');
            // console.log(requestUnenrolled);
            setLeft(requestEnrolled);
            setRight(requestUnenrolled);
            setLoaded(true);
        })();
    }, []);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {Array.from(items).map((value) => {
                    const labelId = `transfer-list-item-${value.name}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                className="transfer_list-student"
                                // primary={`List item ${value + 1}`}
                                primary={`${value.name}`}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    if (!loaded) return null;

    return (
        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                <div className="transfer_list_header">
                    <h3>Enrolled</h3>
                </div>
                {customList(left)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <div className="transfer_list_header">
                    <h3>Unenrolled</h3>
                </div>
                {customList(right)}
            </Grid>
        </Grid>
    );
};

export default EnrollStudents;