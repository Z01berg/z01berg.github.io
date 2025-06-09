import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { Github, RefreshCw, Clock, ArrowUpDown } from 'lucide-react';
import ProjectService, { Project } from '../services/ProjectService';
import CacheService from '../services/CacheService';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'latest' | 'earliest'>('latest');
  const [lastFetchTime, setLastFetchTime] = useState<string>('');
  const [reloadCount, setReloadCount] = useState(0);
  const [lastReloadTime, setLastReloadTime] = useState<number>(0);
  const [cooldown, setCooldown] = useState<number>(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fetchProjects = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Check if we're in cooldown
    if (now < cooldown) {
      const hoursLeft = Math.ceil((cooldown - now) / (1000 * 60 * 60));
      setError(`Rate limit exceeded. Please try again in ${hoursLeft} hours.`);
      return;
    }

    // Check for rapid reloads
    if (now - lastReloadTime < 15 * 60 * 1000) { // 15 minutes
      setReloadCount(prev => prev + 1);
      if (reloadCount >= 1) { // Already reloaded once in last 15 minutes
        const cooldownTime = now + (12 * 60 * 60 * 1000); // 12 hours
        setCooldown(cooldownTime);
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.projects.title}
        </h2>
        <p className="text-xl text-center mb-16 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t.projects.subtitle}
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="relative z-0">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                {t.projects.lastUpdated} {lastFetchTime}
              </p>
              {cooldown > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-100">
                  {t.projects.cooldown} {cooldown}s
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">{t.projects.sortBy}:</span>
              <button
                onClick={() => setSortOrder('latest')}
                className={`px-4 py-2 rounded-lg ${
                  sortOrder === 'latest'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t.projects.latest}
              </button>
              <button
                onClick={() => setSortOrder('earliest')}
                className={`px-4 py-2 rounded-lg ${
                  sortOrder === 'earliest'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t.projects.earliest}
              </button>
            </div>
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
              All
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

          <div className="text-center mt-12">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.projects.viewAll}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;