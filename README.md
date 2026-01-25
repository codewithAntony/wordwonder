# 🎓 wordwonder: Interactive Speech & Spelling Coach

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=flat&logo=netlify)](https://wordwonder-pi.vercel.app/)  
[![GitHub](https://img.shields.io/badge/Repo-codewithAntony/ngomazangu-blue?style=flat&logo=github)](https://github.com/codewithAntony/wordwonder)

WordBuddy is a specialized educational web application built to support children developing their speech and literacy skills. Originally inspired by my niece's journey with speech challenges, this tool provides a safe, encouraging, and fun environment to practice communication.



##  Key Features

*  Speak & Verify: Uses the Web Speech API to provide real-time feedback on pronunciation. Children "Tap to Speak" and receive immediate encouragement.
*  Interactive Spelling: A drag-and-drop style interface that helps children understand word structure and letter order.
*  Visual Matching Games: Connects vocabulary words to high-quality imagery to reinforce word association.
*  Progress Tracking: A persistent "Star" and "Streak" system to build confidence and motivate daily practice.
*  Accessibility First: Includes a High Contrast Mode for users with visual sensitivities and a simplified UI to reduce cognitive load.
*  Scaffolding: Features "Listen Slowly" buttons that utilize TTS (Text-to-Speech) to help children hear every syllable.

##  Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with Persistence for local saving)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Speech Engine:** Browser Native SpeechSynthesis & SpeechRecognition

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/codewithAntony/wordwonder.git](https://github.com/codewithAntony/wordwonder.git)
   cd word-wonder

   ---

### 2. Install Dependencies 
```bash

npm install

```
---

### 5. Run the app
```bash

npm run dev

```

To open the app: Navigate to http://localhost:3000 to see the result.

 Story Behind the Project

I built this tool to assist my niece, who is currently working through speech issues. Traditional apps were often too fast-paced or cluttered with ads. wordwonder is my way of using software engineering to solve a real-world problem for someone I love.

