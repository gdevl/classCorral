export const GET_USER_CLASSROOMS = 'GET_USER_CLASSROOMS';
export const CLEAR_CLASSROOMS = 'CLEAR_CLASSROOMS';
export const CREATE_CLASSROOM = 'CREATE_CLASSROOM';
export const DELETE_CLASSROOM = 'DELETE_CLASSROOM';

export const getUserClassrooms = (classrooms) => {
    return {
        type: GET_USER_CLASSROOMS,
        classrooms,
    };
};

export const clearClassrooms = () => {
    return {
        type: CLEAR_CLASSROOMS,
    };
};

export const addClassroom = (classroom) => {
    return {
        type: CREATE_CLASSROOM,
        classroom,
    };
};

export const removeClassroom = (classroom_id) => {
    return {
        type: DELETE_CLASSROOM,
        classroom_id,
    };
};

export const createClassroom = async (classroomCreationData) => {
    const { userId, className, classDescription } = classroomCreationData;
    const body = {
        className,
        classDescription,
    };
    const request = await fetch(`/api/users/${userId}/classes/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export const deleteClassroom = async (classroom_id) => {
    const request = await fetch(`/api/classes/${classroom_id}/delete`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    return response;
};

export const fetchClassDisplay = async (userId) => {
    const request = await fetch(`/api/users/${userId}/rooms`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await request.json();
    return response;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_CLASSROOMS: {
            return {
                ...state,
                ...action.classrooms,
            };
        }
        case CLEAR_CLASSROOMS: {
            return {};
        }
        case CREATE_CLASSROOM: {
            return {
                ...state,
                [action.classroom.id]: action.classroom,
            };
        }
        case DELETE_CLASSROOM: {
            let newState = { ...state };
            delete newState[`${action.classroom_id}`];
            return {
                ...newState,
            };
        }
        default:
            return state;
    }
}
