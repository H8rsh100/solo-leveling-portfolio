// ─── Solo Leveling Portfolio — Data Module ───
// Version: 2.1 — Updated with Rust, Bastion, FerriteDB, Overkube, SentryMesh, MigrationMind
const PROFILE = {
  name: "HARSH",
  handle: "_h8rshh",
  role: "Full-Stack Developer • AI Engineer • Blockchain Architect",
  rank: "S",
  stats: [
    { label: "Projects", value: "20+" },
    { label: "Hackathons", value: "8+" },
    { label: "Rank", value: "S" }
  ],
  links: {
    github: "https://github.com/H8rsh100",
    instagram: "https://instagram.com/_h8rshh"
  }
};

const TECH_STACK = [
  { name: "C++", proficiency: 90, rank: "S" },
  { name: "Python", proficiency: 95, rank: "S" },
  { name: "Rust", proficiency: 82, rank: "A" },
  { name: "React", proficiency: 85, rank: "A" },
  { name: "FastAPI", proficiency: 88, rank: "A" },
  { name: "MongoDB", proficiency: 80, rank: "A" },
  { name: "Solidity", proficiency: 75, rank: "B" },
  { name: "Kubernetes", proficiency: 78, rank: "A" },
  { name: "Docker", proficiency: 80, rank: "A" },
  { name: "LangChain", proficiency: 85, rank: "A" },
  { name: "JavaScript", proficiency: 90, rank: "S" },
  { name: "Node.js", proficiency: 85, rank: "A" }
];

const SKILLS = {
  "Languages": [
    { name: "Python", rank: "S", level: 95 },
    { name: "C++", rank: "S", level: 90 },
    { name: "JavaScript", rank: "S", level: 90 },
    { name: "Rust", rank: "A", level: 82 },
    { name: "SQL", rank: "A", level: 82 },
    { name: "Solidity", rank: "B", level: 75 }
  ],
  "AI / ML": [
    { name: "OpenAI API", rank: "S", level: 90 },
    { name: "LangChain", rank: "A", level: 85 },
    { name: "Scikit-learn", rank: "A", level: 83 },
    { name: "TensorFlow", rank: "A", level: 80 },
    { name: "NLP", rank: "A", level: 78 }
  ],
  "Web": [
    { name: "FastAPI", rank: "A", level: 88 },
    { name: "React", rank: "A", level: 85 },
    { name: "Node.js", rank: "A", level: 85 },
    { name: "Flask", rank: "A", level: 82 },
    { name: "Next.js", rank: "B", level: 74 }
  ],
  "DevOps / Infra": [
    { name: "Docker", rank: "A", level: 80 },
    { name: "Kubernetes", rank: "A", level: 78 },
    { name: "GitOps", rank: "B", level: 72 }
  ],
  "Blockchain": [
    { name: "Solidity", rank: "B", level: 75 },
    { name: "Web3.js", rank: "B", level: 72 },
    { name: "Hardhat", rank: "B", level: 70 },
    { name: "Smart Contracts", rank: "B", level: 74 }
  ],
  "Embedded / IoT": [
    { name: "MQTT", rank: "B", level: 72 },
    { name: "Raspberry Pi", rank: "B", level: 70 },
    { name: "Arduino", rank: "B", level: 68 },
    { name: "IoT Protocols", rank: "B", level: 65 }
  ]
};

const PROJECTS = [
  {
    name: "Bastion",
    rank: "S",
    description: "Offline security intelligence server powered by quantized LLM + RAG over CVE feeds, exposed as an MCP server.",
    github: "https://github.com/H8rsh100/Bastion",
    tags: ["Python", "FastAPI", "LLM", "RAG", "MCP", "Docker"]
  },
  {
    name: "FerriteDB",
    rank: "S",
    description: "Relational database engine built from scratch in Rust with storage engine, B+Tree indexing, SQL parsing, optimizer, and ACID transactions.",
    github: "https://github.com/H8rsh100/FerriteDB",
    tags: ["Rust", "B+Tree", "MVCC", "ACID", "WAL"]
  },
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
    name: "Overkube",
    rank: "A",
    description: "Kubernetes workload right-sizer analyzing real-time P90/P99 metrics and auto-raising GitOps PRs to fix resource limits.",
    github: "https://github.com/H8rsh100/Overkube",
    tags: ["Python", "React", "Kubernetes", "GitOps", "FinOps"]
  },
  {
    name: "SentryMesh",
    rank: "A",
    description: "ML-powered IoT Intrusion Detection System operating over MQTT with attack vector simulation and live cyberpunk dashboard.",
    github: "https://github.com/H8rsh100/SentryMesh",
    tags: ["Python", "Docker", "MQTT", "IoT", "ML", "WebSocket"]
  },
  {
    name: "MigrationMind",
    rank: "A",
    description: "AI-powered database migration risk analyzer that parses SQL AST, calculates risk scores, and integrates into CI/CD pipelines.",
    github: "https://github.com/H8rsh100/MigrationMind",
    tags: ["Python", "MySQL", "PostgreSQL", "AI", "AST", "CI/CD"]
  },
  {
    name: "Chain-of-Custody",
    rank: "A",
    description: "Blockchain-based evidence tracking system ensuring tamper-proof chain of custody for digital forensics.",
    github: "https://github.com/H8rsh100/Chain-of-Custody",
    tags: ["Solidity", "Web3.js", "React", "IPFS"]
  },
  {
    name: "NetGuard",
    rank: "A",
    description: "Unified Cyber Security Operations Center (SOC) dashboard inspecting live packet traffic with ML anomaly detection and real-time firewall control.",
    github: "https://github.com/H8rsh100/NetGuard",
    tags: ["Python", "Flask", "Scapy", "ML", "WebSocket"]
  },
  {
    name: "Cryptex",
    rank: "A",
    description: "Production-grade E2E encrypted 1:1 messaging application with RSA-2048 key exchange and AES-256-GCM transport security.",
    github: "https://github.com/H8rsh100/Cryptex",
    tags: ["Python", "Cryptography", "RSA", "AES-256", "WebSocket"]
  }
];

