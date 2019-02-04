from http.server import BaseHTTPRequestHandler, HTTPServer
import json

RESTAURANTS = ["Panda", "Lobsters", "Alfredo's"]

class MyRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/restaurants":
            self.send_response(200)
            # all headers go here:
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(RESTAURANTS), "utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
        return

    def do_POST(self):
        if self.path == "/restaurants":
            length = self.headers["Content-length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            print("the body", body)
        else:
            self.send_respone(404)
            self.end_headers()
        return

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)
    print("Listening...")
    server.serve_forever()

run()
