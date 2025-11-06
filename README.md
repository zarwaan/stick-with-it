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

## Initial steps
1. Navigate to your preferred folder and clone the repository
    ```shell
    git clone https://github.com/zarwaan/stick-with-it.git
    cd stick-with-it
    ```

2. Set up a gmail [app password](https://support.google.com/mail/answer/185833?hl=en) to use for the mailing service

3. Fill out `.env.example` file at the root level plugging in your env variables as instructed and rename it to `.env.development`

## With Docker 🐋

### Prerequisites
Ensure the following are installed on your system:
1. [Docker](https://www.docker.com/products/docker-desktop/)

### Steps

1. Build the app
    ```shell
    docker compose up --build
    ```

2. Run subsequently
    ```shell
    docker compose up
    ```

3. Open browser and navigate to [http://localhost:5173/](http://localhost:5173/)

## Without Docker

### Prerequisites
Ensure the following are installed on your system:
1. [Node.js](https://nodejs.org/)
2. [MySQL](https://dev.mysql.com/downloads/installer/)
3. [MySQL Workbench (optional)](https://dev.mysql.com/downloads/workbench/)

### Steps

1. Install dependencies
    ```shell
    npm install
    ```

2. Create a [MySQL Connection Instance](https://dev.mysql.com/doc/mysql-getting-started/en/)
    
3. Initialise the database
    ```sh
    node server/db/init.js
    ```

4. Start the server
    - Frontend:
        ```sh
        npm run client
        ```
    - Backend:
        ```sh
        npm run server
        ```

5. Open browser and navigate to [http://localhost:5173/](http://localhost:5173/)

## Created and maintained by Zarwaan Shroff