package com.dannoane.todoapi.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    public String id;
    public String text;
    public boolean completed;
}
