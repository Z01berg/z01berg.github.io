import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code2, Star, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Project } from '../services/ProjectService';
import ProjectDetail from './ProjectDetail';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectCardProps {
  project: Project;
  index: number;
}

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

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.1
      }
    })
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  const topTags = getTopTags(project.tags);

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        custom={index}
      >
        <div className="relative">
          {project.imageUrls.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="project-swiper"
            >
              {project.imageUrls.map((url, i) => (
                <SwiperSlide key={i}>
                  {url.match(/\.(mp4|webm|gif)$/i) ? (
                    url.match(/\.gif$/i) ? (
                      <img
                        src={url}
                        alt={`${project.name} gif ${i+1}`}
                        className="w-full h-48 object-contain bg-black"
                      />
                    ) : (
                      <video
                        src={url}
                        controls
                        className="w-full h-48 object-contain bg-black"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )
                  ) : (
                    <img
                      src={url}
                      alt={`${project.name} screenshot ${i+1}`}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Code2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full px-3 py-1 text-xs font-medium flex items-center shadow-md z-50">
            <Clock className="w-3 h-3 mr-1" />
            Last commit: {project.stats?.lastCommit ? formatDate(project.stats.lastCommit) : 'N/A'}
          </div>
        </div>

        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white truncate" title={project.name}>
            {project.name}
          </h3>

          <div className="flex mb-4 items-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => {
                const isFilled = i < project.difficulty;
                return (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${isFilled ? 'text-orange-500 fill-orange-500' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                );
              })}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Difficulty: {project.difficulty}/5
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {showMore ? project.description : `${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}`}
          </p>

          {project.description.length > 100 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium mb-4"
            >
              {showMore ? 'Show less' : 'Read more'}
            </button>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {topTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between">
          <button
            onClick={() => setShowDetail(true)}
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            View Details
          </button>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              <Github className="w-4 h-4 mr-1" /> Repository
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
            </a>
          )}
        </div>
      </motion.div>

      {showDetail && (
        <ProjectDetail
          project={project}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;