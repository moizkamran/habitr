# Habit Tracker App

This is a Habit Tracker web application built using Django for the backend and React for the frontend. The app allows users to create, update, and track their habits, providing insights into their completion rates and streaks.

## Features

- **Create Habits**: Users can create habits with details such as name, description, frequency, start date, and goal date.
- **Track Habits**: Users can track their habits by marking them as completed or updating their streaks.
- **View Insights**: The app provides insights into habits' completion rates, streaks, and rankings based on completion counts.
- **Responsive UI**: The frontend is built using React, providing a responsive user interface for seamless usage across devices.

## Technologies Used

- **Frontend**:
  - React
  - Vite (for bundling and development)
  - Mantine UI library for components
  - Axios for handling HTTP requests

- **Backend**:
  - Django
  - Django REST Framework
  - PostgreSQL (assumed as database)
  
## Installation

### Quick Start (macOS only)
1. In the `root` directory.
2. Run `start.sh` using terminal
3. This will auto check and install all dependencies needed to start the application.
4. Once the requirements are met, it will auto start the backend on port `8080` and frontend on `5173`

### Backend Setup
1. Navigate to the `backend` directory.
2. Install Python dependencies using `pip install -r requirements.txt`.
3. Start the Django development server: `python manage.py runserver`.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install Node.js dependencies using `npm install`.
3. Start the development server: `npm run dev`.

## API Endpoints

- `/api/habit`: 
  - GET: Retrieve all habits or create a new habit.
- `/api/create-habit`: 
  - POST: Create a new habit.
- `/api/update-habit/<int:pk>`: 
  - PUT: Update an existing habit.
- `/api/update-habit-streak/<int:pk>`: 
  - PUT: Update the streak of a habit.
- `/api/update-habit-completion/<int:pk>`: 
  - PUT: Update the completion status of a habit.
- `/api/delete-habit/<int:pk>`: 
  - DELETE: Delete a habit.
- `/api/habit-completion`: 
  - POST: Record a habit completion.
- `/api/highest-streak-habit`: 
  - GET: Retrieve the habit with the highest streak.
- `/api/struggled-habit/<int:year>/<int:month>`: 
  - GET: Retrieve the habit that struggled the most in a specified month.

## Contributors

- [Abdulmoeez Kamran](https://github.com/moizkamran)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project is a work for International University of Applied Sciences
- Special thanks to [Django](https://www.djangoproject.com/) and [React](https://reactjs.org/) communities for their excellent documentation and support.
  
