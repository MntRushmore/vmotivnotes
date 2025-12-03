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
  }

  // Continue with more topics... (This is a starting template showing the structure)
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
