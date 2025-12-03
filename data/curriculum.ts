export interface Topic {
  name: string
  description?: string
}

export interface Subject {
  name: string
  description: string
  topics: Topic[]
}

export interface Category {
  name: string
  emoji: string
  description: string
  slug: string
  subjects: Subject[]
}

export const curriculum: Category[] = [
  {
    name: 'Mathematics',
    emoji: '📐',
    description: 'Pure and applied mathematics from fundamentals to advanced topics',
    slug: 'mathematics',
    subjects: [
      {
        name: 'Pre-Algebra',
        description: 'Foundation of algebraic thinking and operations',
        topics: [
          { name: 'Variables and Expressions' },
          { name: 'Solving Equations' },
          { name: 'Ratios and Proportions' },
          { name: 'Percentages and Decimals' },
          { name: 'Order of Operations' },
          { name: 'Integers and Absolute Value' },
          { name: 'Fractions and Mixed Numbers' },
          { name: 'Greatest Common Factor (GCF)' },
          { name: 'Least Common Multiple (LCM)' },
          { name: 'Prime Factorization' },
          { name: 'Exponents and Powers' },
          { name: 'Square Roots and Cube Roots' },
          { name: 'Negative Numbers and Operations' },
          { name: 'Properties of Operations (Commutative, Associative, Distributive)' },
          { name: 'Evaluating Algebraic Expressions' },
          { name: 'Combining Like Terms' },
          { name: 'One-Step and Two-Step Equations' },
          { name: 'Multi-Step Equations' },
          { name: 'Inequalities on Number Lines' },
          { name: 'Unit Rates and Unit Prices' },
          { name: 'Scale Drawings and Maps' },
          { name: 'Converting Units of Measurement' }
        ]
      },
      {
        name: 'Algebra 1',
        description: 'Linear equations, functions, and polynomials',
        topics: [
          { name: 'Linear Equations and Inequalities' },
          { name: 'Graphing Linear Functions' },
          { name: 'Systems of Equations' },
          { name: 'Quadratic Functions' },
          { name: 'Polynomials and Factoring' },
          { name: 'Exponents and Radicals' },
          { name: 'Slope and Y-Intercept' },
          { name: 'Point-Slope Form' },
          { name: 'Slope-Intercept Form' },
          { name: 'Standard Form of a Line' },
          { name: 'Parallel and Perpendicular Lines' },
          { name: 'Writing Equations from Word Problems' },
          { name: 'Absolute Value Equations' },
          { name: 'Compound Inequalities' },
          { name: 'Solving and Graphing Inequalities' },
          { name: 'Systems of Inequalities' },
          { name: 'Solving Systems by Substitution' },
          { name: 'Solving Systems by Elimination' },
          { name: 'Graphing Systems of Equations' },
          { name: 'Domain and Range' },
          { name: 'Function Notation' },
          { name: 'Evaluating Functions' },
          { name: 'Adding and Subtracting Polynomials' },
          { name: 'Multiplying Polynomials' },
          { name: 'Factoring Trinomials' },
          { name: 'Difference of Squares' },
          { name: 'Perfect Square Trinomials' },
          { name: 'Solving Quadratic Equations by Factoring' },
          { name: 'Quadratic Formula' },
          { name: 'Completing the Square' },
          { name: 'Graphing Parabolas' },
          { name: 'Properties of Exponents' },
          { name: 'Scientific Notation' },
          { name: 'Simplifying Radical Expressions' },
          { name: 'Operations with Radicals' }
        ]
      },
      {
        name: 'Algebra 2',
        description: 'Advanced algebraic concepts and functions',
        topics: [
          { name: 'Polynomial Functions' },
          { name: 'Exponential and Logarithmic Functions' },
          { name: 'Rational Functions' },
          { name: 'Complex Numbers' },
          { name: 'Sequences and Series' },
          { name: 'Conic Sections' }
        ]
      },
      {
        name: 'Geometry',
        description: 'Shapes, proofs, and spatial reasoning',
        topics: [
          { name: 'Lines and Angles' },
          { name: 'Triangles and Congruence' },
          { name: 'Circles and Arc Length' },
          { name: 'Area and Perimeter' },
          { name: 'Volume and Surface Area' },
          { name: 'Coordinate Geometry' },
          { name: 'Transformations' },
          { name: 'Geometric Proofs' },
          { name: 'Points, Lines, and Planes' },
          { name: 'Parallel and Perpendicular Lines' },
          { name: 'Angle Relationships (Complementary, Supplementary, Vertical)' },
          { name: 'Triangle Angle Sum Theorem' },
          { name: 'Exterior Angle Theorem' },
          { name: 'Isosceles and Equilateral Triangles' },
          { name: 'Triangle Inequality Theorem' },
          { name: 'SSS, SAS, ASA, AAS Congruence' },
          { name: 'Similar Triangles' },
          { name: 'Pythagorean Theorem' },
          { name: 'Special Right Triangles (30-60-90, 45-45-90)' },
          { name: 'Quadrilaterals (Parallelograms, Rectangles, Rhombi, Trapezoids)' },
          { name: 'Properties of Polygons' },
          { name: 'Circle Theorems' },
          { name: 'Chords, Secants, and Tangents' },
          { name: 'Circle Sectors and Segments' },
          { name: 'Area of Triangles, Rectangles, and Trapezoids' },
          { name: 'Area of Circles and Composite Figures' },
          { name: 'Surface Area of Prisms and Cylinders' },
          { name: 'Surface Area of Pyramids and Cones' },
          { name: 'Volume of Prisms and Cylinders' },
          { name: 'Volume of Pyramids, Cones, and Spheres' },
          { name: 'Distance Formula' },
          { name: 'Midpoint Formula' },
          { name: 'Translations, Rotations, and Reflections' },
          { name: 'Dilations and Scale Factor' },
          { name: 'Two-Column Proofs' },
          { name: 'Paragraph Proofs' }
        ]
      },
      {
        name: 'Trigonometry',
        description: 'Angles, triangles, and periodic functions',
        topics: [
          { name: 'Right Triangle Trigonometry' },
          { name: 'Unit Circle' },
          { name: 'Trigonometric Functions' },
          { name: 'Inverse Trigonometric Functions' },
          { name: 'Trigonometric Identities' },
          { name: 'Law of Sines and Cosines' }
        ]
      },
      {
        name: 'Pre-Calculus',
        description: 'Bridge to calculus concepts',
        topics: [
          { name: 'Functions and Transformations' },
          { name: 'Polynomial and Rational Functions' },
          { name: 'Limits and Continuity' },
          { name: 'Sequences and Series' },
          { name: 'Parametric Equations' },
          { name: 'Polar Coordinates' }
        ]
      },
      {
        name: 'AP Calculus AB',
        description: 'Introductory differential and integral calculus',
        topics: [
          { name: 'Limits and Continuity' },
          { name: 'Derivatives and Rules' },
          { name: 'Applications of Derivatives' },
          { name: 'Definite and Indefinite Integrals' },
          { name: 'Fundamental Theorem of Calculus' },
          { name: 'Applications of Integrals' }
        ]
      },
      {
        name: 'AP Calculus BC',
        description: 'Advanced calculus topics',
        topics: [
          { name: 'Parametric and Polar Equations' },
          { name: 'Vector Functions' },
          { name: 'Series Convergence and Divergence' },
          { name: 'Taylor and Maclaurin Series' },
          { name: 'Integration Techniques' },
          { name: 'Differential Equations' }
        ]
      },
      {
        name: 'Multivariable Calculus',
        description: 'Calculus in higher dimensions',
        topics: [
          { name: 'Partial Derivatives' },
          { name: 'Multiple Integrals' },
          { name: 'Vector Fields' },
          { name: 'Line and Surface Integrals' },
          { name: 'Green\'s and Stokes\' Theorems' }
        ]
      },
      {
        name: 'Linear Algebra',
        description: 'Vectors, matrices, and linear transformations',
        topics: [
          { name: 'Matrices and Determinants' },
          { name: 'Vector Spaces' },
          { name: 'Linear Transformations' },
          { name: 'Eigenvalues and Eigenvectors' },
          { name: 'Orthogonality' }
        ]
      },
      {
        name: 'Statistics',
        description: 'Data analysis and probability',
        topics: [
          { name: 'Descriptive Statistics' },
          { name: 'Probability Distributions' },
          { name: 'Sampling and Inference' },
          { name: 'Hypothesis Testing' },
          { name: 'Regression Analysis' },
          { name: 'Confidence Intervals' }
        ]
      },
      {
        name: 'Discrete Mathematics',
        description: 'Logic, sets, and combinatorics',
        topics: [
          { name: 'Logic and Proofs' },
          { name: 'Set Theory' },
          { name: 'Combinatorics' },
          { name: 'Graph Theory' },
          { name: 'Number Theory' },
          { name: 'Algorithms' }
        ]
      }
    ]
  },
  {
    name: 'Science',
    emoji: '🔬',
    description: 'Natural sciences exploring the physical and living world',
    slug: 'science',
    subjects: [
      {
        name: 'General Biology',
        description: 'Fundamentals of living organisms',
        topics: [
          { name: 'Cell Structure and Function' },
          { name: 'Cell Division: Mitosis and Meiosis' },
          { name: 'DNA and Genetics' },
          { name: 'Evolution and Natural Selection' },
          { name: 'Ecology and Ecosystems' },
          { name: 'Classification of Life' },
          { name: 'Prokaryotic vs Eukaryotic Cells' },
          { name: 'Cell Membrane and Transport' },
          { name: 'Organelles and Their Functions' },
          { name: 'Photosynthesis Overview' },
          { name: 'Cellular Respiration Overview' },
          { name: 'The Cell Cycle' },
          { name: 'Cancer and Cell Cycle Regulation' },
          { name: 'Mendel\'s Laws of Inheritance' },
          { name: 'Punnett Squares and Genetics Problems' },
          { name: 'DNA Structure and Replication' },
          { name: 'RNA and Protein Synthesis' },
          { name: 'Mutations and Genetic Variation' },
          { name: 'Adaptations and Fitness' },
          { name: 'Evidence for Evolution' },
          { name: 'Speciation and Biodiversity' },
          { name: 'Food Chains and Food Webs' },
          { name: 'Energy Flow in Ecosystems' },
          { name: 'Nutrient Cycles (Carbon, Nitrogen, Water)' },
          { name: 'Biomes and Climate' },
          { name: 'Population Ecology' },
          { name: 'Human Impact on Ecosystems' },
          { name: 'Six Kingdoms of Life' },
          { name: 'Taxonomy and Binomial Nomenclature' },
          { name: 'Viruses and Bacteria' },
          { name: 'Plant Structure and Function' },
          { name: 'Animal Systems Overview' },
          { name: 'Human Body Systems' }
        ]
      },
      {
        name: 'AP Biology',
        description: 'Advanced biological concepts and processes',
        topics: [
          { name: 'Biochemistry and Macromolecules' },
          { name: 'Cellular Processes and Energy' },
          { name: 'Photosynthesis' },
          { name: 'Cellular Respiration' },
          { name: 'Molecular Genetics' },
          { name: 'Gene Expression and Regulation' },
          { name: 'Biotechnology' },
          { name: 'Population Dynamics' },
          { name: 'Water and Its Properties' },
          { name: 'Carbohydrates, Lipids, Proteins, Nucleic Acids' },
          { name: 'Enzyme Structure and Function' },
          { name: 'Enzyme Kinetics and Inhibition' },
          { name: 'Cell Membrane Structure (Fluid Mosaic Model)' },
          { name: 'Passive Transport (Diffusion, Osmosis)' },
          { name: 'Active Transport and Bulk Transport' },
          { name: 'Cell Communication and Signal Transduction' },
          { name: 'Light-Dependent and Light-Independent Reactions' },
          { name: 'Glycolysis, Krebs Cycle, Electron Transport Chain' },
          { name: 'Fermentation (Lactic Acid and Alcoholic)' },
          { name: 'DNA Replication in Detail' },
          { name: 'Transcription and RNA Processing' },
          { name: 'Translation and the Genetic Code' },
          { name: 'Gene Regulation in Prokaryotes (Operon Model)' },
          { name: 'Gene Regulation in Eukaryotes' },
          { name: 'Mutations and Their Effects' },
          { name: 'Viral Replication and Infection' },
          { name: 'Recombinant DNA and Genetic Engineering' },
          { name: 'PCR and Gel Electrophoresis' },
          { name: 'CRISPR and Gene Editing' },
          { name: 'Genomics and Bioinformatics' },
          { name: 'Hardy-Weinberg Equilibrium' },
          { name: 'Natural Selection and Microevolution' },
          { name: 'Phylogenetic Trees and Cladograms' },
          { name: 'Origin of Life Theories' },
          { name: 'Population Growth Models' },
          { name: 'Community Ecology and Species Interactions' },
          { name: 'Succession and Ecosystem Changes' },
          { name: 'Animal Behavior and Ethology' },
          { name: 'Immune System Response' },
          { name: 'Nervous System Structure and Function' },
          { name: 'Endocrine System and Hormones' }
        ]
      },
      {
        name: 'General Chemistry',
        description: 'Matter, atoms, and chemical reactions',
        topics: [
          { name: 'Atomic Structure' },
          { name: 'Periodic Table Trends' },
          { name: 'Chemical Bonding' },
          { name: 'Stoichiometry' },
          { name: 'States of Matter' },
          { name: 'Solutions and Concentration' },
          { name: 'Acids and Bases' },
          { name: 'Matter: Elements, Compounds, Mixtures' },
          { name: 'Physical vs Chemical Changes' },
          { name: 'Atoms: Protons, Neutrons, Electrons' },
          { name: 'Isotopes and Atomic Mass' },
          { name: 'Electron Configuration' },
          { name: 'Quantum Numbers and Orbitals' },
          { name: 'Periodic Trends (Ionization Energy, Electronegativity, Atomic Radius)' },
          { name: 'Ionic Bonding and Ionic Compounds' },
          { name: 'Covalent Bonding and Molecular Compounds' },
          { name: 'Lewis Dot Structures' },
          { name: 'VSEPR Theory and Molecular Geometry' },
          { name: 'Polarity and Intermolecular Forces' },
          { name: 'Metallic Bonding' },
          { name: 'Balancing Chemical Equations' },
          { name: 'Mole Concept and Avogadro\'s Number' },
          { name: 'Molar Mass Calculations' },
          { name: 'Limiting Reactant Problems' },
          { name: 'Percent Yield' },
          { name: 'Gas Laws (Boyle\'s, Charles\'s, Gay-Lussac\'s)' },
          { name: 'Ideal Gas Law' },
          { name: 'Dalton\'s Law of Partial Pressures' },
          { name: 'Kinetic Molecular Theory' },
          { name: 'Phase Diagrams and Phase Changes' },
          { name: 'Molarity and Solution Preparation' },
          { name: 'Dilution Calculations' },
          { name: 'Solubility and Precipitation' },
          { name: 'Colligative Properties' },
          { name: 'pH and pOH Calculations' },
          { name: 'Strong vs Weak Acids and Bases' },
          { name: 'Neutralization Reactions' },
          { name: 'Buffer Solutions' },
          { name: 'Oxidation-Reduction Reactions' },
          { name: 'Balancing Redox Equations' },
          { name: 'Types of Chemical Reactions' }
        ]
      },
      {
        name: 'AP Chemistry',
        description: 'Advanced chemistry principles',
        topics: [
          { name: 'Chemical Equilibrium' },
          { name: 'Thermodynamics' },
          { name: 'Electrochemistry' },
          { name: 'Chemical Kinetics' },
          { name: 'Acid-Base Equilibria' },
          { name: 'Redox Reactions' },
          { name: 'Quantum Mechanics Basics' }
        ]
      },
      {
        name: 'Organic Chemistry',
        description: 'Carbon-based compounds and reactions',
        topics: [
          { name: 'Hydrocarbons and Functional Groups' },
          { name: 'Nomenclature' },
          { name: 'Stereochemistry' },
          { name: 'Nucleophilic Substitution' },
          { name: 'Elimination Reactions' },
          { name: 'Addition Reactions' }
        ]
      },
      {
        name: 'General Physics',
        description: 'Motion, forces, and energy',
        topics: [
          { name: 'Kinematics and Motion' },
          { name: 'Newton\'s Laws of Motion' },
          { name: 'Energy and Work' },
          { name: 'Momentum and Collisions' },
          { name: 'Waves and Sound' },
          { name: 'Light and Optics' },
          { name: 'Distance, Displacement, Speed, and Velocity' },
          { name: 'Acceleration and Free Fall' },
          { name: 'Motion Graphs (Position, Velocity, Acceleration vs Time)' },
          { name: 'Projectile Motion' },
          { name: 'Forces and Net Force' },
          { name: 'Newton\'s First Law (Inertia)' },
          { name: 'Newton\'s Second Law (F=ma)' },
          { name: 'Newton\'s Third Law (Action-Reaction)' },
          { name: 'Friction (Static and Kinetic)' },
          { name: 'Normal Force and Tension' },
          { name: 'Weight and Mass' },
          { name: 'Inclined Planes' },
          { name: 'Work and Energy Theorem' },
          { name: 'Kinetic Energy' },
          { name: 'Potential Energy (Gravitational and Elastic)' },
          { name: 'Conservation of Energy' },
          { name: 'Power' },
          { name: 'Simple Machines and Mechanical Advantage' },
          { name: 'Impulse and Momentum' },
          { name: 'Conservation of Momentum' },
          { name: 'Elastic and Inelastic Collisions' },
          { name: 'Wave Properties (Amplitude, Wavelength, Frequency)' },
          { name: 'Wave Speed Equation' },
          { name: 'Sound Waves and the Doppler Effect' },
          { name: 'Reflection, Refraction, and Diffraction' },
          { name: 'Mirrors and Lenses' },
          { name: 'Electromagnetic Spectrum' },
          { name: 'Basic Electricity and Circuits' },
          { name: 'Static Electricity and Electric Charge' },
          { name: 'Magnetism and Magnetic Fields' },
          { name: 'Heat and Temperature' },
          { name: 'Thermal Energy Transfer' }
        ]
      },
      {
        name: 'AP Physics 1',
        description: 'Algebra-based mechanics and waves',
        topics: [
          { name: 'Kinematics' },
          { name: 'Dynamics and Forces' },
          { name: 'Circular Motion and Gravitation' },
          { name: 'Simple Harmonic Motion' },
          { name: 'Rotational Motion' },
          { name: 'Mechanical Waves' }
        ]
      },
      {
        name: 'AP Physics 2',
        description: 'Electricity, magnetism, and modern physics',
        topics: [
          { name: 'Thermodynamics' },
          { name: 'Electrostatics' },
          { name: 'Circuits' },
          { name: 'Magnetism' },
          { name: 'Optics' },
          { name: 'Quantum Physics and Atomic Structure' }
        ]
      },
      {
        name: 'AP Physics C: Mechanics',
        description: 'Calculus-based classical mechanics',
        topics: [
          { name: 'Kinematics with Calculus' },
          { name: 'Newton\'s Laws' },
          { name: 'Work and Energy' },
          { name: 'Rotational Dynamics' },
          { name: 'Oscillations' },
          { name: 'Gravitation' }
        ]
      },
      {
        name: 'AP Physics C: Electricity and Magnetism',
        description: 'Calculus-based E&M',
        topics: [
          { name: 'Electrostatics and Gauss\'s Law' },
          { name: 'Electric Potential' },
          { name: 'Capacitance' },
          { name: 'Current and Resistance' },
          { name: 'Magnetic Fields' },
          { name: 'Electromagnetic Induction' }
        ]
      },
      {
        name: 'Environmental Science',
        description: 'Earth systems and sustainability',
        topics: [
          { name: 'Ecosystems and Biodiversity' },
          { name: 'Climate Change' },
          { name: 'Water and Air Pollution' },
          { name: 'Renewable vs Non-renewable Energy' },
          { name: 'Soil and Agriculture' },
          { name: 'Conservation Biology' }
        ]
      },
      {
        name: 'Astronomy',
        description: 'Stars, planets, and the universe',
        topics: [
          { name: 'Solar System' },
          { name: 'Stars and Stellar Evolution' },
          { name: 'Galaxies and Cosmology' },
          { name: 'Telescopes and Observation' },
          { name: 'Planetary Motion' }
        ]
      }
    ]
  },
  {
    name: 'Computer Science',
    emoji: '💻',
    description: 'Programming, algorithms, and computational thinking',
    slug: 'computer-science',
    subjects: [
      {
        name: 'Programming Fundamentals',
        description: 'Core programming concepts for beginners',
        topics: [
          { name: 'Variables and Data Types' },
          { name: 'Control Structures (If/Else, Loops)' },
          { name: 'Functions and Methods' },
          { name: 'Input and Output' },
          { name: 'Debugging Techniques' },
          { name: 'Pseudocode and Flowcharts' },
          { name: 'Introduction to Programming' },
          { name: 'Integers, Floats, Strings, Booleans' },
          { name: 'Variable Assignment and Naming Conventions' },
          { name: 'Type Conversion and Casting' },
          { name: 'Arithmetic Operators' },
          { name: 'Comparison and Logical Operators' },
          { name: 'If, Elif, Else Statements' },
          { name: 'For Loops and While Loops' },
          { name: 'Nested Loops' },
          { name: 'Break and Continue Statements' },
          { name: 'Defining Functions' },
          { name: 'Function Parameters and Return Values' },
          { name: 'Scope and Global vs Local Variables' },
          { name: 'Lists and Arrays' },
          { name: 'Dictionaries and Hash Maps' },
          { name: 'String Manipulation' },
          { name: 'Reading from and Writing to Files' },
          { name: 'User Input and Console Output' },
          { name: 'Common Syntax Errors' },
          { name: 'Runtime Errors and Exceptions' },
          { name: 'Using Print Statements for Debugging' },
          { name: 'Writing Clean and Readable Code' },
          { name: 'Comments and Documentation' },
          { name: 'Basic Algorithm Design' }
        ]
      },
      {
        name: 'AP Computer Science A',
        description: 'Java programming and object-oriented design',
        topics: [
          { name: 'Java Basics and Syntax' },
          { name: 'Object-Oriented Programming' },
          { name: 'Inheritance and Polymorphism' },
          { name: 'Arrays and ArrayLists' },
          { name: 'Recursion' },
          { name: 'Searching and Sorting' },
          { name: 'Variables, Data Types, and Operators' },
          { name: 'If Statements and Boolean Logic' },
          { name: 'For, While, and Enhanced For Loops' },
          { name: 'String Methods and Processing' },
          { name: 'Math Class and Random Numbers' },
          { name: 'Writing Methods with Parameters and Return Types' },
          { name: 'Classes and Objects' },
          { name: 'Instance Variables and Methods' },
          { name: 'Constructors' },
          { name: 'Encapsulation and Access Modifiers (Public, Private)' },
          { name: 'this Keyword' },
          { name: 'Static vs Instance Members' },
          { name: 'Inheritance and Extends Keyword' },
          { name: 'Superclass and Subclass Relationships' },
          { name: 'Method Overriding' },
          { name: 'Polymorphism and Dynamic Binding' },
          { name: 'Abstract Classes and Interfaces' },
          { name: 'One-Dimensional Arrays' },
          { name: 'Traversing Arrays' },
          { name: 'ArrayList Methods (add, remove, get, set, size)' },
          { name: 'ArrayList Algorithms' },
          { name: 'Two-Dimensional Arrays' },
          { name: 'Recursive Methods and Base Cases' },
          { name: 'Recursive Searching and Traversal' },
          { name: 'Linear Search' },
          { name: 'Binary Search' },
          { name: 'Selection Sort' },
          { name: 'Insertion Sort' },
          { name: 'Merge Sort' },
          { name: 'Algorithm Efficiency' }
        ]
      },
      {
        name: 'AP Computer Science Principles',
        description: 'Computational thinking and digital literacy',
        topics: [
          { name: 'Binary and Data Representation' },
          { name: 'Internet and Networks' },
          { name: 'Cybersecurity Basics' },
          { name: 'Programming with Pseudocode' },
          { name: 'Algorithms and Efficiency' },
          { name: 'Impact of Computing' }
        ]
      },
      {
        name: 'Data Structures',
        description: 'Organizing and storing data efficiently',
        topics: [
          { name: 'Arrays and Dynamic Arrays' },
          { name: 'Linked Lists' },
          { name: 'Stacks and Queues' },
          { name: 'Trees (Binary, BST, AVL)' },
          { name: 'Graphs' },
          { name: 'Hash Tables' },
          { name: 'Heaps and Priority Queues' }
        ]
      },
      {
        name: 'Algorithms',
        description: 'Problem-solving and computational efficiency',
        topics: [
          { name: 'Big O Notation' },
          { name: 'Sorting Algorithms (Merge, Quick, Heap)' },
          { name: 'Searching Algorithms (Binary Search, DFS, BFS)' },
          { name: 'Graph Algorithms (Dijkstra, Floyd-Warshall)' },
          { name: 'Dynamic Programming' },
          { name: 'Greedy Algorithms' },
          { name: 'Divide and Conquer' }
        ]
      },
      {
        name: 'Web Development',
        description: 'Building websites and web applications',
        topics: [
          { name: 'HTML Fundamentals' },
          { name: 'CSS Styling and Layout' },
          { name: 'JavaScript Basics' },
          { name: 'DOM Manipulation' },
          { name: 'Responsive Design' },
          { name: 'Front-end Frameworks (React, Vue)' }
        ]
      },
      {
        name: 'Databases',
        description: 'Storing and querying structured data',
        topics: [
          { name: 'Relational Databases' },
          { name: 'SQL Queries' },
          { name: 'Database Design and Normalization' },
          { name: 'Indexes and Optimization' },
          { name: 'NoSQL Databases' }
        ]
      },
      {
        name: 'Cybersecurity',
        description: 'Protecting systems and data',
        topics: [
          { name: 'Encryption and Cryptography' },
          { name: 'Authentication and Authorization' },
          { name: 'Network Security' },
          { name: 'Ethical Hacking Basics' },
          { name: 'Common Vulnerabilities (SQL Injection, XSS)' }
        ]
      }
    ]
  },
  {
    name: 'English & Literature',
    emoji: '📚',
    description: 'Reading, writing, and literary analysis',
    slug: 'english',
    subjects: [
      {
        name: 'Grammar and Writing',
        description: 'Fundamental language mechanics',
        topics: [
          { name: 'Parts of Speech' },
          { name: 'Sentence Structure' },
          { name: 'Punctuation and Capitalization' },
          { name: 'Paragraph Writing' },
          { name: 'Essay Structure' },
          { name: 'Thesis Statements' },
          { name: 'Nouns (Common, Proper, Collective, Abstract)' },
          { name: 'Pronouns (Personal, Possessive, Relative, Indefinite)' },
          { name: 'Verbs (Action, Linking, Helping)' },
          { name: 'Verb Tenses (Past, Present, Future, Perfect)' },
          { name: 'Adjectives and Adverbs' },
          { name: 'Prepositions and Prepositional Phrases' },
          { name: 'Conjunctions (Coordinating, Subordinating, Correlative)' },
          { name: 'Interjections' },
          { name: 'Subject and Predicate' },
          { name: 'Simple, Compound, and Complex Sentences' },
          { name: 'Sentence Fragments and Run-Ons' },
          { name: 'Subject-Verb Agreement' },
          { name: 'Pronoun-Antecedent Agreement' },
          { name: 'Parallel Structure' },
          { name: 'Commas, Semicolons, and Colons' },
          { name: 'Apostrophes and Quotation Marks' },
          { name: 'Hyphens and Dashes' },
          { name: 'Capitalization Rules' },
          { name: 'Topic Sentences' },
          { name: 'Supporting Details and Evidence' },
          { name: 'Transitions Between Sentences' },
          { name: 'Concluding Sentences' },
          { name: 'Introduction Paragraphs' },
          { name: 'Body Paragraphs' },
          { name: 'Conclusion Paragraphs' },
          { name: 'Five-Paragraph Essay Structure' },
          { name: 'Writing Strong Thesis Statements' },
          { name: 'Hooks and Attention Grabbers' },
          { name: 'Narrative Writing Techniques' },
          { name: 'Descriptive Writing Techniques' },
          { name: 'Persuasive Writing Techniques' },
          { name: 'Expository Writing' },
          { name: 'Revising and Editing' },
          { name: 'Peer Review and Feedback' }
        ]
      },
      {
        name: 'AP Language and Composition',
        description: 'Rhetorical analysis and argumentation',
        topics: [
          { name: 'Rhetorical Analysis' },
          { name: 'Argument Essays' },
          { name: 'Synthesis Essays' },
          { name: 'Ethos, Pathos, Logos' },
          { name: 'Tone and Diction' },
          { name: 'Citing Sources' },
          { name: 'Identifying Rhetorical Strategies' },
          { name: 'SOAPSTone Analysis (Speaker, Occasion, Audience, Purpose, Subject, Tone)' },
          { name: 'Analyzing Argumentative Texts' },
          { name: 'Appeals to Emotion, Logic, and Credibility' },
          { name: 'Rhetorical Devices (Metaphor, Analogy, Parallelism, Repetition)' },
          { name: 'Syntax and Sentence Structure Analysis' },
          { name: 'Diction and Word Choice' },
          { name: 'Imagery and Figurative Language' },
          { name: 'Developing a Thesis for Rhetorical Analysis' },
          { name: 'Writing Claims and Counterclaims' },
          { name: 'Using Evidence Effectively' },
          { name: 'Building Logical Arguments' },
          { name: 'Addressing Counterarguments' },
          { name: 'Synthesis of Multiple Sources' },
          { name: 'Evaluating Source Credibility' },
          { name: 'Integrating Quotes and Paraphrases' },
          { name: 'MLA and APA Citation Formats' },
          { name: 'Avoiding Plagiarism' },
          { name: 'Writing Under Timed Conditions' },
          { name: 'Multiple Choice Reading Strategies' },
          { name: 'Close Reading Techniques' }
        ]
      },
      {
        name: 'AP Literature',
        description: 'Literary interpretation and criticism',
        topics: [
          { name: 'Poetry Analysis' },
          { name: 'Prose Fiction Analysis' },
          { name: 'Literary Devices and Techniques' },
          { name: 'Character Analysis' },
          { name: 'Theme and Symbolism' },
          { name: 'Author\'s Purpose and Perspective' }
        ]
      },
      {
        name: 'World Literature',
        description: 'Classic and contemporary global works',
        topics: [
          { name: 'Ancient Greek and Roman Literature' },
          { name: 'Shakespeare\'s Works' },
          { name: 'British Literature' },
          { name: 'American Literature' },
          { name: 'Contemporary Fiction' },
          { name: 'Mythology and Folklore' }
        ]
      },
      {
        name: 'Creative Writing',
        description: 'Storytelling and artistic expression',
        topics: [
          { name: 'Narrative Techniques' },
          { name: 'Character Development' },
          { name: 'Dialogue Writing' },
          { name: 'Descriptive Writing' },
          { name: 'Poetry Writing' },
          { name: 'Editing and Revision' }
        ]
      }
    ]
  },
  {
    name: 'Social Studies',
    emoji: '🌍',
    description: 'History, geography, economics, and government',
    slug: 'social-studies',
    subjects: [
      {
        name: 'AP World History',
        description: 'Global historical developments',
        topics: [
          { name: 'Ancient Civilizations' },
          { name: 'Classical Empires (Rome, Han, Gupta)' },
          { name: 'Medieval Period' },
          { name: 'Age of Exploration' },
          { name: 'Industrial Revolution' },
          { name: 'World War I and II' },
          { name: 'Cold War' },
          { name: 'Globalization' }
        ]
      },
      {
        name: 'AP US History',
        description: 'American history and development',
        topics: [
          { name: 'Colonial America' },
          { name: 'American Revolution' },
          { name: 'Constitution and Federalism' },
          { name: 'Westward Expansion' },
          { name: 'Civil War and Reconstruction' },
          { name: 'Progressive Era' },
          { name: 'Great Depression and New Deal' },
          { name: 'Civil Rights Movement' },
          { name: 'Modern America' },
          { name: 'Native American Societies Before European Contact' },
          { name: 'Columbian Exchange' },
          { name: 'Spanish, French, and Dutch Colonization' },
          { name: 'British Colonies (New England, Middle, Southern)' },
          { name: 'Triangular Trade and Slavery' },
          { name: 'Causes of the American Revolution' },
          { name: 'Declaration of Independence' },
          { name: 'Revolutionary War Battles and Strategy' },
          { name: 'Articles of Confederation' },
          { name: 'Constitutional Convention and Compromises' },
          { name: 'Federalists vs Anti-Federalists' },
          { name: 'Bill of Rights' },
          { name: 'Washington and Hamilton\'s Economic Plan' },
          { name: 'Jefferson and Louisiana Purchase' },
          { name: 'War of 1812' },
          { name: 'Monroe Doctrine' },
          { name: 'Manifest Destiny' },
          { name: 'Trail of Tears and Indian Removal' },
          { name: 'Mexican-American War' },
          { name: 'California Gold Rush' },
          { name: 'Abolitionist Movement' },
          { name: 'Compromise of 1850 and Kansas-Nebraska Act' },
          { name: 'Dred Scott Decision' },
          { name: 'Election of 1860 and Secession' },
          { name: 'Civil War Battles (Gettysburg, Antietam, etc.)' },
          { name: 'Emancipation Proclamation' },
          { name: 'Reconstruction Amendments (13th, 14th, 15th)' },
          { name: 'Reconstruction Policies and Failures' },
          { name: 'Gilded Age and Industrialization' },
          { name: 'Immigration and Urbanization' },
          { name: 'Labor Unions and Strikes' },
          { name: 'Populist Movement' },
          { name: 'Spanish-American War' },
          { name: 'Progressive Reforms (Muckrakers, Trust-Busting)' },
          { name: 'Women\'s Suffrage Movement' },
          { name: 'World War I and US Involvement' },
          { name: 'Roaring Twenties and Cultural Changes' },
          { name: 'Causes of the Great Depression' },
          { name: 'FDR and New Deal Programs' },
          { name: 'World War II: Pearl Harbor and Home Front' },
          { name: 'D-Day and Pacific Theater' },
          { name: 'Atomic Bomb Decision' },
          { name: 'Cold War Origins' },
          { name: 'McCarthyism and Red Scare' },
          { name: 'Korean War' },
          { name: 'Vietnam War' },
          { name: 'Brown v. Board of Education' },
          { name: 'Montgomery Bus Boycott' },
          { name: 'March on Washington and MLK' },
          { name: 'Civil Rights Act and Voting Rights Act' },
          { name: 'Counterculture and 1960s Movements' },
          { name: 'Watergate Scandal' },
          { name: 'Reagan Era and Conservatism' },
          { name: '9/11 and War on Terror' },
          { name: '21st Century America' }
        ]
      },
      {
        name: 'AP European History',
        description: 'European political, cultural, and economic history',
        topics: [
          { name: 'Renaissance' },
          { name: 'Reformation and Religious Wars' },
          { name: 'Absolutism and Enlightenment' },
          { name: 'French Revolution' },
          { name: 'Nationalism and Unification' },
          { name: 'Imperialism' },
          { name: 'World Wars' },
          { name: 'European Union' }
        ]
      },
      {
        name: 'AP Human Geography',
        description: 'Spatial patterns and processes',
        topics: [
          { name: 'Population Dynamics' },
          { name: 'Migration Patterns' },
          { name: 'Cultural Landscapes' },
          { name: 'Political Geography' },
          { name: 'Economic Development' },
          { name: 'Urbanization' },
          { name: 'Agriculture and Food Production' }
        ]
      },
      {
        name: 'AP Economics (Micro)',
        description: 'Individual economic decision-making',
        topics: [
          { name: 'Supply and Demand' },
          { name: 'Elasticity' },
          { name: 'Consumer and Producer Surplus' },
          { name: 'Market Structures (Perfect Competition, Monopoly)' },
          { name: 'Factor Markets' },
          { name: 'Market Failures and Externalities' },
          { name: 'Scarcity and Opportunity Cost' },
          { name: 'Production Possibilities Curve' },
          { name: 'Comparative and Absolute Advantage' },
          { name: 'Determinants of Supply and Demand' },
          { name: 'Market Equilibrium' },
          { name: 'Price Ceilings and Price Floors' },
          { name: 'Tax Incidence and Deadweight Loss' },
          { name: 'Price Elasticity of Demand' },
          { name: 'Income and Cross-Price Elasticity' },
          { name: 'Consumer Choice and Utility Maximization' },
          { name: 'Marginal Utility and Diminishing Returns' },
          { name: 'Total Revenue and Total Cost' },
          { name: 'Profit Maximization' },
          { name: 'Short Run vs Long Run Production' },
          { name: 'Perfect Competition Characteristics' },
          { name: 'Monopolistic Competition' },
          { name: 'Oligopoly and Game Theory' },
          { name: 'Monopoly Price Discrimination' },
          { name: 'Labor Market Supply and Demand' },
          { name: 'Minimum Wage Effects' },
          { name: 'Positive and Negative Externalities' },
          { name: 'Public Goods and Common Resources' },
          { name: 'Asymmetric Information' },
          { name: 'Income Inequality and Distribution' }
        ]
      },
      {
        name: 'AP Economics (Macro)',
        description: 'National and global economic systems',
        topics: [
          { name: 'GDP and Economic Growth' },
          { name: 'Inflation and Unemployment' },
          { name: 'Fiscal Policy' },
          { name: 'Monetary Policy' },
          { name: 'International Trade' },
          { name: 'Exchange Rates' }
        ]
      },
      {
        name: 'AP Government and Politics',
        description: 'US political system and civic engagement',
        topics: [
          { name: 'Constitution and Federalism' },
          { name: 'Branches of Government' },
          { name: 'Civil Rights and Liberties' },
          { name: 'Political Parties and Elections' },
          { name: 'Interest Groups and Media' },
          { name: 'Public Policy' }
        ]
      },
      {
        name: 'Psychology',
        description: 'Mind, behavior, and mental processes',
        topics: [
          { name: 'Research Methods' },
          { name: 'Biological Bases of Behavior' },
          { name: 'Sensation and Perception' },
          { name: 'Learning and Conditioning' },
          { name: 'Memory and Cognition' },
          { name: 'Developmental Psychology' },
          { name: 'Social Psychology' }
        ]
      }
    ]
  },
  {
    name: 'World Languages',
    emoji: '🗣️',
    description: 'Foreign language instruction and cultural studies',
    slug: 'languages',
    subjects: [
      {
        name: 'Spanish',
        description: 'Spanish language fundamentals',
        topics: [
          { name: 'Basic Grammar and Vocabulary' },
          { name: 'Verb Conjugations (Present, Preterite, Imperfect)' },
          { name: 'Conversational Phrases' },
          { name: 'Reading Comprehension' },
          { name: 'Writing Practice' },
          { name: 'Hispanic Culture and Traditions' },
          { name: 'Spanish Alphabet and Pronunciation' },
          { name: 'Greetings and Introductions' },
          { name: 'Numbers, Dates, and Time' },
          { name: 'Colors and Descriptions' },
          { name: 'Family and Relationships Vocabulary' },
          { name: 'Food and Restaurant Vocabulary' },
          { name: 'Clothing and Shopping' },
          { name: 'House and Furniture Vocabulary' },
          { name: 'Weather Expressions' },
          { name: 'Nouns and Gender Agreement' },
          { name: 'Definite and Indefinite Articles' },
          { name: 'Adjective Agreement' },
          { name: 'Regular -AR, -ER, -IR Verbs' },
          { name: 'Irregular Verbs (Ser, Estar, Ir, Tener)' },
          { name: 'Present Tense Conjugation' },
          { name: 'Preterite Tense' },
          { name: 'Imperfect Tense' },
          { name: 'Future and Conditional Tenses' },
          { name: 'Present Perfect Tense' },
          { name: 'Commands (Imperative)' },
          { name: 'Reflexive Verbs' },
          { name: 'Question Words and Formation' },
          { name: 'Prepositions and Location' },
          { name: 'Direct and Indirect Object Pronouns' },
          { name: 'Comparisons and Superlatives' },
          { name: 'Gustar and Similar Verbs' },
          { name: 'Reading Simple Texts' },
          { name: 'Writing Sentences and Paragraphs' },
          { name: 'Speaking and Listening Practice' }
        ]
      },
      {
        name: 'AP Spanish Language',
        description: 'Advanced Spanish communication',
        topics: [
          { name: 'Formal and Informal Communication' },
          { name: 'Listening Comprehension' },
          { name: 'Persuasive Writing' },
          { name: 'Cultural Comparisons' },
          { name: 'Literature Analysis' }
        ]
      },
      {
        name: 'French',
        description: 'French language basics',
        topics: [
          { name: 'Basic Grammar and Vocabulary' },
          { name: 'Verb Conjugations' },
          { name: 'Conversational Phrases' },
          { name: 'Pronunciation and Accent' },
          { name: 'French Culture' }
        ]
      },
      {
        name: 'AP French Language',
        description: 'Advanced French proficiency',
        topics: [
          { name: 'Formal Writing' },
          { name: 'Literature and Culture' },
          { name: 'Interpersonal Communication' },
          { name: 'Presentational Speaking' }
        ]
      },
      {
        name: 'Mandarin Chinese',
        description: 'Mandarin basics and characters',
        topics: [
          { name: 'Pinyin and Pronunciation' },
          { name: 'Basic Characters' },
          { name: 'Grammar Fundamentals' },
          { name: 'Conversational Phrases' },
          { name: 'Chinese Culture' }
        ]
      },
      {
        name: 'Latin',
        description: 'Classical Latin language',
        topics: [
          { name: 'Basic Grammar and Declensions' },
          { name: 'Verb Conjugations' },
          { name: 'Roman History and Culture' },
          { name: 'Translation Practice' }
        ]
      },
      {
        name: 'German',
        description: 'German language fundamentals',
        topics: [
          { name: 'Basic Grammar and Vocabulary' },
          { name: 'Noun Genders and Cases' },
          { name: 'Verb Conjugations' },
          { name: 'Conversational Practice' },
          { name: 'German Culture' }
        ]
      }
    ]
  },
  {
    name: 'Test Preparation',
    emoji: '📝',
    description: 'Standardized test prep and strategies',
    slug: 'test-prep',
    subjects: [
      {
        name: 'Digital SAT',
        description: 'College entrance exam preparation',
        topics: [
          { name: 'Reading Comprehension Strategies' },
          { name: 'Writing and Grammar Rules' },
          { name: 'Algebra and Linear Equations' },
          { name: 'Problem Solving and Data Analysis' },
          { name: 'Advanced Math (Quadratics, Functions)' },
          { name: 'Test-taking Strategies' },
          { name: 'Main Idea and Purpose Questions' },
          { name: 'Inference and Implicit Meaning' },
          { name: 'Command of Evidence Questions' },
          { name: 'Vocabulary in Context' },
          { name: 'Analyzing Authors\' Claims and Arguments' },
          { name: 'Paired Passage Comparisons' },
          { name: 'Data Interpretation from Graphs' },
          { name: 'Standard English Conventions' },
          { name: 'Sentence Structure and Fragments' },
          { name: 'Punctuation Rules (Commas, Semicolons, Dashes)' },
          { name: 'Subject-Verb Agreement' },
          { name: 'Pronoun Usage and Agreement' },
          { name: 'Modifier Placement' },
          { name: 'Verb Tense and Voice' },
          { name: 'Parallel Structure' },
          { name: 'Expression of Ideas (Transitions, Development)' },
          { name: 'Linear Equations and Inequalities' },
          { name: 'Systems of Linear Equations' },
          { name: 'Interpreting Linear Functions' },
          { name: 'Ratios, Proportions, and Percentages' },
          { name: 'Unit Conversions and Rates' },
          { name: 'Data Analysis and Statistics' },
          { name: 'Probability and Conditional Probability' },
          { name: 'Scatterplots and Line of Best Fit' },
          { name: 'Quadratic Equations and Parabolas' },
          { name: 'Exponential Functions and Growth' },
          { name: 'Polynomial Operations' },
          { name: 'Radical and Rational Expressions' },
          { name: 'Geometry (Area, Volume, Angles)' },
          { name: 'Trigonometry Basics' },
          { name: 'Circle Equations' },
          { name: 'Time Management on Test Day' },
          { name: 'Process of Elimination Strategies' },
          { name: 'Using the Digital Calculator Effectively' },
          { name: 'Flagging and Reviewing Questions' }
        ]
      },
      {
        name: 'ACT',
        description: 'Alternative college entrance exam',
        topics: [
          { name: 'English Section Strategies' },
          { name: 'Math Section Review' },
          { name: 'Reading Section Strategies' },
          { name: 'Science Section Analysis' },
          { name: 'Time Management' }
        ]
      },
      {
        name: 'PSAT',
        description: 'Pre-SAT practice',
        topics: [
          { name: 'Reading Practice' },
          { name: 'Math Fundamentals' },
          { name: 'Writing and Language' },
          { name: 'National Merit Scholarship Prep' }
        ]
      },
      {
        name: 'GRE',
        description: 'Graduate school entrance exam',
        topics: [
          { name: 'Verbal Reasoning' },
          { name: 'Quantitative Reasoning' },
          { name: 'Analytical Writing' },
          { name: 'Vocabulary Building' }
        ]
      },
      {
        name: 'GMAT',
        description: 'Business school entrance exam',
        topics: [
          { name: 'Quantitative Reasoning' },
          { name: 'Verbal Reasoning' },
          { name: 'Integrated Reasoning' },
          { name: 'Analytical Writing Assessment' }
        ]
      },
      {
        name: 'LSAT',
        description: 'Law school entrance exam',
        topics: [
          { name: 'Logical Reasoning' },
          { name: 'Reading Comprehension' },
          { name: 'Analytical Reasoning (Logic Games)' },
          { name: 'Writing Sample' }
        ]
      },
      {
        name: 'MCAT',
        description: 'Medical school entrance exam',
        topics: [
          { name: 'Biology and Biochemistry' },
          { name: 'Chemistry and Physics' },
          { name: 'Psychology and Sociology' },
          { name: 'Critical Analysis and Reasoning' }
        ]
      }
    ]
  },
  {
    name: 'Arts & Music',
    emoji: '🎨',
    description: 'Visual arts, music theory, and performance',
    slug: 'arts',
    subjects: [
      {
        name: 'Visual Arts',
        description: 'Drawing, painting, and design fundamentals',
        topics: [
          { name: 'Elements of Art (Line, Shape, Color)' },
          { name: 'Principles of Design' },
          { name: 'Perspective Drawing' },
          { name: 'Color Theory' },
          { name: 'Art History Overview' }
        ]
      },
      {
        name: 'Music Theory',
        description: 'Understanding musical structure',
        topics: [
          { name: 'Reading Sheet Music' },
          { name: 'Scales and Key Signatures' },
          { name: 'Chords and Harmony' },
          { name: 'Rhythm and Time Signatures' },
          { name: 'Musical Forms' }
        ]
      },
      {
        name: 'AP Art History',
        description: 'Global art movements and masterpieces',
        topics: [
          { name: 'Ancient and Classical Art' },
          { name: 'Renaissance Art' },
          { name: 'Baroque and Rococo' },
          { name: 'Impressionism and Post-Impressionism' },
          { name: 'Modern and Contemporary Art' }
        ]
      }
    ]
  },
  {
    name: 'Business & Career',
    emoji: '💼',
    description: 'Business fundamentals and professional skills',
    slug: 'business',
    subjects: [
      {
        name: 'Introduction to Business',
        description: 'Business basics and entrepreneurship',
        topics: [
          { name: 'Types of Business Structures' },
          { name: 'Marketing Fundamentals' },
          { name: 'Finance and Accounting Basics' },
          { name: 'Business Ethics' },
          { name: 'Entrepreneurship' }
        ]
      },
      {
        name: 'Personal Finance',
        description: 'Money management and investing',
        topics: [
          { name: 'Budgeting and Saving' },
          { name: 'Credit and Debt' },
          { name: 'Investing Basics (Stocks, Bonds)' },
          { name: 'Taxes and Income' },
          { name: 'Retirement Planning' }
        ]
      },
      {
        name: 'Career Development',
        description: 'Professional skills and job readiness',
        topics: [
          { name: 'Resume Writing' },
          { name: 'Interview Skills' },
          { name: 'Networking' },
          { name: 'Time Management' },
          { name: 'Communication Skills' }
        ]
      }
    ]
  }
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return curriculum.find(cat => cat.slug === slug)
}

export function getSubjectByName(categorySlug: string, subjectName: string): Subject | undefined {
  const category = getCategoryBySlug(categorySlug)
  return category?.subjects.find(sub => sub.name === subjectName)
}
