package sadi.whitegroup.assignment1.security;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.hamcrest.Matchers.isEmptyString;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import sadi.whitegroup.assignment1.Assignment1Application;
import sadi.whitegroup.assignment1.controller.dto.LoginDTO;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.UserRepository;

import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Assignment1Application.class)
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private MockMvc mockMvc;

    @Before
    public void init() {
        AuthenticationController authenticationController = new AuthenticationController();
        this.mockMvc = MockMvcBuilders.standaloneSetup(authenticationController)
                .build();
    }

    @Test
    @Transactional
    public void getAuthorize() throws Exception {
        User user = new User();
        user.setEmail("john.smith@gmail.com");
        user.setPassword(passwordEncoder.encode("test"));

        userRepository.save(user);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("john.smith@gmail.com");
        loginDTO.setPassword("test");
        ObjectMapper mapper = new ObjectMapper();
        String loginJSON = mapper.writeValueAsString(loginDTO);
        MediaType media = new MediaType(
                MediaType.APPLICATION_JSON.getType(),
                MediaType.APPLICATION_JSON.getSubtype(), StandardCharsets.UTF_8);
        mockMvc.perform(post("/api/authenticate")
        .contentType(media)
        .content(loginJSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id_token").isString())
        .andExpect(jsonPath("$.id_token").isNotEmpty())
        .andExpect(header().string("Authorization", not(nullValue())))
        .andExpect(header().string("Authorization", not(isEmptyString())));
    }
}
