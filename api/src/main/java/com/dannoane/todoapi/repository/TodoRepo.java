package com.dannoane.todoapi.repository;

import com.dannoane.todoapi.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class TodoRepo {
    @Autowired
    ITodoRepo todoRepo;
    @Autowired
    MongoTemplate mongoTemplate;

    public ITodoRepo mongoRepo() {
        return todoRepo;
    }

    public Optional<Todo> updateStatus(String id, boolean completed) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));

        Update update = new Update();
        update.set("completed", completed);

        Todo todo = mongoTemplate.findAndModify(query, update, new FindAndModifyOptions().returnNew(true), Todo.class);

        return Optional.ofNullable(todo);
    }

    public Optional<Todo> updateText(String id, String text) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));

        Update update = new Update();
        update.set("text", text);

        Todo todo = mongoTemplate.findAndModify(query, update, new FindAndModifyOptions().returnNew(true), Todo.class);

        return Optional.ofNullable(todo);
    }

    public Optional<Todo> deleteTodo(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));

        Todo todo = mongoTemplate.findAndRemove(query, Todo.class);

        return Optional.ofNullable(todo);
    }
}
