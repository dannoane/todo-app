package com.dannoane.todoapi.datafetcher;

import com.dannoane.todoapi.repository.TodoRepo;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GraphQLDataFetchers {
    @Autowired
    TodoRepo todoRepo;

    public DataFetcher getTodoByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String todoId = dataFetchingEnvironment.getArgument("id");

            return todoRepo.findById(todoId).orElse(null);
        };
    }
}
