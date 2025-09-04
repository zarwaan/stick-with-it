export const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(22) NOT NULL UNIQUE,
    first_name varchar(50) NOT NULL,
    last_name varchar(50),
    password varchar(255) NOT NULL
)`;

export const createHabitsTable = `CREATE TABLE IF NOT EXISTS habits(
    habit_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    habit_title VARCHAR(200) NOT NULL,
    habit_emoji JSON NOT NULL,
    monday TINYINT(1) NOT NULL,
    tuesday TINYINT(1) NOT NULL,
    wednesday TINYINT(1) NOT NULL,
    thursday TINYINT(1) NOT NULL,
    friday TINYINT(1) NOT NULL,
    saturday TINYINT(1) NOT NULL,
    sunday TINYINT(1) NOT NULL,
    created_date DATE NOT NULL DEFAULT "2025-06-01",
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)`;

export const createHabitsLogTable = `CREATE TABLE IF NOT EXISTS habits_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    habit_id INT NOT NULL,
    completed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_date DATE GENERATED ALWAYS AS (DATE(completed_at)) STORED,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    UNIQUE KEY unique_habit_day (user_id, habit_id, completed_date)
)`;