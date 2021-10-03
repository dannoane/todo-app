import React, { useState, FunctionComponent } from 'react';
import { Card, Checkbox, ClickAwayListener, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { StoreObject, useMutation } from '@apollo/client';
import { Todo as TodoType, SET_TODO_STATUS, DELETE_TODO, UPDATE_TODO_TEXT } from '../graph/Todo';
import { graphQLStateManager } from '../graph/GraphQLOpsStateManager';

interface TodoProps {
    todo: TodoType;
}

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
    const [text, setText] = useState(todo.text);
    const [editable, setEditable] = useState(false);
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
    const [updateTodoText, { loading: updateTodoLoading, error: updateTodoError }] = useMutation(UPDATE_TODO_TEXT);

    graphQLStateManager(todoStatusLoading, todoStatusError, { loading: 'Updating todo status', error: 'Failed to update todo status' });
    graphQLStateManager(deleteTodoLoading, deleteTodoError, { loading: 'Deleting todo', error: 'Failed to delete todo' });
    graphQLStateManager(updateTodoLoading, updateTodoError, { loading: 'Updating todo text', error: 'Failed to update todo text' });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleUpdateTodo();
        }
    };

    const handleClickAway = () => {
        if (editable) {
            setEditable(false);
            handleUpdateTodo();
        }
    }

    const handleUpdateTodo = () => {
        if (text === '' || text === todo.text) {
            return;
        }

        updateTodoText({ variables: { id: todo.id, text } });
    };

    return (
        <Card elevation={3} onMouseOver={() => setDeleteHidden(false)} onMouseLeave={() => setDeleteHidden(true)} sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '15px',
            borderRadius: '10px',
        }}>
            <Checkbox checked={todo.completed} onChange={() => setTodoStatus({ variables: { id: todo.id, completed: !todo.completed } })} />
            <ClickAwayListener onClickAway={handleClickAway}>
                <TextField
                    fullWidth={true}
                    size={'small'}
                    variant={'standard'}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{ style: { padding: 0 } }}
                    sx={{ padding: '0px' }}
                    value={text}
                    disabled={!editable}
                    onDoubleClick={() => setEditable(true)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
                    onKeyDown={handleKeyDown} />
            </ClickAwayListener>
            {!isDeleteHidden &&
                (<IconButton aria-label="delete todo" hidden={isDeleteHidden} onClick={() => deleteTodo({ variables: { id: todo.id } })} sx={{
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
