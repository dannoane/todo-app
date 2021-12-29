import { gql } from "@apollo/client";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    order: number;
}

export const FETCH_ALL_TODOS = gql`
    query allTodos {
        allTodos {
            id
            text
            completed
            order
        }
    }
`;

export const CREATE_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(text: $text) {
            id
            text
            completed
            order
        }
    }
`;

export const SET_TODO_STATUS = gql`
    mutation setTodoStatus($id: ID!, $completed: Boolean!) {
        setTodoStatus(id: $id, completed: $completed) {
            id
            text
            completed
            order
        }
    }
`;

export const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`;

export const UPDATE_TODO_TEXT = gql`
    mutation updateTodoText($id: ID!, $text: String!) {
        updateTodoText(id: $id, text: $text) {
            id
            text
            completed
            order
        }
    }
`;

export const MOVE_TODO_UP = gql`
    mutation moveTodoUp($id: ID!) {
        moveTodoUp(id: $id) {
            id
            text
            completed
            order
        }
    }
`;

export const MOVE_TODO_DOWN = gql`
    mutation moveTodoDown($id: ID!) {
        moveTodoDown(id: $id) {
            id
            text
            completed
            order
        }
    }
`;

