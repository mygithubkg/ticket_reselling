-- DROP TABLE IF EXISTS tickets CASCADE;
-- DROP TABLE IF EXISTS events CASCADE;
-- DROP TABLE IF EXISTS details CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS session CASCADE;



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
    event_id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    event_date DATE,
    event_time TIME,
    event_name VARCHAR(255) UNIQUE,
    event_location VARCHAR(255),
    event_bio TEXT,
	image_url TEXT,
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
('alexsmith@gmail.com', 'hashedpassword3'),
('user@example.com', 'hashedpassword3')
ON CONFLICT (username) DO NOTHING;

-- Insert data into the events table
INSERT INTO events (username, event_type, event_date, event_time, event_name, event_location, event_bio, image_url,event_id) VALUES
('johndoe@gmail.com', 'Concert', '2024-12-24', '19:00:00', 'Sunburn Music Festival', 'Mumbai, India', 'Experience the biggest music festival of the year with international artists and electrifying performances.', 'https://m.economictimes.com/thumb/msid-113568262,width-1200,height-900,resizemode-4,imgsize-1839857/coldplay-india-tour-2025.jpg',1),
('janedoe@gmail.com', 'Sports', '2025-01-30', '17:30:00', 'IPL Final Match', 'Chinnaswamy Stadium, Bengaluru, India', 'Witness the ultimate cricket battle as the top teams clash for the IPL title.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg',2),
('janedoe@gmail.com', 'Theatre', '2025-02-15', '18:00:00', 'Hamlet - A Shakespeare Play', 'Prithvi Theatre, Mumbai, India', 'A gripping performance of Shakespeare\s classic tragedy brought to life by renowned actors.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg',3),
('janedoe@gmail.com', 'Stand-Up Comedy', '2025-03-10', '20:00:00', 'Comedy Night with Zakir Khan', 'Auditorium, Delhi University, India', 'An evening filled with laughter and relatable humor by India\s top comedian Zakir Khan.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg',4),
('johndoe@gmail.com', 'Exhibition', '2025-03-20', '10:00:00', 'Art and Culture Fest 2025', 'India Habitat Centre, New Delhi, India', 'Explore an extraordinary display of art, culture, and heritage from across the globe.', 'https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg',5)
ON CONFLICT (event_name) DO NOTHING;

-- Insert tickets
-- Insert tickets for Sunburn Music Festival
-- Insert tickets for Sunburn Music Festival
INSERT INTO tickets (ticket_id,username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(1,'user@example.com', 'Sunburn Music Festival', 'General Admission', 50.00, 40.00, TRUE, 'Digital', 100, 'Sunburn Organizers'),
(2,'user@example.com', 'Sunburn Music Festival', 'VIP', 200.00, 180.00, FALSE, 'Physical', 50, 'Organizers'),
(3,'user@example.com', 'Sunburn Music Festival', 'Backstage Pass', 500.00, 450.00, FALSE, 'Physical', 20, 'Sunburns'),
(4,'user@example.com', 'Sunburn Music Festival', 'Early Bird', 40.00, 30.00, TRUE, 'Digital', 150, 'Akash Entertainment')
ON CONFLICT ON CONSTRAINT tickets_pkey DO NOTHING;

-- Insert tickets for IPL Final Match
INSERT INTO tickets (ticket_id,username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(5,'user@example.com', 'IPL Final Match', 'General Admission', 100.00, 90.00, TRUE, 'Digital', 200, 'IPL Committee'),
(6,'user@example.com', 'IPL Final Match', 'VIP', 500.00, 450.00, FALSE, 'Physical', 50, 'Committee'),
(7,'user@example.com', 'IPL Final Match', 'Corporate Box', 1500.00, 1400.00, FALSE, 'Physical', 10, 'Committee'),
(8,'user@example.com', 'IPL Final Match', 'Student Pass', 80.00, 70.00, TRUE, 'Digital', 100, 'IPL')
ON CONFLICT ON CONSTRAINT tickets_pkey DO NOTHING;

-- Insert tickets for Hamlet - A Shakespeare Play
INSERT INTO tickets (ticket_id,username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(9,'user@example.com', 'Hamlet - A Shakespeare Play', 'Balcony Seat', 20.00, 18.00, TRUE, 'Digital', 100, 'Prithvi'),
(10,'user@example.com', 'Hamlet - A Shakespeare Play', 'Front Row Seat', 100.00, 90.00, FALSE, 'Physical', 50, 'Theatre'),
(11,'user@example.com', 'Hamlet - A Shakespeare Play', 'Season Pass', 500.00, 450.00, FALSE, 'Physical', 10, 'Prithvi Sharma'),
(12,'user@example.com', 'Hamlet - A Shakespeare Play', 'Concession Pass', 15.00, 12.00, TRUE, 'Digital', 100, 'Prithvi')
ON CONFLICT ON CONSTRAINT tickets_pkey DO NOTHING;

-- Insert tickets for Comedy Night with Zakir Khan
INSERT INTO tickets (ticket_id, username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(13,'user@example.com', 'Comedy Night with Zakir Khan', 'Standard', 30.00, 25.00, TRUE, 'Digital', 150, 'Zakir Khan'),
(14,'user@example.com', 'Comedy Night with Zakir Khan', 'VIP', 100.00, 90.00, FALSE, 'Physical', 50, 'Zakir'),
(15,'user@example.com', 'Comedy Night with Zakir Khan', 'Group Pass', 120.00, 100.00, TRUE, 'Digital', 50, 'Khan Entertainment'),
(16,'user@example.com', 'Comedy Night with Zakir Khan', 'Student Pass', 20.00, 15.00, TRUE, 'Digital', 100, 'Zakir Entertainment')
ON CONFLICT ON CONSTRAINT tickets_pkey DO NOTHING;

-- Insert tickets for Art and Culture Fest 2025
INSERT INTO tickets (ticket_id,username, event_name, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES
(17,'user@example.com', 'Art and Culture Fest 2025', 'General Admission', 10.00, 8.00, TRUE, 'Digital', 300, 'Committee'),
(18,'user@example.com', 'Art and Culture Fest 2025', 'VIP', 50.00, 45.00, FALSE, 'Physical', 20, 'Culture'),
(19,'user@example.com', 'Art and Culture Fest 2025', 'All-Access Pass', 100.00, 90.00, FALSE, 'Physical', 10, 'Committee'),
(20,'user@example.com', 'Art and Culture Fest 2025', 'Early Bird', 8.00, 6.00, TRUE, 'Digital', 100, 'Culture Committee')
ON CONFLICT ON CONSTRAINT tickets_pkey DO NOTHING;

-- Reset the ticket_id sequence
SELECT setval(pg_get_serial_sequence('tickets', 'ticket_id'), COALESCE(MAX(ticket_id), 0) + 1, false) FROM tickets;

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