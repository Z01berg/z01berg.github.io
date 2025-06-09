import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Layout, Terminal, Globe, Server, Languages, Brain, Rocket, Gamepad2, Palette, Briefcase, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Technology {
  name: string;
  icon: JSX.Element;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const technologies = {
  frontend: [
    { name: 'JavaScript', icon: <Code2 className="w-5 h-5" />, color: 'bg-yellow-500', level: 'Advanced' as const },
    { name: 'TypeScript', icon: <Code2 className="w-5 h-5" />, color: 'bg-blue-500', level: 'Advanced' as const },
    { name: 'React', icon: <Code2 className="w-5 h-5" />, color: 'bg-cyan-500', level: 'Advanced' as const },
    { name: 'HTML5', icon: <Globe className="w-5 h-5" />, color: 'bg-orange-600', level: 'Advanced' as const },
    { name: 'CSS3', icon: <Layout className="w-5 h-5" />, color: 'bg-blue-600', level: 'Advanced' as const },
    { name: 'Tailwind', icon: <Layout className="w-5 h-5" />, color: 'bg-teal-500', level: 'Advanced' as const },
  ],
  backend: [
    { name: 'Java', icon: <Code2 className="w-5 h-5" />, color: 'bg-red-600', level: 'Advanced' as const },
    { name: 'C++', icon: <Code2 className="w-5 h-5" />, color: 'bg-blue-700', level: 'Advanced' as const },
    { name: 'C#', icon: <Code2 className="w-5 h-5" />, color: 'bg-purple-600', level: 'Advanced' as const },
    { name: '.NET', icon: <Code2 className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const },
    { name: 'Python', icon: <Code2 className="w-5 h-5" />, color: 'bg-blue-500', level: 'Advanced' as const },
    { name: 'R', icon: <Code2 className="w-5 h-5" />, color: 'bg-blue-400', level: 'Intermediate' as const },
  ],
  database: [
    { name: 'SQL', icon: <Database className="w-5 h-5" />, color: 'bg-orange-500', level: 'Advanced' as const },
    { name: 'PL-SQL', icon: <Database className="w-5 h-5" />, color: 'bg-orange-600', level: 'Advanced' as const },
    { name: 'T-SQL', icon: <Database className="w-5 h-5" />, color: 'bg-orange-700', level: 'Advanced' as const },
    { name: 'MySQL', icon: <Database className="w-5 h-5" />, color: 'bg-blue-600', level: 'Advanced' as const },
  ],
  gameDev: [
    { name: 'Unity', icon: <Gamepad2 className="w-5 h-5" />, color: 'bg-gray-600', level: 'Advanced' as const },
    { name: 'Godot', icon: <Gamepad2 className="w-5 h-5" />, color: 'bg-green-600', level: 'Intermediate' as const },
    { name: 'MonoGame', icon: <Gamepad2 className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const },
    { name: 'SFML', icon: <Gamepad2 className="w-5 h-5" />, color: 'bg-blue-600', level: 'Intermediate' as const },
  ],
  design: [
    { name: 'Figma', icon: <Palette className="w-5 h-5" />, color: 'bg-pink-500', level: 'Advanced' as const },
    { name: 'Blender', icon: <Palette className="w-5 h-5" />, color: 'bg-orange-500', level: 'Intermediate' as const },
    { name: 'Aseprite', icon: <Palette className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const },
    { name: 'Deflemask', icon: <Palette className="w-5 h-5" />, color: 'bg-green-500', level: 'Intermediate' as const },
  ],
  tools: [
    { name: 'Git', icon: <Terminal className="w-5 h-5" />, color: 'bg-orange-600', level: 'Advanced' as const },
    { name: 'GitHub', icon: <Terminal className="w-5 h-5" />, color: 'bg-gray-800', level: 'Advanced' as const },
    { name: 'JetBrains IDEs', icon: <Code2 className="w-5 h-5" />, color: 'bg-purple-600', level: 'Advanced' as const },
    { name: 'JIRA', icon: <Wrench className="w-5 h-5" />, color: 'bg-blue-500', level: 'Advanced' as const },
  ],
  business: [
    { name: 'Team Leadership', icon: <Briefcase className="w-5 h-5" />, color: 'bg-blue-500', level: 'Advanced' as const },
    { name: 'Project Management', icon: <Briefcase className="w-5 h-5" />, color: 'bg-green-500', level: 'Advanced' as const },
    { name: 'Agile Methodologies', icon: <Rocket className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const },
    { name: 'Business Analysis', icon: <Brain className="w-5 h-5" />, color: 'bg-orange-500', level: 'Advanced' as const },
  ],
  other: [
    { name: 'SolidWorks', icon: <Wrench className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const},
    { name: '3D Modeling', icon: <Wrench className="w-5 h-5" />, color: 'bg-blue-500', level: 'Intermediate' as const },
    { name: 'Radio Engineering', icon: <Wrench className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const},
    { name: 'Media Editing', icon: <Palette className="w-5 h-5" />, color: 'bg-purple-500', level: 'Advanced' as const },
  ]
};

const languages = [
  { name: 'Ukrainian', level: 'Native', flag: '🇺🇦' },
  { name: 'Polish', level: 'C1', flag: '🇵🇱' },
  { name: 'English', level: 'C1', flag: '🇬🇧' },
  { name: 'German', level: 'A2', flag: '🇩🇪' },
  { name: 'Japanese', level: 'N4', flag: '🇯🇵' },
  { name: 'russian', level: 'N/A', flag: '🚫' },
];

const TechnologyCard = ({ tech }: { tech: Technology }) => {
  const levelColors = {
    Beginner: 'bg-gray-200 dark:bg-gray-700',
    Intermediate: 'bg-blue-200 dark:bg-blue-700',
    Advanced: 'bg-green-200 dark:bg-green-700',
    Expert: 'bg-orange-200 dark:bg-orange-700'
  };

  return (
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className={`${tech.color} p-2 rounded-lg text-white`}>
          {tech.icon}
        </div>
        <div className="flex-grow">
          <div className="font-medium text-gray-900 dark:text-white">{tech.name}</div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${levelColors[tech.level]} text-gray-800 dark:text-white`}>
        {tech.level}
      </span>
      </div>
  );
};

const SkillSection = ({ title, icon, technologies }: { title: string; icon: JSX.Element; technologies: Technology[] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
      <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg text-orange-500">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="grid gap-3">
          {technologies.map((tech, index) => (
              <TechnologyCard key={tech.name} tech={tech} />
          ))}
        </div>
      </motion.div>
  );
};

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.skills.title}
        </h2>
        <p className="text-xl text-center mb-16 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t.skills.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.frontend}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>HTML5 & CSS3</li>
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.backend}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Node.js</li>
              <li>Express</li>
              <li>Python</li>
              <li>Django</li>
              <li>REST APIs</li>
              <li>GraphQL</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.database}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>MongoDB</li>
              <li>PostgreSQL</li>
              <li>MySQL</li>
              <li>Redis</li>
              <li>Firebase</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.gameDev}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Unity</li>
              <li>C#</li>
              <li>Game Design</li>
              <li>3D Modeling</li>
              <li>Animation</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.design}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Figma</li>
              <li>Adobe XD</li>
              <li>Photoshop</li>
              <li>Illustrator</li>
              <li>UI/UX Design</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.tools}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>VS Code</li>
              <li>Webpack</li>
              <li>Jest</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.business}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Project Management</li>
              <li>Agile/Scrum</li>
              <li>Team Leadership</li>
              <li>Problem Solving</li>
              <li>Communication</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.skills.sections.other}
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Technical Writing</li>
              <li>Public Speaking</li>
              <li>Research</li>
              <li>Mentoring</li>
              <li>Continuous Learning</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            {t.skills.languageSkills}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
              <span className="text-gray-900 dark:text-white font-medium">English</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">(C1)</span>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
              <span className="text-gray-900 dark:text-white font-medium">Polish</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">(B2)</span>
            </div>
            <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
              <span className="text-gray-900 dark:text-white font-medium">Ukrainian</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2">(Native)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;