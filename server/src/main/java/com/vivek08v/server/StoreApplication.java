package com.vivek08v.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

// import com.vivek08v.server.model.TableBooking;
import com.vivek08v.server.repo.TableBookingRepo;
import com.vivek08v.server.repo.UserRepo;

@SpringBootApplication
public class StoreApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(StoreApplication.class, args);

		try {
			// User user = context.getBean(User.class);
			// user.setId(111);
			// user.setName("Vivek");
			// user.setPhone("9608288736");
			// user.setEmail("vivek08@gmail.com");
			// user.setAddress("India");

			TableBookingRepo tabBookRepo = context.getBean(TableBookingRepo.class);
			System.out.println(tabBookRepo.findAll());
			
			UserRepo repo = context.getBean(UserRepo.class);
			// repo.save(user);
			System.out.println(repo.findAll());
		} 
		catch (Exception e) {
			System.out.println("error: "+ e);
		}


	}
}
