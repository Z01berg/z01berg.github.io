import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { Calendar, MapPin, Code2, Gamepad, Book, School, Trophy, Rocket } from 'lucide-react';
import CacheService from '../services/CacheService';
import { useLanguage } from '../contexts/LanguageContext';

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

const About: React.FC = () => {
  const { t } = useLanguage();
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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.about.title}
        </h2>
        <p className="text-xl text-center mb-16 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t.about.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.born.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.born.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.firstPC.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.firstPC.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.earlyReading.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.earlyReading.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.gaming.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.gaming.description}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.programming.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.programming.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.academic.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.academic.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.moving.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.moving.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t.about.milestones.university.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.about.milestones.university.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 space-x-4">
          <a
            href="#skills"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.about.mySkills}
          </a>
          <a
            href="#projects"
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {t.about.myProjects}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;