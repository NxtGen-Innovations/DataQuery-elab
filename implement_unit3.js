const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// If Unit 3 topic doesn't exist, create it.
const topicName = "Module 3: Data Visualization using Matplotlib";
let topicObj = data.CURRICULUM[0].topics.find(t => t.topic === topicName);

if (!topicObj) {
  topicObj = {
    "topic": topicName,
    "lessons": []
  };
  // Insert it before Predictive Modeling (which is Module 3 now, let's just push it to the end of topics for simplicity, or splice it)
  data.CURRICULUM[0].topics.splice(2, 0, topicObj);
}

const newLessons = [
  {
    "id": "ds-mod3-01-matplotlib",
    "title": "Intro to Matplotlib",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "beginner",
    "content_md": "# Introduction to Matplotlib\n\nMatplotlib is the grandfather of Python plotting libraries. It was created to replicate MATLAB's plotting capabilities in Python. `pyplot` is the main module used."
  },
  {
    "id": "ds-mod3-02-customizing",
    "title": "Customizing Plots",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Customizing Plots\n\nAdding titles, changing colors, and adding labels makes your plots readable.\n`plt.title('Sales')`, `plt.xlabel('Month')`, `plt.legend()`."
  },
  {
    "id": "ds-mod3-03-types",
    "title": "Types of Plots",
    "domain": "Data Science",
    "topic": topicName,
    "difficulty": "intermediate",
    "content_md": "# Plot Types\n\n- **Scatter Plot**: Show correlation (`plt.scatter()`).\n- **Line Plot**: Show trends over time (`plt.plot()`).\n- **Bar Plot**: Compare categorical data (`plt.bar()`).\n- **Histogram**: Show frequency distribution (`plt.hist()`)."
  }
];

newLessons.forEach(nl => {
  if (!topicObj.lessons.some(l => l.id === nl.id)) {
    topicObj.lessons.push(nl);
  }
});

const newChallenges = [
  {
    "id": "ch-ds-mod3-03",
    "lesson_id": "ds-mod3-03-types",
    "title": "Case Study: Startup Growth Line Plot",
    "prompt": "## Case Study: Startup Growth\n\nYour startup has gained users over 4 months: `[100, 250, 500, 1000]`. Create a line plot using matplotlib to visualize this trajectory.",
    "starter_code": "import matplotlib.pyplot as plt\n\nmonths = [1, 2, 3, 4]\nusers = [100, 250, 500, 1000]\n\n# TODO: Plot months vs users using plt.plot()\nplt.plot(months, users)\nplt.title('Startup Growth')\nplt.show()\n",
    "grader_checks": []
  }
];

newChallenges.forEach(nc => {
  if (!data.CHALLENGES.some(c => c.lesson_id === nc.lesson_id)) {
    data.CHALLENGES.push(nc);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Unit 3 successfully implemented.');
