package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.security.Role;

public class UserDTO {
    private long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String phone;
    private Role role;

    public UserDTO(){}

    public UserDTO(long id, String firstname, String lastname, String phone, Role role) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.role = role;
    }

    public UserDTO(User user){
        this(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getRole());
    }

    public String getEmail() {
        return email;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
