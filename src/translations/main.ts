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
      journey: "My Journey"
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
      journey: "Мій шлях"
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
      journey: "Moja podróż"
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