# CasAnimale

Progetto del corso di Tecnologie Web dell'anno academico 2021/2022

# Note per poter poter far partire tutto l'ambaradan

1. `npm start` nella cartella server per far partire il backend in express
2. poi `npx tailwindcss -i ./src/input.css -o ./src/output.css --watch` per far partire tailwind su front-office e/o game
3. `npm start` e/o `npm run dev` su front-office o game

# Per aggiungere utenti al db
`curl --header "Content-Type: application/json" -X POST -i http://localhost:5000/register --data '{
  "name": "Giorgio",
  "surname": "Stromboli",
  "birth": "15/10/2000",
  "email": "giostro@gmail.com",
  "password": "ciao1234",
  "favanimal": "Cane"
}'`