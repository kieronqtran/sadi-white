package sadi.whitegroup.assignment1.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.controller.errors.BadRequestAlertException;
import sadi.whitegroup.assignment1.controller.util.HeaderUtil;
import sadi.whitegroup.assignment1.entity.Question;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Testing;
import sadi.whitegroup.assignment1.security.AuthoritiesConstants;
import sadi.whitegroup.assignment1.service.TestingService;
import sadi.whitegroup.assignment1.service.dto.TestDTO;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TestController {

    private final Logger log = LoggerFactory.getLogger(TestController.class);

    private final TestingService testingService;

    public TestController(TestingService testingService) {
        this.testingService = testingService;
    }

    /**
     * GET  /testings/:id : get the "id" testing.
     *
     * @param id the id of the testing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testing, or with status 404 (Not Found)
     */
    @GetMapping("/testings/{id}")
    public ResponseEntity<Testing> getTesting(@PathVariable Long id) {
        log.debug("REST request to get Testing : {}", id);
        return testingService.findOne(id)
                .map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/testing/type", method = RequestMethod.GET)
    public List<TestTypeDTO> getAllTypes() {
        return testingService.getTypes();
    }

    @RequestMapping(value = "/testing/result", method = RequestMethod.POST)
    public Result saveResult(@Valid @RequestBody StudentAnswerDTO studentAnswer) {
        return testingService.markingAnswer(studentAnswer);
    }

    /**
     * POST  /testings : Create a new testing.
     *
     * @param testing the testing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testing, or with status 400 (Bad Request) if the testing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testings")
    public ResponseEntity<Testing> createTesting(@RequestBody Testing testing) throws URISyntaxException {
        log.debug("REST request to save Testing : {}", testing);
        if (testing.getId() != null) {
            throw new BadRequestAlertException("A new testing cannot already have an ID", "Testing", "idexists");
        }
        Testing result = testingService.save(testing);
        return ResponseEntity.created(new URI("/api/testings/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("Testing", result.getId().toString()))
                .body(result);
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
    public ResponseEntity<Testing> updateTesting(@RequestBody Testing testing) throws URISyntaxException {
        log.debug("REST request to update Testing : {}", testing);
        if (testing.getId() == null) {
            return createTesting(testing);
        }
        Testing result = testingService.save(testing);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("Testing", testing.getId().toString()))
                .body(result);
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

    /**
     * DELETE  /testings/:id : delete the "id" testing.
     *
     * @param id the id of the testing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/testings/{id}")
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteTesting(@PathVariable Long id) {
        log.debug("REST request to delete Testing : {}", id);
        testingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("Testing", id.toString())).build();
    }

    @GetMapping("/testings/{id}")
    public TestDTO getTestQuestions(@PathVariable Long id) {
        Optional<Testing> testing = testingService.findOne(id);
        List<Question> questions = (List<Question>) testing.get().getQuestions();
        Collections.shuffle(questions);
        testing.get().setQuestions(questions);
        return testing.map(TestDTO::new)
            .orElseThrow(() -> new RuntimeException("Test not found/"));
    }
}
