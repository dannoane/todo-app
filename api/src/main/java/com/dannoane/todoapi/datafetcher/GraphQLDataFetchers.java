package com.dannoane.todoapi.datafetcher;

import com.dannoane.todoapi.model.Todo;
import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class GraphQLDataFetchers {
    private static final List<Todo> todos = Arrays.asList(
            new Todo("todo-1", "First todo", false)
    );

    public DataFetcher getTodoByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String todoId = dataFetchingEnvironment.getArgument("id");

            return todos
                    .stream()
                    .filter(todo -> todo.id.equals(todoId))
                    .findFirst()
                    .orElse(null);
        };
    }
}
