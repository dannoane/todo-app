import React from 'react';
import { Container, Paper, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Todo, FETCH_ALL_TODOS } from '../graph/Todo';

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
                minWidth: '200px'
            }}>
                <Stack spacing={1}>
                    {allTodos.map((todo: Todo) => (
                        <div>
                            <input type="checkbox" checked={todo.completed}></input>
                            <p>{todo.text}</p>
                        </div>
                    ))}
                </Stack>
            </Paper>
        </Container>
    );
}
