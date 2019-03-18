from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from entries_db import JournalDB

class MyRequestHandler(BaseHTTPRequestHandler):

    def handleJournalsList(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        db = JournalDB()
        entries = db.getAllEntries()
        self.wfile.write(bytes(json.dumps(entries), "utf-8"))
        return

    def handleJournalsCreate(self):
        length = self.headers["Content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        print("the text body:", body)
        # parse_qs was imported and returns a dictionary
        parsed_body = parse_qs(body)
        print("the parsed body:", parsed_body)

        title = parsed_body["title"][0]
        contents = parsed_body["contents"][0]
        date = parsed_body["date"][0]
        weather = parsed_body["weather"][0]
        location = parsed_body["location"][0]
        # send these values to the database
        db = JournalDB()
        # call db.createEntry() right here and fill in the fields
        db.createEntry(title, contents, date, weather, location)
        print(title, contents, date, weather, location)

        self.send_response(201)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        return

    def handleJournalsRetrieve(self, id):
        db = JournalDB()
        entry = db.getEntry(id)
        if entry == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(entry), "utf-8"))
        return
    
    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-type", "Text/Plain")
        self.end_headers()
        self.wfile.write(bytes("Not found", "utf-8"))
        return

    def handleJournalsDelete(self, id):
        db = JournalDB()
        entry = db.getEntry(id)
        if entry == None:
            self.handleNotFound()
        else:
            db.deleteJournal(id)
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

    def handleJournalsEdit(self, id):
        db = JournalDB()
        entry = db.getEntry(id)
        if entry == None:
            self.handleNotFound()
        else:
            length = self.headers["Content-length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            print("the text body:", body)
            # parse_qs was imported and returns a dictionary
            parsed_body = parse_qs(body)
            print("the parsed body:", parsed_body)

            title = parsed_body["title"][0]
            contents = parsed_body["contents"][0]
            date = parsed_body["date"][0]
            weather = parsed_body["weather"][0]
            location = parsed_body["location"][0]
            # send these values to the database
            # call db.editJournal() right here and fill in the fields
            db.editJournal(id, title, contents, date, weather, location)
            print(title, contents, date, weather, location)

            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            return
        return
        
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-type")
        self.end_headers()

    def do_GET(self):
        # parse the path to find the collectio and identifier
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "journals":
            if id == None:
                self.handleJournalsList()
            else:
                self.handleJournalsRetrieve(id)
        else:
            self.handleNotFound()
        return
    
    def do_POST(self):
        if self.path == "/journals":
            self.handleJournalsCreate() 
        else:
            self.handleNotFound()
        return

    def do_DELETE(self):
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "journals":
            if id == None:
                self.handleNotFound()
            else:
                self.handleJournalsDelete(id)
        else:
            self.handleNotFound()
        return

    def do_PUT(self):
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None
        if collection == "journals":
            if id == None:
                self.handleNotFound()
            else:
                self.handleJournalsEdit(id)
        else:
            self.handleNotFound()
        return

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer( listen, MyRequestHandler )
    print( "Server is doing it" )
    server.serve_forever()

run()