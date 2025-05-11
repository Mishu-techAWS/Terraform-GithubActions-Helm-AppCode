-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    votes INTEGER DEFAULT 0
);

-- Insert initial candidates
INSERT INTO candidates (name, votes) VALUES
    ('Candidate 1', 0),
    ('Candidate 2', 0),
    ('Candidate 3', 0)
ON CONFLICT (id) DO NOTHING; 