//The state Tree
function createStore(reducer){
    let state;
    let listeners = [];

    const getState = ()=>state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    };

    const dispatch = (action) => {
        state = reducer(state,action);
        listeners.forEach((listeners) => listeners());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

//App Code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

//The reducer function - Passed as an arugument while initializing the store
function todos(state = [], action){
    switch(action.type) {
        case 'ADD_TODO':
        return state.concat([action.todo]);
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id);
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({},todo,  { complete: !todo.complete }));
        default:
            return state;
    }

}

function goals(state = [], action){
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal]);
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id);
        default :
            return state;
    }
}

function app(state ={}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}
/*
const store = createStore(app);
const unsubscribe = store.subscribe(()=>{
    console.log("State Changed!");
})

store.dispatch({
    type:ADD_TODO,
    todo: {
        id: 0,
        name: 'Learn Stuff',
        complete: false
    }
})

store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn More Stuff',
    complete: false
}))
*/
