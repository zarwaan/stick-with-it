export const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(22) NOT NULL UNIQUE,
    first_name varchar(50) NOT NULL,
    last_name varchar(50),
    password varchar(255) NOT NULL
)`;

export const createHabitsTable = `CREATE TABLE IF NOT EXISTS habits(
    habit_id INT AUTO_INCREMENT PRIMARY KEY,
    habit_title VARCHAR(100) NOT NULL,
    habit_emoji JSON  NOT NULL,
    monday TINYINT(1) NOT NULL,
    tuesday TINYINT(1) NOT NULL,
    wednesday TINYINT(1) NOT NULL,
    thursday TINYINT(1) NOT NULL,
    friday TINYINT(1) NOT NULL,
    saturday TINYINT(1) NOT NULL,
    sunday TINYINT(1) NOT NULL
)`;