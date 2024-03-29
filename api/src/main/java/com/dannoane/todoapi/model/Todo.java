package com.dannoane.todoapi.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "todos")
public class Todo {
    @Id
    public String id;
    public String text;
    public boolean completed;
    public int order;

    public Todo(String text, int order) {
        this.text = text;
        this.order = order;
        this.completed = false;
    }
}
