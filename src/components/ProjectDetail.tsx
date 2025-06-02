import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, GitBranch, GitCommit, MessageSquare, Clock, GitFork, AlertCircle, Send, Maximize2, Minimize2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Project } from '../services/ProjectService';
import AIService from '../services/AIService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fullscreenMedia, setFullscreenMedia] = useState<{ url: string; type: 'image' | 'video' | 'gif' } | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const fullscreenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Remove the click outside handler for the detail view
            // Now it will only close with the X button
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const projectInfo = `
Project Name: ${project.name}
Description: ${project.description}
Technologies: ${project.tags.join(', ')}
Statistics:
- Total Commits: ${project.stats?.totalCommits || 0}
- Stars: ${project.stats?.stars || 0}
- Forks: ${project.stats?.forks || 0}
- Last Commit: ${project.stats?.lastCommit || 'N/A'}
- Open Issues: ${project.stats?.openIssues || 0}
- Commit Streak: ${project.stats?.streak || 0} commits in last 30 days

Project Documentation:
${project.readme || 'No README documentation available.'}

Repository URL: ${project.repoUrl}
Demo URL: ${project.demoUrl || 'Not available'}
`;

            const response = await AIService.chat(projectInfo, userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMediaClick = (url: string) => {
        if (url.match(/\.gif$/i)) {
            setFullscreenMedia({ url, type: 'gif' });
        } else if (url.match(/\.(mp4|webm)$/i)) {
            setFullscreenMedia({ url, type: 'video' });
        } else {
            setFullscreenMedia({ url, type: 'image' });
        }
    };

    const handleFullscreenClick = (e: React.MouseEvent) => {
        // Only close if clicking the background
        if (e.target === e.currentTarget) {
            setFullscreenMedia(null);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center p-4 overflow-y-auto">
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl my-8 relative mt-16"
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="space-y-8">
                            {project.imageUrls.length > 0 && (
                                <div className="mb-8 relative">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation={{
                                            enabled: true,
                                            prevEl: '.swiper-button-prev',
                                            nextEl: '.swiper-button-next',
                                        }}
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        className="rounded-lg overflow-hidden"
                                    >
                                        {project.imageUrls.map((url, i) => (
                                            <SwiperSlide key={i}>
                                                {url.match(/\.(mp4|webm|gif)$/i) ? (
                                                    url.match(/\.gif$/i) ? (
                                                        <div className="relative group cursor-pointer" onClick={() => handleMediaClick(url)}>
                                                            <img
                                                                src={url}
                                                                alt={`${project.name} gif ${i+1}`}
                                                                className="w-full h-64 object-contain bg-black"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                                                                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group cursor-pointer" onClick={() => handleMediaClick(url)}>
                                                            <video
                                                                src={url}
                                                                controls
                                                                className="w-full h-64 object-contain bg-black"
                                                            >
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                                                                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="relative group cursor-pointer" onClick={() => handleMediaClick(url)}>
                                                        <img
                                                            src={url}
                                                            alt={`${project.name} screenshot ${i+1}`}
                                                            className="w-full h-64 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                                                            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                )}
                                            </SwiperSlide>
                                        ))}
                                        <div className="swiper-button-prev !h-full !w-12 !top-0 !left-0 !m-0 !bg-black/20 hover:!bg-black/40 transition-colors" />
                                        <div className="swiper-button-next !h-full !w-12 !top-0 !right-0 !m-0 !bg-black/20 hover:!bg-black/40 transition-colors" />
                                    </Swiper>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <GitCommit className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Commits</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.stats?.totalCommits || 0}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Star className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Stars</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.stats?.stars || 0}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <GitFork className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Forks</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.stats?.forks || 0}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Clock className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Last Commit</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {project.stats?.lastCommit ? new Date(project.stats.lastCommit).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Open Issues</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.stats?.openIssues || 0}
                                    </span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <GitBranch className="w-5 h-5 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">30-Day Streak</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.stats?.streak || 0}
                                    </span>
                                </div>
                            </div>

                            {project.readme ? (
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto max-h-[500px]">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">README</h3>
                                    <div className="prose prose-orange dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: ({ node, inline, className, children, ...props }) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter
                                                            style={oneDark}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            className="!mt-4 !mb-4 rounded-lg"
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    ) : (
                                                        <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-orange-500 dark:text-orange-400" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                            }}
                                        >
                                            {project.readme}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">No README available for this project.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 flex flex-col h-full">
                            <div className="flex items-center mb-6">
                                <MessageSquare className="w-6 h-6 text-orange-500 mr-2" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Assistant</h3>
                            </div>

                            <div className="flex-grow overflow-y-auto mb-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                                {messages.length === 0 ? (
                                    <>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Ask me anything about this project! I can help you understand:
                                        </p>
                                        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                                            <li>• Project structure and architecture</li>
                                            <li>• Technologies used and why</li>
                                            <li>• How to get started</li>
                                            <li>• Best practices implemented</li>
                                            <li>• Common issues and solutions</li>
                                        </ul>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg p-3 ${
                                                        message.role === 'user'
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                                    }`}
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about the project..."
                                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {fullscreenMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
                        onClick={handleFullscreenClick}
                    >
                        <div 
                            className="relative max-h-[90vh] max-w-[90vw]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {fullscreenMedia.type === 'image' ? (
                                <img
                                    src={fullscreenMedia.url}
                                    alt="Fullscreen preview"
                                    className="max-h-[90vh] max-w-[90vw] object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <video
                                    src={fullscreenMedia.url}
                                    controls
                                    autoPlay
                                    className="max-h-[90vh] max-w-[90vw]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectDetail;