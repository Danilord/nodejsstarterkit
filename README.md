# NodejsStartedKit
This was a template that I already had for routing

## Requirements

- Have installed postman for testing
- Install missing packages if they are not in the node modules
## Proceso de Build


## Run
To initialize the server 
- open the terminal and run `> npm start` or `npm run start`

## Test

### Login
- Go to postman
- Paste the url in the request
    ```
    http://localhost:3060/login
    ```
- Set the request as a POST

- In the body section, set it as a JSON format and paste the credentials >
    ```
    {
        "username": "admin",
        "password": "admin"
    }
    ``` 
- `This will generate a token that is required to do a request`

### GETS

#### GET BY ID
- Open a new tab
- Paste the url in the request
`http://localhost:3060/byId?id=tt0031387`
    - You can use this id for a test> `tt0031387`
- Make sure the request to be GET
- Click on Send

#### GET BY SEARCH

- Open a new tab
- Paste the url in the request
`localhost:3060/search?value=gorilla`
    - You can use this search value for a test> `gorilla`
- Make sure the request to be GET
- Click on Send

- To search by page add the params `&page=#` as a example you can use>
`localhost:3060/search?value=gorilla&page=2`

#### NOTE> this will return only the first 2 elements of each page. If page param is bigger than the number of pages on the response will return an empty array.
