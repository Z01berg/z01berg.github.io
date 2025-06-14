import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { Github, RefreshCw, Clock, ArrowUpDown } from 'lucide-react';
import ProjectService, { Project } from '../services/ProjectService';
import CacheService from '../services/CacheService';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/main';

// Define available tags with categories
const AVAILABLE_TAGS = {
  type: ['Web App', 'Game', 'Library', 'Tool', 'API', 'CLI', 'Mobile App', 'Desktop App', 'Portfolio', 'Website'],
  tech: [
    'React', 'TypeScript', 'JavaScript', 'Java', 'C++', 'C#', '.NET', 'Python', 'Unity', 'Godot',
    'HTML', 'CSS', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'SQL', 'PostgreSQL', 'Git',
    'Figma', 'Blender', 'Aseprite', 'Deflemask', 'SolidWorks'
  ],
  complexity: [
    'Full Stack', 'Backend', 'Frontend', 'Database', 'Graphics', 'AI/ML', 'Networking', 'Security',
    '3D Modeling', 'Game Design', 'UI/UX', 'Animation', 'Physics', 'Audio', 'Multiplayer'
  ],
  domain: [
    'Game Dev', 'Web Dev', 'Data Science', 'System Design', 'DevOps', 'UI/UX', 'Testing', 'Performance',
    'Graphics Programming', 'Audio Programming', 'Network Programming', 'Embedded Systems',
    'CAD Design', 'Media Production', 'Educational'
  ]
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'latest' | 'earliest'>('latest');
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [lastReloadTime, setLastReloadTime] = useState<number>(0);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const { language } = useLanguage();
  const t = translations[language];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fetchProjects = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Check if we're in cooldown
    if (now < cooldownUntil) {
      const hoursLeft = Math.ceil((cooldownUntil - now) / (1000 * 60 * 60));
      setError(`Rate limit exceeded. Please try again in ${hoursLeft} hours.`);
      return;
    }

    // Check for rapid reloads
    if (now - lastReloadTime < 15 * 60 * 1000) { // 15 minutes
      setReloadCount(prev => prev + 1);
      if (reloadCount >= 4) { // Allow 5 reloads (0-4) in last 15 minutes
        const cooldownTime = now + (12 * 60 * 60 * 1000); // 12 hours
        setCooldownUntil(cooldownTime);
        setError('Too many reloads. Please try again in 12 hours.');
        return;
      }
    } else {
      setReloadCount(0);
    }

    setLastReloadTime(now);
    setLoading(true);
    setError(null);
    setProjects([]);

    try {
      const fetchData = async () => {
        const fetchedProjects = await ProjectService.getProjects();
        return Array.from(new Map(fetchedProjects.map(project => [project.id, project])).values());
      };

      const data = forceRefresh 
        ? await CacheService.forceRefresh('githubProjects', fetchData)
        : await CacheService.get('githubProjects', fetchData);
      
      setProjects(data);
      setLastFetchTime(new Date().toLocaleString());
    } catch (err: any) {
      if (err.message?.includes('API rate limit exceeded')) {
        setError('GitHub API rate limit exceeded. Please try again in an hour.');
      } else {
        setError('Failed to fetch projects. Please try again later.');
      }
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, []);

  // Get all unique tags from projects
  const getAllTags = (projects: Project[]): string[] => {
    const tagSet = new Set<string>();
    projects.forEach(project => {
      // Get top 3 most relevant tags for each project
      const topTags = getTopTags(project.tags);
      topTags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  };

  // Get top 3 most relevant tags
  const getTopTags = (tags: string[]): string[] => {
    // First, try to get technology tags
    const techTags = tags.filter(tag => AVAILABLE_TAGS.tech.includes(tag));
    
    // If we have tech tags, return up to 3 of them
    if (techTags.length > 0) {
      return techTags.slice(0, 3);
    }
    
    // If no tech tags, try to get type tags
    const typeTags = tags.filter(tag => AVAILABLE_TAGS.type.includes(tag));
    if (typeTags.length > 0) {
      return typeTags.slice(0, 3);
    }
    
    // If no type tags, try to get complexity tags
    const complexityTags = tags.filter(tag => AVAILABLE_TAGS.complexity.includes(tag));
    if (complexityTags.length > 0) {
      return complexityTags.slice(0, 3);
    }
    
    // If no complexity tags, try to get domain tags
    const domainTags = tags.filter(tag => AVAILABLE_TAGS.domain.includes(tag));
    if (domainTags.length > 0) {
      return domainTags.slice(0, 3);
    }
    
    // If no matching tags found, return original tags (up to 3)
    return tags.slice(0, 3);
  };

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => !selectedTag || project.tags.includes(selectedTag))
    .sort((a, b) => {
      const dateA = a.stats?.lastCommit ? new Date(a.stats.lastCommit).getTime() : 0;
      const dateB = b.stats?.lastCommit ? new Date(b.stats.lastCommit).getTime() : 0;
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t.projects.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t.projects.subtitle}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">
                {t.projects.note}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-end space-y-2"
            >
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Z01berg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-5 h-5 mr-2 text-white" /> {t.projects.githubProfile}
                </a>

                <button
                  onClick={() => fetchProjects(true)}
                  disabled={loading || cooldownUntil > Date.now()}
                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 mr-2 text-gray-800 dark:text-white ${loading ? 'animate-spin' : ''}`} />
                  {t.projects.refresh}
                </button>
              </div>
              {lastFetchTime && (
                <div className="text-sm text-gray-700 dark:text-white flex items-center relative z-10">
                  <Clock className="w-4 h-4 mr-1 text-gray-700 dark:text-white" />
                  {t.projects.lastUpdated} {lastFetchTime}
                </div>
              )}
              {cooldownUntil > Date.now() && (
                <div className="text-sm text-red-500 dark:text-red-400">
                  {t.projects.cooldownActive} {Math.ceil((cooldownUntil - Date.now()) / (1000 * 60 * 60))} hours.
                </div>
              )}
            </motion.div>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-8 rounded">
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTag
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t.projects.all}
            </button>
            {getAllTags(projects).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSortOrder(sortOrder === 'latest' ? 'earliest' : 'latest')}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>{t.projects.sortBy} {sortOrder === 'latest' ? t.projects.latest : t.projects.earliest}</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;