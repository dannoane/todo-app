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
