# Daily Journal
##### The name of your resource, and the name of each of its attributes:
 
 - http://localhost:8080/journal
 - Attributes:
    - Title, Date, Weather, Location, Contents

##### The database schema which represents your resource, documented as a valid SQLite CREATE TABLE query.
- .schema
    - `CREATE TABLE journals (
        id INTEGER PRIMARY KEY,
        title TEXT,
        contents TEXT,
        date TEXT,
        weather TEXT,
        location TEXT);`

##### All REST endpoints implemented by your API server. Include the name, HTTP method, and path for each.
-------
| Name | HTTP Method | Path |
| ------ | ------ | -------| 
| List | GET | http://localhost:8080/journal |
| Retrieve | GET  | http://localhost:8080/journal/id |
| Create | POST | http://localhost:8080/journal |
| Delete | DELETE | http://localhost:8080/journal/id |
| Update | PUT | http://localhost:8080/journal/id|