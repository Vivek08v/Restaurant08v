package com.vivek08v.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.vivek08v.server.repo.UserRepo;

@SpringBootApplication
public class StoreApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(StoreApplication.class, args);

		try {
			// User user1 = context.getBean(User.class);
			// user1.setId(111);
			// user1.setName("Vivek");
			// user1.setPhone("9608288736");
			// user1.setEmail("vivek08@gmail.com");
			// user1.setAddress("India");
			
			UserRepo repo = context.getBean(UserRepo.class);
			// repo.save(user1);
			System.out.println("hi");
			
			System.out.println(repo.findAll());
		} 
		catch (Exception e) {
			System.out.println("error: "+ e);
		}


	}
}
