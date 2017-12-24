const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.type) {
    errors.type = "Required";
  }

  if (!values.testTime) {
    errors.testTime = "Required";
  }

  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: "At least one question must be entered" };
  } else {
    const questionsArrayErrors = [];
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {};
      if (!question || !question.question) {
        questionErrors.question = "Required";
        questionsArrayErrors[questionIndex] = questionErrors;
      }
      if (question && question.answer && question.answer.length) {
        const answerArrayErrors = [];
        question.answer.forEach((answer, answerIndex) => {
          if (!answer || !answer.length) {
            answerArrayErrors[answerIndex] = "Required";
          }
        });
        if (answerArrayErrors.length) {
          questionErrors.answer = answerArrayErrors;
          questionsArrayErrors[questionIndex] = questionErrors;
        }
        if (question.answer.length > 5) {
          if (!questionErrors.answer) {
            questionErrors.answer = [];
          }
          questionErrors.answer._error = "No more than five answers allowed";
          questionsArrayErrors[questionIndex] = questionErrors;
        }
      }
    });
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors;
    }
  }
  return errors;
};

export default validate;
