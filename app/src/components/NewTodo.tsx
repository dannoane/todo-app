import React, { useState, FunctionComponent } from 'react';
import { Paper, IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, gql } from '@apollo/client';
import { Todo as TodoType, CREATE_TODO } from '../graph/Todo';

const NewTodo: FunctionComponent = () => {
    const [text, setText] = useState('');
    const [createTodo, { loading, error }] = useMutation(CREATE_TODO, {
        update(cache, { data: { createTodo } }) {
            cache.modify({
                fields: {
                    allTodos(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: createTodo,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                    text
                                    completed
                                }
                            `
                        });
                        return [...existingTodos, newTodoRef];
                    }
                }
            });
        }
    });

    return (
        <Paper elevation={3} sx={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <IconButton color="primary" aria-label="add a todo" onClick={() => { createTodo({ variables: { text } }); setText(''); }} >
                <AddIcon />
            </IconButton>
            <Input disableUnderline={true} fullWidth={true} value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)} />
        </Paper>
    );
}

export { NewTodo };
