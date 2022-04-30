# Setup
- `docker-compose up -d`
- `npm start`

# mongodb 

- `docker exec -it mongodb /bin/sh`
- `mongo -u {username} -p {password}`
- `use {db}`
- CRUD 
    - select * from shop; `db.shop.find({})` 
    - delete * from shop; `db.shop.deleteMany({})` 