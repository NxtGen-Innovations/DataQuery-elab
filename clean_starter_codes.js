const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Map of challenge IDs to their new clean starter codes
const cleanStarterCodes = {
  "ch-ds-mod2-q1": `import pandas as pd

patients = pd.DataFrame({
    'patient_id': [101, 102, 103, 104, 105],
    'age': [45, 50, None, 60, 65],
    'blood_pressure': [120, None, 130, 140, 125]
})

# Step 1: Calculate the median age
median_age = None

# Step 2: Fill the missing age values with the median

# Step 3: Drop rows where blood_pressure is missing and save as cleaned_patients
cleaned_patients = None

`,

  "ch-ds-mod2-q2": `import pandas as pd

customers = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})
orders = pd.DataFrame({
    'order_id': [1001, 1002, 1003, 1004],
    'customer_id': [1, 1, 2, 4],
    'amount': [250, 150, 300, 400]
})

# Step 1: Merge customers and orders using an inner join
merged_df = None

# Step 2: Group by customer_id and sum the amount
total_spent = None

`,

  "ch-ds-mod2-q3": `import pandas as pd

payroll = pd.DataFrame({
    'emp_id': [1, 2, 3],
    'name': ['john doe', 'JANE SMITH', 'bob'],
    'salary': ['$45,000', '$55,000', '$40,000']
})

# Step 1: Clean the salary column — remove '$' and ',' then convert to integer

# Step 2: Convert the name column to Title Case

`,

  "ch-ds-mod2-q4": `import pandas as pd

marks = pd.DataFrame({
    'student': ['Alice', 'Alice', 'Bob', 'Bob'],
    'subject': ['Math', 'Science', 'Math', 'Science'],
    'score': [85, 90, 78, 88]
})

# Step 1: Create a pivot table from the marks dataframe
pivot_df = None

`,

  "ch-ds-mod3-q1": `import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr']
sales = [1500, 2000, 1800, 2200]

# Create a line plot, add title, labels, grid, and display it

`,

  "ch-ds-mod3-q2": `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
scores = np.random.normal(70, 15, 100)

# Create a histogram with 15 bins, add a title, and display it

`,

  "ch-ds-mod3-q3": `import matplotlib.pyplot as plt
import numpy as np

days = np.arange(1, 8)
city_a = [22, 24, 23, 25, 27, 28, 26]
city_b = [18, 19, 20, 18, 17, 19, 21]

# Create subplots, plot both cities, add suptitle, and display

`,

  "ch-ds-mod3-q4": `import matplotlib.pyplot as plt
import numpy as np

ad_spend = np.array([100, 200, 300, 400, 500])
sales = np.array([150, 250, 400, 500, 650])

# Create a scatter plot, calculate and plot the trend line, then display

`
};

let updated = 0;
data.CHALLENGES.forEach(c => {
  if (cleanStarterCodes[c.id]) {
    c.starter_code = cleanStarterCodes[c.id];
    updated++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✅ Cleaned starter code for ${updated} challenges. No solutions exposed.`);
