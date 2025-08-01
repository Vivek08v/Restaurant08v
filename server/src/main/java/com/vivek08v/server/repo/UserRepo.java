package com.vivek08v.server.repo;

import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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

    // public void saveUser(User user){
    //     System.out.println("Added...");

    //     String sql = "insert into user (id, name, email, address) values (?, ?, ?, ?)";
    //     template.update(sql, user.getId(), user.getName(), user.getEmail(), user.getAddress());
    //     System.out.println("Added succesfully...");
    // }

    public User saveUser(User user) {
        String sql = "INSERT INTO user (name, email, address) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getAddress());
            return ps;
        }, keyHolder);
    
        // Retrieve and set the generated ID
        user.setId(keyHolder.getKey().intValue());
    
        System.out.println("Added successfully with ID = " + user.getId());
        return user;
    }

    public List<User> findAllUsers() {
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
