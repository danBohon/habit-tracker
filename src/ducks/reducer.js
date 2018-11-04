const initialState = {
    goal: null,
    start_date: "",
    habits: [],
    user: ""
};

// const UPDATE_GOAL = "UPDATE_GOAL";
// const UPDATE_START_DATE = "UPDATE_START_DATE";
const UPDATE_HABIT = "UPDATE_HABIT";
const UPDATE_HABITS = "UPDATE_HABITS";
const USER_LOGIN = 'USER_LOGIN';

export default function reducer(state = initialState, action) {
    console.log('REDUCER HIT: ACTION --->', action );

    switch (action.type){
        case UPDATE_HABIT:
            const { goal, start_date } = action.payload
            return Object.assign( {}, state, { goal: goal, start_date: start_date} );
        case UPDATE_HABITS:
            const { habits } = action.payload
            return Object.assign( {}, state, { habits: habits } );
        case USER_LOGIN: 
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export function updateHabit( goal, start_date ) {
    return {
        type: UPDATE_HABIT,
        payload: {
            goal: goal,
            start_date: start_date,
        }
    }
}

export function updateHabits( habits ) {
    return {
        type: UPDATE_HABITS,
        payload: {
            habits: habits
        }
    }
}

export function userLogin(user) {
    return {
        type: USER_LOGIN,
        payload: user
    };
};