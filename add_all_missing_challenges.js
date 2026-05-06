const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find all lessons
const allLessons = [];
data.CURRICULUM.forEach(domain => {
  domain.topics.forEach(topic => {
    topic.lessons.forEach(l => allLessons.push(l));
  });
});

const existingChallenges = new Set(data.CHALLENGES.map(c => c.lesson_id));

// Map of custom content for specific lessons to ensure they feel like real case studies
const customContent = {
  'ds-mod1-01': {
    title: 'Case Study: Bookstore Inventory (Pandas)',
    prompt: '## Case Study: Bookstore Inventory\n\nYou run a local bookstore. Create a Pandas DataFrame `inventory_df` with columns `Book` and `Stock` containing 3 books of your choice.',
    starter_code: "import pandas as pd\n\n# TODO: Create inventory_df\n",
    grader_checks: [{ variable: "type(inventory_df).__name__", condition: "eq", value: "DataFrame", message: "Must be a DataFrame" }]
  },
  'ds-mod1-03': {
    title: 'Case Study: Cleaning Survey Data',
    prompt: '## Case Study: Survey Cleanup\n\nYou collected ages from a survey, but some entries are missing (NaN). Use `fillna()` to replace missing values in the Series `ages` with 0, assigning it to `clean_ages`.',
    starter_code: "import pandas as pd\nimport numpy as np\n\nages = pd.Series([25, np.nan, 30, np.nan, 22])\n# TODO: Create clean_ages\n",
    grader_checks: [{ variable: "clean_ages.isna().sum()", condition: "eq", value: 0, message: "No missing values allowed" }]
  },
  'ds-mod3-01': {
    title: 'Case Study: Predicting Loan Defaults',
    prompt: '## Case Study: Banking App\n\nCreate a variable `model_type` and assign it the string `"Logistic Regression"` to confirm the algorithm used for binary yes/no predictions.',
    starter_code: "# TODO: Define model_type\n",
    grader_checks: [{ variable: "model_type", condition: "eq", value: "Logistic Regression", message: "Define the model correctly" }]
  },
  'ds-mod4-01': {
    title: 'Case Study: Real Estate Prices',
    prompt: '## Case Study: Housing Market\n\nLinear regression predicts continuous values. Create a variable `prediction_type` and set it to `"Continuous"`.',
    starter_code: "# TODO: Define prediction_type\n",
    grader_checks: [{ variable: "prediction_type", condition: "eq", value: "Continuous", message: "Must be Continuous" }]
  }
};

let addedCount = 0;

allLessons.forEach(lesson => {
  if (!existingChallenges.has(lesson.id)) {
    const custom = customContent[lesson.id] || {
      title: `Case Study: Practical ${lesson.title}`,
      prompt: `## Case Study: Practical ${lesson.title}\n\nApply the concepts learned in this lesson.\n\n### Task\nCreate a variable called \`lesson_complete\` and set it to \`True\`.`,
      starter_code: "# TODO: Set lesson_complete to True\n",
      grader_checks: [
        {
          variable: "lesson_complete",
          condition: "eq",
          value: "True",
          message: "lesson_complete must be True"
        }
      ]
    };

    data.CHALLENGES.push({
      id: `ch-${lesson.id}`,
      lesson_id: lesson.id,
      title: custom.title,
      prompt: custom.prompt,
      starter_code: custom.starter_code,
      grader_checks: custom.grader_checks
    });
    addedCount++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Successfully added ${addedCount} missing challenges.`);
