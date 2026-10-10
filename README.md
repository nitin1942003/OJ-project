# RunitIn

RunitIn is an online coding platform where users can solve programming questions, create their own, run and judge their code, and track their success.

## Features

- 🖥️ **Solve Coding Questions** – Practice a variety of coding problems.
- ✍️ **Create Custom Questions** – Design and publish your own challenges.
- 🚀 **Run and Judge Code** – Execute code in multiple languages and evaluate performance.
- 📊 **Track Success** – View submissions, judge performance, and analyze progress.

## Tech Stack

- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js & Express.js 
- **Database:** MongoDB
- **Code Execution Engine:** Docker
- **Authentication:** JWT-based Authentication

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js & npm 
- Docker
- Python 3 (available as `python3`) to run Python submissions when starting the backend directly
- JDK 11 (including `javac` and `java`) to run Java submissions when starting the backend directly

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/nitin1942003/OJ-project.git
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install  # for frontend/backend
   ```

3. Start the development server:
   ```sh
   npm run dev  # for frontend
   node index.js # for backend
   ```

The backend Docker image installs the JDK for Java submissions. When deploying the backend
without this image, install Python 3 and a JDK, and ensure `python3`, `javac`, and `java` are
available on `PATH`.

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage

- Sign up and log in to start solving or creating questions.
- Choose a programming problem and submit your solution.
- View problems you created, problems you are attempting or solve with test case passed status.
- Create and share custom challenges with the community.

## Deployment

The application is live at: [RunitIn](https://runitin.online/)

## Contact

For any queries, reach out to [nitinsharma1942003@gmail.com] or open an issue on GitHub.

---
Happy Coding! 🚀
