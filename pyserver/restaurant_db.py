import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class RestaurantDB:

    def __init__(self):
        self.connection = sqlite3.connect("restaurant_db.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def __del__(self): # destructor method
        # disconnect
        self.connection.close()

    def createRestaurant(self, name, cuisine, hours, rating):
        sql = "INSERT INTO restaurants (name, cuisine, hours, rating) VALUES (?, ?, ?, ?)" # Use ? for placeholder so the client can't do sql injections
        self.cursor.execute(sql, [name, cuisine, hours, rating]) # The list of variables is data-binding and makes it so the sql injection can't happen, the database takes the value literally
        self.connection.commit()
        return

    def getAllRestaurants(self):
        self.cursor.execute("SELECT * FROM restaurants")
        return self.cursor.fetchall()
    
    def getRestaurant(self, id):
        sql = self.cursor.execute("SELECT * FROM restaurants WHERE id =?")
        self.cursor.execute(sql, [id]) # data must be a list
        return self.cursor.fetchone()

    def deleteRestaurant(self, id):
        sql = "DELETE FROM restaurants WHERE id = (?)"
        self.cursor.execute(sql, [id])
        self.connection.commit()
        return

    def updateRestaurant(self, name, cuisine, hours, rating, id):
        sql = "UPDATE restaurants SET name = ?, cuisine = ?, hours = ?, rating = ? WHERE id = ?"
        self.cursor.execute(sql, [name, cuisine, hours, rating, id])
        self.connection.commit()
        return