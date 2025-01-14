CREATE TABLE IF NOT EXISTS users (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS details (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    want_to VARCHAR(255),
    phone_number VARCHAR(20),
    gender VARCHAR(10),
    age INT,
    bio TEXT,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    event_date DATE,
    event_time TIME,
    event_name VARCHAR(255) UNIQUE,
    event_location VARCHAR(255),
    event_bio TEXT,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY UNIQUE,
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

-- Insert users
INSERT INTO users (username, password) VALUES
('johndoe@gmail.com', 'hashedpassword1'),
('janedoe@gmail.com', 'hashedpassword2'),
('alexsmith@gmail.com', 'hashedpassword3')
ON CONFLICT (username) DO NOTHING;

-- Insert tickets
INSERT INTO tickets (ticket_id,username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(1,'johndoe@gmail.com', 'Tech Conference 2025', 'General Admission', 50.00, 40.00, TRUE, 'Digital', 10, 'John Doe'),
(2,'johndoe@gmail.com', 'Tech Conference 2025', 'VIP', 150.00, 120.00, FALSE, 'Physical', 5, 'John Doe'),
(3,'janedoe@gmail.com', 'Music Fest 2025', 'Regular', 30.00, 25.00, TRUE, 'Digital', 20, 'Jane Doe'),
(4,'alexsmith@gmail.com', 'Art Exhibition', 'General Admission', 15.00, 10.00, TRUE, 'Digital', 30, 'Alex Smith')
ON CONFLICT (ticket_id) DO NOTHING;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

-- Add primary key if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'session_pkey') THEN
        ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
    END IF;
END $$;

-- Create index if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_session_expire') THEN
        CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    END IF;
END $$;

-- Check if column 'image_url' exists before adding it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'image_url') THEN
        ALTER TABLE events ADD COLUMN image_url TEXT;
    END IF;
END $$;

-- Insert data into the events table
INSERT INTO events (username, event_type, event_date, event_time, event_name, event_location, event_bio, image_url) VALUES
('user1@example.com', 'Concert', '2024-12-24', '19:00:00', 'Sunburn Music Festival', 'Mumbai, India', 'Experience the biggest music festival of the year with international artists and electrifying performances.', 'https://m.economictimes.com/thumb/msid-113568262,width-1200,height-900,resizemode-4,imgsize-1839857/coldplay-india-tour-2025.jpg'),
('user2@example.com', 'Sports', '2025-01-30', '17:30:00', 'IPL Final Match', 'Chinnaswamy Stadium, Bengaluru, India', 'Witness the ultimate cricket battle as the top teams clash for the IPL title.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg'),
('user3@example.com', 'Theatre', '2025-02-15', '18:00:00', 'Hamlet - A Shakespeare Play', 'Prithvi Theatre, Mumbai, India', 'A gripping performance of Shakespeare\s classic tragedy brought to life by renowned actors.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg'),
('user4@example.com', 'Stand-Up Comedy', '2025-03-10', '20:00:00', 'Comedy Night with Zakir Khan', 'Auditorium, Delhi University, India', 'An evening filled with laughter and relatable humor by India\s top comedian Zakir Khan.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg'),
('user5@example.com', 'Exhibition', '2025-03-20', '10:00:00', 'Art and Culture Fest 2025', 'India Habitat Centre, New Delhi, India', 'Explore an extraordinary display of art, culture, and heritage from across the globe.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg')
ON CONFLICT (event_name) DO NOTHING;
