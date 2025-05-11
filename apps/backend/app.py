from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'voting-database'),
        database=os.getenv('DB_NAME', 'voting'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'postgres'),
        port=os.getenv('DB_PORT', '5432')
    )

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            votes INTEGER DEFAULT 0
        )
    ''')
    
    # Check if table is empty
    cur.execute('SELECT COUNT(*) FROM candidates')
    if cur.fetchone()[0] == 0:
        cur.execute('''
            INSERT INTO candidates (name, votes) VALUES
            ('Candidate 1', 0),
            ('Candidate 2', 0),
            ('Candidate 3', 0)
        ''')
    
    conn.commit()
    cur.close()
    conn.close()

@app.route('/api/candidates', methods=['GET'])
def get_candidates():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM candidates')
    candidates = [{'id': row[0], 'name': row[1], 'votes': row[2]} for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(candidates)

@app.route('/api/vote', methods=['POST'])
def vote():
    data = request.get_json()
    candidate_id = data.get('candidateId')
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE candidates SET votes = votes + 1 WHERE id = %s', (candidate_id,))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({'message': 'Vote recorded successfully'})

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=3001) 