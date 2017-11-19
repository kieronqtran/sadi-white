package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.security.Role;

import java.util.Optional;

public class UserDTO {
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private Role role;

    public UserDTO(){}

    public UserDTO(String email, String firstname, String lastname, String phone, String role) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.role = Role.valueOf(role);
    }

    public UserDTO(User user){
        this(user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhone(),
            user.getRole());
    }

    public String getEmail() {
        return email;
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
}
