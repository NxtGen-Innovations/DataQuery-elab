const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const topicName = "Module 1: The Data Toolkit (Python Essentials)";
let topicObj = data.CURRICULUM[0].topics.find(t => t.topic === topicName);

const newLessons = [
  {
    "id": "ds-mod1-02-facets",
    "title": "Facets of Data",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Facets of Data\n\nData comes in many forms. Understanding these facets helps in deciding the right tools for analysis.\n\n### Key Types:\n1. **Structured Data**: Highly organized, tabular (e.g., SQL databases, CSVs).\n2. **Unstructured Data**: No predefined format (e.g., text, images, videos).\n3. **Semi-structured Data**: Has some organizational properties like tags (e.g., JSON, XML).\n\n**Case Study context**: A company processing customer reviews must handle unstructured text data, while dealing with their financial records involves structured data."
  },
  {
    "id": "ds-mod1-03-process",
    "title": "Data Science Process",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Data Science Process\n\nThe standard workflow, often aligned with CRISP-DM:\n1. **Business Understanding**: What is the problem?\n2. **Data Acquisition**: Gathering data from APIs, databases, or scraping.\n3. **Data Preparation**: Cleaning, handling missing values, standardizing (takes 80% of time).\n4. **Modeling**: Applying ML algorithms.\n5. **Evaluation**: Testing model accuracy.\n6. **Deployment**: Pushing the model to production."
  },
  {
    "id": "ds-mod1-04-create-arrays",
    "title": "Creating Arrays",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Creating Arrays in NumPy\n\nYou can create arrays from Python lists using `np.array()`, or use built-in functions like:\n- `np.zeros((3,3))` for an array of zeros.\n- `np.ones((2,2))` for an array of ones.\n- `np.arange(0, 10, 2)` to generate a sequence (0, 2, 4, 6, 8)."
  },
  {
    "id": "ds-mod1-05-attributes",
    "title": "NumPy Array Attributes",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# NumPy Array Attributes\n\nEvery NumPy array has attributes that describe its metadata:\n- `.ndim`: Number of dimensions (1D, 2D, 3D).\n- `.shape`: A tuple indicating the size of each dimension (e.g., `(3, 4)` is 3 rows, 4 columns).\n- `.size`: Total number of elements.\n- `.dtype`: The data type of the elements (e.g., `int64`, `float64`)."
  },
  {
    "id": "ds-mod1-06-ops",
    "title": "Array Operations",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Array Operations\n\nNumPy supports element-wise operations through vectorization.\n- `a + b` adds corresponding elements.\n- `a * b` multiplies corresponding elements (Hadamard product).\n- `np.dot(a, b)` performs dot product (matrix multiplication)."
  },
  {
    "id": "ds-mod1-07-series",
    "title": "Pandas Series",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Pandas Series\n\nA Series is a one-dimensional labeled array capable of holding any data type. Think of it as a single column in an Excel sheet.\nUnlike a NumPy array, a Series has an explicit index (labels for rows) which makes data retrieval easier."
  },
  {
    "id": "ds-mod1-08-dfs",
    "title": "Pandas DataFrames",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Pandas DataFrames\n\nA DataFrame is a 2-dimensional labeled data structure with columns of potentially different types. It is the primary object in Pandas.\nIt operates like a SQL table or a dict of Series objects."
  },
  {
    "id": "ds-mod1-09-acquisition",
    "title": "Data Acquisition & Info Gathering",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Data Acquisition\n\nData rarely sits nicely in a CSV. You must know how to pull it from:\n- **APIs**: Using the `requests` library to fetch JSON.\n- **Databases**: Using `SQLAlchemy` or `psycopg2`.\n- **Web Scraping**: Using `BeautifulSoup` or `Scrapy`."
  }
];

// Append missing ones
newLessons.forEach(nl => {
  if (!topicObj.lessons.some(l => l.id === nl.id)) {
    topicObj.lessons.push(nl);
  }
});

const newQuizzes = [
  {
    "id": "quiz-ds-mod1-02",
    "lesson_id": "ds-mod1-02-facets",
    "title": "Facets Quiz",
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "question": "What type of data is a CSV file?",
        "options": ["Structured", "Unstructured", "Semi-structured"],
        "correct_answer": "Structured"
      }
    ]
  },
  {
    "id": "quiz-ds-mod1-04",
    "lesson_id": "ds-mod1-04-create-arrays",
    "title": "Creating Arrays Quiz",
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "question": "Which function generates an array of a specified range?",
        "options": ["np.arange()", "np.zeros()", "np.linspace()"],
        "correct_answer": "np.arange()"
      }
    ]
  }
];

newQuizzes.forEach(nq => {
  if (!data.QUIZZES.some(q => q.lesson_id === nq.lesson_id)) {
    data.QUIZZES.push(nq);
  }
});

const newChallenges = [
  {
    "id": "ch-ds-mod1-04",
    "lesson_id": "ds-mod1-04-create-arrays",
    "title": "Case Study: Image Matrix Initialization",
    "prompt": "## Case Study: Image Processing Startup\n\nYou are working on an image processing algorithm. An image is represented as a matrix of pixels.\n\n### Task\nInitialize an empty 10x10 matrix using NumPy's `zeros()` function to act as a black canvas. Assign it to `black_canvas`.",
    "starter_code": "import numpy as np\n\n# TODO: Create a 10x10 matrix of zeros\n",
    "grader_checks": [
      {
        "variable": "black_canvas.shape",
        "condition": "shape_check",
        "value": "(10, 10)"
      }
    ]
  },
  {
    "id": "ch-ds-mod1-08",
    "lesson_id": "ds-mod1-08-dfs",
    "title": "Case Study: HR Employee Roster",
    "prompt": "## Case Study: HR Department\n\nYou are given lists of employee names and ages. Create a Pandas DataFrame `df` containing columns 'Name' and 'Age'.\n\nNames: ['Alice', 'Bob']\nAges: [25, 30]",
    "starter_code": "import pandas as pd\n\n# TODO: Create DataFrame df\n",
    "grader_checks": [
      {
        "variable": "df.shape",
        "condition": "shape_check",
        "value": "(2, 2)"
      }
    ]
  }
];

newChallenges.forEach(nc => {
  if (!data.CHALLENGES.some(c => c.lesson_id === nc.lesson_id)) {
    data.CHALLENGES.push(nc);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Unit 1 successfully implemented.');
