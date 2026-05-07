const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const topics = data.CURRICULUM[0].topics;
const u3 = topics.find(t => t.topic.includes('Unit 3'));

// ===== Upgrade Unit 3 LESSONS =====
u3.lessons = [
  {
    id: "ds-mod3-02-customizing",
    title: "3.1 Monthly Sales Report",
    domain: "Data Science",
    topic: u3.topic,
    difficulty: "beginner",
    content_md: `# Line & Bar Plots with Matplotlib

Line plots show trends over time. Bar plots compare categorical values. Together, they cover 80% of business reporting needs.

**Real-world Analogy**: A line plot is like tracking your daily step count on a fitness app — you see the trend over days. A bar plot is like comparing your monthly electricity bills — discrete categories side by side.

### Line Plot
\`\`\`python
plt.plot(x, y, color='blue', marker='o', linestyle='--')
plt.title('Sales Trend')
plt.xlabel('Month')
plt.ylabel('Revenue ($)')
plt.grid(True)
plt.show()
\`\`\`

### Bar Plot
\`\`\`python
plt.bar(categories, values, color='teal')
plt.title('Category Comparison')
plt.show()
\`\`\`

### Essential Customization

| Function | Purpose | Example |
|---|---|---|
| \`plt.title()\` | Chart title | \`plt.title('Q1 Sales')\` |
| \`plt.xlabel()\` / \`plt.ylabel()\` | Axis labels | \`plt.xlabel('Month')\` |
| \`plt.grid(True)\` | Background grid | Improves readability |
| \`plt.legend()\` | Legend for multiple series | \`plt.legend(['2024', '2025'])\` |
| \`plt.xticks(rotation=45)\` | Rotate x-axis labels | Prevents overlap |

### Industry Use Cases
- **Finance**: Monthly revenue trend lines for board presentations.
- **Marketing**: Bar charts comparing campaign performance across channels.
- **Operations**: Daily order volume trends to plan staffing.`
  },
  {
    id: "ds-mod3-03-types",
    title: "3.2 Student Score Distribution",
    domain: "Data Science",
    topic: u3.topic,
    difficulty: "intermediate",
    content_md: `# Histograms & Box Plots

When you need to understand the *shape* of your data — not just the average — distribution plots are essential.

**Real-world Analogy**: Imagine 100 students took an exam. The average is 70. But are most students clustered around 70? Or are there two groups — one around 50 and one around 90? A histogram reveals this hidden pattern.

### Histogram
Shows frequency distribution — how many data points fall in each range (bin).
\`\`\`python
plt.hist(scores, bins=15, color='steelblue', edgecolor='black')
plt.title('Score Distribution')
plt.xlabel('Score')
plt.ylabel('Frequency')
plt.show()
\`\`\`

### Box Plot (Box-and-Whisker)
Shows median, quartiles (Q1, Q3), and outliers in one compact visual.
\`\`\`python
plt.boxplot(scores, vert=True)
plt.title('Score Spread')
plt.show()
\`\`\`

### Reading a Box Plot
| Component | Meaning |
|---|---|
| Center line | Median (50th percentile) |
| Box edges | Q1 (25th) to Q3 (75th) — the IQR |
| Whiskers | 1.5 × IQR from box edges |
| Dots beyond whiskers | **Outliers** |

### When to Use What
| Question | Plot |
|---|---|
| "What's the shape of the distribution?" | Histogram |
| "Are there outliers?" | Box Plot |
| "Is the data skewed?" | Both |

### Key NumPy Function
\`\`\`python
# Generate 100 scores from a normal distribution
np.random.seed(42)
scores = np.random.normal(mean=70, std=15, size=100)
\`\`\``
  },
  {
    id: "ds-mod3-03-subplots",
    title: "3.3 City Temperature Analysis",
    domain: "Data Science",
    topic: u3.topic,
    difficulty: "intermediate",
    content_md: `# Multiple Subplots

When comparing two or more datasets visually, putting them side-by-side in subplots makes patterns immediately obvious.

**Real-world Analogy**: Imagine comparing two X-ray scans of a patient — left lung vs right lung. You'd place them side by side, not overlay them. Subplots do the same for data.

### Creating Subplots
\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].plot(x, y1, color='tomato')
axes[0].set_title('City A')

axes[1].plot(x, y2, color='dodgerblue')
axes[1].set_title('City B')

plt.suptitle('Temperature Comparison')
plt.tight_layout()
plt.show()
\`\`\`

### Key Parameters

| Parameter | Purpose |
|---|---|
| \`plt.subplots(nrows, ncols)\` | Grid layout (rows × columns) |
| \`figsize=(width, height)\` | Figure size in inches |
| \`axes[i]\` | Access individual subplot |
| \`plt.suptitle()\` | Super-title above all subplots |
| \`plt.tight_layout()\` | Auto-fix spacing to prevent overlap |

### Common Layouts
| Layout | Code |
|---|---|
| 2 side-by-side | \`plt.subplots(1, 2)\` |
| 2 stacked | \`plt.subplots(2, 1)\` |
| 2×2 grid | \`plt.subplots(2, 2)\` |

### Industry Use Cases
- **Weather**: Comparing temperature trends across cities.
- **A/B Testing**: Side-by-side conversion rate plots for control vs experiment.
- **Finance**: Stock price comparison across companies.`
  },
  {
    id: "ds-mod3-03-scatter",
    title: "3.4 Product Sales Scatter & Correlation",
    domain: "Data Science",
    topic: u3.topic,
    difficulty: "intermediate",
    content_md: `# Scatter Plots & Trend Lines

Scatter plots reveal relationships between two continuous variables. Adding a trend line quantifies that relationship mathematically.

**Real-world Analogy**: Plot every student's study hours (x) vs their exam score (y). If the dots trend upward, more study = better scores. The trend line gives you the exact formula: "Each extra hour adds ~5 points."

### Scatter Plot
\`\`\`python
plt.scatter(x, y, color='purple', alpha=0.7)
plt.title('Ad Spend vs Sales')
plt.xlabel('Ad Spend ($)')
plt.ylabel('Sales ($)')
plt.show()
\`\`\`

### Adding a Trend Line with np.polyfit
\`\`\`python
m, b = np.polyfit(x, y, 1)  # degree=1 → linear fit
plt.plot(x, m*x + b, color='red', linestyle='--')
\`\`\`

- **m** = slope (how much y changes per unit of x)
- **b** = intercept (y-value when x = 0)

### Interpreting Scatter Patterns

| Pattern | Correlation | Example |
|---|---|---|
| Dots trend ↗ upward | **Positive** | More ads → more sales |
| Dots trend ↘ downward | **Negative** | Higher price → fewer buyers |
| Random cloud | **None** | Shoe size vs exam score |

### Correlation Coefficient (r)
| Range | Strength |
|---|---|
| 0.8 to 1.0 | Strong positive |
| 0.5 to 0.8 | Moderate positive |
| -0.5 to 0.5 | Weak or none |
| -0.8 to -1.0 | Strong negative |

### Industry Use Cases
- **Marketing**: Measuring the ROI of ad spend against revenue.
- **Real Estate**: Price vs square footage with trend line for valuation.
- **Healthcare**: Dose vs response curves in clinical trials.`
  }
];

// ===== Add Unit 3 Quizzes =====
data.QUIZZES = data.QUIZZES.filter(q => !q.lesson_id.startsWith('ds-mod3-0'));

const u3Quizzes = [
  {
    id: "quiz-ds-mod3-02-customizing",
    lesson_id: "ds-mod3-02-customizing",
    title: "Line & Bar Plots Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "Which matplotlib function creates a line plot?",
        options: ["plt.bar()", "plt.scatter()", "plt.plot()", "plt.hist()"],
        correct_answer: "plt.plot()",
        explanation: "plt.plot() creates a line chart by connecting data points. plt.bar() creates bars, plt.scatter() creates dots, and plt.hist() creates histograms."
      },
      {
        id: "q2", type: "mcq",
        question: "You created a plot but the labels are overlapping. Which function helps add spacing automatically?",
        options: ["plt.grid(True)", "plt.tight_layout()", "plt.legend()", "plt.savefig()"],
        correct_answer: "plt.tight_layout()",
        explanation: "tight_layout() automatically adjusts subplot parameters so that labels, titles, and axes don't overlap."
      },
      {
        id: "q3", type: "mcq",
        question: "What happens if you call plt.show() before plt.title()?",
        options: ["The title appears normally", "The title won't appear on the plot", "Python throws an error", "The plot appears twice"],
        correct_answer: "The title won't appear on the plot",
        explanation: "plt.show() renders and displays the current figure. Any customization added after show() won't appear because the figure has already been drawn."
      }
    ]
  },
  {
    id: "quiz-ds-mod3-03-types",
    lesson_id: "ds-mod3-03-types",
    title: "Histograms & Box Plots Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "What does the 'bins' parameter in plt.hist() control?",
        options: ["The color of bars", "How many intervals the data is divided into", "The height of the tallest bar", "The data type of the input"],
        correct_answer: "How many intervals the data is divided into",
        explanation: "Bins determine the number of ranges. More bins = finer resolution of the distribution, fewer bins = smoother but less detailed view."
      },
      {
        id: "q2", type: "mcq",
        question: "In a box plot, what do the dots beyond the whiskers represent?",
        options: ["Missing values", "The mean", "Outliers", "Standard deviation"],
        correct_answer: "Outliers",
        explanation: "Points beyond 1.5 × IQR from the box edges are considered outliers — unusually high or low values that may warrant investigation."
      },
      {
        id: "q3", type: "mcq",
        question: "np.random.normal(70, 15, 100) generates 100 values. What does the '15' represent?",
        options: ["The mean", "The sample size", "The standard deviation", "The seed value"],
        correct_answer: "The standard deviation",
        explanation: "The function signature is normal(mean, std, size). So 70 is the center, 15 is the spread (standard deviation), and 100 is how many values to generate."
      }
    ]
  },
  {
    id: "quiz-ds-mod3-03-subplots",
    lesson_id: "ds-mod3-03-subplots",
    title: "Multiple Subplots Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "What does `plt.subplots(1, 2)` create?",
        options: ["2 rows, 1 column of plots", "1 row, 2 columns of plots", "A single plot with 2 lines", "A 2x2 grid of plots"],
        correct_answer: "1 row, 2 columns of plots",
        explanation: "The first argument is rows, the second is columns. So (1, 2) means 1 row with 2 side-by-side subplots."
      },
      {
        id: "q2", type: "mcq",
        question: "How do you set the title for the second subplot in a 1×2 grid?",
        options: ["plt.title('Title')", "axes[1].set_title('Title')", "axes[2].set_title('Title')", "fig.set_title('Title')"],
        correct_answer: "axes[1].set_title('Title')",
        explanation: "Subplots are 0-indexed. axes[0] is the first, axes[1] is the second. Use set_title() on individual axes, not plt.title() which applies to the current active plot."
      },
      {
        id: "q3", type: "mcq",
        question: "What is the purpose of plt.suptitle()?",
        options: ["Sets the title of a single subplot", "Sets a super-title above ALL subplots", "Replaces plt.title()", "Changes the font of all titles"],
        correct_answer: "Sets a super-title above ALL subplots",
        explanation: "suptitle() (short for 'super title') adds a main heading that spans the entire figure, above all individual subplot titles."
      }
    ]
  },
  {
    id: "quiz-ds-mod3-03-scatter",
    lesson_id: "ds-mod3-03-scatter",
    title: "Scatter Plots & Correlation Quiz",
    questions: [
      {
        id: "q1", type: "mcq",
        question: "What does `np.polyfit(x, y, 1)` return?",
        options: ["A scatter plot", "The correlation coefficient", "The slope (m) and intercept (b) of the best-fit line", "A polynomial equation object"],
        correct_answer: "The slope (m) and intercept (b) of the best-fit line",
        explanation: "With degree=1, polyfit performs linear regression and returns [m, b] where y = mx + b is the line of best fit."
      },
      {
        id: "q2", type: "mcq",
        question: "A scatter plot shows points trending downward from left to right. What type of correlation is this?",
        options: ["Positive correlation", "No correlation", "Negative correlation", "Perfect correlation"],
        correct_answer: "Negative correlation",
        explanation: "A downward trend means as x increases, y decreases — this is a negative correlation (e.g., higher price → fewer units sold)."
      },
      {
        id: "q3", type: "mcq",
        question: "If the slope (m) from polyfit is 1.25, what does this mean?",
        options: ["The data has 1.25 outliers", "For every $1 increase in x, y increases by $1.25", "The correlation is 1.25", "25% of the data is missing"],
        correct_answer: "For every $1 increase in x, y increases by $1.25",
        explanation: "The slope represents the rate of change. m=1.25 means each unit increase in x (e.g., ad spend) corresponds to a 1.25 unit increase in y (e.g., sales)."
      }
    ]
  }
];

data.QUIZZES.push(...u3Quizzes);

// ===== Upgrade Unit 3 Lab Prompts =====
const u3Prompts = {
  "ch-ds-mod3-q1": `## eLab Case Study 3.1: Monthly Sales Report

### Scenario
You are the data analyst at **BrightMart**, a retail chain. The CEO has asked for a visual report of Q1 sales performance to present at the next board meeting.

### Dataset
| Month | Sales ($) |
|---|---|
| Jan | 1,500 |
| Feb | 2,000 |
| Mar | 1,800 |
| Apr | 2,200 |

### Your Tasks
1. Create a **line plot** with months on the x-axis and sales on the y-axis.
2. Add the title **"Q1 Sales"**.
3. Label the x-axis as **"Month"** and y-axis as **"Sales ($)"**.
4. Enable the **grid** for better readability.
5. Call \`plt.show()\` to render the plot.

### Expected Output
A clean line chart showing the sales trend across 4 months with proper labels and grid.`,

  "ch-ds-mod3-q2": `## eLab Case Study 3.2: Student Score Distribution

### Scenario
The examination board at **National Academy** wants to understand the spread of standardized test scores. Are most students clustered around the passing mark, or is there a wide spread? Are there any extreme outliers?

### Dataset
100 scores generated from a normal distribution: mean = 70, std = 15.

### Your Tasks
1. Create a **histogram** using \`plt.hist()\` with **15 bins**.
2. Add the title **"Score Distribution"**.
3. Call \`plt.show()\` to display the chart.

### Expected Output
A histogram showing the bell-curve distribution of student scores. Most scores should cluster around 70.`,

  "ch-ds-mod3-q3": `## eLab Case Study 3.3: City Temperature Analysis

### Scenario
The meteorological department wants to compare the daily temperatures of **City A** and **City B** over a week. The best way to compare is a side-by-side subplot layout.

### Datasets
| Day | City A (°C) | City B (°C) |
|---|---|---|
| 1 | 22 | 18 |
| 2 | 24 | 19 |
| 3 | 23 | 20 |
| 4 | 25 | 18 |
| 5 | 27 | 17 |
| 6 | 28 | 19 |
| 7 | 26 | 21 |

### Your Tasks
1. Create a figure with **1 row and 2 columns** using \`plt.subplots(1, 2, figsize=(10, 4))\`.
2. Plot City A temperatures on the **left subplot** (\`axes[0]\`).
3. Plot City B temperatures on the **right subplot** (\`axes[1]\`).
4. Add a **suptitle** "Temperature Comparison".
5. Use \`plt.tight_layout()\` and \`plt.show()\`.

### Expected Output
Two side-by-side line charts comparing the weekly temperature trends of both cities.`,

  "ch-ds-mod3-q4": `## eLab Case Study 3.4: Product Sales Scatter & Correlation

### Scenario
The marketing team at **AdVantage Corp** has been running campaigns with varying budgets. They want to know: **does spending more on ads actually lead to higher sales?**

### Dataset
| Ad Spend ($) | Sales ($) |
|---|---|
| 100 | 150 |
| 200 | 250 |
| 300 | 400 |
| 400 | 500 |
| 500 | 650 |

### Your Tasks
1. Create a **scatter plot** of ad spend (x) vs sales (y).
2. Calculate the **trend line** using \`np.polyfit(ad_spend, sales, 1)\` to get slope (\`m\`) and intercept (\`b\`).
3. Plot the trend line over the scatter plot.
4. Call \`plt.show()\`.

### Expected Output
- A scatter plot with a red trend line overlaid.
- Slope (\`m\`) ≈ **1.25** — meaning every $1 in ad spend generates $1.25 in sales.`
};

data.CHALLENGES.forEach(c => {
  if (u3Prompts[c.id]) {
    c.prompt = u3Prompts[c.id];
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Unit 3 lessons, quizzes (4×3), and lab prompts fully upgraded.');
