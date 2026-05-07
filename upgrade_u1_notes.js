const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const topics = data.CURRICULUM[0].topics;
const u1 = topics.find(t => t.topic.includes('Unit 1'));

// ===== Replace Unit 1 lessons with 4 focused ones =====
u1.lessons = [
  {
    id: "ds-mod1-00a",
    title: "1.1 Intro to Data Science & Python",
    domain: "Data Science",
    topic: u1.topic,
    difficulty: "beginner",
    content_md: `# Introduction to Data Science & Python

Data Science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data.

**Real-world Analogy**: Think of a Data Scientist as a detective. A detective collects clues (data), processes them (cleaning), looks for patterns (analysis), and finally solves the case (insights). Python is the detective's toolkit.

### Why Python for Data Science?
| Feature | Benefit |
|---|---|
| Simple syntax | Easy to learn, reads like English |
| Rich ecosystem | NumPy, Pandas, Matplotlib, Scikit-Learn |
| Community | Millions of tutorials, StackOverflow answers |
| Industry standard | Used by Google, Netflix, NASA, banks |

### The Data Science Lifecycle (CRISP-DM)
1. **Business Understanding** — What problem are we solving?
2. **Data Acquisition** — Gather data from APIs, databases, CSVs
3. **Data Preparation** — Clean, handle missing values, standardize (takes ~80% of time!)
4. **Exploratory Analysis** — Visualize patterns, find correlations
5. **Modeling** — Apply ML algorithms
6. **Evaluation & Deployment** — Test accuracy, push to production

### Types of Data
| Type | Description | Example |
|---|---|---|
| **Structured** | Organized in rows/columns | SQL databases, CSVs, Excel |
| **Unstructured** | No predefined format | Images, videos, tweets, audio |
| **Semi-structured** | Has tags but not tabular | JSON, XML, HTML |

### Python Variables & Types
\`\`\`python
shop_name = "Brew Data"      # str
daily_sales = 150             # int
avg_rating = 4.7              # float
is_open = True                # bool
\`\`\`

### Key Principle
> "80% of a Data Scientist's time is spent cleaning data. The remaining 20% is spent complaining about cleaning data."

### Industry Use Cases
- **Healthcare**: Predicting patient readmissions from hospital records.
- **E-commerce**: Amazon's recommendation engine ("Customers also bought...").
- **Finance**: Real-time fraud detection on credit card transactions.
- **Sports**: Player performance analytics and injury prediction.`
  },
  {
    id: "ds-mod1-00b",
    title: "1.2 NumPy Foundations",
    domain: "Data Science",
    topic: u1.topic,
    difficulty: "beginner",
    content_md: `# NumPy — Numerical Python

NumPy is the foundational library for scientific computing in Python. It provides fast, memory-efficient arrays and mathematical operations that work on entire arrays at once (vectorization).

**Real-world Analogy**: Imagine multiplying every price in a 10,000-row spreadsheet by 1.1 (10% tax). With a Python list, you'd loop through each cell one-by-one. NumPy selects the entire column and multiplies it instantly — like a magic wand.

### Why NumPy Over Python Lists?
| Feature | Python List | NumPy Array |
|---|---|---|
| Speed | Slow (loop-based) | Fast (vectorized C code) |
| Memory | ~28 bytes per element | ~8 bytes per element |
| Operations | Manual loops needed | Element-wise built-in |
| Data types | Can mix types | Homogeneous (one type) |

### Creating Arrays
\`\`\`python
import numpy as np

a = np.array([10, 25, 40, 50])         # From a list
zeros = np.zeros((3, 3))                # 3x3 matrix of 0s
ones = np.ones((2, 4))                  # 2x4 matrix of 1s
seq = np.arange(0, 10, 2)              # [0, 2, 4, 6, 8]
\`\`\`

### Array Attributes
| Attribute | What It Returns | Example |
|---|---|---|
| \`.shape\` | Dimensions as tuple | \`(3, 4)\` = 3 rows, 4 cols |
| \`.ndim\` | Number of dimensions | \`2\` for a matrix |
| \`.size\` | Total element count | \`12\` for a 3×4 array |
| \`.dtype\` | Data type | \`int64\`, \`float64\` |

### Vectorized Operations
\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b       # [5, 7, 9]   — element-wise add
a * b       # [4, 10, 18] — element-wise multiply
a * 2.20462 # [2.2, 4.4, 6.6] — scalar broadcast
np.dot(a,b) # 32 — dot product (matrix multiplication)
\`\`\`

### Useful Functions
| Function | Purpose |
|---|---|
| \`np.sum(a)\` | Sum all elements |
| \`np.mean(a)\` | Average |
| \`np.max(a)\` / \`np.min(a)\` | Maximum / Minimum |
| \`np.sqrt(a)\` | Square root of each element |

### Industry Use Cases
- **Image Processing**: Images are stored as 3D NumPy arrays (Height × Width × RGB).
- **Finance**: Vectorized computation on millions of stock prices.
- **Machine Learning**: All ML libraries (Scikit-Learn, TensorFlow) use NumPy arrays internally.`
  },
  {
    id: "ds-mod1-08-dfs",
    title: "1.3 Pandas Series & DataFrames",
    domain: "Data Science",
    topic: u1.topic,
    difficulty: "beginner",
    content_md: `# Pandas — Series & DataFrames

Pandas is the go-to library for data manipulation and analysis. It provides two core data structures: **Series** (1D) and **DataFrame** (2D).

**Real-world Analogy**: A Series is like a single column in an Excel sheet (e.g., a list of temperatures). A DataFrame is the entire Excel sheet with rows and multiple columns.

### Series — 1D Labeled Array
\`\`\`python
import pandas as pd

temps = pd.Series([22, 25, 28], index=['Mon', 'Tue', 'Wed'])
print(temps['Tue'])  # 25
\`\`\`

### Series vs NumPy Array
| Feature | NumPy Array | Pandas Series |
|---|---|---|
| Index | Numeric only (0, 1, 2...) | Custom labels ('Mon', 'Tue'...) |
| Data types | Single type | Single type + NaN support |
| Alignment | By position | By label (auto-aligns) |

### DataFrame — 2D Table
\`\`\`python
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['Chennai', 'Mumbai', 'Delhi']
})
\`\`\`

### Essential DataFrame Operations
| Operation | Code | What It Does |
|---|---|---|
| View first N rows | \`df.head(5)\` | Quick preview |
| Shape | \`df.shape\` | (rows, columns) tuple |
| Column types | \`df.dtypes\` | Data type of each column |
| Summary stats | \`df.describe()\` | Count, mean, std, min, max |
| Select column | \`df['Name']\` | Returns a Series |
| Filter rows | \`df[df['Age'] > 28]\` | Boolean filtering |
| Sort | \`df.sort_values('Age')\` | Sort by column |

### Creating DataFrames From Different Sources
\`\`\`python
# From dictionary
df = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})

# From CSV file
df = pd.read_csv('data.csv')

# From list of lists
df = pd.DataFrame([[1, 'a'], [2, 'b']], columns=['Num', 'Letter'])
\`\`\`

### Data Acquisition Methods
| Source | Tool | Example |
|---|---|---|
| CSV / Excel | \`pd.read_csv()\` | \`pd.read_csv('sales.csv')\` |
| Web API | \`requests\` library | Fetch JSON from REST APIs |
| Database | \`SQLAlchemy\` | Connect to MySQL, PostgreSQL |
| Web Scraping | \`BeautifulSoup\` | Extract data from HTML pages |

### Industry Use Cases
- **HR**: Employee rosters stored as DataFrames for salary analysis.
- **Retail**: Loading sales CSVs and filtering by region/product.
- **Research**: Reading experimental data and computing summary statistics.`
  },
  {
    id: "ds-mod1-03",
    title: "1.4 Data Cleaning Basics",
    domain: "Data Science",
    topic: u1.topic,
    difficulty: "beginner",
    content_md: `# Data Cleaning Basics

Real-world data is messy. Missing values, duplicates, and inconsistent formatting are the norm. Data cleaning is the process of fixing these issues before analysis.

**Real-world Analogy**: You receive a box of handwritten survey forms. Some are half-filled, some have duplicate entries, and some have illegible handwriting. Before you can analyze the responses, you must clean and standardize every form.

### The "80% Rule"
> Data scientists spend approximately 80% of their time cleaning and preparing data, and only 20% on actual analysis or modeling.

### Common Data Quality Issues
| Problem | Example | Pandas Fix |
|---|---|---|
| Missing values | NaN in age column | \`fillna()\` or \`dropna()\` |
| Duplicates | Same row appears twice | \`drop_duplicates()\` |
| Wrong data type | Age stored as string "25" | \`astype(int)\` |
| Inconsistent text | "CS", "cs", "Comp Sci" | \`str.lower()\`, \`replace()\` |
| Outliers | Age = 999 | Filter with boolean indexing |

### Handling Missing Values
\`\`\`python
# Check for missing values
df.isnull().sum()

# Drop rows with any NaN
df_clean = df.dropna()

# Fill NaN with a specific value
df['grade'].fillna(df['grade'].mean(), inplace=True)
\`\`\`

### Removing Duplicates
\`\`\`python
# Check for duplicates
df.duplicated().sum()

# Remove duplicates
df = df.drop_duplicates()

# Remove duplicates based on specific column
df = df.drop_duplicates(subset=['student_id'])
\`\`\`

### Filtering & Boolean Indexing
\`\`\`python
# Filter CS department students
cs_students = df[df['Department'] == 'CS']

# Multiple conditions (use & for AND, | for OR)
top_cs = df[(df['Department'] == 'CS') & (df['Grade'] > 80)]
\`\`\`

### Quick Summary Functions
| Function | Returns |
|---|---|
| \`df.describe()\` | Count, mean, std, min, Q1, median, Q3, max |
| \`df['col'].mean()\` | Average of column |
| \`df['col'].median()\` | Middle value |
| \`df['col'].value_counts()\` | Frequency of each unique value |

### Industry Use Cases
- **Education**: Cleaning student records — filling missing grades, removing duplicate enrollments.
- **E-commerce**: Standardizing product names across different sellers.
- **Healthcare**: Removing impossible values (e.g., negative blood pressure).`
  }
];

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 1 lessons (notes) restructured to 4 focused lessons.');
