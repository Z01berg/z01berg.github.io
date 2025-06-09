import { motion } from 'framer-motion';
import { Download, ArrowLeft, Mail, MapPin, Phone, Globe, Github, Linkedin, FileText, Languages, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Translation {
    cv: {
        title: string;
        back: string;
        download: string;
        header: {
            role: string;
        };
        sections: {
            workExperience: string;
            projects: string;
            education: string;
            skills: string;
        };
        workExperience: {
            title: string;
            company: string;
            period: string;
            location: string;
            responsibilities: string[];
        };
        projects: {
            title: string;
            role: string;
            period: string;
            achievements: string[];
            additional: string;
        };
        education: {
            title: string;
            degree: string;
            field: string;
            university: string;
            period: string;
            achievements: string[];
        };
        skills: {
            title: string;
        };
        promotion: {
            title: string;
            interests: string;
            whyInternship: string;
            content: {
                interests1: string;
                interests2: string;
                interests3: string;
                internship1: string;
                internship2: string;
            };
        };
    };
}

interface Translations {
    en: Translation;
    pl: Translation;
    uk: Translation;
}

const CV = () => {
    const [activeTab, setActiveTab] = useState<'cv' | 'promotion'>('cv');
    const [language, setLanguage] = useState<'en' | 'pl' | 'uk'>('en');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }, []);

    const handlePrint = () => {
        // Don't change theme for printing anymore
        window.print();
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const translations: Translations = {
        en: {
            cv: {
                title: "CV",
                back: "Back to Portfolio",
                download: "Download",
                header: {
                    role: "Full Stack Developer & Game Developer"
                },
                sections: {
                    workExperience: "PROFESSIONAL EXPERIENCE",
                    projects: "KEY PROJECTS",
                    education: "EDUCATION",
                    skills: "TECHNICAL EXPERTISE"
                },
                workExperience: {
                    title: "Front-end Developer Intern",
                    company: "Silk Software House",
                    period: "March 2023 - June 2023",
                    location: "Warsaw, Poland",
                    responsibilities: [
                        "Engineered and enhanced front-end applications, including a sophisticated graphical simulation of Parent-Child inheritance in React with modern hooks, improving code maintainability and user experience.",
                        "Successfully migrated a React.js project to TypeScript, implementing comprehensive type safety measures and enhancing code reliability while maintaining full functionality.",
                        "Developed an interactive Tic-Tac-Toe game with modular header and footer components using React and custom hooks, demonstrating strong component architecture skills."
                    ]
                },
                projects: {
                    title: "\"Card Your Time\" - Turn-based Roguelike Card Game",
                    role: "Lead Developer & Project Manager",
                    period: "September 2023 - 2024",
                    achievements: [
                        "Architected and implemented an advanced procedural dungeon generation system, creating dynamic and engaging game environments.",
                        "Designed and developed a robust turn-based gameplay system, incorporating modern game design patterns and efficient state management.",
                        "Led cross-functional team meetings, ensuring clear communication and alignment on project goals and deliverables.",
                        "Implemented agile project management methodologies, optimizing team productivity and project timeline adherence.",
                        "Established comprehensive quality assurance processes, significantly reducing bug incidence and improving overall game stability.",
                        "Created detailed technical documentation and development guidelines, facilitating seamless team collaboration and knowledge transfer."
                    ],
                    additional: "Additional projects available upon request, showcasing expertise in various technologies and development methodologies."
                },
                education: {
                    title: "EDUCATION",
                    degree: "Bachelor of Engineering",
                    field: "Computer Science",
                    university: "University of Technology",
                    period: "2020 - 2024",
                    achievements: [
                        "Specialized in Software Engineering and Artificial Intelligence",
                        "Maintained a GPA of 4.5/5.0",
                        "Participated in multiple hackathons and coding competitions",
                        "Completed advanced courses in Machine Learning and Data Structures"
                    ]
                },
                skills: {
                    title: "TECHNICAL EXPERTISE"
                },
                promotion: {
                    title: "Cover Letter",
                    interests: "Professional Interests and Career Goals",
                    whyInternship: "Why Do You Want to Join This Internship?",
                    content: {
                        interests1: "I have always been fascinated by how things work—the mechanisms behind every process and innovation. When I first encountered a computer, I wanted to understand its inner workings and learn how to create technology myself. Curiosity quickly turned into a passion that drives my continuous growth in the field of computer science.",
                        interests2: "My interest in gaming further reinforced this ambition, as I not only enjoy playing but also envision developing games myself. Ultimately, my goal is to become a Game Developer and eventually establish my own game development company. However, before reaching that stage, I aim to gain extensive industry experience and progress to a Senior Developer role, mastering the necessary technical and leadership skills. Furthermore, I am interested in expanding my expertise into Senior Project Management and App/Web Development, as I believe that understanding multiple aspects of technology will allow me to create more innovative and impactful projects.",
                        interests3: "I actively keep up with emerging technologies because I see each advancement as an opportunity to explore a new, uncharted world with its own rules and specifications. That is why I chose to study computer science—it offers a broad spectrum of knowledge and technological exposure. My long-term aspiration is to develop innovative projects that integrate multiple technologies in ways that have never been explored before.",
                        internship1: "This internship presents a valuable opportunity for self-development and hands-on experience in the field I am most passionate about. I am eager to expand my skills in game development, application design, and project management, taking steps toward my long-term goal of becoming a Senior Developer and, eventually, an entrepreneur in the gaming industry.",
                        internship2: "I am particularly excited about the prospect of contributing to real-world projects and collaborating with professionals who share my enthusiasm for innovation. This experience aligns perfectly with my aspiration to design applications and websites that push boundaries and introduce fresh, unconventional ideas to the industry. By working on diverse projects, I hope to gain insights into advanced development practices and refine my ability to create applications that seamlessly blend different technologies in groundbreaking ways."
                    }
                }
            }
        },
        pl: {
            cv: {
                title: "CV",
                back: "Powrót do Portfolio",
                download: "Pobierz",
                header: {
                    role: "Programista Full Stack & Game Developer"
                },
                sections: {
                    workExperience: "DOŚWIADCZENIE ZAWODOWE",
                    projects: "PROJEKTY",
                    education: "EDUKACJA",
                    skills: "UMIEJĘTNOŚCI"
                },
                workExperience: {
                    title: "Stażysta Front-end Developer",
                    company: "Silk Software House",
                    period: "Marzec 2023 - Czerwiec 2023",
                    location: "Warszawa, Polska",
                    responsibilities: [
                        "Projektowanie i rozwijanie aplikacji front-endowych, w tym zaawansowanej symulacji graficznej dziedziczenia Parent-Child w React z wykorzystaniem nowoczesnych hooków, poprawiając utrzymywalność kodu i doświadczenie użytkownika.",
                        "Pomyślna migracja projektu React.js do TypeScript, wdrażając kompleksowe środki bezpieczeństwa typów i zwiększając niezawodność kodu przy zachowaniu pełnej funkcjonalności.",
                        "Opracowanie interaktywnej gry Tic-Tac-Toe z modułowymi komponentami nagłówka i stopki przy użyciu React i własnych hooków, demonstrując silne umiejętności architektury komponentów."
                    ]
                },
                projects: {
                    title: "\"Card Your Time\" - Karciana Gra Roguelike Turowa",
                    role: "Lead Developer & Project Manager",
                    period: "Wrzesień 2023 - 2024",
                    achievements: [
                        "Zaprojektowanie i wdrożenie zaawansowanego systemu proceduralnej generacji lochów, tworząc dynamiczne i angażujące środowiska gry.",
                        "Projektowanie i rozwój solidnego systemu rozgrywki turową, włączając nowoczesne wzorce projektowe gier i efektywne zarządzanie stanem.",
                        "Prowadzenie spotkań zespołu interdyscyplinarnego, zapewniając jasną komunikację i zgodność z celami projektu.",
                        "Wdrożenie metodologii zwinnego zarządzania projektami, optymalizując produktywność zespołu i przestrzeganie harmonogramu.",
                        "Ustanowienie kompleksowych procesów zapewnienia jakości, znacząco redukując występowanie błędów i poprawiając ogólną stabilność gry.",
                        "Tworzenie szczegółowej dokumentacji technicznej i wytycznych rozwojowych, ułatwiając płynną współpracę zespołu i transfer wiedzy."
                    ],
                    additional: "Dodatkowe projekty dostępne na życzenie, prezentujące doświadczenie w różnych technologiach i metodologiach rozwoju."
                },
                education: {
                    title: "EDUKACJA",
                    degree: "Inżynier",
                    field: "Informatyka",
                    university: "Polsko-Japońska Akademia Technik Komputerowych",
                    period: "2021 - Obecnie",
                    achievements: [
                        "Specjalizacja w Inżynierii Oprogramowania i Rozwoju Gier",
                        "Aktywny udział w konkursach programistycznych i hackathonach",
                        "Ukończenie zaawansowanych kursów z Machine Learning i Struktur Danych",
                        "Utrzymanie średniej ocen 4.5/5.0"
                    ]
                },
                skills: {
                    title: "UMIEJĘTNOŚCI TECHNICZNE"
                },
                promotion: {
                    title: "List Motywacyjny",
                    interests: "Zainteresowania Zawodowe i Cele Kariery",
                    whyInternship: "Dlaczego Chcesz Dołączyć do Tego Stażu?",
                    content: {
                        interests1: "Zawsze fascynowało mnie, jak działają różne rzeczy—mechanizmy stojące za każdym procesem i innowacją. Kiedy po raz pierwszy zetknąłem się z komputerem, chciałem zrozumieć jego wewnętrzne działanie i nauczyć się samodzielnie tworzyć technologie. Ciekawość szybko przerodziła się w pasję, która napędza mój ciągły rozwój w dziedzinie informatyki.",
                        interests2: "Moje zainteresowanie grami jeszcze bardziej wzmocniło tę ambicję, ponieważ nie tylko lubię grać, ale także marzę o tworzeniu własnych gier. Ostatecznie moim celem jest zostanie Game Developerem i założenie własnej firmy zajmującej się tworzeniem gier. Jednak zanim do tego dojdzie, zamierzam zdobyć szerokie doświadczenie w branży i awansować na stanowisko Senior Developera, opanowując niezbędne umiejętności techniczne i przywódcze. Ponadto interesuję się poszerzaniem swojej wiedzy w zakresie Zarządzania Projektami i Rozwoju Aplikacji/Stron Internetowych, ponieważ wierzę, że zrozumienie wielu aspektów technologii pozwoli mi tworzyć bardziej innowacyjne i wartościowe projekty.",
                        interests3: "Aktywnie śledzę nowe technologie, ponieważ każdy postęp widzę jako okazję do odkrycia nowego, niezbadanego świata z własnymi zasadami i specyfikacjami. Dlatego wybrałem studia informatyczne—oferują szeroki zakres wiedzy i ekspozycję na różne technologie. Moim długoterminowym celem jest tworzenie innowacyjnych projektów, które integrują różne technologie w sposób, który nigdy wcześniej nie był eksplorowany.",
                        internship1: "Ten staż stanowi cenną okazję do samorozwoju i zdobycia praktycznego doświadczenia w dziedzinie, która najbardziej mnie pasjonuje. Jestem chętny do poszerzania swoich umiejętności w zakresie tworzenia gier, projektowania aplikacji i zarządzania projektami, robiąc kroki w kierunku mojego długoterminowego celu, jakim jest zostanie Senior Developerem, a w przyszłości przedsiębiorcą w branży gier.",
                        internship2: "Szczególnie cieszę się perspektywą współpracy przy rzeczywistych projektach i współpracy z profesjonalistami, którzy dzielą moje entuzjazm dla innowacji. To doświadczenie idealnie wpisuje się w moje aspiracje do projektowania aplikacji i stron internetowych, które przekraczają granice i wprowadzają świeże, niekonwencjonalne pomysły do branży. Pracując nad różnorodnymi projektami, mam nadzieję zdobyć wgląd w zaawansowane praktyki rozwojowe i udoskonalić moją zdolność do tworzenia aplikacji, które płynnie łączą różne technologie w przełomowy sposób."
                    }
                }
            }
        },
        uk: {
            cv: {
                title: "Резюме",
                back: "Повернутися до Портфоліо",
                download: "Завантажити",
                header: {
                    role: "Full Stack Developer & Game Developer"
                },
                sections: {
                    workExperience: "ДОСВІД РОБОТИ",
                    projects: "КЛЮЧОВІ ПРОЕКТИ",
                    education: "ОСВІТА",
                    skills: "ТЕХНІЧНІ НАВИЧКИ"
                },
                workExperience: {
                    title: "Front-end Developer Intern",
                    company: "Silk Software House",
                    period: "Березень 2023 - Червень 2023",
                    location: "Варшава, Польща",
                    responsibilities: [
                        "Розробка та покращення front-end додатків, включаючи складну графічну симуляцію Parent-Child inheritance в React з використанням сучасних хуків, покращуючи підтримку коду та користувацький досвід.",
                        "Успішна міграція проекту React.js на TypeScript, впровадження комплексних заходів безпеки типів та покращення надійності коду при збереженні повної функціональності.",
                        "Розробка інтерактивної гри Tic-Tac-Toe з модульними компонентами header та footer за допомогою React та власних хуків, демонструючи сильні навички архітектури компонентів."
                    ]
                },
                projects: {
                    title: "\"Card Your Time\" - Покрокова Рогалик Карткова Гра",
                    role: "Lead Developer & Project Manager",
                    period: "Вересень 2023 - 2024",
                    achievements: [
                        "Архітектура та впровадження передової системи процедурної генерації підземелля, створюючи динамічні та захоплюючі ігрові середовища.",
                        "Проектування та розробка надійної покрокової системи геймплею, включаючи сучасні патерни дизайну ігор та ефективне управління станом.",
                        "Проведення міжфункціональних командних зустрічей, забезпечуючи чітку комунікацію та узгодженість цілей проекту.",
                        "Впровадження методологій гнучкого управління проектами, оптимізуючи продуктивність команди та дотримання графіку.",
                        "Встановлення комплексних процесів забезпечення якості, значно зменшуючи кількість помилок та покращуючи загальну стабільність гри.",
                        "Створення детальної технічної документації та рекомендацій щодо розвитку, полегшуючи плавну співпрацю команди та передачу знань."
                    ],
                    additional: "Додаткові проекти доступні за запитом, демонструючи досвід у різних технологіях та методологіях розробки."
                },
                education: {
                    title: "ОСВІТА",
                    degree: "Бакалавр інженерії",
                    field: "Комп'ютерні науки",
                    university: "Технічний університет",
                    period: "2020 - 2024",
                    achievements: [
                        "Спеціалізація в Програмній інженерії та Штучному інтелекті",
                        "Підтримка GPA 4.5/5.0",
                        "Участь у численних хакатонах та змаганнях з програмування",
                        "Завершення розширених курсів з Машинного навчання та Структур даних"
                    ]
                },
                skills: {
                    title: "ТЕХНІЧНІ НАВИЧКИ"
                },
                promotion: {
                    title: "Супровідний лист",
                    interests: "Професійні інтереси та кар'єрні цілі",
                    whyInternship: "Чому ви хочете приєднатися до цього стажування?",
                    content: {
                        interests1: "Мене завжди цікавило, як працюють різні речі—механізми, що стоять за кожним процесом та інновацією. Коли я вперше зіткнувся з комп'ютером, я хотів зрозуміти його внутрішню роботу та навчитися створювати технології самостійно. Цікавість швидко переросла в пристрасть, яка рухає моїм постійним розвитком у сфері комп'ютерних наук.",
                        interests2: "Мій інтерес до ігор ще більше посилив цю амбіцію, оскільки я не тільки люблю грати, але й мрію створювати власні ігри. Врешті-решт, моя мета—стати Game Developer'ом та заснувати власну компанію з розробки ігор. Однак перед цим я планую отримати широкий досвід у галузі та просунутися до ролі Senior Developer'а, оволодіваючи необхідними технічними та лідерськими навичками. Крім того, я зацікавлений у розширенні своїх знань у сфері Управління проектами та Розробки додатків/веб-сайтів, оскільки вважаю, що розуміння багатьох аспектів технологій дозволить мені створювати більш інноваційні та цінні проекти.",
                        interests3: "Я активно відстежую нові технології, оскільки кожен прогрес бачу як можливість відкрити новий, недосліджений світ зі своїми правилами та специфікаціями. Тому я обрав навчання комп'ютерним наукам—воно пропонує широкий спектр знань та експозицію до різних технологій. Моя довгострокова мета—створювати інноваційні проекти, які інтегрують різні технології способами, які ніколи раніше не досліджувались.",
                        internship1: "Це стажування є цінною можливістю для саморозвитку та отримання практичного досвіду в сфері, яка мене найбільше цікавить. Я готовий розширювати свої навички в розробці ігор, проектуванні додатків та управлінні проектами, роблячи кроки до своєї довгострокової мети стати Senior Developer'ом, а в майбутньому—підприємцем в ігровій індустрії.",
                        internship2: "Я особливо радію перспективі співпраці над реальними проектами та роботи з професіоналами, які розділяють мій ентузіазм щодо інновацій. Цей досвід ідеально відповідає моїм прагненням проектувати додатки та веб-сайти, які перетинають межі та впроваджують свіжі, неконвенційні ідеї в галузь. Працюючи над різноманітними проектами, я сподіваюся отримати уявлення про передові практики розробки та вдосконалити свою здатність створювати додатки, які плавно поєднують різні технології революційними способами."
                    }
                }
            }
        }
    };

    const t = translations[language];

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 print:hidden">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t.cv.back}
                    </Link>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    language === 'en'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                                }`}
                            >
                                <Languages className="w-5 h-5 inline-block mr-2" />
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('pl')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    language === 'pl'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                                }`}
                            >
                                <Languages className="w-5 h-5 inline-block mr-2" />
                                PL
                            </button>
                            <button
                                onClick={() => setLanguage('uk')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    language === 'uk'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                                }`}
                            >
                                <Languages className="w-5 h-5 inline-block mr-2" />
                                UA
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab('cv')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    activeTab === 'cv'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                                }`}
                            >
                                <FileText className="w-5 h-5 inline-block mr-2" />
                                {t.cv.title}
                            </button>
                            <button
                                onClick={() => setActiveTab('promotion')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    activeTab === 'promotion'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                                }`}
                            >
                                <FileText className="w-5 h-5 inline-block mr-2" />
                                {t.cv.promotion.title}
                            </button>
                        </div>
                    <button
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                        <Download className="w-5 h-5 mr-2" />
                            {t.cv.download} {activeTab === 'cv' ? t.cv.title : t.cv.promotion.title}
                    </button>
                    </div>
                </div>
            </div>

            {/* CV Content */}
            <div className="container mx-auto px-4 py-20 max-w-4xl print:py-0 print:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none print:min-h-screen"
                >
                    {activeTab === 'cv' ? (
                        <>
                    {/* Header */}
                            <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 print:p-4 print:break-inside-avoid">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold mb-2">ZAHAR ZUBYK</h1>
                                            <p className="text-lg opacity-90">{t.cv.header.role}</p>
                                    </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center space-x-4">
                                                <a href="mailto:zubykzakharii@gmail.com" className="flex items-center text-white hover:text-orange-200 transition-colors">
                                                    <Mail className="w-5 h-5 mr-2" />
                                                    <span className="text-sm">zubykzakharii@gmail.com</span>
                                                </a>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <a href="tel:+48 *** *** ***" className="flex items-center text-white hover:text-orange-200 transition-colors">
                                                    <Phone className="w-5 h-5 mr-2" />
                                                    <span className="text-sm">(+48) *** *** ***</span>
                                                </a>
                                                <div className="flex items-center text-white">
                                                    <MapPin className="w-5 h-5 mr-2" />
                                                    <span className="text-sm">Warszawa, Polska</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                            <div className="p-6 print:p-4">
                                {/* Work Experience */}
                                <section className="mb-6 print:break-inside-avoid">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-3">{t.cv.sections.workExperience}</span>
                                        <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
                            </h2>
                                    <div className="space-y-4">
                                        <div className="relative pl-6 border-l-2 border-orange-500">
                                            <div className="absolute -left-2 top-0 w-3 h-3 bg-orange-500 rounded-full"></div>
                                <div>
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.cv.workExperience.title}</h3>
                                                <p className="text-orange-500 font-medium text-sm">{t.cv.workExperience.company} • {t.cv.workExperience.period}</p>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.cv.workExperience.location}</p>
                                                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                                                    {t.cv.workExperience.responsibilities.map((item, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Projects */}
                                <section className="mb-6 print:break-inside-avoid">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-3">{t.cv.sections.projects}</span>
                                        <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="relative pl-6 border-l-2 border-orange-500">
                                            <div className="absolute -left-2 top-0 w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.cv.projects.title}</h3>
                                                <p className="text-orange-500 font-medium text-sm">{t.cv.projects.role} • {t.cv.projects.period}</p>
                                                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                                                    {t.cv.projects.achievements.map((item, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                                            {t.cv.projects.additional}
                                        </p>
                                    </div>
                                </section>

                                {/* Education */}
                                <section className="mb-6 print:break-inside-avoid">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-3">{t.cv.sections.education}</span>
                                        <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="relative pl-6 border-l-2 border-orange-500">
                                            <div className="absolute -left-2 top-0 w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.cv.education.title}</h3>
                                                <p className="text-orange-500 font-medium text-sm">{t.cv.education.degree} • {t.cv.education.field} • {t.cv.education.university}</p>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.cv.education.period}</p>
                                                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                                                    {t.cv.education.achievements.map((item, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Skills */}
                                <section className="mb-6 print:break-inside-avoid">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-3">{t.cv.sections.skills}</span>
                                        <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">C# / Unity / ASP.NET</div>
                                                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                                        <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">Java</div>
                                            <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">Python / R</div>
                                            <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">HTML / CSS / JS / TS</div>
                                                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">SQL / MySQL</div>
                                            <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-32 text-gray-600 dark:text-gray-400 text-sm">C++</div>
                                                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                            </div>
                        </>
                    ) : (
                        <div className="p-6 print:p-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-3">{t.cv.promotion.title}</span>
                                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
                            </h2>
                            <div className="prose dark:prose-invert max-w-none space-y-8">
                                <section>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                        {t.cv.promotion.interests}
                                    </h3>
                                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                        <p>{t.cv.promotion.content.interests1}</p>
                                        <p>{t.cv.promotion.content.interests2}</p>
                                        <p>{t.cv.promotion.content.interests3}</p>
                            </div>
                        </section>

                        <section>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                        {t.cv.promotion.whyInternship}
                                    </h3>
                                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                        <p>{t.cv.promotion.content.internship1}</p>
                                        <p>{t.cv.promotion.content.internship2}</p>
                            </div>
                        </section>
                    </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          @page {
            margin: 0.5cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:bg-transparent {
            background-color: transparent !important;
          }
          .print\\:p-6 {
            padding: 1.5rem !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid !important;
          }
          .print\\:break-before-page {
            break-before: page !important;
          }
          .print\\:break-after-page {
            break-after: page !important;
          }

          /* Remove page numbers and other print artifacts */
          @page {
            counter-increment: none;
          }
          @page :first {
            counter-reset: none;
          }
          @page :left {
            margin-left: 0.5cm;
            margin-right: 0.5cm;
          }
          @page :right {
            margin-left: 0.5cm;
            margin-right: 0.5cm;
          }

          /* Hide navigation and other UI elements */
          nav, 
          button,
          .navigation,
          .print\\:hidden,
          footer {
            display: none !important;
          }

          /* Ensure dark theme colors are preserved */
          .dark {
            color-scheme: dark !important;
          }
          .dark * {
            color-scheme: dark !important;
          }

          /* Remove any browser-added headers/footers */
          @page {
            margin: 0;
            size: A4;
          }

          /* Ensure content fills the page */
          .container {
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
        </div>
    );
};

export default CV;