package com.example.Tarefas.controller;

import com.example.Tarefas.model.Task;

import com.example.Tarefas.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

  private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    List<Task> create(@RequestBody Task task){
      return taskService.create(task);
    }

    @GetMapping
    List<Task> list(){
        return taskService.list();
    }

    @DeleteMapping("{id}")
    List<Task> delete(@PathVariable("id") Long id){
      return taskService.delete(id);
    }

    @PutMapping
    List<Task> update(@RequestBody Task task){

        return taskService.update(task);

    }



}
