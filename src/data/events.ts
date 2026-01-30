
export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  category: string;
  image: string;
  isFeatured: boolean;
  location: string;
  highlights: string[];
  // Extended Details
  registrationLink?: string;
  teamSize?: string;
  registrationFee?: string;
  eligibility?: string;
  prizes?: { title: string; amount: string; description: string }[];
  sponsors?: { name: string; logo: string; tier: string }[]; // Using text for logo placeholder
  faqs?: { question: string; answer: string }[];
  rules?: string[];
  schedule?: { time: string; activity: string }[];
}

export const events: Event[] = [
  {
    id: "hackathon-2026",
    title: "Strange Events Hackathon 2026",
    description: "Strange Events Hackathon 2026 is a national-level 48-hour hackathon designed for students who want to move beyond theoretical learning and apply their technical knowledge to solve real-world problems. The hackathon provides a platform for innovation, where fresh ideas are pitched, and solutions are built under zero-stress (or high-stress!) environments. Participants experience the complete innovation lifecycle, from problem identification and brainstorming to rapid prototyping and final pitching.",
    shortDescription: "National Level Hackathon - Code to Survive.",
    date: "Feb 15-17, 2026",
    category: "Hackathon",
    image: "/images/Events Images/1st.png",
    isFeatured: true,
    location: "Main Auditorium",
    highlights: ["48 Hours", "National Level", "Industry Mentors"],
    registrationLink: "#",
    teamSize: "2 - 4 Members",
    registrationFee: "Free",
    eligibility: "Open to all university students",
    prizes: [
      { title: "Winner", amount: "$1,000", description: "Cash prize + Internship Opportunities" },
      { title: "Runner Up", amount: "$500", description: "Cash prize + Swag Kits" },
      { title: "Best Design", amount: "$200", description: "Design Tools License + Swag" }
    ],
    sponsors: [
      { name: "TechCorp", logo: "TC", tier: "Platinum" },
      { name: "DevStudio", logo: "DS", tier: "Gold" },
      { name: "CloudSystems", logo: "CS", tier: "Silver" }
    ],
    faqs: [
      { question: "Who can participate?", answer: "Any student currently enrolled in a university or college can participate." },
      { question: "Is it mandatory to stay for the full duration?", answer: "Yes, this is a 48-hour physical hackathon. Rest areas will be provided." },
      { question: "Will participation certificates be provided?", answer: "Yes, all participants who submit a valid project will receive a certificate." },
      { question: "What is the team size?", answer: "Teams can consist of 2 to 4 members." }
    ],
    rules: [
      "Code must be written during the hackathon.",
      "Pre-existing projects are not allowed.",
      "Respect the code of conduct.",
      "Decisions of the judges are final."
    ],
    schedule: [
      { time: "Feb 15, 09:00 AM", activity: "Opening Ceremony" },
      { time: "Feb 15, 11:00 AM", activity: "Hacking Begins" },
      { time: "Feb 16, 05:00 PM", activity: "Mentoring Session 1" },
      { time: "Feb 17, 09:00 AM", activity: "Submission Deadline" },
      { time: "Feb 17, 11:00 AM", activity: "Pitching & Judging" }
    ]
  },
  {
    id: "tech-fest-2026",
    title: "Innovate Tech Fest",
    description: "The annual technology festival featuring robotics, AI showcases, and guest lectures from industry leaders.",
    shortDescription: "Annual Technology Festival.",
    date: "March 10-12, 2026",
    category: "Tech Fest",
    image: "/images/Events Images/2nd.png",
    isFeatured: true,
    location: "Campus Grounds",
    highlights: ["Robotics Wars", "AI Showcase", "Guest Lectures"],
    teamSize: "Individual or Team (up to 5)",
    registrationFee: "$10",
    eligibility: "Open to all",
    prizes: [
      { title: "Best Robot", amount: "$800", description: "Robotics Kit + Cash" },
      { title: "AI Challenge", amount: "$600", description: "Cloud Credits + Cash" }
    ],
    faqs: [
        { question: "Can I register on the spot?", answer: "Yes, but online registration is recommended to avoid queues." }
    ]
  },
  {
    id: "cultural-night",
    title: "Neon Cultural Night",
    description: "A vibrant evening of music, dance, and art performances by the university's finest talents.",
    shortDescription: "Music, Dance, and Art.",
    date: "April 5, 2026",
    category: "Cultural",
    image: "/images/Events Images/3rd.png", 
    isFeatured: false,
    location: "Open Air Theatre",
    highlights: ["Live Band", "Dance Off", "Art Gallery"],
    teamSize: "Varies by event",
    registrationFee: "Free for students",
    eligibility: "University students and faculty"
  },
  {
    id: "esports-tournament",
    title: "Inter-College Esports",
    description: "Battle it out in the ultimate gaming tournament. Valorant, CS:GO, and FIFA championships.",
    shortDescription: "Ultimate Gaming Tournament.",
    date: "May 20, 2026",
    category: "Sports",
    image: "/images/Events Images/4th.png",
    isFeatured: false,
    location: "Computer Center",
    highlights: ["Valorant", "CS:GO", "FIFA"],
    teamSize: "5 per team (Valorant/CS:GO)",
    registrationFee: "$20 per team",
    eligibility: "Inter-college students",
    prizes: [
        { title: "Valorant Winner", amount: "$400", description: "Gaming Peripherals + Cash" }
    ]
  }
];
