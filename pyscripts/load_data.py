import psycopg2
import sys
import json
with open("/var/www/html/freightkare/pyscripts/sample.json") as __file:
    sample = json.load(__file)

conn = psycopg2.connect(
    database="freightkare", user='postgres', password='root', host='localhost', port='5432'
)
conn.autocommit = True
# # Creating a cursor object using the cursor() method
cursor = conn.cursor()
for __row in sample:
    country = __row['country']
    ports = __row['ports']
    for _row in ports:
        port = _row['port']
        url = _row['url']
        insert_query = f"INSERT INTO public.tbl_ports (port_name, country_name, url) VALUES('{port}', '{country}','{url}')"
        try:
            cursor.execute(insert_query)
            print(insert_query)
        except:
            print("Cannot insert")


cursor.execute(
    "SELECT * FROM tbl_ports ORDER BY id ASC")

data = cursor.fetchone()
print("Connection established to: ", data)
conn.close()
sys.exit()
# establishing the connection

# Executing an MYSQL function using the execute() method

# Fetch a single row using fetchone() method.

# Closing the connection
