const addTodo = 'ADD_TODO';
const removeTodo = 'REMOVE_TODO';
const getTodos = 'GET_TODOS';
const initialState = {
    todos: [
    ]
}

export const actionCreators = {

    add: newTodo => async (dispatch, getState) => {
        const url = `api/SampleData/saveTodo`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newTodo)
        });

        const result = await response.json();
        console.log(result)
        dispatch({ type: addTodo, payload: { id:0, title: newTodo.title, department: newTodo.department, status: false } });
    },
    requestTodos: () => async (dispatch, getState) => {
        const url = `api/SampleData/getTodo`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        dispatch({ type: getTodos, paylod: result.data  });
    },
    remove: () => ({ type: removeTodo})
    //,
    //requestTodos: () => ({ type: getTodos })

};

export const reducer = (state = initialState, action) => {
    state = state || initialState;
    if (action.type === addTodo) {
        return { ...state, todos: [...state.todos, action.payload] }   
    };


    if (action.type === removeTodo) {
        return state;
    }

    if (action.type === getTodos) {

        const data = action.paylod;
        console.log(data);

        return {
            todos: data
        };
    }

    return state;
};
