import React, { useState, FunctionComponent } from 'react';
import { Card, IconButton, Input } from '@mui/material';
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCreateTodo();
        }
    };

    const handleCreateTodo = () => {
        if (text === '') {
            return;
        }

        createTodo({ variables: { text } });
        setText('');
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

    return (
        <Card elevation={3} sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '10px',
        }}>
            <IconButton color="primary" aria-label="add a todo" onClick={handleCreateTodo} >
                <AddIcon />
            </IconButton>
            <Input disableUnderline={true} fullWidth={true} value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown} />
        </Card>
    );
}

export { NewTodo };
