const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// ===== STEP 1: Upgrade Unit 2 LESSONS (notes) =====
const topics = data.CURRICULUM[0].topics;
const u2 = topics.find(t => t.topic.includes('Unit 2'));

u2.lessons = [
  {
    id: "ds-mod2-08-cleaning",
    title: "2.1 Hospital Patient Records",
    domain: "Data Science",
    topic: u2.topic,
    difficulty: "intermediate",
    content_md: `# Data Cleaning & Handling Missing Values

Missing data is one of the most common problems in real-world datasets. Before any analysis or modeling can begin, you must identify and handle these gaps.

**Real-world Analogy**: Imagine filling out a hospital admission form. Some patients skip the "Emergency Contact" field, others forget their blood type. The hospital can't just throw away the entire form — they must decide: ask the patient later (impute), or proceed without it (drop).

### Why Data Goes Missing
- **MCAR** (Missing Completely At Random): No pattern — e.g., a sensor randomly fails.
- **MAR** (Missing At Random): Missingness depends on another observed variable.
- **MNAR** (Missing Not At Random): The value itself is the reason it's missing (e.g., high-income people skip salary fields).

### Essential Pandas Methods

| Method | What It Does | Example |
|---|---|---|
| \`df.isnull()\` | Returns True/False mask for every cell | \`df.isnull().sum()\` counts NaNs per column |
| \`df.dropna()\` | Removes rows with any NaN | \`df.dropna(subset=['age'])\` targets specific cols |
| \`df.fillna(value)\` | Replaces NaN with a value | \`df['age'].fillna(df['age'].median())\` |
| \`df.info()\` | Shows non-null counts and dtypes | Quick health check for your dataset |

### Choosing the Right Strategy

| Scenario | Best Strategy | Why |
|---|---|---|
| < 5% data missing | \`dropna()\` | Minimal information loss |
| Numerical column, no outliers | \`fillna(mean)\` | Preserves distribution center |
| Numerical column, has outliers | \`fillna(median)\` | Median is robust to outliers |
| Categorical column | \`fillna(mode)\` | Most frequent value is safest |

### Code Walkthrough
\`\`\`python
import pandas as pd

df = pd.DataFrame({'age': [25, None, 35], 'bp': [120, 130, None]})

# Check missing values
print(df.isnull().sum())

# Fill age with median
df['age'] = df['age'].fillna(df['age'].median())

# Drop rows where bp is missing
df = df.dropna(subset=['bp'])
\`\`\`

### Industry Use Cases
- **Healthcare**: Patient records with missing lab results — dropping them could lose critical cases.
- **Banking**: Loan applications with missing income — imputing with median prevents bias.
- **IoT**: Sensor data with gaps due to connectivity loss — forward-fill (\`ffill\`) is common.`
  },
  {
    id: "ds-mod2-07-combining",
    title: "2.2 Online Store Orders",
    domain: "Data Science",
    topic: u2.topic,
    difficulty: "intermediate",
    content_md: `# Merging & Combining Datasets

In real-world projects, data almost never lives in a single table. Customer info is in one database, their orders in another, shipping details in a third. Merging brings them together.

**Real-world Analogy**: Think of it like a school. The "Students" register has names and roll numbers. The "Marks" register has roll numbers and scores. To create a report card, you *merge* them on roll number.

### Types of Joins

| Join Type | Keeps | SQL Equivalent |
|---|---|---|
| **Inner** | Only rows with matching keys in BOTH tables | \`INNER JOIN\` |
| **Left** | All rows from left + matched from right (NaN if no match) | \`LEFT JOIN\` |
| **Right** | All rows from right + matched from left | \`RIGHT JOIN\` |
| **Outer** | Everything from both (NaN where no match) | \`FULL OUTER JOIN\` |

### Pandas Merge Syntax
\`\`\`python
merged = pd.merge(left_df, right_df, on='key_column', how='inner')
\`\`\`

### GroupBy & Aggregation

After merging, you often need to summarize. \`groupby()\` splits data into groups, then applies an aggregation function.

\`\`\`python
# Total spending per customer
df.groupby('customer_id')['amount'].sum()

# Multiple aggregations
df.groupby('customer_id')['amount'].agg(['sum', 'mean', 'count'])
\`\`\`

### pd.concat vs pd.merge
| Function | Use Case |
|---|---|
| \`pd.merge()\` | Combine on a shared key column (like SQL JOIN) |
| \`pd.concat()\` | Stack DataFrames vertically (append rows) or horizontally |

### Industry Use Cases
- **E-commerce**: Merging user profiles with order history to analyze spending patterns.
- **HR Analytics**: Joining employee table with department table to calculate average salary per team.
- **Supply Chain**: Combining shipment data with warehouse inventory for stock reconciliation.`
  },
  {
    id: "ds-mod2-09-transformation",
    title: "2.3 Employee Payroll",
    domain: "Data Science",
    topic: u2.topic,
    difficulty: "intermediate",
    content_md: `# Data Transformation & String Operations

Raw data from forms, spreadsheets, and APIs is often messy. Salaries stored as "$45,000" (a string, not a number), names in random case ("john DOE"), dates in inconsistent formats. Transformation cleans this into usable form.

**Real-world Analogy**: You receive a box of handwritten letters. Before you can sort them alphabetically, you need to first read each one, standardize the handwriting into typed text, and fix any spelling errors. That's data transformation.

### String Methods in Pandas

| Method | What It Does | Example |
|---|---|---|
| \`.str.lower()\` | Converts to lowercase | \`'HELLO'\` → \`'hello'\` |
| \`.str.upper()\` | Converts to uppercase | \`'hello'\` → \`'HELLO'\` |
| \`.str.title()\` | Title Case | \`'john doe'\` → \`'John Doe'\` |
| \`.str.strip()\` | Removes leading/trailing whitespace | \`' hello '\` → \`'hello'\` |
| \`.str.replace(old, new)\` | Replaces substrings | Remove \`$\` and \`,\` from salary |
| \`.str.contains(pattern)\` | Boolean mask for substring match | Filter rows containing "Manager" |

### Type Conversion Pipeline
\`\`\`python
# Salary: "$45,000" → 45000
df['salary'] = df['salary'].str.replace('$', '', regex=False)
df['salary'] = df['salary'].str.replace(',', '', regex=False)
df['salary'] = df['salary'].astype(int)
\`\`\`

### The apply() + lambda Pattern
For custom row-level transformations that don't have a built-in method:
\`\`\`python
# Categorize salary
df['tier'] = df['salary'].apply(lambda x: 'Senior' if x > 50000 else 'Junior')
\`\`\`

### Industry Use Cases
- **Finance**: Cleaning currency symbols and formatting from transaction data before analysis.
- **HR**: Standardizing employee names and department codes across merged databases.
- **Retail**: Normalizing product names ("iPhone 15", "IPHONE15", "Apple iPhone 15") for accurate grouping.`
  },
  {
    id: "ds-mod2-06-wrangling",
    title: "2.4 Student Marks",
    domain: "Data Science",
    topic: u2.topic,
    difficulty: "intermediate",
    content_md: `# Reshaping & Summarizing Data

Data often comes in a "long" format (one observation per row) but reports need it in "wide" format (subjects as columns). Reshaping is the bridge.

**Real-world Analogy**: Your marks are stored like a diary — one entry per subject per student. But the report card needs a single row per student with all subjects side by side. Pivoting does this automatically.

### Long vs Wide Format

**Long format** (how databases store it):
| Student | Subject | Score |
|---|---|---|
| Alice | Math | 85 |
| Alice | Science | 90 |
| Bob | Math | 78 |
| Bob | Science | 88 |

**Wide format** (how reports show it):
| Student | Math | Science |
|---|---|---|
| Alice | 85 | 90 |
| Bob | 78 | 88 |

### pivot_table() Syntax
\`\`\`python
pivot_df = pd.pivot_table(
    df,
    index='student',     # Rows
    columns='subject',   # New columns
    values='score',      # Values to fill
    aggfunc='mean'       # Aggregation (default: mean)
)
\`\`\`

### Key Aggregation Functions

| Function | Use |
|---|---|
| \`mean\` | Average (default) |
| \`sum\` | Total |
| \`count\` | Number of entries |
| \`max\` / \`min\` | Extremes |

### Sorting Results
\`\`\`python
# Sort by Math scores, highest first
pivot_df.sort_values('Math', ascending=False)
\`\`\`

### Industry Use Cases
- **Education**: Generating student report cards from exam databases.
- **Sales**: Pivoting monthly sales data to see revenue by product and region.
- **Healthcare**: Summarizing patient visit counts by department and month.`
  }
];

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 2 lessons (notes) upgraded.');
