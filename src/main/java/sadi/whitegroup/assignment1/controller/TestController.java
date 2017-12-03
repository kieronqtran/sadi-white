package sadi.whitegroup.assignment1.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.AdminTestingDTO;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.controller.errors.BadRequestAlertException;
import sadi.whitegroup.assignment1.controller.util.HeaderUtil;
import sadi.whitegroup.assignment1.entity.Question;
import sadi.whitegroup.assignment1.entity.Testing;
import sadi.whitegroup.assignment1.security.AuthoritiesConstants;
import sadi.whitegroup.assignment1.service.TestingService;
import sadi.whitegroup.assignment1.service.dto.TestingDTO;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {

    private final Logger log = LoggerFactory.getLogger(TestController.class);

    private final TestingService testingService;

    public TestController(TestingService testingService) {
        this.testingService = testingService;
    }

    /**
     * POST  /testings/result : marking the answer.
     *
     * @param testing the testing to create
     * @return the ResponseEntity with status 201 (Created) for marking done,
     * or with status 400 (Bad Request) if invalid input
     */
    @RequestMapping(value = "/testing/result", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveResult(@Valid @RequestBody StudentAnswerDTO studentAnswer) {
        testingService.markingAnswer(studentAnswer);
    }

    /**
     * POST  /testings : Create a new testing.
     *
     * @param testing the testing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testing, or with status 400 (Bad Request) if the testing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testings")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured(AuthoritiesConstants.ADMIN)
    public void createTesting(@RequestBody AdminTestingDTO testing) throws URISyntaxException {
        log.debug("REST request to save Testing : {}", testing);
         if (testing.getId() != null) {
             throw new BadRequestAlertException("A new testing cannot already have an ID", "Testing", "idexists");
         }
        testingService.save(testing);
    }

    /**
     * PUT  /testings : Updates an existing testing.
     *
     * @param testing the testing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testing,
     * or with status 400 (Bad Request) if the testing is not valid,
     * or with status 500 (Internal Server Error) if the testing couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/testings")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<AdminTestingDTO> updateTesting(@RequestBody AdminTestingDTO testing) throws URISyntaxException {
        log.debug("REST request to update Testing : {}", testing);

        AdminTestingDTO result = new AdminTestingDTO(testingService.save(testing));
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("Testing", testing.getId().toString()))
                .body(result);
    }

    /**
     * GET  /testings/:id : get the "id" testing.
     *
     * @param id the id of the testing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testing, or with status 404 (Not Found)
     */

    @GetMapping("/testings/{id}")
    @Transactional // fix lazy init
    public TestingDTO getTestQuestions(@PathVariable Long id) {
        return testingService.findOne(id)
            .map(testing -> {
                List<Question> questions = testing.getQuestions();
                Collections.shuffle(questions);
                testing.setQuestions(questions);
                return testing;
            })
            .map(TestingDTO::new)
            .orElseThrow(() -> new RuntimeException("Test not found"));
    }

    /**
     * GET  /testings/:id : get the "id" testing.
     *
     * @param id the id of the testing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testing, or with status 404 (Not Found)
     */

    @GetMapping("/testings/{id}/admin")
    @Secured(AuthoritiesConstants.ADMIN)
    @Transactional // fix lazy init
    public AdminTestingDTO getTestingEntity(@PathVariable Long id) {
        return testingService.findOne(id)
            .map(AdminTestingDTO::new)
            .orElseThrow(() -> new RuntimeException("Test not found"));
    }

    /**
     * GET  /testings : get all the testings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testings in body
     */

    @GetMapping("/testings")
    public List<Testing> getAllTestings() {
        log.debug("REST request to get all Testings");
        return testingService.findAll();
    }


    @DeleteMapping("/testings/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    public void deleteTesting(@PathVariable Long id) {
        testingService.delete(id);
    }

}
