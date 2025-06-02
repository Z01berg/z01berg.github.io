import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectService, { Project } from '../services/ProjectService';

const AdminPanel = () => {
  const [project, setProject] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    imageUrls: [],
    difficulty: 3,
    isExternal: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const success = await ProjectService.createProject(project);
      if (success) {
        setMessage({ type: 'success', text: 'Project added successfully!' });
        setProject({
          name: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          tags: [],
          imageUrls: [],
          difficulty: 3,
          isExternal: true,
        });
      } else {
        setMessage({ type: 'error', text: 'Failed to add project. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add External Project</h2>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={project.tags.join(', ')}
            onChange={(e) => setProject({ ...project, tags: e.target.value.split(',').map(t => t.trim()) })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image URLs (comma-separated)
          </label>
          <input
            type="text"
            value={project.imageUrls.join(', ')}
            onChange={(e) => setProject({ ...project, imageUrls: e.target.value.split(',').map(url => url.trim()) })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={project.difficulty}
            onChange={(e) => setProject({ ...project, difficulty: parseInt(e.target.value) })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Demo URL (optional)
          </label>
          <input
            type="url"
            value={project.demoUrl || ''}
            onChange={(e) => setProject({ ...project, demoUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding Project...' : 'Add Project'}
        </button>
      </form>
    </motion.div>
  );
};

export default AdminPanel;