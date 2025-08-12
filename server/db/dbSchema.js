export const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(22) NOT NULL UNIQUE,
    first_name varchar(50) NOT NULL,
    last_name varchar(50),
    password varchar(255) NOT NULL
)`;