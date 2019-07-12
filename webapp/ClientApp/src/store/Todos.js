const addTodo = 'ADD_TODO';
const removeTodo = 'REMOVE_TODO';
const getTodos = 'GET_TODOS';
const initialState = {
    todos: [
    ],
    pager: { pageNo: 1, itemsPerPage: 20, pagePerDisplay: 5},
    dbMessage: "",
    isDbSuccess: true,
    showMessage: false
}

export const actionCreators = {

    add: newTodo => async (dispatch) => {
        const url = `/api/SampleData/saveTodo`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newTodo)
        })

        const result = await response.json();
        dispatch({ type: addTodo, payload: { id: (parseInt(result.returnId, 10) ? parseInt(result.returnId, 10) : 0), title: newTodo.title, department: newTodo.department, status: false }, message: result.dbMessage, isDbSuccess: result.isDbSuccess });
    },
    requestTodos: pager => async (dispatch) => {
        const url = `/api/SampleData/getTodo`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(pager),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 401) {
            console.log("aunauthorize");
            return;
        }
        const result = await response.json();
        dispatch({ type: getTodos, payload: result, message: "", isDbSuccess: true });
    },
    removeTodo: id => async (dispatch, getState) => {
        const removeId = id;
        const url = `/api/SampleData/removeTodo`;
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

};

export const reducer = (state = initialState, action) => {
    state = state || initialState;
    if (action.type === addTodo) {
        return {
            ...state, todos: [...state.todos, action.payload]
            , pager: [...state.pager]
            , dbMessage: action.message
            , isDbSuccess: action.isDbSuccess
        }
    };


    if (action.type === removeTodo) {
        return {
            todos: [...state.todos.filter(x => x.id !== action.payload)]
            , pager: [...state.pager]
            , dbMessage: action.message
            , isDbSuccess: action.isDbSuccess
        }
    }

    if (action.type === getTodos) {

        const data = action.payload.data;
        const pager = action.payload.pager;


        return {
            todos: data
            , pager: pager
            , dbMessage: ""
            , isDbSuccess: true
        };
    }


    return state;
};
