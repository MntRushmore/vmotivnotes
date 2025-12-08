/**
 * Pre-generated comprehensive notes for popular topics
 * These notes are displayed instantly without AI generation
 */

export interface PregeneratedNote {
  categorySlug: string
  subjectName: string
  topicName: string
  content: {
    title: string
    intro: string
    keyPoints: string[]
    examples: string[]
    commonMistakes?: string[]
    tips?: string[]
  }
}

export const pregeneratedNotes: PregeneratedNote[] = [
  // ============================================================================
  // DIGITAL SAT - MATH TOPICS (Priority for test prep)
  // ============================================================================
  {
    categorySlug: 'test-prep',
    subjectName: 'Digital SAT',
    topicName: 'Linear Equations and Inequalities',
    content: {
      title: 'Linear Equations and Inequalities',
      intro: 'Linear equations and inequalities are fundamental algebraic concepts that appear frequently on the Digital SAT. Mastering these skills is essential for solving real-world problems and understanding more advanced math topics.',
      keyPoints: [
        'A linear equation has the form ax + b = c, where a, b, and c are constants and x is the variable',
        'To solve linear equations, use inverse operations to isolate the variable on one side',
        'The solution to an equation is the value that makes the equation true when substituted',
        'Linear inequalities use <, >, ≤, or ≥ instead of = and represent a range of solutions',
        'When multiplying or dividing by a negative number in an inequality, flip the inequality sign',
        'Graphing inequalities on a number line: use an open circle for < or > and a closed circle for ≤ or ≥',
        'Systems of linear equations can be solved by substitution, elimination, or graphing',
        'Word problems often translate to linear equations by identifying the unknown and relationships',
        'Check your solution by substituting it back into the original equation',
        'Equivalent equations have the same solution but may look different',
        'The distributive property a(b + c) = ab + ac is frequently used to simplify equations',
        'Combining like terms before solving makes equations easier to work with',
        'Multi-step equations require performing several operations in the correct order',
        'Equations with variables on both sides need terms moved to one side first',
        'Absolute value equations like |x| = 5 have two solutions: x = 5 or x = -5'
      ],
      examples: [
        'Solve: 3x + 7 = 22\nSubtract 7: 3x = 15\nDivide by 3: x = 5',
        'Solve: 2(x - 4) = 10\nDistribute: 2x - 8 = 10\nAdd 8: 2x = 18\nDivide by 2: x = 9',
        'Solve inequality: -3x + 5 > 14\nSubtract 5: -3x > 9\nDivide by -3 (flip sign): x < -3',
        'Word problem: The sum of twice a number and 8 is 24. Find the number.\nEquation: 2x + 8 = 24\nSolution: x = 8'
      ],
      commonMistakes: [
        'Forgetting to flip the inequality sign when multiplying/dividing by negative numbers',
        'Not distributing correctly when parentheses are present',
        'Making arithmetic errors when combining like terms',
        'Confusing the solution to an inequality (a range) with an equation (a single value)'
      ],
      tips: [
        'Always check your answer by substituting it back into the original equation',
        'For inequalities, test a number from your solution range to verify',
        'Draw a diagram or table for word problems to visualize relationships',
        'Practice recognizing common equation patterns to solve them faster'
      ]
    }
  },
  {
    categorySlug: 'test-prep',
    subjectName: 'Digital SAT',
    topicName: 'Systems of Linear Equations',
    content: {
      title: 'Systems of Linear Equations',
      intro: 'A system of linear equations consists of two or more equations with the same variables. The solution is the point(s) where the equations intersect, representing values that satisfy all equations simultaneously.',
      keyPoints: [
        'A system of two linear equations can have one solution (intersecting lines), no solution (parallel lines), or infinitely many solutions (same line)',
        'The substitution method involves solving one equation for a variable and substituting into the other',
        'The elimination method adds or subtracts equations to eliminate one variable',
        'Graphing systems shows the solution as the intersection point (x, y)',
        'Multiply equations by constants before elimination when coefficients don\'t cancel naturally',
        'Check solutions by substituting into both original equations',
        'Word problems with two unknowns often require setting up a system',
        'Inconsistent systems (parallel lines) have no solution',
        'Dependent systems (same line) have infinitely many solutions',
        'The substitution method works well when one variable is already isolated',
        'The elimination method is efficient when coefficients align nicely',
        'Systems can model real-world scenarios like mixing problems or distance-rate-time problems',
        'Matrix methods and graphing calculators can solve systems quickly',
        'Three-variable systems require three equations and use similar solving techniques',
        'Applications include break-even analysis, mixture problems, and optimization'
      ],
      examples: [
        'Solve by substitution:\ny = 2x + 1\n3x + y = 11\n\nSubstitute y: 3x + (2x + 1) = 11\n5x + 1 = 11\nx = 2, y = 5\nSolution: (2, 5)',
        'Solve by elimination:\n2x + 3y = 12\n4x - 3y = 0\n\nAdd equations: 6x = 12\nx = 2\nSubstitute: 2(2) + 3y = 12 → y = 8/3\nSolution: (2, 8/3)',
        'Word problem: Adult tickets cost $12 and child tickets cost $8. A family bought 7 tickets for $76. How many of each?\nLet a = adults, c = children\na + c = 7\n12a + 8c = 76\nSolution: a = 4, c = 3'
      ],
      commonMistakes: [
        'Forgetting to substitute the found value back to get the second variable',
        'Making sign errors when using elimination method',
        'Not checking if the solution satisfies both original equations',
        'Misidentifying parallel lines as having a solution'
      ],
      tips: [
        'Choose the method based on the form of the equations given',
        'If one equation has a variable with coefficient 1, use substitution',
        'Line up equations vertically to avoid errors in elimination',
        'For word problems, define variables clearly before setting up equations'
      ]
    }
  },
  {
    categorySlug: 'test-prep',
    subjectName: 'Digital SAT',
    topicName: 'Quadratic Equations and Parabolas',
    content: {
      title: 'Quadratic Equations and Parabolas',
      intro: 'Quadratic equations form parabolas when graphed and appear frequently in SAT math. Understanding their properties, solving methods, and graphical representations is crucial for success.',
      keyPoints: [
        'A quadratic equation has the standard form ax² + bx + c = 0 where a ≠ 0',
        'The graph of a quadratic function is a U-shaped curve called a parabola',
        'If a > 0, the parabola opens upward; if a < 0, it opens downward',
        'The vertex is the minimum (if opens up) or maximum (if opens down) point',
        'The axis of symmetry is a vertical line through the vertex at x = -b/(2a)',
        'The vertex form is y = a(x - h)² + k where (h, k) is the vertex',
        'Quadratics can be solved by factoring, completing the square, or using the quadratic formula',
        'The quadratic formula is x = [-b ± √(b² - 4ac)] / (2a)',
        'The discriminant b² - 4ac determines the number of real solutions',
        'If discriminant > 0: two real solutions; = 0: one solution; < 0: no real solutions',
        'Solutions to ax² + bx + c = 0 are the x-intercepts (zeros/roots) of the parabola',
        'The y-intercept of y = ax² + bx + c is at (0, c)',
        'Factoring works when the quadratic can be written as (x + m)(x + n) = 0',
        'Completing the square converts standard form to vertex form',
        'Real-world applications include projectile motion, area problems, and optimization'
      ],
      examples: [
        'Solve by factoring: x² + 5x + 6 = 0\nFactor: (x + 2)(x + 3) = 0\nSolutions: x = -2 or x = -3',
        'Solve using quadratic formula: 2x² - 3x - 2 = 0\na=2, b=-3, c=-2\nx = [3 ± √(9 + 16)] / 4 = [3 ± 5] / 4\nx = 2 or x = -1/2',
        'Find vertex of y = x² - 6x + 11\nx = -b/(2a) = 6/2 = 3\ny = 9 - 18 + 11 = 2\nVertex: (3, 2)',
        'A ball is thrown upward with height h = -16t² + 32t + 5. When does it hit the ground?\nSet h = 0: -16t² + 32t + 5 = 0\nUsing quadratic formula: t ≈ 2.14 seconds'
      ],
      commonMistakes: [
        'Forgetting the ± symbol in the quadratic formula',
        'Sign errors when calculating the discriminant',
        'Confusing the vertex with the y-intercept',
        'Not setting the equation equal to zero before solving',
        'Incorrectly factoring when a ≠ 1'
      ],
      tips: [
        'Always check if a quadratic factors easily before using the formula',
        'Sketch a quick graph to visualize the parabola and check your solutions',
        'Remember: the vertex x-coordinate is always at -b/(2a)',
        'For word problems, identify what the variable represents and what you\'re solving for'
      ]
    }
  },
  {
    categorySlug: 'test-prep',
    subjectName: 'Digital SAT',
    topicName: 'Ratios, Proportions, and Percentages',
    content: {
      title: 'Ratios, Proportions, and Percentages',
      intro: 'Ratios, proportions, and percentages are interconnected concepts that describe relationships between quantities. These appear throughout the SAT in various contexts including word problems, data analysis, and real-world applications.',
      keyPoints: [
        'A ratio compares two quantities and can be written as a:b, a/b, or "a to b"',
        'Ratios should be simplified to lowest terms like fractions',
        'A proportion is an equation stating that two ratios are equal: a/b = c/d',
        'Cross-multiplication solves proportions: if a/b = c/d, then ad = bc',
        'Percentages are ratios out of 100: 45% = 45/100 = 0.45',
        'To find x% of a number: multiply the number by x/100 or 0.0x',
        'Percent increase: (new - original)/original × 100%',
        'Percent decrease: (original - new)/original × 100%',
        'Finding the original amount: if new = original × (1 + r), then original = new/(1 + r)',
        'Unit rates express a ratio as a quantity per one unit (e.g., miles per hour)',
        'Scale factors in similar figures create proportional relationships',
        'Part-to-part ratios compare two parts; part-to-whole ratios compare a part to the total',
        'Converting between fractions, decimals, and percentages is essential',
        'Compound percentages: successive percent changes multiply as (1 + r₁)(1 + r₂)',
        'Markup and discount problems use percentage calculations'
      ],
      examples: [
        'A recipe uses flour to sugar in a 3:2 ratio. If you use 9 cups of flour, how much sugar?\nSet up proportion: 3/2 = 9/x\nCross-multiply: 3x = 18\nx = 6 cups sugar',
        'What is 35% of 80?\n0.35 × 80 = 28',
        'A shirt originally $40 is on sale for $32. What percent discount?\nDecrease = 40 - 32 = 8\nPercent = 8/40 × 100% = 20% off',
        'If a population increases by 20% then decreases by 20%, what is the net change?\n(1.20)(0.80) = 0.96\nNet change: 4% decrease'
      ],
      commonMistakes: [
        'Confusing part-to-part with part-to-whole ratios',
        'Not converting percentages to decimals before calculating',
        'Thinking a 20% increase followed by 20% decrease returns to original',
        'Setting up proportions incorrectly with inconsistent units',
        'Forgetting to multiply by 100 when converting to a percentage'
      ],
      tips: [
        'Label all parts of ratios clearly to avoid confusion',
        'Check that units match when setting up proportions',
        'For percent problems, identify the whole (100%) first',
        'Use estimation to check if your answer makes sense'
      ]
    }
  },
  {
    categorySlug: 'test-prep',
    subjectName: 'Digital SAT',
    topicName: 'Data Analysis and Statistics',
    content: {
      title: 'Data Analysis and Statistics',
      intro: 'Statistical concepts help us understand and interpret data sets. The SAT tests your ability to calculate measures of center and spread, interpret graphs, and draw conclusions from data.',
      keyPoints: [
        'The mean (average) is the sum of all values divided by the number of values',
        'The median is the middle value when data is arranged in order',
        'The mode is the value that appears most frequently',
        'The range is the difference between the maximum and minimum values',
        'Standard deviation measures how spread out data is from the mean',
        'Outliers are extreme values that differ significantly from other data points',
        'Outliers affect the mean more than the median',
        'The median is the better measure of center for skewed data',
        'Interquartile range (IQR) = Q3 - Q1, representing the middle 50% of data',
        'Box plots display the five-number summary: min, Q1, median, Q3, max',
        'Histograms show frequency distributions using bars',
        'Scatterplots show relationships between two variables',
        'Positive correlation: as one variable increases, the other increases',
        'Negative correlation: as one variable increases, the other decreases',
        'The line of best fit approximates the trend in a scatterplot'
      ],
      examples: [
        'Find the mean of: 12, 15, 18, 20, 25\nSum = 90, Count = 5\nMean = 90/5 = 18',
        'Find the median of: 3, 7, 9, 15, 20, 21\nMiddle two values: 9 and 15\nMedian = (9 + 15)/2 = 12',
        'Data set: 5, 5, 7, 8, 12, 100\nMean = 22.8 (affected by outlier 100)\nMedian = 7.5 (more representative)',
        'Find IQR for: 2, 5, 7, 9, 11, 14, 18\nQ1 = 5, Q3 = 14\nIQR = 14 - 5 = 9'
      ],
      commonMistakes: [
        'Forgetting to order data before finding the median',
        'Confusing mean, median, and mode',
        'Not identifying outliers that skew the mean',
        'Misreading graph scales and labels',
        'Confusing correlation with causation'
      ],
      tips: [
        'Write data in order immediately when finding median or quartiles',
        'Check if outliers are present before choosing mean or median',
        'Draw a quick sketch of data distributions to visualize',
        'Read all graph labels carefully before answering questions'
      ]
    }
  },

  // ============================================================================
  // ALGEBRA 1 - CORE TOPICS
  // ============================================================================
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 1',
    topicName: 'Slope and Y-Intercept',
    content: {
      title: 'Slope and Y-Intercept',
      intro: 'The slope and y-intercept are fundamental concepts for understanding linear functions. They describe the rate of change and starting point of a line, forming the basis for linear modeling.',
      keyPoints: [
        'The slope (m) measures the steepness and direction of a line',
        'Slope = rise/run = (change in y)/(change in x) = (y₂ - y₁)/(x₂ - x₁)',
        'Positive slope: line rises from left to right',
        'Negative slope: line falls from left to right',
        'Zero slope: horizontal line (no vertical change)',
        'Undefined slope: vertical line (no horizontal change)',
        'The y-intercept (b) is where the line crosses the y-axis (when x = 0)',
        'Slope-intercept form: y = mx + b, where m is slope and b is y-intercept',
        'Parallel lines have equal slopes: m₁ = m₂',
        'Perpendicular lines have negative reciprocal slopes: m₁ × m₂ = -1',
        'A slope of 3/4 means: for every 4 units right, go up 3 units',
        'Greater absolute value of slope means steeper line',
        'Real-world: slope represents rate of change (speed, cost per item, etc.)',
        'To find slope from a graph: count rise over run between two clear points',
        'To find y-intercept from equation: set x = 0 and solve for y'
      ],
      examples: [
        'Find slope between points (2, 5) and (6, 13):\nm = (13 - 5)/(6 - 2) = 8/4 = 2',
        'What is the slope and y-intercept of y = -3x + 7?\nSlope m = -3, y-intercept b = 7',
        'A line passes through (0, 4) with slope 2. Write the equation:\ny = 2x + 4',
        'Are these lines parallel? y = 2x + 1 and y = 2x - 5\nYes, both have slope m = 2'
      ],
      commonMistakes: [
        'Mixing up x and y when calculating slope',
        'Confusing slope with y-intercept',
        'Not recognizing that horizontal lines have zero slope',
        'Thinking perpendicular slopes are just opposite signs (forgetting reciprocal)',
        'Incorrectly identifying the y-intercept from non-standard form equations'
      ],
      tips: [
        'Remember "rise over run" or "vertical change over horizontal change"',
        'Plot points on a graph to visualize the slope',
        'Check: does the sign of the slope match whether the line rises or falls?',
        'For parallel/perpendicular, only the slope matters, not the y-intercept'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 1',
    topicName: 'Solving Systems by Substitution',
    content: {
      title: 'Solving Systems by Substitution',
      intro: 'The substitution method is a powerful algebraic technique for solving systems of equations. It works by expressing one variable in terms of another and substituting to create a single-variable equation.',
      keyPoints: [
        'Step 1: Solve one equation for one variable (choose the easiest)',
        'Step 2: Substitute that expression into the other equation',
        'Step 3: Solve the resulting single-variable equation',
        'Step 4: Substitute back to find the other variable',
        'Step 5: Check the solution in both original equations',
        'Choose to solve for a variable that already has coefficient 1 when possible',
        'Substitution works well when one equation is already solved for a variable',
        'The solution is an ordered pair (x, y) that satisfies both equations',
        'If you get a true statement like 0 = 0, there are infinitely many solutions',
        'If you get a false statement like 5 = 0, there is no solution (parallel lines)',
        'Substitution is particularly useful for non-linear systems',
        'Be careful with negative signs when substituting expressions',
        'Distribute correctly when substituting multi-term expressions',
        'Always write the final answer as an ordered pair',
        'Verify by plugging solution into both original equations'
      ],
      examples: [
        'Solve: y = 3x + 2 and x + 2y = 12\nSubstitute y: x + 2(3x + 2) = 12\nx + 6x + 4 = 12\n7x = 8\nx = 8/7, y = 3(8/7) + 2 = 38/7\nSolution: (8/7, 38/7)',
        'Solve: 2x + y = 10 and x - y = 2\nFrom equation 2: x = y + 2\nSubstitute: 2(y + 2) + y = 10\n2y + 4 + y = 10\n3y = 6, y = 2\nx = 2 + 2 = 4\nSolution: (4, 2)'
      ],
      commonMistakes: [
        'Forgetting to distribute when substituting multi-term expressions',
        'Making sign errors with negative terms',
        'Not substituting back to find the second variable',
        'Checking solution in only one equation instead of both',
        'Choosing the harder equation to solve for a variable'
      ],
      tips: [
        'Look for equations already solved for x or y to make substitution easier',
        'If no variable is isolated, choose one with coefficient 1',
        'Write out each step clearly to avoid errors',
        'After finding one variable, carefully substitute to get the other'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 1',
    topicName: 'Factoring Trinomials',
    content: {
      title: 'Factoring Trinomials',
      intro: 'Factoring trinomials is the process of rewriting a quadratic expression as a product of two binomials. This skill is essential for solving quadratic equations and simplifying algebraic expressions.',
      keyPoints: [
        'A trinomial has the form ax² + bx + c',
        'When a = 1: find two numbers that multiply to c and add to b',
        'Factor as x² + bx + c = (x + m)(x + n) where m × n = c and m + n = b',
        'When a ≠ 1: use grouping or trial-and-error methods',
        'AC method: multiply a and c, find factors that add to b, then group and factor',
        'Always check by multiplying the factors using FOIL',
        'Look for a greatest common factor (GCF) first before factoring',
        'Some trinomials are prime (cannot be factored with integers)',
        'Sign patterns: x² + bx + c → both signs same as c if b > 0',
        'If c is positive, m and n have the same sign (both + or both -)',
        'If c is negative, m and n have different signs',
        'The coefficient of x² must be factored if not 1',
        'Factoring is the reverse process of expanding binomials',
        'Factored form helps find zeros/roots of quadratic functions',
        'Practice recognizing perfect square trinomials: a² + 2ab + b² = (a + b)²'
      ],
      examples: [
        'Factor x² + 7x + 12:\nFind m, n where m × n = 12 and m + n = 7\nm = 3, n = 4\nAnswer: (x + 3)(x + 4)',
        'Factor x² - 5x + 6:\nm × n = 6, m + n = -5\nm = -2, n = -3\nAnswer: (x - 2)(x - 3)',
        'Factor 2x² + 7x + 3:\nAC = 2 × 3 = 6, factors of 6 that add to 7: 6 and 1\n2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3)\nAnswer: (2x + 1)(x + 3)',
        'Factor x² - 9:\nDifference of squares\nAnswer: (x + 3)(x - 3)'
      ],
      commonMistakes: [
        'Forgetting to check for GCF before factoring',
        'Getting signs wrong in the binomial factors',
        'Not checking answer by multiplying back out',
        'Trying to factor a prime trinomial',
        'Missing the difference of squares pattern'
      ],
      tips: [
        'List all factor pairs of c to find the right combination',
        'Pay close attention to signs',
        'Always verify by using FOIL to expand your factors',
        'Practice recognizing special patterns (difference of squares, perfect squares)'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 1',
    topicName: 'Quadratic Formula',
    content: {
      title: 'Quadratic Formula',
      intro: 'The quadratic formula is a universal method for solving any quadratic equation. It provides exact solutions and works even when factoring is difficult or impossible.',
      keyPoints: [
        'The quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)',
        'Use it to solve ax² + bx + c = 0 for any values of a, b, and c',
        'The ± symbol means there are typically two solutions',
        'The discriminant is b² - 4ac, which determines the number of real solutions',
        'If discriminant > 0: two distinct real solutions',
        'If discriminant = 0: one real solution (repeated root)',
        'If discriminant < 0: no real solutions (two complex solutions)',
        'Always identify a, b, and c from standard form first',
        'Be careful with signs, especially when b or c is negative',
        'Simplify the square root when possible',
        'The formula works when factoring is difficult or impossible',
        'Solutions are also called roots, zeros, or x-intercepts of the parabola',
        'Exact answers often involve radicals; decimals are approximations',
        'The formula is derived by completing the square on the general quadratic',
        'For word problems, reject solutions that don\'t make sense in context'
      ],
      examples: [
        'Solve x² + 5x + 6 = 0:\na = 1, b = 5, c = 6\nx = [-5 ± √(25 - 24)] / 2 = [-5 ± 1] / 2\nx = -2 or x = -3',
        'Solve 2x² - 4x - 1 = 0:\na = 2, b = -4, c = -1\nx = [4 ± √(16 + 8)] / 4 = [4 ± √24] / 4\nx = [4 ± 2√6] / 4 = [2 ± √6] / 2',
        'Solve x² + 4x + 4 = 0:\nDiscriminant = 16 - 16 = 0\nx = -4/2 = -2 (one solution)',
        'Check discriminant of x² + 2x + 5 = 0:\nb² - 4ac = 4 - 20 = -16 < 0\nNo real solutions'
      ],
      commonMistakes: [
        'Forgetting the ± sign, missing one solution',
        'Sign errors when substituting negative values for b or c',
        'Not writing the equation in standard form first',
        'Arithmetic errors with the discriminant',
        'Forgetting to divide the entire expression by 2a',
        'Not simplifying radicals in the final answer'
      ],
      tips: [
        'Write out a, b, c clearly before substituting',
        'Calculate the discriminant first to know how many solutions to expect',
        'Use parentheses when substituting negative values',
        'Simplify step-by-step to avoid errors',
        'Check your solutions by substituting back into the original equation'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 1',
    topicName: 'Exponents and Radicals',
    content: {
      title: 'Exponents and Radicals',
      intro: 'Exponents and radicals are inverse operations that extend our number system. Understanding their properties is essential for algebra, scientific notation, and higher mathematics.',
      keyPoints: [
        'Exponent notation: aⁿ means a multiplied by itself n times',
        'Product rule: aᵐ × aⁿ = aᵐ⁺ⁿ',
        'Quotient rule: aᵐ / aⁿ = aᵐ⁻ⁿ',
        'Power rule: (aᵐ)ⁿ = aᵐⁿ',
        'Power of product: (ab)ⁿ = aⁿbⁿ',
        'Power of quotient: (a/b)ⁿ = aⁿ/bⁿ',
        'Zero exponent: a⁰ = 1 (where a ≠ 0)',
        'Negative exponent: a⁻ⁿ = 1/aⁿ',
        'Fractional exponent: a^(m/n) = ⁿ√(aᵐ)',
        'Square root: √a means the positive number that when squared equals a',
        'Cube root: ³√a can be positive or negative',
        'Radical notation: ⁿ√a where n is the index (2 for square root, 3 for cube root, etc.)',
        'Simplifying radicals: factor out perfect squares/cubes',
        'Like radicals can be added/subtracted: 2√3 + 5√3 = 7√3',
        'Product of radicals: √a × √b = √(ab)',
        'Quotient of radicals: √a / √b = √(a/b)',
        'Rationalizing denominators: multiply by conjugate or √b/√b',
        'Scientific notation uses powers of 10: a × 10ⁿ where 1 ≤ a < 10'
      ],
      examples: [
        'Simplify: x⁵ × x³ = x⁸',
        'Simplify: (2y³)⁴ = 16y¹²',
        'Simplify: x⁻³ = 1/x³',
        'Simplify: √50 = √(25 × 2) = 5√2',
        'Simplify: √12 + √27 = 2√3 + 3√3 = 5√3',
        'Rationalize: 1/√5 = √5/5',
        'Express in scientific notation: 45,000 = 4.5 × 10⁴'
      ],
      commonMistakes: [
        'Adding exponents when multiplying different bases: x² × y³ ≠ xy⁵',
        'Confusing (xy)ⁿ with xⁿyⁿ vs x(yⁿ)',
        'Thinking a⁰ = 0 instead of 1',
        'Not simplifying radicals completely',
        'Adding unlike radicals: √2 + √3 ≠ √5',
        'Forgetting to rationalize denominators'
      ],
      tips: [
        'When multiplying powers with same base, add exponents',
        'When dividing powers with same base, subtract exponents',
        'Always check if radicals can be simplified by factoring',
        'Practice recognizing perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100',
        'Keep track of negative signs carefully with exponents'
      ]
    }
  },

  // ============================================================================
  // PRE-ALGEBRA - FOUNDATION TOPICS
  // ============================================================================
  {
    categorySlug: 'mathematics',
    subjectName: 'Pre-Algebra',
    topicName: 'Order of Operations',
    content: {
      title: 'Order of Operations',
      intro: 'The order of operations is a set of rules that determines the sequence in which operations should be performed in mathematical expressions. Following these rules ensures everyone gets the same answer.',
      keyPoints: [
        'PEMDAS is the acronym: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction',
        'Alternative acronym: Please Excuse My Dear Aunt Sally',
        'Parentheses include brackets [ ], braces { }, and grouping symbols',
        'Exponents include powers and roots',
        'Multiplication and Division have equal priority (left to right)',
        'Addition and Subtraction have equal priority (left to right)',
        'Always work from left to right when operations have equal priority',
        'Nested parentheses: work from innermost to outermost',
        'Fraction bars act as grouping symbols (evaluate numerator and denominator separately)',
        'Absolute value symbols | | act like parentheses',
        'Expressions inside grouping symbols must be simplified first',
        'After parentheses and exponents, scan left to right for × and ÷',
        'Finally, scan left to right for + and −',
        'Common error: doing addition before multiplication',
        'When in doubt, add parentheses to clarify meaning'
      ],
      examples: [
        'Evaluate: 3 + 4 × 2\nMultiplication first: 3 + 8 = 11',
        'Evaluate: (3 + 4) × 2\nParentheses first: 7 × 2 = 14',
        'Evaluate: 2³ + 4 × 5 - 6\nExponents: 8 + 4 × 5 - 6\nMultiply: 8 + 20 - 6\nLeft to right: 22',
        'Evaluate: 20 ÷ 4 × 5\nLeft to right: 5 × 5 = 25',
        'Evaluate: (8 - 3)² + 2 × 3\nParentheses: 5² + 2 × 3\nExponents: 25 + 2 × 3\nMultiply: 25 + 6 = 31'
      ],
      commonMistakes: [
        'Performing addition before multiplication: 3 + 4 × 2 ≠ 14',
        'Not working left to right for equal priority operations',
        'Forgetting that division and multiplication have equal priority',
        'Ignoring parentheses or doing operations inside them last',
        'Treating subtraction and addition as having different priorities'
      ],
      tips: [
        'Memorize PEMDAS but remember MD and AS are equal priority pairs',
        'Circle or underline each step as you complete it',
        'Rewrite the expression after each step to track your work',
        'Use parentheses generously when writing expressions to avoid confusion',
        'Double-check: did I handle all parentheses first?'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Pre-Algebra',
    topicName: 'Fractions and Mixed Numbers',
    content: {
      title: 'Fractions and Mixed Numbers',
      intro: 'Fractions represent parts of a whole, while mixed numbers combine whole numbers with fractions. Mastering fraction operations is fundamental for algebra and real-world problem-solving.',
      keyPoints: [
        'A fraction has a numerator (top) and denominator (bottom): numerator/denominator',
        'The denominator tells how many equal parts, numerator tells how many we have',
        'Proper fraction: numerator < denominator (e.g., 3/4)',
        'Improper fraction: numerator ≥ denominator (e.g., 7/4)',
        'Mixed number: whole number plus a fraction (e.g., 1¾)',
        'Converting mixed to improper: multiply whole by denominator, add numerator',
        'Converting improper to mixed: divide numerator by denominator',
        'Equivalent fractions: multiply or divide numerator and denominator by same number',
        'Simplifying: divide numerator and denominator by their GCF',
        'Adding/subtracting like fractions: same denominator, add/subtract numerators',
        'Adding/subtracting unlike fractions: find common denominator first',
        'Multiplying fractions: multiply numerators, multiply denominators',
        'Dividing fractions: multiply by the reciprocal (flip second fraction)',
        'The reciprocal of a/b is b/a',
        'Simplify before or after multiplying to make calculations easier',
        'For word problems: identify the whole and the part'
      ],
      examples: [
        'Convert 2⅗ to improper fraction:\n(2 × 5 + 3)/5 = 13/5',
        'Simplify 12/18:\nGCF = 6\n12/18 = 2/3',
        'Add: ⅔ + ¾\nCommon denominator = 12\n8/12 + 9/12 = 17/12 = 1 5/12',
        'Multiply: ⅔ × ¾ = 6/12 = ½',
        'Divide: ⅔ ÷ ¾ = ⅔ × 4/3 = 8/9',
        'Word problem: A pizza is cut into 8 slices. If you eat 3 slices, what fraction is left?\n8 - 3 = 5 slices\nFraction: 5/8'
      ],
      commonMistakes: [
        'Adding denominators when adding fractions: ½ + ⅓ ≠ 2/5',
        'Not finding a common denominator before adding/subtracting',
        'Forgetting to simplify final answers',
        'Dividing instead of multiplying by the reciprocal',
        'Converting mixed numbers incorrectly'
      ],
      tips: [
        'Always simplify fractions to lowest terms',
        'For addition/subtraction, find the LCD (least common denominator)',
        'For division, remember "keep, change, flip" (keep first, change to multiply, flip second)',
        'Draw pictures to visualize fraction problems',
        'Check: does your answer make sense in context?'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Pre-Algebra',
    topicName: 'Integers and Absolute Value',
    content: {
      title: 'Integers and Absolute Value',
      intro: 'Integers extend our number system to include negative numbers. Understanding how to work with integers and absolute value is crucial for algebra and real-world applications like temperature and finances.',
      keyPoints: [
        'Integers are whole numbers and their opposites: ..., -3, -2, -1, 0, 1, 2, 3, ...',
        'Positive integers are greater than zero: 1, 2, 3, ...',
        'Negative integers are less than zero: -1, -2, -3, ...',
        'Zero is neither positive nor negative',
        'Absolute value |a| is the distance from zero on the number line',
        'Absolute value is always non-negative: |5| = 5 and |-5| = 5',
        'Adding integers: same signs → add and keep sign; different signs → subtract and use sign of larger',
        'Subtracting integers: add the opposite: a - b = a + (-b)',
        'Multiplying/dividing: same signs → positive; different signs → negative',
        'Two negatives make a positive: (-3)(-4) = 12',
        'A positive and a negative make a negative: (3)(-4) = -12',
        'Number line: left is smaller, right is larger',
        'Any negative number is less than any positive number',
        'For absolute value equations: |x| = a means x = a or x = -a',
        'Absolute value represents magnitude without direction'
      ],
      examples: [
        'Evaluate: -7 + 12\nDifferent signs: 12 - 7 = 5 (use sign of 12)',
        'Evaluate: -8 - 5 = -8 + (-5) = -13',
        'Evaluate: (-6) × (-4) = 24',
        'Evaluate: 15 ÷ (-3) = -5',
        'Evaluate: |-12| = 12',
        'Solve: |x| = 7\nx = 7 or x = -7',
        'Real-world: Temperature dropped from 5°F to -3°F. What is the change?\n5 - (-3) = 5 + 3 = 8°F drop'
      ],
      commonMistakes: [
        'Thinking |-5| is -5 instead of 5',
        'Forgetting that subtracting a negative adds: 3 - (-2) = 5',
        'Sign errors when multiplying or dividing multiple negatives',
        'Confusing the order of integers on a number line',
        'Not including both solutions for absolute value equations'
      ],
      tips: [
        'Use a number line to visualize integer operations',
        'Remember: subtracting is adding the opposite',
        'For multiplication/division: count the number of negative signs (odd = negative, even = positive)',
        'Absolute value "makes numbers positive"',
        'Real-world contexts help: debt (negative), profit (positive), temperature, elevation'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Pre-Algebra',
    topicName: 'Ratios and Proportions',
    content: {
      title: 'Ratios and Proportions',
      intro: 'Ratios compare quantities, while proportions state that two ratios are equal. These concepts appear throughout mathematics and real life, from cooking to maps to scale models.',
      keyPoints: [
        'A ratio compares two quantities: a to b, a:b, or a/b',
        'Ratios should be simplified like fractions',
        'Ratios can compare part to part or part to whole',
        'A rate is a ratio comparing different units (miles per hour, dollars per pound)',
        'A unit rate has a denominator of 1 (60 mph, $3 per pound)',
        'A proportion is an equation: a/b = c/d',
        'Cross-multiplication: if a/b = c/d, then ad = bc',
        'Use proportions to solve for unknown quantities',
        'Scale drawings use ratios to represent real-world sizes',
        'Similar figures have proportional corresponding sides',
        'Proportions maintain relationships when quantities change together',
        'Check solutions by verifying cross-products are equal',
        'Ratios with more than two terms: a:b:c (divide total into parts)',
        'Percent is a ratio to 100: 35% = 35:100 = 7:20',
        'Proportional thinking: if A doubles, what happens to B?'
      ],
      examples: [
        'Simplify ratio 12:18\nGCF = 6\n12:18 = 2:3',
        'If 3 notebooks cost $6, how much do 7 notebooks cost?\n3/6 = 7/x\n3x = 42\nx = $14',
        'On a map, 2 inches represents 50 miles. What distance is 5 inches?\n2/50 = 5/x\n2x = 250\nx = 125 miles',
        'Mix paint in ratio 2:3 (red to blue). If you use 8 cups red, how much blue?\n2/3 = 8/x\n2x = 24\nx = 12 cups blue',
        'Unit rate: 180 miles in 3 hours\n180/3 = 60 mph'
      ],
      commonMistakes: [
        'Not keeping units consistent in ratios and proportions',
        'Setting up proportions incorrectly (not matching corresponding parts)',
        'Forgetting to simplify ratios',
        'Confusing part-to-part with part-to-whole ratios',
        'Cross-multiplying incorrectly'
      ],
      tips: [
        'Label all parts of ratios clearly (2 red : 3 blue)',
        'Make sure units match when setting up proportions',
        'Use cross-multiplication to solve proportions efficiently',
        'Draw pictures or diagrams for complex ratio problems',
        'Check: do the units make sense in your answer?'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Pre-Algebra',
    topicName: 'Percentages and Decimals',
    content: {
      title: 'Percentages and Decimals',
      intro: 'Percentages and decimals are different ways to represent parts of a whole. Being fluent with conversions and calculations involving both is essential for everyday math, from shopping to statistics.',
      keyPoints: [
        'Percent means "per hundred": 45% = 45 per 100',
        'Converting percent to decimal: divide by 100 (move decimal 2 places left)',
        'Converting decimal to percent: multiply by 100 (move decimal 2 places right)',
        'Converting fraction to decimal: divide numerator by denominator',
        'Converting decimal to fraction: write over power of 10 and simplify',
        'Finding a percentage of a number: multiply the number by the decimal',
        'Finding what percent one number is of another: (part/whole) × 100%',
        'Percent increase: [(new - old) / old] × 100%',
        'Percent decrease: [(old - new) / old] × 100%',
        'Finding the whole when given a part and percent: part / (percent as decimal)',
        'Discount: multiply price by (1 - discount rate)',
        'Tax: multiply price by (1 + tax rate)',
        'Tip: multiply bill by tip percentage and add to original',
        'Common conversions: 50% = 0.5 = ½, 25% = 0.25 = ¼, 10% = 0.1 = 1/10',
        'Decimal place values: tenths, hundredths, thousandths'
      ],
      examples: [
        'Convert 35% to decimal: 35% = 0.35',
        'Convert 0.08 to percent: 0.08 = 8%',
        'Find 40% of 80: 0.40 × 80 = 32',
        'What percent is 15 of 60? (15/60) × 100% = 25%',
        'A $50 item is 20% off. Sale price?\nDiscount: 0.20 × 50 = $10\nSale price: 50 - 10 = $40\nOr: 50 × 0.80 = $40',
        'Sales increased from 200 to 250. What percent increase?\n(250 - 200)/200 × 100% = 25%'
      ],
      commonMistakes: [
        'Moving the decimal the wrong direction when converting',
        'Forgetting to convert percent to decimal before multiplying',
        'Confusing part/whole in percent problems',
        'Subtracting percent instead of the calculated amount (50 - 20% ≠ 30)',
        'Adding percents from different wholes: 50% of A plus 50% of B ≠ 100% of (A+B)'
      ],
      tips: [
        'Memorize common percent-decimal-fraction equivalents',
        'To find 10% quickly: move decimal one place left',
        'To find 1%: move decimal two places left',
        'Check reasonableness: 50% should be about half',
        'For multi-step problems (tax then tip), calculate one at a time'
      ]
    }
  },

  // ============================================================================
  // GEOMETRY - KEY TOPICS
  // ============================================================================
  {
    categorySlug: 'mathematics',
    subjectName: 'Geometry',
    topicName: 'Pythagorean Theorem',
    content: {
      title: 'Pythagorean Theorem',
      intro: 'The Pythagorean Theorem is one of the most important relationships in geometry, connecting the sides of a right triangle. It has countless applications in mathematics, science, and real-world problem-solving.',
      keyPoints: [
        'The Pythagorean Theorem: a² + b² = c²',
        'a and b are the legs (sides that form the right angle)',
        'c is the hypotenuse (longest side, opposite the right angle)',
        'The theorem only applies to right triangles',
        'The hypotenuse is always the longest side',
        'Use to find a missing side when you know the other two',
        'Pythagorean triples are integer solutions: (3,4,5), (5,12,13), (8,15,17)',
        'Multiples of triples also work: (6,8,10), (9,12,15), etc.',
        'Converse: if a² + b² = c², then the triangle is a right triangle',
        'If a² + b² > c², the triangle is acute',
        'If a² + b² < c², the triangle is obtuse',
        'Applications: distance formula, diagonal of rectangle, navigation',
        '3D version: space diagonal d² = l² + w² + h²',
        'In coordinate geometry, distance formula comes from Pythagorean theorem',
        'The theorem can prove whether a triangle is right-angled'
      ],
      examples: [
        'Find the hypotenuse: legs are 6 and 8\na² + b² = c²\n6² + 8² = c²\n36 + 64 = c²\n100 = c²\nc = 10',
        'Find a leg: hypotenuse is 13, one leg is 5\n5² + b² = 13²\n25 + b² = 169\nb² = 144\nb = 12',
        'Is this triangle right-angled? Sides: 7, 24, 25\n7² + 24² = 49 + 576 = 625 = 25²\nYes, it is a right triangle',
        'A ladder leans against a wall. The base is 5 ft from the wall, and the ladder reaches 12 ft high. How long is the ladder?\n5² + 12² = c²\n25 + 144 = 169\nc = 13 feet'
      ],
      commonMistakes: [
        'Confusing which side is the hypotenuse',
        'Using the formula for non-right triangles',
        'Forgetting to take the square root at the end',
        'Adding a + b instead of a² + b²',
        'Not recognizing Pythagorean triples'
      ],
      tips: [
        'Always identify the right angle first, then label the hypotenuse',
        'Memorize common Pythagorean triples to save time',
        'Draw a diagram and label known sides',
        'Check: is your hypotenuse the longest side?',
        'Use the converse to test if a triangle is right-angled'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Geometry',
    topicName: 'Area and Perimeter',
    content: {
      title: 'Area and Perimeter',
      intro: 'Area measures the space inside a two-dimensional shape, while perimeter measures the distance around it. These fundamental concepts apply to countless real-world situations from construction to art.',
      keyPoints: [
        'Perimeter is the total distance around a shape (add all side lengths)',
        'Area is the space inside a shape (measured in square units)',
        'Rectangle: Perimeter = 2l + 2w, Area = l × w',
        'Square: Perimeter = 4s, Area = s²',
        'Triangle: Perimeter = a + b + c, Area = ½bh',
        'Circle: Circumference = 2πr or πd, Area = πr²',
        'Parallelogram: Area = base × height',
        'Trapezoid: Area = ½(b₁ + b₂)h',
        'Composite figures: break into simpler shapes and add/subtract areas',
        'Units for perimeter: inches, feet, meters (linear units)',
        'Units for area: square inches, square feet, square meters (square units)',
        'π ≈ 3.14 or 22/7 (use calculator π for best accuracy)',
        'Height must be perpendicular to base in area formulas',
        'For irregular shapes, use grid counting or decomposition',
        'Doubling dimensions: perimeter doubles, area quadruples'
      ],
      examples: [
        'Rectangle: length 8 cm, width 5 cm\nPerimeter = 2(8) + 2(5) = 26 cm\nArea = 8 × 5 = 40 cm²',
        'Triangle: base 10 in, height 6 in\nArea = ½(10)(6) = 30 in²',
        'Circle: radius 7 m\nCircumference = 2π(7) = 14π ≈ 43.98 m\nArea = π(7²) = 49π ≈ 153.94 m²',
        'Composite figure: Rectangle 10×6 with semicircle on top (diameter 6)\nRectangle area = 60\nSemicircle area = ½π(3²) ≈ 14.14\nTotal ≈ 74.14 units²',
        'Trapezoid: bases 8 and 12, height 5\nArea = ½(8 + 12)(5) = 50 units²'
      ],
      commonMistakes: [
        'Confusing perimeter and area',
        'Using slant height instead of perpendicular height for area',
        'Forgetting to use ½ in triangle area formula',
        'Mixing up radius and diameter in circle formulas',
        'Using wrong units (linear for area or square for perimeter)',
        'Not breaking composite figures into manageable pieces'
      ],
      tips: [
        'Always label your answer with correct units',
        'Draw and label a diagram before calculating',
        'For composite figures, identify simpler shapes within',
        'Double-check: did I use the perpendicular height?',
        'Memorize common formulas for quick recall'
      ]
    }
  },
  {
    categorySlug: 'mathematics',
    subjectName: 'Geometry',
    topicName: 'Volume and Surface Area',
    content: {
      title: 'Volume and Surface Area',
      intro: 'Volume measures the space inside a three-dimensional object, while surface area measures the total area of all its surfaces. These concepts are essential for understanding 3D shapes and solving real-world problems.',
      keyPoints: [
        'Volume is measured in cubic units (cm³, m³, etc.)',
        'Surface area is measured in square units (cm², m², etc.)',
        'Rectangular prism: V = lwh, SA = 2lw + 2lh + 2wh',
        'Cube: V = s³, SA = 6s²',
        'Cylinder: V = πr²h, SA = 2πr² + 2πrh (two circles + rectangle)',
        'Sphere: V = (4/3)πr³, SA = 4πr²',
        'Cone: V = (1/3)πr²h, SA = πr² + πrl (l = slant height)',
        'Pyramid: V = (1/3)Bh (B = area of base)',
        'Prisms: V = Bh (B = area of base)',
        'All pyramids and cones have (1/3) in volume formula',
        'Surface area = sum of areas of all faces',
        'Nets show all faces of a 3D shape laid flat',
        'Lateral surface area excludes bases (side area only)',
        'Doubling dimensions: volume multiplies by 8, surface area by 4',
        'Applications: packaging, capacity, painting, filling containers'
      ],
      examples: [
        'Rectangular prism: 4 cm × 5 cm × 10 cm\nV = 4 × 5 × 10 = 200 cm³\nSA = 2(20) + 2(40) + 2(50) = 220 cm²',
        'Cylinder: radius 3 in, height 10 in\nV = π(3²)(10) = 90π ≈ 282.74 in³\nSA = 2π(9) + 2π(3)(10) = 78π ≈ 245.04 in²',
        'Sphere: radius 6 cm\nV = (4/3)π(6³) = 288π ≈ 904.78 cm³\nSA = 4π(6²) = 144π ≈ 452.39 cm²',
        'Cone: radius 5 ft, height 12 ft\nV = (1/3)π(5²)(12) = 100π ≈ 314.16 ft³',
        'Cube: side 7 m\nV = 7³ = 343 m³\nSA = 6(49) = 294 m²'
      ],
      commonMistakes: [
        'Confusing volume and surface area',
        'Forgetting the (1/3) factor for pyramids and cones',
        'Using diameter instead of radius',
        'Mixing up height and slant height for cones',
        'Not including all faces in surface area',
        'Using wrong units (square for volume or cubic for surface area)'
      ],
      tips: [
        'Memorize that cones and pyramids use (1/3)Bh',
        'Draw a net to visualize all surfaces for surface area',
        'Always check if given radius or diameter',
        'Label all dimensions on your diagram',
        'Remember: volume is "how much fits inside," surface area is "how much covers outside"'
      ]
    }
  },

  // ============================================================================
  // GENERAL BIOLOGY - CORE TOPICS
  // ============================================================================
  {
    categorySlug: 'science',
    subjectName: 'General Biology',
    topicName: 'Cell Structure and Function',
    content: {
      title: 'Cell Structure and Function',
      intro: 'The cell is the basic unit of life. Understanding cell structure and the functions of organelles is fundamental to biology, as these tiny structures carry out all the processes necessary for life.',
      keyPoints: [
        'All living things are made of one or more cells (Cell Theory)',
        'Cells are the smallest unit of life that can function independently',
        'There are two main types: prokaryotic (no nucleus) and eukaryotic (has nucleus)',
        'Cell membrane: controls what enters and exits the cell (selectively permeable)',
        'Nucleus: contains DNA and controls cell activities (the "brain" of the cell)',
        'Mitochondria: produces ATP through cellular respiration ("powerhouse")',
        'Ribosomes: synthesize proteins',
        'Endoplasmic reticulum (ER): transports materials (rough ER has ribosomes, smooth ER does not)',
        'Golgi apparatus: packages and distributes proteins',
        'Lysosomes: digest and recycle cellular waste',
        'Chloroplasts: perform photosynthesis in plant cells',
        'Cell wall: provides structure and support in plant cells',
        'Vacuoles: store water and nutrients (large central vacuole in plants)',
        'Cytoplasm: jelly-like fluid where organelles float',
        'Prokaryotes (bacteria): no membrane-bound organelles, DNA in nucleoid region',
        'Eukaryotes (animals, plants, fungi): membrane-bound organelles, larger and more complex'
      ],
      examples: [
        'Animal cell organelles: nucleus, mitochondria, ribosomes, ER, Golgi, lysosomes, cell membrane',
        'Plant cell additional features: cell wall, chloroplasts, large central vacuole',
        'Bacterial cell: cell membrane, cell wall, ribosomes, nucleoid (no nucleus), flagella',
        'Mitochondria produce ATP: the energy currency cells use for work',
        'Chloroplasts capture light energy and convert it to chemical energy (glucose)',
        'The nucleus contains chromosomes made of DNA that carry genetic instructions'
      ],
      commonMistakes: [
        'Thinking all cells have chloroplasts (only plant cells and some protists)',
        'Confusing cell wall with cell membrane',
        'Thinking prokaryotes have a nucleus (they don\'t)',
        'Not recognizing that both plant and animal cells have mitochondria',
        'Confusing lysosomes with vacuoles'
      ],
      tips: [
        'Remember: all cells have a cell membrane, ribosomes, DNA, and cytoplasm',
        'Use mnemonics: "Mighty Mitochondria Make ATP"',
        'Draw and label cell diagrams to reinforce organelle positions',
        'Think of the cell as a factory: each organelle has a specific job',
        'Plant cells = animal cells + cell wall + chloroplasts + large vacuole'
      ]
    }
  },
  {
    categorySlug: 'science',
    subjectName: 'General Biology',
    topicName: 'DNA and Genetics',
    content: {
      title: 'DNA and Genetics',
      intro: 'DNA is the molecule that stores genetic information in all living things. Understanding DNA structure and how traits are inherited is central to biology, medicine, and biotechnology.',
      keyPoints: [
        'DNA (deoxyribonucleic acid) carries genetic information',
        'DNA structure: double helix (twisted ladder shape)',
        'DNA has four bases: Adenine (A), Thymine (T), Cytosine (C), Guanine (G)',
        'Base pairing rules: A pairs with T, C pairs with G',
        'Gene: a segment of DNA that codes for a trait or protein',
        'Chromosome: long strand of DNA wrapped around proteins',
        'Humans have 46 chromosomes (23 pairs)',
        'DNA replication: DNA copies itself before cell division',
        'Mutations: changes in DNA sequence (can be harmful, helpful, or neutral)',
        'Dominant alleles (A) are expressed even with one copy',
        'Recessive alleles (a) require two copies to be expressed',
        'Genotype: genetic makeup (alleles present, e.g., AA, Aa, aa)',
        'Phenotype: physical trait expressed (what you see)',
        'Homozygous: two identical alleles (AA or aa)',
        'Heterozygous: two different alleles (Aa)',
        'Punnett squares predict offspring genotypes and phenotypes'
      ],
      examples: [
        'DNA base pair: A always pairs with T, C always pairs with G',
        'If DNA strand is ATCG, complementary strand is TAGC',
        'Punnett square: Aa × Aa → offspring: 25% AA, 50% Aa, 25% aa',
        'Brown eyes (B) dominant over blue eyes (b): BB = brown, Bb = brown, bb = blue',
        'Mutation example: Sickle cell anemia caused by change in hemoglobin gene',
        'DNA → RNA → Protein (Central Dogma of molecular biology)'
      ],
      commonMistakes: [
        'Confusing genotype with phenotype',
        'Mixing up dominant and recessive',
        'Incorrectly pairing DNA bases',
        'Thinking one dominant allele in heterozygote shows both traits (it doesn\'t)',
        'Forgetting that traits can be controlled by multiple genes'
      ],
      tips: [
        'Remember base pairing with "AT" and "CG"',
        'Capital letters = dominant, lowercase = recessive',
        'Practice Punnett squares to master genetic predictions',
        'Genotype is the "recipe," phenotype is the "cake"',
        'DNA stores information, RNA helps make proteins from that information'
      ]
    }
  },
  {
    categorySlug: 'science',
    subjectName: 'General Biology',
    topicName: 'Photosynthesis Overview',
    content: {
      title: 'Photosynthesis Overview',
      intro: 'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. This process is essential for life on Earth, providing food and oxygen.',
      keyPoints: [
        'Photosynthesis converts light energy into chemical energy (glucose)',
        'Occurs in chloroplasts of plant cells',
        'Chlorophyll is the green pigment that captures light energy',
        'Overall equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
        'Inputs: carbon dioxide, water, and light energy',
        'Outputs: glucose (sugar) and oxygen',
        'Two main stages: light-dependent reactions and light-independent reactions (Calvin cycle)',
        'Light reactions occur in thylakoid membranes, produce ATP and NADPH',
        'Calvin cycle occurs in stroma, uses ATP and NADPH to make glucose',
        'Stomata are pores in leaves that allow CO₂ in and O₂ out',
        'Factors affecting rate: light intensity, CO₂ concentration, temperature, water',
        'Photosynthesis is the opposite of cellular respiration',
        'Plants perform photosynthesis during the day (need light)',
        'Oxygen released is a byproduct that animals breathe',
        'Foundation of most food chains: producers make their own food'
      ],
      examples: [
        'A tree absorbs CO₂ from air and water from soil, uses sunlight to make glucose and releases O₂',
        'When light increases, photosynthesis rate increases (up to a maximum)',
        'In darkness, photosynthesis stops but cellular respiration continues',
        'Green leaves appear green because chlorophyll reflects green light',
        'Desert plants close stomata during hot day to prevent water loss',
        'Photosynthesis in ocean phytoplankton produces much of Earth\'s oxygen'
      ],
      commonMistakes: [
        'Thinking plants only photosynthesize and don\'t respire (they do both)',
        'Confusing reactants and products',
        'Thinking photosynthesis produces food for humans directly (it makes glucose for plants)',
        'Forgetting that oxygen is a waste product of photosynthesis',
        'Not recognizing that photosynthesis requires chloroplasts'
      ],
      tips: [
        'Memorize the equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
        'Remember: light is an input, oxygen is an output',
        'Think of photosynthesis as "building up" glucose using energy',
        'Chlorophyll = green pigment that captures light',
        'Plants are "producers" because they produce their own food'
      ]
    }
  },

  // ============================================================================
  // GENERAL CHEMISTRY - FUNDAMENTALS
  // ============================================================================
  {
    categorySlug: 'science',
    subjectName: 'General Chemistry',
    topicName: 'Atomic Structure',
    content: {
      title: 'Atomic Structure',
      intro: 'Atoms are the building blocks of all matter. Understanding atomic structure—protons, neutrons, electrons, and their arrangement—is fundamental to chemistry and explains the properties of elements.',
      keyPoints: [
        'An atom is the smallest unit of an element that retains its properties',
        'Atoms consist of three subatomic particles: protons, neutrons, electrons',
        'Protons: positive charge (+1), located in nucleus, mass ≈ 1 amu',
        'Neutrons: no charge (neutral), located in nucleus, mass ≈ 1 amu',
        'Electrons: negative charge (-1), orbit nucleus in electron shells, negligible mass',
        'Nucleus: dense center containing protons and neutrons',
        'Atomic number (Z) = number of protons = defines the element',
        'Mass number (A) = protons + neutrons',
        'Neutral atoms have equal numbers of protons and electrons',
        'Isotopes: atoms of same element with different numbers of neutrons',
        'Ions: atoms that have gained or lost electrons (charged)',
        'Electron shells (energy levels): K, L, M, N... or 1, 2, 3, 4...',
        'Maximum electrons per shell: 2n² (shell 1: 2, shell 2: 8, shell 3: 18)',
        'Valence electrons: electrons in outermost shell (determine bonding)',
        'Elements with full outer shells are stable (noble gases)'
      ],
      examples: [
        'Carbon-12: 6 protons, 6 neutrons, 6 electrons (neutral atom)',
        'Carbon-14: 6 protons, 8 neutrons, 6 electrons (isotope of carbon)',
        'Sodium ion (Na⁺): 11 protons, 12 neutrons, 10 electrons (lost 1 electron)',
        'Chloride ion (Cl⁻): 17 protons, 18 neutrons, 18 electrons (gained 1 electron)',
        'Helium (He): atomic number 2, mass number 4 → 2 protons, 2 neutrons, 2 electrons',
        'Oxygen electron configuration: 2 in first shell, 6 in second shell'
      ],
      commonMistakes: [
        'Confusing atomic number with mass number',
        'Thinking neutrons have a charge',
        'Forgetting that isotopes have the same number of protons but different neutrons',
        'Not understanding that electrons can be gained/lost but protons cannot',
        'Mixing up the location of subatomic particles'
      ],
      tips: [
        'Atomic number = protons = electrons (in neutral atom)',
        'Mass number = protons + neutrons',
        'Use the periodic table: element symbol shows atomic number',
        'Remember PEN: Protons (+), Electrons (-), Neutrons (neutral)',
        'Valence electrons determine how an atom will bond'
      ]
    }
  },
  {
    categorySlug: 'science',
    subjectName: 'General Chemistry',
    topicName: 'Chemical Bonding',
    content: {
      title: 'Chemical Bonding',
      intro: 'Chemical bonds hold atoms together to form molecules and compounds. Understanding the different types of bonds and why they form is essential for predicting chemical behavior and properties.',
      keyPoints: [
        'Atoms bond to achieve a stable electron configuration (full outer shell)',
        'Three main types: ionic, covalent, and metallic bonds',
        'Ionic bonds: transfer of electrons from metal to nonmetal',
        'Ionic compounds form between elements with large electronegativity difference',
        'Covalent bonds: sharing of electrons between nonmetals',
        'Polar covalent: unequal sharing (one atom more electronegative)',
        'Nonpolar covalent: equal sharing (same or similar electronegativity)',
        'Metallic bonds: electrons shared in a "sea" among metal atoms',
        'Valence electrons determine bonding behavior',
        'Octet rule: atoms tend to gain, lose, or share electrons to have 8 valence electrons',
        'Electronegativity: ability of an atom to attract electrons in a bond',
        'Lewis dot structures show valence electrons and bonding',
        'Ionic compounds: high melting points, conduct electricity when dissolved',
        'Covalent compounds: lower melting points, often don\'t conduct electricity',
        'Bond strength: stronger bonds require more energy to break'
      ],
      examples: [
        'Ionic: NaCl (sodium chloride) - Na gives 1 electron to Cl',
        'Covalent: H₂O (water) - oxygen shares electrons with two hydrogens',
        'Nonpolar covalent: O₂ - two oxygen atoms share equally',
        'Polar covalent: HCl - chlorine pulls electrons more than hydrogen',
        'Metallic: Copper (Cu) - electrons move freely among copper atoms',
        'Lewis structure of H₂O: O has 2 single bonds to H atoms and 2 lone pairs'
      ],
      commonMistakes: [
        'Thinking all bonds are either 100% ionic or 100% covalent (most are in between)',
        'Confusing ionic and covalent bonding',
        'Not recognizing that metals form cations (+) and nonmetals form anions (-)',
        'Forgetting to count valence electrons correctly in Lewis structures',
        'Assuming bond type only from element names without considering electronegativity'
      ],
      tips: [
        'Metal + Nonmetal = Ionic bond',
        'Nonmetal + Nonmetal = Covalent bond',
        'Check electronegativity difference: large = ionic, small = covalent',
        'Draw Lewis structures to visualize electron sharing',
        'Remember the octet rule: atoms "want" 8 valence electrons (except H wants 2)'
      ]
    }
  },

  // ============================================================================
  // GENERAL PHYSICS - CORE TOPICS
  // ============================================================================
  {
    categorySlug: 'science',
    subjectName: 'General Physics',
    topicName: 'Newton\'s Laws of Motion',
    content: {
      title: 'Newton\'s Laws of Motion',
      intro: 'Newton\'s three laws of motion describe how objects move and respond to forces. These fundamental principles form the foundation of classical mechanics and explain everything from car crashes to rocket launches.',
      keyPoints: [
        'First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force',
        'Inertia is the tendency of an object to resist changes in motion',
        'Mass is a measure of inertia: more mass = more inertia',
        'Second Law: F = ma (Force equals mass times acceleration)',
        'Net force determines acceleration: larger force → larger acceleration',
        'More mass means less acceleration for the same force',
        'Third Law: For every action, there is an equal and opposite reaction',
        'Action-reaction pairs act on different objects',
        'Forces always come in pairs',
        'Net force is the vector sum of all forces acting on an object',
        'Balanced forces: net force = 0, no acceleration',
        'Unbalanced forces: net force ≠ 0, object accelerates',
        'Weight is a force: W = mg (mass times gravity)',
        'Friction opposes motion',
        'Normal force is perpendicular to surface',
        'Applications: seatbelts, airbags, sports, space travel'
      ],
      examples: [
        'First Law: A book on a table remains at rest until you push it',
        'First Law: A hockey puck slides at constant speed on ice (low friction)',
        'Second Law: F = ma → 10 N on 2 kg object gives a = 5 m/s²',
        'Second Law: Doubling force doubles acceleration; doubling mass halves acceleration',
        'Third Law: Rocket pushes gas down, gas pushes rocket up',
        'Third Law: You push on wall, wall pushes back on you with equal force',
        'A 50 kg person weighs: W = 50 × 9.8 = 490 N on Earth'
      ],
      commonMistakes: [
        'Thinking bigger objects fall faster (they don\'t in absence of air resistance)',
        'Confusing mass with weight',
        'Thinking action-reaction pairs cancel out (they act on different objects)',
        'Not recognizing that constant velocity means net force is zero',
        'Forgetting that F = ma means net force, not just one force'
      ],
      tips: [
        'Draw free-body diagrams showing all forces on an object',
        'Mass is measured in kilograms (kg), force in Newtons (N)',
        'If an object isn\'t accelerating, forces must be balanced',
        'For Third Law, identify both objects involved in the interaction',
        'Remember: F = ma connects force, mass, and acceleration'
      ]
    }
  },
  {
    categorySlug: 'science',
    subjectName: 'General Physics',
    topicName: 'Energy and Work',
    content: {
      title: 'Energy and Work',
      intro: 'Work and energy are fundamental concepts in physics. Energy is the ability to do work, and work is the transfer of energy. Understanding these concepts helps explain everything from lifting objects to powering cities.',
      keyPoints: [
        'Work (W) = Force × distance × cos(θ), where θ is angle between force and motion',
        'Work is done when a force causes displacement',
        'Work is measured in Joules (J): 1 J = 1 N·m',
        'Energy is the ability to do work, also measured in Joules',
        'Kinetic energy (KE): energy of motion = ½mv²',
        'Potential energy (PE): stored energy due to position = mgh',
        'Work-Energy Theorem: Net work = change in kinetic energy',
        'Conservation of Energy: Energy cannot be created or destroyed, only transformed',
        'Mechanical energy = KE + PE',
        'Power (P) = Work/time or Energy/time, measured in Watts (W)',
        '1 Watt = 1 Joule/second',
        'Efficiency = (useful energy out / total energy in) × 100%',
        'Friction converts mechanical energy to thermal energy',
        'In ideal systems (no friction), mechanical energy is conserved',
        'Gravitational PE increases with height, KE increases with speed',
        'When object falls: PE converts to KE'
      ],
      examples: [
        'Lifting a 10 kg box 2 m high: W = mgh = 10 × 9.8 × 2 = 196 J',
        'Car moving at 20 m/s, mass 1000 kg: KE = ½(1000)(20²) = 200,000 J',
        'Ball dropped from height: PE → KE as it falls',
        'Pendulum swinging: KE ↔ PE conversion',
        'Push box with 50 N for 3 m: W = 50 × 3 = 150 J',
        'Light bulb uses 100 J in 1 second: P = 100 J/1 s = 100 W',
        'Motor 75% efficient: 100 J in → 75 J useful work out, 25 J wasted as heat'
      ],
      commonMistakes: [
        'Thinking work is done when no movement occurs (holding a box = no work)',
        'Confusing energy with power',
        'Forgetting to square velocity in KE formula',
        'Not recognizing energy transformations (PE to KE)',
        'Assuming 100% efficiency in real systems (friction always present)'
      ],
      tips: [
        'No displacement = no work done',
        'KE depends on speed squared: doubling speed quadruples KE',
        'PE = mgh: higher or heavier → more PE',
        'Power is the rate of doing work (how fast energy is used)',
        'Energy is conserved: total energy before = total energy after'
      ]
    }
  },

  // ============================================================================
  // PROGRAMMING FUNDAMENTALS
  // ============================================================================
  {
    categorySlug: 'computer-science',
    subjectName: 'Programming Fundamentals',
    topicName: 'Variables and Data Types',
    content: {
      title: 'Variables and Data Types',
      intro: 'Variables store data in computer programs, and data types define what kind of data can be stored. Understanding these fundamentals is essential for writing any program in any programming language.',
      keyPoints: [
        'A variable is a named storage location that holds a value',
        'Variable names should be descriptive and follow naming conventions',
        'Common data types: integers (whole numbers), floats (decimals), strings (text), booleans (True/False)',
        'Integer: whole numbers like 42, -10, 0',
        'Float: decimal numbers like 3.14, -0.5, 2.0',
        'String: text enclosed in quotes: "Hello" or \'World\'',
        'Boolean: True or False values for logical operations',
        'Variables must be declared before use (in some languages)',
        'Assignment operator =: assigns a value to a variable',
        'Type conversion: changing one data type to another',
        'Dynamic typing: type can change (Python, JavaScript)',
        'Static typing: type fixed at declaration (Java, C++)',
        'Naming rules: start with letter/underscore, no spaces, can\'t use reserved keywords',
        'Constants: variables whose values don\'t change',
        'Scope: where a variable can be accessed (global vs local)',
        'Good names: age, student_count, total_price (descriptive and clear)'
      ],
      examples: [
        'Python: age = 15 (integer)',
        'Python: price = 19.99 (float)',
        'Python: name = "Alice" (string)',
        'Python: is_student = True (boolean)',
        'Type conversion: int("42") → 42, str(100) → "100"',
        'JavaScript: let score = 95;',
        'Java: int count = 10; (must declare type)',
        'Bad name: x = 15 (unclear)\nGood name: student_age = 15 (clear purpose)'
      ],
      commonMistakes: [
        'Using reserved keywords as variable names (if, while, class)',
        'Starting variable names with numbers: 2ndPlace (invalid)',
        'Confusing = (assignment) with == (comparison)',
        'Not understanding type limitations (int can\'t store decimals in some languages)',
        'Using unclear names: a, x, temp instead of descriptive names'
      ],
      tips: [
        'Use meaningful names: total_score better than ts',
        'Follow naming conventions: snake_case (Python) or camelCase (JavaScript)',
        'Initialize variables before using them',
        'Know your language\'s data types and their limits',
        'Comment code to explain complex variables'
      ]
    }
  },
  {
    categorySlug: 'computer-science',
    subjectName: 'Programming Fundamentals',
    topicName: 'Control Structures (If/Else, Loops)',
    content: {
      title: 'Control Structures (If/Else, Loops)',
      intro: 'Control structures direct the flow of program execution. Conditional statements make decisions, while loops repeat actions. These are essential building blocks for creating dynamic, responsive programs.',
      keyPoints: [
        'If statement: executes code only if condition is True',
        'Else: executes when if condition is False',
        'Elif (else if): checks additional conditions',
        'Conditions use comparison operators: ==, !=, <, >, <=, >=',
        'Logical operators combine conditions: and, or, not',
        'For loop: repeats code a specific number of times',
        'While loop: repeats code as long as condition is True',
        'Loop variable (iterator): tracks loop progress',
        'Range function: generates sequence of numbers for loops',
        'Break statement: exits loop early',
        'Continue statement: skips to next iteration',
        'Nested loops: loop inside another loop',
        'Indentation matters (Python): defines code blocks',
        'Infinite loops: while True or condition never becomes False',
        'Loop through collections: lists, strings, etc.',
        'Off-by-one errors: common mistake in loop ranges'
      ],
      examples: [
        'If/else:\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
        'Elif:\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
        'For loop:\nfor i in range(5):\n    print(i)  # prints 0, 1, 2, 3, 4',
        'While loop:\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1',
        'Loop with break:\nfor num in range(10):\n    if num == 5:\n        break\n    print(num)  # prints 0-4',
        'Nested loop:\nfor i in range(3):\n    for j in range(2):\n        print(i, j)'
      ],
      commonMistakes: [
        'Using = instead of == in conditions',
        'Forgetting to increment counter in while loop (infinite loop)',
        'Off-by-one errors: range(5) gives 0-4, not 1-5',
        'Not indenting code blocks properly',
        'Infinite loops without break condition',
        'Confusing and/or in logical expressions'
      ],
      tips: [
        'Test edge cases: what if variable is 0, negative, or very large?',
        'Use for loops when you know iterations count, while for unknown count',
        'Always ensure while loop condition will eventually become False',
        'Draw flowcharts to visualize control flow',
        'Use meaningful condition names: if is_valid rather than if x'
      ]
    }
  },
  {
    categorySlug: 'computer-science',
    subjectName: 'Programming Fundamentals',
    topicName: 'Functions and Methods',
    content: {
      title: 'Functions and Methods',
      intro: 'Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce repetition, and make programs easier to understand and maintain.',
      keyPoints: [
        'Function: named block of code that performs a specific task',
        'Define function with def keyword (Python) or function keyword (JavaScript)',
        'Parameters: inputs that functions accept',
        'Arguments: actual values passed to function when called',
        'Return statement: sends value back to caller',
        'Functions without return give None (Python) or undefined (JavaScript)',
        'Scope: variables inside function are local (not accessible outside)',
        'Function call: functionName(arguments)',
        'Multiple parameters: separate with commas',
        'Default parameters: provide fallback values',
        'Docstrings: document what function does',
        'DRY principle: Don\'t Repeat Yourself - use functions to avoid repetition',
        'Function naming: should describe what it does (verb_noun)',
        'Methods: functions that belong to objects/classes',
        'Built-in functions: print(), len(), input(), etc.',
        'Recursion: function calling itself (advanced topic)'
      ],
      examples: [
        'Simple function:\ndef greet():\n    print("Hello!")\ngreet()  # calls function',
        'With parameters:\ndef add(a, b):\n    return a + b\nresult = add(5, 3)  # result = 8',
        'Default parameter:\ndef power(base, exp=2):\n    return base ** exp\npower(3)  # returns 9 (3²)\npower(3, 3)  # returns 27 (3³)',
        'Multiple returns:\ndef min_max(numbers):\n    return min(numbers), max(numbers)\nlow, high = min_max([1, 5, 3])',
        'Docstring:\ndef calculate_area(radius):\n    """Calculate area of circle given radius."""\n    return 3.14 * radius ** 2'
      ],
      commonMistakes: [
        'Forgetting to call function (defining but not using it)',
        'Not returning a value when one is needed',
        'Confusing parameters (definition) with arguments (call)',
        'Accessing local variables outside function',
        'Forgetting parentheses when calling function',
        'Modifying global variables inside function without declaring'
      ],
      tips: [
        'One function = one task (keep functions focused)',
        'Use descriptive names: calculate_total() not calc()',
        'Always document complex functions with comments/docstrings',
        'Test functions with different inputs',
        'Return early from functions to avoid deep nesting',
        'Keep functions short (generally under 20-30 lines)'
      ]
    }
  },

  // ============================================================================
  // GRAMMAR AND WRITING
  // ============================================================================
  {
    categorySlug: 'english',
    subjectName: 'Grammar and Writing',
    topicName: 'Parts of Speech',
    content: {
      title: 'Parts of Speech',
      intro: 'Parts of speech are categories of words based on their function in a sentence. Understanding the eight parts of speech is foundational for grammar, writing, and communication.',
      keyPoints: [
        'Eight parts of speech: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, interjections',
        'Noun: person, place, thing, or idea (dog, city, happiness)',
        'Pronoun: replaces a noun (I, you, he, she, it, they, who)',
        'Verb: action or state of being (run, is, think, become)',
        'Adjective: describes a noun (blue, tall, difficult)',
        'Adverb: describes a verb, adjective, or another adverb (quickly, very, too)',
        'Preposition: shows relationship between noun and other words (in, on, at, with, under)',
        'Conjunction: connects words or groups of words (and, but, or, because, although)',
        'Interjection: expresses emotion (wow, ouch, hey)',
        'Words can function as different parts of speech depending on context',
        'Nouns can be common (dog) or proper (Fido)',
        'Verbs can be action (jump) or linking (is, seem, become)',
        'Adjectives answer: which one? what kind? how many?',
        'Adverbs often end in -ly and answer: how? when? where? to what extent?',
        'Coordinating conjunctions: FANBOYS (for, and, nor, but, or, yet, so)',
        'Subordinating conjunctions introduce dependent clauses: because, although, if, when'
      ],
      examples: [
        'Noun: "The cat sat on the mat." (cat, mat)',
        'Pronoun: "She gave it to him."',
        'Verb: "They run fast." (action) "She is happy." (linking)',
        'Adjective: "The red car is fast."',
        'Adverb: "He runs quickly." (how?) "She arrived yesterday." (when?)',
        'Preposition: "The book is on the table."',
        'Conjunction: "I like tea and coffee." "She left because she was tired."',
        'Interjection: "Wow! That\'s amazing!"',
        'Word as different parts: "Light the fire" (verb) vs "The light is bright" (noun)'
      ],
      commonMistakes: [
        'Confusing adjectives and adverbs (good vs well)',
        'Using an adjective to modify a verb: "He runs good" (should be "well")',
        'Not recognizing that words can be multiple parts of speech',
        'Confusing prepositions and adverbs',
        'Overusing interjections in formal writing'
      ],
      tips: [
        'Nouns name things, verbs show action or being',
        'Adjectives modify nouns, adverbs modify verbs/adjectives/adverbs',
        'If it ends in -ly, it\'s probably an adverb (but not always: friendly is adjective)',
        'Prepositions usually show location or time relationships',
        'Learn FANBOYS for coordinating conjunctions',
        'Ask yourself: what role does this word play in the sentence?'
      ]
    }
  },
  {
    categorySlug: 'english',
    subjectName: 'Grammar and Writing',
    topicName: 'Sentence Structure',
    content: {
      title: 'Sentence Structure',
      intro: 'Sentence structure refers to how words, phrases, and clauses are arranged to form meaningful sentences. Understanding different sentence types helps create varied, effective writing.',
      keyPoints: [
        'A sentence expresses a complete thought and has a subject and predicate',
        'Subject: who or what the sentence is about',
        'Predicate: what the subject does or is',
        'Simple sentence: one independent clause (I ran.)',
        'Compound sentence: two or more independent clauses joined by conjunction or semicolon',
        'Complex sentence: one independent clause + one or more dependent clauses',
        'Compound-complex sentence: multiple independent clauses + at least one dependent clause',
        'Independent clause: can stand alone as a sentence',
        'Dependent clause: cannot stand alone, begins with subordinating conjunction',
        'Fragment: incomplete sentence missing subject or verb',
        'Run-on sentence: two independent clauses incorrectly joined',
        'Comma splice: two independent clauses joined with only a comma (incorrect)',
        'Use conjunctions (and, but, or) or semicolons to join independent clauses',
        'Vary sentence structure for interesting writing',
        'Subject-verb agreement: singular subject takes singular verb',
        'Parallel structure: items in a list should have same grammatical form'
      ],
      examples: [
        'Simple: "The dog barked."',
        'Compound: "The dog barked, and the cat hissed."',
        'Complex: "When the dog barked, the cat hissed."',
        'Compound-complex: "When the dog barked, the cat hissed, and the bird flew away."',
        'Fragment: "Because I was tired." (incomplete thought)',
        'Run-on: "I ran she walked" (needs conjunction or punctuation)',
        'Comma splice: "I ran, she walked." (should be: "I ran, and she walked." or "I ran; she walked.")',
        'Correct compound: "She likes tea, but he prefers coffee."'
      ],
      commonMistakes: [
        'Writing sentence fragments as complete sentences',
        'Creating run-on sentences without proper punctuation',
        'Using comma splices instead of conjunctions or semicolons',
        'Starting too many sentences the same way',
        'Not varying sentence length and structure',
        'Confusing dependent and independent clauses'
      ],
      tips: [
        'Every sentence needs a subject and a predicate',
        'Read sentences aloud to check if they sound complete',
        'Use FANBOYS (for, and, nor, but, or, yet, so) to join independent clauses',
        'Vary sentence types to keep writing interesting',
        'Check: can this clause stand alone? If not, it\'s dependent',
        'Semicolons can join closely related independent clauses'
      ]
    }
  },

  // ==================== ALGEBRA 2 ====================
  {
    categorySlug: 'high-school',
    subjectName: 'Algebra 2',
    topicName: 'Logarithms and Exponential Functions',
    content: {
      title: 'Logarithms and Exponential Functions',
      intro: 'Logarithms and exponential functions are inverse operations that model growth, decay, and many real-world phenomena. Understanding their properties and relationships is essential for advanced mathematics and science.',
      keyPoints: [
        'An exponential function has the form f(x) = a·bˣ where a ≠ 0, b > 0, and b ≠ 1',
        'A logarithm is the inverse of an exponential: if bˣ = y, then log_b(y) = x',
        'The natural logarithm ln(x) uses base e ≈ 2.718, while common logarithm log(x) uses base 10',
        'Product rule: log_b(xy) = log_b(x) + log_b(y)',
        'Quotient rule: log_b(x/y) = log_b(x) - log_b(y)',
        'Power rule: log_b(xⁿ) = n·log_b(x)',
        'Change of base formula: log_b(x) = log_c(x) / log_c(b)',
        'Exponential growth: y = a·eᵏᵗ where k > 0 (population, compound interest)',
        'Exponential decay: y = a·e⁻ᵏᵗ where k > 0 (radioactive decay, depreciation)',
        'The domain of log_b(x) is x > 0; the range is all real numbers',
        'The graphs of y = bˣ and y = log_b(x) are reflections across y = x',
        'For exponential functions: as x → ∞, f(x) → ∞ (if b > 1) or f(x) → 0 (if 0 < b < 1)',
        'Solving exponential equations: take logarithm of both sides',
        'Solving logarithmic equations: convert to exponential form',
        'Half-life formula: A(t) = A₀·(1/2)^(t/h) where h is the half-life'
      ],
      examples: [
        'Solve: 2ˣ = 16\nSince 16 = 2⁴, we have x = 4\nAlternatively: log₂(16) = x → x = 4',
        'Simplify: log₃(27) + log₃(9)\n= log₃(27·9) = log₃(243)\n= log₃(3⁵) = 5',
        'Solve: 5^(x+2) = 125\n5^(x+2) = 5³\nx + 2 = 3\nx = 1',
        'Expand: log(x²y³/z)\n= log(x²) + log(y³) - log(z)\n= 2log(x) + 3log(y) - log(z)',
        'Solve for t: 1000 = 500·e^(0.05t)\n2 = e^(0.05t)\nln(2) = 0.05t\nt = ln(2)/0.05 ≈ 13.86 years',
        'Graph description: y = 2ˣ passes through (0,1), increases exponentially, has horizontal asymptote at y = 0'
      ],
      commonMistakes: [
        'Thinking log_b(x + y) = log_b(x) + log_b(y) (NOT TRUE - only for multiplication)',
        'Forgetting that you cannot take the logarithm of a negative number',
        'Confusing ln(x) with log(x) - they have different bases',
        'Not checking for extraneous solutions when solving logarithmic equations',
        'Incorrectly applying the power rule: log(x²) ≠ (log x)²'
      ],
      tips: [
        'When solving exponential equations, try to express both sides with the same base',
        'Remember: log and exponential functions "undo" each other',
        'Always check that solutions to logarithmic equations are in the domain (x > 0)',
        'Use the change of base formula to evaluate logs with uncommon bases on calculators',
        'For word problems, identify if the situation involves growth (k > 0) or decay (k < 0)'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'Algebra 2',
    topicName: 'Polynomial Functions and Complex Numbers',
    content: {
      title: 'Polynomial Functions and Complex Numbers',
      intro: 'Polynomial functions are fundamental algebraic expressions involving powers of variables. Complex numbers extend the real number system to include solutions to equations like x² = -1, enabling complete solutions to all polynomial equations.',
      keyPoints: [
        'A polynomial of degree n has the form: f(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀',
        'The Fundamental Theorem of Algebra: A polynomial of degree n has exactly n complex roots (counting multiplicity)',
        'Complex number form: z = a + bi where i = √(-1) and i² = -1',
        'Adding complex numbers: (a + bi) + (c + di) = (a + c) + (b + d)i',
        'Multiplying complex numbers: (a + bi)(c + di) = (ac - bd) + (ad + bc)i',
        'Complex conjugate of z = a + bi is z̄ = a - bi',
        'To divide complex numbers, multiply numerator and denominator by the conjugate of denominator',
        'End behavior of polynomials depends on the leading term: aₙxⁿ',
        'Rational Root Theorem: possible rational roots are ±(factors of a₀)/(factors of aₙ)',
        'Factor Theorem: (x - c) is a factor of f(x) if and only if f(c) = 0',
        'Remainder Theorem: When dividing f(x) by (x - c), the remainder is f(c)',
        'Complex roots come in conjugate pairs for polynomials with real coefficients',
        'Multiplicity of a root: if (x - c)ᵏ is a factor, c is a root of multiplicity k',
        'Descartes Rule of Signs helps determine the number of positive and negative real roots',
        'Synthetic division is a shortcut for dividing polynomials by linear factors'
      ],
      examples: [
        'Add complex numbers: (3 + 4i) + (2 - 5i) = 5 - i',
        'Multiply: (2 + 3i)(1 - 2i)\n= 2 - 4i + 3i - 6i²\n= 2 - i - 6(-1)\n= 8 - i',
        'Divide: (3 + 4i)/(1 + 2i)\nMultiply by conjugate: (3 + 4i)(1 - 2i)/[(1 + 2i)(1 - 2i)]\n= (3 - 6i + 4i - 8i²)/(1 - 4i²)\n= (11 - 2i)/5 = 11/5 - 2i/5',
        'Find roots of f(x) = x³ - 6x² + 11x - 6\nPossible rational roots: ±1, ±2, ±3, ±6\nTest x = 1: f(1) = 1 - 6 + 11 - 6 = 0 ✓\nFactor: (x - 1)(x² - 5x + 6) = (x - 1)(x - 2)(x - 3)\nRoots: x = 1, 2, 3',
        'End behavior of f(x) = -2x⁴ + 3x³ - x + 5:\nAs x → ∞, f(x) → -∞ (leading term dominates)\nAs x → -∞, f(x) → -∞',
        'Graph description: Cubic function f(x) = x³ - 3x + 1 has S-shape, crosses x-axis 3 times, inflection point at origin'
      ],
      commonMistakes: [
        'Forgetting that i² = -1 when multiplying complex numbers',
        'Incorrectly simplifying: (a + bi)² ≠ a² + b²i²',
        'Missing complex conjugate roots when factoring polynomials',
        'Not using synthetic division efficiently for repeated root tests',
        'Confusing degree with the number of turning points (degree n has at most n-1 turning points)'
      ],
      tips: [
        'Always simplify i² = -1 immediately when multiplying complex numbers',
        'Use synthetic division to quickly test multiple possible rational roots',
        'Remember: if a + bi is a root of a polynomial with real coefficients, so is a - bi',
        'Graph polynomials to visualize roots and turning points',
        'Check your factored form by expanding it back to verify correctness'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'Algebra 2',
    topicName: 'Sequences and Series',
    content: {
      title: 'Sequences and Series',
      intro: 'Sequences are ordered lists of numbers following a pattern, while series are the sums of sequence terms. These concepts appear in finance, physics, and computer science, and form the foundation for calculus.',
      keyPoints: [
        'A sequence is a function whose domain is positive integers: a₁, a₂, a₃, ..., aₙ',
        'Arithmetic sequence: each term differs by a constant d (common difference)',
        'Arithmetic sequence formula: aₙ = a₁ + (n-1)d',
        'Geometric sequence: each term is multiplied by a constant r (common ratio)',
        'Geometric sequence formula: aₙ = a₁ · rⁿ⁻¹',
        'Arithmetic series sum: Sₙ = n(a₁ + aₙ)/2 or Sₙ = n[2a₁ + (n-1)d]/2',
        'Geometric series sum: Sₙ = a₁(1 - rⁿ)/(1 - r) for r ≠ 1',
        'Infinite geometric series sum (|r| < 1): S = a₁/(1 - r)',
        'Infinite geometric series diverges if |r| ≥ 1',
        'Recursive formula defines each term using previous terms: aₙ = f(aₙ₋₁)',
        'Explicit formula defines aₙ directly in terms of n',
        'Sigma notation: Σ represents summation from lower to upper limit',
        'Factorial: n! = n·(n-1)·(n-2)·...·3·2·1, with 0! = 1',
        'Applications: compound interest, population growth, amortization',
        'Fibonacci sequence: aₙ = aₙ₋₁ + aₙ₋₂ with a₁ = 1, a₂ = 1'
      ],
      examples: [
        'Arithmetic sequence: 3, 7, 11, 15, ...\na₁ = 3, d = 4\na₁₀ = 3 + (10-1)·4 = 3 + 36 = 39',
        'Geometric sequence: 2, 6, 18, 54, ...\na₁ = 2, r = 3\na₆ = 2·3⁵ = 2·243 = 486',
        'Sum of arithmetic series: 2 + 5 + 8 + ... + 50\na₁ = 2, d = 3, aₙ = 50\nFind n: 50 = 2 + (n-1)·3 → n = 17\nS₁₇ = 17(2 + 50)/2 = 442',
        'Sum of geometric series: 1 + 1/2 + 1/4 + 1/8 + ...\na₁ = 1, r = 1/2\nS = 1/(1 - 1/2) = 2',
        'Evaluate: Σ(2k + 1) from k=1 to 5\n= 3 + 5 + 7 + 9 + 11 = 35',
        'Table: Arithmetic vs Geometric Sequences\n| Property | Arithmetic | Geometric |\n|----------|------------|----------|\n| Pattern | Add d | Multiply by r |\n| Formula | aₙ = a₁+(n-1)d | aₙ = a₁·rⁿ⁻¹ |\n| Example | 2,5,8,11 | 2,6,18,54 |'
      ],
      commonMistakes: [
        'Confusing arithmetic (add) with geometric (multiply) sequences',
        'Using the wrong formula for series sums',
        'Forgetting that infinite geometric series only converges when |r| < 1',
        'Off-by-one errors when counting terms in a sequence',
        'Not simplifying sigma notation before attempting to sum'
      ],
      tips: [
        'For arithmetic: look for what you ADD each time (common difference)',
        'For geometric: look for what you MULTIPLY by each time (common ratio)',
        'To find n in a sequence, solve the explicit formula for n',
        'Check if |r| < 1 before using infinite geometric series formula',
        'Use tables to organize sequence data and spot patterns easily'
      ]
    }
  },

  // ==================== CALCULUS ====================
  {
    categorySlug: 'high-school',
    subjectName: 'Calculus',
    topicName: 'Limits and Continuity',
    content: {
      title: 'Limits and Continuity',
      intro: 'Limits describe the behavior of functions as inputs approach specific values. They form the foundation of calculus, enabling us to define derivatives and integrals rigorously.',
      keyPoints: [
        'Limit notation: lim(x→a) f(x) = L means f(x) approaches L as x approaches a',
        'A limit exists if left-hand limit equals right-hand limit: lim(x→a⁻) f(x) = lim(x→a⁺) f(x)',
        'Limit laws: lim[f(x) ± g(x)] = lim f(x) ± lim g(x)',
        'Product law: lim[f(x)·g(x)] = [lim f(x)]·[lim g(x)]',
        'Quotient law: lim[f(x)/g(x)] = [lim f(x)]/[lim g(x)] if lim g(x) ≠ 0',
        'Direct substitution: If f is continuous at a, then lim(x→a) f(x) = f(a)',
        'Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞-∞, 0⁰, ∞⁰, 1^∞',
        'Factoring technique: Cancel common factors to resolve 0/0 form',
        'Rationalization: Multiply by conjugate to simplify radical expressions',
        'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L',
        'Continuity at a: f is continuous at x = a if lim(x→a) f(x) = f(a)',
        'Types of discontinuity: removable, jump, infinite',
        'Intermediate Value Theorem: If f is continuous on [a,b] and k is between f(a) and f(b), then there exists c where f(c) = k',
        'Limits at infinity: lim(x→∞) f(x) describes end behavior',
        'Horizontal asymptote at y = L if lim(x→±∞) f(x) = L'
      ],
      examples: [
        'Evaluate: lim(x→3) (x² - 9)/(x - 3)\nFactor: (x-3)(x+3)/(x-3) = x + 3\nLimit = 3 + 3 = 6',
        'Evaluate: lim(x→0) (√(x+4) - 2)/x\nRationalize: multiply by (√(x+4) + 2)/(√(x+4) + 2)\n= (x+4-4)/[x(√(x+4)+2)] = 1/(√(x+4)+2)\nLimit = 1/4',
        'Evaluate: lim(x→∞) (3x² + 2x)/(x² - 5)\nDivide by x²: (3 + 2/x)/(1 - 5/x²)\nAs x→∞: (3 + 0)/(1 - 0) = 3',
        'Test continuity of f(x) = {x² if x < 1; 2x if x ≥ 1} at x = 1\nLeft: lim(x→1⁻) x² = 1\nRight: lim(x→1⁺) 2x = 2\nLimits don\'t match → jump discontinuity',
        'Graph description: f(x) = 1/x has vertical asymptote at x = 0, horizontal asymptote at y = 0',
        'Table: Types of Discontinuity\n| Type | Description | Example |\n|------|-------------|----------|\n| Removable | Hole in graph | (x²-1)/(x-1) at x=1 |\n| Jump | Left ≠ Right | Piecewise at boundary |\n| Infinite | Vertical asymptote | 1/x at x=0 |'
      ],
      commonMistakes: [
        'Directly substituting when it gives 0/0 (indeterminate form)',
        'Thinking lim(x→a) f(x) requires f(a) to exist (it doesn\'t!)',
        'Confusing "limit exists" with "function is continuous"',
        'Forgetting to check both left and right limits for existence',
        'Incorrectly canceling terms that aren\'t common factors'
      ],
      tips: [
        'Always try direct substitution first - it\'s the fastest method',
        'For 0/0 forms, try factoring, rationalizing, or L\'Hôpital\'s Rule (if learned)',
        'For limits at infinity, divide by highest power of x in denominator',
        'Draw a graph to visualize limit behavior and discontinuities',
        'Remember: continuity requires THREE things: f(a) exists, limit exists, and they\'re equal'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'Calculus',
    topicName: 'Derivatives and Applications',
    content: {
      title: 'Derivatives and Applications',
      intro: 'The derivative measures instantaneous rate of change and is the foundation of differential calculus. Derivatives enable us to analyze motion, optimize functions, and model real-world phenomena.',
      keyPoints: [
        'Derivative definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
        'Derivative notation: f\'(x), dy/dx, df/dx, d/dx[f(x)]',
        'Geometric meaning: derivative is the slope of the tangent line at a point',
        'Physical meaning: velocity is derivative of position; acceleration is derivative of velocity',
        'Power rule: d/dx[xⁿ] = n·xⁿ⁻¹',
        'Constant multiple: d/dx[c·f(x)] = c·f\'(x)',
        'Sum rule: d/dx[f(x) + g(x)] = f\'(x) + g\'(x)',
        'Product rule: d/dx[f(x)·g(x)] = f\'(x)·g(x) + f(x)·g\'(x)',
        'Quotient rule: d/dx[f(x)/g(x)] = [f\'(x)·g(x) - f(x)·g\'(x)]/[g(x)]²',
        'Chain rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x) or dy/dx = (dy/du)·(du/dx)',
        'Exponential: d/dx[eˣ] = eˣ, d/dx[aˣ] = aˣ·ln(a)',
        'Logarithmic: d/dx[ln(x)] = 1/x, d/dx[log_a(x)] = 1/(x·ln(a))',
        'Trig: d/dx[sin(x)] = cos(x), d/dx[cos(x)] = -sin(x), d/dx[tan(x)] = sec²(x)',
        'Critical points occur where f\'(x) = 0 or f\'(x) is undefined',
        'First derivative test: f\' changes from + to - → local max; - to + → local min',
        'Second derivative test: f\'\'(c) > 0 → concave up (local min); f\'\'(c) < 0 → concave down (local max)',
        'Optimization: find critical points, test endpoints and critical points',
        'Related rates: use chain rule to relate rates of change of multiple variables',
        'Mean Value Theorem: If f is continuous on [a,b] and differentiable on (a,b), then there exists c where f\'(c) = [f(b)-f(a)]/(b-a)'
      ],
      examples: [
        'Find derivative: f(x) = 3x⁴ - 2x² + 5\nf\'(x) = 12x³ - 4x',
        'Product rule: f(x) = x²·sin(x)\nf\'(x) = 2x·sin(x) + x²·cos(x)',
        'Quotient rule: f(x) = (x² + 1)/(x - 2)\nf\'(x) = [2x(x-2) - (x²+1)·1]/(x-2)²\n= (x² - 4x - 1)/(x-2)²',
        'Chain rule: f(x) = (3x² + 1)⁵\nLet u = 3x² + 1, then f = u⁵\nf\'(x) = 5u⁴·(6x) = 30x(3x² + 1)⁴',
        'Find local extrema of f(x) = x³ - 3x² + 2\nf\'(x) = 3x² - 6x = 3x(x - 2)\nCritical points: x = 0, 2\nf\'\'(x) = 6x - 6\nf\'\'(0) = -6 < 0 → local max at (0, 2)\nf\'\'(2) = 6 > 0 → local min at (2, -2)',
        'Related rates: A balloon\'s radius increases at 2 cm/s. How fast is volume changing when r = 5?\nV = (4/3)πr³\ndV/dt = 4πr²·(dr/dt) = 4π(5²)·2 = 200π cm³/s',
        'Graph description: f(x) = x³ - 3x has critical points at x = -1 (local max) and x = 1 (local min)'
      ],
      commonMistakes: [
        'Forgetting to multiply by inner derivative when using chain rule',
        'Mixing up product rule and chain rule',
        'Not checking endpoints when finding absolute extrema on closed intervals',
        'Incorrectly applying quotient rule: wrong sign or order',
        'Thinking f\'(x) = 0 always means local max or min (could be inflection point)'
      ],
      tips: [
        'For nested functions, use chain rule; for multiplied functions, use product rule',
        'Practice recognizing when to use each rule - this becomes intuitive',
        'Always simplify derivatives after applying rules',
        'For optimization: identify variable to optimize, write equation, find f\'(x), solve f\'(x) = 0',
        'In related rates: draw diagram, write equation relating variables, differentiate with respect to time'
      ]
    }
  },

  // ==================== STATISTICS ====================
  {
    categorySlug: 'high-school',
    subjectName: 'Statistics',
    topicName: 'Descriptive Statistics and Data Analysis',
    content: {
      title: 'Descriptive Statistics and Data Analysis',
      intro: 'Descriptive statistics summarize and describe the main features of a dataset. These measures help us understand central tendency, variability, and distribution shape.',
      keyPoints: [
        'Mean (average): sum of all values divided by number of values: x̄ = Σx/n',
        'Median: middle value when data is ordered (50th percentile)',
        'Mode: most frequently occurring value in the dataset',
        'Range: difference between maximum and minimum values',
        'Variance (σ²): average of squared deviations from mean',
        'Standard deviation (σ): square root of variance, measures spread',
        'Population variance: σ² = Σ(x - μ)²/N',
        'Sample variance: s² = Σ(x - x̄)²/(n - 1) (uses n-1 for unbiased estimate)',
        'Quartiles: Q1 (25th), Q2 (50th/median), Q3 (75th percentiles)',
        'Interquartile range (IQR): Q3 - Q1, measures middle 50% spread',
        'Outliers: values below Q1 - 1.5·IQR or above Q3 + 1.5·IQR',
        'Z-score: standardized value z = (x - μ)/σ, measures standard deviations from mean',
        'Box plot: visual display showing min, Q1, median, Q3, max, and outliers',
        'Distribution shapes: symmetric, skewed left (negative), skewed right (positive)',
        'For symmetric distributions: mean ≈ median; for skewed right: mean > median',
        'Five-number summary: minimum, Q1, median, Q3, maximum'
      ],
      examples: [
        'Dataset: 2, 4, 4, 5, 7, 9, 10\nMean: (2+4+4+5+7+9+10)/7 = 41/7 ≈ 5.86\nMedian: 5 (middle value)\nMode: 4 (appears twice)',
        'Calculate standard deviation for {2, 4, 6, 8}:\nMean = 5\nVariance = [(2-5)² + (4-5)² + (6-5)² + (8-5)²]/4\n= [9 + 1 + 1 + 9]/4 = 5\nStandard deviation = √5 ≈ 2.24',
        'Find quartiles: 3, 5, 7, 8, 10, 12, 15, 18, 20\nQ2 (median) = 10\nQ1 (median of lower half) = 7\nQ3 (median of upper half) = 15\nIQR = 15 - 7 = 8',
        'Z-score: Test score 85 with mean 75 and σ = 10\nz = (85 - 75)/10 = 1\nInterpretation: score is 1 standard deviation above mean',
        'Identify outliers: Dataset with Q1 = 20, Q3 = 40\nIQR = 20\nLower fence: 20 - 1.5(20) = -10\nUpper fence: 40 + 1.5(20) = 70\nAny value < -10 or > 70 is an outlier',
        'Table: Measures of Center\n| Measure | Formula | Best Use |\n|---------|---------|----------|\n| Mean | Σx/n | Symmetric data |\n| Median | Middle value | Skewed data |\n| Mode | Most frequent | Categorical data |',
        'Box plot description: Shows Q1 at 20, median at 30, Q3 at 45, whiskers extend to 10 and 60, one outlier at 85'
      ],
      commonMistakes: [
        'Using mean for skewed data (median is more appropriate)',
        'Forgetting to divide by n-1 for sample standard deviation',
        'Confusing variance with standard deviation (variance is squared)',
        'Not ordering data before finding median or quartiles',
        'Calculating IQR as (max - min) instead of (Q3 - Q1)'
      ],
      tips: [
        'Always plot your data first to see shape and identify outliers',
        'Use median and IQR for skewed data; use mean and standard deviation for symmetric data',
        'Remember: about 68% of data falls within 1σ of mean (for normal distributions)',
        'Box plots are excellent for comparing multiple groups',
        'Z-scores are useful for comparing values from different distributions'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'Statistics',
    topicName: 'Probability and Distributions',
    content: {
      title: 'Probability and Distributions',
      intro: 'Probability quantifies the likelihood of events occurring. Probability distributions describe the pattern of outcomes for random variables and form the basis for statistical inference.',
      keyPoints: [
        'Probability: P(A) = (number of favorable outcomes)/(total number of outcomes)',
        'All probabilities satisfy: 0 ≤ P(A) ≤ 1',
        'Complement rule: P(not A) = 1 - P(A)',
        'Addition rule: P(A or B) = P(A) + P(B) - P(A and B)',
        'For mutually exclusive events: P(A or B) = P(A) + P(B)',
        'Multiplication rule (independent): P(A and B) = P(A)·P(B)',
        'Conditional probability: P(A|B) = P(A and B)/P(B)',
        'Random variable: numerical outcome of a random process',
        'Discrete variable: countable outcomes (coin flips, dice rolls)',
        'Continuous variable: infinite possible values in an interval (height, time)',
        'Expected value: E(X) = Σ[x·P(x)], the long-run average',
        'Binomial distribution: n independent trials, two outcomes, constant probability',
        'Binomial formula: P(X = k) = C(n,k)·p^k·(1-p)^(n-k)',
        'Normal distribution: bell-shaped, symmetric, described by mean μ and standard deviation σ',
        'Empirical rule (68-95-99.7): 68% within 1σ, 95% within 2σ, 99.7% within 3σ',
        'Standard normal (Z) distribution: μ = 0, σ = 1, use z-table for probabilities'
      ],
      examples: [
        'Single die probability:\nP(rolling 4) = 1/6\nP(rolling even) = 3/6 = 1/2\nP(rolling 1 or 6) = 1/6 + 1/6 = 1/3',
        'Two coin flips:\nP(HH) = 1/4, P(HT) = 1/4, P(TH) = 1/4, P(TT) = 1/4\nP(at least one H) = 1 - P(TT) = 1 - 1/4 = 3/4',
        'Conditional probability:\nP(rain) = 0.3, P(traffic|rain) = 0.8\nP(traffic and rain) = 0.3 × 0.8 = 0.24',
        'Expected value: Roll die, win $10 for 6, lose $2 otherwise\nE(X) = (1/6)·10 + (5/6)·(-2) = 10/6 - 10/6 = 0\nFair game!',
        'Binomial: Flip coin 5 times, P(exactly 3 heads)\nP(X=3) = C(5,3)·(0.5)³·(0.5)² = 10·0.125·0.25 = 0.3125',
        'Normal distribution: IQ scores with μ=100, σ=15\nFind P(X > 115) = P(Z > 1) ≈ 0.16 (16%)\nFind P(85 < X < 115) = P(-1 < Z < 1) ≈ 0.68 (68%)',
        'Table: Common Probability Distributions\n| Distribution | Type | Example Use |\n|--------------|------|-------------|\n| Binomial | Discrete | Coin flips, yes/no surveys |\n| Normal | Continuous | Heights, test scores |\n| Uniform | Both | Random number generator |',
        'Graph description: Normal curve centered at μ, symmetric bell shape, tails approach but never touch x-axis'
      ],
      commonMistakes: [
        'Adding probabilities for non-mutually exclusive events without subtracting overlap',
        'Multiplying probabilities for dependent events (need conditional probability)',
        'Confusing P(A|B) with P(B|A) - they are usually different!',
        'Forgetting that probabilities must sum to 1 for all possible outcomes',
        'Using binomial formula when trials are not independent'
      ],
      tips: [
        'Draw a Venn diagram for complex probability problems',
        'Use tree diagrams to visualize sequential events',
        'Check if events are independent before multiplying probabilities',
        'For normal distribution problems, always standardize first (convert to Z-score)',
        'Remember: "or" usually means add, "and" usually means multiply (with care for independence)'
      ]
    }
  },

  // ==================== AP BIOLOGY ====================
  {
    categorySlug: 'high-school',
    subjectName: 'AP Biology',
    topicName: 'Cell Membrane and Transport',
    content: {
      title: 'Cell Membrane and Transport',
      intro: 'The cell membrane is a selectively permeable barrier that controls what enters and exits the cell. Understanding membrane structure and transport mechanisms is fundamental to cell biology.',
      keyPoints: [
        'Cell membrane structure: phospholipid bilayer with embedded proteins (fluid mosaic model)',
        'Phospholipids: hydrophilic (water-loving) heads face outward, hydrophobic (water-fearing) tails face inward',
        'Membrane proteins: integral (embedded) and peripheral (surface-attached)',
        'Cholesterol: maintains membrane fluidity at various temperatures',
        'Selective permeability: allows some molecules through while blocking others',
        'Passive transport: movement down concentration gradient, no energy required',
        'Simple diffusion: small nonpolar molecules (O₂, CO₂) pass directly through membrane',
        'Facilitated diffusion: polar molecules use channel or carrier proteins, no energy needed',
        'Osmosis: diffusion of water across selectively permeable membrane',
        'Hypertonic solution: higher solute concentration outside cell → cell shrinks',
        'Hypotonic solution: lower solute concentration outside cell → cell swells',
        'Isotonic solution: equal solute concentration → no net water movement',
        'Active transport: movement against concentration gradient, requires ATP',
        'Sodium-potassium pump: uses ATP to pump 3 Na⁺ out, 2 K⁺ in',
        'Endocytosis: cell membrane engulfs material (phagocytosis, pinocytosis, receptor-mediated)',
        'Exocytosis: vesicles fuse with membrane to release contents outside cell'
      ],
      examples: [
        'Diagram: Phospholipid bilayer with hydrophilic heads (circles) pointing outward, hydrophobic tails (lines) pointing inward',
        'Osmosis in red blood cells:\n- In hypertonic solution: cell crenates (shrinks)\n- In hypotonic solution: cell lyses (bursts)\n- In isotonic solution: cell maintains normal shape',
        'Active transport: Sodium-potassium pump maintains electrochemical gradient\nATP → ADP + P, energy used to pump ions against gradient\nCritical for nerve impulse transmission',
        'Facilitated diffusion: Glucose enters cells via GLUT transporters\nNo ATP required, moves down concentration gradient\nMuch faster than simple diffusion alone',
        'Endocytosis types:\n- Phagocytosis: "cell eating" - engulfs large particles\n- Pinocytosis: "cell drinking" - takes in fluid droplets\n- Receptor-mediated: specific molecules bind receptors',
        'Table: Passive vs Active Transport\n| Property | Passive | Active |\n|----------|---------|--------|\n| Energy | None (ATP) | Requires ATP |\n| Direction | Down gradient | Against gradient |\n| Examples | Diffusion, osmosis | Na⁺/K⁺ pump |'
      ],
      commonMistakes: [
        'Thinking all transport requires energy (passive transport does not)',
        'Confusing hypertonic and hypotonic solutions',
        'Believing proteins can flip-flop across membrane (they cannot - too large)',
        'Thinking osmosis only occurs in one direction (water moves both ways, but net flow depends on gradient)',
        'Forgetting that facilitated diffusion still requires no energy'
      ],
      tips: [
        'Remember: hyper = higher solute concentration, hypo = lower solute concentration',
        'Think of membrane as "fluid" (molecules can move laterally) and "mosaic" (diverse proteins)',
        'For transport problems, first determine if energy is required or available',
        'Draw diagrams showing inside vs outside of cell to visualize concentration gradients',
        'Active transport always involves proteins and ATP'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'AP Biology',
    topicName: 'Cellular Respiration',
    content: {
      title: 'Cellular Respiration',
      intro: 'Cellular respiration is the process by which cells break down glucose to produce ATP, the energy currency of cells. This multistep process occurs in the mitochondria and is essential for life.',
      keyPoints: [
        'Overall equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP',
        'Cellular respiration has three main stages: glycolysis, Krebs cycle, electron transport chain',
        'Glycolysis: occurs in cytoplasm, breaks glucose (6C) into 2 pyruvate (3C)',
        'Glycolysis produces: 2 ATP (net), 2 NADH, 2 pyruvate',
        'Krebs cycle (citric acid cycle): occurs in mitochondrial matrix',
        'Krebs cycle inputs: Acetyl-CoA (2C from pyruvate)',
        'Krebs cycle outputs per glucose: 2 ATP, 6 NADH, 2 FADH₂, 4 CO₂',
        'Electron transport chain (ETC): inner mitochondrial membrane',
        'ETC uses NADH and FADH₂ to create proton gradient',
        'Chemiosmosis: protons flow through ATP synthase to generate ATP',
        'Oxygen is final electron acceptor, forms water',
        'Total ATP yield: ~38 ATP per glucose (theoretical maximum)',
        'Anaerobic respiration (fermentation): occurs without oxygen, produces only 2 ATP',
        'Lactic acid fermentation: pyruvate → lactate (in muscles during intense exercise)',
        'Alcoholic fermentation: pyruvate → ethanol + CO₂ (in yeast)',
        'Fermentation regenerates NAD⁺ so glycolysis can continue'
      ],
      examples: [
        'Diagram: Mitochondrion showing outer membrane, inner membrane (cristae), matrix, and location of each respiration stage',
        'ATP production summary:\nGlycolysis: 2 ATP\nKrebs cycle: 2 ATP\nElectron transport: ~34 ATP\nTotal: ~38 ATP',
        'Energy flow: Glucose → Glycolysis → Pyruvate → Acetyl-CoA → Krebs → NADH/FADH₂ → ETC → ATP',
        'Anaerobic vs aerobic:\nAerobic: 38 ATP from 1 glucose (with O₂)\nAnaerobic: 2 ATP from 1 glucose (no O₂)',
        'Real-world example: Marathon runner\n- First 20 min: aerobic respiration (efficient)\n- After glycogen depleted: fatigue sets in\n- Sprint at end: lactic acid fermentation (quick but inefficient)',
        'Table: Comparison of Respiration Stages\n| Stage | Location | Inputs | Outputs |\n|-------|----------|--------|----------|\n| Glycolysis | Cytoplasm | Glucose | 2 ATP, 2 NADH |\n| Krebs | Matrix | Acetyl-CoA | 2 ATP, 6 NADH, 2 FADH₂ |\n| ETC | Inner membrane | NADH, FADH₂, O₂ | ~34 ATP, H₂O |'
      ],
      commonMistakes: [
        'Thinking glycolysis requires oxygen (it doesn\'t - it\'s anaerobic)',
        'Confusing ATP produced directly vs through ETC',
        'Forgetting that each glucose produces 2 pyruvates, so Krebs happens twice',
        'Thinking fermentation produces ATP (it doesn\'t - it only regenerates NAD⁺)',
        'Not accounting for ATP used to start glycolysis (4 produced - 2 used = 2 net)'
      ],
      tips: [
        'Remember location: glyco(cytoplasm)-lysis, Krebs(matrix), ETC(membrane)',
        'Focus on carbon tracking: 6C glucose → 2(3C pyruvate) → 6CO₂',
        'NADH and FADH₂ are electron carriers - they don\'t directly make ATP',
        'Oxygen is only needed for ETC - that\'s why we breathe!',
        'Fermentation is "backup plan" when oxygen runs out'
      ]
    }
  },

  // ==================== AP CHEMISTRY ====================
  {
    categorySlug: 'high-school',
    subjectName: 'AP Chemistry',
    topicName: 'Chemical Equilibrium',
    content: {
      title: 'Chemical Equilibrium',
      intro: 'Chemical equilibrium occurs when the rates of forward and reverse reactions are equal, resulting in constant concentrations of reactants and products. Understanding equilibrium is crucial for predicting reaction behavior.',
      keyPoints: [
        'Equilibrium: dynamic state where forward and reverse reaction rates are equal',
        'Equilibrium constant (Kc): ratio of product to reactant concentrations at equilibrium',
        'For aA + bB ⇌ cC + dD: Kc = [C]^c[D]^d / [A]^a[B]^b',
        'Pure solids and liquids are omitted from K expression',
        'Kc > 1: products favored at equilibrium',
        'Kc < 1: reactants favored at equilibrium',
        'Kc = 1: similar amounts of reactants and products',
        'Q (reaction quotient): same expression as Kc but using current concentrations',
        'If Q < K: forward reaction proceeds (shift right)',
        'If Q > K: reverse reaction proceeds (shift left)',
        'If Q = K: system is at equilibrium',
        'Le Châtelier\'s Principle: system shifts to counteract imposed changes',
        'Adding reactant: shifts right (toward products)',
        'Increasing pressure: shifts toward side with fewer gas molecules',
        'Increasing temperature: shifts in endothermic direction',
        'Catalysts do not affect equilibrium position - only rate of reaching equilibrium',
        'Kp (pressure equilibrium constant) for gas reactions: Kp = Kc(RT)^Δn'
      ],
      examples: [
        'Write K expression: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\nKc = [SO₃]² / ([SO₂]²[O₂])',
        'Calculate Kc: At equilibrium, [N₂]=0.5 M, [H₂]=0.8 M, [NH₃]=0.3 M\nN₂ + 3H₂ ⇌ 2NH₃\nKc = [NH₃]² / ([N₂][H₂]³) = (0.3)² / [(0.5)(0.8)³] = 0.09 / 0.256 ≈ 0.35',
        'Use Q to predict direction:\nN₂ + 3H₂ ⇌ 2NH₃, Kc = 0.5\nCurrent: [N₂]=1, [H₂]=1, [NH₃]=2\nQ = 2² / (1·1³) = 4\nQ > K → shift left (toward reactants)',
        'Le Châtelier: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat\n- Add N₂: shifts right (make more NH₃)\n- Increase pressure: shifts right (4 moles → 2 moles)\n- Increase temp: shifts left (endothermic direction)',
        'Table: Effects on Equilibrium\n| Change | Effect | Shift Direction |\n|--------|--------|----------------|\n| Add reactant | ↑ forward rate | Right (→) |\n| Remove product | ↓ reverse rate | Right (→) |\n| ↑ pressure | Favor fewer moles | Depends on Δn |\n| ↑ temperature | Favor endothermic | Depends on ΔH |'
      ],
      commonMistakes: [
        'Including solids or liquids in K expression',
        'Thinking catalyst changes K (it doesn\'t - only speeds up reaching equilibrium)',
        'Confusing Q with K (Q is current state, K is at equilibrium)',
        'Not raising concentrations to stoichiometric coefficients in K expression',
        'Forgetting that equilibrium is dynamic (reactions still occurring)'
      ],
      tips: [
        'Always write balanced equation before writing K expression',
        'Use ICE table (Initial, Change, Equilibrium) for calculations',
        'Remember: adding reactant or removing product shifts right',
        'For pressure: count total moles of gas on each side',
        'Temperature is only factor that changes K value itself'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'AP Chemistry',
    topicName: 'Acids, Bases, and pH',
    content: {
      title: 'Acids, Bases, and pH',
      intro: 'Acids and bases are fundamental to chemistry and biology. Understanding pH, acid-base equilibria, and buffer systems is essential for predicting chemical behavior in aqueous solutions.',
      keyPoints: [
        'Arrhenius definition: acids produce H⁺, bases produce OH⁻ in water',
        'Brønsted-Lowry definition: acids donate H⁺ (protons), bases accept H⁺',
        'Strong acids completely dissociate: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄',
        'Weak acids partially dissociate: CH₃COOH, H₂CO₃, H₃PO₄',
        'pH = -log[H⁺], measures acidity on scale from 0-14',
        'pH < 7: acidic; pH = 7: neutral; pH > 7: basic',
        'pOH = -log[OH⁻], pH + pOH = 14 at 25°C',
        'Water autoionization: H₂O ⇌ H⁺ + OH⁻, Kw = [H⁺][OH⁻] = 1.0×10⁻¹⁴',
        'Acid dissociation constant: Ka = [H⁺][A⁻]/[HA]',
        'Larger Ka means stronger acid',
        'pKa = -log(Ka), smaller pKa means stronger acid',
        'Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA])',
        'Conjugate acid-base pairs: acid loses H⁺ to form conjugate base',
        'Buffer solution: resists pH change, contains weak acid and conjugate base',
        'Titration: gradual addition of acid/base to determine concentration',
        'Equivalence point: moles acid = moles base, pH depends on salt formed'
      ],
      examples: [
        'Calculate pH: [H⁺] = 1.0×10⁻³ M\npH = -log(1.0×10⁻³) = 3\nSolution is acidic',
        'Find [OH⁻] given pH = 11:\npOH = 14 - 11 = 3\n[OH⁻] = 10⁻³ = 0.001 M',
        'Weak acid equilibrium: CH₃COOH ⇌ H⁺ + CH₃COO⁻\nKa = 1.8×10⁻⁵\nIf [CH₃COOH] = 0.1 M, find pH using Ka expression\nAssume x = [H⁺], then Ka = x²/(0.1-x) ≈ x²/0.1\nx = √(Ka·0.1) = √(1.8×10⁻⁶) ≈ 1.3×10⁻³\npH = -log(1.3×10⁻³) ≈ 2.89',
        'Buffer calculation using Henderson-Hasselbalch:\nBuffer: 0.1 M CH₃COOH, 0.1 M CH₃COO⁻, pKa = 4.74\npH = 4.74 + log(0.1/0.1) = 4.74 + 0 = 4.74',
        'Titration curve description: Weak acid titrated with strong base shows gradual pH increase, buffer region before equivalence point, steep rise at equivalence point (pH > 7)',
        'Table: Strong vs Weak Acids\n| Property | Strong Acid | Weak Acid |\n|----------|-------------|----------|\n| Dissociation | Complete | Partial |\n| Ka | Large (>1) | Small (<1) |\n| pH (0.1M) | ~1 | 2-6 |\n| Examples | HCl, HNO₃ | CH₃COOH |'
      ],
      commonMistakes: [
        'Confusing pH and pOH (they sum to 14)',
        'Using strong acid calculations for weak acids (must use Ka)',
        'Thinking pH 6 is twice as acidic as pH 3 (it\'s 1000× less acidic!)',
        'Forgetting that equivalence point pH ≠ 7 for weak acid-strong base titrations',
        'Not recognizing conjugate acid-base pairs'
      ],
      tips: [
        'Memorize the 6 strong acids - everything else is weak',
        'For pH calculations: strong acids/bases use [H⁺] or [OH⁻] directly',
        'For weak acids: use Ka and ICE table or Henderson-Hasselbalch',
        'pH scale is logarithmic: each unit is 10× change in [H⁺]',
        'Buffers work best when pH ≈ pKa (within ±1)'
      ]
    }
  },

  // ==================== AP PHYSICS ====================
  {
    categorySlug: 'high-school',
    subjectName: 'AP Physics',
    topicName: 'Kinematics and Motion',
    content: {
      title: 'Kinematics and Motion',
      intro: 'Kinematics describes the motion of objects without considering the forces that cause the motion. Mastering kinematic equations and graphical analysis is fundamental to understanding physics.',
      keyPoints: [
        'Position (x or s): location of an object at a given time',
        'Displacement (Δx): change in position, vector quantity',
        'Distance: total path length traveled, scalar quantity',
        'Velocity (v): rate of change of position, v = Δx/Δt',
        'Speed: magnitude of velocity, scalar',
        'Acceleration (a): rate of change of velocity, a = Δv/Δt',
        'Average velocity: v_avg = (v₀ + v)/2 = Δx/Δt',
        'Kinematic equations (constant acceleration):\n  v = v₀ + at\n  x = x₀ + v₀t + ½at²\n  v² = v₀² + 2a(x - x₀)\n  x = x₀ + ½(v₀ + v)t',
        'Free fall: acceleration due to gravity g = 9.8 m/s² downward',
        'Projectile motion: horizontal and vertical components are independent',
        'Horizontal motion: constant velocity (no acceleration)',
        'Vertical motion: constant acceleration (g)',
        'Position-time graph: slope gives velocity',
        'Velocity-time graph: slope gives acceleration, area gives displacement',
        'Acceleration-time graph: area gives change in velocity'
      ],
      examples: [
        'Constant acceleration: Car accelerates from rest at 2 m/s² for 5 seconds\nv = v₀ + at = 0 + 2(5) = 10 m/s\nx = ½at² = ½(2)(5²) = 25 m',
        'Free fall: Ball dropped from 45 m height, find time to hit ground\nx = x₀ + v₀t + ½at²\n0 = 45 + 0·t - ½(9.8)t²\nt² = 90/9.8\nt = 3.03 seconds',
        'Two-stage motion: Ball thrown up at 20 m/s, find max height\nAt max height, v = 0\nv² = v₀² + 2a(x - x₀)\n0 = (20)² + 2(-9.8)(h)\nh = 400/(19.6) ≈ 20.4 m',
        'Projectile motion: Ball thrown horizontally at 10 m/s from 5 m height\nVertical: y = h - ½gt² → 0 = 5 - 4.9t² → t = 1.01 s\nHorizontal: x = v₀t = 10(1.01) = 10.1 m',
        'Graph description: Position-time graph showing parabola indicates constant acceleration; straight line indicates constant velocity',
        'Table: Kinematic Quantities\n| Quantity | Symbol | Units | Vector? |\n|----------|--------|-------|--------|\n| Position | x | m | Yes |\n| Velocity | v | m/s | Yes |\n| Acceleration | a | m/s² | Yes |\n| Time | t | s | No |'
      ],
      commonMistakes: [
        'Confusing displacement and distance (displacement can be zero even if distance is not)',
        'Using kinematic equations when acceleration is not constant',
        'Forgetting that velocity is zero at maximum height in projectile motion',
        'Mixing up signs: choosing inconsistent positive directions',
        'Not treating horizontal and vertical motion independently in projectile problems'
      ],
      tips: [
        'Always define positive direction first (usually up or right)',
        'List known and unknown variables before choosing equation',
        'For projectile motion: split into x and y components immediately',
        'Check units - if they don\'t match, you made an error',
        'Graph interpretation: steep slope means large velocity/acceleration'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'AP Physics',
    topicName: 'Electricity and Circuits',
    content: {
      title: 'Electricity and Circuits',
      intro: 'Electric circuits involve the flow of charge through conductors. Understanding current, voltage, resistance, and circuit analysis is essential for modern technology and physics applications.',
      keyPoints: [
        'Electric current (I): rate of charge flow, I = Q/t, measured in amperes (A)',
        'Voltage (V): electric potential difference, energy per unit charge, measured in volts (V)',
        'Resistance (R): opposition to current flow, measured in ohms (Ω)',
        'Ohm\'s Law: V = IR (voltage equals current times resistance)',
        'Power: P = IV = I²R = V²/R, measured in watts (W)',
        'Energy: E = Pt = IVt, measured in joules (J) or kilowatt-hours (kWh)',
        'Series circuits: same current through all components, I_total = I₁ = I₂',
        'Series resistance: R_total = R₁ + R₂ + R₃ + ...',
        'Series voltage: V_total = V₁ + V₂ + V₃ + ...',
        'Parallel circuits: same voltage across all components, V_total = V₁ = V₂',
        'Parallel resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...',
        'Parallel current: I_total = I₁ + I₂ + I₃ + ...',
        'Kirchhoff\'s Current Law (KCL): sum of currents into a node equals sum out',
        'Kirchhoff\'s Voltage Law (KVL): sum of voltage changes around a loop is zero',
        'Internal resistance: batteries have internal resistance r, V = ℰ - Ir'
      ],
      examples: [
        'Ohm\'s Law: 12V battery, 3Ω resistor, find current\nI = V/R = 12/3 = 4 A',
        'Power calculation: 120V appliance draws 5A\nP = IV = 120·5 = 600 W = 0.6 kW',
        'Series circuit: 10V battery, R₁ = 2Ω, R₂ = 3Ω\nR_total = 2 + 3 = 5Ω\nI = V/R = 10/5 = 2A\nV₁ = IR₁ = 2·2 = 4V, V₂ = IR₂ = 2·3 = 6V',
        'Parallel circuit: 12V battery, R₁ = 4Ω, R₂ = 6Ω\n1/R_total = 1/4 + 1/6 = 3/12 + 2/12 = 5/12\nR_total = 12/5 = 2.4Ω\nI_total = 12/2.4 = 5A\nI₁ = 12/4 = 3A, I₂ = 12/6 = 2A',
        'Circuit diagram description: Series circuit shows components in single path; parallel circuit shows multiple branches between same two points',
        'Table: Series vs Parallel\n| Property | Series | Parallel |\n|----------|--------|----------|\n| Current | Same everywhere | Splits at junctions |\n| Voltage | Splits across components | Same across branches |\n| R_total | Sum of resistances | 1/R_total = Σ(1/R) |'
      ],
      commonMistakes: [
        'Confusing series and parallel formulas for resistance',
        'Thinking voltage is same in series (it\'s current that\'s same)',
        'Thinking current is same in parallel (it\'s voltage that\'s same)',
        'Forgetting to convert units (mA to A, kΩ to Ω)',
        'Not checking if power dissipated equals power supplied (energy conservation)'
      ],
      tips: [
        'For series: think "current stays constant"',
        'For parallel: think "voltage stays constant"',
        'Draw and label circuit diagrams before calculating',
        'Use Kirchhoff\'s laws for complex circuits with multiple loops',
        'Check answers: total resistance in parallel is always less than smallest resistor'
      ]
    }
  },

  // ==================== COMPUTER SCIENCE ====================
  {
    categorySlug: 'high-school',
    subjectName: 'AP Computer Science',
    topicName: 'Object-Oriented Programming Concepts',
    content: {
      title: 'Object-Oriented Programming Concepts',
      intro: 'Object-oriented programming (OOP) organizes code around objects that contain both data and methods. Understanding classes, inheritance, and polymorphism is fundamental to modern software development.',
      keyPoints: [
        'Class: blueprint or template for creating objects',
        'Object: instance of a class with specific values',
        'Attributes (fields): variables that store object data',
        'Methods: functions defined within a class that define behavior',
        'Constructor: special method called when creating new object, initializes attributes',
        'Encapsulation: bundling data and methods together, hiding internal details',
        'Access modifiers: public (accessible everywhere), private (accessible only within class)',
        'Inheritance: creating new class (subclass) based on existing class (superclass)',
        'Subclass inherits attributes and methods from superclass',
        'Method overriding: subclass provides specific implementation of superclass method',
        'Polymorphism: objects of different classes can be treated as objects of common superclass',
        'Abstract class: cannot be instantiated, serves as base for subclasses',
        'Interface: contract specifying methods a class must implement',
        'this keyword: refers to current object',
        'super keyword: refers to superclass',
        'Composition: "has-a" relationship (Car has-a Engine)',
        'Inheritance: "is-a" relationship (Dog is-a Animal)'
      ],
      examples: [
        'Define a class:\nclass Dog {\n  private String name;\n  private int age;\n  \n  public Dog(String n, int a) {\n    name = n;\n    age = a;\n  }\n  \n  public void bark() {\n    System.out.println(name + " says woof!");\n  }\n}',
        'Create object:\nDog myDog = new Dog("Buddy", 3);\nmyDog.bark(); // Output: Buddy says woof!',
        'Inheritance example:\nclass Animal {\n  protected String name;\n  public void eat() {\n    System.out.println("Eating...");\n  }\n}\n\nclass Cat extends Animal {\n  public void meow() {\n    System.out.println(name + " meows");\n  }\n}',
        'Method overriding:\nclass Shape {\n  public double area() { return 0; }\n}\n\nclass Circle extends Shape {\n  private double radius;\n  \n  @Override\n  public double area() {\n    return Math.PI * radius * radius;\n  }\n}',
        'Polymorphism:\nShape s1 = new Circle();\nShape s2 = new Rectangle();\n// Both treated as Shape, but call their own area() method',
        'Table: OOP Principles\n| Principle | Description | Example |\n|-----------|-------------|----------|\n| Encapsulation | Hide implementation | Private variables |\n| Inheritance | Code reuse | Dog extends Animal |\n| Polymorphism | Multiple forms | Shape references |\n| Abstraction | Hide complexity | Abstract classes |'
      ],
      commonMistakes: [
        'Forgetting to use "new" keyword when creating objects',
        'Confusing class (blueprint) with object (instance)',
        'Not calling super() constructor in subclass constructor',
        'Making everything public instead of using appropriate access modifiers',
        'Overusing inheritance when composition would be better'
      ],
      tips: [
        'Think of class as cookie cutter, object as actual cookie',
        'Use private for attributes, public for methods (usually)',
        'Favor composition over inheritance when possible',
        'Name classes with nouns (Dog, Car), methods with verbs (run, drive)',
        'Draw UML diagrams to visualize class relationships'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'AP Computer Science',
    topicName: 'Data Structures: Arrays and ArrayLists',
    content: {
      title: 'Data Structures: Arrays and ArrayLists',
      intro: 'Arrays and ArrayLists are fundamental data structures for storing collections of elements. Understanding their characteristics, operations, and appropriate use cases is essential for efficient programming.',
      keyPoints: [
        'Array: fixed-size collection of elements of same type',
        'Array declaration: int[] numbers = new int[5];',
        'Array initialization: int[] numbers = {1, 2, 3, 4, 5};',
        'Array indexing starts at 0: first element is array[0]',
        'Array length: array.length (property, not method)',
        'Arrays are fixed size - cannot grow or shrink after creation',
        'ArrayList: resizable array from Java Collections Framework',
        'ArrayList declaration: ArrayList<Integer> list = new ArrayList<>();',
        'ArrayList methods: add(), get(), set(), remove(), size()',
        'ArrayList automatically resizes when elements added',
        'ArrayLists can only store objects (use Integer, not int)',
        'Accessing elements: array[i] vs list.get(i)',
        'Traversing: use for loop, enhanced for loop, or while loop',
        'Two-dimensional arrays: int[][] matrix = new int[3][4];',
        'ArrayList of ArrayLists: ArrayList<ArrayList<Integer>> matrix',
        'Common algorithms: linear search, binary search, sorting'
      ],
      examples: [
        'Array basics:\nint[] scores = {95, 87, 92, 88, 90};\nSystem.out.println(scores[0]); // 95\nSystem.out.println(scores.length); // 5\nscores[2] = 100; // modify element',
        'ArrayList basics:\nArrayList<String> names = new ArrayList<>();\nnames.add("Alice");\nnames.add("Bob");\nSystem.out.println(names.get(0)); // Alice\nnames.set(1, "Charlie"); // replace Bob\nnames.remove(0); // remove Alice\nSystem.out.println(names.size()); // 1',
        'Traversing array:\nint[] numbers = {10, 20, 30, 40};\n// Method 1: regular for loop\nfor (int i = 0; i < numbers.length; i++) {\n  System.out.println(numbers[i]);\n}\n// Method 2: enhanced for loop\nfor (int num : numbers) {\n  System.out.println(num);\n}',
        'Linear search:\npublic static int search(int[] arr, int target) {\n  for (int i = 0; i < arr.length; i++) {\n    if (arr[i] == target) return i;\n  }\n  return -1; // not found\n}',
        '2D array:\nint[][] grid = {\n  {1, 2, 3},\n  {4, 5, 6},\n  {7, 8, 9}\n};\nSystem.out.println(grid[1][2]); // 6 (row 1, col 2)',
        'Table: Array vs ArrayList\n| Feature | Array | ArrayList |\n|---------|-------|----------|\n| Size | Fixed | Dynamic |\n| Type | Primitives OK | Objects only |\n| Syntax | arr[i] | list.get(i) |\n| Performance | Faster | Slightly slower |'
      ],
      commonMistakes: [
        'ArrayIndexOutOfBoundsException: accessing invalid index',
        'Forgetting that indexing starts at 0, not 1',
        'Using = to compare arrays (use Arrays.equals() instead)',
        'Trying to use primitives with ArrayList (use wrapper classes)',
        'Confusing array.length (property) with list.size() (method)'
      ],
      tips: [
        'Use arrays when size is known and won\'t change',
        'Use ArrayList when size is unknown or needs to change',
        'Be careful with off-by-one errors in loops',
        'Remember: last valid index is length - 1',
        'For searching sorted arrays, use binary search (O(log n))'
      ]
    }
  },

  // ==================== HISTORY ====================
  {
    categorySlug: 'high-school',
    subjectName: 'US History',
    topicName: 'The American Revolution',
    content: {
      title: 'The American Revolution',
      intro: 'The American Revolution (1775-1783) was a colonial revolt against British rule that resulted in the independence of the thirteen American colonies and the formation of the United States of America.',
      keyPoints: [
        'Causes: taxation without representation, British mercantilist policies, Enlightenment ideas',
        'Sugar Act (1764) and Stamp Act (1765): first major colonial protests',
        'Boston Massacre (1770): British soldiers killed five colonists, fueled anti-British sentiment',
        'Boston Tea Party (1773): colonists dumped British tea into harbor to protest Tea Act',
        'Intolerable Acts (1774): British punishment for Boston Tea Party',
        'First Continental Congress (1774): colonial delegates coordinated resistance',
        'Lexington and Concord (April 1775): first military engagements, "shot heard round the world"',
        'Second Continental Congress (1775): managed war effort, created Continental Army',
        'George Washington appointed commander of Continental Army',
        'Declaration of Independence (July 4, 1776): formally declared separation from Britain',
        'Key battles: Bunker Hill, Saratoga (turning point), Yorktown (final victory)',
        'Foreign assistance: France (1778 alliance), Spain, Netherlands provided crucial support',
        'Treaty of Paris (1783): officially ended war, recognized US independence',
        'Results: independence, republican government, inspired other revolutions',
        'Challenges: economic instability, weak central government under Articles of Confederation'
      ],
      examples: [
        'Taxation without representation: Colonists had no seats in British Parliament but were taxed\n"No taxation without representation" became rallying cry',
        'Declaration of Independence key ideas:\n- All men are created equal\n- Unalienable rights: life, liberty, pursuit of happiness\n- Government derives power from consent of governed\n- Right to alter or abolish unjust government',
        'Battle of Saratoga (1777): American victory convinced France to ally with US\nFrench support (troops, navy, supplies) was crucial to ultimate victory',
        'Valley Forge (winter 1777-78): Continental Army endured harsh conditions\nTrained by Baron von Steuben, emerged as more professional force',
        'Yorktown (1781): Cornwallis surrounded by Washington and French fleet\nBritish surrender effectively ended the war',
        'Timeline:\n1765 - Stamp Act\n1770 - Boston Massacre\n1773 - Boston Tea Party\n1775 - Lexington & Concord\n1776 - Declaration of Independence\n1777 - Saratoga\n1781 - Yorktown\n1783 - Treaty of Paris'
      ],
      commonMistakes: [
        'Thinking revolution was universally supported (many loyalists remained)',
        'Believing colonists wanted independence from the start (many sought reconciliation first)',
        'Overlooking role of France and other allies (US couldn\'t win alone)',
        'Assuming Declaration of Independence ended the war (fighting continued until 1783)',
        'Forgetting about ongoing Native American conflicts during and after revolution'
      ],
      tips: [
        'Remember cause-and-effect: British policies → colonial resistance → war',
        'Focus on turning points: Saratoga, French alliance, Yorktown',
        'Understand Enlightenment influence on revolutionary ideals',
        'Connect to later US government structure (Constitution addressed weaknesses)',
        'Consider multiple perspectives: patriots, loyalists, enslaved people, Native Americans'
      ]
    }
  },
  {
    categorySlug: 'high-school',
    subjectName: 'World History',
    topicName: 'The Industrial Revolution',
    content: {
      title: 'The Industrial Revolution',
      intro: 'The Industrial Revolution (c. 1760-1840) transformed economies from agrarian and handicraft-based to machine-based manufacturing. Beginning in Britain, it spread globally and fundamentally changed society, technology, and daily life.',
      keyPoints: [
        'Started in Great Britain in the late 18th century',
        'Key factors: agricultural revolution, capital accumulation, natural resources (coal, iron)',
        'Technological innovations: spinning jenny, water frame, power loom, steam engine',
        'James Watt improved steam engine (1769), powered factories and transportation',
        'Textile industry: first to mechanize, dramatic productivity increases',
        'Transportation revolution: railroads, steamships enabled faster movement of goods',
        'Factory system replaced cottage industry (home-based manufacturing)',
        'Urbanization: people moved from rural areas to cities for factory jobs',
        'Working conditions: long hours, low wages, dangerous conditions, child labor',
        'Social classes: rise of industrial middle class (bourgeoisie), working class (proletariat)',
        'Environmental impact: pollution, deforestation, resource depletion',
        'Spread to Europe and United States by mid-19th century',
        'Second Industrial Revolution (late 1800s): steel, electricity, chemicals, petroleum',
        'Long-term effects: economic growth, urbanization, social reforms, labor movements',
        'Inspired new ideologies: capitalism, socialism, communism'
      ],
      examples: [
        'Textile mechanization:\n1764 - Spinning jenny (James Hargreaves)\n1769 - Water frame (Richard Arkwright)\n1779 - Spinning mule (Samuel Crompton)\n1785 - Power loom (Edmund Cartwright)\nResult: Cotton production increased 50-fold by 1850',
        'Steam engine impact:\n- Factories no longer needed water power location\n- Railroads revolutionized transportation\n- Steamships enabled faster ocean travel\n- Manufacturing productivity soared',
        'Railroad expansion:\n1825 - Stockton-Darlington Railway (first public railroad)\n1830 - Liverpool-Manchester Railway\nBy 1850 - 6,000 miles of track in Britain\nBy 1900 - Global railroad network connected continents',
        'Working conditions in factories:\n- 12-16 hour workdays\n- Children as young as 5-6 worked in factories\n- No safety regulations\n- Low wages, no benefits\nLed to labor movements and reform legislation',
        'Urbanization example - Manchester, England:\n1773 population: 27,000\n1851 population: 303,000\nRapid growth caused overcrowding, sanitation issues, disease',
        'Table: Pre-Industrial vs Industrial Production\n| Feature | Before | After |\n|---------|--------|-------|\n| Location | Home/small workshop | Factory |\n| Power | Human/animal | Steam/machines |\n| Output | Small scale | Mass production |\n| Workers | Skilled artisans | Factory workers |'
      ],
      commonMistakes: [
        'Thinking Industrial Revolution was sudden (it was gradual over decades)',
        'Assuming only positive effects (many negative social and environmental impacts)',
        'Believing it started everywhere simultaneously (began in Britain, spread slowly)',
        'Overlooking connection to colonialism (raw materials from colonies)',
        'Forgetting about resistance (Luddites destroyed machines, workers organized)'
      ],
      tips: [
        'Focus on both technological and social changes',
        'Remember cause-and-effect chains: invention → factory system → urbanization → social problems',
        'Compare pre-industrial and industrial production methods',
        'Consider winners and losers: factory owners prospered, workers suffered initially',
        'Connect to modern issues: labor rights, environmental concerns, technological change'
      ]
    }
  },

  // ==================== PHYSICS ====================
  {
    categorySlug: 'science',
    subjectName: 'AP Physics',
    topicName: 'Newton\'s Laws of Motion',
    content: {
      title: 'Newton\'s Laws of Motion',
      intro: 'Newton\'s three laws of motion form the foundation of classical mechanics, explaining how forces affect the motion of objects. These principles are essential for understanding everything from everyday phenomena to complex engineering systems.',
      keyPoints: [
        'Newton\'s First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force',
        'Inertia is the tendency of objects to resist changes in motion - more massive objects have greater inertia',
        'Newton\'s Second Law: F = ma (Force equals mass times acceleration) - this is the fundamental equation of dynamics',
        'The net force is the vector sum of all forces acting on an object',
        'Acceleration is directly proportional to net force and inversely proportional to mass',
        'Newton\'s Third Law: For every action, there is an equal and opposite reaction - forces always occur in pairs',
        'Action-reaction pairs act on different objects, not the same object',
        'Weight is the gravitational force: W = mg, where g ≈ 9.8 m/s² on Earth',
        'Free-body diagrams show all forces acting on a single object - essential for problem solving',
        'Normal force is perpendicular to contact surfaces and adjusts to prevent penetration',
        'Friction opposes motion: static friction (prevents sliding), kinetic friction (opposes sliding)',
        'Net force of zero means constant velocity (which includes being at rest)',
        'Units: Force in Newtons (N), mass in kilograms (kg), acceleration in m/s²',
        'Common forces: gravity, normal force, friction, tension, applied force',
        'Problem-solving strategy: Draw free-body diagram → Sum forces → Apply F = ma → Solve'
      ],
      examples: [
        'First Law Example: A hockey puck sliding on ice continues moving because friction is minimal. It would continue forever in space (no forces).',
        'Second Law Calculation:\nA 10 kg box is pushed with 50 N force.\nFind acceleration:\nF = ma\n50 = 10a\na = 5 m/s²',
        'Third Law Example: When you jump, you push down on the ground (action). The ground pushes up on you with equal force (reaction), propelling you upward.',
        'Weight Calculation:\nFind weight of 60 kg person:\nW = mg\nW = 60 × 9.8\nW = 588 N',
        'Combined Forces:\nTwo people push a car: one applies 200 N east, another 150 N east.\nNet force = 200 + 150 = 350 N east\nIf car mass is 1000 kg:\na = F/m = 350/1000 = 0.35 m/s²',
        'Friction Problem:\nBox on floor: mass = 20 kg, coefficient of friction = 0.3\nFrictional force = μN = μmg\nf = 0.3 × 20 × 9.8 = 58.8 N\nNeed > 58.8 N to move the box'
      ],
      commonMistakes: [
        'Confusing mass (kg) and weight (N) - mass is amount of matter, weight is gravitational force',
        'Thinking action-reaction pairs cancel out - they act on different objects so don\'t cancel',
        'Forgetting to convert units (grams to kg, etc.) before calculating',
        'Including forces not actually acting on the object in free-body diagrams',
        'Assuming all motion requires a force - constant velocity needs zero net force',
        'Not recognizing that friction can be static (preventing motion) or kinetic (during motion)'
      ],
      tips: [
        'Always draw a free-body diagram first - it\'s the key to solving force problems',
        'Choose a coordinate system and be consistent with positive/negative directions',
        'Remember: net force causes acceleration, not velocity',
        'For Third Law, identify the two objects involved in the action-reaction pair',
        'Check if answer makes physical sense - negative acceleration means slowing down',
        'Practice identifying all forces: look for contact (normal, friction, tension) and non-contact (gravity)'
      ]
    }
  },

  {
    categorySlug: 'science',
    subjectName: 'AP Physics',
    topicName: 'Work, Energy, and Power',
    content: {
      title: 'Work, Energy, and Power',
      intro: 'Energy is one of the most fundamental concepts in physics, representing the ability to do work. Understanding the relationship between work, energy, and power is crucial for analyzing mechanical systems and solving real-world engineering problems.',
      keyPoints: [
        'Work is force applied over a distance: W = Fd cos(θ), where θ is angle between force and displacement',
        'Work is only done when force causes displacement in the direction of the force',
        'Kinetic Energy (KE) is energy of motion: KE = ½mv², depends on mass and velocity',
        'Potential Energy (PE) is stored energy: Gravitational PE = mgh, where h is height above reference point',
        'Elastic PE in springs: PE = ½kx², where k is spring constant and x is compression/stretch',
        'Work-Energy Theorem: Net work done equals change in kinetic energy: W_net = ΔKE',
        'Conservation of Energy: Total energy in isolated system remains constant (energy transforms but isn\'t created/destroyed)',
        'Mechanical Energy = KE + PE (conserved when only conservative forces act)',
        'Power is the rate of doing work: P = W/t or P = Fv (force times velocity)',
        'Conservative forces (gravity, springs) allow energy recovery - non-conservative forces (friction) dissipate energy as heat',
        'Energy is a scalar (no direction), unlike force which is a vector',
        'Units: Energy and work in Joules (J), Power in Watts (W), 1 W = 1 J/s',
        'Efficiency = (Useful output energy / Input energy) × 100%',
        'When object speeds up, work is positive; when it slows down, work is negative',
        'At maximum height, all KE converts to PE (velocity = 0)'
      ],
      examples: [
        'Work Calculation:\nPush box 5 m with 30 N force at 0° angle:\nW = Fd cos(θ) = 30 × 5 × cos(0°) = 30 × 5 × 1 = 150 J',
        'Kinetic Energy:\nCar with mass 1200 kg traveling at 20 m/s:\nKE = ½mv² = ½ × 1200 × 20² = ½ × 1200 × 400 = 240,000 J',
        'Potential Energy:\nLift 5 kg object to height of 10 m:\nPE = mgh = 5 × 9.8 × 10 = 490 J',
        'Conservation of Energy:\nBall dropped from 20 m height:\nInitial: PE = mgh, KE = 0\nJust before hitting ground: PE = 0, KE = mgh\nVelocity when hitting: ½mv² = mgh → v = √(2gh) = √(2 × 9.8 × 20) = 19.8 m/s',
        'Power Calculation:\nEngine does 5000 J of work in 10 seconds:\nP = W/t = 5000/10 = 500 W\nAlternatively: If force is 250 N and velocity is 2 m/s:\nP = Fv = 250 × 2 = 500 W',
        'Spring Energy:\nCompress spring (k = 200 N/m) by 0.3 m:\nPE = ½kx² = ½ × 200 × 0.3² = ½ × 200 × 0.09 = 9 J'
      ],
      commonMistakes: [
        'Forgetting cos(θ) in work formula - if force perpendicular to motion, work = 0',
        'Using wrong reference point for potential energy - choose consistently',
        'Thinking energy is lost - it\'s transformed (often to heat) but conserved overall',
        'Confusing power with energy - power is rate, energy is total',
        'Not squaring velocity in KE formula - KE = ½mv², not ½mv',
        'Assuming mechanical energy always conserved - only true without friction/air resistance'
      ],
      tips: [
        'Energy problems: List initial and final energy forms, apply conservation',
        'Remember energy is conserved, but mechanical energy may not be (friction converts to heat)',
        'For projectiles: at max height, KE is minimum and PE is maximum',
        'Power tells you how fast work is done, not total work done',
        'Check units: 1 kWh = 3.6 million Joules (common in electricity bills)',
        'Efficiency is always less than 100% in real systems due to friction and heat loss'
      ]
    }
  },

  // ==================== CHEMISTRY ====================
  {
    categorySlug: 'science',
    subjectName: 'AP Chemistry',
    topicName: 'Atomic Structure and Electron Configuration',
    content: {
      title: 'Atomic Structure and Electron Configuration',
      intro: 'Understanding atomic structure is fundamental to chemistry. The arrangement of electrons in atoms determines chemical properties, bonding behavior, and the organization of the periodic table.',
      keyPoints: [
        'Atoms consist of protons (positive), neutrons (neutral) in nucleus, and electrons (negative) in orbitals',
        'Atomic number (Z) = number of protons = number of electrons in neutral atom',
        'Mass number (A) = protons + neutrons; isotopes have same Z but different A',
        'Electrons exist in energy levels (shells) designated n = 1, 2, 3, 4... with increasing energy',
        'Each energy level contains sublevels: s (max 2e⁻), p (max 6e⁻), d (max 10e⁻), f (max 14e⁻)',
        'Aufbau Principle: Electrons fill lowest energy orbitals first (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...)',
        'Pauli Exclusion Principle: Each orbital holds maximum 2 electrons with opposite spins',
        'Hund\'s Rule: Electrons fill degenerate orbitals singly before pairing up',
        'Valence electrons are outermost electrons and determine chemical reactivity',
        'Electron configuration shows distribution: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰...',
        'Noble gas shorthand uses [Ne], [Ar], [Kr] etc. to represent core electrons',
        'Orbital diagrams use boxes and arrows to show electron spin: ↑↓ = paired, ↑ = unpaired',
        'Quantum numbers: n (shell), l (subshell), ml (orbital), ms (spin)',
        'Ions: Cations lose electrons, anions gain electrons to achieve stable configuration',
        'Transition metals lose 4s electrons before 3d when forming cations'
      ],
      examples: [
        'Carbon (Z=6) electron configuration:\nFull: 1s² 2s² 2p²\nOrbital diagram: 1s: ↑↓  2s: ↑↓  2p: ↑ ↑ _\nValence: 4 electrons (2s² 2p²)',
        'Chlorine (Z=17):\nFull: 1s² 2s² 2p⁶ 3s² 3p⁵\nNoble gas: [Ne] 3s² 3p⁵\nValence: 7 electrons\nTo become Cl⁻: gains 1 electron → [Ar] configuration',
        'Iron (Z=26):\nFull: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶\nNoble gas: [Ar] 4s² 3d⁶\nFe²⁺ (loses 4s electrons): [Ar] 3d⁶\nFe³⁺: [Ar] 3d⁵',
        'Oxygen (Z=8) orbital filling:\n1s: ↑↓\n2s: ↑↓\n2p: ↑↓ ↑ ↑ (Hund\'s rule: fill singly first)\nConfiguration: 1s² 2s² 2p⁴',
        'Sodium (Z=11):\n1s² 2s² 2p⁶ 3s¹\nValence: 1 electron\nNa⁺ loses 1 electron → 1s² 2s² 2p⁶ = [Ne]',
        'Sulfur (Z=16):\n[Ne] 3s² 3p⁴\n3p orbitals: ↑↓ ↑ ↑ (two paired, two unpaired)\nS²⁻ gains 2 electrons → [Ar]'
      ],
      commonMistakes: [
        'Forgetting that 4s fills before 3d, but 4s empties before 3d when forming cations',
        'Writing electron configuration for ions without adding/removing correct electrons',
        'Not following Hund\'s rule - putting electrons in pairs before filling all orbitals singly',
        'Confusing atomic number with mass number',
        'Assuming valence electrons are always in highest n - transition metals have (n-1)d electrons too',
        'Forgetting exceptions: Cr is [Ar] 4s¹ 3d⁵, Cu is [Ar] 4s¹ 3d¹⁰ (half-filled and filled d are more stable)'
      ],
      tips: [
        'Memorize order: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p...',
        'Use diagonal rule or aufbau diagram to remember filling order',
        'For ions: find neutral atom config first, then add/remove electrons',
        'Valence electrons determine reactivity: Group 1 has 1, Group 17 has 7, Group 18 has 8',
        'Noble gas configurations are stable (full outer shell)',
        'Period number = highest energy level (n); Group number (for main groups) = valence electrons'
      ]
    }
  },

  {
    categorySlug: 'science',
    subjectName: 'AP Chemistry',
    topicName: 'Chemical Bonding and Molecular Geometry',
    content: {
      title: 'Chemical Bonding and Molecular Geometry',
      intro: 'Chemical bonds form when atoms share or transfer electrons to achieve stable electron configurations. The type of bonding and molecular shape determine the physical and chemical properties of substances.',
      keyPoints: [
        'Ionic bonds form between metals and nonmetals through electron transfer, creating oppositely charged ions',
        'Covalent bonds form between nonmetals through electron sharing',
        'Metallic bonding occurs in metals: delocalized electrons create "sea of electrons"',
        'Electronegativity difference determines bond type: >1.7 = ionic, 0.4-1.7 = polar covalent, <0.4 = nonpolar covalent',
        'Lewis structures show valence electrons as dots and bonds as lines',
        'Octet rule: Atoms tend to gain, lose, or share electrons to have 8 valence electrons (except H wants 2)',
        'VSEPR Theory: Electron pairs repel, determining molecular geometry',
        'Electron geometry considers all electron groups (bonds + lone pairs); molecular geometry considers only atoms',
        'Common geometries: Linear (2 groups), Trigonal planar (3), Tetrahedral (4), Trigonal bipyramidal (5), Octahedral (6)',
        'Lone pairs repel more than bonding pairs, distorting bond angles',
        'Polar molecules have asymmetric charge distribution (dipole moment), nonpolar are symmetric',
        'Resonance structures show electron delocalization - actual structure is hybrid',
        'Formal charge = V - N - B/2 (valence - nonbonding - half of bonding electrons)',
        'Multiple bonds: double bond = 4 electrons, triple bond = 6 electrons',
        'Expanded octets occur in period 3+ elements (can use d orbitals): SF₆ has 12 electrons'
      ],
      examples: [
        'Ionic Bond - NaCl:\nNa (1 valence) → Na⁺ (loses 1e⁻)\nCl (7 valence) → Cl⁻ (gains 1e⁻)\nElectrostatic attraction forms crystal lattice',
        'Lewis Structure - H₂O:\nO has 6 valence, each H has 1\nTotal: 6 + 1 + 1 = 8 electrons\nO-H bonds use 4e⁻, 4e⁻ remain as 2 lone pairs on O\nStructure: H-O-H with 2 lone pairs on O',
        'VSEPR - H₂O:\nElectron groups: 2 bonds + 2 lone pairs = 4 total\nElectron geometry: Tetrahedral\nMolecular geometry: Bent (only considering atoms)\nBond angle: ~104.5° (less than 109.5° due to lone pair repulsion)',
        'Polar vs Nonpolar - CO₂ vs H₂O:\nCO₂: O=C=O (linear, symmetrical) → nonpolar\nH₂O: bent shape → polar (dipoles don\'t cancel)',
        'Resonance - CO₃²⁻:\nThree equivalent structures with double bond in different positions\nActual structure: all C-O bonds identical, 1.33 bond order\n[Show three structures with double bond rotating]',
        'Formal Charge - HCN:\nH-C≡N:\nH: 1-0-2/2 = 0\nC: 4-0-8/2 = 0\nN: 5-2-6/2 = 0\nBest structure (all zeros)'
      ],
      commonMistakes: [
        'Drawing incorrect Lewis structures - count total valence electrons first',
        'Forgetting lone pairs when determining molecular geometry',
        'Thinking polar bonds always make polar molecules - shape matters (CO₂ is nonpolar despite polar C=O bonds)',
        'Not recognizing resonance - drawing only one structure when multiple exist',
        'Assuming all atoms follow octet rule - exceptions include H (2), Be (4), B (6), and expanded octets',
        'Confusing electron geometry with molecular geometry'
      ],
      tips: [
        'Lewis structures: 1) Count valence e⁻, 2) Draw skeleton, 3) Add bonds, 4) Complete octets, 5) Check formal charges',
        'VSEPR: Count electron groups → determine electron geometry → consider lone pairs → find molecular shape',
        'Memorize bond angles: Linear (180°), Trigonal planar (120°), Tetrahedral (109.5°)',
        'For polarity: Check individual bond polarity first, then molecular symmetry',
        'Resonance: Use double-headed arrow (↔) between structures, not equilibrium arrows',
        'Formal charge closest to zero is usually most stable structure'
      ]
    }
  },

  // ==================== BIOLOGY ====================
  {
    categorySlug: 'science',
    subjectName: 'AP Biology',
    topicName: 'Cell Cycle and Mitosis',
    content: {
      title: 'Cell Cycle and Mitosis',
      intro: 'The cell cycle is the sequence of events that cells go through as they grow and divide. Understanding mitosis is essential for comprehending growth, development, tissue repair, and the prevention of cancer.',
      keyPoints: [
        'Cell cycle consists of Interphase (G₁, S, G₂) and M phase (mitosis + cytokinesis)',
        'Interphase is the growth phase: G₁ (growth), S (DNA synthesis/replication), G₂ (preparation for mitosis)',
        'Cells spend most time in interphase (90% of cycle), not actively dividing',
        'Mitosis produces two genetically identical diploid daughter cells from one parent cell',
        'Mitosis phases (PMAT): Prophase, Metaphase, Anaphase, Telophase',
        'Prophase: Chromatin condenses to chromosomes, spindle apparatus forms, nuclear envelope breaks down',
        'Metaphase: Chromosomes align at cell equator (metaphase plate), spindle attaches to centromeres',
        'Anaphase: Sister chromatids separate and move to opposite poles, cell elongates',
        'Telophase: Nuclear envelopes reform, chromosomes decondense, spindle disappears',
        'Cytokinesis divides cytoplasm: cleavage furrow in animals, cell plate in plants',
        'Checkpoints regulate cell cycle: G₁ checkpoint (size, nutrients), G₂ checkpoint (DNA replicated), M checkpoint (spindle attachment)',
        'Cyclins and CDKs (cyclin-dependent kinases) control progression through checkpoints',
        'Cancer results from uncontrolled cell division due to checkpoint failure',
        'Chromosome = one DNA molecule; after replication = 2 sister chromatids joined at centromere',
        'Humans: 46 chromosomes (23 pairs) in somatic cells, maintained through mitosis'
      ],
      examples: [
        'Interphase DNA Content:\nG₁ phase: cell has 2n DNA (diploid)\nS phase: DNA replicates, content goes from 2n to 4n\nG₂ phase: cell has 4n DNA (still diploid, but sister chromatids)\nAfter mitosis: two cells each with 2n DNA',
        'Mitosis in Human Cell:\nStart: 1 cell with 46 chromosomes (23 pairs)\nAfter S phase: 46 chromosomes, each with 2 sister chromatids\nMetaphase: 46 chromosomes aligned\nAnaphase: 92 chromatids (46 go to each pole)\nResult: 2 cells, each with 46 chromosomes',
        'Checkpoint Example - G₁:\nCell checks: Is environment favorable? Sufficient nutrients? Proper size?\nIf NO → cell enters G₀ (quiescent state)\nIf YES → cell proceeds to S phase\nNeurons stay in G₀ permanently',
        'Cancer Connection:\np53 protein (tumor suppressor) monitors DNA damage at G₁ checkpoint\nIf damaged: p53 stops cycle for repair or triggers apoptosis\nMutated p53: damaged cells continue dividing → cancer\n50% of cancers involve p53 mutations',
        'Timing Example:\nTypical human cell cycle: 24 hours\nInterphase: ~23 hours (G₁: 11h, S: 8h, G₂: 4h)\nMitosis: ~1 hour\nCytokinesis: overlaps with telophase',
        'Plant vs Animal Mitosis:\nAnimals: centrioles present, cleavage furrow\nPlants: no centrioles, cell plate forms\nBoth: identical genetic outcome (2 diploid cells)'
      ],
      commonMistakes: [
        'Confusing mitosis (produces identical cells) with meiosis (produces gametes)',
        'Thinking chromosomes replicate during mitosis - replication happens in S phase of interphase',
        'Not recognizing that sister chromatids are identical copies (not homologous pairs)',
        'Assuming all cells constantly divide - many enter G₀ and don\'t divide',
        'Mixing up chromosome number vs DNA content (after S phase, same # chromosomes but double DNA)',
        'Forgetting that cytokinesis is separate from mitosis (can have mitosis without cytokinesis → multinucleate cell)'
      ],
      tips: [
        'Remember PMAT for mitosis phases: Prophase, Metaphase, Anaphase, Telophase',
        'Metaphase = "M" for Middle (chromosomes in middle)',
        'Anaphase = "A" for Apart (chromatids pull apart)',
        'Interphase is NOT a phase of mitosis, it\'s preparation before mitosis',
        'Draw diagrams showing chromosome appearance in each phase',
        'For checkpoints: G₁ checks environment, G₂ checks DNA replication, M checks spindle attachment'
      ]
    }
  },

  // ==================== CALCULUS ====================
  {
    categorySlug: 'mathematics',
    subjectName: 'AP Calculus AB',
    topicName: 'Limits and Continuity',
    content: {
      title: 'Limits and Continuity',
      intro: 'Limits are the foundation of calculus, allowing us to analyze function behavior near specific points. Understanding limits is essential for defining derivatives and integrals, the two main concepts in calculus.',
      keyPoints: [
        'Limit: lim(x→a) f(x) = L means f(x) approaches L as x approaches a',
        'Limit exists only if left-hand limit equals right-hand limit: lim(x→a⁻) f(x) = lim(x→a⁺) f(x)',
        'Limit may exist even if f(a) is undefined or different from the limit',
        'Direct substitution: Try plugging in x = a first; if defined, that\'s the limit',
        'Indeterminate forms require algebraic manipulation: 0/0, ∞/∞, etc.',
        'Techniques: factoring, rationalizing, common denominator, L\'Hôpital\'s rule (for AB: basic cases)',
        'Continuity at x = a requires: 1) f(a) exists, 2) lim(x→a) f(x) exists, 3) lim(x→a) f(x) = f(a)',
        'Types of discontinuities: Removable (hole), Jump, Infinite (vertical asymptote)',
        'Intermediate Value Theorem: If f continuous on [a,b], then f takes all values between f(a) and f(b)',
        'Horizontal asymptote: lim(x→∞) f(x) = L or lim(x→-∞) f(x) = L',
        'Vertical asymptote at x = a: lim(x→a) f(x) = ±∞',
        'Limit laws: limits of sums, products, quotients follow arithmetic rules (if limits exist)',
        'Special limits: lim(x→0) (sin x)/x = 1, lim(x→∞) (1 + 1/x)ˣ = e',
        'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L',
        'One-sided limits: lim(x→a⁻) approaches from left, lim(x→a⁺) approaches from right'
      ],
      examples: [
        'Direct Substitution:\nlim(x→3) (x² + 2x - 1)\nPlug in x = 3: 3² + 2(3) - 1 = 9 + 6 - 1 = 14\nAnswer: 14',
        'Factoring (0/0 form):\nlim(x→2) (x² - 4)/(x - 2)\nDirect sub gives 0/0 (indeterminate)\nFactor: (x - 2)(x + 2)/(x - 2)\nCancel: x + 2\nSubstitute: 2 + 2 = 4',
        'Rationalizing:\nlim(x→0) (√(x + 1) - 1)/x\nMultiply by conjugate: [(√(x + 1) - 1)/x] · [(√(x + 1) + 1)/(√(x + 1) + 1)]\n= (x + 1 - 1)/[x(√(x + 1) + 1)] = x/[x(√(x + 1) + 1)]\nCancel x: 1/(√(x + 1) + 1)\nSubstitute x = 0: 1/(√1 + 1) = 1/2',
        'Continuity Check - f(x) = (x² - 1)/(x - 1) at x = 1:\n1) f(1) = undefined (division by zero)\n2) lim(x→1) = lim(x→1) (x - 1)(x + 1)/(x - 1) = lim(x→1) (x + 1) = 2\n3) f(1) ≠ lim → NOT continuous (removable discontinuity)',
        'Infinite Limit:\nlim(x→0) 1/x²\nAs x→0⁺: 1/(small positive)² → +∞\nAs x→0⁻: 1/(small negative)² → +∞\nAnswer: +∞ (vertical asymptote at x = 0)',
        'Horizontal Asymptote:\nlim(x→∞) (3x² + 2)/(x² - 1)\nDivide by highest power (x²):\nlim(x→∞) (3 + 2/x²)/(1 - 1/x²) = 3/1 = 3\nHorizontal asymptote: y = 3'
      ],
      commonMistakes: [
        'Saying limit doesn\'t exist just because f(a) is undefined - limit can still exist',
        'Canceling terms before checking if it creates 0/0 indeterminate form',
        'Assuming limit equals function value - only true if function is continuous',
        'Not checking both one-sided limits before concluding limit exists',
        'Confusing "limit is infinity" (limit doesn\'t exist) with "limit doesn\'t exist" (could be different left/right limits)',
        'Forgetting to simplify before substituting - may need factoring or rationalization'
      ],
      tips: [
        'Always try direct substitution first - easiest method when it works',
        'If you get 0/0, factor or rationalize; if ∞/∞, divide by highest power',
        'Graph the function to visualize limit behavior',
        'For piecewise functions, check limits from both sides at boundary points',
        'Continuity mnemonic: "Can draw without lifting pencil"',
        'IVT applications: proving equation has solution in interval'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'AP Calculus AB',
    topicName: 'Derivatives - Definition and Rules',
    content: {
      title: 'Derivatives: Definition and Rules',
      intro: 'The derivative measures the instantaneous rate of change of a function - essentially, how fast something is changing at a specific moment. Derivatives are fundamental to understanding motion, optimization, and rates of change in all scientific fields.',
      keyPoints: [
        'Derivative definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h (instantaneous rate of change)',
        'Geometric meaning: derivative is slope of tangent line at a point',
        'Physical meaning: velocity is derivative of position, acceleration is derivative of velocity',
        'Notation: f\'(x), dy/dx, df/dx, d/dx[f(x)] all mean derivative',
        'Power Rule: d/dx[xⁿ] = nxⁿ⁻¹ (most frequently used rule)',
        'Constant Rule: d/dx[c] = 0 (derivative of constant is zero)',
        'Constant Multiple Rule: d/dx[cf(x)] = c·f\'(x)',
        'Sum/Difference Rule: d/dx[f(x) ± g(x)] = f\'(x) ± g\'(x)',
        'Product Rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
        'Quotient Rule: d/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)]/[g(x)]²',
        'Chain Rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x) (outside derivative times inside derivative)',
        'Exponential: d/dx[eˣ] = eˣ, d/dx[aˣ] = aˣ ln(a)',
        'Logarithmic: d/dx[ln x] = 1/x, d/dx[log_a x] = 1/(x ln a)',
        'Trig derivatives: d/dx[sin x] = cos x, d/dx[cos x] = -sin x, d/dx[tan x] = sec² x',
        'If f\'(x) > 0, function is increasing; if f\'(x) < 0, function is decreasing'
      ],
      examples: [
        'Power Rule:\nd/dx[x⁵] = 5x⁴\nd/dx[x⁻²] = -2x⁻³ = -2/x³\nd/dx[√x] = d/dx[x^(1/2)] = (1/2)x^(-1/2) = 1/(2√x)',
        'Product Rule:\nd/dx[x² sin x]\nf(x) = x², f\'(x) = 2x\ng(x) = sin x, g\'(x) = cos x\nAnswer: 2x sin x + x² cos x',
        'Quotient Rule:\nd/dx[(x² + 1)/(x - 3)]\nf(x) = x² + 1, f\'(x) = 2x\ng(x) = x - 3, g\'(x) = 1\nAnswer: [2x(x - 3) - (x² + 1)(1)]/(x - 3)²\n= (2x² - 6x - x² - 1)/(x - 3)² = (x² - 6x - 1)/(x - 3)²',
        'Chain Rule:\nd/dx[(3x + 5)⁴]\nOutside: u⁴, derivative: 4u³\nInside: u = 3x + 5, derivative: 3\nAnswer: 4(3x + 5)³ · 3 = 12(3x + 5)³',
        'Combined Rules:\nd/dx[e^(x²) sin(3x)]\nProduct rule with chain rule:\nFirst function: e^(x²), derivative: e^(x²) · 2x (chain rule)\nSecond function: sin(3x), derivative: cos(3x) · 3 (chain rule)\nAnswer: 2xe^(x²) sin(3x) + 3e^(x²) cos(3x)',
        'From Definition:\nFind f\'(2) for f(x) = x²:\nf\'(2) = lim(h→0) [(2+h)² - 2²]/h\n= lim(h→0) [4 + 4h + h² - 4]/h\n= lim(h→0) (4h + h²)/h = lim(h→0) (4 + h) = 4'
      ],
      commonMistakes: [
        'Forgetting to multiply by inside derivative in chain rule',
        'Using power rule on base that\'s not x (need chain rule)',
        'Product rule error: d/dx[fg] ≠ f\'g\' (must use f\'g + fg\')',
        'Quotient rule sign error - numerator is "lo d-hi minus hi d-lo"',
        'Not simplifying before differentiating - factor when possible',
        'Confusing d/dx[eˣ] = eˣ with d/dx[xⁿ] = nxⁿ⁻¹'
      ],
      tips: [
        'Product rule mnemonic: "first times derivative of second plus second times derivative of first"',
        'Quotient rule mnemonic: "lo d-hi minus hi d-lo, square the bottom and away we go"',
        'Chain rule: Work outside-in, multiply derivatives',
        'Always simplify algebraically before differentiating when possible',
        'Check answer by seeing if it makes sense (correct sign, reasonable form)',
        'Practice recognizing when to use each rule - chain rule is most commonly forgotten'
      ]
    }
  },

  // ==================== COMPUTER SCIENCE ====================
  {
    categorySlug: 'computer-science',
    subjectName: 'AP Computer Science A',
    topicName: 'Object-Oriented Programming Fundamentals',
    content: {
      title: 'Object-Oriented Programming Fundamentals',
      intro: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects containing data and methods. Understanding OOP is essential for writing organized, reusable, and maintainable code in Java.',
      keyPoints: [
        'Class: Blueprint or template for creating objects (defines attributes and behaviors)',
        'Object: Instance of a class with specific values for attributes',
        'Encapsulation: Bundling data (fields) and methods that operate on data within a class',
        'Information hiding: Using private access modifier to restrict direct access to fields',
        'Constructor: Special method called when object is created, initializes object state',
        'Default constructor: No-argument constructor automatically provided if no constructor defined',
        'Instance variables (fields): Data stored in each object, unique to each instance',
        'Instance methods: Behaviors/actions that objects can perform',
        'this keyword: Refers to current object, used to distinguish instance variables from parameters',
        'Accessor methods (getters): Return value of private instance variable (getName())',
        'Mutator methods (setters): Modify value of private instance variable (setName(String n))',
        'Static variables: Shared by all instances of class, belongs to class not objects',
        'Static methods: Called on class itself, not on instances (Math.sqrt())',
        'Method overloading: Multiple methods with same name but different parameters',
        'toString() method: Returns string representation of object, useful for debugging'
      ],
      examples: [
        'Class Definition:\npublic class Student {\n    // Instance variables\n    private String name;\n    private int grade;\n    private double gpa;\n    \n    // Constructor\n    public Student(String n, int g, double p) {\n        name = n;\n        grade = g;\n        gpa = p;\n    }\n    \n    // Accessor method\n    public String getName() {\n        return name;\n    }\n    \n    // Mutator method\n    public void setGPA(double newGPA) {\n        gpa = newGPA;\n    }\n}',
        'Creating Objects:\nStudent alice = new Student("Alice", 11, 3.8);\nStudent bob = new Student("Bob", 10, 3.5);\n\n// Each object has own values\nalice.getName(); // returns "Alice"\nbob.getName();   // returns "Bob"',
        'Using this keyword:\npublic class Circle {\n    private double radius;\n    \n    public Circle(double radius) {\n        this.radius = radius;  // this.radius is instance variable\n        // radius is parameter\n    }\n    \n    public double getArea() {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
        'Static vs Instance:\npublic class BankAccount {\n    private double balance;           // instance variable\n    private static double interestRate = 0.03;  // static variable\n    \n    public void addInterest() {\n        balance += balance * interestRate;  // instance method using static variable\n    }\n    \n    public static void setInterestRate(double rate) {  // static method\n        interestRate = rate;\n    }\n}\n\nBankAccount.setInterestRate(0.04);  // call static method on class',
        'Method Overloading:\npublic class Calculator {\n    public int add(int a, int b) {\n        return a + b;\n    }\n    \n    public double add(double a, double b) {\n        return a + b;\n    }\n    \n    public int add(int a, int b, int c) {\n        return a + b + c;\n    }\n}\n\nCalculator calc = new Calculator();\ncalc.add(5, 3);        // calls int version\ncalc.add(5.5, 3.2);    // calls double version\ncalc.add(1, 2, 3);     // calls three-parameter version',
        'toString() Method:\npublic class Book {\n    private String title;\n    private String author;\n    \n    public String toString() {\n        return title + " by " + author;\n    }\n}\n\nBook book = new Book("1984", "George Orwell");\nSystem.out.println(book);  // automatically calls toString()\n// Output: 1984 by George Orwell'
      ],
      commonMistakes: [
        'Making all instance variables public instead of private (violates encapsulation)',
        'Forgetting to use "this" when parameter name same as instance variable',
        'Trying to access instance variables from static methods',
        'Confusing class and object - class is blueprint, object is instance',
        'Not providing constructor when default values needed',
        'Using == to compare objects instead of .equals() method'
      ],
      tips: [
        'Always make instance variables private and provide public getters/setters',
        'Constructor name must exactly match class name',
        'Use meaningful names: class = noun (Student), method = verb (calculateGrade)',
        'Static = belongs to class, instance = belongs to object',
        'Test classes incrementally - write constructor first, then add methods one at a time',
        'toString() method very useful for debugging - implement for all classes'
      ]
    }
  },

  // ==================== ENGLISH ====================
  {
    categorySlug: 'english',
    subjectName: 'AP English Literature',
    topicName: 'Literary Analysis and Close Reading',
    content: {
      title: 'Literary Analysis and Close Reading',
      intro: 'Close reading is the careful, detailed analysis of a text to understand its meaning, techniques, and significance. This skill is essential for AP English Literature and for deep engagement with any literary work.',
      keyPoints: [
        'Close reading focuses on what the text says, how it says it, and why it matters',
        'Annotation: Mark up text with observations, questions, connections, and reactions',
        'Literary devices: Techniques authors use to create meaning (metaphor, imagery, symbolism, irony, etc.)',
        'Diction: Author\'s word choice - consider connotation, formality, tone',
        'Syntax: Sentence structure - short/long sentences, fragments, parallelism affect meaning',
        'Imagery: Descriptive language appealing to senses creates vivid mental pictures',
        'Figurative language: Metaphor (comparison), simile (comparison with like/as), personification (human qualities to non-human)',
        'Symbolism: Object, character, or event representing abstract idea or concept',
        'Tone: Author\'s attitude toward subject (sarcastic, reverent, critical, nostalgic)',
        'Theme: Central idea or message about life/human nature (not same as topic)',
        'Characterization: How author reveals character traits (STEAL: Speech, Thoughts, Effects on others, Actions, Looks)',
        'Point of view: First person (I), third person limited (one character\'s perspective), omniscient (all-knowing narrator)',
        'Irony types: Verbal (says opposite), situational (opposite of expected), dramatic (audience knows more than character)',
        'Context matters: Consider historical period, author biography, cultural background',
        'Evidence-based interpretation: Support claims with specific textual evidence (quotes)'
      ],
      examples: [
        'Analyzing Diction:\n"The winter evening settles down / With smell of steaks in passageways" - T.S. Eliot\nWord choice: "settles" (gentle, gradual) vs "crashes"\n"smell of steaks" - ordinary, working-class imagery\nEffect: Creates mundane, melancholy atmosphere',
        'Identifying Metaphor:\n"Hope is the thing with feathers / That perches in the soul" - Emily Dickinson\nMetaphor: Hope = bird\nImplications: Hope is light, delicate, persistent (birds sing), elevates spirit (perches)',
        'Analyzing Syntax:\n"It was the best of times, it was the worst of times" - Dickens\nParallel structure emphasizes contradiction\nCommas create rhythm, balance\nEffect: Sets up paradox central to novel',
        'Symbolism Example:\nGreen light in The Great Gatsby:\n- Literal: Light at end of Daisy\'s dock\n- Symbolic: Gatsby\'s dreams, unattainable past, American Dream\n- Deeper meaning: Hope that draws people forward but remains out of reach',
        'Characterization (STEAL):\n"Scrooge! a squeezing, wrenching, grasping, scraping, clutching, covetous old sinner!" - Dickens\nDirect characterization through narrator\nDiction: Repetitive verbs (all about taking/holding)\nEffect: Emphasizes greed, creates harsh tone',
        'Analyzing Tone:\n"I wandered lonely as a cloud" - Wordsworth\nDiction: "wandered" (aimless), "lonely" (isolated)\nSimile: Compares speaker to cloud (floating, detached)\nTone: Initially melancholic, becomes joyful\nShift: When daffodils appear, tone transforms'
      ],
      commonMistakes: [
        'Summarizing instead of analyzing - describe what techniques do, not just what happens',
        'Identifying devices without explaining their effect or significance',
        'Making claims without textual evidence to support them',
        'Confusing theme (abstract idea) with topic (subject matter)',
        'Reading too quickly without pausing to think deeply about language',
        'Ignoring context - historical period and author background matter'
      ],
      tips: [
        'Read passage at least twice: first for understanding, second for analysis',
        'Look for patterns: repeated words, images, sentence structures',
        'Ask "So what?" - Why did author make this choice? What\'s the effect?',
        'Consider contrasts and juxtapositions - often reveal meaning',
        'Pay special attention to beginnings and endings - usually significant',
        'Practice with timed writing - AP exam requires quick, focused analysis'
      ]
    }
  },

  // ==================== MORE MATHEMATICS ====================
  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 2',
    topicName: 'Quadratic Functions and Equations',
    content: {
      title: 'Quadratic Functions and Equations',
      intro: 'Quadratic functions are polynomial functions of degree 2, creating parabolic graphs. They appear everywhere in physics, engineering, and real-world optimization problems, making them essential for advanced mathematics.',
      keyPoints: [
        'Standard form: f(x) = ax² + bx + c, where a ≠ 0 determines whether parabola opens up (a > 0) or down (a < 0)',
        'Vertex form: f(x) = a(x - h)² + k, where (h, k) is the vertex (turning point)',
        'Factored form: f(x) = a(x - r₁)(x - r₂), where r₁ and r₂ are x-intercepts (zeros/roots)',
        'Axis of symmetry: Vertical line x = -b/(2a) passes through vertex',
        'Vertex is minimum point when a > 0, maximum point when a < 0',
        'Discriminant: b² - 4ac determines number of real solutions: positive = 2, zero = 1, negative = 0',
        'Quadratic Formula: x = (-b ± √(b² - 4ac))/(2a) solves any quadratic equation',
        'Completing the square: Convert standard form to vertex form by adding/subtracting (b/2)²',
        'Zero Product Property: If ab = 0, then a = 0 or b = 0 (used for solving factored equations)',
        'Parabola always symmetric about axis of symmetry',
        'Y-intercept occurs at x = 0, giving point (0, c) in standard form',
        'Domain of quadratic function: all real numbers; Range: y ≥ k (opens up) or y ≤ k (opens down)',
        'Transformations: h shifts horizontally, k shifts vertically, a affects width and direction',
        'Larger |a| makes parabola narrower, smaller |a| makes it wider',
        'Applications: projectile motion, profit optimization, area maximization'
      ],
      examples: [
        'Converting Standard to Vertex Form:\nf(x) = x² + 6x + 5\nComplete the square:\n= x² + 6x + 9 - 9 + 5\n= (x + 3)² - 4\nVertex: (-3, -4)\nAxis of symmetry: x = -3',
        'Using Quadratic Formula:\nSolve: 2x² - 5x - 3 = 0\na = 2, b = -5, c = -3\nx = (5 ± √(25 - 4(2)(-3)))/(2·2)\nx = (5 ± √(25 + 24))/4\nx = (5 ± √49)/4\nx = (5 ± 7)/4\nx = 3 or x = -1/2',
        'Factoring Method:\nx² - 7x + 12 = 0\nFactor: (x - 3)(x - 4) = 0\nZero Product Property:\nx - 3 = 0 or x - 4 = 0\nx = 3 or x = 4',
        'Finding Vertex from Standard Form:\nf(x) = -2x² + 8x - 3\nx-coordinate: -b/(2a) = -8/(2·-2) = -8/(-4) = 2\ny-coordinate: f(2) = -2(2)² + 8(2) - 3 = -8 + 16 - 3 = 5\nVertex: (2, 5)\nSince a = -2 < 0, parabola opens down, vertex is maximum',
        'Discriminant Analysis:\nDetermine number of solutions for x² - 4x + 4 = 0:\nb² - 4ac = (-4)² - 4(1)(4) = 16 - 16 = 0\nDiscriminant = 0 → one real solution (double root)\nSolving: (x - 2)² = 0 → x = 2',
        'Real-World Application:\nBall thrown upward: h(t) = -16t² + 64t + 5 (height in feet, time in seconds)\nFind maximum height:\nt = -64/(2·-16) = -64/(-32) = 2 seconds\nh(2) = -16(4) + 64(2) + 5 = -64 + 128 + 5 = 69 feet\nMaximum height: 69 feet at t = 2 seconds'
      ],
      commonMistakes: [
        'Sign errors in quadratic formula, especially with negative b value',
        'Forgetting ± symbol in quadratic formula (gives only one solution)',
        'Confusing vertex coordinates - mixing up h and k in vertex form',
        'Not dividing entire formula by 2a in quadratic formula',
        'Assuming parabola always opens up - check sign of a',
        'When completing square, forgetting to add AND subtract (b/2)²'
      ],
      tips: [
        'Always identify a, b, c values before using quadratic formula',
        'Check discriminant first to know how many solutions to expect',
        'Vertex form is best for graphing, factored form best for finding zeros',
        'For word problems: identify what quadratic represents (area, height, profit, etc.)',
        'Verify solutions by substituting back into original equation',
        'Remember: coefficient a affects width AND direction of parabola'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'Algebra 2',
    topicName: 'Exponential and Logarithmic Functions',
    content: {
      title: 'Exponential and Logarithmic Functions',
      intro: 'Exponential and logarithmic functions are inverse functions crucial for modeling growth, decay, and scaling phenomena in science, finance, and technology. Understanding these functions is essential for advanced mathematics and real-world applications.',
      keyPoints: [
        'Exponential function: f(x) = a·bˣ where b > 0, b ≠ 1 (b is base, a is initial value)',
        'If b > 1: exponential growth; if 0 < b < 1: exponential decay',
        'Natural exponential: f(x) = eˣ where e ≈ 2.71828 (Euler\'s number)',
        'Logarithm is inverse of exponential: if bˣ = y, then log_b(y) = x',
        'Common logarithm: log(x) means log₁₀(x); Natural logarithm: ln(x) means log_e(x)',
        'Product Rule: log_b(xy) = log_b(x) + log_b(y)',
        'Quotient Rule: log_b(x/y) = log_b(x) - log_b(y)',
        'Power Rule: log_b(xⁿ) = n·log_b(x)',
        'Change of Base Formula: log_b(x) = log(x)/log(b) = ln(x)/ln(b)',
        'Domain of log function: x > 0 (can only take log of positive numbers)',
        'Range of exponential: y > 0 (exponential functions always positive)',
        'Exponential growth: A(t) = A₀·eᵏᵗ where k > 0, used for population, compound interest',
        'Exponential decay: A(t) = A₀·e⁻ᵏᵗ where k > 0, used for radioactive decay, depreciation',
        'Doubling time formula: t = ln(2)/k; Half-life formula: t = ln(2)/k',
        'Key property: log_b(bˣ) = x and b^(log_b(x)) = x (inverse functions cancel)'
      ],
      examples: [
        'Solving Exponential Equation:\n3ˣ = 81\n3ˣ = 3⁴\nx = 4\n\nAlternatively using logs:\nlog(3ˣ) = log(81)\nx·log(3) = log(81)\nx = log(81)/log(3) = 4',
        'Solving Logarithmic Equation:\nlog₂(x) = 5\nConvert to exponential:\n2⁵ = x\nx = 32\n\nCheck: log₂(32) = log₂(2⁵) = 5 ✓',
        'Using Logarithm Properties:\nExpand: log₃(x²y/z)\n= log₃(x²) + log₃(y) - log₃(z)\n= 2log₃(x) + log₃(y) - log₃(z)',
        'Compound Interest:\n$1000 invested at 5% annual rate, compounded continuously\nA(t) = 1000·e^(0.05t)\nFind amount after 10 years:\nA(10) = 1000·e^(0.5)\nA(10) = 1000·1.6487 = $1,648.70',
        'Population Growth:\nBacteria doubles every 3 hours, starts with 100\nFind population after 12 hours:\nA(t) = 100·2^(t/3)\nA(12) = 100·2^(12/3) = 100·2⁴ = 100·16 = 1,600 bacteria',
        'Half-Life Problem:\nRadioactive substance has half-life of 20 years\nHow long until 25% remains?\nA(t) = A₀·(1/2)^(t/20)\n0.25A₀ = A₀·(1/2)^(t/20)\n0.25 = (1/2)^(t/20)\nlog(0.25) = (t/20)·log(0.5)\nt = 20·log(0.25)/log(0.5) = 40 years'
      ],
      commonMistakes: [
        'Trying to take log of negative number or zero (undefined)',
        'Distributing log incorrectly: log(x + y) ≠ log(x) + log(y)',
        'Forgetting to apply log to BOTH sides when solving exponential equations',
        'Confusing log rules: log(xy) = log(x) + log(y), NOT log(x)·log(y)',
        'Not converting log equation to exponential form for solving',
        'Mixing up natural log (ln) with common log (log)'
      ],
      tips: [
        'Remember: log is inverse of exponential - use this to solve equations',
        'For exponential equations with different bases, use logarithms',
        'Memorize log properties - they\'re essential for simplification',
        'ln(e) = 1, log(10) = 1, ln(1) = 0, log(1) = 0',
        'Growth problems use positive exponent, decay uses negative',
        'Always check if answer makes sense in context (population can\'t be negative)'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'Geometry',
    topicName: 'Triangles and the Pythagorean Theorem',
    content: {
      title: 'Triangles and the Pythagorean Theorem',
      intro: 'Triangles are fundamental geometric shapes with unique properties. The Pythagorean Theorem is one of the most important relationships in mathematics, connecting the sides of right triangles and enabling countless practical applications.',
      keyPoints: [
        'Triangle angle sum: Interior angles always add to 180°',
        'Triangle inequality: Sum of any two sides must be greater than third side',
        'Types by angles: Acute (all angles < 90°), Right (one 90° angle), Obtuse (one angle > 90°)',
        'Types by sides: Equilateral (all equal), Isosceles (two equal), Scalene (none equal)',
        'Pythagorean Theorem: a² + b² = c² for right triangles, where c is hypotenuse',
        'Pythagorean Triples: Integer solutions like (3,4,5), (5,12,13), (8,15,17), (7,24,25)',
        'Converse of Pythagorean Theorem: If a² + b² = c², triangle is right triangle',
        'If a² + b² > c², triangle is acute; if a² + b² < c², triangle is obtuse',
        'Special right triangles: 45-45-90 has sides in ratio 1:1:√2',
        '30-60-90 triangle has sides in ratio 1:√3:2 (opposite angles 30°, 60°, 90°)',
        'Area of triangle: A = (1/2)bh where b is base, h is height',
        'Heron\'s formula: A = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2',
        'Exterior angle equals sum of two non-adjacent interior angles',
        'Isosceles triangle: Base angles are equal, altitude from apex bisects base',
        'Similar triangles: Corresponding angles equal, corresponding sides proportional'
      ],
      examples: [
        'Pythagorean Theorem - Find Hypotenuse:\nRight triangle with legs 6 and 8\na² + b² = c²\n6² + 8² = c²\n36 + 64 = c²\n100 = c²\nc = 10',
        'Pythagorean Theorem - Find Leg:\nHypotenuse = 13, one leg = 5, find other leg\n5² + b² = 13²\n25 + b² = 169\nb² = 144\nb = 12\nThis is the (5,12,13) Pythagorean triple',
        '45-45-90 Triangle:\nIsosceles right triangle with legs of 5\nHypotenuse = leg × √2\nc = 5√2 ≈ 7.07',
        '30-60-90 Triangle:\nShortest side (opposite 30°) = 4\nMedium side (opposite 60°) = 4√3 ≈ 6.93\nHypotenuse (opposite 90°) = 8\nRatio check: 4 : 4√3 : 8 = 1 : √3 : 2 ✓',
        'Triangle Inequality:\nCan sides 3, 7, 11 form a triangle?\nCheck: 3 + 7 = 10, which is NOT > 11\nNo triangle possible (violates triangle inequality)',
        'Area Calculation:\nTriangle with base 12 and height 8\nA = (1/2)bh = (1/2)(12)(8) = 48 square units\n\nUsing Heron\'s formula for sides 5, 6, 7:\ns = (5+6+7)/2 = 9\nA = √(9·4·3·2) = √216 = 6√6 ≈ 14.7 square units'
      ],
      commonMistakes: [
        'Using Pythagorean Theorem on non-right triangles',
        'Confusing legs and hypotenuse (hypotenuse is always longest side)',
        'Forgetting to take square root after calculating c²',
        'Assuming any three numbers can form a triangle (need triangle inequality)',
        'Mixing up 30-60-90 and 45-45-90 triangle ratios',
        'Not identifying which angle is which in special right triangles'
      ],
      tips: [
        'Always identify the hypotenuse first (opposite the right angle, longest side)',
        'Check if numbers are Pythagorean triple - saves calculation time',
        'For special triangles, draw diagram and label angles',
        'Triangle inequality quick check: longest side < sum of other two',
        'In 30-60-90: short = 1x, medium = x√3, long = 2x',
        'In 45-45-90: legs = x, hypotenuse = x√2'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'Trigonometry',
    topicName: 'Trigonometric Ratios and the Unit Circle',
    content: {
      title: 'Trigonometric Ratios and the Unit Circle',
      intro: 'Trigonometry studies relationships between angles and sides in triangles. The unit circle provides a powerful framework for understanding trigonometric functions beyond right triangles, essential for calculus and advanced mathematics.',
      keyPoints: [
        'SOH-CAH-TOA: sin(θ) = Opposite/Hypotenuse, cos(θ) = Adjacent/Hypotenuse, tan(θ) = Opposite/Adjacent',
        'Reciprocal functions: csc(θ) = 1/sin(θ), sec(θ) = 1/cos(θ), cot(θ) = 1/tan(θ)',
        'Unit circle: Circle with radius 1 centered at origin, point (x,y) = (cos θ, sin θ)',
        'Pythagorean Identity: sin²(θ) + cos²(θ) = 1 (fundamental identity)',
        'tan(θ) = sin(θ)/cos(θ) (quotient identity)',
        'Reference angles: Acute angle formed with x-axis, used to find trig values in any quadrant',
        'ASTC rule (All Students Take Calculus): Quadrant I (all positive), II (sin positive), III (tan positive), IV (cos positive)',
        'Special angles (degrees/radians): 0°/0, 30°/π/6, 45°/π/4, 60°/π/3, 90°/π/2',
        'sin(30°) = 1/2, cos(30°) = √3/2, tan(30°) = 1/√3',
        'sin(45°) = √2/2, cos(45°) = √2/2, tan(45°) = 1',
        'sin(60°) = √3/2, cos(60°) = 1/2, tan(60°) = √3',
        'Radian measure: π radians = 180°, conversion: radians = degrees × π/180',
        'Coterminal angles: Differ by 360° (or 2π), have same trig values',
        'Even/Odd functions: cos(-θ) = cos(θ) (even), sin(-θ) = -sin(θ) (odd)',
        'Period: sin and cos have period 2π, tan has period π'
      ],
      examples: [
        'Right Triangle - SOH-CAH-TOA:\nTriangle with opposite = 3, adjacent = 4, hypotenuse = 5\nsin(θ) = 3/5 = 0.6\ncos(θ) = 4/5 = 0.8\ntan(θ) = 3/4 = 0.75',
        'Find All Trig Functions from One:\nGiven: sin(θ) = 3/5, θ in Quadrant II\nUse Pythagorean identity: sin²(θ) + cos²(θ) = 1\n9/25 + cos²(θ) = 1\ncos²(θ) = 16/25\ncos(θ) = -4/5 (negative in Quadrant II)\ntan(θ) = sin/cos = (3/5)/(-4/5) = -3/4',
        'Unit Circle - Find sin and cos:\nAngle θ = 150° (Quadrant II)\nReference angle = 180° - 150° = 30°\nsin(150°) = sin(30°) = 1/2 (positive in II)\ncos(150°) = -cos(30°) = -√3/2 (negative in II)',
        'Convert Degrees to Radians:\n225° to radians:\n225° × π/180 = 225π/180 = 5π/4\n\nConvert Radians to Degrees:\n2π/3 to degrees:\n2π/3 × 180/π = 120°',
        'Evaluate Trig Function:\nFind tan(7π/6):\n7π/6 is in Quadrant III (between π and 3π/2)\nReference angle: 7π/6 - π = π/6\nIn Quadrant III, tan is positive\ntan(7π/6) = tan(π/6) = 1/√3 = √3/3',
        'Using Pythagorean Identity:\nIf cos(θ) = 2/3, find sin(θ) (θ in Quadrant I)\nsin²(θ) + (2/3)² = 1\nsin²(θ) + 4/9 = 1\nsin²(θ) = 5/9\nsin(θ) = √5/3 (positive in Quadrant I)'
      ],
      commonMistakes: [
        'Mixing up opposite and adjacent in right triangles',
        'Forgetting to check quadrant for sign (ASTC rule)',
        'Using degree mode when answer should be in radians (or vice versa)',
        'Confusing sin(2θ) with 2sin(θ) - these are NOT equal',
        'Not simplifying radicals in answers (√2/2 preferred over 1/√2)',
        'Forgetting that tan is undefined when cos = 0 (at 90°, 270°, etc.)'
      ],
      tips: [
        'Memorize special angle values - they appear constantly',
        'ASTC mnemonic for quadrant signs (or "All Students Take Calculus")',
        'Unit circle: moving counterclockwise = positive angles, clockwise = negative',
        'For unknown quadrant, use Pythagorean identity to find missing value',
        'Reference angles are always between 0° and 90°',
        'Check calculator mode: degree vs radian - common source of errors'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'Statistics',
    topicName: 'Measures of Center and Spread',
    content: {
      title: 'Measures of Center and Spread',
      intro: 'Descriptive statistics summarize data using measures of center (where data clusters) and spread (how data varies). These concepts are fundamental for analyzing data, making predictions, and understanding variability in any field.',
      keyPoints: [
        'Mean (average): Sum of all values divided by number of values, affected by outliers',
        'Median: Middle value when data ordered, resistant to outliers',
        'Mode: Most frequently occurring value, can have multiple modes or none',
        'Range: Maximum - Minimum, simplest measure of spread',
        'Variance (σ²): Average of squared deviations from mean, measures spread',
        'Standard deviation (σ): Square root of variance, same units as data',
        'Interquartile Range (IQR): Q₃ - Q₁, spread of middle 50% of data',
        'Quartiles: Q₁ (25th percentile), Q₂ (median, 50th), Q₃ (75th percentile)',
        'Five-number summary: Minimum, Q₁, Median, Q₃, Maximum (used for boxplots)',
        'Outlier rule: Value is outlier if < Q₁ - 1.5×IQR or > Q₃ + 1.5×IQR',
        'Population parameters: μ (mean), σ (standard deviation)',
        'Sample statistics: x̄ (mean), s (standard deviation)',
        'Empirical Rule (68-95-99.7): For normal distributions, 68% within 1σ, 95% within 2σ, 99.7% within 3σ',
        'Choosing measure: Use median when outliers present, mean when symmetric distribution',
        'Coefficient of variation: (σ/μ) × 100%, compares spread across different units'
      ],
      examples: [
        'Calculate Mean, Median, Mode:\nData: 3, 7, 7, 2, 9, 5, 7, 12\nMean: (3+7+7+2+9+5+7+12)/8 = 52/8 = 6.5\nMedian: Ordered: 2,3,5,7,7,7,9,12 → (7+7)/2 = 7\nMode: 7 (appears 3 times)',
        'Calculate Variance and Standard Deviation:\nData: 2, 4, 6, 8, 10\nMean = 6\nDeviations: -4, -2, 0, 2, 4\nSquared: 16, 4, 0, 4, 16\nVariance = (16+4+0+4+16)/5 = 40/5 = 8\nStandard deviation = √8 ≈ 2.83',
        'Find Quartiles and IQR:\nData: 2, 5, 7, 8, 10, 12, 15, 18, 20\nQ₁ (median of lower half): 7\nQ₂ (median): 10\nQ₃ (median of upper half): 15\nIQR = Q₃ - Q₁ = 15 - 7 = 8',
        'Identify Outliers:\nQ₁ = 20, Q₃ = 40, IQR = 20\nLower fence: 20 - 1.5(20) = 20 - 30 = -10\nUpper fence: 40 + 1.5(20) = 40 + 30 = 70\nAny value < -10 or > 70 is an outlier\nValue 85 is an outlier (85 > 70)',
        'Using Empirical Rule:\nTest scores: mean = 75, σ = 5\n68% of scores between 70 and 80 (75 ± 5)\n95% of scores between 65 and 85 (75 ± 10)\n99.7% of scores between 60 and 90 (75 ± 15)',
        'Compare Datasets:\nDataset A: Mean = 50, σ = 10\nDataset B: Mean = 100, σ = 10\nCoefficient of variation:\nA: (10/50) × 100% = 20%\nB: (10/100) × 100% = 10%\nDataset A has more relative variability'
      ],
      commonMistakes: [
        'Confusing mean and median - median is middle value, not average',
        'Forgetting to order data before finding median or quartiles',
        'Using mean when outliers present (median more appropriate)',
        'Calculating variance without squaring deviations first',
        'Forgetting to take square root to get standard deviation from variance',
        'Thinking mode must be unique - can have multiple modes or no mode'
      ],
      tips: [
        'Always order data first when finding median, quartiles',
        'Check for outliers before choosing mean vs median',
        'Remember: variance is squared, standard deviation is not',
        'IQR is resistant to outliers, range is not',
        'For skewed distributions, use median and IQR over mean and σ',
        'Boxplot shows five-number summary visually'
      ]
    }
  },

  {
    categorySlug: 'mathematics',
    subjectName: 'Precalculus',
    topicName: 'Functions - Domain, Range, and Composition',
    content: {
      title: 'Functions: Domain, Range, and Composition',
      intro: 'Functions are fundamental mathematical objects that assign exactly one output to each input. Understanding domain, range, and composition is essential for calculus and modeling real-world relationships.',
      keyPoints: [
        'Function: Relation where each input (x) has exactly one output (f(x))',
        'Domain: Set of all possible input values (x-values)',
        'Range: Set of all possible output values (y-values)',
        'Vertical Line Test: Graph represents function if any vertical line intersects at most once',
        'Function notation: f(x) means "function f evaluated at x" (not multiplication)',
        'Common domain restrictions: No division by zero, no square root of negative (for real numbers)',
        'Rational functions: Domain excludes values making denominator zero',
        'Square root functions: Domain includes only values making radicand ≥ 0',
        'Composition: (f ∘ g)(x) = f(g(x)) - output of g becomes input of f',
        'Domain of composition: x values where g(x) is defined AND g(x) is in domain of f',
        'Piecewise functions: Different rules for different intervals of domain',
        'One-to-one function: Each output comes from exactly one input (passes horizontal line test)',
        'Inverse function f⁻¹: Reverses f, exists only if f is one-to-one',
        'Even function: f(-x) = f(x) (symmetric about y-axis)',
        'Odd function: f(-x) = -f(x) (symmetric about origin)'
      ],
      examples: [
        'Find Domain:\nf(x) = 1/(x² - 9)\nDenominator cannot be zero:\nx² - 9 ≠ 0\n(x-3)(x+3) ≠ 0\nx ≠ 3 and x ≠ -3\nDomain: All real numbers except 3 and -3',
        'Find Domain of Square Root:\nf(x) = √(2x - 6)\nRadicand must be ≥ 0:\n2x - 6 ≥ 0\n2x ≥ 6\nx ≥ 3\nDomain: [3, ∞)',
        'Function Composition:\nf(x) = x² + 1, g(x) = 2x - 3\nFind (f ∘ g)(x):\nf(g(x)) = f(2x - 3)\n= (2x - 3)² + 1\n= 4x² - 12x + 9 + 1\n= 4x² - 12x + 10',
        'Evaluate Piecewise Function:\nf(x) = { x² if x < 0\n         2x + 1 if x ≥ 0\nFind f(-2): Since -2 < 0, use x²\nf(-2) = (-2)² = 4\nFind f(3): Since 3 ≥ 0, use 2x + 1\nf(3) = 2(3) + 1 = 7',
        'Find Range:\nf(x) = x² - 4 (parabola opening upward)\nVertex at (0, -4)\nSince parabola opens up, minimum is -4\nRange: [-4, ∞)',
        'Domain of Composition:\nf(x) = √x, g(x) = x - 5\nFind domain of (f ∘ g)(x) = √(x - 5)\nNeed g(x) ≥ 0:\nx - 5 ≥ 0\nx ≥ 5\nDomain: [5, ∞)'
      ],
      commonMistakes: [
        'Confusing domain and range - domain is input, range is output',
        'Forgetting to exclude division by zero from domain',
        'Wrong order in composition: f(g(x)) ≠ g(f(x)) in general',
        'Not checking if radicand is non-negative for square roots',
        'Assuming f(a + b) = f(a) + f(b) - this is usually FALSE',
        'Mixing up f⁻¹(x) (inverse) with 1/f(x) (reciprocal)'
      ],
      tips: [
        'For domain: look for denominators (≠0) and square roots (≥0)',
        'Composition reads right to left: (f ∘ g)(x) means "g first, then f"',
        'Test piecewise functions at boundary points carefully',
        'For range: consider minimum/maximum values and behavior as x → ±∞',
        'Vertical line test for function, horizontal line test for one-to-one',
        'Practice composition by working inside-out'
      ]
    }
  },

  // ==================== ECONOMICS ====================
  {
    categorySlug: 'social-studies',
    subjectName: 'AP Economics',
    topicName: 'Supply and Demand',
    content: {
      title: 'Supply and Demand',
      intro: 'Supply and demand are the fundamental forces determining prices in market economies. Understanding how these forces interact is essential for analyzing economic behavior, predicting market changes, and making informed decisions.',
      keyPoints: [
        'Law of Demand: As price increases, quantity demanded decreases (inverse relationship), holding all else constant',
        'Demand curve slopes downward (negative slope) showing inverse price-quantity relationship',
        'Law of Supply: As price increases, quantity supplied increases (direct relationship)',
        'Supply curve slopes upward (positive slope) showing direct price-quantity relationship',
        'Market equilibrium: Where supply and demand curves intersect - quantity supplied equals quantity demanded',
        'Equilibrium price (market-clearing price): Price at which market is in balance',
        'Surplus: Quantity supplied exceeds quantity demanded (price too high) - puts downward pressure on price',
        'Shortage: Quantity demanded exceeds quantity supplied (price too low) - puts upward pressure on price',
        'Change in demand: Entire curve shifts due to non-price factors (income, preferences, related goods prices)',
        'Change in quantity demanded: Movement along curve due to price change',
        'Demand shifters: Income, consumer preferences, prices of substitutes/complements, expectations, number of buyers',
        'Supply shifters: Input costs, technology, taxes/subsidies, expectations, number of sellers, natural conditions',
        'Substitutes: Goods that replace each other (Coke and Pepsi) - price increase in one increases demand for other',
        'Complements: Goods used together (cars and gasoline) - price increase in one decreases demand for other',
        'Elasticity: Measure of responsiveness to price changes (covered in depth separately)'
      ],
      examples: [
        'Equilibrium Example:\nDemand: Qd = 100 - 2P\nSupply: Qs = 20 + 3P\nAt equilibrium, Qd = Qs:\n100 - 2P = 20 + 3P\n80 = 5P\nP = $16 (equilibrium price)\nQ = 100 - 2(16) = 68 units (equilibrium quantity)',
        'Surplus Scenario:\nMarket equilibrium: $5, 100 units\nGovernment sets price floor at $7:\nAt $7: Quantity supplied = 130, Quantity demanded = 70\nSurplus = 130 - 70 = 60 units\nResult: Unsold inventory, pressure to lower price',
        'Demand Shift - Normal Good:\nConsumer income increases:\n→ Demand curve shifts RIGHT\n→ Higher equilibrium price AND quantity\nExample: Income rises → demand for restaurant meals increases',
        'Demand Shift - Inferior Good:\nConsumer income increases:\n→ Demand curve shifts LEFT\n→ Lower equilibrium price AND quantity\nExample: Income rises → demand for instant ramen decreases',
        'Supply Shift - Technology:\nNew harvesting technology for wheat:\n→ Supply curve shifts RIGHT\n→ Lower equilibrium price, higher equilibrium quantity\nResult: More wheat available at every price',
        'Complements Example:\nGasoline price increases significantly:\n→ Demand for SUVs decreases (curve shifts left)\n→ Lower SUV prices, fewer SUVs sold\nGas and SUVs are complements'
      ],
      commonMistakes: [
        'Confusing change in demand (shift) with change in quantity demanded (movement along curve)',
        'Moving wrong direction when shifting curves - income increase shifts normal good demand RIGHT',
        'Thinking price causes supply/demand to shift - price causes movement along curve, not shift',
        'Forgetting that equilibrium represents stable point where market naturally tends',
        'Mixing up substitutes and complements effects',
        'Not distinguishing normal goods (demand increases with income) from inferior goods (demand decreases with income)'
      ],
      tips: [
        'Shift acronym for demand: TONIE (Tastes, Other goods, Number of buyers, Income, Expectations)',
        'Remember: Price changes → move along curve; Non-price factors → shift entire curve',
        'Right shift = increase (in supply or demand); Left shift = decrease',
        'Practice drawing graphs - visualizing helps understand relationships',
        'Equilibrium is self-correcting: surplus → price falls, shortage → price rises',
        'Think real-world: What would happen to smartphone demand if income doubled? If prices fell?'
      ]
    }
  },

  // ============================================================================
  // BUSINESS COURSES - Comprehensive Coverage
  // ============================================================================

  // Introduction to Business
  {
    categorySlug: 'business',
    subjectName: 'Introduction to Business',
    topicName: 'Types of Business Structures',
    content: {
      title: 'Types of Business Structures',
      intro: 'Choosing the right business structure is one of the most important decisions entrepreneurs make. The structure affects taxes, liability, ownership, and how the business operates legally.',
      keyPoints: [
        'Main business structures: Sole Proprietorship, Partnership, LLC, Corporation, and Nonprofit',
        'Each structure has different tax implications, liability protection, and operational complexity',
        'Sole proprietorships are simplest but offer no personal liability protection',
        'Corporations provide strongest liability protection but have double taxation (C-Corp)',
        'LLCs combine liability protection of corporations with tax flexibility of partnerships',
        'Choice depends on business size, number of owners, liability risk, and tax considerations',
        'You can change business structure as your company grows',
        'Each structure requires different formation documents and fees',
        'State laws vary in requirements and costs for different structures',
        'Professional advice (lawyer/accountant) recommended before choosing'
      ],
      examples: [
        'Sole Proprietorship: Freelance graphic designer working independently - simple to start, full control, but personally liable for debts',
        'Partnership: Two accountants forming a firm - shared ownership, profits, and liabilities based on partnership agreement',
        'LLC: Small tech startup with 3 founders - liability protection for personal assets, flexible tax options, moderate complexity',
        'C-Corporation: Large software company planning IPO - unlimited shareholders, strong liability protection, subject to corporate taxes then dividend taxes',
        'S-Corporation: Small consulting firm with 10 employees - pass-through taxation, limited to 100 US shareholders',
        'Nonprofit: Charitable foundation - tax-exempt status, must serve public benefit, cannot distribute profits to owners'
      ],
      commonMistakes: [
        'Starting without considering liability risks - personal assets exposed in sole proprietorships',
        'Choosing corporation when LLC would be simpler and more tax-efficient',
        'Not creating proper operating agreements or bylaws',
        'Mixing personal and business finances regardless of structure',
        'Failing to maintain corporate formalities (meetings, records) which can pierce corporate veil'
      ],
      tips: [
        'Start with your liability risk assessment - how much personal asset protection do you need?',
        'Consider tax implications with an accountant before deciding',
        'Think about future plans: Will you seek investors? Go public? Sell the business?',
        'Many small businesses start as sole proprietorships or LLCs and convert to corporations later',
        'Register your business name and get required licenses regardless of structure',
        'Keep excellent records and maintain separation between personal and business finances'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Introduction to Business',
    topicName: 'The Four Ps of Marketing (Product, Price, Place, Promotion)',
    content: {
      title: 'The Four Ps of Marketing (Product, Price, Place, Promotion)',
      intro: 'The Four Ps of Marketing (Product, Price, Place, Promotion) form the marketing mix - the fundamental framework for developing and executing marketing strategies. Mastering these elements is essential for business success.',
      keyPoints: [
        'Product: What you sell - includes features, quality, design, branding, packaging, and services',
        'Price: How much you charge - considers costs, competition, perceived value, and pricing strategy',
        'Place: Where/how customers buy - distribution channels, locations, logistics, and accessibility',
        'Promotion: How you communicate - advertising, sales, PR, social media, and promotional tactics',
        'All four Ps must work together cohesively for effective marketing',
        'Marketing mix decisions should be customer-focused and data-driven',
        'The Four Ps apply to both products and services',
        'Digital transformation has expanded Place and Promotion options significantly',
        'Pricing affects perception of quality and brand positioning',
        'Place includes both physical and digital distribution channels'
      ],
      examples: [
        'Apple iPhone - Product: premium design/features, Price: premium pricing, Place: Apple stores + carriers + online, Promotion: sleek ads emphasizing innovation',
        'Dollar Store - Product: variety of budget items, Price: everything $1, Place: convenient neighborhood locations, Promotion: value-focused advertising',
        'Netflix - Product: streaming content library, Price: tiered subscriptions, Place: digital platform accessible anywhere, Promotion: original content marketing + word-of-mouth',
        'Tesla - Product: electric luxury vehicles, Price: premium but lower than gas luxury cars long-term, Place: direct-to-consumer online + showrooms, Promotion: Elon Musk\'s social media + tech events'
      ],
      commonMistakes: [
        'Focusing on only one P (usually Product) while neglecting others',
        'Pricing too low thinking it will guarantee sales - hurts perceived value',
        'Not considering how distribution channels affect customer experience',
        'Promotion without clear understanding of target audience',
        'Copying competitors\' marketing mix without considering your unique value'
      ],
      tips: [
        'Start with deep customer understanding - what do they value most?',
        'Ensure consistency across all Four Ps - luxury product needs premium pricing and placement',
        'Test different combinations to find optimal marketing mix',
        'Review and adjust your marketing mix regularly based on market feedback',
        'Use data analytics to measure effectiveness of each P',
        'Consider adding 3 more Ps for services: People, Process, Physical Evidence'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Introduction to Business',
    topicName: 'Financial Statements (Balance Sheet, Income Statement, Cash Flow)',
    content: {
      title: 'Financial Statements: Balance Sheet, Income Statement, Cash Flow',
      intro: 'Financial statements are the primary tools for understanding a company\'s financial health. The three core statements - Balance Sheet, Income Statement, and Cash Flow Statement - provide complementary views of business performance.',
      keyPoints: [
        'Balance Sheet: Snapshot of assets, liabilities, and equity at a specific point in time',
        'Accounting equation: Assets = Liabilities + Equity (must always balance)',
        'Income Statement: Shows revenues, expenses, and profit over a period (month, quarter, year)',
        'Also called Profit & Loss (P&L) statement',
        'Cash Flow Statement: Tracks actual cash moving in and out of business',
        'Three sections: Operating activities, Investing activities, Financing activities',
        'Profitable companies can still fail from cash flow problems',
        'Balance sheet shows what you own and owe; Income statement shows profitability; Cash flow shows liquidity',
        'All three statements are interconnected and tell complete financial story together',
        'Used by investors, creditors, management to make decisions'
      ],
      examples: [
        'Balance Sheet example: Assets $500K (cash $50K, inventory $200K, equipment $250K) = Liabilities $300K (loans) + Equity $200K (owner investment + retained earnings)',
        'Income Statement example: Revenue $1M, Cost of Goods Sold $400K = Gross Profit $600K, Operating Expenses $450K = Net Income $150K',
        'Cash Flow example: Started year with $50K cash, operations generated $200K, bought equipment ($100K), repaid loan ($80K), ending cash $70K',
        'Tech startup showing losses on income statement (developing product) but positive cash from investor funding on cash flow statement'
      ],
      commonMistakes: [
        'Confusing profit with cash - can be profitable but cash-poor',
        'Not understanding that balance sheet is a point in time, while income statement is a period',
        'Ignoring cash flow statement - many profitable businesses fail due to cash problems',
        'Mixing personal and business finances making statements inaccurate',
        'Not reconciling the three statements to ensure consistency'
      ],
      tips: [
        'Learn to read all three statements together for complete picture',
        'Focus on trends over time, not just single period',
        'Compare your statements to industry benchmarks',
        'Cash is king - monitor cash flow closely even when profitable',
        'Use accounting software to generate accurate statements automatically',
        'Review statements monthly to catch problems early'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Introduction to Business',
    topicName: 'Break-Even Analysis',
    content: {
      title: 'Break-Even Analysis',
      intro: 'Break-even analysis determines the sales volume needed to cover all costs - where total revenue equals total costs and profit is zero. This critical tool helps businesses make pricing, production, and investment decisions.',
      keyPoints: [
        'Break-even point: Level of sales where business neither makes profit nor loss',
        'Formula: Break-even units = Fixed Costs ÷ (Price per unit - Variable cost per unit)',
        'Contribution margin = Price - Variable cost per unit',
        'Fixed costs don\'t change with production volume (rent, salaries, insurance)',
        'Variable costs change with production volume (materials, hourly labor, shipping)',
        'Below break-even: Company loses money; Above break-even: Company profits',
        'Lower break-even point = less risky, easier to achieve profitability',
        'Can calculate in units sold or dollar sales',
        'Margin of safety: How far sales can drop before hitting break-even',
        'Used for pricing decisions, cost control, and feasibility analysis'
      ],
      examples: [
        'Coffee shop: Fixed costs $10,000/month, coffee price $5, variable cost $2. Break-even = 10,000 ÷ (5-2) = 3,334 cups per month',
        'Software company: Fixed costs $500K/year, subscription $100/month, variable cost $20/month. Break-even = 500,000 ÷ (100-20) = 6,250 subscribers',
        'Manufacturing: Fixed costs $100K, sell widgets at $50, variable cost $30. Break-even = 100,000 ÷ (50-30) = 5,000 units',
        'Consulting firm considering new hire: Additional fixed cost $80K salary. Need $80K ÷ contribution margin to justify hire'
      ],
      commonMistakes: [
        'Misclassifying costs as fixed vs variable',
        'Forgetting some fixed costs like depreciation or insurance',
        'Not updating analysis when costs or prices change',
        'Assuming linear relationships - reality may show economies of scale',
        'Making major decisions on break-even alone without considering other factors'
      ],
      tips: [
        'Calculate break-even before launching any new product or business',
        'Test different scenarios: What if costs increase 10%? What if price drops?',
        'Set sales goals above break-even to ensure healthy profit margin',
        'Track actual performance against break-even projections monthly',
        'Use break-even to evaluate whether price cuts are worthwhile',
        'Lower break-even by reducing fixed costs or increasing contribution margin'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Introduction to Business',
    topicName: 'Business Plan Development',
    content: {
      title: 'Business Plan Development',
      intro: 'A business plan is a comprehensive document outlining your business goals, strategies, market analysis, and financial projections. It serves as a roadmap for success and is essential for securing funding from investors or lenders.',
      keyPoints: [
        'Key sections: Executive Summary, Company Description, Market Analysis, Organization, Products/Services, Marketing Strategy, Financial Projections',
        'Executive summary is first but written last - concise overview of entire plan',
        'Market analysis shows you understand your industry, customers, and competition',
        'Financial projections typically include 3-5 year forecasts',
        'Business plan forces you to think through all aspects of your business',
        'Living document - should be updated as business evolves',
        'Different formats for different purposes: traditional (for banks), lean startup (for agile businesses)',
        'Investors look for scalable business model, strong team, clear competitive advantage',
        'Must be realistic yet optimistic - overly aggressive projections hurt credibility',
        'Typically 20-40 pages for traditional plan, 1-2 pages for lean canvas'
      ],
      examples: [
        'Tech startup plan: Focus on product innovation, large addressable market, scalability, path to profitability, experienced team',
        'Restaurant plan: Location analysis, menu concept, target demographics, startup costs breakdown, detailed first-year cash flow',
        'Consulting business plan: Service offerings, target clients, pricing structure, marketing approach, modest capital needs',
        'E-commerce plan: Product sourcing, website development, digital marketing strategy, customer acquisition costs, inventory management'
      ],
      commonMistakes: [
        'Making unrealistic financial projections to impress investors',
        'Insufficient market research and competitive analysis',
        'Focusing too much on product/service and not enough on customers and marketing',
        'Writing plan once and never updating it',
        'Copying business plan templates without customization',
        'Ignoring potential risks and challenges'
      ],
      tips: [
        'Start with lean canvas or one-page plan, expand to full plan when seeking investment',
        'Research thoroughly - talk to potential customers, analyze competitors',
        'Be specific and quantify everything possible with data',
        'Have multiple people review your plan for feedback',
        'Include contingency plans for potential obstacles',
        'Tailor plan to audience - banks want different info than venture capitalists',
        'Update financial projections quarterly based on actual performance'
      ]
    }
  },

  // Accounting
  {
    categorySlug: 'business',
    subjectName: 'Accounting',
    topicName: 'Double-Entry Bookkeeping',
    content: {
      title: 'Double-Entry Bookkeeping',
      intro: 'Double-entry bookkeeping is the foundation of modern accounting. Every transaction affects at least two accounts, creating a self-balancing system that ensures accuracy and completeness of financial records.',
      keyPoints: [
        'Every transaction has two sides: a debit and a credit of equal amounts',
        'Debits and credits must always be equal - this is the fundamental rule',
        'Debits are not bad and credits are not good - they\'re just two sides of each transaction',
        'The accounting equation: Assets = Liabilities + Equity must always balance',
        'Debit increases: Assets and Expenses; Credit increases: Liabilities, Equity, and Revenue',
        'Every entry is recorded in journal first, then posted to ledger accounts',
        'Trial balance verifies that total debits equal total credits',
        'System provides built-in error detection - if debits ≠ credits, there\'s a mistake',
        'Provides complete audit trail of all transactions',
        'Foundation for financial statements preparation'
      ],
      examples: [
        'Purchase equipment $5,000 cash: Debit Equipment $5,000 (asset increases), Credit Cash $5,000 (asset decreases)',
        'Receive payment from customer $1,000: Debit Cash $1,000 (asset increases), Credit Accounts Receivable $1,000 (asset decreases)',
        'Pay rent $2,000: Debit Rent Expense $2,000 (expense increases), Credit Cash $2,000 (asset decreases)',
        'Take out loan $10,000: Debit Cash $10,000 (asset increases), Credit Notes Payable $10,000 (liability increases)',
        'Earn revenue $3,000 on credit: Debit Accounts Receivable $3,000 (asset increases), Credit Revenue $3,000 (revenue increases)'
      ],
      commonMistakes: [
        'Confusing which accounts to debit vs credit',
        'Recording only one side of transaction',
        'Getting debit/credit backwards for different account types',
        'Not documenting transaction source/purpose',
        'Skipping trial balance verification'
      ],
      tips: [
        'Memorize the DEALER acronym: Debits increase Expenses, Assets, Losses; Credits increase Equity, Revenues',
        'Every transaction tells a story - think about what happened economically',
        'Verify debits = credits before posting any entry',
        'Use T-accounts to visualize how transactions affect accounts',
        'Practice identifying account types first (asset, liability, etc.) before determining debit/credit',
        'Review trial balance regularly to catch errors early'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Accounting',
    topicName: 'Financial Ratio Analysis',
    content: {
      title: 'Financial Ratio Analysis',
      intro: 'Financial ratios transform raw financial statement numbers into meaningful metrics that reveal a company\'s profitability, liquidity, efficiency, and solvency. Ratios enable comparison across companies and time periods.',
      keyPoints: [
        'Four main categories: Liquidity, Profitability, Efficiency, and Leverage ratios',
        'Liquidity ratios measure ability to pay short-term obligations (Current Ratio, Quick Ratio)',
        'Profitability ratios measure ability to generate profit (ROI, ROE, Profit Margin)',
        'Efficiency ratios measure how well company uses assets (Inventory Turnover, Asset Turnover)',
        'Leverage ratios measure debt levels (Debt-to-Equity, Interest Coverage)',
        'Compare ratios to industry benchmarks and company\'s historical performance',
        'No single ratio tells complete story - analyze multiple ratios together',
        'Ratios are tools for identifying areas needing investigation',
        'Different industries have different "normal" ratio ranges',
        'Trend analysis over time often more valuable than single point-in-time ratio'
      ],
      examples: [
        'Current Ratio = Current Assets ÷ Current Liabilities. Example: $200K ÷ $100K = 2.0 (company has $2 of current assets for every $1 of current liabilities)',
        'ROE = Net Income ÷ Shareholders\' Equity. Example: $50K ÷ $500K = 10% (company generates $0.10 profit for each $1 of equity)',
        'Profit Margin = Net Income ÷ Revenue. Example: $100K ÷ $1M = 10% (company keeps $0.10 profit from each $1 of sales)',
        'Debt-to-Equity = Total Debt ÷ Total Equity. Example: $300K ÷ $200K = 1.5 (company has $1.50 of debt for every $1 of equity)',
        'Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities. Example: ($200K - $80K) ÷ $100K = 1.2'
      ],
      commonMistakes: [
        'Comparing ratios across different industries without context',
        'Relying on one ratio without looking at full picture',
        'Not considering economic conditions affecting ratios',
        'Assuming higher/lower is always better without understanding the ratio',
        'Using outdated financial data for ratio calculations'
      ],
      tips: [
        'Calculate 2-3 ratios from each category for comprehensive analysis',
        'Compare your ratios to direct competitors, not just industry averages',
        'Look for trends - is profitability improving or declining?',
        'Investigate unusual ratios - they often reveal important insights',
        'Use ratio analysis to identify questions, then dig deeper for answers',
        'Current ratio of 1.5-2.0 generally considered healthy; debt-to-equity under 2.0 typically acceptable'
      ]
    }
  },

  // Marketing
  {
    categorySlug: 'business',
    subjectName: 'Marketing',
    topicName: 'SWOT Analysis',
    content: {
      title: 'SWOT Analysis',
      intro: 'SWOT Analysis is a strategic planning framework that evaluates Strengths, Weaknesses, Opportunities, and Threats. This tool helps businesses understand their competitive position and develop informed strategies.',
      keyPoints: [
        'SWOT = Strengths, Weaknesses, Opportunities, Threats',
        'Strengths and Weaknesses are internal factors you can control',
        'Opportunities and Threats are external factors in your environment',
        'Strengths: What you do well, competitive advantages, unique resources',
        'Weaknesses: Areas for improvement, resource limitations, competitive disadvantages',
        'Opportunities: External conditions you can exploit (market trends, technology)',
        'Threats: External challenges that could harm business (competition, regulations)',
        'Used for strategic planning, market entry, product launches, competitive positioning',
        'Should involve multiple stakeholders for diverse perspectives',
        'Must be honest and realistic - overly optimistic SWOT is useless'
      ],
      examples: [
        'Coffee shop Strengths: Prime location, loyal customers, unique recipes; Weaknesses: High rent, limited parking, small staff',
        'Software startup Opportunities: Growing market demand, competitor weakness, new technology; Threats: Established competitors, economic downturn, changing regulations',
        'Retail store analyzing e-commerce entry: Strength = brand recognition, Weakness = no online experience, Opportunity = growing online sales, Threat = Amazon',
        'Restaurant chain: Strength = efficient operations, Weakness = dated décor, Opportunity = delivery apps, Threat = food cost inflation'
      ],
      commonMistakes: [
        'Listing too many items - focus on most significant factors',
        'Confusing internal/external factors (putting opportunities in strengths)',
        'Being too vague - "good customer service" vs "24/7 support with 2-minute response time"',
        'Doing SWOT once and never updating it',
        'Not turning analysis into action - SWOT should drive strategy'
      ],
      tips: [
        'Limit to 5-7 items per quadrant for focus',
        'Be specific and provide evidence for each item',
        'Ask: How can we use strengths to capture opportunities?',
        'Ask: How can we minimize weaknesses to avoid threats?',
        'Involve customers and employees for honest external perspective',
        'Update SWOT annually or when major changes occur',
        'Convert SWOT insights into concrete strategic actions'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Marketing',
    topicName: 'Customer Acquisition Cost (CAC)',
    content: {
      title: 'Customer Acquisition Cost (CAC)',
      intro: 'Customer Acquisition Cost (CAC) measures how much a business spends to acquire a new customer. This critical metric determines marketing efficiency and long-term profitability.',
      keyPoints: [
        'CAC = Total Marketing & Sales Costs ÷ Number of New Customers Acquired',
        'Includes advertising, marketing salaries, software, events, sales commissions',
        'Should be calculated for specific time periods (monthly, quarterly)',
        'Lower CAC means more efficient customer acquisition',
        'Must be compared to Customer Lifetime Value (LTV) - ideally LTV:CAC ratio > 3:1',
        'CAC varies significantly by industry and acquisition channel',
        'Different channels have different CACs - track separately',
        'CAC typically increases as you scale and exhaust easy markets',
        'Reducing CAC through optimization is key to profitable growth',
        'Payback period = how long to recover CAC from customer revenue'
      ],
      examples: [
        'Spent $10,000 on marketing in May, acquired 100 customers: CAC = $10,000 ÷ 100 = $100 per customer',
        'SaaS company: $50K/month marketing spend, 200 new subscribers: CAC = $250. If monthly subscription is $50, payback period = 5 months',
        'E-commerce store: Facebook ads $5,000, Google ads $3,000, got 400 orders: CAC = $8,000 ÷ 400 = $20 per customer',
        'Different channels: Email marketing CAC $15, Instagram ads CAC $45, Trade shows CAC $200 - focus budget on efficient channels'
      ],
      commonMistakes: [
        'Not including all costs - forgetting salaries, software, overhead',
        'Comparing CAC across different industries without context',
        'Focusing only on CAC without considering customer lifetime value',
        'Not tracking CAC by channel to identify most efficient sources',
        'Cutting marketing spend without understanding impact on CAC long-term'
      ],
      tips: [
        'Calculate CAC monthly to spot trends early',
        'Break down CAC by acquisition channel for optimization',
        'Aim for LTV:CAC ratio of at least 3:1 for healthy business',
        'Ideal payback period is under 12 months',
        'Test new channels systematically to find lower CAC sources',
        'Improve CAC by: better targeting, conversion optimization, referral programs, content marketing',
        'As business matures, focus shifts from growth-at-all-costs to sustainable CAC'
      ]
    }
  },

  // Finance
  {
    categorySlug: 'business',
    subjectName: 'Finance',
    topicName: 'Time Value of Money',
    content: {
      title: 'Time Value of Money',
      intro: 'The Time Value of Money (TVM) is the foundational concept that a dollar today is worth more than a dollar in the future. Understanding TVM is essential for all financial decisions including investments, loans, and business valuations.',
      keyPoints: [
        'Money today is worth more than same amount in future due to earning potential',
        'Three reasons: opportunity cost (could invest), inflation (reduces purchasing power), risk (future uncertain)',
        'Present Value (PV) = today\'s value of future cash flows',
        'Future Value (FV) = what today\'s money will be worth in future with interest',
        'Formula: FV = PV × (1 + r)^n where r = interest rate, n = number of periods',
        'Discounting: Converting future value to present value',
        'Compounding: Calculating how money grows over time with reinvested earnings',
        'Higher interest rate or longer time period = greater difference between PV and FV',
        'TVM applies to all financial decisions: investments, loans, business projects',
        'Basis for NPV, IRR, and other investment evaluation methods'
      ],
      examples: [
        'FV calculation: Invest $1,000 today at 8% for 5 years: FV = $1,000 × (1.08)^5 = $1,469.33',
        'PV calculation: Need $10,000 in 3 years, can earn 6%: PV = $10,000 ÷ (1.06)^3 = $8,396.19 (invest this today)',
        'Lottery choice: $1M today vs $1.5M in 10 years. If you can earn 7%, PV of $1.5M = $762K. Take $1M today!',
        'Business decision: Spend $50K now on equipment that will generate $15K/year for 5 years at 10% discount rate - is it worth it?'
      ],
      commonMistakes: [
        'Comparing future dollars to present dollars without adjusting for time value',
        'Ignoring inflation when calculating real returns',
        'Using wrong interest rate for discount rate',
        'Not accounting for compounding frequency (annual vs monthly)',
        'Forgetting that higher risk requires higher discount rate'
      ],
      tips: [
        'When evaluating options with different timing, always convert to same time period (usually PV)',
        'Use financial calculator or Excel functions (PV, FV, NPV) for complex calculations',
        'Real interest rate = Nominal rate - Inflation rate',
        'Compound interest is powerful - start investing early',
        'For business decisions, use company\'s cost of capital as discount rate',
        'Verify calculations - small error in rate or periods creates big differences'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Finance',
    topicName: 'Net Present Value (NPV)',
    content: {
      title: 'Net Present Value (NPV)',
      intro: 'Net Present Value (NPV) is the gold standard for evaluating investments and projects. It calculates the value created by comparing present value of cash inflows to present value of cash outflows.',
      keyPoints: [
        'NPV = Present Value of Cash Inflows - Present Value of Cash Outflows',
        'Positive NPV = investment creates value, should accept',
        'Negative NPV = investment destroys value, should reject',
        'Zero NPV = investment breaks even, indifferent',
        'Accounts for time value of money by discounting all future cash flows',
        'Discount rate (usually cost of capital) reflects risk and opportunity cost',
        'Higher discount rate = lower NPV (future cash flows worth less)',
        'NPV is additive - can sum NPVs of multiple projects',
        'Most reliable capital budgeting method for maximizing shareholder value',
        'Assumptions: cash flows occur at end of period, reinvestment at discount rate'
      ],
      examples: [
        'Project costs $100K today, generates $30K/year for 5 years, discount rate 10%: NPV = -$100K + $30K/1.1 + $30K/1.1² + ... + $30K/1.1⁵ = $13,723 → Accept',
        'Machine costs $50K, saves $15K/year for 4 years, scrap value $5K, rate 12%: Calculate PV of each year + salvage, subtract $50K initial cost',
        'Comparing projects: Project A NPV = $25K, Project B NPV = $30K. Choose B (creates more value)',
        'Expansion decision: Open new store for $200K, expect annual cash flows $50K for 10 years, discount at 15%: NPV = $50,881 → Proceed'
      ],
      commonMistakes: [
        'Using wrong discount rate - should reflect project risk and opportunity cost',
        'Forgetting to include all cash flows (taxes, working capital, salvage value)',
        'Not accounting for inflation in cash flow projections',
        'Confusing accounting profit with cash flows',
        'Ignoring that NPV is only as good as your cash flow estimates'
      ],
      tips: [
        'Excel NPV function: =NPV(rate, cash flows) + initial investment (negative)',
        'Positive NPV means return exceeds discount rate',
        'Perform sensitivity analysis - how does NPV change if assumptions vary?',
        'Higher risk projects require higher discount rates',
        'Compare NPV to initial investment for perspective on value created',
        'NPV preferred over IRR when projects have unusual cash flow patterns',
        'Always use after-tax cash flows for business decisions'
      ]
    }
  },

  // Personal Finance
  {
    categorySlug: 'business',
    subjectName: 'Personal Finance',
    topicName: 'Creating a Personal Budget',
    content: {
      title: 'Creating a Personal Budget',
      intro: 'A personal budget is your financial roadmap - tracking income and expenses to ensure you spend less than you earn and achieve your financial goals. Budgeting is the foundation of financial success.',
      keyPoints: [
        'Budget formula: Income - Savings - Fixed Expenses - Variable Expenses = $0',
        'Track all income sources: salary, side hustles, investments',
        'Fixed expenses: Same each month (rent, insurance, subscriptions)',
        'Variable expenses: Change monthly (groceries, entertainment, utilities)',
        'Pay yourself first: Allocate savings before spending',
        '50/30/20 rule: 50% needs, 30% wants, 20% savings and debt repayment',
        'Review and adjust budget monthly based on actual spending',
        'Budget gives permission to spend, not restriction',
        'Emergency fund should be first savings priority',
        'Technology helps: budgeting apps, automatic tracking, alerts'
      ],
      examples: [
        'Monthly budget: Income $5,000, Savings $1,000 (20%), Rent $1,500, Groceries $500, Utilities $200, Transportation $300, Entertainment $400, Other $1,100',
        '50/30/20 on $4,000 income: Needs $2,000 (housing, food, utilities), Wants $1,200 (dining, hobbies), Savings $800',
        'Zero-based budget: Every dollar assigned a job. Income $3,500 = Rent $1,000 + Food $400 + Car $350 + Insurance $150 + Savings $500 + Debt $600 + Fun $500',
        'Irregular income (freelancer): Budget based on lowest month\'s income, save excess from high-income months'
      ],
      commonMistakes: [
        'Underestimating expenses - track everything for accurate picture',
        'Creating unrealistic budget that\'s impossible to follow',
        'Not accounting for irregular expenses (annual insurance, car maintenance)',
        'Giving up after first month instead of adjusting',
        'Budgeting what\'s left after spending instead of spending what\'s left after budgeting'
      ],
      tips: [
        'Track spending for one month before creating budget to understand patterns',
        'Start with actual numbers, not aspirational ones',
        'Use budgeting app (Mint, YNAB, EveryDollar) to automate tracking',
        'Build sinking funds for irregular expenses',
        'Review budget every month and adjust categories as needed',
        'Set realistic goals - cutting from $500 to $50 on dining out unlikely to stick',
        'Include category for fun/guilt-free spending to prevent budget burnout'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Personal Finance',
    topicName: 'Understanding Credit Scores',
    content: {
      title: 'Understanding Credit Scores',
      intro: 'Your credit score is a three-digit number (300-850) that represents your creditworthiness. It affects your ability to borrow money, interest rates you pay, and even employment and housing opportunities.',
      keyPoints: [
        'FICO score range: 300-850 (670-739 good, 740-799 very good, 800+ exceptional)',
        'Five factors: Payment history (35%), Amounts owed (30%), Length of history (15%), New credit (10%), Credit mix (10%)',
        'Payment history most important - never miss payments',
        'Credit utilization ratio (balance ÷ limit) should be under 30%, ideally under 10%',
        'Average age of accounts matters - don\'t close old cards',
        'Hard inquiries (credit applications) slightly lower score temporarily',
        'Check credit reports free annually at AnnualCreditReport.com',
        'Three bureaus: Experian, Equifax, TransUnion - scores may differ',
        'Building credit takes time - quick fixes don\'t exist',
        'Good credit saves thousands in lower interest rates'
      ],
      examples: [
        'Impact of score: $300K mortgage at 6% (700 score) = $1,799/month vs 7% (620 score) = $1,996/month - difference of $70K over 30 years!',
        'Building credit: Get secured credit card with $500 limit, charge $50/month (10% utilization), pay in full every month - score improves over 6-12 months',
        'Credit utilization: Have $10K total credit limit, carrying $4K balance = 40% utilization (hurts score). Pay down to $1K = 10% utilization (helps score)',
        'Length of history: Have 10-year-old card you don\'t use - keep it open! Closing it reduces average age of accounts and hurts score'
      ],
      commonMistakes: [
        'Carrying high balances thinking it helps credit - utilization should be low',
        'Closing old credit cards (reduces available credit and account age)',
        'Applying for multiple credit cards in short time (multiple hard inquiries)',
        'Only making minimum payments and carrying balances month-to-month',
        'Not checking credit reports for errors - 1 in 5 reports contain errors'
      ],
      tips: [
        'Set up automatic payments to never miss due dates',
        'Pay credit card balances in full every month if possible',
        'Request credit limit increases to improve utilization ratio',
        'Become authorized user on family member\'s old account with good history',
        'Dispute errors on credit report immediately',
        'Monitor credit score monthly with free tools (Credit Karma, Credit Sesame)',
        'Mix of credit types helps (credit card + installment loan) but don\'t take debt just for this',
        'Building good credit takes 6-12 months of responsible use'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Personal Finance',
    topicName: 'Index Funds and ETFs',
    content: {
      title: 'Index Funds and ETFs',
      intro: 'Index funds and ETFs (Exchange-Traded Funds) are investment vehicles that track market indexes, offering instant diversification and low costs. They are the foundation of modern passive investing strategies.',
      keyPoints: [
        'Index fund: Mutual fund designed to track specific market index (S&P 500, total stock market)',
        'ETF: Similar to index fund but trades like stock throughout day',
        'Both provide instant diversification across hundreds or thousands of securities',
        'Passive management = lower expense ratios than actively managed funds',
        'Historically, index funds outperform 80-90% of actively managed funds long-term',
        'Popular indexes: S&P 500 (500 large US companies), Total Stock Market (all US stocks), International, Bonds',
        'Expense ratios typically 0.03% - 0.20% vs 1% - 2% for active funds',
        'Key difference: Index funds trade once daily at NAV, ETFs trade continuously at market price',
        'Tax efficient - low turnover means fewer capital gains distributions',
        'Core-satellite strategy: Index funds as core, individual stocks/active funds as satellite'
      ],
      examples: [
        'Vanguard S&P 500 Index Fund (VFIAX): Tracks 500 largest US companies, expense ratio 0.04%, $3K minimum',
        'SPDR S&P 500 ETF (SPY): Same holdings as above, trades like stock, no minimum, slightly higher expenses',
        'Total market portfolio: 60% US stocks (VTI), 30% international stocks (VXUS), 10% bonds (BND) - instant global diversification',
        'Investing $500/month in S&P 500 index fund over 30 years at 10% average return = $1.1 million'
      ],
      commonMistakes: [
        'Trying to time the market - better to invest consistently regardless of market conditions',
        'Paying high expense ratios when low-cost options exist',
        'Picking too many index funds creating overlap and confusion',
        'Trading ETFs frequently incurring commission costs',
        'Abandoning strategy during market downturns instead of staying the course'
      ],
      tips: [
        'Start with simple three-fund portfolio: US stocks, international stocks, bonds',
        'Choose expense ratio under 0.20% - every 1% in fees costs ~25% of returns over 30 years',
        'Dollar-cost averaging: Invest same amount regularly regardless of price',
        'Rebalance annually to maintain target allocation',
        'For long-term investing (retirement), favor stock index funds',
        'In taxable accounts, prefer ETFs for tax efficiency',
        'Set up automatic investments to stay consistent'
      ]
    }
  },

  // Management and Leadership
  {
    categorySlug: 'business',
    subjectName: 'Management and Leadership',
    topicName: 'Goal Setting (SMART Goals)',
    content: {
      title: 'Goal Setting (SMART Goals)',
      intro: 'SMART goals transform vague aspirations into achievable objectives. This framework ensures goals are Specific, Measurable, Achievable, Relevant, and Time-bound - dramatically increasing likelihood of success.',
      keyPoints: [
        'S = Specific: Clear and well-defined, answers who, what, where, when, why',
        'M = Measurable: Quantifiable metrics to track progress and know when achieved',
        'A = Achievable: Realistic and attainable with available resources and time',
        'R = Relevant: Aligns with broader objectives and priorities',
        'T = Time-bound: Has deadline creating urgency and focus',
        'SMART goals provide clarity and direction',
        'Writing goals increases achievement likelihood by 42%',
        'Break large goals into smaller milestones',
        'Review goals regularly and adjust as needed',
        'Used in performance management, project planning, personal development'
      ],
      examples: [
        'Vague: "Increase sales" → SMART: "Increase monthly sales by 15% from $100K to $115K by Q4 through new email marketing campaign"',
        'Vague: "Get healthier" → SMART: "Exercise 30 minutes, 5 days per week for next 3 months, tracking in fitness app"',
        'Vague: "Improve customer service" → SMART: "Reduce average customer support response time from 24 hours to 4 hours by end of quarter by hiring 2 support staff"',
        'Vague: "Learn programming" → SMART: "Complete Python beginner course on Coursera and build 3 practice projects by December 31st"'
      ],
      commonMistakes: [
        'Setting too many goals at once - focus diluted',
        'Making goals too easy (not stretching) or impossible (demotivating)',
        'Lacking specific metrics - can\'t measure progress',
        'No deadline creating procrastination',
        'Setting goals not aligned with values and priorities'
      ],
      tips: [
        'Limit to 3-5 major goals at a time for focus',
        'Write goals down and review weekly',
        'Share goals with accountability partner or team',
        'Celebrate milestone achievements along the way',
        'Ask: "How will I know when I\'ve achieved this?" to ensure measurability',
        'Use OKR framework (Objectives and Key Results) for team goal-setting',
        'Review and revise goals quarterly - it\'s okay to adjust based on new information'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Management and Leadership',
    topicName: 'Motivation Theories (Maslow, Herzberg, McGregor)',
    content: {
      title: 'Motivation Theories: Maslow, Herzberg, McGregor',
      intro: 'Understanding what motivates people is crucial for effective leadership. Three foundational theories - Maslow\'s Hierarchy, Herzberg\'s Two-Factor Theory, and McGregor\'s Theory X and Y - provide frameworks for motivating employees.',
      keyPoints: [
        'Maslow\'s Hierarchy: 5 levels of needs - Physiological, Safety, Social, Esteem, Self-actualization',
        'People motivated by unfulfilled needs; must satisfy lower levels before higher levels',
        'Herzberg\'s Two Factors: Hygiene factors (prevent dissatisfaction) vs Motivators (create satisfaction)',
        'Hygiene factors: Salary, working conditions, policies - absence causes dissatisfaction',
        'Motivators: Achievement, recognition, responsibility, growth - presence creates satisfaction',
        'McGregor Theory X: Assumes people dislike work, need control and direction',
        'McGregor Theory Y: Assumes people are self-motivated, seek responsibility, creative',
        'Management style should match theory - X leads to micromanagement, Y to empowerment',
        'Modern research supports Theory Y approach for knowledge workers',
        'Effective leaders combine insights from all theories'
      ],
      examples: [
        'Maslow applied: Employee worried about job security (safety need) won\'t focus on creative projects (self-actualization) until security addressed',
        'Herzberg applied: Giving raise (hygiene factor) prevents dissatisfaction temporarily, but giving challenging project (motivator) creates lasting engagement',
        'Theory X manager: Strict supervision, time clocks, detailed procedures, assumes employees will slack off if not watched',
        'Theory Y manager: Flexible work arrangements, trust-based culture, employee empowerment, assumes employees are self-directed'
      ],
      commonMistakes: [
        'Assuming money is primary motivator - often recognition and growth more important',
        'Trying to motivate with hygiene factors alone (better office, higher pay) without true motivators',
        'Applying Theory X when Theory Y appropriate for knowledge workers',
        'Ignoring that different people motivated by different things',
        'Not recognizing that motivation factors change over time and circumstances'
      ],
      tips: [
        'Use Maslow to understand hierarchy - address basic needs before higher ones',
        'Focus on motivators (recognition, growth, autonomy) for long-term engagement',
        'Ensure hygiene factors are adequate to prevent dissatisfaction',
        'Default to Theory Y assumptions - most people want to do good work',
        'Provide opportunities for achievement and recognition',
        'Give employees autonomy and meaningful work',
        'Ask employees directly what motivates them - don\'t assume'
      ]
    }
  },

  // Career Development
  {
    categorySlug: 'business',
    subjectName: 'Career Development',
    topicName: 'Resume Writing',
    content: {
      title: 'Resume Writing',
      intro: 'Your resume is your marketing document - a concise summary of your skills, experience, and achievements designed to get you an interview. A well-crafted resume can be the difference between landing your dream job and being overlooked.',
      keyPoints: [
        'Standard sections: Contact info, Summary/Objective, Experience, Education, Skills',
        'Keep to 1 page for most roles (2 pages if 10+ years experience)',
        'Use reverse chronological order - most recent experience first',
        'Focus on achievements and results, not just duties',
        'Quantify accomplishments with numbers, percentages, dollar amounts',
        'Tailor resume to each job - match keywords from job description',
        'Use action verbs: achieved, managed, developed, increased, implemented',
        'Clean, professional formatting - consistent fonts, spacing, bullet points',
        'No photos, personal pronouns (I, me), or irrelevant personal information',
        'ATS (Applicant Tracking System) friendly - avoid graphics, tables, unusual formatting'
      ],
      examples: [
        'Weak: "Responsible for sales" → Strong: "Increased regional sales 35% ($2.1M to $2.8M) in 18 months through consultative selling approach"',
        'Weak: "Managed social media" → Strong: "Grew Instagram following from 5K to 50K in 6 months, driving 200% increase in website traffic"',
        'Weak: "Worked with customers" → Strong: "Resolved 95% of customer issues on first contact, improving satisfaction scores from 3.2 to 4.6/5.0"',
        'Skills section: "Python, SQL, Tableau, Excel (pivot tables, VLOOKUP), Project Management" - specific, relevant skills'
      ],
      commonMistakes: [
        'Listing duties instead of accomplishments',
        'Using same generic resume for every application',
        'Including irrelevant work experience from 15+ years ago',
        'Spelling and grammar errors - instant rejection',
        'Overly creative formatting that confuses ATS systems',
        'Lying or exaggerating - easily discovered and ruins credibility'
      ],
      tips: [
        'Start each bullet with strong action verb',
        'Use CAR format: Challenge, Action, Result',
        'Include numbers wherever possible to demonstrate impact',
        'Match keywords from job posting naturally throughout resume',
        'Have 3 people proofread before submitting',
        'Save as PDF to preserve formatting',
        'File name: FirstName_LastName_Resume.pdf',
        'Update resume even when not job searching to capture achievements fresh'
      ]
    }
  },
  {
    categorySlug: 'business',
    subjectName: 'Career Development',
    topicName: 'Salary Negotiation',
    content: {
      title: 'Salary Negotiation',
      intro: 'Negotiating salary is one of the highest-ROI skills you can develop. A single successful negotiation can result in thousands of dollars in additional compensation annually and compound over your career.',
      keyPoints: [
        'Research market rates using Glassdoor, PayScale, Levels.fyi before negotiating',
        'Consider total compensation: base salary, bonus, equity, benefits, PTO, remote work',
        'Let employer make first offer when possible',
        'Never accept first offer - almost always room to negotiate',
        'Anchor high but reasonable based on research',
        'Provide specific number or range with justification',
        'Emphasize value you bring, not what you need',
        'Get offer in writing before accepting',
        'Be prepared to walk away if offer doesn\'t meet minimum',
        'Negotiating is expected and won\'t cause offer to be rescinded if done professionally'
      ],
      examples: [
        'Initial offer $70K: "Based on my research and experience with [specific skills], I was expecting $80-85K. Can we work toward $82K?"',
        'Counter on total comp: "While base is lower than expected, could we discuss sign-on bonus, extra PTO, or earlier equity vesting?"',
        'Multiple offers: "I have another offer at $90K, but I prefer this role. Can you match or come closer to that number?"',
        'Internal promotion: "This role typically pays $X-Y. Given my performance (cite specific achievements), I believe $Y is appropriate."'
      ],
      commonMistakes: [
        'Accepting first offer without negotiating',
        'Revealing current/desired salary too early in process',
        'Negotiating based on personal needs ("I need X for my mortgage") instead of market value',
        'Being too aggressive or combative in approach',
        'Not researching market rates beforehand',
        'Forgetting to negotiate other benefits beyond base salary'
      ],
      tips: [
        'Practice negotiation conversation with friend beforehand',
        'Show enthusiasm for role while negotiating - not mutually exclusive',
        'Ask: "Is there flexibility in the offer?" to open negotiation',
        'If they can\'t budge on salary, negotiate PTO, signing bonus, review timeline, title, remote work',
        'Silence is powerful - state your number then wait for response',
        'Get all terms in writing before resigning current job',
        'Consider long-term: equity vesting, promotion path, skill development',
        'Women and minorities often negotiated less - level playing field by always negotiating professionally'
      ]
    }
  }
]

/**
 * Get pre-generated note by category, subject, and topic
 */
export function getPregeneratedNote(
  categorySlug: string,
  subjectName: string,
  topicName: string
): PregeneratedNote | undefined {
  return pregeneratedNotes.find(
    note =>
      note.categorySlug === categorySlug &&
      note.subjectName === subjectName &&
      note.topicName === topicName
  )
}

/**
 * Check if a topic has pre-generated notes
 */
export function hasPregeneratedNote(
  categorySlug: string,
  subjectName: string,
  topicName: string
): boolean {
  return getPregeneratedNote(categorySlug, subjectName, topicName) !== undefined
}

/**
 * Get all pre-generated notes for a subject
 */
export function getSubjectPregeneratedNotes(
  categorySlug: string,
  subjectName: string
): PregeneratedNote[] {
  return pregeneratedNotes.filter(
    note =>
      note.categorySlug === categorySlug &&
      note.subjectName === subjectName
  )
}
