import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {
    addStudentToClassroom,
    addStudentToStore,
    removeStudentFromClassroom,
    removeStudentFromStore,
    getRoster,
    fetchRoster,
} from '../../store/roster';
import EnrolledStudents from './EnrolledStudents';
import AllStudents from './AllStudents';

const TransferList = ({ classroomId }) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const roster = useSelector((state) => state.roster);

    useEffect(() => {
        (async () => {
            const request = await fetchRoster(classroomId);
            dispatch(getRoster(request));
            setLoaded(true);
        })();
    }, [classroomId, dispatch]);

    const unenrollStudent = async (userId) => {
        const removedStudent = await removeStudentFromClassroom({
            userId,
            classroomId,
        });
        dispatch(removeStudentFromStore(removedStudent));
    };

    const enrollStudent = async (userId) => {
        const newStudent = await addStudentToClassroom({ userId, classroomId });
        dispatch(addStudentToStore(newStudent));
    };

    if (!loaded) return null;

    return (
        <Grid container>
            <Grid item xs={12} md={12} sm={6}>
                <Typography className="student_list_header" variant="h6">
                    Enrolled
                </Typography>
                <div className="student_list">
                    <List>
                        <EnrolledStudents
                            roster={roster}
                            unenrollStudent={unenrollStudent}
                        />
                    </List>
                </div>
            </Grid>
            <Grid item xs={12} md={12} sm={6}>
                <Typography className="student_list_header" variant="h6">
                    Unenrolled
                </Typography>
                <div className="student_list">
                    <List>
                        <AllStudents
                            roster={roster}
                            enrollStudent={enrollStudent}
                        />
                    </List>
                </div>
            </Grid>
        </Grid>
    );
};

export default TransferList;
