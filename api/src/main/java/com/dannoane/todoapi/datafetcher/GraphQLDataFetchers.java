package com.dannoane.todoapi.datafetcher;

import com.dannoane.todoapi.model.Todo;
import com.dannoane.todoapi.repository.TodoRepo;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GraphQLDataFetchers {
    @Autowired
    TodoRepo todoRepo;

    public DataFetcher<Todo> getTodoByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String todoId = dataFetchingEnvironment.getArgument("id");

            return todoRepo.findById(todoId).orElse(null);
        };
    }

    public DataFetcher<List<Todo>> getAllTodos() {
        return dataFetchingEnvironment -> todoRepo.findAll();
    }

    public DataFetcher<Todo> createTodoDataFetcher() {
        return dataFetchingEnvironment -> {
            String text = dataFetchingEnvironment.getArgument("text");
            Todo todo = new Todo(text);

            return todoRepo.save(todo);
        };
    }
}
