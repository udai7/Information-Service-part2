export const englishTranslations = {
  welcome: {
    greeting: "Welcome to Government Services Bot! 🏛️",
    description:
      "I can help you access various government services in your preferred language.",
    selectLanguage: "Please select your preferred language:",
  },

  languages: {
    english: "🇺🇸 English",
    bengali: "🇧🇩 বাংলা (Bengali)",
  },

  mainMenu: {
    title: "Government Services Menu 📋",
    subtitle: "Select a service category:",
    options: {
      schemes: "📊 Scheme Services",
      certificates: "📜 Certificate Services",
      contacts: "📞 Contact Services",
      grievances: "📝 Grievances Service",
      feedback: "💬 Feedback Service",
    },
  },

  navigation: {
    back: "⬅️ Back",
    mainMenu: "🏠 Main Menu",
    changeLanguage: "🌐 Change Language",
    help: "❓ Help",
  },

  schemes: {
    title: "Government Schemes 📊",
    subtitle: "Available schemes:",
    noSchemes: "No active schemes found.",
    viewDetails: "View Details",
    eligibility: "Eligibility:",
    benefits: "Benefits:",
    howToApply: "How to Apply:",
    requiredDocs: "Required Documents:",
    applicationMode: "Application Mode:",
    onlineUrl: "Online Application:",
    offlineAddress: "Offline Address:",
  },

  certificates: {
    title: "Certificate Services 📜",
    subtitle: "Available certificates:",
    noCertificates: "No active certificate services found.",
    applicationType: "Application Type:",
    newApplication: "New Application",
    renewal: "Renewal",
    duplicate: "Duplicate",
    surrender: "Surrender",
  },

  contacts: {
    title: "Contact Directory 📞",
    subtitle: "Government office contacts:",
    noContacts: "No contacts found.",
    selectType: "Please select contact type:",
    selectLocation: "Please select location:",
    name: "Name:",
    designation: "Designation:",
    phone: "Phone:",
    email: "Email:",
    office: "Office:",
    district: "District:",
    block: "Block:",
  },

  grievances: {
    title: "Submit Grievance 📝",
    subtitle: "We'll help you submit your grievance:",
    form: {
      name: "Enter your full name:",
      email: "Enter your email address:",
      phone: "Enter your phone number:",
      subject: "Enter grievance subject:",
      description: "Describe your grievance in detail:",
      department: "Select department:",
      priority: "Select priority level:",
    },
    priorities: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    success:
      "✅ Your grievance has been submitted successfully! Reference ID: ",
    error: "❌ Failed to submit grievance. Please try again.",
  },

  feedback: {
    title: "Submit Feedback 💬",
    subtitle: "Your feedback helps us improve our services:",
    form: {
      name: "Enter your name:",
      email: "Enter your email (optional):",
      phone: "Enter your phone (optional):",
      rating: "Rate our service (1-5):",
      comment: "Share your feedback:",
      serviceType: "Which service are you providing feedback for?",
    },
    success:
      "✅ Thank you for your feedback! It has been submitted successfully.",
    error: "❌ Failed to submit feedback. Please try again.",
  },

  common: {
    loading: "⏳ Loading...",
    error: "❌ Something went wrong. Please try again.",
    invalidOption: "❌ Invalid option. Please select from the menu.",
    sessionExpired: "⏰ Your session has expired. Type 'start' to begin again.",
    retry: "🔄 Retry",
    cancel: "❌ Cancel",
    confirm: "✅ Confirm",
    next: "➡️ Next",
    previous: "⬅️ Previous",
    submit: "📤 Submit",
    skip: "⏭️ Skip",
    yes: "Yes",
    no: "No",
  },

  help: {
    title: "Help & Instructions 📚",
    content: `
📱 How to use this bot:

1️⃣ Select your language
2️⃣ Choose a service category
3️⃣ Browse available services
4️⃣ Get detailed information

🔧 Available Commands:
• Type 'menu' - Go to main menu
• Type 'help' - Show this help
• Type 'lang' - Change language

⚡ Quick Actions:
• Use number buttons to select options
• Type 'back' to go to previous menu
• Type 'start' to restart

💡 Need human assistance? Contact our support team during office hours.
    `,
  },
};
