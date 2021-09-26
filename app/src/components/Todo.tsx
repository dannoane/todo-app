import React, { useState, FunctionComponent } from 'react';
import { Paper, Checkbox, Typography } from '@mui/material';
import { Todo as TodoType } from '../graph/Todo';

interface TodoProps {
    todo: TodoType;
}

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
    const [completed, setCompleted] = useState(todo.completed);

    return (
        <Paper elevation={3} sx={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Checkbox checked={completed} onChange={() => setCompleted(!completed)} />
            <Typography align="left" variant="body1">{todo.text}</Typography>
        </Paper>
    );
}

export { Todo };
