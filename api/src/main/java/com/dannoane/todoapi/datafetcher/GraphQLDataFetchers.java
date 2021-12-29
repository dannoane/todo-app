package com.dannoane.todoapi.datafetcher;

import com.dannoane.todoapi.model.Todo;
import com.dannoane.todoapi.repository.TodoRepo;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class GraphQLDataFetchers {
    @Autowired
    TodoRepo todoRepo;

    public DataFetcher<Todo> getTodoByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String todoId = dataFetchingEnvironment.getArgument("id");

            return todoRepo.mongoRepo().findById(todoId).orElse(null);
        };
    }

    public DataFetcher<List<Todo>> getAllTodosDataFetcher() {
        return dataFetchingEnvironment -> todoRepo.mongoRepo().findAll();
    }

    public DataFetcher<Todo> createTodoDataFetcher() {
        return dataFetchingEnvironment -> {
            Optional<Todo> lastTodo = todoRepo.findLastTodo();

            String text = dataFetchingEnvironment.getArgument("text");
            Todo todo = new Todo(text, lastTodo.map(t -> t.order).orElse(1));

            return todoRepo.mongoRepo().save(todo);
        };
    }

    public DataFetcher<Todo> setTodoStatusDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");
            boolean completed = dataFetchingEnvironment.getArgument("completed");

            Optional<Todo> todo = todoRepo.updateStatus(id, completed);

            return todo.orElse(null);
        };
    }

    public DataFetcher<Todo> deleteTodoDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");

            Optional<Todo> todo = todoRepo.deleteTodo(id);

            return todo.orElse(null);
        };
    }

    public DataFetcher<Todo> updateTodoTextDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");
            String text = dataFetchingEnvironment.getArgument("text");

            Optional<Todo> todo = todoRepo.updateText(id, text);

            return todo.orElse(null);
        };
    }

    public DataFetcher<Todo> moveTodoUpDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");

            AtomicInteger order = new AtomicInteger();
            Optional<Todo> todoOptional = todoRepo.mongoRepo().findById(id);
            todoOptional.ifPresent(todo -> {
                order.set(todo.order);

                Optional<Todo> todoBeforeOptional = todoRepo.findTodoBefore(todo.order);
                todoBeforeOptional.ifPresent(todoBefore -> {
                    if (todoRepo.switchTodos(todo.id, todoBefore.order, todoBefore.id, todo.order)) {
                        order.set(todoBefore.order);
                    }
                });
            });

            return todoOptional.map(todo -> {
                todo.order = order.get();
                return todo;
            }).orElse(null);
        };
    }

    public DataFetcher<Todo> moveTodoDownDataFetcher() {
        return dataFetchingEnvironment -> {
            String id = dataFetchingEnvironment.getArgument("id");

            AtomicInteger order = new AtomicInteger();
            Optional<Todo> todoOptional = todoRepo.mongoRepo().findById(id);
            todoOptional.ifPresent(todo -> {
                order.set(todo.order);

                Optional<Todo> todoAfterOptional = todoRepo.findTodoAfter(todo.order);
                todoAfterOptional.ifPresent(todoAfter -> {
                    if (todoRepo.switchTodos(todo.id, todoAfter.order, todoAfter.id, todo.order)) {
                        order.set(todoAfter.order);
                    }
                });
            });

            return todoOptional.map(todo -> {
                todo.order = order.get();
                return todo;
            }).orElse(null);
        };
    }
}
