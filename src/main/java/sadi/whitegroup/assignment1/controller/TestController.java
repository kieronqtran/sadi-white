package sadi.whitegroup.assignment1.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Test;
import sadi.whitegroup.assignment1.service.ResultService;
import sadi.whitegroup.assignment1.service.TestService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {
    private final TestService testService;
    private final ResultService resultService;


    public TestController(TestService testService, ResultService resultService) {
        this.testService = testService;
        this.resultService = resultService;
    }

    @RequestMapping(value = "/test/type", method = RequestMethod.GET)
    public List<TestTypeDTO> getAllTypes() {
        return testService.getTypes();
    }

    @RequestMapping(value = "/test/{id}", method = RequestMethod.GET)
    public Test getTestById(Long id) {
        return testService.getTestById(id);
    }

    @RequestMapping(value = "/result", method = RequestMethod.POST)
    public Result saveResult(@RequestBody StudentAnswer studentAnswer) {
        Result result = testService.markingAnswer(studentAnswer);
        return result;
    }
}
