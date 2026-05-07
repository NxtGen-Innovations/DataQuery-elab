const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

// 1. Remove all old Unit 2 and Unit 3 challenges
data.CHALLENGES = data.CHALLENGES.filter(
  c => !(c.id.startsWith('ch-ds-mod2-') || c.id.startsWith('ch-ds-mod3-'))
);

// 2. Define 8 new challenges
const newChallenges = [
  // --- UNIT 2 ---
  {
    "id": "ch-ds-mod2-q1",
    "lesson_id": "ds-mod2-08-cleaning",
    "title": "Hospital Patient Records",
    "prompt": "## Case Study: Hospital Patient Records\n\nYou are managing a small database of patient records for a local clinic. Unfortunately, some data is missing due to manual entry errors.\n\n### Task (Data Cleaning & Missing Values)\n1. Fill the missing `age` values with the median age.\n2. Drop any rows where `blood_pressure` is missing.\n3. Save the cleaned dataframe as `cleaned_patients`.\n\nTopics: missing values, fillna, dropna, isnull, data cleaning.",
    "starter_code": "import pandas as pd\n\npatients = pd.DataFrame({\n    'patient_id': [101, 102, 103, 104, 105],\n    'age': [45, 50, None, 60, 65],\n    'blood_pressure': [120, None, 130, 140, 125]\n})\n\n# TODO: Calculate median age and fill missing age values\nmedian_age = patients['age'].median()\n# patients['age'] = ...\n\n# TODO: Drop rows with missing blood_pressure\n# cleaned_patients = ...\n\n# print(cleaned_patients)\n",
    "grader_checks": [
      {
        "variable": "median_age",
        "condition": "eq",
        "value": 55.0,
        "message": "Median age should be 55.0"
      },
      {
        "variable": "cleaned_patients.shape",
        "condition": "shape_check",
        "value": "(4, 3)",
        "message": "cleaned_patients should have 4 rows and 3 columns after dropping nulls"
      },
      {
        "variable": "cleaned_patients['age'].isnull().sum()",
        "condition": "eq",
        "value": 0,
        "message": "There should be no missing values in age"
      }
    ]
  },
  {
    "id": "ch-ds-mod2-q2",
    "lesson_id": "ds-mod2-07-combining",
    "title": "Online Store Orders",
    "prompt": "## Case Study: Online Store Orders\n\nAn online store stores customer details in one table and their purchase orders in another. You need to analyze the total spending of valid customers.\n\n### Task (Merging Datasets)\n1. Perform an **inner join** on `customers` and `orders` using `customer_id`. Save it as `merged_df`.\n2. Group the result by `customer_id` and calculate the sum of `amount` spent by each customer.\n3. Save this grouped series/dataframe as `total_spent`.\n\nTopics: pd.merge, inner join, left join, groupby, aggregation.",
    "starter_code": "import pandas as pd\n\ncustomers = pd.DataFrame({\n    'customer_id': [1, 2, 3],\n    'name': ['Alice', 'Bob', 'Charlie']\n})\norders = pd.DataFrame({\n    'order_id': [1001, 1002, 1003, 1004],\n    'customer_id': [1, 1, 2, 4],\n    'amount': [250, 150, 300, 400]\n})\n\n# TODO: Merge dataframes (inner join)\n# merged_df = ...\n\n# TODO: Groupby customer_id and sum the amount\n# total_spent = ...\n\n# print(total_spent)\n",
    "grader_checks": [
      {
        "variable": "merged_df.shape",
        "condition": "shape_check",
        "value": "(3, 4)",
        "message": "merged_df should only include matched rows (inner join)"
      },
      {
        "variable": "total_spent.sum()",
        "condition": "eq",
        "value": 700,
        "message": "Total spent across all valid customers should be 700"
      }
    ]
  },
  {
    "id": "ch-ds-mod2-q3",
    "lesson_id": "ds-mod2-09-transformation",
    "title": "Employee Payroll",
    "prompt": "## Case Study: Employee Payroll\n\nHR has provided a payroll dataset, but the text formatting is messy. Salaries are stored as strings with symbols, and names have inconsistent capitalization.\n\n### Task (Data Transformation & String Operations)\n1. Clean the `salary` column by removing `$` and `,`, then convert it to an integer.\n2. Convert the `name` column to Title Case (e.g., 'john doe' -> 'John Doe').\n\nTopics: string cleaning, title case, replace commas, astype, apply, lambda.",
    "starter_code": "import pandas as pd\n\npayroll = pd.DataFrame({\n    'emp_id': [1, 2, 3],\n    'name': ['john doe', 'JANE SMITH', 'bob'],\n    'salary': ['$45,000', '$55,000', '$40,000']\n})\n\n# TODO: Clean salary and convert to int\n# payroll['salary'] = payroll['salary'].str.replace(..., ..., regex=False)\n\n# TODO: Convert names to title case\n# payroll['name'] = payroll['name'].str.title()\n\n# print(payroll)\n",
    "grader_checks": [
      {
        "variable": "payroll['salary'].dtype.name",
        "condition": "eq",
        "value": "int64",
        "message": "Salary column must be of type integer"
      },
      {
        "variable": "payroll['salary'].sum()",
        "condition": "eq",
        "value": 140000,
        "message": "The sum of all salaries should be 140,000"
      },
      {
        "variable": "payroll['name'][0]",
        "condition": "eq",
        "value": "John Doe",
        "message": "Names must be in Title Case"
      }
    ]
  },
  {
    "id": "ch-ds-mod2-q4",
    "lesson_id": "ds-mod2-06-wrangling",
    "title": "Student Marks",
    "prompt": "## Case Study: Student Marks\n\nA teacher has recorded student marks in a long format where each row represents one subject. They need it reshaped into a wide format for easier report card generation.\n\n### Task (Reshaping & Summarizing)\n1. Use `pd.pivot_table()` to reshape the `marks` dataframe.\n2. Set `index='student'`, `columns='subject'`, and `values='score'`.\n3. The aggregation function should be the mean (which is the default). Save to `pivot_df`.\n\nTopics: pivot, mean, sorting, aggregation, reshaping.",
    "starter_code": "import pandas as pd\n\nmarks = pd.DataFrame({\n    'student': ['Alice', 'Alice', 'Bob', 'Bob'],\n    'subject': ['Math', 'Science', 'Math', 'Science'],\n    'score': [85, 90, 78, 88]\n})\n\n# TODO: Create a pivot table\n# pivot_df = pd.pivot_table(marks, ...)\n\n# print(pivot_df)\n",
    "grader_checks": [
      {
        "variable": "pivot_df.shape",
        "condition": "shape_check",
        "value": "(2, 2)",
        "message": "Pivot table should have 2 students (rows) and 2 subjects (columns)"
      },
      {
        "variable": "pivot_df.loc['Alice', 'Math']",
        "condition": "eq",
        "value": 85,
        "message": "Alice's Math score must be 85 in the pivot table"
      }
    ]
  },

  // --- UNIT 3 ---
  {
    "id": "ch-ds-mod3-q1",
    "lesson_id": "ds-mod3-02-customizing",
    "title": "Monthly Sales Report",
    "prompt": "## Case Study: Monthly Sales Report\n\nYou need to present the Q1 sales performance to the executive team.\n\n### Task (Line & Bar Plot)\n1. Create a line plot showing `months` on the x-axis and `sales` on the y-axis.\n2. Add a title \"Q1 Sales\", an x-label \"Month\", and a y-label \"Sales ($)\".\n3. Show a grid.\n4. Call `plt.show()` to render the plot.\n\nTopics: line plot, bar plot, labels, legends, grids.",
    "starter_code": "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar', 'Apr']\nsales = [1500, 2000, 1800, 2200]\n\n# TODO: Create a line plot\n\n# TODO: Add title and labels\n\n# TODO: Enable grid\n\n# TODO: Display the plot\n",
    "grader_checks": []
  },
  {
    "id": "ch-ds-mod3-q2",
    "lesson_id": "ds-mod3-03-types",
    "title": "Student Score Distribution",
    "prompt": "## Case Study: Student Score Distribution\n\nThe school board wants to understand the spread of standardized test scores. Are most students passing, or are there extreme outliers?\n\n### Task (Histogram & Box Plot)\n1. Create a figure with a histogram using `plt.hist()` to see the frequency distribution of `scores`.\n2. Set the number of bins to 15.\n3. Add a title \"Score Distribution\".\n4. Call `plt.show()`.\n*(Bonus: Try changing `plt.hist()` to `plt.boxplot()` to see the outliers!)*\n\nTopics: histogram, box plot, seaborn style, statistics.",
    "starter_code": "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(42)\nscores = np.random.normal(70, 15, 100)\n\n# TODO: Plot a histogram with 15 bins\n\n# TODO: Add a title and show the plot\n",
    "grader_checks": []
  },
  {
    "id": "ch-ds-mod3-q3",
    "lesson_id": "ds-mod3-03-types",
    "title": "City Temperature Analysis",
    "prompt": "## Case Study: City Temperature Analysis\n\nYou are comparing the daily temperatures of two cities over a week. To make it easy to compare, put them side-by-side.\n\n### Task (Multiple Subplots)\n1. Create a figure with 1 row and 2 columns using `plt.subplots(1, 2, figsize=(10, 4))`.\n2. In the first subplot (`axes[0]`), plot `days` vs `city_a`.\n3. In the second subplot (`axes[1]`), plot `days` vs `city_b`.\n4. Add a `suptitle` \"Temperature Comparison\".\n5. Use `plt.tight_layout()` and `plt.show()`.\n\nTopics: subplots, line charts, figsize, suptitle, tight_layout.",
    "starter_code": "import matplotlib.pyplot as plt\nimport numpy as np\n\ndays = np.arange(1, 8)\ncity_a = [22, 24, 23, 25, 27, 28, 26]\ncity_b = [18, 19, 20, 18, 17, 19, 21]\n\n# TODO: Create subplots (1 row, 2 columns)\n\n# TODO: Plot city_a on axes[0]\n\n# TODO: Plot city_b on axes[1]\n\n# TODO: Add suptitle, tight_layout, and show\n",
    "grader_checks": []
  },
  {
    "id": "ch-ds-mod3-q4",
    "lesson_id": "ds-mod3-03-types",
    "title": "Product Sales Scatter & Correlation",
    "prompt": "## Case Study: Product Sales Scatter & Correlation\n\nThe marketing department wants to know if spending more on ads leads to higher sales.\n\n### Task\n1. Create a scatter plot of `ad_spend` (x) vs `sales` (y).\n2. Use `np.polyfit(ad_spend, sales, 1)` to calculate the line of best fit (trend line). \n3. Plot the trend line over the scatter plot.\n4. Show the plot.\n\nTopics: scatter plot, trend line, np.polyfit, colorbar, correlation.",
    "starter_code": "import matplotlib.pyplot as plt\nimport numpy as np\n\nad_spend = np.array([100, 200, 300, 400, 500])\nsales = np.array([150, 250, 400, 500, 650])\n\n# TODO: Create a scatter plot\n\n# TODO: Calculate line of best fit using np.polyfit\nm, b = np.polyfit(ad_spend, sales, 1)\n\n# TODO: Plot the trend line (y = mx + b)\nplt.plot(ad_spend, m*ad_spend + b, color='red')\n\n# TODO: Display the plot\n",
    "grader_checks": [
      {
        "variable": "round(m, 2)",
        "condition": "eq",
        "value": 1.25,
        "message": "Slope of the trend line should be approximately 1.25"
      }
    ]
  }
];

// 3. Inject the new challenges
data.CHALLENGES.push(...newChallenges);

// 4. Save to data.json
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');

console.log('Successfully replaced Unit 2 and Unit 3 challenges with 8 new case study questions.');
