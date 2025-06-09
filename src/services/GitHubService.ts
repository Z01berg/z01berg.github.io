import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  language: string;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Project {
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

class GitHubService {
  private username: string = 'Z01berg';
  private baseUrl: string = 'https://api.github.com';
  private token: string;

  // Project type to fallback image mapping
  private fallbackImages: Record<string, string[]> = {
    javascript: [
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg'
    ],
    typescript: [
      'https://images.pexels.com/photos/4578665/pexels-photo-4578665.jpeg',
      'https://images.pexels.com/photos/4578664/pexels-photo-4578664.jpeg',
      'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg'
    ],
    python: [
      'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
    ],
    'c#': [
      'https://images.pexels.com/photos/6330644/pexels-photo-6330644.jpeg',
      'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg',
      'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg'
    ],
    java: [
      'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg',
      'https://images.pexels.com/photos/4709291/pexels-photo-4709291.jpeg',
      'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg'
    ],
    default: [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
    ]
  };

  constructor() {
    const token = import.meta.env.VITE_HUB_TOKEN;
    if (!token) {
      console.warn('GitHub token is not configured. Some features may be limited.');
      this.token = '';
    } else {
      this.token = token;
    }
  }

  private async fetchWithAuth(url: string, params = {}) {
    try {
      const headers: any = {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await axios.get(url, {
        headers,
        params
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        console.warn('GitHub API rate limit exceeded or unauthorized. Please check your token configuration.');
        return null;
      }
      if (error.response?.status === 404) {
        // Silently return null for 404s as they're expected for missing directories
        return null;
      }
      if (error.response?.status === 409) {
        return null;
      }
      console.warn('GitHub API warning:', error.message);
      return null;
    }
  }

  private decodeBase64(base64: string): string {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch (error) {
      console.error('Error decoding base64:', error);
      return '';
    }
  }

  private async getRepositoryImages(repo: string, branch: string): Promise<string[]> {
    const imagePaths = [
      'doc/images',
      'docs/images',
      'documentation/images',
      'documentation/img',
      'assets/images',
      'img',
      'images',
      'screenshots',
      '.github/images',
      'public/images',
      'src/assets/images'
    ];

    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const images: string[] = [];

    try {
      for (const path of imagePaths) {
        const contents = await this.fetchWithAuth(
            `${this.baseUrl}/repos/${this.username}/${repo}/contents/${path}?ref=${branch}`
        );

        if (contents && Array.isArray(contents)) {
          const imageFiles = contents.filter(file =>
              imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
          );

          images.push(...imageFiles.map(file => file.download_url).filter(Boolean));
        }
      }

      // If no images found, use fallback images
      if (images.length === 0) {
        return this.getFallbackImages(repo);
      }

      return images;
    } catch (error) {
      console.warn(`Warning: Could not fetch images for ${repo}, using fallback images`);
      return this.getFallbackImages(repo);
    }
  }

  private getFallbackImages(repo: string): string[] {
    // Use a more reliable fallback image source
    return [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'
    ];
  }

  private async getReadme(repo: string): Promise<string | null> {
    try {
      const data = await this.fetchWithAuth(
          `${this.baseUrl}/repos/${this.username}/${repo}/readme`
      );

      if (!data) return null;

      if (typeof data === 'string') return data;

      if (data.content && data.encoding === 'base64') {
        return this.decodeBase64(data.content.replace(/\n/g, ''));
      }

      return null;
    } catch (error) {
      console.warn(`Error fetching README for ${repo}:`, error);
      return null;
    }
  }

  private async getRepositoryStats(repo: string): Promise<Project['stats'] | undefined> {
    try {
      const repository = await this.fetchWithAuth(
          `${this.baseUrl}/repos/${this.username}/${repo}`
      );

      if (!repository) {
        return undefined;
      }

      let allCommits: any[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const commits = await this.fetchWithAuth(
            `${this.baseUrl}/repos/${this.username}/${repo}/commits`,
            { per_page: 100, page }
        );

        if (!commits || commits.length === 0) {
          hasMore = false;
        } else {
          allCommits = [...allCommits, ...commits];
          if (commits.length < 100) {
            hasMore = false;
          } else {
            page++;
          }
        }
      }

      const today = new Date();
      const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

      const streak = allCommits
          .filter(commit => new Date(commit.commit.author.date) >= thirtyDaysAgo)
          .length;

      return {
        totalCommits: allCommits.length,
        stars: repository.stargazers_count,
        streak,
        lastCommit: allCommits[0]?.commit?.author?.date || 'N/A',
        openIssues: repository.open_issues_count,
        forks: repository.forks_count
      };
    } catch (error) {
      console.error('Error fetching repository stats:', error);
      return undefined;
    }
  }

  async getRepositories(): Promise<Repository[]> {
    return this.fetchWithAuth(`${this.baseUrl}/users/${this.username}/repos`, {
      sort: 'updated',
      direction: 'desc',
      per_page: 100
    });
  }

  async getProjects(): Promise<Project[]> {
    try {
      const repositories = await this.getRepositories();
      if (!repositories) return [];

      const projects = await Promise.all(repositories.map(async repo => {
        const [readme, stats, repoImages] = await Promise.all([
          this.getReadme(repo.name),
          this.getRepositoryStats(repo.name),
          this.getRepositoryImages(repo.name, repo.default_branch)
        ]);

        const imageUrls = repoImages.length > 0
            ? repoImages
            : this.getFallbackImages(repo.name);

        // Get all possible tags
        const allTags = new Set<string>();

        // Add language as a tech tag
        if (repo.language) {
            allTags.add(repo.language);
        }

        // Add topics
        if (repo.topics) {
            repo.topics.forEach(topic => allTags.add(topic));
        }

        // Add type tag based on repository name and description
        const typeTag = this.getProjectType(repo.name, repo.description);
        allTags.add(typeTag);

        // Add tech stack tags based on repository content
        const techTags = this.getTechStackTags(repo.topics || [], repo.language, repo.name, repo.description, readme);
        techTags.forEach(tag => allTags.add(tag));

        // Add complexity tag based on repository stats and topics
        const complexityTag = this.getComplexityTag(repo.topics || [], stats);
        allTags.add(complexityTag);

        // Calculate difficulty based on multiple factors
        const difficulty = this.calculateDifficulty(repo, stats, techTags, readme);

        // Get unique tags and limit to top 3 most relevant ones
        const uniqueTags = Array.from(allTags);
        const topTags = this.getTopTags(uniqueTags);

        return {
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || 'No description available',
          date: new Date(repo.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          }),
          tags: topTags,
          imageUrls,
          difficulty,
          repoUrl: repo.html_url,
          demoUrl: repo.homepage || undefined,
          stats,
          readme: readme || undefined
        };
      }));

      return projects.filter(project => project !== null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  private calculateDifficulty(repo: Repository, stats: any, techTags: string[], readme: string | null): number {
    let score = 0;
    const maxScore = 10;

    // 1. Tech Stack Complexity (0-3 points)
    const techStackScore = this.calculateTechStackScore(techTags);
    score += techStackScore;

    // 2. Project Activity (0-2 points)
    const activityScore = this.calculateActivityScore(stats);
    score += activityScore;

    // 3. Project Age (0-1 point)
    const ageScore = this.calculateAgeScore(repo.created_at);
    score += ageScore;

    // 4. Codebase Size (0-2 points)
    const sizeScore = this.calculateSizeScore(stats);
    score += sizeScore;

    // 5. Documentation Quality (0-2 points)
    const documentationScore = this.calculateDocumentationScore(readme);
    score += documentationScore;

    // Normalize score to 1-5 scale
    const normalizedScore = Math.max(1, Math.min(5, Math.ceil((score / maxScore) * 5)));
    return normalizedScore;
  }

  private calculateTechStackScore(techTags: string[]): number {
    let score = 0;
    const techScores: Record<string, number> = {
      'Unity': 3,
      'Unreal Engine': 3,
      'Godot': 2,
      'React': 2,
      'TypeScript': 2,
      'Node.js': 2,
      'Python': 1,
      'Java': 1,
      'C#': 1,
      'C++': 1,
      'SQL': 1,
      'MongoDB': 1,
      'Express': 1,
      'Tailwind': 1
    };

    // Get the highest tech score
    const maxTechScore = Math.max(
      ...techTags.map(tag => techScores[tag] || 0)
    );

    score += maxTechScore;
    return Math.min(3, score);
  }

  private calculateActivityScore(stats: any): number {
    if (!stats) return 0;
    let score = 0;

    // Commits in last 30 days
    if (stats.streak > 20) score += 1;
    else if (stats.streak > 10) score += 0.5;

    // Total commits
    if (stats.totalCommits > 100) score += 0.5;
    else if (stats.totalCommits > 50) score += 0.25;

    // Open issues and forks
    if (stats.openIssues > 5 || stats.forks > 5) score += 0.5;

    return Math.min(2, score);
  }

  private calculateAgeScore(createdAt: string): number {
    const ageInMonths = (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return ageInMonths > 6 ? 1 : 0;
  }

  private calculateSizeScore(stats: any): number {
    if (!stats) return 0;
    let score = 0;

    // Based on total commits
    if (stats.totalCommits > 200) score += 1;
    else if (stats.totalCommits > 100) score += 0.5;

    // Based on forks and stars
    if (stats.forks > 10 || stats.stars > 10) score += 1;

    return Math.min(2, score);
  }

  private calculateDocumentationScore(readme: string | null): number {
    if (!readme) return 0;
    let score = 0;

    // Check for various documentation elements
    if (readme.includes('## Installation')) score += 0.5;
    if (readme.includes('## Usage')) score += 0.5;
    if (readme.includes('## API')) score += 0.5;
    if (readme.includes('## Contributing')) score += 0.5;
    if (readme.includes('## License')) score += 0.5;

    return Math.min(2, score);
  }

  private getProjectType(name: string, description: string): string {
    const lowerName = name.toLowerCase();
    const lowerDesc = (description || '').toLowerCase();

    // Check for game projects
    if (lowerName.includes('game') || lowerDesc.includes('game') || 
        lowerName.includes('unity') || lowerDesc.includes('unity') ||
        lowerName.includes('godot') || lowerDesc.includes('godot')) {
        return 'Game';
    }

    // Check for other project types
    if (lowerName.includes('api') || lowerDesc.includes('api')) return 'API';
    if (lowerName.includes('cli') || lowerDesc.includes('cli')) return 'CLI';
    if (lowerName.includes('lib') || lowerDesc.includes('library')) return 'Library';
    if (lowerName.includes('web') || lowerDesc.includes('web')) return 'Web App';
    if (lowerName.includes('mobile') || lowerDesc.includes('mobile')) return 'Mobile App';
    if (lowerName.includes('desktop') || lowerDesc.includes('desktop')) return 'Desktop App';
    if (lowerName.includes('portfolio') || lowerDesc.includes('portfolio')) return 'Portfolio';
    if (lowerName.includes('diploma') || lowerDesc.includes('diploma')) return 'Academic';
    return 'Website';
  }

  private getTechStackTags(topics: string[], language: string, name: string, description: string, readme: string | null): string[] {
    const techTags = new Set<string>();
    
    // Add language as a tech tag if it exists
    if (language) {
        techTags.add(language);
    }

    // Combine all text for analysis
    const allText = [
        name.toLowerCase(),
        description?.toLowerCase() || '',
        readme?.toLowerCase() || '',
        ...topics.map(t => t.toLowerCase())
    ].join(' ');

    // Enhanced tech stack detection
    const techKeywords = {
        // Frontend
        'react': 'React',
        'next.js': 'Next.js',
        'vue': 'Vue.js',
        'angular': 'Angular',
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'html': 'HTML',
        'css': 'CSS',
        'sass': 'SASS',
        'tailwind': 'Tailwind CSS',
        'bootstrap': 'Bootstrap',
        'material-ui': 'Material UI',
        'redux': 'Redux',
        'graphql': 'GraphQL',

        // Backend
        'node': 'Node.js',
        'express': 'Express',
        'django': 'Django',
        'flask': 'Flask',
        'spring': 'Spring',
        'asp.net': 'ASP.NET',
        'php': 'PHP',
        'laravel': 'Laravel',
        'ruby': 'Ruby',
        'rails': 'Rails',
        'go': 'Go',
        'rust': 'Rust',

        // Databases
        'mongodb': 'MongoDB',
        'postgresql': 'PostgreSQL',
        'mysql': 'MySQL',
        'sqlite': 'SQLite',
        'redis': 'Redis',
        'firebase': 'Firebase',
        'dynamodb': 'DynamoDB',

        // Game Development
        'unity': 'Unity',
        'unreal': 'Unreal Engine',
        'godot': 'Godot',
        'monogame': 'MonoGame',
        'phaser': 'Phaser',
        'three.js': 'Three.js',
        'webgl': 'WebGL',

        // Mobile Development
        'react-native': 'React Native',
        'flutter': 'Flutter',
        'swift': 'Swift',
        'kotlin': 'Kotlin',
        'android': 'Android',
        'ios': 'iOS',

        // DevOps & Tools
        'docker': 'Docker',
        'kubernetes': 'Kubernetes',
        'aws': 'AWS',
        'azure': 'Azure',
        'gcp': 'GCP',
        'git': 'Git',
        'jenkins': 'Jenkins',
        'github-actions': 'GitHub Actions',
        'ci/cd': 'CI/CD',

        // Design & Graphics
        'figma': 'Figma',
        'blender': 'Blender',
        'photoshop': 'Photoshop',
        'illustrator': 'Illustrator',
        'sketch': 'Sketch',
        'adobe-xd': 'Adobe XD',

        // Testing & Quality
        'jest': 'Jest',
        'cypress': 'Cypress',
        'selenium': 'Selenium',
        'junit': 'JUnit',
        'pytest': 'PyTest'
    };

    // Check for tech keywords in all text
    for (const [key, value] of Object.entries(techKeywords)) {
        if (allText.includes(key)) {
            techTags.add(value);
        }
    }

    return Array.from(techTags);
  }

  private getComplexityTag(topics: string[], stats: any): string {
    const lowerTopics = topics.map(t => t.toLowerCase());
    
    if (lowerTopics.includes('fullstack') || lowerTopics.includes('full-stack')) return 'Full Stack';
    if (lowerTopics.includes('backend')) return 'Backend';
    if (lowerTopics.includes('frontend')) return 'Frontend';
    if (lowerTopics.includes('database')) return 'Database';
    if (lowerTopics.includes('graphics')) return 'Graphics';
    if (lowerTopics.includes('ai') || lowerTopics.includes('ml')) return 'AI/ML';
    if (lowerTopics.includes('networking')) return 'Networking';
    if (lowerTopics.includes('security')) return 'Security';
    if (lowerTopics.includes('3d') || lowerTopics.includes('3d-modeling')) return '3D Modeling';
    if (lowerTopics.includes('game-design')) return 'Game Design';
    if (lowerTopics.includes('ui') || lowerTopics.includes('ux')) return 'UI/UX';
    if (lowerTopics.includes('animation')) return 'Animation';
    if (lowerTopics.includes('physics')) return 'Physics';
    if (lowerTopics.includes('audio')) return 'Audio';
    if (lowerTopics.includes('multiplayer')) return 'Multiplayer';
    
    return 'Web Dev';
  }

  private getTopTags(tags: string[]): string[] {
    // Priority order: tech > type > complexity > domain
    const techTags = tags.filter(tag => {
        const techKeywords = [
            // Frontend
            'react', 'next.js', 'vue', 'angular', 'typescript', 'javascript', 'html', 'css', 'tailwind', 'bootstrap',
            // Backend
            'node', 'express', 'django', 'flask', 'spring', 'asp.net', 'php', 'laravel',
            // Databases
            'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis',
            // Game Development
            'unity', 'unreal', 'godot', 'monogame', 'phaser',
            // Mobile
            'react-native', 'flutter', 'swift', 'kotlin',
            // DevOps
            'docker', 'kubernetes', 'aws', 'azure', 'gcp',
            // Design
            'figma', 'blender', 'photoshop', 'illustrator'
        ];
        return techKeywords.some(key => tag.toLowerCase().includes(key));
    });
    
    if (techTags.length > 0) {
        return techTags.slice(0, 3);
    }

    const typeTags = tags.filter(tag => {
        const typeKeywords = [
            'web', 'game', 'library', 'tool', 'api', 'cli', 'mobile', 'desktop',
            'portfolio', 'website', 'academic', 'plugin', 'extension', 'framework'
        ];
        return typeKeywords.some(key => tag.toLowerCase().includes(key));
    });
    
    if (typeTags.length > 0) {
        return typeTags.slice(0, 3);
    }

    const complexityTags = tags.filter(tag => {
        const complexityKeywords = [
            'fullstack', 'backend', 'frontend', 'database', 'graphics',
            'ai', 'ml', 'networking', 'security', '3d', 'game-design',
            'ui', 'ux', 'animation', 'physics', 'audio', 'multiplayer',
            'microservices', 'distributed', 'real-time', 'embedded'
        ];
        return complexityKeywords.some(key => tag.toLowerCase().includes(key));
    });
    
    if (complexityTags.length > 0) {
        return complexityTags.slice(0, 3);
    }

    const domainTags = tags.filter(tag => {
        const domainKeywords = [
            'game-dev', 'web-dev', 'data-science', 'system-design',
            'devops', 'testing', 'performance', 'graphics', 'audio',
            'network', 'embedded', 'cad', 'media', 'educational',
            'e-commerce', 'social', 'enterprise', 'iot', 'blockchain'
        ];
        return domainKeywords.some(key => tag.toLowerCase().includes(key));
    });
    
    if (domainTags.length > 0) {
        return domainTags.slice(0, 3);
    }

    return tags.slice(0, 3);
  }
}

export default new GitHubService();