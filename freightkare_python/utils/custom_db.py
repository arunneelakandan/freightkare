from django.db import connections

class CustomDatabaseManager():
    def __init__(self,database):
        self.database = database
        try:
            # with connections[database].cursor() as cursor:
            self.db = connections[database].cursor()
            print(f"{self.database} connection established")
        except:
            pass

    def query(self, query):
        try:
            print(query)
            self.db.execute(query)
            return True
        except:
            print(f"Error occured {self.database} connection destructed")
            # self.db.close()

    def fetchArray(self, query):
        try:
            self.db.execute(query)
            rows = self.db.fetchall()
            return rows
        except:
            print(f"Error occured {self.database} connection destructed")
            self.db.close()

    def fetchArray_withKey(self, query):
        "Return all rows from a cursor as a dict"
        self.db.execute(query)
        columns = [col[0] for col in self.db.description]
        return [
            dict(zip(columns, row))
            for row in self.db.fetchall()
        ]

    def numrows(self, query):
        try:
            self.db.execute(query)
            rows = self.db.fetchall()
            # rows = self.db.rowcount
            return len(rows)
        except:
            print(f"Error occured {self.database} connection destructed")
            self.db.close()

    def __del__(self):
        self.db.close()
        print(f"{self.database} connection destructed")