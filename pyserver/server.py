from http.server import BaseHTTPRequestHandler, HTTPServer

class MyRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/oranges":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(bytes("I like oranges", "utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
    def do_POST(self):
        return

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)
    print("Listening...")
    server.serve_forever()

run()