import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
    name : 'todos',
    initialState : [
        {id : 1, title : "Complete Project", description : "Made a ToDo List"},
    ],
    reducers : {
        addTodo : (state, action) => {
            state.push(action.payload);
        },
        updateTodo : (state, action) => {
            const { id, title, description } = action.payload;
            const toDoUpdate = state.find((todo) => todo.id === id);
            if (toDoUpdate) {
                toDoUpdate.title = title
                toDoUpdate.description = description
            }
        },
        deleteTodo : (state, action) => {
            const id = action.payload;
            return state.filter((todo) => todo.id !== id);
        },
    },
})

export const { addTodo, updateTodo, deleteTodo } = toDoSlice.actions;
export default toDoSlice.reducer;