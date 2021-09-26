import { gql } from "@apollo/client";

export interface Todo {
    id: String;
    text: String;
    completed: boolean;
}

export const FETCH_ALL_TODOS = gql`
    query allTodos {
        allTodos {
            id
            text
            completed
        }
    }
`;

export const CREATE_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(text: $text) {
            id
            text
            completed
        }
    }
`;

export const SET_TODO_STATUS = gql`
    mutation setTodoStatus($id: ID!, $completed: Boolean!) {
        setTodoStatus(id: $id, completed: $completed) {
        id
        text
        completed
        }
    }
`;
