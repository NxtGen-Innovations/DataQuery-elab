const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Remove any old Unit 2 quizzes
data.QUIZZES = data.QUIZZES.filter(q => !q.lesson_id.startsWith('ds-mod2-'));

// Add 4 new quizzes (one per lesson, 3 questions each)
const newQuizzes = [
  {
    id: "quiz-ds-mod2-08-cleaning",
    lesson_id: "ds-mod2-08-cleaning",
    title: "Data Cleaning & Missing Values Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "You have a DataFrame with 1000 rows and the 'salary' column has 12 missing values. What is the best approach?",
        options: ["Drop the entire 'salary' column", "Drop the 12 rows with missing salary", "Fill missing values with 0", "Delete the entire DataFrame and re-collect data"],
        correct_answer: "Drop the 12 rows with missing salary",
        explanation: "With only ~1.2% missing data, dropping those rows is safe and preserves the integrity of the salary column without introducing artificial values like 0."
      },
      {
        id: "q2", type: "mcq",
        question: "What does `df.isnull().sum()` return?",
        options: ["Total rows in the DataFrame", "Count of missing values per column", "True if the entire DataFrame has nulls", "The sum of all numerical values"],
        correct_answer: "Count of missing values per column",
        explanation: "df.isnull() creates a True/False mask, and .sum() counts the True values (missing) in each column."
      },
      {
        id: "q3", type: "mcq",
        question: "Why is the median preferred over the mean for imputing missing values in a column with outliers?",
        options: ["Median is faster to compute", "Median is always larger than mean", "Median is not affected by extreme values", "Median only works with integers"],
        correct_answer: "Median is not affected by extreme values",
        explanation: "The mean gets pulled toward outliers (e.g., one salary of $10M would skew the average), while the median stays at the true middle of the distribution."
      }
    ]
  },
  {
    id: "quiz-ds-mod2-07-combining",
    lesson_id: "ds-mod2-07-combining",
    title: "Merging Datasets Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "You merge a 'customers' table (3 rows) with an 'orders' table (5 rows) using an inner join on 'customer_id'. Customer ID 4 appears in orders but not in customers. How many rows will the result have?",
        options: ["8 rows", "5 rows", "3 rows", "It depends on how many orders match existing customers"],
        correct_answer: "It depends on how many orders match existing customers",
        explanation: "An inner join only keeps rows where the key exists in BOTH tables. Orders from customer_id=4 are dropped because that customer doesn't exist in the customers table."
      },
      {
        id: "q2", type: "mcq",
        question: "What is the difference between `pd.merge()` and `pd.concat()`?",
        options: ["They are identical", "merge() joins on a key column, concat() stacks DataFrames", "concat() is for SQL databases only", "merge() only works with NumPy arrays"],
        correct_answer: "merge() joins on a key column, concat() stacks DataFrames",
        explanation: "pd.merge() combines DataFrames horizontally using a shared key (like SQL JOIN), while pd.concat() stacks them vertically (appending rows) or horizontally."
      },
      {
        id: "q3", type: "mcq",
        question: "After merging two tables, you want to find the total amount spent by each customer. Which method do you use?",
        options: ["df.sort_values('amount')", "df.pivot_table()", "df.groupby('customer_id')['amount'].sum()", "df.merge('amount')"],
        correct_answer: "df.groupby('customer_id')['amount'].sum()",
        explanation: "groupby() splits the data by customer_id, then .sum() calculates the total amount for each group — this is the standard aggregation pattern."
      }
    ]
  },
  {
    id: "quiz-ds-mod2-09-transformation",
    lesson_id: "ds-mod2-09-transformation",
    title: "Data Transformation Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "The salary column contains values like '$45,000'. What is the correct order of operations to convert it to an integer?",
        options: [
          "astype(int) → str.replace('$','') → str.replace(',','')",
          "str.replace('$','') → str.replace(',','') → astype(int)",
          "fillna(0) → astype(int) → str.replace('$','')",
          "str.title() → astype(int)"
        ],
        correct_answer: "str.replace('$','') → str.replace(',','') → astype(int)",
        explanation: "You must first remove all non-numeric characters ($ and commas), then convert the clean string '45000' to an integer. Trying astype(int) before cleaning will throw an error."
      },
      {
        id: "q2", type: "mcq",
        question: "What does `df['name'].str.title()` do to the value 'JANE SMITH'?",
        options: ["'jane smith'", "'Jane Smith'", "'JANE SMITH' (no change)", "'Jane smith'"],
        correct_answer: "'Jane Smith'",
        explanation: "str.title() capitalizes the first letter of every word and lowercases the rest, so 'JANE SMITH' becomes 'Jane Smith'."
      },
      {
        id: "q3", type: "mcq",
        question: "When should you use `apply(lambda x: ...)` instead of built-in string methods?",
        options: ["Always — it's faster", "When you need custom row-level logic that has no built-in method", "Only for numerical columns", "Never — lambda functions are deprecated"],
        correct_answer: "When you need custom row-level logic that has no built-in method",
        explanation: "apply() with lambda is for custom transformations (e.g., categorizing values into tiers). For standard operations like case conversion, use built-in .str methods which are optimized."
      }
    ]
  },
  {
    id: "quiz-ds-mod2-06-wrangling",
    lesson_id: "ds-mod2-06-wrangling",
    title: "Reshaping & Summarizing Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "You have a DataFrame with columns: student, subject, score. You want each student as a row and each subject as a column. Which function do you use?",
        options: ["pd.merge()", "pd.concat()", "pd.pivot_table()", "df.groupby()"],
        correct_answer: "pd.pivot_table()",
        explanation: "pivot_table() reshapes 'long' format data (one row per observation) into 'wide' format (subjects become columns), exactly what's needed for report card generation."
      },
      {
        id: "q2", type: "mcq",
        question: "In `pd.pivot_table(df, index='student', columns='subject', values='score')`, what does the `index` parameter define?",
        options: ["The column to use as new column headers", "The values to aggregate", "The rows of the resulting pivot table", "The aggregation function"],
        correct_answer: "The rows of the resulting pivot table",
        explanation: "The index parameter defines what becomes the row labels in the pivoted result. Each unique value in the index column becomes one row."
      },
      {
        id: "q3", type: "mcq",
        question: "If a student has two Math scores (85 and 95) and you use pivot_table with aggfunc='mean', what will appear in the Math column?",
        options: ["85", "95", "90", "Error: duplicate entries"],
        correct_answer: "90",
        explanation: "When there are duplicate entries, pivot_table applies the aggregation function. With aggfunc='mean', it calculates (85 + 95) / 2 = 90."
      }
    ]
  }
];

data.QUIZZES.push(...newQuizzes);

// ===== STEP 2: Upgrade lab prompts to be richer =====
const promptUpgrades = {
  "ch-ds-mod2-q1": `## eLab Case Study 2.1: Hospital Patient Records

### Scenario
You are a data analyst at **City General Hospital**. The hospital recently digitized its patient intake forms, but the data entry process was manual — leading to missing values in critical fields like age and blood pressure.

Before any medical analysis can begin, you must clean this dataset.

### Dataset
| patient_id | age | blood_pressure |
|---|---|---|
| 101 | 45 | 120 |
| 102 | 50 | NaN |
| 103 | NaN | 130 |
| 104 | 60 | 140 |
| 105 | 65 | 125 |

### Your Tasks
1. Calculate the **median** of the \`age\` column (ignoring NaN) and store it in \`median_age\`.
2. Fill the missing \`age\` values with this median.
3. Drop any rows where \`blood_pressure\` is missing.
4. Save the final cleaned DataFrame as \`cleaned_patients\`.

### Expected Output
- \`median_age\` = 55.0
- \`cleaned_patients\` should have **4 rows** and **3 columns** with zero missing values.`,

  "ch-ds-mod2-q2": `## eLab Case Study 2.2: Online Store Orders

### Scenario
You work at **QuickCart**, a growing e-commerce startup. The customer data and order data are stored in separate databases. Management wants a report showing the **total spending per customer**.

### Datasets

**Customers Table**
| customer_id | name |
|---|---|
| 1 | Alice |
| 2 | Bob |
| 3 | Charlie |

**Orders Table**
| order_id | customer_id | amount |
|---|---|---|
| 1001 | 1 | 250 |
| 1002 | 1 | 150 |
| 1003 | 2 | 300 |
| 1004 | 4 | 400 |

> **Note**: Customer ID 4 exists in orders but NOT in customers. Customer ID 3 has zero orders.

### Your Tasks
1. Perform an **inner join** on \`customers\` and \`orders\` using \`customer_id\`. Save as \`merged_df\`.
2. Use \`groupby()\` to calculate the **sum of amount** per customer. Save as \`total_spent\`.

### Expected Output
- \`merged_df\` should have **3 rows** (customer 4's order is excluded, customer 3 has no orders).
- Total spent across all valid customers = **700**.`,

  "ch-ds-mod2-q3": `## eLab Case Study 2.3: Employee Payroll

### Scenario
The HR department at **TechNova Inc.** has exported their payroll data from an old system. Unfortunately, salaries are stored as formatted strings with dollar signs and commas, and employee names have inconsistent capitalization.

You need to clean this data before it can be loaded into the new payroll system.

### Dataset
| emp_id | name | salary |
|---|---|---|
| 1 | john doe | $45,000 |
| 2 | JANE SMITH | $55,000 |
| 3 | bob | $40,000 |

### Your Tasks
1. Clean the \`salary\` column: remove \`$\` and \`,\`, then convert to **integer** type.
2. Convert the \`name\` column to **Title Case** (e.g., "john doe" → "John Doe").

### Expected Output
- Salary column dtype should be \`int64\`.
- Sum of all salaries = **140,000**.
- First name should be **"John Doe"**.`,

  "ch-ds-mod2-q4": `## eLab Case Study 2.4: Student Marks

### Scenario
A school teacher at **Greenfield Academy** has recorded student marks in a log-style format — each row represents one student's score in one subject. The principal needs a **report card view** where each student is a single row with subjects as columns.

### Dataset (Long Format)
| student | subject | score |
|---|---|---|
| Alice | Math | 85 |
| Alice | Science | 90 |
| Bob | Math | 78 |
| Bob | Science | 88 |

### Your Task
1. Use \`pd.pivot_table()\` to reshape the data into wide format.
2. Set \`index='student'\`, \`columns='subject'\`, \`values='score'\`.
3. Save the result as \`pivot_df\`.

### Expected Output (Wide Format)
| student | Math | Science |
|---|---|---|
| Alice | 85 | 90 |
| Bob | 78 | 88 |

- Shape: **(2, 2)** — 2 students × 2 subjects.`
};

data.CHALLENGES.forEach(c => {
  if (promptUpgrades[c.id]) {
    c.prompt = promptUpgrades[c.id];
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 2 quizzes (4×3 questions) and lab prompts upgraded.');
