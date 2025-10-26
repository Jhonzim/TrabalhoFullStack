package com.example.Tarefas;

import com.example.Tarefas.model.Task;
import com.example.Tarefas.repository.TaskRepo;
import com.example.Tarefas.service.TaskService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TarefasApplication {



	public static void main(String[] args)
    {
		SpringApplication.run(TarefasApplication.class, args);

	}


}
