export const mathQuizzes = [
  {
    id: "1",
    question: "What is the result of 15 + 27?",
    options: ["40", "42", "45", "47"],
    correctAnswer: 1,
    explanation: "15 + 27 = 42. To add these numbers, you can break them down: 15 + 20 = 35, then 35 + 7 = 42.",
    subject: "Mathematics"
  },
  {
    id: "2", 
    question: "If a rectangle has a length of 8 cm and width of 5 cm, what is its area?",
    options: ["13 cm²", "26 cm²", "40 cm²", "45 cm²"],
    correctAnswer: 2,
    explanation: "Area of a rectangle = length × width = 8 × 5 = 40 cm²",
    subject: "Mathematics"
  },
  {
    id: "3",
    question: "What is 3/4 expressed as a decimal?",
    options: ["0.25", "0.5", "0.75", "1.25"],
    correctAnswer: 2,
    explanation: "To convert 3/4 to decimal, divide 3 by 4: 3 ÷ 4 = 0.75",
    subject: "Mathematics"
  }
];

export const scienceQuizzes = [
  {
    id: "1",
    question: "What gas do plants absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1,
    explanation: "Plants absorb carbon dioxide (CO₂) from the atmosphere and use it along with water and sunlight to produce glucose and oxygen through photosynthesis.",
    subject: "Science"
  },
  {
    id: "2",
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    correctAnswer: 2,
    explanation: "Mercury is the closest planet to the Sun, with an average distance of about 58 million kilometers from the Sun.",
    subject: "Science"
  },
  {
    id: "3",
    question: "What is the chemical symbol for water?",
    options: ["H₂O", "CO₂", "NaCl", "O₂"],
    correctAnswer: 0,
    explanation: "Water has the chemical formula H₂O, meaning it contains 2 hydrogen atoms and 1 oxygen atom.",
    subject: "Science"
  }
];

export const technologyQuizzes = [
  {
    id: "1",
    question: "What does CPU stand for in computer terminology?",
    options: ["Computer Processing Unit", "Central Processing Unit", "Computer Program Unit", "Central Program Unit"],
    correctAnswer: 1,
    explanation: "CPU stands for Central Processing Unit. It's the main component of a computer that performs calculations and executes instructions.",
    subject: "Technology"
  },
  {
    id: "2",
    question: "Which programming concept allows code to be reused?",
    options: ["Variables", "Functions", "Comments", "Errors"],
    correctAnswer: 1,
    explanation: "Functions allow programmers to write reusable blocks of code that can be called multiple times with different inputs.",
    subject: "Technology"
  }
];

export const engineeringQuizzes = [
  {
    id: "1",
    question: "What type of bridge is the Golden Gate Bridge?",
    options: ["Arch Bridge", "Suspension Bridge", "Beam Bridge", "Truss Bridge"],
    correctAnswer: 1,
    explanation: "The Golden Gate Bridge is a suspension bridge, characterized by its main cables suspended between towers that support the bridge deck.",
    subject: "Engineering"
  },
  {
    id: "2",
    question: "Which simple machine is a ramp?",
    options: ["Lever", "Pulley", "Inclined Plane", "Wheel and Axle"],
    correctAnswer: 2,
    explanation: "A ramp is an inclined plane, which is one of the six classical simple machines that makes it easier to move objects by reducing the force needed.",
    subject: "Engineering"
  }
];

export const getQuizzesBySubject = (subject: string) => {
  switch (subject.toLowerCase()) {
    case 'math':
    case 'mathematics':
      return mathQuizzes;
    case 'science':
      return scienceQuizzes;
    case 'technology':
      return technologyQuizzes;
    case 'engineering':
      return engineeringQuizzes;
    default:
      return mathQuizzes;
  }
};