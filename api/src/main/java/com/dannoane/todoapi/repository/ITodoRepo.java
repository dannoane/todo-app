package com.dannoane.todoapi.repository;

import com.dannoane.todoapi.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITodoRepo extends MongoRepository<Todo, String> {
}
