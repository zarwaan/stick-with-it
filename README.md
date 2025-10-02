# 📆 Habit Tracker app

## 🔎 Overview
A comprehensive and intuitive web application that allows users to track and monitor habits over long periods of time built using ReactJS, ExpressJS, NodeJS and MySQL.

## 🚀 Features
- Create habits with a name, emoji and list of days to practice
- Mark habits as completed
- A statistical overview of a habit over a month, year, or since creation
- A calendar view to keep track of past days and coming days

## 🛠️ Tech Stack
- **Frontend**
    - ReactJS
    - TailwindCSS for styling
    - Lucide-react for various icons
    - Recharts for making graphs and charts
    - DayJS for date manipulations
    - Motion for animations
- **Backend**
    - ExpressJS for server implementation
    - Express-session for authentication
    - Bcrypt for password hashing
    - Mysql2 for database connection
- **Database**
    - MySQL

## ⚙️ Installation & Setup

### Prerequisites
Ensure the following are installed on your system:
1. [Node.js](https://nodejs.org/)
2. [MySQL](https://dev.mysql.com/downloads/installer/)
3. [MySQL Workbench (optional)](https://dev.mysql.com/downloads/workbench/)

### Steps
1. Navigate to your preferred folder and clone the repository
    ```shell
    git clone https://github.com/zarwaan/stick-with-it.git
    cd stick-with-it
    ```

2. Install dependencies
    ```shell
    npm install
    ```

3. [Create a MySQL Connection Instance](https://dev.mysql.com/doc/mysql-getting-started/en/)

4. Create a `.env.development` file at root level with the following environment variables
    ```sh
    PORT = "3000" # can change port to liking
    VITE_API_URL_ROOT = "http://localhost:3000" # change port if changed
    SESSION_SECRET = # your session secret
    CLIENT_URL = "http://localhost:5173" # vite frontend url

    # DATABASE VARIABLES
    DB_HOST = # your mysql hostname
    DB_USER = # your mysql user
    DB_PASSWORD = # your mysql password
    DB_NAME = # your database name
    ```
5. Initialise the database by running these commands
    ```sh
    node db/createDb.js
    node db/createTables.js
    ```
6. Start the server
    - Frontend:
        ```sh
        npm run client
        ```
    - Backend:
        ```sh
        npm run devserver
        ```
7. Open browser and navigate to [http://localhost:5173/](http://localhost:5173/) (or your client url if changed)

## Created and maintained by Zarwaan Shroff