import React, { useState, FunctionComponent } from 'react';
import { Card, Checkbox, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { StoreObject, useMutation } from '@apollo/client';
import { Todo as TodoType, SET_TODO_STATUS, DELETE_TODO } from '../graph/Todo';

interface TodoProps {
    todo: TodoType;
}

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
    const [isDeleteHidden, setDeleteHidden] = useState(true);

    const [setTodoStatus, { loading: todoStatusLoading, error: todoStatusError }] = useMutation(SET_TODO_STATUS);
    const [deleteTodo, { loading: deleteTodoLoading, error: deleteTodoError }] = useMutation(DELETE_TODO, {
        update(cache, { data: { deleteTodo } }) {
            cache.modify({
                fields: {
                    allTodos(existingTodos = [], { readField }) {
                        return existingTodos.filter((todoRef: StoreObject) => todo.id !== readField('id', todoRef));
                    }
                }
            });

            cache.evict({ id: `Todo:${todo.id}`, broadcast: true });
        }
    });

    return (
        <Card elevation={3} onMouseOver={() => setDeleteHidden(false)} onMouseLeave={() => setDeleteHidden(true)} sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '15px',
            borderRadius: '10px',
        }}>
            <Checkbox checked={todo.completed} onChange={() => setTodoStatus({ variables: { id: todo.id, completed: !todo.completed } })} />
            <Typography align="left" variant="body1">{todo.text}</Typography>
            {isDeleteHidden
                ? (<></>)
                : (<IconButton aria-label="delete todo" hidden={isDeleteHidden} onClick={() => deleteTodo({ variables: { id: todo.id } })} sx={{
                    marginLeft: 'auto',
                    marginRight: 0,
                    color: '#000000',
                }}>
                    <ClearIcon />
                </IconButton>)
            }
        </Card>
    );
}

export { Todo };
