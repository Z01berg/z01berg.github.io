import GitHubService from './GitHubService';

export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
  imageUrls: string[];
  difficulty: number;
  repoUrl: string;
  demoUrl?: string;
  stats?: {
    totalCommits: number;
    stars: number;
    streak: number;
    lastCommit: string;
    openIssues: number;
    forks: number;
  };
  readme?: string;
}

class ProjectService {
  async getProjects(): Promise<Project[]> {
    try {
      return await GitHubService.getProjects();
    } catch (error) {
      console.error('Error in ProjectService:', error);
      throw error;
    }
  }

  async createProject(project: Omit<Project, 'id'>): Promise<boolean> {
    try {
      // In a real application, this would interact with a backend
      console.log('Creating project:', project);
      return true;
    } catch (error) {
      console.error('Error creating project:', error);
      return false;
    }
  }
}

export default new ProjectService();