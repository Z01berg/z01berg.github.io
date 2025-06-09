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
    journey: string;
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
    interests: {
      gameDev: {
        title: string;
        description: string;
      };
      japanese: {
        title: string;
        description: string;
      };
      digitalArt: {
        title: string;
        description: string;
      };
      music: {
        title: string;
        description: string;
      };
    };
  };
  projects: {
    title: string;
    subtitle: string;
    note: string;
    githubProfile: string;
    refresh: string;
    lastUpdated: string;
    cooldownActive: string;
    sortBy: string;
    latest: string;
    earliest: string;
    all: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
    messageSent: string;
  };
}

export const translations: Record<string, MainTranslations> = {
  en: {
    hero: {
      title: "Hi, I'm Zahar",
      subtitle: "Full Stack Developer & Game Developer",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      viewCV: "View CV & Letter"
    },
    about: {
      title: "About Me",
      subtitle: "Get to know me better",
      journey: "My Journey",
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
      },
      interests: {
        gameDev: {
          title: "Game Development",
          description: "Passionate about creating immersive gaming experiences, combining technical skills with creative storytelling."
        },
        japanese: {
          title: "Japanese Culture",
          description: "Deeply interested in Japanese culture, language, and technology. Currently studying Japanese (N4 level)."
        },
        digitalArt: {
          title: "Digital Art",
          description: "Enjoy creating digital art and pixel art, using tools like Aseprite and Blender for game assets."
        },
        music: {
          title: "Music",
          description: "Love exploring different music genres, especially video game soundtracks and Japanese music."
        }
      }
    },
    projects: {
      title: "My Projects",
      subtitle: "A collection of my work and contributions",
      note: "Note: Tags are based on README analysis and difficulty rating is calculated automatically based on technologies used, project complexity, and activity metrics.",
      githubProfile: "GitHub Profile",
      refresh: "Refresh",
      lastUpdated: "Last updated:",
      cooldownActive: "Cooldown active. Try again in",
      sortBy: "Sort by",
      latest: "Latest",
      earliest: "Earliest",
      all: "All"
    },
    skills: {
      title: "My Skills",
      subtitle: "What I bring to the table"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's work together",
      sendMessage: "Send Me a Message",
      messageSent: "Message sent successfully! I'll get back to you soon."
    }
  },
  uk: {
    hero: {
      title: "Привіт, я Захар",
      subtitle: "Full Stack Developer & Game Developer",
      viewWork: "Переглянути мої роботи",
      contactMe: "Зв'язатися зі мною",
      viewCV: "Переглянути CV & Лист"
    },
    about: {
      title: "Про мене",
      subtitle: "Дізнайтеся мене краще",
      journey: "Мій шлях",
      milestones: {
        born: {
          title: "Народився в Україні",
          description: "Народився в маленькому селі біля Долини, Івано-Франківська область. З самого початку я завжди був цікавий тим, як працюють речі."
        },
        firstPC: {
          title: "Перший досвід з ПК",
          description: "Перша зустріч з ПК у 4 роки. Закохався в обчислювальну техніку через такі ігри, як \"Purble Crying\" та \"Bugs Bunny: Lost in Time\"."
        },
        earlyReading: {
          title: "Раннє читання",
          description: "Розвинув пристрасть до читання у 5 років, міг читати до 15 казок на день. Це стало моїм першим серйозним хобі."
        },
        gaming: {
          title: "Подорож у світ ігор",
          description: "Отримав свій перший Game Boy Advance SP, який познайомив мене з англійською мовою та франшизою Mario. Пізніше відкрив для себе аніме через Jetix та QTV."
        },
        programming: {
          title: "Початок програмування",
          description: "Почав вивчати Pascal у 10 років, натхненний Хідео Кодзімою. Почав мріяти про створення відеоігор та роботу в індустрії."
        },
        academic: {
          title: "Академічна досконалість",
          description: "Брав участь у IT-олімпіадах, посівши друге місце в міських змаганнях та вийшовши на регіональний рівень."
        },
        moving: {
          title: "Переїзд до Польщі",
          description: "Успішно вступив до польської школи з українською меншиною, що стало значним кроком до міжнародної освіти."
        },
        university: {
          title: "Подорож у світ університету",
          description: "Обирав PJATK (Польсько-японська академія інформаційних технологій), що відповідає моїй пристрасті до японської культури та технологій."
        }
      },
      interests: {
        gameDev: {
          title: "Розробка ігор",
          description: "Захоплений створенням захоплюючих ігрових досвідів, поєднуючи технічні навички з креативною розповіддю."
        },
        japanese: {
          title: "Японська культура",
          description: "Глибоко зацікавлений японською культурою, мовою та технологіями. Зараз вивчаю японську мову (рівень N4)."
        },
        digitalArt: {
          title: "Цифрове мистецтво",
          description: "Насолоджуюсь створенням цифрового мистецтва та піксель-арту, використовуючи такі інструменти, як Aseprite та Blender для ігрових ассетів."
        },
        music: {
          title: "Музика",
          description: "Люблю досліджувати різні музичні жанри, особливо саундтреки до відеоігор та японську музику."
        }
      }
    },
    projects: {
      title: "Мої проекти",
      subtitle: "Колекція моїх робіт та внесків",
      note: "Примітка: Теги базуються на аналізі README, а рівень складності розраховується автоматично на основі використаних технологій, складності проекту та метрик активності.",
      githubProfile: "Профіль GitHub",
      refresh: "Оновити",
      lastUpdated: "Останнє оновлення:",
      cooldownActive: "Активний час очікування. Спробуйте знову через",
      sortBy: "Сортувати за",
      latest: "Найновіші",
      earliest: "Найстаріші",
      all: "Всі"
    },
    skills: {
      title: "Мої навички",
      subtitle: "Що я можу запропонувати"
    },
    contact: {
      title: "Зв'яжіться зі мною",
      subtitle: "Давайте працювати разом",
      sendMessage: "Надіслати мені повідомлення",
      messageSent: "Повідомлення успішно надіслано! Я зв'яжусь з вами найближчим часом."
    }
  },
  pl: {
    hero: {
      title: "Cześć, jestem Zahar",
      subtitle: "Full Stack Developer & Game Developer",
      viewWork: "Zobacz moje prace",
      contactMe: "Skontaktuj się ze mną",
      viewCV: "Zobacz CV & List"
    },
    about: {
      title: "O mnie",
      subtitle: "Poznaj mnie lepiej",
      journey: "Moja podróż",
      milestones: {
        born: {
          title: "Urodzony na Ukrainie",
          description: "Urodzony w małej wiosce koło Doliny, obwód iwano-frankowski. Od początku zawsze byłem ciekawy, jak działają rzeczy."
        },
        firstPC: {
          title: "Pierwsze doświadczenie z PC",
          description: "Pierwsze spotkanie z komputerem w wieku 4 lat. Zakochałem się w informatyce przez gry takie jak \"Purble Crying\" i \"Bugs Bunny: Lost in Time\"."
        },
        earlyReading: {
          title: "Wczesne czytanie",
          description: "Rozwinąłem pasję do czytania w wieku 5 lat, potrafiłem czytać do 15 bajek dziennie. To było moje pierwsze poważne hobby."
        },
        gaming: {
          title: "Podróż w świat gier",
          description: "Otrzymałem swojego pierwszego Game Boy Advance SP, który wprowadził mnie w świat języka angielskiego i serii Mario. Później odkryłem anime przez Jetix i QTV."
        },
        programming: {
          title: "Początek programowania",
          description: "Zacząłem uczyć się Pascala w wieku 10 lat, zainspirowany przez Hideo Kojimę. Zacząłem marzyć o tworzeniu gier wideo i pracy w branży."
        },
        academic: {
          title: "Doskonałość akademicka",
          description: "Brałem udział w olimpiadach IT, zajmując drugie miejsce w zawodach miejskich i awansując do poziomu regionalnego."
        },
        moving: {
          title: "Przeprowadzka do Polski",
          description: "Z powodzeniem zapisałem się do polskiej szkoły z mniejszością ukraińską, co było znaczącym krokiem w kierunku międzynarodowej edukacji."
        },
        university: {
          title: "Podróż na uniwersytet",
          description: "Wybrałem PJATK (Polsko-Japońska Akademia Technik Komputerowych), co odpowiada mojej pasji do kultury japońskiej i technologii."
        }
      },
      interests: {
        gameDev: {
          title: "Tworzenie gier",
          description: "Zafascynowany tworzeniem immersyjnych doświadczeń gamingowych, łącząc umiejętności techniczne z kreatywną narracją."
        },
        japanese: {
          title: "Kultura japońska",
          description: "Głęboko zainteresowany kulturą japońską, językiem i technologią. Obecnie uczę się języka japońskiego (poziom N4)."
        },
        digitalArt: {
          title: "Sztuka cyfrowa",
          description: "Cieszę się tworzeniem sztuki cyfrowej i pixel artu, używając narzędzi takich jak Aseprite i Blender do zasobów gier."
        },
        music: {
          title: "Muzyka",
          description: "Uwielbiam odkrywać różne gatunki muzyczne, szczególnie ścieżki dźwiękowe do gier wideo i muzykę japońską."
        }
      }
    },
    projects: {
      title: "Moje projekty",
      subtitle: "Kolekcja moich prac i wkładów",
      note: "Uwaga: Tagi są oparte na analizie README, a poziom trudności jest obliczany automatycznie na podstawie użytych technologii, złożoności projektu i metryk aktywności.",
      githubProfile: "Profil GitHub",
      refresh: "Odśwież",
      lastUpdated: "Ostatnia aktualizacja:",
      cooldownActive: "Aktywny czas oczekiwania. Spróbuj ponownie za",
      sortBy: "Sortuj według",
      latest: "Najnowsze",
      earliest: "Najstarsze",
      all: "Wszystkie"
    },
    skills: {
      title: "Moje umiejętności",
      subtitle: "Co mogę zaoferować"
    },
    contact: {
      title: "Skontaktuj się ze mną",
      subtitle: "Pracujmy razem",
      sendMessage: "Wyślij mi wiadomość",
      messageSent: "Wiadomość wysłana pomyślnie! Odpowiem najszybciej jak to możliwe."
    }
  }
}; 