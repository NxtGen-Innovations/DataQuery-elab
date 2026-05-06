const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const topicName = "Module 2: Exploratory Data Analysis (EDA)";
let topicObj = data.CURRICULUM[0].topics.find(t => t.topic === topicName);

const newLessons = [
  {
    "id": "ds-mod2-05-data-handling",
    "title": "Data Handling & Large Volumes",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Handling Large Volumes of Data\n\nWhen dealing with millions of rows, memory management becomes critical. Pandas loads data entirely into RAM. For large files, you must use chunking or alternative libraries like Dask or Polars."
  },
  {
    "id": "ds-mod2-06-wrangling",
    "title": "Data Wrangling",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Data Wrangling\n\nWrangling is the process of cleaning, structuring, and enriching raw data into a desired format for better decision making."
  },
  {
    "id": "ds-mod2-07-combining",
    "title": "Combining & Merging Datasets",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Merging Datasets\n\nSimilar to SQL JOINs, Pandas uses `pd.merge()`. You can merge on indices or specific columns (e.g., `user_id`). `pd.concat()` is used to stack DataFrames vertically or horizontally."
  },
  {
    "id": "ds-mod2-08-cleaning",
    "title": "Handling Missing Values",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Handling Missing Values\n\nMissing data can skew models. Use `df.dropna()` to remove them or `df.fillna()` to impute them (replace with mean/median)."
  },
  {
    "id": "ds-mod2-09-transformation",
    "title": "Data Transformation",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "advanced",
    "content_md": "# Data Transformation & String Manipulation\n\nOften you need to extract parts of a string using Regex (`.str.extract()`) or map categorical values to numerical ones."
  }
];

newLessons.forEach(nl => {
  if (!topicObj.lessons.some(l => l.id === nl.id)) {
    topicObj.lessons.push(nl);
  }
});

const newChallenges = [
  {
    "id": "ch-ds-mod2-07",
    "lesson_id": "ds-mod2-07-combining",
    "title": "Case Study: E-commerce DB Merge",
    "prompt": "## Case Study: E-commerce Startup\n\nYou have two dataframes: `users` and `orders`. Merge them into a single dataframe `merged_df` using the `user_id` column.",
    "starter_code": "import pandas as pd\n\nusers = pd.DataFrame({'user_id': [1, 2], 'name': ['Alice', 'Bob']})\norders = pd.DataFrame({'order_id': [101, 102], 'user_id': [1, 2], 'amount': [50, 80]})\n\n# TODO: Create merged_df\n",
    "grader_checks": [
      {
        "variable": "merged_df.shape",
        "condition": "shape_check",
        "value": "(2, 4)"
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
console.log('Unit 2 successfully implemented.');
