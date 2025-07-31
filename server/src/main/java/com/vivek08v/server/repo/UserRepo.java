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

        String sql = "insert into user (id, name, email, address) values (?, ?, ?, ?)";
        template.update(sql, user.getId(), user.getName(), user.getEmail(), user.getAddress());
        System.out.println("Added succesfully...");
    }

    public List<User> findAll() {
        String sql = "SELECT * FROM user";

        List<User> allUsers = template.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setAddress(rs.getString("address"));
            return user;
        });

        return allUsers;
    }


    public User findByEmail(String email) {
        String sql = "SELECT * FROM user WHERE email = ?";
        try {
            return template.queryForObject(sql, (rs, rowNum) -> {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setPassword(rs.getString("password"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setAddress(rs.getString("address"));
                return user;
            }, email);
        } catch (Exception e) {
            // Could be EmptyResultDataAccessException
            System.out.println("User not found for email: " + email);
            return null;
        }
    }


    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM user WHERE email = ?";
        Integer count = template.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

}
