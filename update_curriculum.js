const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Add Lessons to CURRICULUM
const newLessons = [
  {
    "id": "ds-mod1-00a",
    "title": "Intro to Data Science",
    "domain": "Data Science",
    "topic": "Module 1: The Data Toolkit (Python Essentials)",
    "difficulty": "beginner",
    "content_md": `# Introduction to Data Science\n\nData Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines mathematics, statistics, programming, and domain expertise to solve complex problems.\n\n**Real-world Analogy**: Think of Data Science like being a detective. A detective looks at clues (data) left at a scene, processes them (data cleaning), analyzes them for patterns (modeling), and finally solves the case (business insights).\n\n### Key Definitions\n- **Data**: Raw facts and statistics collected for reference or analysis.\n- **Algorithm**: A step-by-step procedure for solving a problem.\n- **Insight**: A deep understanding derived from data analysis.\n\n### Important Points\n- Data Science requires a mix of hard skills (coding, math) and soft skills (communication, problem-solving).\n- 80% of a Data Scientist's job is often data cleaning and preparation.\n- Ethics and privacy are critical considerations when handling user data.\n\n### Industry Use Cases\n- **Healthcare**: Predicting patient readmissions or detecting tumors from MRI scans.\n- **E-commerce**: Recommending products based on browsing history.\n- **Finance**: Detecting fraudulent credit card transactions in real-time.`
  },
  {
    "id": "ds-mod1-00b",
    "title": "Intro to NumPy",
    "domain": "Data Science",
    "topic": "Module 1: The Data Toolkit (Python Essentials)",
    "difficulty": "beginner",
    "content_md": `# Introduction to NumPy\n\nNumPy (Numerical Python) is the foundational package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on these arrays efficiently.\n\n**Real-world Analogy**: Imagine you have to multiply every number in a giant spreadsheet by 2. Doing this cell by cell (like a standard Python list loop) takes forever. NumPy is like a magical wand that selects the entire sheet and multiplies it instantly (vectorization).\n\n### Key Definitions\n- **Array**: A grid of values, all of the same type, indexed by a tuple of nonnegative integers.\n- **Vectorization**: The process of applying operations to entire arrays instead of looping through individual elements.\n\n### Important Points\n- NumPy arrays are much faster and consume less memory than standard Python lists.\n- Elements in a NumPy array must all be of the same data type.\n- NumPy is the core library upon which Pandas and Scikit-Learn are built.\n\n### Industry Use Cases\n- **Image Processing**: Images are stored as 3D NumPy arrays (Height x Width x RGB channels).\n- **Finance**: Fast mathematical computations on large arrays of stock prices.`
  }
];

// Check if already inserted to prevent duplicates
const firstLessonId = data.CURRICULUM[0].topics[0].lessons[0].id;
if (firstLessonId !== 'ds-mod1-00a') {
  data.CURRICULUM[0].topics[0].lessons.unshift(...newLessons);
}

// 2. Add Quizzes
const newQuizzes = [
  {
    "id": "quiz-ds-mod1-00a",
    "lesson_id": "ds-mod1-00a",
    "title": "Intro to Data Science Quiz",
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "question": "Which of the following best defines Data Science?",
        "options": [
          "Building computer hardware.",
          "Extracting knowledge and insights from data.",
          "Writing web applications.",
          "Managing company finances."
        ],
        "correct_answer": "Extracting knowledge and insights from data.",
        "explanation": "Data Science focuses on analyzing data to find meaningful patterns and insights."
      },
      {
        "id": "q2",
        "type": "true_false",
        "question": "Data cleaning usually takes up the majority of a Data Scientist's time.",
        "options": ["True", "False"],
        "correct_answer": "True",
        "explanation": "It is widely recognized that data cleaning and preparation take up around 80% of the workflow."
      }
    ]
  },
  {
    "id": "quiz-ds-mod1-00b",
    "lesson_id": "ds-mod1-00b",
    "title": "Intro to NumPy Quiz",
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "question": "What is the primary data structure in NumPy?",
        "options": ["List", "Dictionary", "ndarray", "DataFrame"],
        "correct_answer": "ndarray",
        "explanation": "NumPy revolves around the N-dimensional array object (ndarray)."
      },
      {
        "id": "q2",
        "type": "true_false",
        "question": "NumPy arrays can contain a mix of strings, integers, and booleans in the same array.",
        "options": ["True", "False"],
        "correct_answer": "False",
        "explanation": "Unlike Python lists, NumPy arrays must contain elements of the same data type for performance reasons."
      }
    ]
  }
];

const hasQuizzes = data.QUIZZES.some(q => q.lesson_id === 'ds-mod1-00a');
if (!hasQuizzes) {
  data.QUIZZES.push(...newQuizzes);
}

// 3. Add Challenges (Case Study Based)
const newChallenges = [
  {
    "id": "ch-ds-mod1-00a",
    "lesson_id": "ds-mod1-00a",
    "title": "Case Study: The 'Brew Data' Coffee Shop",
    "prompt": "## Case Study: The 'Brew Data' Coffee Shop\n\nYou have just been hired as a Junior Data Analyst for a new tech-themed coffee shop called **'Brew Data'**. The owner wants to start tracking the shop's daily performance.\n\nBefore they can set up a full database, they want a simple Python script to record the shop's name and its first day's sales.\n\n### Lab Task\n1. Create a variable called `shop_name` and assign it the exact string `'Brew Data'`.\n2. Create another variable called `daily_sales` and assign it the integer `150`.\n3. Print a welcome report that says: `Welcome to Brew Data! Today's sales: 150`",
    "starter_code": "# TODO: Create variables shop_name and daily_sales\n\n\n# TODO: Print the welcome report\n",
    "grader_checks": [
      {
        "variable": "shop_name",
        "condition": "eq",
        "value": "Brew Data",
        "message": "shop_name must be 'Brew Data'"
      },
      {
        "variable": "daily_sales",
        "condition": "eq",
        "value": 150,
        "message": "daily_sales must be exactly 150"
      }
    ]
  },
  {
    "id": "ch-ds-mod1-00b",
    "lesson_id": "ds-mod1-00b",
    "title": "Case Study: Global Logistics Corp",
    "prompt": "## Case Study: Global Logistics Corp\n\nYou work as a Data Scientist for **Global Logistics Corp**. The company has collected an array of package weights in kilograms from their European warehouse.\n\nHowever, the shipping manifest for the US route requires the weights to be converted into pounds. (Note: 1 kg = 2.20462 lbs).\n\n### Lab Task\nInstead of using a slow Python list loop, use NumPy's vectorization to convert thousands of weights instantly.\n\n1. Import the `numpy` library.\n2. Create a NumPy array called `weights_kg` with the following values: `[10, 25, 40, 50]`.\n3. Using vectorization, create a new array `weights_lbs` by multiplying `weights_kg` by 2.20462.\n4. Calculate the total weight in pounds by summing the array and store it in `total_lbs`.",
    "starter_code": "import numpy as np\n\n# TODO: Create weights_kg\n\n# TODO: Create weights_lbs\n\n# TODO: Calculate total_lbs by summing weights_lbs\n",
    "grader_checks": [
      {
        "variable": "type(weights_kg).__name__",
        "condition": "eq",
        "value": "ndarray",
        "message": "weights_kg must be a NumPy array"
      },
      {
        "variable": "weights_kg.shape",
        "condition": "shape_check",
        "value": "(4,)",
        "message": "weights_kg should have 4 elements"
      },
      {
        "variable": "total_lbs",
        "condition": "eq",
        "value": 275.5775,
        "message": "total_lbs should be exactly 275.5775"
      }
    ]
  }
];

const hasChallenges = data.CHALLENGES.some(c => c.lesson_id === 'ds-mod1-00a');
if (!hasChallenges) {
  data.CHALLENGES.push(...newChallenges);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully updated data.json with Case Study Labs!');
