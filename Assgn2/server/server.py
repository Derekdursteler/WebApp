from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

BUCKETLIST = ["Thailand", "Germany", "Sweden", "Dominican Republic"]

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
        if self.path == "/bucket":
            length = self.headers[ "Content-length" ]
            body = self.rfile.read( int( length ) ).decode( "utf-8" )
            parsed_body = parse_qs( body )
            print( parsed_body )
            # save bucketlist item
            BUCKETLIST.append( parsed_body[ "name" ][ 0 ])
            # write to file here 
            self.send_response( 201 )
            self.send_header( "Access-Control-Allow-Origin", "*" )
            self.end_headers( )
        else:
            self.send_response( 404 )
            self.end_headers( )
        return

def run( ):
    listen = ( "127.0.0.1", 8080 )
    server = HTTPServer( listen, MyRequestHandler )

    print( "Server is listening..." )
    server.serve_forever( )

run( )