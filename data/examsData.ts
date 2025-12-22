
import { Exam } from '../types';

const generateNews = (name: string): any[] => [
  { title: `Official Notification for ${name} 2026 Release Expected Soon`, date: '2025-12-15', source: 'Times of India' },
  { title: `Syllabus Update: Minor changes expected in ${name} 2026`, date: '2025-11-20', source: 'ExamEdger Analysis' },
  { title: `${name} 2026: Tips from previous toppers`, date: '2025-10-05', source: 'Education Times' },
  { title: `Govt announces new centers for ${name}`, date: '2025-12-01', source: 'PIB' }
];

const generateProminentLinks = (name: string): any[] => [
  { title: 'Official Notification PDF', url: '#' },
  { title: 'Information Brochure 2026', url: '#' },
  { title: 'Online Registration Portal', url: '#' },
  { title: 'Previous Year Papers', url: '#' },
  { title: 'Eligibility Checker', url: '#' }
];

const generateGuides = (name: string): any[] => [
  { title: `${name} Official Prep Guide 2026`, url: '#', source: 'Official' },
  { title: `Topper Strategy: How I cleared ${name}`, url: '#', source: 'YouTube' },
  { title: `${name} Last 10 Years Solved Papers`, url: '#', source: 'Unacademy' },
  { title: `Detailed Syllabus Breakdown for ${name}`, url: '#', source: 'PW' },
  { title: `Free Mock Test Series - Session 1`, url: '#', source: 'Testbook' },
  { title: `Reddit Community FAQ for ${name}`, url: '#', source: 'Reddit' },
  { title: `Current Affairs Capsule for ${name}`, url: '#', source: 'GKToday' },
  { title: `Subject Wise Important Topics - PDF`, url: '#', source: 'Byjus' },
  { title: `Live Revision Marathon - 24 Hours`, url: '#', source: 'Unacademy' },
  { title: `Exam Day Instructions & Guidelines`, url: '#', source: 'Official' },
  { title: `Shortcuts & Tricks for Aptitude`, url: '#', source: 'Meritshine' },
  { title: `Vocabulary & Grammar for ${name}`, url: '#', source: 'Internal' },
  { title: `Formula Sheet - Quick Revision`, url: '#', source: 'PW' },
  { title: `Scholarship Test for ${name} Coaching`, url: '#', source: 'Allen' },
  { title: `Interactive Quiz & Practice Arena`, url: '#', source: 'Quizlet' },
  { title: `Center Experience & Reviews`, url: '#', source: 'Quora' },
];

const generateCommunityPosts = (id: string, name: string, type: string): any[] => {
  if (id.includes('jee')) {
    return [
      { user: 'IITian_2024', role: 'AIR 450', tip: 'For JEE Mains, Chemistry NCERT is your bible. Do not ignore it.', verified: true },
      { user: 'PhysicsGalaxyFan', role: 'Aspirant', tip: 'Speed is key. I messed up simple calc in shift 1 due to panic.', verified: false },
      { user: 'MathsWizard', role: 'Mentor', tip: 'Coordinate geometry weightage has increased. Revise conics thoroughly.', verified: true },
    ];
  }
  if (id.includes('neet')) {
    return [
      { user: 'Dr_Strange', role: 'MBBS 1st Year', tip: 'Biology requires multiple readings. Diagrams are crucial.', verified: true },
      { user: 'NeetAspirant26', role: 'Student', tip: 'Physics formula sheet helps a lot in last minute revision.', verified: false },
      { user: 'AllenFaculty', role: 'Teacher', tip: 'Do not guess in Physics. Negative marking kills the rank.', verified: true },
    ];
  }
  if (id.includes('gate')) {
    return [
      { user: 'GateCseTopper', role: 'IITB MTech', tip: 'Focus on Aptitude and Math. It is 25-28 marks free if you prepare well.', verified: true },
      { user: 'MechEngg', role: 'Aspirant', tip: 'Virtual calculator practice is a must. It is annoying to use on the exam day.', verified: true },
      { user: 'PsuAspirant', role: 'Student', tip: 'Test series analysis is more important than the test itself.', verified: false },
    ];
  }
  if (id.includes('upsc') || type === 'Civil Services' || type === 'State Civil Services') {
    return [
      { user: 'IasDreamer', role: 'Veteran', tip: 'Newspaper reading is non-negotiable for current affairs.', verified: true },
      { user: 'CivilsDaily', role: 'Mentor', tip: 'Answer writing practice should start before Prelims.', verified: true },
      { user: 'UpscJourney', role: 'Aspirant', tip: 'Elimination techniques in Prelims are getting harder.', verified: false }
    ];
  }
  // Generic fallbacks based on type
  if (type === 'Engineering') {
    return [
      { user: 'EnggStudent', role: 'Senior', tip: 'Mock tests are the only reality check. Give at least 20 mocks.', verified: true },
      { user: 'ExamWarrior', role: 'Aspirant', tip: 'Previous Year Questions (PYQs) are repetitive concepts. Master them.', verified: true },
      { user: 'CodeMaster', role: 'Alumni', tip: 'Don\'t get stuck on one hard question.', verified: false },
    ];
  }
  if (type === 'Medical') {
    return [
      { user: 'Medico', role: 'Intern', tip: 'NCERT lines are often directly asked as questions.', verified: true },
      { user: 'BioLover', role: 'Aspirant', tip: 'Botany examples need mnemonic tricks to remember.', verified: false },
      { user: 'FutureDoc', role: 'Student', tip: 'Consistency > Intensity for NEET.', verified: true },
    ];
  }
  if (type === 'Banking' || type === 'Insurance') {
    return [
      { user: 'BankerBob', role: 'PO', tip: 'Speed maths tricks save vital seconds in Prelims.', verified: true },
      { user: 'ReasoningKing', role: 'Mentor', tip: 'Puzzle seating arrangements are the diffrentiator.', verified: true },
      { user: 'RbiAspirant', role: 'Student', tip: 'Focus on GA for Mains right from day 1.', verified: false }
    ]
  }

  // Default Generic
  return [
    { user: 'ExamVeteran', role: 'Mentor', tip: `Start preparation for ${name} early. Consistency is key.`, verified: true },
    { user: 'StudyGroupAdmin', role: 'Moderator', tip: 'Join a good test series for practice.', verified: true },
    { user: 'Newbie', role: 'Aspirant', tip: 'Is the syllabus suitable for self-study?', verified: false },
  ];
};

const baseExams = [
  // National Exams
  { id: 'jee-main', name: 'JEE Main', fullName: 'Joint Entrance Examination - Main', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 300, duration: '3 Hours' },
  { id: 'jee-adv', name: 'JEE Advanced', fullName: 'Joint Entrance Examination - Advanced', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 360, duration: '6 Hours (2 Papers)' },
  { id: 'neet-ug', name: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', type: 'Medical', mode: 'Pen & Paper', totalMarks: 720, duration: '3 Hours 20 Mins' },
  { id: 'gate', name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 100, duration: '3 Hours' },
  { id: 'upsc-cse', name: 'UPSC CSE', fullName: 'Civil Services Examination', type: 'Civil Services', mode: 'Offline (Written)', totalMarks: 1750, duration: 'Multiple Days' },
  { id: 'ssc-cgl', name: 'SSC CGL', fullName: 'Staff Selection Commission - Combined Graduate Level', type: 'Government', mode: 'CBT (Online)', totalMarks: 200, duration: '1 Hour' },
  { id: 'wbcs', name: 'WBCS', fullName: 'West Bengal Civil Service (Executive) Exam', type: 'State Civil Services', mode: 'Offline', totalMarks: 1600, duration: 'Multiple Days' },
  { id: 'bpsc', name: 'BPSC', fullName: 'Bihar Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 1050, duration: '3 Hours per paper' },
  { id: 'uppsc', name: 'UPPSC', fullName: 'Uttar Pradesh Public Service Commission (PCS)', type: 'State Civil Services', mode: 'Offline', totalMarks: 1500, duration: 'Multiple Days' },
  { id: 'mpsc', name: 'MPSC', fullName: 'Maharashtra Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 800, duration: 'Multiple Sessions' },
  { id: 'tnpsc', name: 'TNPSC Group 1', fullName: 'Tamil Nadu Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 850, duration: '3 Hours' },
  { id: 'kpsc', name: 'KPSC KAS', fullName: 'Karnataka Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 1250, duration: 'Multiple Days' },
  { id: 'gpsc', name: 'GPSC', fullName: 'Gujarat Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 900, duration: '3 Hours' },
  { id: 'opsc', name: 'OPSC', fullName: 'Odisha Public Service Commission', type: 'State Civil Services', mode: 'Offline', totalMarks: 2250, duration: 'Multiple Days' },
  { id: 'ibps-po', name: 'IBPS PO', fullName: 'Probationary Officer - Banking', type: 'Banking', mode: 'CBT (Online)', totalMarks: 100, duration: '1 Hour (Prelims)' },
  { id: 'sbi-po', name: 'SBI PO', fullName: 'State Bank of India - PO', type: 'Banking', mode: 'CBT (Online)', totalMarks: 100, duration: '1 Hour (Prelims)' },
  { id: 'rbi-grade-b', name: 'RBI Grade B', fullName: 'Reserve Bank of India Officers', type: 'Banking', mode: 'CBT (Online)', totalMarks: 200, duration: '2 Hours' },
  { id: 'lic-aao', name: 'LIC AAO', fullName: 'Life Insurance Corporation - AAO', type: 'Insurance', mode: 'CBT (Online)', totalMarks: 350, duration: '2.5 Hours' },
  { id: 'cat', name: 'CAT', fullName: 'Common Admission Test', type: 'Management', mode: 'CBT (Online)', totalMarks: 198, duration: '2 Hours' },
  { id: 'clat', name: 'CLAT', fullName: 'Common Law Admission Test', type: 'Law', mode: 'Offline', totalMarks: 120, duration: '2 Hours' },
  { id: 'nmat', name: 'NMAT', fullName: 'NMIMS Management Aptitude Test', type: 'Management', mode: 'CBT (Online)', totalMarks: 360, duration: '2 Hours' },
  { id: 'nda', name: 'NDA', fullName: 'National Defence Academy Exam', type: 'Defense', mode: 'Offline (OMR)', totalMarks: 900, duration: '5 Hours Total' },
  { id: 'cds', name: 'CDS', fullName: 'Combined Defence Services', type: 'Defense', mode: 'Offline (OMR)', totalMarks: 300, duration: '6 Hours' },
  { id: 'afcat', name: 'AFCAT', fullName: 'Air Force Common Admission Test', type: 'Defense', mode: 'CBT (Online)', totalMarks: 300, duration: '2 Hours' },
  { id: 'ugc-net', name: 'UGC NET', fullName: 'University Grants Commission - NET', type: 'Teaching', mode: 'CBT (Online)', totalMarks: 300, duration: '3 Hours' },
  { id: 'csir-net', name: 'CSIR NET', fullName: 'CSIR National Eligibility Test', type: 'Research', mode: 'CBT (Online)', totalMarks: 200, duration: '3 Hours' },
  { id: 'cuet-ug', name: 'CUET UG', fullName: 'Common University Entrance Test', type: 'Undergraduate', mode: 'Hybrid', totalMarks: 800, duration: 'Varies by subject' },
  { id: 'bit-sat', name: 'BITSAT', fullName: 'Birla Institute of Technology Aptitude Test', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 390, duration: '3 Hours' },
  { id: 'viteee', name: 'VITEEE', fullName: 'VIT Engineering Entrance Examination', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 125, duration: '2.5 Hours' },
  { id: 'wbjee', name: 'WBJEE', fullName: 'West Bengal Joint Entrance Examination', type: 'Engineering', mode: 'Offline (OMR)', totalMarks: 200, duration: '4 Hours' },
  { id: 'mht-cet', name: 'MHT CET', fullName: 'Maharashtra Common Entrance Test', type: 'Engineering', mode: 'CBT (Online)', totalMarks: 200, duration: '3 Hours' },
  { id: 'kcet', name: 'KCET', fullName: 'Karnataka Common Entrance Test', type: 'Engineering', mode: 'Offline (OMR)', totalMarks: 180, duration: 'Varies' },
  { id: 'uceed', name: 'UCEED', fullName: 'Undergraduate Common Entrance Examination for Design', type: 'Design', mode: 'CBT + Offline', totalMarks: 300, duration: '3 Hours' },
  { id: 'nid-dat', name: 'NID DAT', fullName: 'National Institute of Design - DAT', type: 'Design', mode: 'Offline', totalMarks: 100, duration: '3 Hours' },
  { id: 'nift', name: 'NIFT', fullName: 'National Institute of Fashion Technology Exam', type: 'Design', mode: 'CBT + Situation Test', totalMarks: 100, duration: '3 Hours' },
];

export const EXAMS: Exam[] = baseExams.map((ex, i) => ({
  ...ex,
  status: 'UPCOMING',
  description: `Comprehensive details for ${ex.name} (${ex.fullName}). This examination is a primary gateway for aspirants seeking careers in ${ex.type}. The ${ex.mode} format requires a specific strategy focused on ${ex.type === 'Engineering' ? 'problem-solving' : (ex.type === 'Civil Services' ? 'analytical depth' : 'speed and accuracy')}. Candidates are evaluated on a total of ${ex.totalMarks} marks across various sections.`,
  dates: {
    registrationStart: 'TBA',
    registrationEnd: 'TBA',
    admitCardDate: 'TBA',
    examDate: 'TBA',
    resultDate: 'TBA'
  },
  requirements: [
    'Academic eligibility as per official notification 2026',
    'Valid Identity Proof (Aadhar/Passport)',
    'Digital photographs as per specific DPI guidelines'
  ],
  dos: [
    'Download and print the admit card in advance.',
    'Carry a clear transparent water bottle.',
    'Follow the specific dress code mentioned in the instructions.',
    'Ensure all biometrics are recorded correctly.',
    'Maintain silence and follow the invigilator\'s instructions.'
  ],
  donts: [
    'No electronic gadgets like smartwatches or mobile phones.',
    'Do not carry any piece of paper other than the admit card.',
    'Avoid wearing jewelry or metallic items.',
    'Strictly no communication with other candidates.',
    'Do not leave the exam hall before the final bell.'
  ],
  dressCode: ex.type === 'Civil Services' ? 'Formal or simple casual wear. Avoid heavy accessories.' : 'Light colored simple clothes. No long sleeves. Only sandals or slippers.',
  thingsToCarry: ['Admit Card', 'Valid Photo ID', 'Passport size photos', 'Blue/Black Ball point pen'],
  redditSummary: `Recent threads on r/Indian_Academia suggest that ${ex.name} is becoming increasingly competitive with higher cut-offs expected for 2026. Aspirants recommend focusing on the last 5 years' question papers for trend analysis. Many users emphasize that mock tests are key to managing the ${ex.duration} timeframe.`,
  officialWebsite: 'https://www.google.com/search?q=' + encodeURIComponent(ex.fullName + ' official website'),
  toolRecommendation: ex.type === 'Engineering' ? ['Formula Stamper', 'PDF Compressor'] : ['Photo Resizer', 'Date Stamper'],
  fileSizeLimit: '20KB - 100KB',
  guides: generateGuides(ex.name),
  news: generateNews(ex.name),
  prominentLinks: generateProminentLinks(ex.name),
  communityPosts: generateCommunityPosts(ex.id, ex.name, ex.type)
}));
