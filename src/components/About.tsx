import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { Calendar, MapPin, Code2, Gamepad, Book, School, Trophy, Rocket } from 'lucide-react';
import CacheService from '../services/CacheService';

interface GitHubInfo {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  created_at: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

const milestones: Milestone[] = [
  {
    year: '2003',
    title: 'Born in Ukraine',
    description: 'Born in a small village near Dolina, Ivano-Frankivsk region. From the start, I was always curious about how things work.',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    year: '2007',
    title: 'First PC Experience',
    description: 'First encounter with a PC at age 4. Fell in love with computing through games like "Purble Crying" & "Bugs Bunny: Lost in Time".',
    icon: <Code2 className="w-6 h-6" />
  },
  {
    year: '2008',
    title: 'Early Reading',
    description: 'Developed a passion for reading at age 5, able to read up to 15 tales per day. This marked my first serious hobby.',
    icon: <Book className="w-6 h-6" />
  },
  {
    year: '2010',
    title: 'Gaming Journey',
    description: 'Received my first Game Boy Advance SP, introducing me to English and the Mario franchise. Later discovered anime through Jetix and QTV.',
    icon: <Gamepad className="w-6 h-6" />
  },
  {
    year: '2013',
    title: 'Programming Begins',
    description: 'Started learning Pascal at age 10, inspired by Hideo Kojima. Began dreaming of creating video games and working in the industry.',
    icon: <Code2 className="w-6 h-6" />
  },
  {
    year: '2016-2017',
    title: 'Academic Excellence',
    description: 'Participated in IT Olympiads, achieving second place in city competitions and advancing to regional levels.',
    icon: <Trophy className="w-6 h-6" />
  },
  {
    year: '2018',
    title: 'Moving to Poland',
    description: 'Successfully enrolled in a Polish school with Ukrainian minority, marking a significant step towards international education.',
    icon: <School className="w-6 h-6" />
  },
  {
    year: '2021',
    title: 'University Journey',
    description: 'Chose PJATK (Polish-Japanese Academy of Information Technology), aligning with my passion for Japanese culture and technology.',
    icon: <Rocket className="w-6 h-6" />
  }
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [githubInfo, setGithubInfo] = useState<GitHubInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubInfo = async () => {
      try {
        const fetchData = async () => {
          const octokit = new Octokit();
          const { data } = await octokit.users.getByUsername({
            username: 'Z01berg'
          });

          return {
            name: data.name || 'Zahar Zubik',
            bio: data.bio || '',
            avatar_url: data.avatar_url,
            location: data.location || 'Poland',
            created_at: new Date(data.created_at).getFullYear().toString()
          };
        };

        const data = await CacheService.get('githubProfile', fetchData);
        setGithubInfo(data);
      } catch (error) {
        console.error('Error fetching GitHub info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubInfo();
  }, []);

  return (
      <section
          id="about"
          className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              <span className="text-orange-500">About</span> Me
            </h2>

            <div className="relative mb-12">
              <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-8"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                      <img
                          src={githubInfo?.avatar_url}
                          alt={githubInfo?.name}
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold">{githubInfo?.name}</h3>
                        <div className="flex items-center mt-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <p className="text-gray-200">{githubInfo?.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Introduction</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        I'm Zahar Zubik, born in 2003 in Ukraine (yes, Generation "Z"!). From my earliest days, I've been driven by curiosity, always asking "What?" and "Why?" about everything around me.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        My journey in technology began at age 4 with my first PC encounter, sparking a lifelong passion that would shape my future career path.
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <blockquote className="text-lg italic text-gray-600 dark:text-gray-300 border-l-4 border-orange-500 pl-4">
                        "When writing the story of your life, don't let anyone else hold the pen"
                      </blockquote>
                    </div>
                  </motion.div>

                  <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 50 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="space-y-8"
                  >
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">My Journey</h3>

                      <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                className="relative pl-8 border-l-2 border-orange-500"
                            >
                              <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                {milestone.icon}
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <span className="text-orange-500 font-bold">{milestone.year}</span>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
                                  {milestone.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                  {milestone.description}
                                </p>
                              </div>
                            </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <a
                          href="#skills"
                          className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-300"
                      >
                        My Skills
                      </a>
                      <a
                          href="#projects"
                          className="inline-block px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300"
                      >
                        My Projects
                      </a>
                    </div>
                  </motion.div>
                </div>
            )}
          </motion.div>
        </div>
      </section>
  );
};

export default About;