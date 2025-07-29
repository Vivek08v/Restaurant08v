package com.vivek08v.server.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.vivek08v.server.model.TableBooking;
// import java.collections;

@Repository
public class TableBookingRepo {
    private JdbcTemplate template;

    @Autowired
    public void setTemplate(JdbcTemplate template){
        this.template = template;
    }

    public JdbcTemplate getTemplate(){
        return this.template;
    }

    public void save(TableBooking tabBook){
        String sql = "insert into tableBooking (id, userId, numberOfPeoples, dateTime, status) values (?, ?, ?, ?, ?)";
        template.update(sql, tabBook.getId(), tabBook.getUserId(), tabBook.getNumberOfPeople(), tabBook.getDateTime(), tabBook.getStatus());
        System.out.println("successfully table booked...");
    }

    public List<TableBooking> findAll(){
        String sql = "select * from tableBooking";
        List<TableBooking> allBookedTables = template.query(sql, (rs, rowNo) -> {
            TableBooking tabBook = new TableBooking();
            tabBook.setId(rs.getInt("id"));
            tabBook.setUserId(rs.getInt("userid"));
            tabBook.setNumberOfPeople(rs.getInt("noOfPeople"));
            tabBook.setDateTime(rs.getTimestamp("dateTime").toLocalDateTime());
            tabBook.setStatus(rs.getString("status"));
            return tabBook;
        });

        return allBookedTables;
    }
}
