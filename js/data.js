// ─── Solo Leveling Portfolio — Data Module ───
const PROFILE = {
  name: "HARSH",
  handle: "_h8rshh",
  role: "Full-Stack Developer • AI Engineer • Blockchain Architect",
  rank: "S",
  stats: [
    { label: "Projects", value: "12+" },
    { label: "Hackathons", value: "6+" },
    { label: "Rank", value: "S" }
  ],
  links: {
    github: "https://github.com/H8rsh100"

  }
};

const TECH_STACK = [
  { name: "C++", proficiency: 90, rank: "S" },
  { name: "Python", proficiency: 95, rank: "S" },
  { name: "React", proficiency: 85, rank: "A" },
  { name: "FastAPI", proficiency: 88, rank: "A" },
  { name: "MongoDB", proficiency: 80, rank: "A" },
  { name: "Solidity", proficiency: 75, rank: "B" },
  { name: "Flask", proficiency: 82, rank: "A" },
  { name: "Raspberry Pi", proficiency: 70, rank: "B" },
  { name: "LangChain", proficiency: 85, rank: "A" },
  { name: "JavaScript", proficiency: 90, rank: "S" },
  { name: "Node.js", proficiency: 85, rank: "A" },
  { name: "Three.js", proficiency: 72, rank: "B" }
];

const SKILLS = {
  "Languages": [
    { name: "Python", rank: "S", level: 95 },
    { name: "C++", rank: "S", level: 90 },
    { name: "JavaScript", rank: "S", level: 90 },
    { name: "Solidity", rank: "B", level: 75 },
    { name: "SQL", rank: "A", level: 82 }
  ],
  "AI / ML": [
    { name: "LangChain", rank: "A", level: 85 },
    { name: "TensorFlow", rank: "A", level: 80 },
    { name: "Scikit-learn", rank: "A", level: 83 },
    { name: "OpenAI API", rank: "S", level: 90 },
    { name: "NLP", rank: "A", level: 78 }
  ],
  "Web": [
    { name: "React", rank: "A", level: 85 },
    { name: "FastAPI", rank: "A", level: 88 },
    { name: "Flask", rank: "A", level: 82 },
    { name: "Node.js", rank: "A", level: 85 },
    { name: "Next.js", rank: "B", level: 74 }
  ],
  "Blockchain": [
    { name: "Solidity", rank: "B", level: 75 },
    { name: "Web3.js", rank: "B", level: 72 },
    { name: "Hardhat", rank: "B", level: 70 },
    { name: "Smart Contracts", rank: "B", level: 74 }
  ],
  "Embedded": [
    { name: "Raspberry Pi", rank: "B", level: 70 },
    { name: "Arduino", rank: "B", level: 68 },
    { name: "IoT Protocols", rank: "B", level: 65 },
    { name: "Sensor Systems", rank: "B", level: 67 }
  ]
};

const PROJECTS = [
  {
    name: "StackSherlock",
    rank: "S",
    description: "AI-powered code investigation tool that analyzes stack traces and suggests fixes using LLM reasoning chains.",
    github: "https://github.com/H8rsh100/StackSherlock",
    tags: ["Python", "LangChain", "FastAPI", "OpenAI"]
  },
  {
    name: "CloudMortem",
    rank: "S",
    description: "Post-incident analysis platform for cloud infrastructure failures with automated root-cause detection.",
    github: "https://github.com/H8rsh100/CloudMortem",
    tags: ["Python", "AWS", "React", "MongoDB"]
  },
  {
    name: "Chain-of-Custody",
    rank: "A",
    description: "Blockchain-based evidence tracking system ensuring tamper-proof chain of custody for digital forensics.",
    github: "https://github.com/H8rsh100/Chain-of-Custody",
    tags: ["Solidity", "Web3.js", "React", "IPFS"]
  },
  {
    name: "AoT Encyclopedia",
    rank: "A",
    description: "Interactive Attack on Titan archive with tactical dossiers, timeline mapping, and cinematic UI.",
    github: "https://github.com/H8rsh100/AOT",
    tags: ["HTML", "CSS", "JavaScript", "Web Audio"]
  },
  {
    name: "ISO-CHRON",
    rank: "A",
    description: "Time-series anomaly detection system for ISO compliance monitoring in manufacturing pipelines.",
    github: "https://github.com/H8rsh100/ISO-CHRON",
    tags: ["Python", "TensorFlow", "Flask", "PostgreSQL"]
  },
  {
    name: "Crime Hotspot Predictor",
    rank: "A",
    description: "ML-driven crime prediction model using spatial analysis and historical data for law enforcement.",
    github: "https://github.com/H8rsh100/Crime-Hotspot-Predictor",
    tags: ["Python", "Scikit-learn", "Folium", "Pandas"]
  }
];
