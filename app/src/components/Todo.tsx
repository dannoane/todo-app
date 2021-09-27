import React, { useState, FunctionComponent } from 'react';
import { Paper, Checkbox, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreObject, useMutation } from '@apollo/client';
import { Todo as TodoType, SET_TODO_STATUS, DELETE_TODO } from '../graph/Todo';

interface TodoProps {
    todo: TodoType;
}

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
    const [completed, setCompleted] = useState(todo.completed);
    const [setTodoStatus, { loading: todoStatusLoading, error: todoStatusError }] = useMutation(SET_TODO_STATUS);
    const [deleteTodo, { loading: deleteTodoLoading, error: deleteTodoError }] = useMutation(DELETE_TODO, {
        update(cache, { data: { deleteTodo } }) {
            cache.modify({
                fields: {
                    allTodos(existingTodos = [], { readField }) {
                        console.log(existingTodos, todo.id);
                        return existingTodos.filter((todoRef: StoreObject) => todo.id !== readField('id', todoRef));
                    }
                }
            });

            cache.evict({ id: `Todo:${todo.id}`, broadcast: true });
        }
    });

    const handleChangeStatus = (completed: boolean) => {
        setCompleted(completed);
        setTodoStatus({ variables: { id: todo.id, completed } });
    }

    return (
        <Paper elevation={3} sx={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Checkbox checked={completed} onChange={() => handleChangeStatus(!completed)} />
            <Typography align="left" variant="body1">{todo.text}</Typography>
            <IconButton aria-label="delete todo" onClick={() => deleteTodo({ variables: { id: todo.id } })} sx={{
                marginLeft: 'auto',
                marginRight: 0,
            }}>
                <DeleteIcon />
            </IconButton>
        </Paper >
    );
}

export { Todo };
