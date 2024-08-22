package com.fox.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fox.todo.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
