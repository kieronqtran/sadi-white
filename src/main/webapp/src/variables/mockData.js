const testTh = ["Id", "Name", "Size", "Duration", "Take Test"];
const testData = [
  {
    id: "1",
    name: "Test 1",
    size: 10,
    duration: 300000,
    questions: [
      {
        type: "multiple-choice",
        content: "example question 1",
        answer: [
          {
            content: "the true answer",
            isCorrectAnswer: true
          },
          {
            content: "the false answer 1",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 2",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 3",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 4",
            isCorrectAnswer: false
          }
        ]
      },
      {
        type: "multiple-choice",
        content: "example question 1",
        answer: [
          {
            content: "the true answer",
            isCorrectAnswer: true
          },
          {
            content: "the false answer 1",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 2",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 3",
            isCorrectAnswer: false
          },
          {
            content: "the false answer 4",
            isCorrectAnswer: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    type: "Information Technology",
    name: "SADI - Assignment 1",
    size: 10,
    duration: 600000,
    questions: [
      {
        id: 1,
        content: "Question Number 1 - Nemo nam architecto et commodi est.",
        answers: [
          {
            id: 1,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 2,
            content: "this is true answer.",
            is_correct_answer: true
          }
        ]
      },
      {
        id: 2,
        content:
          "Question Number 2 - Aut nam odio sit sunt molestiae dolores necessitatibus molestiae.",
        answers: [
          {
            id: 3,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 4,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 5,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 3,
        content:
          "Question Number 3 - Doloribus nisi quia nostrum nostrum nulla sit.",
        answers: [
          {
            id: 6,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 7,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 8,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 9,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 10,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 4,
        content: "Question Number 4 - Expedita in numquam.",
        answers: [
          {
            id: 11,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 12,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 13,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 5,
        content:
          "Question Number 5 - Repudiandae sequi et aut non et quisquam.",
        answers: [
          {
            id: 14,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 15,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 16,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 17,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 6,
        content: "Question Number 6 - Labore odio eveniet reiciendis.",
        answers: [
          {
            id: 18,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 19,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 20,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 21,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 22,
            content: "this is true answer.",
            is_correct_answer: true
          }
        ]
      },
      {
        id: 7,
        content: "Question Number 7 - Voluptate odio ut repellat fugiat velit.",
        answers: [
          {
            id: 23,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 24,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 8,
        content:
          "Question Number 8 - Optio quae facere qui et dignissimos inventore sed eum.",
        answers: [
          {
            id: 25,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 26,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 27,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 9,
        content:
          "Question Number 9 - Voluptatibus assumenda accusamus consequuntur molestiae.",
        answers: [
          {
            id: 28,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 29,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 10,
        content:
          "Question Number 10 - Aliquid praesentium eligendi eligendi quidem explicabo in ullam.",
        answers: [
          {
            id: 30,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 31,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 32,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      }
    ]
  }
];

const testSample = [
  {
    id: 1,
    type: "Information Technology",
    name: "SADI - Assignment 1",
    size: 10,
    test_time: 600000,
    questions: [
      {
        id: 1,
        content: "Question Number 1 - Nemo nam architecto et commodi est.",
        answers: [
          {
            id: 1,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 2,
            content: "this is true answer.",
            is_correct_answer: true
          }
        ]
      },
      {
        id: 2,
        content:
          "Question Number 2 - Aut nam odio sit sunt molestiae dolores necessitatibus molestiae.",
        answers: [
          {
            id: 3,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 4,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 5,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 3,
        content:
          "Question Number 3 - Doloribus nisi quia nostrum nostrum nulla sit.",
        answers: [
          {
            id: 6,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 7,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 8,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 9,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 10,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 4,
        content: "Question Number 4 - Expedita in numquam.",
        answers: [
          {
            id: 11,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 12,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 13,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 5,
        content:
          "Question Number 5 - Repudiandae sequi et aut non et quisquam.",
        answers: [
          {
            id: 14,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 15,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 16,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 17,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 6,
        content: "Question Number 6 - Labore odio eveniet reiciendis.",
        answers: [
          {
            id: 18,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 19,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 20,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 21,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 22,
            content: "this is true answer.",
            is_correct_answer: true
          }
        ]
      },
      {
        id: 7,
        content: "Question Number 7 - Voluptate odio ut repellat fugiat velit.",
        answers: [
          {
            id: 23,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 24,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 8,
        content:
          "Question Number 8 - Optio quae facere qui et dignissimos inventore sed eum.",
        answers: [
          {
            id: 25,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 26,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 27,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 9,
        content:
          "Question Number 9 - Voluptatibus assumenda accusamus consequuntur molestiae.",
        answers: [
          {
            id: 28,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 29,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 10,
        content:
          "Question Number 10 - Aliquid praesentium eligendi eligendi quidem explicabo in ullam.",
        answers: [
          {
            id: 30,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 31,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 32,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    type: "Information Technology",
    name: "SADI - Assignment 1",
    size: 5,
    test_time: 600000,
    questions: [
      {
        id: 1,
        content: "Question Number 1 - Nemo nam architecto et commodi est.",
        answers: [
          {
            id: 1,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 2,
            content: "this is true answer.",
            is_correct_answer: true
          }
        ]
      },
      {
        id: 2,
        content:
          "Question Number 2 - Aut nam odio sit sunt molestiae dolores necessitatibus molestiae.",
        answers: [
          {
            id: 3,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 4,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 5,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 3,
        content:
          "Question Number 3 - Doloribus nisi quia nostrum nostrum nulla sit.",
        answers: [
          {
            id: 6,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 7,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 8,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 9,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 10,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 4,
        content: "Question Number 4 - Expedita in numquam.",
        answers: [
          {
            id: 11,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 12,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 13,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      },
      {
        id: 5,
        content:
          "Question Number 5 - Repudiandae sequi et aut non et quisquam.",
        answers: [
          {
            id: 14,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 15,
            content: "this is true answer.",
            is_correct_answer: true
          },
          {
            id: 16,
            content: "this is false answer.",
            is_correct_answer: false
          },
          {
            id: 17,
            content: "this is false answer.",
            is_correct_answer: false
          }
        ]
      }
    ]
  }
];

export { testData, testTh, testSample };
