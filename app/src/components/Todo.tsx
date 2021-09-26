import React, { useState, FunctionComponent } from 'react';
import { Paper, Checkbox, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { Todo as TodoType, SET_TODO_STATUS } from '../graph/Todo';

interface TodoProps {
    todo: TodoType;
}

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
    const [completed, setCompleted] = useState(todo.completed);
    const [setTodoStatus, { loading, error }] = useMutation(SET_TODO_STATUS);

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
        </Paper>
    );
}

export { Todo };
