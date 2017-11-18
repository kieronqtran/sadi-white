package sadi.whitegroup.assignment1.controller;

import org.springframework.web.bind.annotation.*;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Test;
import sadi.whitegroup.assignment1.service.ResultService;
import sadi.whitegroup.assignment1.service.TestService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @RequestMapping(value = "/test/type", method = RequestMethod.GET)
    public List<TestTypeDTO> getAllTypes() {
        return testService.getTypes();
    }

    @RequestMapping(value = "/test/{id}", method = RequestMethod.GET)
    public Test getTestById(@PathVariable Long id) {
        return testService.getTestById(id);
    }

    @RequestMapping(value = "/result", method = RequestMethod.POST)
    public Result saveResult(@Valid @RequestBody StudentAnswerDTO studentAnswer) {
        return testService.markingAnswer(studentAnswer);
    }
}
