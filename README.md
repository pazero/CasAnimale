# CasAnimale

Progetto del corso di Tecnologie Web dell'anno academico 2021/2022

# Note per poter poter far partire il dokcer

1. nella cartella del progetto eseguire `docker build . -t prog-tecweb`
2. poi `docker run -p 5000:5000 -d prog-tecweb:latest` per far partire il docker (omettere il `-d` per vedere l'output)
3. `docker ps` per vedereil nome della macchina e il suo stato
4. `docker stop [macchina]` per stopparla
