package com.vivek08v.server.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.vivek08v.server.model.User;

@Repository
public class UserRepo {

    private JdbcTemplate template;

    @Autowired
    public void setTemplate(JdbcTemplate template){
        this.template = template;
    }

    public JdbcTemplate getTemplate(){
        return template;
    }

    public void save(User user){
        System.out.println("Added...");

        String sql = "insert into user (id, name, phone, email, address) values (?, ?, ?, ?, ?)";
        template.update(sql, user.getId(), user.getName(), user.getPhone(), user.getEmail(), user.getAddress());
        System.out.println("Added succesfully...");
    }

    public List<User> findAll() {
        String sql = "SELECT * FROM `user`";

        List<User> allUsers = template.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setPhone(rs.getString("phone"));
            user.setEmail(rs.getString("email"));
            user.setAddress(rs.getString("address"));
            return user;
        });

        return allUsers;
    }

}
