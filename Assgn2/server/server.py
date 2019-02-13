from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

BUCKETLIST = []

class MyRequestHandler( BaseHTTPRequestHandler ):

    def do_GET( self ):
        if self.path == "/destinations":
            self.send_response( 200 )
            # headers
            self.send_header( "Content-type", "application/json" )
            self.send_header( "Access-Control-Allow-Origin", "*" )
            self.end_headers()
            # read file here
            BUCKETLIST = []
            fin = open("destinations.txt", "r")
            for line in fin:
                line = line.strip()
                BUCKETLIST.append(line)
            fin.close()
            self.wfile.write( bytes( json.dumps( BUCKETLIST ), "utf-8" ) )
        else:
            self.send_response( 404 )
            self.send_header("Content-type", "Text/Plain")
            self.end_headers()
            self.wfile.write( bytes( "File not found", "utf-8" ) )
        return

    def do_POST( self ):
        if self.path == "/destinations":
            length = self.headers[ "Content-length" ]
            body = self.rfile.read( int( length ) ).decode( "utf-8" )
            parsed_body = parse_qs( body )
            # print( parsed_body )
            # save bucketlist item
            BUCKETLIST.append( parsed_body[ "name" ][ 0 ])
            # write to file here
            fout = open("destinations.txt", "a")
            fout.write(parsed_body["name"][0] + "\n")
            fout.close()
            self.send_response( 201 )
            self.send_header( "Access-Control-Allow-Origin", "*" )
            self.end_headers( )
        else:
            self.send_response( 404 )
            self.send_header( "Content-type", "Text/Plain")
            self.end_headers( )
            self.wfile.write( bytes( "Illegal POST Request", "utf-8" ) )
        return

    def do_DELETE( self ):
        if self.path == "/destinations":
            fin = open("destinations.txt", "w")
            fin.close()
            self.send_response(200)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
        return

def run( ):
    listen = ( "127.0.0.1", 8080 )
    server = HTTPServer( listen, MyRequestHandler )

    print( "Server is listening..." )
    server.serve_forever( )

run( )
