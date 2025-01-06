CREATE TABLE IF NOT EXISTS users (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS details (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    event_date DATE,
    event_time TIME,
    event_name VARCHAR(255),
    event_location VARCHAR(255),
    event_bio TEXT,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    ticket_type VARCHAR(50),
    selling_price DECIMAL(10, 2),
    face_value DECIMAL(10, 2),
    transferability BOOLEAN,
    ticket_format VARCHAR(50),
    quantity INT,
    seller_name VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (event_name) REFERENCES events(event_name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(customer_id) ON DELETE CASCADE
);

INSERT INTO events (event_id, username, event_type, event_date, event_time, event_name, event_location, event_bio) VALUES
(1, 'johndoe', 'Conference', '2025-03-10', '10:00:00', 'Tech Conference 2025', 'Los Angeles Convention Center', 'A tech conference bringing together enthusiasts and professionals.'),
(2, 'janedoe', 'Music', '2025-06-15', '18:00:00', 'Music Fest 2025', 'Central Park, New York', 'An open-air music festival featuring top artists.'),
(3, 'alexsmith', 'Exhibition', '2025-04-05', '09:00:00', 'Art Exhibition', 'National Art Gallery', 'A showcase of contemporary and classical art.');

INSERT INTO tickets (ticket_id, username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(1, 'johndoe', 'Tech Conference 2025', 'General Admission', 50.00, 40.00, TRUE, 'Digital', 10, 'John Doe'),
(2, 'johndoe', 'Tech Conference 2025', 'VIP', 150.00, 120.00, FALSE, 'Physical', 5, 'John Doe'),
(3, 'janedoe', 'Music Fest 2025', 'Regular', 30.00, 25.00, TRUE, 'Digital', 20, 'Jane Doe'),
(4, 'alexsmith', 'Art Exhibition', 'General Admission', 15.00, 10.00, TRUE, 'Digital', 30, 'Alex Smith');
