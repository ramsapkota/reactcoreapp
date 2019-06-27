const addTodo = 'ADD_TODO';
const removeTodo = 'REMOVE_TODO';
const getTodos = 'GET_TODOS';
const initialState = {
    todos: [
    ],
    dbMessage: "",
    isDbSuccess: true,
    showMessage: false
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
        dispatch({ type: addTodo, payload: { id: (parseInt(result.returnId) ? parseInt(result.returnId):0), title: newTodo.title, department: newTodo.department, status: false }, message: result.dbMessage, isDbSuccess: result.isDbSuccess });
    },
    requestTodos: () => async (dispatch, getState) => {
        const url = `api/SampleData/getTodo`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        dispatch({ type: getTodos, payload: result.data, message: "", isDbSuccess: true });
    },
    removeTodo: id => async (dispatch, getState) => {
        const removeId = id;
        const url = `api/SampleData/removeTodo`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ "id": id })
        });
        const result = await response.json();
        dispatch({ type: removeTodo, payload: removeId, message: result.dbMessage, isDbSuccess: result.isDbSuccess });


    }
    //,
    //requestTodos: () => ({ type: getTodos })

};

export const reducer = (state = initialState, action) => {
    state = state || initialState;
    if (action.type === addTodo) {
        return {
            ...state, todos: [...state.todos, action.payload]
            , dbMessage: action.message
            , isDbSuccess: action.isDbSuccess
        }
    };


    if (action.type === removeTodo) {
        console.log(action.payload);

        return {
            todos: [...state.todos.filter(x => x.id !== action.payload)]
            , dbMessage: action.message
            , isDbSuccess: action.isDbSuccess
        }
    }

    if (action.type === getTodos) {

        const data = action.payload;

        return {
            todos: data
            , dbMessage: ""
            , isDbSuccess: true
        };
    }


    return state;
};
