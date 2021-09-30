package com.dannoane.todoapi.datafetcher;

import com.dannoane.todoapi.model.Todo;
import com.dannoane.todoapi.repository.TodoRepo;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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

    public DataFetcher<List<Todo>> getAllTodosDataFetcher() {
        return dataFetchingEnvironment -> todoRepo.findAll();
    }

    public DataFetcher<Todo> createTodoDataFetcher() {
        return dataFetchingEnvironment -> {
            String text = dataFetchingEnvironment.getArgument("text");
            Todo todo = new Todo(text);

            return todoRepo.save(todo);
        };
    }

    public DataFetcher<Todo> setTodoStatusDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");
            boolean completed = dataFetchingEnvironment.getArgument("completed");

            Optional<Todo> todo = todoRepo.findById(id);
            todo.ifPresent(value -> value.completed = completed);
            todo.ifPresent(value -> todoRepo.save(value));

            return todo.orElse(null);
        };
    }

    public DataFetcher<Todo> deleteTodoDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");
            Optional<Todo> todo = todoRepo.findById(id);
            todo.ifPresent(value -> todoRepo.deleteById(id));

            return todo.orElse(null);
        };
    }

    public DataFetcher<Todo> updateTodoTextDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");
            String text = dataFetchingEnvironment.getArgument("text");

            Optional<Todo> todo = todoRepo.findById(id);
            todo.ifPresent(value -> value.text = text);
            todo.ifPresent(value -> todoRepo.save(value));

            return todo.orElse(null);
        };
    }
}
