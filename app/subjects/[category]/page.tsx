'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Sparkles } from 'lucide-react'

const subjectTopics: Record<string, { title: string; description: string; topics: string[] }> = {
  'mathematics': {
    title: 'Mathematics',
    description: 'Aligned with Common Core and AP standards',
    topics: [
      'Pre-Algebra: Variables and Expressions',
      'Pre-Algebra: Solving Equations',
      'Pre-Algebra: Ratios and Proportions',
      'Algebra 1: Linear Equations',
      'Algebra 1: Quadratic Functions',
      'Algebra 1: Systems of Equations',
      'Algebra 2: Polynomial Functions',
      'Algebra 2: Exponential and Logarithmic Functions',
      'Algebra 2: Rational Functions',
      'Geometry: Lines and Angles',
      'Geometry: Triangles and Congruence',
      'Geometry: Circles and Arc Length',
      'Geometry: Area and Volume',
      'Pre-Calculus: Trigonometry',
      'Pre-Calculus: Limits and Continuity',
      'Pre-Calculus: Sequences and Series',
      'AP Calculus AB: Derivatives',
      'AP Calculus AB: Integrals',
      'AP Calculus AB: Applications of Derivatives',
      'AP Calculus BC: Parametric Equations',
      'AP Calculus BC: Polar Coordinates',
      'AP Calculus BC: Series Convergence',
      'Multivariable Calculus: Partial Derivatives',
      'Multivariable Calculus: Double Integrals',
      'Linear Algebra: Matrices and Determinants',
      'Linear Algebra: Vector Spaces',
      'AP Statistics: Descriptive Statistics',
      'AP Statistics: Probability Distributions',
      'AP Statistics: Inference',
      'Math Olympiad: Number Theory',
      'Math Olympiad: Combinatorics',
      'Math Olympiad: Geometry Problems'
    ]
  },
  'science': {
    title: 'Science',
    description: 'Aligned with NGSS and AP frameworks',
    topics: [
      'Biology: Cell Structure and Function',
      'Biology: DNA and Genetics',
      'Biology: Evolution and Natural Selection',
      'Biology: Ecology and Ecosystems',
      'Chemistry: Atomic Structure',
      'Chemistry: Chemical Bonding',
      'Chemistry: Stoichiometry',
      'Chemistry: Acids and Bases',
      'Chemistry: Thermodynamics',
      'Physics: Kinematics and Motion',
      'Physics: Forces and Newton\'s Laws',
      'Physics: Energy and Work',
      'Physics: Electricity and Magnetism',
      'Physics: Waves and Sound',
      'AP Biology: Biochemistry',
      'AP Biology: Cellular Processes',
      'AP Biology: Photosynthesis and Respiration',
      'AP Biology: Molecular Genetics',
      'AP Chemistry: Chemical Equilibrium',
      'AP Chemistry: Electrochemistry',
      'AP Chemistry: Kinetics',
      'AP Environmental Science: Ecosystems',
      'AP Environmental Science: Climate Change',
      'AP Environmental Science: Pollution',
      'AP Physics 1: Circular Motion',
      'AP Physics 1: Simple Harmonic Motion',
      'AP Physics 2: Thermodynamics',
      'AP Physics 2: Quantum Physics',
      'AP Physics C: Rotational Dynamics',
      'AP Physics C: Electric Fields'
    ]
  },
  'computer-science': {
    title: 'Computer Science',
    description: 'Programming fundamentals to advanced algorithms',
    topics: [
      'AP Computer Science A: Java Basics',
      'AP Computer Science A: Object-Oriented Programming',
      'AP Computer Science A: Data Structures',
      'AP Computer Science A: Algorithms and Recursion',
      'AP Computer Science Principles: Binary and Data',
      'AP Computer Science Principles: Internet and Networks',
      'AP Computer Science Principles: Programming Basics',
      'Data Structures: Arrays and Lists',
      'Data Structures: Stacks and Queues',
      'Data Structures: Trees and Graphs',
      'Data Structures: Hash Tables',
      'Algorithms: Sorting Algorithms',
      'Algorithms: Searching Algorithms',
      'Algorithms: Graph Algorithms',
      'Algorithms: Dynamic Programming',
      'Programming Fundamentals: Variables and Data Types',
      'Programming Fundamentals: Control Structures',
      'Programming Fundamentals: Functions and Methods',
      'Programming Fundamentals: Debugging Techniques'
    ]
  },
  'english-social-studies': {
    title: 'English & Social Studies',
    description: 'Literature, history, and social sciences',
    topics: [
      'AP Language Arts: Rhetorical Analysis',
      'AP Language Arts: Argument Essays',
      'AP Language Arts: Synthesis Essays',
      'AP Literature: Poetry Analysis',
      'AP Literature: Prose Fiction Analysis',
      'AP Literature: Literary Devices',
      'AP Literature: Character Analysis',
      'AP Human Geography: Population Dynamics',
      'AP Human Geography: Cultural Patterns',
      'AP Human Geography: Urbanization',
      'AP World History: Ancient Civilizations',
      'AP World History: Medieval Period',
      'AP World History: Age of Exploration',
      'AP World History: Industrial Revolution',
      'AP World History: World Wars',
      'AP US History: Colonial America',
      'AP US History: American Revolution',
      'AP US History: Civil War and Reconstruction',
      'AP US History: Progressive Era',
      'AP US History: World War II',
      'AP US History: Civil Rights Movement',
      'AP European History: Renaissance',
      'AP European History: Reformation',
      'AP European History: Enlightenment',
      'AP Economics: Supply and Demand',
      'AP Economics: Market Structures',
      'AP Economics: Fiscal Policy',
      'AP Economics: Monetary Policy',
      'AP Government: Constitution',
      'AP Government: Branches of Government',
      'AP Government: Civil Rights and Liberties',
      'AP Government: Political Parties',
      'AP Research: Research Methodology',
      'AP Seminar: Argumentation Skills'
    ]
  },
  'languages': {
    title: 'World Languages',
    description: 'Foreign language instruction and AP courses',
    topics: [
      'Spanish: Basic Grammar and Vocabulary',
      'Spanish: Verb Conjugations',
      'Spanish: Conversational Phrases',
      'Spanish: Reading Comprehension',
      'AP Spanish: Literature and Culture',
      'AP Spanish: Formal Writing',
      'AP Spanish: Speaking and Presentation',
      'French: Basic Grammar and Vocabulary',
      'French: Verb Conjugations',
      'French: Conversational Phrases',
      'AP French: Literature and Culture',
      'AP French: Formal Writing',
      'Mandarin: Pinyin and Characters',
      'Mandarin: Basic Grammar',
      'Mandarin: Conversational Phrases',
      'AP Mandarin: Reading Comprehension',
      'AP Mandarin: Writing Practice',
      'Latin: Basic Grammar',
      'Latin: Roman Culture and History',
      'AP Latin: Caesar and Vergil'
    ]
  },
  'test-prep': {
    title: 'Test Preparation',
    description: 'Standardized test preparation materials',
    topics: [
      'Digital SAT: Reading Comprehension',
      'Digital SAT: Writing and Grammar',
      'Digital SAT: Algebra',
      'Digital SAT: Problem Solving',
      'Digital SAT: Data Analysis',
      'Digital SAT: Advanced Math',
      'ACT: English Section',
      'ACT: Math Section',
      'ACT: Reading Section',
      'ACT: Science Section',
      'PSAT: Reading Strategies',
      'PSAT: Math Fundamentals',
      'LSAT: Logical Reasoning',
      'LSAT: Reading Comprehension',
      'LSAT: Analytical Reasoning',
      'GMAT: Quantitative Reasoning',
      'GMAT: Verbal Reasoning',
      'GMAT: Analytical Writing',
      'GRE: Verbal Reasoning',
      'GRE: Quantitative Reasoning',
      'GRE: Analytical Writing',
      'MCAT: Biology and Biochemistry',
      'MCAT: Chemistry and Physics',
      'MCAT: Psychology and Sociology',
      'MCAT: Critical Analysis and Reasoning'
    ]
  }
}

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string

  const subjectData = subjectTopics[category]

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Subject not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to home
          </button>
        </div>
      </div>
    )
  }

  const handleTopicClick = (topic: string) => {
    // Redirect to generate page and auto-start generation
    router.push(`/generate?mode=topic&example=${encodeURIComponent(topic)}&autoGenerate=true`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to all subjects
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">
                {category === 'mathematics' && '📐'}
                {category === 'science' && '🔬'}
                {category === 'computer-science' && '💻'}
                {category === 'english-social-studies' && '📚'}
                {category === 'languages' && '🌍'}
                {category === 'test-prep' && '📝'}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-800">{subjectData.title}</h1>
              <p className="text-neutral-600 mt-1">{subjectData.description}</p>
            </div>
          </div>

          <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg">
            <p className="text-sm text-primary-800 flex items-center gap-2">
              <Sparkles size={16} className="text-gold-600" />
              Click any topic below to instantly generate comprehensive tutor notes
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectData.topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicClick(topic)}
              className="text-left p-4 bg-white rounded-xl border-2 border-neutral-100 hover:border-gold-400 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 group-hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold text-primary-700 group-hover:text-gold-700">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-800 transition-colors">
                    {topic}
                  </h3>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-gold-600">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-800 py-4 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-300 text-xs">
            © {new Date().getFullYear()} <a href="https://vmotiv8.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-200 font-semibold">VMotiv8</a> • Created with ❤️ by the VMotiv8 Intern Team
          </p>
        </div>
      </footer>
    </div>
  )
}
