package com.example.Tarefas.service;

import com.example.Tarefas.model.Task;
import com.example.Tarefas.repository.TaskRepo;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepo taskrepo;

    public TaskService(TaskRepo taskrepo) {
        this.taskrepo = taskrepo;
    }

    public List<Task> create(Task task){
        taskrepo.save(task);
        return list();
    }

    public List<Task> list(){
        Sort sort = Sort.by("name").ascending();
        return taskrepo.findAll(sort);
    }

    public List<Task> update(Task task){
        taskrepo.save(task);
        return list();
    }

    public List<Task> delete(Long id){
        taskrepo.deleteById(id);
        return list();
    }




}
