import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AnswerModal from '../InstructorClassroomDashboard/AnswerModal/AnswerModal';

const ClassList = ({ classMeta, role }) => {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState(null);
    const questions = classMeta['questions'];

    const hasQuestion = (userId) => {
        for (let question of questions) {
            if (question.student_id === userId && question.resolved === false) {
                return question;
            }
        }
        return false;
    };

    const handleQuestion = (question) => {
        setQuestion(question);
        setOpen(true);
    };

    console.log('classMeta["students"]: ', classMeta['students']);

    return (
        <> 
            {classMeta['students'].length > 0 ? (
                classMeta['students'].map((student) => (
                    <div
                        key={`student-${student.id}`}
                        className="classroom_container_student-deets"
                    >
                        <p className="student-name">
                            {`${student.first_name} ${student.last_name}`}
                        </p>
                        <div className="student-avatar">
                            <Avatar src={`${student.avatar_url}`} />
                        </div>
                        <div className="student-ci-qs">
                            {classMeta['attendance'].includes(student.id) ? (
                                <Tooltip
                                    title={`${student.first_name} has checked in`}
                                    aria-label="Student has checked in."
                                >
                                    <CheckCircleIcon
                                        fontSize="default"
                                        color="disabled"
                                        style={{ color: 'green' }}
                                        className="student-checked_in"
                                    />
                                </Tooltip>
                            ) : (
                                <CheckCircleIcon
                                    fontSize="default"
                                    color="disabled"
                                    className="student-checked_in"
                                />
                            )}
                            {role === 'instructor' ? (
                                <>
                                    {hasQuestion(student.id) ? (
                                        <Tooltip
                                            title={`${student.first_name} has a question`}
                                            aria-label="student-question"
                                        >
                                            <IconButton
                                                className="depad_question_button"
                                                value={student.id}
                                                content={hasQuestion(
                                                    student.id
                                                )}
                                                onClick={() =>
                                                    handleQuestion(
                                                        hasQuestion(student.id)
                                                    )
                                                }
                                            >
                                                <QuestionAnswerIcon
                                                    style={{ color: 'orange' }}
                                                    fontSize="default"
                                                    value={student.id}
                                                    className="student-question"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <QuestionAnswerIcon
                                            color="disabled"
                                            fontSize="default"
                                            className="student-question"
                                        />
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-students">
                    You haven't added any students to this classroom.
                </p>
            )}
            <AnswerModal
                open={open}
                setOpen={setOpen}
                question={question}
                classroomId={classMeta['id']}
            />
        </>
    );
};

export default ClassList;
