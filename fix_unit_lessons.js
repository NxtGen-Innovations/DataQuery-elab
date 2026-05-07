const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const topics = data.CURRICULUM[0].topics;

// --- Replace Unit 2 lessons ---
const unit2Index = topics.findIndex(t => t.topic === "Unit 2: Data Handling & Data Wrangling");
if (unit2Index !== -1) {
  topics[unit2Index].lessons = [
    {
      "id": "ds-mod2-08-cleaning",
      "title": "2.1 Hospital Patient Records",
      "domain": "Data Science",
      "topic": "Unit 2: Data Handling & Data Wrangling",
      "difficulty": "intermediate",
      "content_md": "# Data Cleaning & Missing Values\n\nReal-world data is rarely clean. Missing values, incorrect entries, and inconsistent formatting are common problems that must be fixed before any analysis.\n\n### Key Concepts\n- **`df.isnull()`** — Detects missing values (returns True/False mask).\n- **`df.fillna(value)`** — Replaces NaN with a specified value (mean, median, constant).\n- **`df.dropna()`** — Removes rows (or columns) that contain missing values.\n- **Median Imputation** — Filling missing numerical values with the median is robust against outliers.\n\n### When to Use What\n| Scenario | Method |\n|---|---|\n| Few missing values in critical column | `dropna()` |\n| Many missing values, numeric column | `fillna(median)` |\n| Categorical column | `fillna(mode)` |"
    },
    {
      "id": "ds-mod2-07-combining",
      "title": "2.2 Online Store Orders",
      "domain": "Data Science",
      "topic": "Unit 2: Data Handling & Data Wrangling",
      "difficulty": "intermediate",
      "content_md": "# Merging Datasets\n\nIn real projects, data lives in multiple tables. Pandas provides powerful merging capabilities similar to SQL JOINs.\n\n### Key Concepts\n- **`pd.merge(left, right, on='key')`** — Merges two DataFrames on a common column.\n- **Inner Join** (default) — Only keeps rows where the key exists in both tables.\n- **Left Join** — Keeps all rows from the left table, fills NaN for missing right matches.\n- **`df.groupby('col').sum()`** — Groups rows by a column and aggregates values.\n\n### Join Types Visual\n| Join | Keeps |\n|---|---|\n| Inner | Only matched rows |\n| Left | All left + matched right |\n| Right | All right + matched left |\n| Outer | Everything |"
    },
    {
      "id": "ds-mod2-09-transformation",
      "title": "2.3 Employee Payroll",
      "domain": "Data Science",
      "topic": "Unit 2: Data Handling & Data Wrangling",
      "difficulty": "intermediate",
      "content_md": "# Data Transformation & String Operations\n\nRaw data often has messy text formatting — inconsistent capitalization, embedded symbols in numeric fields, and more. Pandas string methods help clean this efficiently.\n\n### Key Concepts\n- **`str.replace(old, new)`** — Remove or replace characters in string columns.\n- **`str.title()`** — Converts text to Title Case (`'john doe'` → `'John Doe'`).\n- **`astype(int)`** — Converts column data type (e.g., string to integer).\n- **`apply(lambda x: ...)`** — Apply custom transformations row-by-row.\n\n### Common Cleaning Pipeline\n```\n1. Remove symbols ($, commas) → str.replace\n2. Convert types → astype(int/float)\n3. Standardize text → str.title() / str.lower()\n```"
    },
    {
      "id": "ds-mod2-06-wrangling",
      "title": "2.4 Student Marks",
      "domain": "Data Science",
      "topic": "Unit 2: Data Handling & Data Wrangling",
      "difficulty": "intermediate",
      "content_md": "# Reshaping & Summarizing Data\n\nData often comes in a 'long' format (one observation per row) but needs to be reshaped into a 'wide' format for reporting.\n\n### Key Concepts\n- **`pd.pivot_table(df, index, columns, values)`** — Reshapes long data into a cross-tabulation.\n- **Aggregation functions** — `mean`, `sum`, `count` can be applied during pivoting.\n- **`df.sort_values(by='col')`** — Sorts the DataFrame by a column.\n\n### Long vs Wide Format\n**Long format** (raw):\n| Student | Subject | Score |\n|---|---|---|\n| Alice | Math | 85 |\n| Alice | Science | 90 |\n\n**Wide format** (pivoted):\n| Student | Math | Science |\n|---|---|---|\n| Alice | 85 | 90 |"
    }
  ];
}

// --- Replace Unit 3 lessons ---
const unit3Index = topics.findIndex(t => t.topic === "Unit 3: Data Visualization using Matplotlib");
if (unit3Index !== -1) {
  topics[unit3Index].lessons = [
    {
      "id": "ds-mod3-02-customizing",
      "title": "3.1 Monthly Sales Report",
      "domain": "Data Science",
      "topic": "Unit 3: Data Visualization using Matplotlib",
      "difficulty": "beginner",
      "content_md": "# Line & Bar Plots\n\nLine and bar plots are the workhorses of data visualization. They are used to show trends over time and compare categorical values.\n\n### Key Concepts\n- **`plt.plot(x, y)`** — Creates a line plot.\n- **`plt.bar(x, y)`** — Creates a bar chart.\n- **`plt.title('...')`** — Sets the plot title.\n- **`plt.xlabel('...')` / `plt.ylabel('...')`** — Axis labels.\n- **`plt.grid(True)`** — Adds a background grid for readability.\n- **`plt.legend()`** — Displays a legend when multiple series are plotted.\n- **`plt.show()`** — Renders the plot."
    },
    {
      "id": "ds-mod3-03-types",
      "title": "3.2 Student Score Distribution",
      "domain": "Data Science",
      "topic": "Unit 3: Data Visualization using Matplotlib",
      "difficulty": "intermediate",
      "content_md": "# Histograms & Box Plots\n\nWhen you need to understand the *distribution* of your data — not just the average — histograms and box plots are essential.\n\n### Key Concepts\n- **`plt.hist(data, bins=N)`** — Shows how frequently values fall into each bin/range.\n- **`plt.boxplot(data)`** — Shows the median, quartiles, and outliers at a glance.\n- **Normal Distribution** — The classic bell curve. `np.random.normal(mean, std, size)` generates it.\n\n### When to Use What\n| Plot | Best For |\n|---|---|\n| Histogram | Seeing frequency distribution |\n| Box Plot | Spotting outliers and comparing groups |"
    },
    {
      "id": "ds-mod3-03-subplots",
      "title": "3.3 City Temperature Analysis",
      "domain": "Data Science",
      "topic": "Unit 3: Data Visualization using Matplotlib",
      "difficulty": "intermediate",
      "content_md": "# Multiple Subplots\n\nWhen comparing datasets side-by-side, subplots let you create multiple charts in one figure.\n\n### Key Concepts\n- **`fig, axes = plt.subplots(nrows, ncols, figsize=(w, h))`** — Creates a grid of subplots.\n- **`axes[i].plot(...)`** — Plot on a specific subplot.\n- **`axes[i].set_title('...')`** — Title for individual subplot.\n- **`plt.suptitle('...')`** — A super-title for the entire figure.\n- **`plt.tight_layout()`** — Automatically adjusts spacing to prevent overlap."
    },
    {
      "id": "ds-mod3-03-scatter",
      "title": "3.4 Product Sales Scatter & Correlation",
      "domain": "Data Science",
      "topic": "Unit 3: Data Visualization using Matplotlib",
      "difficulty": "intermediate",
      "content_md": "# Scatter Plots & Trend Lines\n\nScatter plots reveal relationships between two variables. Adding a trend line (line of best fit) quantifies that relationship.\n\n### Key Concepts\n- **`plt.scatter(x, y)`** — Creates a scatter plot.\n- **`np.polyfit(x, y, degree)`** — Fits a polynomial. Degree 1 = linear (y = mx + b).\n- **Slope (m)** — How much y changes per unit of x.\n- **Intercept (b)** — The y-value when x = 0.\n\n### Interpreting Correlation\n| Pattern | Meaning |\n|---|---|\n| Points trend upward | Positive correlation |\n| Points trend downward | Negative correlation |\n| No pattern | No correlation |"
    }
  ];
}

// --- Fix challenge lesson_id mappings for Unit 3 new lessons ---
// ch-ds-mod3-q3 was mapped to ds-mod3-03-types, but now the lesson is ds-mod3-03-subplots
data.CHALLENGES.forEach(c => {
  if (c.id === 'ch-ds-mod3-q3') c.lesson_id = 'ds-mod3-03-subplots';
  if (c.id === 'ch-ds-mod3-q4') c.lesson_id = 'ds-mod3-03-scatter';
});

// --- Remove old Unit 2 quizzes (quiz-ds-mod2-01 was the only one) ---
data.QUIZZES = data.QUIZZES.filter(q => !q.lesson_id.startsWith('ds-mod2-'));

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 2 and Unit 3 lessons restructured. Each unit now has exactly 4 lessons mapped 1:1 to challenges.');
