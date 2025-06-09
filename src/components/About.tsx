import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { Calendar, MapPin, Code2, Gamepad, Book, School, Trophy, Rocket, Heart, Star, Coffee, Music, Gamepad2, Palette, Globe } from 'lucide-react';
import CacheService from '../services/CacheService';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/main';

interface GitHubInfo {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface Interest {
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

const interests: Interest[] = [
  {
    title: 'Game Development',
    description: 'Passionate about creating immersive gaming experiences, combining technical skills with creative storytelling.',
    icon: <Gamepad2 className="w-6 h-6" />
  },
  {
    title: 'Japanese Culture',
    description: 'Deeply interested in Japanese culture, language, and technology. Currently studying Japanese (N4 level).',
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: 'Digital Art',
    description: 'Enjoy creating digital art and pixel art, using tools like Aseprite and Blender for game assets.',
    icon: <Palette className="w-6 h-6" />
  },
  {
    title: 'Music',
    description: 'Love exploring different music genres, especially video game soundtracks and Japanese music.',
    icon: <Music className="w-6 h-6" />
  }
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubInfo, setGithubInfo] = useState<GitHubInfo | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

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
            created_at: new Date(data.created_at).getFullYear().toString(),
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following
          };
        };

        const data = await CacheService.get('githubProfile', fetchData);
        setGithubInfo(data);
      } catch (error) {
        console.error('Error fetching GitHub info:', error);
        setError('Error fetching GitHub info. Please try again later.');
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
            <span className="text-orange-500">{t.about.title}</span>
          </h2>

          <div className="relative mb-12">
            <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.about.journey}</h3>

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
                          {React.cloneElement(milestone.icon, { className: "w-6 h-6 text-white" })}
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
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {githubInfo && (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={githubInfo.avatar_url}
                          alt="GitHub Avatar"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{githubInfo.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{githubInfo.bio}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-orange-500">{githubInfo.public_repos}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-orange-500">{githubInfo.followers}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-orange-500">{githubInfo.following}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-orange-500" />
                          <span className="text-gray-600 dark:text-gray-300">{githubInfo.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Joined {new Date(githubInfo.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Interests & Hobbies</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {interests.map((interest, index) => (
                          <motion.div
                            key={interest.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                                {React.cloneElement(interest.icon, { className: "w-5 h-5 text-orange-500" })}
                              </div>
                              <h4 className="font-semibold text-gray-800 dark:text-white">{interest.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{interest.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;