package sadi.whitegroup.assignment1.service.dto;

import org.hibernate.validator.constraints.Email;
import sadi.whitegroup.assignment1.entity.Authority;
import sadi.whitegroup.assignment1.entity.User;

import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

public class User_UserDTO {
    private Long id;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    @Size(min = 10, max = 13)
    private String phone;

    public User_UserDTO() {}

    public User_UserDTO(User user) {
        this(user.getId(), user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getPhone());
    }

    public User_UserDTO(Long id, String firstName, String lastName,
                   String email, String phone) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", phone=" + phone +
            "}";
    }
}
