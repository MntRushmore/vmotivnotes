// Test if the JSON from the error log is valid
const testJSON = `{
  "title": "Mastering Quadratic Equations",
  "intro": "Quadratic equations are polynomial equations of the second degree, forming the basis for modeling various real-world phenomena. Understanding these equations is crucial for advanced mathematics and physics.",
  "gradeLevel": "high",
  "subject": "math",
  "bullets": [
    "Definition: A quadratic equation is a polynomial equation of the form $ax^2 + bx + c = 0$, where $a$, $b$, and $c$ are constants, and $a \\neq 0$."
  ],
  "quickCheck": [
    {"question": "What is the discriminant?", "answer": "The discriminant is $b^2 - 4ac$."}
  ],
  "realWorldApplications": [],
  "practiceProblems": [],
  "diagrams": []
}`;

try {
  const parsed = JSON.parse(testJSON);
  console.log('✓ JSON is valid!');
  console.log('Title:', parsed.title);
} catch (e) {
  console.log('✗ JSON parse error:', e.message);
}
