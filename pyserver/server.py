from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from restaurant_db import RestaurantDB

# RESTAURANTS = ["Panda Garden", "Red Lobster", "Chili's", "Chef Alfredo's"] 

class MyRequestHandler(BaseHTTPRequestHandler):

    def handleRestaurantsList(self):
        self.send_response(200)
        # all headers go here:
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        # read data from list, variable, or database right here.
        db = RestaurantDB() # we do this here in case of the event that we would lose connection to the database, instead of doing outside function and always being connected to the database
        restaurants = db.getAllRestaurants()
        self.wfile.write(bytes(json.dumps(restaurants), "utf-8"))
        return

    def handleRestaurantsCreate(self):
        length = self.headers["Content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        print("the text body:", body)
        parsed_body = parse_qs(body)
        print("the parsed body:", parsed_body)

        # save the restaurant!
        
        # read the data
        # name = parsed_body["name"][0]
        # cuisine = parsed_body["cuisine"][0]
        # hours = parsed_body["hours"][0]
        # rating = parsed_body["rating"][0]

        # send these values to the database
        # call db.createRestaurant() right here and fill in the fields

        self.send_response(201)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def handleRestaurantsRetrieve(self, id):
        db = RestaurantDB()
        restaurant = db.getRestaurant(id)
        if restaurant == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(restaurant), "utf-8"))
        return

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-type", "Text/Plain")
        self.end_headers()
        self.wfile.write( bytes("Not found", "utf-8") )
        return

    def do_GET(self):
        #parse the path to find the collection and identifier
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "restaurants":
            if id == None:
                self.handleRestaurantsList()
            else:
                self.handleRestaurantsRetrieve(id)
        else:
            self.handleNotFound()
        return

    def do_POST(self):
        # restaurant create action
        if self.path == "/restaurants":
            self.handleRestaurantsCreate()
        else:
            self.handleNotFound()
        return


def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()