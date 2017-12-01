package sadi.whitegroup.assignment1.controller.vm;

import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.service.dto.UserDTO;

import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;
    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    public ManagedUserVM() {}

    public ManagedUserVM(Long id, String password, String firstName, String lastName,
                         String email, String phone, Set<String> authorities) {

        super(id, firstName, lastName, email, phone, authorities);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "ManagedUserVM{" +
            "} " + super.toString();
    }
}
