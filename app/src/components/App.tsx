import React from 'react';
import { Container, Paper } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Todo, FETCH_ALL_TODOS } from '../graph/Todo';
import { Todo as TodoComponent } from './Todo';

export default function App() {
    const { loading, error, data: { allTodos = [] } = {} } = useQuery(FETCH_ALL_TODOS);

    return (
        <Container maxWidth='md' sx={{ background: 'blue' }}>
            <Paper elevation={3} sx={{
                margin: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '500px'
            }}>
                {allTodos.map((todo: Todo) => (
                    <TodoComponent key={todo.id.toString()} todo={todo} />
                ))}
            </Paper>
        </Container>
    );
}
