**# virtual-pet-adoption-center**

A full-stack web application that allows users to manage, filter, and adopt virtual pets. Built with **Node.js** and **React.js**, this project emphasizes clean architecture, attractive UI, and user-friendly functionality.

---

**## Objective**

- Create, update, and delete pet profiles.
- View all pets and filter them by mood.
- Adopt pets, which updates their status and logs the adoption date.
- Watch pets' moods change dynamically based on how long they've been in the system.
- Experience a polished and responsive UI with visual feedback and optional animations.
- Adopt pets with confetti and optional adoption certificate.
- Mood-based Notifications
- PDF download for adoption certificates.
- Pet Personality Quiz
- Animations for adoption

---

**## Tech Stack**

**### Backend**
- Node.js
- Express.js
- MongoDB (via Mongoose)

**### Frontend**
- React.js
- Bootstrap
- React Toastify
- Axios
- Confetti
- @react-pdf/renderer
- @react-hook/window-size
- react-router-dom

**## Installation Instructions**

**### 1. Clone the Repository**

```bash
git clone https://github.com/your-username/virtual-pet-adoption-center.git
cd virtual-pet-adoption-center

**### 2. Backend Setup**

cd backend
npm init -y
npm install express mongoose dotenv cors
npm install nodemon --save-dev

**### 3. Create Backend .env**

PORT=5000
MONGO_URI=mongodb://localhost:27017/pet-adoption-center

**### 4. Run the server**

npm start

**## 5.Frontend Setup**

cd frontend
npm install
npm install bootstrap axios react-toastify @react-pdf/renderer react-confetti @react-hook/window-size

**## 5.Frontend Required Packeges**

- bootstrap – For responsive design and layout.
- axios – HTTP client for API communication.
- react-toastify – Notifications for user actions (e.g., success, error).
- @react-pdf/renderer – To generate downloadable adoption certificates as PDF.
- react-confetti – Confetti animation when a pet is adopted.
- @react-hook/window-size – Responsive handling for confetti effects.

**## 6.Start the react app**

npm start

**## Project structure**

/backend
├── app.js
├── server.js
├── /routes
│   └── petRoutes.js
├── /controllers
│   └── petController.js
├── /models
│   └── petModel.js
├── /services
│   └── petService.js
├── /utils
│   └── moodLogic.js
└── /data
    └── pets.json (optional if using temp storage)


/frontend
├── public/
├── src/
|   ├── /assts
│   ├── App.js
│   ├── index.js
│   ├── /components
│   │   ├── PetList.js
│   │   ├── PetCard.js
│   │   ├── AddPetForm.js
│   │   ├── FilterBar.js
│   ├── /pages
│   │   └── HomePage.js
│   ├── /services
│   │   └── api.js
│   ├── /styles
│   │   └── global.css
│   └── /utils
│       └── helpers.js

**## Requirements**

- Node.js v16+
- MongoDB installed and running locally

**## Author**
G I N Dabarera




