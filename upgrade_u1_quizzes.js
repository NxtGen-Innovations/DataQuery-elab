const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// ===== Remove ALL old Unit 1 challenges and quizzes =====
data.CHALLENGES = data.CHALLENGES.filter(c => !c.id.startsWith('ch-ds-mod1-'));
data.QUIZZES = data.QUIZZES.filter(q => !q.lesson_id.startsWith('ds-mod1-'));

// ===== Add 4 new challenges =====
const newChallenges = [
  {
    id: "ch-ds-mod1-q1",
    lesson_id: "ds-mod1-00a",
    title: "The 'Brew Data' Coffee Shop",
    prompt: `## eLab Case Study 1.1: The 'Brew Data' Coffee Shop

### Scenario
You have just been hired as a Junior Data Analyst for a new tech-themed coffee shop called **"Brew Data"**. The owner wants to start tracking the shop's daily performance using Python.

Before setting up a database, they need a simple script to record basic shop metrics.

### Your Tasks
1. Create a variable called \`shop_name\` and assign it the exact string \`'Brew Data'\`.
2. Create a variable called \`daily_sales\` and assign it the integer \`150\`.
3. Create a variable called \`avg_rating\` and assign it the float \`4.7\`.
4. Calculate \`weekly_sales\` by multiplying \`daily_sales\` by 7.

### Expected Output
- \`shop_name\` = \`'Brew Data'\`
- \`daily_sales\` = \`150\`
- \`weekly_sales\` = \`1050\``,
    starter_code: `# Step 1: Create the shop_name variable
shop_name = None

# Step 2: Create the daily_sales variable
daily_sales = None

# Step 3: Create the avg_rating variable
avg_rating = None

# Step 4: Calculate weekly_sales (daily_sales * 7)
weekly_sales = None

`,
    grader_checks: [
      { variable: "shop_name", condition: "eq", value: "Brew Data", message: "shop_name must be 'Brew Data'" },
      { variable: "daily_sales", condition: "eq", value: 150, message: "daily_sales must be exactly 150" },
      { variable: "weekly_sales", condition: "eq", value: 1050, message: "weekly_sales should be daily_sales × 7 = 1050" }
    ]
  },
  {
    id: "ch-ds-mod1-q2",
    lesson_id: "ds-mod1-00b",
    title: "Global Logistics Corp",
    prompt: `## eLab Case Study 1.2: Global Logistics Corp

### Scenario
You work as a Data Scientist for **Global Logistics Corp**. The company has collected package weights in kilograms from their European warehouse. The US shipping manifest requires pounds.

**Conversion**: 1 kg = 2.20462 lbs

### Dataset
Weights (kg): \`[10, 25, 40, 50]\`

### Your Tasks
1. Create a NumPy array called \`weights_kg\` with the values above.
2. Using **vectorization** (not a loop!), create \`weights_lbs\` by multiplying by 2.20462.
3. Calculate \`total_lbs\` by summing \`weights_lbs\`.
4. Find the \`heaviest_kg\` using \`np.max()\`.

### Expected Output
- \`weights_kg\` should be a NumPy array with shape \`(4,)\`
- \`total_lbs\` = **275.5775**
- \`heaviest_kg\` = **50**`,
    starter_code: `import numpy as np

# Step 1: Create weights_kg as a NumPy array
weights_kg = None

# Step 2: Convert to pounds using vectorization
weights_lbs = None

# Step 3: Calculate total weight in pounds
total_lbs = None

# Step 4: Find the heaviest package in kg
heaviest_kg = None

`,
    grader_checks: [
      { variable: "type(weights_kg).__name__", condition: "eq", value: "ndarray", message: "weights_kg must be a NumPy array" },
      { variable: "weights_kg.shape", condition: "shape_check", value: "(4,)", message: "weights_kg should have 4 elements" },
      { variable: "total_lbs", condition: "eq", value: 275.5775, message: "total_lbs should be 275.5775" },
      { variable: "heaviest_kg", condition: "eq", value: 50, message: "heaviest_kg should be 50" }
    ]
  },
  {
    id: "ch-ds-mod1-q3",
    lesson_id: "ds-mod1-08-dfs",
    title: "HR Employee Roster",
    prompt: `## eLab Case Study 1.3: HR Employee Roster

### Scenario
The HR department at **NovaTech Solutions** needs to create a digital employee roster. They've given you the raw data and want it organized into a Pandas DataFrame for easy querying.

### Dataset
| Name | Age | Department |
|---|---|---|
| Alice | 25 | Engineering |
| Bob | 30 | Marketing |
| Charlie | 35 | Engineering |
| Diana | 28 | HR |

### Your Tasks
1. Create a DataFrame called \`roster\` with the data above.
2. Calculate \`avg_age\` — the average age of all employees.
3. Filter the DataFrame to get only Engineering employees. Save as \`engineers\`.
4. Find \`engineer_count\` — the number of engineers.

### Expected Output
- \`roster\` shape: **(4, 3)**
- \`avg_age\` = **29.5**
- \`engineer_count\` = **2**`,
    starter_code: `import pandas as pd

# Step 1: Create the roster DataFrame
roster = None

# Step 2: Calculate the average age
avg_age = None

# Step 3: Filter for Engineering department only
engineers = None

# Step 4: Count the number of engineers
engineer_count = None

`,
    grader_checks: [
      { variable: "roster.shape", condition: "shape_check", value: "(4, 3)", message: "Roster should have 4 rows and 3 columns" },
      { variable: "avg_age", condition: "eq", value: 29.5, message: "Average age should be 29.5" },
      { variable: "engineer_count", condition: "eq", value: 2, message: "There should be 2 engineers" }
    ]
  },
  {
    id: "ch-ds-mod1-q4",
    lesson_id: "ds-mod1-03",
    title: "Student Grades Cleanup",
    prompt: `## eLab Case Study 1.4: Student Grades Cleanup

### Scenario
A university registrar at **SRM University** has exported student grades data, but it contains missing values and duplicate entries. Before the semester report can be generated, you must clean this dataset.

### Dataset
| Student | Department | Grade |
|---|---|---|
| Alice | CS | 85 |
| Bob | CS | NaN |
| Charlie | Math | 78 |
| Alice | CS | 85 |
| Diana | Math | 92 |
| Eve | CS | NaN |

### Your Tasks
1. Create the DataFrame \`grades\` with the data above (use \`None\` for missing grades).
2. Remove duplicate rows. Save as \`grades\`.
3. Fill missing Grade values with the **mean** of existing grades. Store the mean in \`mean_grade\`.
4. Filter to get only CS department students. Calculate their average grade as \`avg_cs\`.

### Expected Output
- After removing duplicates: **5 rows**
- \`mean_grade\` = **85.0** (mean of 85, 78, 92)
- \`avg_cs\` should reflect the CS students' average after filling NaN with mean.`,
    starter_code: `import pandas as pd

# Step 1: Create the grades DataFrame
grades = pd.DataFrame({
    'Student': ['Alice', 'Bob', 'Charlie', 'Alice', 'Diana', 'Eve'],
    'Department': ['CS', 'CS', 'Math', 'CS', 'Math', 'CS'],
    'Grade': [85, None, 78, 85, 92, None]
})

# Step 2: Remove duplicate rows

# Step 3: Calculate mean_grade and fill missing values
mean_grade = None

# Step 4: Filter CS students and calculate avg_cs
avg_cs = None

`,
    grader_checks: [
      { variable: "grades.shape[0]", condition: "eq", value: 5, message: "After removing duplicates, there should be 5 rows" },
      { variable: "mean_grade", condition: "eq", value: 85.0, message: "Mean of existing grades (85, 78, 92) should be 85.0" },
      { variable: "grades['Grade'].isnull().sum()", condition: "eq", value: 0, message: "No missing grades should remain after filling" }
    ]
  }
];

data.CHALLENGES.push(...newChallenges);

// ===== Add 4 quizzes (3 questions each) =====
const newQuizzes = [
  {
    id: "quiz-ds-mod1-00a", lesson_id: "ds-mod1-00a",
    title: "Intro to Data Science Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "According to the CRISP-DM lifecycle, which phase typically consumes ~80% of a data scientist's time?",
        options: ["Modeling", "Data Preparation", "Deployment", "Business Understanding"],
        correct_answer: "Data Preparation",
        explanation: "Data cleaning, formatting, handling missing values, and standardizing data typically takes up about 80% of the total project time."
      },
      {
        id: "q2", type: "mcq",
        question: "A folder of customer service call recordings is an example of which data type?",
        options: ["Structured data", "Semi-structured data", "Unstructured data", "Tabular data"],
        correct_answer: "Unstructured data",
        explanation: "Audio recordings have no predefined row/column format. They cannot be queried like a database without first being processed (transcribed)."
      },
      {
        id: "q3", type: "mcq",
        question: "Which Python data type would you use to store a product price like 49.99?",
        options: ["str", "int", "float", "bool"],
        correct_answer: "float",
        explanation: "Prices with decimal points are stored as floats. An int would truncate 49.99 to 49, and a str would prevent mathematical operations."
      }
    ]
  },
  {
    id: "quiz-ds-mod1-00b", lesson_id: "ds-mod1-00b",
    title: "NumPy Foundations Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "If `a = np.array([1, 2, 3])` and `b = np.array([4, 5, 6])`, what does `a * b` return?",
        options: ["[1, 2, 3, 4, 5, 6]", "[4, 10, 18]", "32", "Error"],
        correct_answer: "[4, 10, 18]",
        explanation: "The * operator on NumPy arrays performs element-wise multiplication: 1×4=4, 2×5=10, 3×6=18. This is NOT the dot product."
      },
      {
        id: "q2", type: "mcq",
        question: "What does `np.zeros((3, 4)).shape` return?",
        options: ["(4, 3)", "(3, 4)", "[3, 4]", "12"],
        correct_answer: "(3, 4)",
        explanation: "np.zeros((3,4)) creates a 3-row, 4-column matrix. The .shape attribute returns the dimensions as a tuple: (3, 4)."
      },
      {
        id: "q3", type: "mcq",
        question: "Why are NumPy arrays faster than Python lists for numerical operations?",
        options: [
          "NumPy uses a different version of Python",
          "NumPy arrays use vectorized operations in compiled C code",
          "Python lists don't support multiplication",
          "NumPy compresses data automatically"
        ],
        correct_answer: "NumPy arrays use vectorized operations in compiled C code",
        explanation: "NumPy operations are implemented in optimized C code and operate on the entire array at once (vectorization), avoiding Python's slow for-loop overhead."
      }
    ]
  },
  {
    id: "quiz-ds-mod1-08-dfs", lesson_id: "ds-mod1-08-dfs",
    title: "Pandas Series & DataFrames Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "What is the primary difference between a Pandas Series and a 1D NumPy array?",
        options: [
          "A Series cannot hold strings",
          "A Series has an explicit, customizable index",
          "A Series is strictly for numerical data",
          "A NumPy array is slower"
        ],
        correct_answer: "A Series has an explicit, customizable index",
        explanation: "While both are 1D, a Pandas Series has labeled indices (like 'Mon', 'Tue') that allow intuitive data retrieval, unlike NumPy's numeric-only indexing."
      },
      {
        id: "q2", type: "mcq",
        question: "Which function would you use to see the first 5 rows of a DataFrame?",
        options: ["df.info()", "df.describe()", "df.head()", "df.shape"],
        correct_answer: "df.head()",
        explanation: "df.head() returns the first 5 rows by default (or df.head(N) for N rows). df.describe() gives statistics, df.info() gives column types."
      },
      {
        id: "q3", type: "mcq",
        question: "What does `df[df['Age'] > 30]` return?",
        options: ["A single value", "True or False", "A filtered DataFrame with only rows where Age > 30", "An error"],
        correct_answer: "A filtered DataFrame with only rows where Age > 30",
        explanation: "This is boolean indexing. df['Age'] > 30 creates a True/False mask, and df[mask] filters to keep only rows where the condition is True."
      }
    ]
  },
  {
    id: "quiz-ds-mod1-03", lesson_id: "ds-mod1-03",
    title: "Data Cleaning Basics Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "You have a DataFrame with 1000 rows and 3 duplicate rows. What does `df.drop_duplicates()` return?",
        options: ["1003 rows", "997 rows", "1000 rows", "3 rows"],
        correct_answer: "997 rows",
        explanation: "drop_duplicates() removes the duplicate rows, keeping the first occurrence. 1000 - 3 duplicates = 997 unique rows."
      },
      {
        id: "q2", type: "mcq",
        question: "What does `df['Grade'].fillna(df['Grade'].mean())` do?",
        options: [
          "Deletes all rows with missing grades",
          "Replaces missing grades with the average of existing grades",
          "Sets all grades to the mean",
          "Returns True/False for each row"
        ],
        correct_answer: "Replaces missing grades with the average of existing grades",
        explanation: "fillna() replaces NaN values with the specified value. Here, it fills missing grades with the mean of non-missing grades — a common imputation strategy."
      },
      {
        id: "q3", type: "mcq",
        question: "To filter a DataFrame for rows where Department is 'CS' AND Grade is above 80, which syntax is correct?",
        options: [
          "df[df['Department'] == 'CS' and df['Grade'] > 80]",
          "df[(df['Department'] == 'CS') & (df['Grade'] > 80)]",
          "df.filter('CS', 80)",
          "df.query(Department='CS', Grade>80)"
        ],
        correct_answer: "df[(df['Department'] == 'CS') & (df['Grade'] > 80)]",
        explanation: "In Pandas, use & (not 'and') for combining conditions, and wrap each condition in parentheses. The Python keyword 'and' doesn't work with Series."
      }
    ]
  }
];

data.QUIZZES.push(...newQuizzes);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 1 fully upgraded: 4 challenges + 4 quizzes (12 questions total).');
