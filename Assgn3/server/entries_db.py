import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class JournalDB:

    def __init__(self):
        self.connection = sqlite3.connect("entries_db.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def __del__(self): # destructor method
        # disconnect
        self.connection.close()

    def createEntry(self, title, contents, date, weather, location):
        sql = "INSERT INTO journals (title, contents, date, weather, location) VALUES (?, ?, ?, ?, ?)" # Use ? for placeholder so the client can't do sql injections
        self.cursor.execute(sql, [title, contents, date, weather, location]) # The list of variables is data-binding and makes it so the sql injection can't happen, the database takes the value literally
        self.cursor.commit()
        return

    def getAllEntries(self):
        self.cursor.execute("SELECT * FROM journals")
        return self.cursor.fetchall()
        # cursor.fetchone()
        
    def getEntry(self, id):
        sql = self.cursor.execute("SELECT * FROM journals WHERE id =?")
        self.cursor.exectue(sql, [id])
        return self.cursor.fetchone()