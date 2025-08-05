package com.vivek08v.server.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.vivek08v.server.model.MenuItem;

@Repository
public class MenuItemRepo {
    private JdbcTemplate template;

    @Autowired
    public void setTemplate(JdbcTemplate template){
        this.template = template;
    }

    public JdbcTemplate getTemplate(){
        return this.template;
    }

    public List<MenuItem> findAllMenuItemDetails(){
        String sql = "SELECT * FROM menuItem";
        List<MenuItem> allMenuList = template.query(sql, (rs, num) -> {
            MenuItem menuItem = new MenuItem();
            menuItem.setId(rs.getInt("id"));
            menuItem.setName(rs.getString("name"));
            menuItem.setCategory(rs.getString("category"));
            menuItem.setPrice(rs.getFloat("price"));
            menuItem.setQuantity(rs.getInt("quantity"));
            menuItem.setIsVeg(rs.getBoolean("isVeg"));
            return menuItem;
        });
        return allMenuList;
    }

    // public TableBooking saveBooking(TableBooking tabBook){
    //     String sql = "insert into tableBooking (userId, noOfPeoples, date, time, status) values (?, ?, ?, ?, ?)";
    //     KeyHolder keyHolder = new GeneratedKeyHolder();
        
    //     template.update(connection -> {
    //         PreparedStatement ps = connection.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);
    //         ps.setInt(1, tabBook.getUserId());
    //         ps.setInt(2, tabBook.getNoOfSeats());
    //         ps.setDate(3, java.sql.Date.valueOf(tabBook.getDate()));
    //         ps.setTime(4, java.sql.Time.valueOf(tabBook.getTime()));
    //         ps.setString(5, tabBook.getStatus());
    //         return ps;
    //     }, keyHolder);

    //     tabBook.setId(keyHolder.getKey().intValue());

    //     System.out.println("Added successfully with ID = " + tabBook.getId());
    //     return tabBook;
    // }

    // public List<TableBooking> findMyBookings(Integer userId){
    //     String sql = "SELECT * FROM tablebooking WHERE userId = ?";
    //     List<TableBooking> myBookedTables = template.query(sql, (rs, rowNo) -> {
    //         TableBooking tabBook = new TableBooking();
    //         tabBook.setId(rs.getInt("id"));
    //         tabBook.setUserId(rs.getInt("userId"));
    //         tabBook.setNoOfSeats(rs.getInt("noOfPeoples"));
    //         tabBook.setDate(rs.getDate("date").toLocalDate());
    //         tabBook.setTime(rs.getTime("time").toLocalTime());
    //         tabBook.setStatus(rs.getString("status"));
    //         return tabBook;
    //     }, userId);

    //     return myBookedTables;
    // }

    // public List<TableBooking> findAllBookings(){
    //     String sql = "SELECT * FROM tablebooking";
    //     List<TableBooking> allBookedTables = template.query(sql, (rs, rowNo) -> {
    //         TableBooking tabBook = new TableBooking();
    //         tabBook.setId(rs.getInt("id"));
    //         tabBook.setUserId(rs.getInt("userId"));
    //         tabBook.setNoOfSeats(rs.getInt("noOfPeoples"));
    //         tabBook.setDate(rs.getDate("date").toLocalDate());
    //         tabBook.setTime(rs.getTime("time").toLocalTime());
    //         tabBook.setStatus(rs.getString("status"));
    //         return tabBook;
    //     });

    //     return allBookedTables;
    // }
}
