import React from 'react';
import { Container, Paper, Divider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Todo, FETCH_ALL_TODOS } from '../graph/Todo';
import { Todo as TodoComponent } from './Todo';
import { NewTodo } from './NewTodo';

export default function App() {
    const { loading, error, data: { allTodos = [] } = {} } = useQuery(FETCH_ALL_TODOS);

    return (
        <Container maxWidth='md' sx={{ background: 'blue' }}>
            <Paper elevation={3} sx={{
                margin: 0,
                padding: '10px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '500px'
            }}>
                {allTodos.map((todo: Todo) => (
                    <TodoComponent key={todo.id.toString()} todo={todo} />
                ))}
                <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
                <NewTodo />
            </Paper>
        </Container>
    );
}
