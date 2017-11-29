package sadi.whitegroup.assignment1.service.dto;

import org.hibernate.validator.constraints.Email;
import sadi.whitegroup.assignment1.entity.Authority;
import sadi.whitegroup.assignment1.entity.User;

import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

    private Long id;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    @Size(min = 11, max = 13)
    private String phone;

    private boolean activated = false;

    private Set<String> authorities;

    public UserDTO() {}

    public UserDTO(User user) {
        this(user.getId(), user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getPhone(),
            user.getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()));
    }

    public UserDTO(Long id, String firstName, String lastName,
                   String email, String phone,
                   Set<String> authorities) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.authorities = authorities;
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

    public Set<String> getAuthorities() {
        return authorities;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", phone=" + phone +
            ", authorities=" + authorities +
            "}";
    }
}
