package com.example.Tarefas.repository;

import com.example.Tarefas.model.Task;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface TaskRepo extends CrudRepository<Task, Long>{

    List<Task> findAll(Sort sort);
}
