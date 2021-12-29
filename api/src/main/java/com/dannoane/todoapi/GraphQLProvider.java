package com.dannoane.todoapi;

import com.dannoane.todoapi.datafetcher.GraphQLDataFetchers;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;

@Component
public class GraphQLProvider {
    private GraphQL graphQL;
    @Autowired
    GraphQLDataFetchers graphQLDataFetchers;

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }

    @PostConstruct
    public void init() throws IOException {
        URL url = Resources.getResource("schema.graphqls");
        String sdl = Resources.toString(url, Charsets.UTF_8);
        GraphQLSchema graphQLSchema = buildSchema(sdl);
        graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }

    private GraphQLSchema buildSchema(String sdl) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();

        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    }

    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type(TypeRuntimeWiring.newTypeWiring("Query")
                        .dataFetcher("todoById", graphQLDataFetchers.getTodoByIdDataFetcher())
                        .dataFetcher("allTodos", graphQLDataFetchers.getAllTodosDataFetcher()))
                .type(TypeRuntimeWiring.newTypeWiring("Mutation")
                        .dataFetcher("createTodo", graphQLDataFetchers.createTodoDataFetcher())
                        .dataFetcher("setTodoStatus", graphQLDataFetchers.setTodoStatusDataFetcher())
                        .dataFetcher("deleteTodo", graphQLDataFetchers.deleteTodoDataFetcher())
                        .dataFetcher("updateTodoText", graphQLDataFetchers.updateTodoTextDataFetcher())
                        .dataFetcher("moveTodoUp", graphQLDataFetchers.moveTodoUpDataFetcher())
                        .dataFetcher("moveTodoDown", graphQLDataFetchers.moveTodoDownDataFetcher()))
                .type(TypeRuntimeWiring.newTypeWiring("Todo"))
                .build();
    }
}
