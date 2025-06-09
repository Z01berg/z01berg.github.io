import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Layout, Terminal, Globe, Server, Languages, Brain, Rocket, Gamepad2, Palette, Briefcase, Wrench } from 'lucide-react';

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

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Technical <span className="text-orange-500">Skills</span>
            </h2>

            <div className="relative mb-12">
              <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <SkillSection
                  title="Frontend Development"
                  icon={<Globe className="w-6 h-6" />}
                  technologies={technologies.frontend}
              />
              <SkillSection
                  title="Backend Development"
                  icon={<Server className="w-6 h-6" />}
                  technologies={technologies.backend}
              />
              <SkillSection
                  title="Database"
                  icon={<Database className="w-6 h-6" />}
                  technologies={technologies.database}
              />
              <SkillSection
                  title="Game Development"
                  icon={<Gamepad2 className="w-6 h-6" />}
                  technologies={technologies.gameDev}
              />
              <SkillSection
                  title="Design & Multimedia"
                  icon={<Palette className="w-6 h-6" />}
                  technologies={technologies.design}
              />
              <SkillSection
                  title="Development Tools"
                  icon={<Terminal className="w-6 h-6" />}
                  technologies={technologies.tools}
              />
              <SkillSection
                  title="Business & Management"
                  icon={<Briefcase className="w-6 h-6" />}
                  technologies={technologies.business}
              />
              <SkillSection
                  title="Other Skills"
                  icon={<Wrench className="w-6 h-6" />}
                  technologies={technologies.other}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Language <span className="text-orange-500">Skills</span>
            </h2>

            <div className="relative mb-12">
              <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {languages.map((language) => (
                  <motion.div
                      key={language.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{language.flag}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {language.name}
                      </h3>
                    </div>
                    <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 rounded-full text-sm font-medium">
                      {language.level}
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  );
};

export default Skills;