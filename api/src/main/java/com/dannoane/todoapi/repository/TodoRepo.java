package com.dannoane.todoapi.repository;

import com.dannoane.todoapi.model.Todo;
import com.mongodb.bulk.BulkWriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.BulkOperations;
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

    public Optional<Todo> findLastTodo() {
        Query query = new Query();
        query.with(Sort.by(Sort.Order.desc("order")));
        query.limit(1);

        return mongoTemplate.find(query, Todo.class).stream().findFirst();
    }

    public Optional<Todo> findTodoBefore(int order) {
        Query query = new Query();
        query.addCriteria(Criteria.where("order").lt(order).andOperator(Criteria.where("completed").is(false)));
        query.with(Sort.by(Sort.Order.desc("order")));
        query.limit(1);

        return mongoTemplate.find(query, Todo.class).stream().findFirst();
    }

    public Optional<Todo> findTodoAfter(int order) {
        Query query = new Query();
        query.addCriteria(Criteria.where("order").gt(order).andOperator(Criteria.where("completed").is(false)));
        query.with(Sort.by(Sort.Order.asc("order")));
        query.limit(1);

        return mongoTemplate.find(query, Todo.class).stream().findFirst();
    }

    public boolean switchTodos(String idFirst, int newOrderFirst, String idSecond, int newOrderSecond) {
        BulkOperations ops = mongoTemplate.bulkOps(BulkOperations.BulkMode.ORDERED, Todo.class);

        Query queryFirst = new Query();
        queryFirst.addCriteria(Criteria.where("_id").is(idFirst));

        Update updateFirst = new Update();
        updateFirst.set("order", newOrderFirst);

        ops.updateOne(queryFirst, updateFirst);

        Query querySecond = new Query();
        querySecond.addCriteria(Criteria.where("_id").is(idSecond));

        Update updateSecond = new Update();
        updateSecond.set("order", newOrderSecond);

        ops.updateOne(querySecond, updateSecond);

        BulkWriteResult result = ops.execute();

        return result.wasAcknowledged();
    }
}
