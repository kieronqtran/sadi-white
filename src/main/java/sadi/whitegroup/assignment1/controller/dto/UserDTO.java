package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.security.Role;

public class UserDTO {

    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    private Role role;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this(user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                Role.valueOf(user.getRole()));
    }

    public UserDTO(String email, String firstName, String lastName, String phone, Role role) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
