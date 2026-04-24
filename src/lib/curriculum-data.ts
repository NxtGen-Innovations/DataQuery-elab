export interface Lesson {
  id: string
  title: string
  domain: string
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  content_md: string
}

export interface Quiz {
  id: string
  lesson_id: string
  title: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'fill_blank' | 'visual'
  question: string
  options?: string[]
  correct_answer: string
  explanation: string
  image_url?: string
}

export interface Challenge {
  id: string
  lesson_id: string
  title: string
  prompt: string
  starter_code: string
  grader_checks: GraderCheck[]
  dataset_snippet?: string
}

export interface GraderCheck {
  variable: string
  condition: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'type_check' | 'shape_check'
  value: number | string
  message: string
}

export const CURRICULUM: { domain: string; topics: { topic: string; lessons: Lesson[] }[] }[] = [
  {
    domain: 'Data Science',
    topics: [
      {
        topic: 'Foundations',
        lessons: [
          {
            id: 'ds-found-01',
            title: 'Normal Distribution',
            domain: 'Data Science',
            topic: 'Foundations',
            difficulty: 'beginner',
            content_md: `# Normal Distribution

The **Normal Distribution** (also called Gaussian distribution) is one of the most fundamental probability distributions in statistics.

## Definition

A random variable $X$ is normally distributed with mean $\\\\mu$ and variance $\\\\sigma^2$, written as $X \\\\sim \\\\mathcal{N}(\\\\mu, \\\\sigma^2)$, if its probability density function (PDF) is:

$$f(x) = \\\\frac{1}{\\\\sigma\\\\sqrt{2\\\\pi}} e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}$$

## Key Properties

- **Symmetry**: The distribution is perfectly symmetric around $\\\\mu$
- **Bell Curve**: The characteristic bell shape
- **68-95-99.7 Rule**:
  - $P(\\\\mu - \\\\sigma < X < \\\\mu + \\\\sigma) \\\\approx 68\\\\%$
  - $P(\\\\mu - 2\\\\sigma < X < \\\\mu + 2\\\\sigma) \\\\approx 95\\\\%$
  - $P(\\\\mu - 3\\\\sigma < X < \\\\mu + 3\\\\sigma) \\\\approx 99.7\\\\%$

## Standardization

Any normal distribution can be converted to the **Standard Normal** $Z \\\\sim \\\\mathcal{N}(0, 1)$ using:

$$Z = \\\\frac{X - \\\\mu}{\\\\sigma}$$

This process is called **standardization** or **z-scoring**.

## Mean, Variance, Skewness

| Statistic | Value |
|-----------|-------|
| Mean $E[X]$ | $\\\\mu$ |
| Variance $\\\\text{Var}(X)$ | $\\\\sigma^2$ |
| Skewness | $0$ |
| Kurtosis | $3$ |

## Central Limit Theorem

One reason the Normal distribution is so important: the **Central Limit Theorem** states that the sum of $n$ independent, identically distributed random variables with finite mean $\\\\mu$ and variance $\\\\sigma^2$ converges in distribution to:

$$\\\\bar{X}_n \\\\xrightarrow{d} \\\\mathcal{N}\\\\left(\\\\mu, \\\\frac{\\\\sigma^2}{n}\\\\right) \\\\text{ as } n \\\\to \\\\infty$$
`,
          },
          {
            id: 'ds-found-02',
            title: 'Binomial Distribution',
            domain: 'Data Science',
            topic: 'Foundations',
            difficulty: 'beginner',
            content_md: `# Binomial Distribution

The **Binomial Distribution** models the number of successes in $n$ independent Bernoulli trials.

## Definition

If $X \\\\sim B(n, p)$, then the probability mass function (PMF) is:

$$P(X = k) = \\\\binom{n}{k} p^k (1-p)^{n-k}, \\\\quad k = 0, 1, \\\\ldots, n$$

where $\\\\binom{n}{k} = \\\\frac{n!}{k!(n-k)!}$ is the **binomial coefficient**.

## Parameters

- $n$ — number of trials
- $p$ — probability of success on each trial

## Summary Statistics

$$E[X] = np$$
$$\\\\text{Var}(X) = np(1-p)$$
$$\\\\text{Std}(X) = \\\\sqrt{np(1-p)}$$

## Example

Tossing a fair coin ($p = 0.5$) 10 times ($n = 10$):

$$P(X = 5) = \\\\binom{10}{5}(0.5)^5(0.5)^5 = 252 \\\\times 0.03125^2 \\\\approx 0.246$$
`,
          },
          {
            id: 'ds-found-03',
            title: 'Introduction to Hypothesis Testing',
            domain: 'Data Science',
            topic: 'Foundations',
            difficulty: 'intermediate',
            content_md: `# Hypothesis Testing

**Hypothesis testing** is a formal statistical procedure for making decisions about population parameters using sample data.

## The Two Hypotheses

- **Null Hypothesis $H_0$**: The "no effect" or "status quo" statement
- **Alternative Hypothesis $H_1$ (or $H_a$)**: What we want to prove

## The p-value

The **p-value** is the probability of observing a test statistic at least as extreme as the one computed, assuming $H_0$ is true:

$$p\\\\text{-value} = P(T \\\\geq t_{obs} \\\\mid H_0)$$

If $p\\\\text{-value} < \\\\alpha$ (significance level, typically $0.05$), we **reject $H_0$**.

## Type I and Type II Errors

| | $H_0$ True | $H_0$ False |
|---|---|---|
| Reject $H_0$ | **Type I Error** ($\\\\alpha$) | Correct (Power $= 1-\\\\beta$) |
| Fail to Reject | Correct ($1-\\\\alpha$) | **Type II Error** ($\\\\beta$) |

## The t-Test

For comparing a sample mean $\\\\bar{x}$ to a known value $\\\\mu_0$:

$$t = \\\\frac{\\\\bar{x} - \\\\mu_0}{s / \\\\sqrt{n}}$$

where $s$ is the sample standard deviation and $n$ is the sample size.
`,
          },
        ],
      },
      {
        topic: 'Modeling',
        lessons: [
          {
            id: 'ds-model-01',
            title: 'Linear Regression',
            domain: 'Data Science',
            topic: 'Modeling',
            difficulty: 'beginner',
            content_md: `# Linear Regression

**Linear Regression** finds the best-fit line through data by minimizing a cost function.

## Model

For a single feature:
$$h_\\\\theta(x) = \\\\theta_0 + \\\\theta_1 x$$

For multiple features ($d$-dimensional):
$$h_\\\\theta(\\\\mathbf{x}) = \\\\theta^T \\\\mathbf{x} = \\\\sum_{j=0}^{d} \\\\theta_j x_j$$

## Cost Function

The **Mean Squared Error (MSE)** cost function:

$$J(\\\\theta) = \\\\frac{1}{2m} \\\\sum_{i=1}^{m} \\\\left(h_\\\\theta(x^{(i)}) - y^{(i)}\\\\right)^2$$

where $m$ is the number of training examples.

## Gradient Descent

Update rule for each parameter $\\\\theta_j$:

$$\\\\theta_j := \\\\theta_j - \\\\alpha \\\\frac{\\\\partial J(\\\\theta)}{\\\\partial \\\\theta_j}$$

$$\\\\frac{\\\\partial J}{\\\\partial \\\\theta_j} = \\\\frac{1}{m} \\\\sum_{i=1}^{m} \\\\left(h_\\\\theta(x^{(i)}) - y^{(i)}\\\\right) x_j^{(i)}$$

where $\\\\alpha$ is the **learning rate**.

## Normal Equation (Closed Form)

For small datasets, we can solve directly:

$$\\\\hat{\\\\theta} = (X^T X)^{-1} X^T \\\\mathbf{y}$$

## R² Score

Model quality is often measured with $R^2$:

$$R^2 = 1 - \\\\frac{\\\\text{SS}_{res}}{\\\\text{SS}_{tot}} = 1 - \\\\frac{\\\\sum_i (y_i - \\\\hat{y}_i)^2}{\\\\sum_i (y_i - \\\\bar{y})^2}$$
`,
          },
          {
            id: 'ds-model-02',
            title: 'Logistic Regression',
            domain: 'Data Science',
            topic: 'Modeling',
            difficulty: 'intermediate',
            content_md: `# Logistic Regression

Despite its name, **Logistic Regression** is a classification algorithm.

## The Sigmoid Function

The logistic (sigmoid) function maps any real number to $(0, 1)$:

$$\\\\sigma(z) = \\\\frac{1}{1 + e^{-z}}$$

## Model

$$h_\\\\theta(x) = \\\\sigma(\\\\theta^T x) = \\\\frac{1}{1 + e^{-\\\\theta^T x}}$$

Interpretation: $h_\\\\theta(x) = P(y=1 \\\\mid x; \\\\theta)$

## Decision Boundary

$$\\\\hat{y} = \\\\begin{cases} 1 & \\\\text{if } h_\\\\theta(x) \\\\geq 0.5 \\\\\\\\ 0 & \\\\text{otherwise} \\\\end{cases}$$

## Log-Loss (Cross-Entropy Cost)

$$J(\\\\theta) = -\\\\frac{1}{m} \\\\sum_{i=1}^{m} \\\\left[ y^{(i)} \\\\log h_\\\\theta(x^{(i)}) + (1-y^{(i)}) \\\\log(1-h_\\\\theta(x^{(i)})) \\\\right]$$

## Gradient Update

$$\\\\theta_j := \\\\theta_j - \\\\alpha \\\\frac{1}{m} \\\\sum_{i=1}^{m} \\\\left(h_\\\\theta(x^{(i)}) - y^{(i)}\\\\right) x_j^{(i)}$$
`,
          },
        ],
      },
      {
        topic: 'Evaluation',
        lessons: [
          {
            id: 'ds-eval-01',
            title: 'Classification Metrics',
            domain: 'Data Science',
            topic: 'Evaluation',
            difficulty: 'intermediate',
            content_md: `# Classification Metrics

Choosing the right metric is crucial for evaluating model performance.

## Confusion Matrix

For binary classification:

|  | Predicted Positive | Predicted Negative |
|--|--|--|
| **Actual Positive** | TP | FN |
| **Actual Negative** | FP | TN |

## Core Metrics

**Accuracy**: Overall correctness
$$\\\\text{Accuracy} = \\\\frac{TP + TN}{TP + TN + FP + FN}$$

**Precision**: Of all predicted positives, how many are actually positive?
$$\\\\text{Precision} = \\\\frac{TP}{TP + FP}$$

**Recall (Sensitivity)**: Of all actual positives, how many did we catch?
$$\\\\text{Recall} = \\\\frac{TP}{TP + FN}$$

**F1 Score**: Harmonic mean of Precision and Recall
$$F_1 = 2 \\\\cdot \\\\frac{\\\\text{Precision} \\\\times \\\\text{Recall}}{\\\\text{Precision} + \\\\text{Recall}}$$

## ROC-AUC

The **Area Under the ROC Curve (AUC)** measures the model's ability to discriminate between classes across all classification thresholds. $\\\\text{AUC} = 1.0$ is perfect; $\\\\text{AUC} = 0.5$ is random.
`,
          },
        ],
      },
    ],
  },
]

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-ds-found-01',
    lesson_id: 'ds-found-01',
    title: 'Normal Distribution Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the mean of a standard normal distribution $Z \\\\sim \\\\mathcal{N}(0, 1)$?',
        options: ['-1', '0', '1', '0.5'],
        correct_answer: '0',
        explanation: 'The standard normal distribution has mean $\\\\mu = 0$ and variance $\\\\sigma^2 = 1$ by definition.',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'According to the 68-95-99.7 rule, approximately what percentage of data falls within 2 standard deviations of the mean?',
        options: ['68%', '90%', '95%', '99.7%'],
        correct_answer: '95%',
        explanation: '$P(\\\\mu - 2\\\\sigma < X < \\\\mu + 2\\\\sigma) \\\\approx 95\\\\%$. This is a fundamental property of the normal distribution.',
      },
      {
        id: 'q3',
        type: 'mcq',
        question: 'If $X \\\\sim \\\\mathcal{N}(10, 4)$, what is the z-score of $x = 14$?',
        options: ['1', '2', '0.5', '4'],
        correct_answer: '2',
        explanation: '$Z = \\\\frac{x - \\\\mu}{\\\\sigma} = \\\\frac{14 - 10}{\\\\sqrt{4}} = \\\\frac{4}{2} = 2$',
      },
      {
        id: 'q4',
        type: 'fill_blank',
        question: 'The Normal distribution is symmetric around the ______.',
        correct_answer: 'mean',
        explanation: 'The normal distribution is perfectly symmetric around its mean $\\\\mu$.',
      },
    ],
  },
  {
    id: 'quiz-ds-model-01',
    lesson_id: 'ds-model-01',
    title: 'Linear Regression Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Which of the following is the cost function used in Linear Regression?',
        options: [
          'Cross-Entropy Loss',
          'Mean Squared Error',
          'Hinge Loss',
          'Absolute Error',
        ],
        correct_answer: 'Mean Squared Error',
        explanation: 'Linear Regression minimizes the Mean Squared Error (MSE): $J(\\\\theta) = \\\\frac{1}{2m}\\\\sum_{i=1}^{m}(h_\\\\theta(x^{(i)}) - y^{(i)})^2$',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'What does the learning rate $\\\\alpha$ control in gradient descent?',
        options: [
          'The number of iterations',
          'The step size of each update',
          'The initial value of parameters',
          'The batch size',
        ],
        correct_answer: 'The step size of each update',
        explanation: 'The learning rate $\\\\alpha$ controls how large each step is when updating parameters: $\\\\theta_j := \\\\theta_j - \\\\alpha \\\\frac{\\\\partial J}{\\\\partial \\\\theta_j}$',
      },
      {
        id: 'q3',
        type: 'mcq',
        question: 'An $R^2$ score of 1.0 indicates:',
        options: [
          'The model explains none of the variance',
          'The model perfectly explains all variance',
          'The model has high bias',
          'Overfitting has occurred',
        ],
        correct_answer: 'The model perfectly explains all variance',
        explanation: '$R^2 = 1$ means $SS_{res} = 0$, i.e., the model perfectly predicts all data points.',
      },
    ],
  },
  {
    id: 'quiz-ds-found-02',
    lesson_id: 'ds-found-02',
    title: 'Binomial Distribution Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What are the two parameters of a Binomial distribution?',
        options: ['Mean and variance', 'n (trials) and p (probability)', 'Alpha and beta', 'Lambda and mu'],
        correct_answer: 'n (trials) and p (probability)',
        explanation: 'A Binomial distribution $X \\\\sim B(n, p)$ is parameterized by $n$ (number of trials) and $p$ (probability of success per trial).',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'What is the expected value (mean) of $X \\\\sim B(10, 0.3)$?',
        options: ['0.3', '3', '7', '10'],
        correct_answer: '3',
        explanation: '$E[X] = np = 10 \\\\times 0.3 = 3$.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'The binomial coefficient $\\\\binom{n}{k}$ counts the number of ways to choose k items from ______ items.',
        correct_answer: 'n',
        explanation: '$\\\\binom{n}{k} = \\\\frac{n!}{k!(n-k)!}$ counts the number of ways to choose $k$ items from a set of $n$.',
      },
    ],
  },
  {
    id: 'quiz-ds-found-03',
    lesson_id: 'ds-found-03',
    title: 'Hypothesis Testing Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What does a p-value of 0.03 mean at significance level $\\\\alpha = 0.05$?',
        options: ['Fail to reject $H_0$', 'Reject $H_0$', 'Accept $H_1$ with certainty', 'The test is inconclusive'],
        correct_answer: 'Reject $H_0$',
        explanation: 'Since $p\\\\text{-value} = 0.03 < \\\\alpha = 0.05$, we reject the null hypothesis $H_0$.',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'A Type II error occurs when:',
        options: ['We reject $H_0$ when it is true', 'We fail to reject $H_0$ when it is false', 'We accept $H_0$ when it is true', 'The sample size is too small'],
        correct_answer: 'We fail to reject $H_0$ when it is false',
        explanation: 'A Type II error ($\\\\beta$) happens when we fail to reject a false null hypothesis — we miss a real effect.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'The probability of a Type I error is denoted by ______.',
        correct_answer: 'alpha',
        explanation: 'The significance level $\\\\alpha$ represents the probability of committing a Type I error (rejecting a true $H_0$).',
      },
    ],
  },
  {
    id: 'quiz-ds-model-02',
    lesson_id: 'ds-model-02',
    title: 'Logistic Regression Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Logistic Regression is used for:',
        options: ['Regression tasks only', 'Classification tasks', 'Clustering', 'Dimensionality reduction'],
        correct_answer: 'Classification tasks',
        explanation: 'Despite its name, Logistic Regression is fundamentally a classification algorithm that outputs probabilities.',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'What is the output range of the sigmoid function $\\\\sigma(z)$?',
        options: ['(-1, 1)', '(0, 1)', '[0, \\\\infty)', '(-\\\\infty, \\\\infty)'],
        correct_answer: '(0, 1)',
        explanation: 'The sigmoid function $\\\\sigma(z) = \\\\frac{1}{1 + e^{-z}}$ always maps to the interval $(0, 1)$.',
      },
      {
        id: 'q3',
        type: 'mcq',
        question: 'Which cost function is used in Logistic Regression?',
        options: ['Mean Squared Error', 'Hinge Loss', 'Cross-Entropy (Log Loss)', 'Mean Absolute Error'],
        correct_answer: 'Cross-Entropy (Log Loss)',
        explanation: 'Logistic Regression uses the cross-entropy (log loss) cost function, which is convex and suitable for classification.',
      },
    ],
  },
  {
    id: 'quiz-ds-eval-01',
    lesson_id: 'ds-eval-01',
    title: 'Classification Metrics Quiz',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'If a model has high Precision but low Recall, it means:',
        options: [
          'It catches most positive cases but with many false alarms',
          'It rarely gives false alarms but misses many positive cases',
          'It has high overall accuracy',
          'The model is underfitting',
        ],
        correct_answer: 'It rarely gives false alarms but misses many positive cases',
        explanation: 'High Precision = few false positives; Low Recall = many false negatives (missed positives).',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'An AUC of 0.5 indicates:',
        options: ['A perfect model', 'A model performing no better than random guessing', 'An overfitted model', 'A model with 50% accuracy'],
        correct_answer: 'A model performing no better than random guessing',
        explanation: 'AUC = 0.5 means the model has no discrimination ability between classes — equivalent to random chance.',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        question: 'The F1 Score is the ______ mean of Precision and Recall.',
        correct_answer: 'harmonic',
        explanation: '$F_1 = 2 \\\\cdot \\\\frac{\\\\text{Precision} \\\\times \\\\text{Recall}}{\\\\text{Precision} + \\\\text{Recall}}$ — the harmonic mean penalizes imbalances more than the arithmetic mean.',
      },
    ],
  },
]

// Daily Practice Questions — mixed across all topics for the dashboard
export const DAILY_PRACTICE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'dp-1',
    type: 'mcq',
    question: 'Which distribution models the number of successes in n independent trials?',
    options: ['Normal', 'Binomial', 'Poisson', 'Exponential'],
    correct_answer: 'Binomial',
    explanation: 'The Binomial distribution $X \\\\sim B(n, p)$ models the number of successes in $n$ independent Bernoulli trials, each with probability $p$.',
  },
  {
    id: 'dp-2',
    type: 'mcq',
    question: 'What happens when the learning rate is too large in gradient descent?',
    options: [
      'Convergence speeds up proportionally',
      'The model underfits',
      'The cost function may diverge (overshoot)',
      'Nothing changes',
    ],
    correct_answer: 'The cost function may diverge (overshoot)',
    explanation: 'A learning rate that is too large causes the gradient descent updates to overshoot the minimum, potentially causing the cost to diverge.',
  },
  {
    id: 'dp-3',
    type: 'mcq',
    question: 'In a confusion matrix, what does a False Positive (FP) represent?',
    options: [
      'Correctly predicting a positive case',
      'Incorrectly predicting a negative case as positive',
      'Correctly predicting a negative case',
      'Missing a positive case',
    ],
    correct_answer: 'Incorrectly predicting a negative case as positive',
    explanation: 'A False Positive occurs when the model predicts positive, but the true label is negative — a "false alarm."',
  },
  {
    id: 'dp-4',
    type: 'mcq',
    question: 'If we reject $H_0$ when it is actually true, this is called:',
    options: ['Type II Error', 'Type I Error', 'Correct Decision', 'Power of the test'],
    correct_answer: 'Type I Error',
    explanation: 'A Type I Error ($\\\\alpha$) is the probability of rejecting $H_0$ when it is actually true — a false positive in hypothesis testing.',
  },
  {
    id: 'dp-5',
    type: 'mcq',
    question: 'The sigmoid function maps its input to which range?',
    options: ['(-∞, ∞)', '(0, 1)', '(-1, 1)', '[0, ∞)'],
    correct_answer: '(0, 1)',
    explanation: 'The sigmoid function $\\\\sigma(z) = \\\\frac{1}{1 + e^{-z}}$ always outputs a value between 0 and 1, making it ideal for probability estimation.',
  },
]

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-ds-found-01',
    lesson_id: 'ds-found-01',
    title: 'Plotting a Normal Distribution',
    prompt: `## Task: Visualize the Normal Distribution

Using NumPy and Matplotlib, plot the probability density function (PDF) of a Normal distribution with $\\\\mu = 0$ and $\\\\sigma = 1$.

**Requirements:**
1. Generate 1000 evenly spaced x values from -4 to 4
2. Compute the PDF values using the formula: $f(x) = \\\\frac{1}{\\\\sigma\\\\sqrt{2\\\\pi}} e^{-\\\\frac{x^2}{2\\\\sigma^2}}$
3. Store the x values in a variable called \`x\`
4. Store the PDF values in a variable called \`pdf_values\`
5. Plot the result with a blue line

**Grader Checks:**
- \`x\` must be a NumPy array of length 1000
- \`pdf_values\` must have max value ≈ 0.3989 (within ±0.01)
`,
    starter_code: `import numpy as np
import matplotlib.pyplot as plt

# Parameters
mu = 0
sigma = 1

# TODO: Generate x values from -4 to 4 (1000 points)
x = 

# TODO: Compute the PDF
pdf_values = 

# Plot
plt.figure(figsize=(8, 4))
plt.plot(x, pdf_values, 'b-', linewidth=2, label=r'$\\\\mathcal{N}(0, 1)$')
plt.xlabel('x')
plt.ylabel('Probability Density')
plt.title('Normal Distribution PDF')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
`,
    grader_checks: [
      {
        variable: 'len(x)',
        condition: 'eq',
        value: 1000,
        message: 'x must have exactly 1000 points',
      },
      {
        variable: 'pdf_values.max()',
        condition: 'gt',
        value: 0.38,
        message: 'PDF max value should be approximately 0.3989',
      },
      {
        variable: 'pdf_values.max()',
        condition: 'lt',
        value: 0.41,
        message: 'PDF max value should be approximately 0.3989',
      },
    ],
  },
  {
    id: 'ch-ds-model-01',
    lesson_id: 'ds-model-01',
    title: 'Linear Regression with Scikit-Learn',
    prompt: `## Task: Train a Linear Regression Model

Use Scikit-Learn to train a Linear Regression model on a synthetic dataset and evaluate its performance.

**Requirements:**
1. Create a synthetic dataset with 100 samples using \`make_regression\`
2. Split into 80% train / 20% test
3. Train a \`LinearRegression\` model
4. Compute the **R² score** on the test set and store it in \`r2_score_value\`
5. Compute **MSE** on the test set and store it in \`mse_value\`

**Grader Checks:**
- \`r2_score_value\` must be > 0.85
- \`mse_value\` must be a positive number
`,
    starter_code: `import numpy as np
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# 1. Create synthetic dataset
X, y = make_regression(n_samples=100, n_features=1, noise=10, random_state=42)

# 2. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train model
model = LinearRegression()
# TODO: fit the model
model.fit(TODO)

# 4. Predict
y_pred = model.predict(X_test)

# 5. Evaluate
r2_score_value = r2_score(TODO)
mse_value = mean_squared_error(TODO)

print(f"R² Score: {r2_score_value:.4f}")
print(f"MSE: {mse_value:.4f}")
`,
    grader_checks: [
      {
        variable: 'r2_score_value',
        condition: 'gt',
        value: 0.85,
        message: 'R² score must be greater than 0.85',
      },
      {
        variable: 'mse_value',
        condition: 'gt',
        value: 0,
        message: 'MSE must be a positive number',
      },
    ],
  },
  {
    id: 'ch-ds-eval-01',
    lesson_id: 'ds-eval-01',
    title: 'Classification Metrics on Iris Dataset',
    prompt: `## Task: Compute Classification Metrics

Train a classifier on the Iris dataset and compute evaluation metrics.

**Requirements:**
1. Load the Iris dataset and use only the first 2 classes (binary classification)
2. Split 70/30 train/test
3. Train a \`LogisticRegression\` classifier
4. Store accuracy in \`accuracy_score_value\`
5. Store the F1 score (weighted) in \`f1_score_value\`

**Grader Checks:**
- \`accuracy_score_value\` must be > 0.90
- \`f1_score_value\` must be > 0.90
`,
    starter_code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score

# Load dataset (binary: only classes 0 and 1)
iris = load_iris()
X = iris.data[iris.target != 2]
y = iris.target[iris.target != 2]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train
clf = LogisticRegression(max_iter=200)
# TODO: fit the classifier
clf.fit(TODO)

# Predict
y_pred = clf.predict(X_test)

# TODO: Compute accuracy and F1 score
accuracy_score_value = accuracy_score(TODO)
f1_score_value = f1_score(TODO, average='weighted')

print(f"Accuracy: {accuracy_score_value:.4f}")
print(f"F1 Score: {f1_score_value:.4f}")
`,
    grader_checks: [
      {
        variable: 'accuracy_score_value',
        condition: 'gt',
        value: 0.9,
        message: 'Accuracy must be greater than 90%',
      },
      {
        variable: 'f1_score_value',
        condition: 'gt',
        value: 0.9,
        message: 'F1 score must be greater than 0.90',
      },
    ],
  },
]

export function getAllLessons(): Lesson[] {
  return CURRICULUM.flatMap(domain => domain.topics.flatMap(t => t.lessons))
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === id)
}

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return QUIZZES.find(q => q.lesson_id === lessonId)
}

export function getChallengeByLessonId(lessonId: string): Challenge | undefined {
  return CHALLENGES.find(c => c.lesson_id === lessonId)
}

export function getDailyQuestion(): QuizQuestion {
  // Use the day of year as index so it changes daily
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return DAILY_PRACTICE_QUESTIONS[dayOfYear % DAILY_PRACTICE_QUESTIONS.length]
}
