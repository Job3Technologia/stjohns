import sqlite3
import os

db_path = 'database/st_marys_clinic.sqlite'
schema_path = 'database/schema.sql'

if not os.path.exists('database'):
    os.makedirs('database')

with open(schema_path, 'r') as f:
    schema = f.read()

conn = sqlite3.connect(db_path)
conn.executescript(schema)
conn.close()

print('Database initialized successfully.')
