const fs = require('fs');

const dataPath = 'src/lib/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.CURRICULUM[0].topics.forEach(t => {
  if (t.topic.includes('Module 1:')) {
    t.topic = 'Unit 1: Intro to Data Science & Python Foundations';
  } else if (t.topic.includes('Module 2: Exploratory Data Analysis')) {
    t.topic = 'Unit 2: Data Handling & Data Wrangling';
  } else if (t.topic.includes('Module 3: Data Visualization')) {
    t.topic = 'Unit 3: Data Visualization using Matplotlib';
  }
});

// We also need to update the `topic` field inside the lessons to match, 
// as the UI groups them by the `topic` string.
data.CURRICULUM[0].topics.forEach(t => {
  t.lessons.forEach(l => {
    l.topic = t.topic;
  });
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Renamed modules to explicitly mention Unit 1, 2, and 3');
