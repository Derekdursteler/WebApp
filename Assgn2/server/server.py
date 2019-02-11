from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

BUCKETLIST = ["Thailand, Germany, Sweden, Dominican Republic"]

class MyRequestHandler( BaseHTTPRequestHandler ):

    def do_GET( self ):
        if self.path == "/bucket":
            self.send_response( 200 )
            # headers
            self.send_header( "Content-type", "application/json" )
            self.send_header( "Access-Control-Allow-Origin", "*" )
            self.end_headers()
            # read file here
            self.wfile.write( bytes( json.dumps( BUCKETLIST ), "utf-8" ) )
        else:
            self.send_response( 404 )
            self.end_headers
        return

    def do_POST( self ):
        return

def run( ):
    listen = ( "127.0.0.1", 8080 )
    server = HTTPServer( listen, MyRequestHandler )

    print( "Server is listening..." )
    server.serve_forever( )

run( )