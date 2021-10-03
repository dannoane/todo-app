import React from 'react';
import { Card, Divider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Todo, FETCH_ALL_TODOS } from '../graph/Todo';
import { Todo as TodoComponent } from './Todo';
import { NewTodo } from './NewTodo';
import { graphQLStateManager } from '../graph/GraphQLOpsStateManager';

export default function App() {
    const { loading, error, data: { allTodos = [] } = {} } = useQuery(FETCH_ALL_TODOS);

    graphQLStateManager(loading, error, { loading: 'Loading todos', error: 'Failed to load todos' });

    const completedTodos = [...allTodos.filter((todo: Todo) => todo.completed)],
        todos = [...allTodos.filter((todo: Todo) => !todo.completed)];

    return (
        <Card elevation={3} sx={{
            margin: 0,
            padding: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '500px',
            backgroundColor: '#ffea00',
            borderRadius: '20px',
        }}>
            {todos.map((todo: Todo) => (
                <TodoComponent key={todo.id.toString()} todo={todo} />
            ))}
            {completedTodos.map((todo: Todo) => (
                <TodoComponent key={todo.id.toString()} todo={todo} />
            ))}
            {allTodos.length > 0 && <Divider sx={{ marginTop: '15px', marginBottom: '15px', borderWidth: '1px', borderColor: '#000000', borderRadius: '1px', backgroundColor: '#000000' }} />}
            <NewTodo />
        </Card>
    );
}
