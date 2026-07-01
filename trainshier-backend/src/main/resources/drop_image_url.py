import psycopg2

host = "aws-0-us-west-2.pooler.supabase.com"
port = 5432
user = "postgres.xraxenoollrlkxgmzcdn"
dbname = "postgres"
password = "m1nt3st.c0m"

try:
    conn = psycopg2.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        database=dbname
    )
    cursor = conn.cursor()
    
    print("Altering users table: dropping column image_url...")
    cursor.execute("ALTER TABLE users DROP COLUMN IF EXISTS image_url;")
    conn.commit()
    print("SUCCESS: image_url column dropped from users table!")
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
