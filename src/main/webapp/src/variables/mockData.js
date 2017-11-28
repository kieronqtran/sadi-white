const testData = [
  {
    id: '1',
    name: 'Test 1',
    size: 10,
    duration: 300000,
    questions: [
      {
        type: 'multiple-choice',
        content: 'example question 1',
        answer: [
          {
            content: 'the true answer',
            isCorrectAnswer: true,
          },
          {
            content: 'the false answer 1',
            isCorrectAnswer: false,
          },
          {
            content: 'the false answer 2',
            isCorrectAnswer: false,
          },
          {
            content: 'the false answer 3',
            isCorrectAnswer: false,
          },
          {
            content: 'the false answer 4',
            isCorrectAnswer: false,
          },
        ],
      },
      {
          type: 'multiple-choice',
          content: 'example question 1',
          answer: [
              {
                  content: 'the true answer',
                  isCorrectAnswer: true,
              },
              {
                  content: 'the false answer 1',
                  isCorrectAnswer: false,
              },
              {
                  content: 'the false answer 2',
                  isCorrectAnswer: false,
              },
              {
                  content: 'the false answer 3',
                  isCorrectAnswer: false,
              },
              {
                  content: 'the false answer 4',
                  isCorrectAnswer: false,
              },
          ],
      }
    ]
  },
];

export { testData };
