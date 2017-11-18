package sadi.whitegroup.assignment1.controller.dto;

public class ManagedUserDTO {
    private String email;
    private String password;

    public ManagedUserDTO() {
    }

    public ManagedUserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
