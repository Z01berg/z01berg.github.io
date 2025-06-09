export interface MainTranslations {
  hero: {
    title: string;
    subtitle: string;
    viewWork: string;
    contactMe: string;
    viewCV: string;
  };
  about: {
    title: string;
    subtitle: string;
    mySkills: string;
    myProjects: string;
    milestones: {
      born: {
        title: string;
        description: string;
      };
      firstPC: {
        title: string;
        description: string;
      };
      earlyReading: {
        title: string;
        description: string;
      };
      gaming: {
        title: string;
        description: string;
      };
      programming: {
        title: string;
        description: string;
      };
      academic: {
        title: string;
        description: string;
      };
      moving: {
        title: string;
        description: string;
      };
      university: {
        title: string;
        description: string;
      };
    };
  };
  skills: {
    title: string;
    subtitle: string;
    languageSkills: string;
    sections: {
      frontend: string;
      backend: string;
      database: string;
      gameDev: string;
      design: string;
      tools: string;
      business: string;
      other: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    lastUpdated: string;
    cooldown: string;
    sortBy: string;
    latest: string;
    earliest: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
}

export const translations: Record<string, MainTranslations> = {
  en: {
    hero: {
      title: "Zahar Zubik",
      subtitle: "Software Engineer & Innovation Specialist",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      viewCV: "View CV & Letter"
    },
    about: {
      title: "About Me",
      subtitle: "My journey in technology and innovation",
      mySkills: "My Skills",
      myProjects: "My Projects",
      milestones: {
        born: {
          title: "Born in Ukraine",
          description: "Born in a small village near Dolina, Ivano-Frankivsk region. From the start, I was always curious about how things work."
        },
        firstPC: {
          title: "First PC Experience",
          description: "First encounter with a PC at age 4. Fell in love with computing through games like \"Purble Crying\" & \"Bugs Bunny: Lost in Time\"."
        },
        earlyReading: {
          title: "Early Reading",
          description: "Developed a passion for reading at age 5, able to read up to 15 tales per day. This marked my first serious hobby."
        },
        gaming: {
          title: "Gaming Journey",
          description: "Received my first Game Boy Advance SP, introducing me to English and the Mario franchise. Later discovered anime through Jetix and QTV."
        },
        programming: {
          title: "Programming Begins",
          description: "Started learning Pascal at age 10, inspired by Hideo Kojima. Began dreaming of creating video games and working in the industry."
        },
        academic: {
          title: "Academic Excellence",
          description: "Participated in IT Olympiads, achieving second place in city competitions and advancing to regional levels."
        },
        moving: {
          title: "Moving to Poland",
          description: "Successfully enrolled in a Polish school with Ukrainian minority, marking a significant step towards international education."
        },
        university: {
          title: "University Journey",
          description: "Chose PJATK (Polish-Japanese Academy of Information Technology), aligning with my passion for Japanese culture and technology."
        }
      }
    },
    skills: {
      title: "Technical Skills",
      subtitle: "My expertise and capabilities",
      languageSkills: "Language Skills",
      sections: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        database: "Database",
        gameDev: "Game Development",
        design: "Design & Multimedia",
        tools: "Development Tools",
        business: "Business & Management",
        other: "Other Skills"
      }
    },
    projects: {
      title: "My Projects",
      subtitle: "A showcase of my work",
      viewAll: "View All Projects",
      lastUpdated: "Last updated:",
      cooldown: "Cooldown active. Try again in",
      sortBy: "Sort by",
      latest: "Latest",
      earliest: "Earliest"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's work together",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again."
    }
  },
  pl: {
    hero: {
      title: "Zahar Zubik",
      subtitle: "Inżynier Oprogramowania & Specjalista ds. Innowacji",
      viewWork: "Zobacz Moje Projekty",
      contactMe: "Kontakt",
      viewCV: "Zobacz CV i List"
    },
    about: {
      title: "O Mnie",
      subtitle: "Moja podróż w technologii i innowacjach",
      mySkills: "Moje Umiejętności",
      myProjects: "Moje Projekty",
      milestones: {
        born: {
          title: "Urodzony na Ukrainie",
          description: "Urodzony w małej wiosce koło Doliny, obwód Iwano-Frankowski. Od początku zawsze byłem ciekawy, jak działają różne rzeczy."
        },
        firstPC: {
          title: "Pierwsze Doświadczenie z PC",
          description: "Pierwszy kontakt z komputerem w wieku 4 lat. Zakochałem się w informatyce przez gry takie jak \"Purble Crying\" i \"Bugs Bunny: Lost in Time\"."
        },
        earlyReading: {
          title: "Wczesne Czytanie",
          description: "Rozwinąłem pasję do czytania w wieku 5 lat, potrafiąc czytać do 15 bajek dziennie. To była moja pierwsza poważna pasja."
        },
        gaming: {
          title: "Podróż z Grami",
          description: "Otrzymałem swoją pierwszą konsolę Game Boy Advance SP, która wprowadziła mnie w świat języka angielskiego i serii Mario. Później odkryłem anime przez Jetix i QTV."
        },
        programming: {
          title: "Początki Programowania",
          description: "Zacząłem uczyć się Pascala w wieku 10 lat, zainspirowany przez Hideo Kojimę. Zacząłem marzyć o tworzeniu gier wideo i pracy w branży."
        },
        academic: {
          title: "Sukcesy Akademickie",
          description: "Uczestniczyłem w Olimpiadach Informatycznych, osiągając drugie miejsce w konkursach miejskich i awansując do poziomu regionalnego."
        },
        moving: {
          title: "Przeprowadzka do Polski",
          description: "Z powodzeniem zapisałem się do polskiej szkoły z mniejszością ukraińską, co było znaczącym krokiem w kierunku międzynarodowej edukacji."
        },
        university: {
          title: "Podróż Uniwersytecka",
          description: "Wybrałem PJATK (Polsko-Japońską Akademię Technik Komputerowych), co było zgodne z moją pasją do japońskiej kultury i technologii."
        }
      }
    },
    skills: {
      title: "Umiejętności Techniczne",
      subtitle: "Moja wiedza i możliwości",
      languageSkills: "Umiejętności Językowe",
      sections: {
        frontend: "Rozwój Frontend",
        backend: "Rozwój Backend",
        database: "Bazy Danych",
        gameDev: "Rozwój Gier",
        design: "Design i Multimedia",
        tools: "Narzędzia Programistyczne",
        business: "Biznes i Zarządzanie",
        other: "Inne Umiejętności"
      }
    },
    projects: {
      title: "Moje Projekty",
      subtitle: "Prezentacja moich prac",
      viewAll: "Zobacz Wszystkie Projekty",
      lastUpdated: "Ostatnia aktualizacja:",
      cooldown: "Aktywny czas oczekiwania. Spróbuj ponownie za",
      sortBy: "Sortuj według",
      latest: "Najnowsze",
      earliest: "Najstarsze"
    },
    contact: {
      title: "Kontakt",
      subtitle: "Pracujmy razem",
      name: "Imię",
      email: "Email",
      message: "Wiadomość",
      send: "Wyślij Wiadomość",
      success: "Wiadomość wysłana pomyślnie!",
      error: "Nie udało się wysłać wiadomości. Spróbuj ponownie."
    }
  },
  uk: {
    hero: {
      title: "Zahar Zubik",
      subtitle: "Інженер-програміст & Спеціаліст з інновацій",
      viewWork: "Переглянути Мої Проекти",
      contactMe: "Контакт",
      viewCV: "Переглянути Резюме та Лист"
    },
    about: {
      title: "Про Мене",
      subtitle: "Моя подорож у технологіях та інноваціях",
      mySkills: "Мої Навички",
      myProjects: "Мої Проекти",
      milestones: {
        born: {
          title: "Народився в Україні",
          description: "Народився в маленькому селі біля Долини, Івано-Франківська область. З самого початку я завжди був цікавий, як працюють різні речі."
        },
        firstPC: {
          title: "Перший Досвід з ПК",
          description: "Перша зустріч з комп'ютером у віці 4 років. Закохався в обчислювальну техніку через такі ігри, як \"Purble Crying\" та \"Bugs Bunny: Lost in Time\"."
        },
        earlyReading: {
          title: "Раннє Читання",
          description: "Розвинув пристрасть до читання у віці 5 років, здатний читати до 15 казок на день. Це було моє перше серйозне хобі."
        },
        gaming: {
          title: "Подорож з Іграми",
          description: "Отримав свою першу консоль Game Boy Advance SP, яка познайомила мене з англійською мовою та серією Mario. Пізніше відкрив аніме через Jetix та QTV."
        },
        programming: {
          title: "Початок Програмування",
          description: "Почав вивчати Pascal у віці 10 років, натхненний Хідео Кодзімою. Почав мріяти про створення відеоігор та роботу в індустрії."
        },
        academic: {
          title: "Академічні Досягнення",
          description: "Брав участь у Олімпіадах з інформатики, досягнувши другого місця в міських змаганнях та просунувшись до регіонального рівня."
        },
        moving: {
          title: "Переїзд до Польщі",
          description: "Успішно вступив до польської школи з українською меншиною, що стало значним кроком до міжнародної освіти."
        },
        university: {
          title: "Університетська Подорож",
          description: "Обрав PJATK (Польсько-Японську Академію Інформаційних Технологій), що відповідає моїй пристрасті до японської культури та технологій."
        }
      }
    },
    skills: {
      title: "Технічні Навички",
      subtitle: "Моя експертиза та можливості",
      languageSkills: "Мовні Навички",
      sections: {
        frontend: "Розробка Frontend",
        backend: "Розробка Backend",
        database: "Бази Даних",
        gameDev: "Розробка Ігор",
        design: "Дизайн та Мультимедіа",
        tools: "Інструменти Розробки",
        business: "Бізнес та Менеджмент",
        other: "Інші Навички"
      }
    },
    projects: {
      title: "Мої Проекти",
      subtitle: "Презентація моїх робіт",
      viewAll: "Переглянути Всі Проекти",
      lastUpdated: "Останнє оновлення:",
      cooldown: "Активний час очікування. Спробуйте знову через",
      sortBy: "Сортувати за",
      latest: "Найновіші",
      earliest: "Найстаріші"
    },
    contact: {
      title: "Контакт",
      subtitle: "Давайте працювати разом",
      name: "Ім'я",
      email: "Email",
      message: "Повідомлення",
      send: "Надіслати Повідомлення",
      success: "Повідомлення успішно надіслано!",
      error: "Не вдалося надіслати повідомлення. Будь ласка, спробуйте знову."
    }
  }
}; 