# PRW3

### **Auth Routes (CRUD)**

| Method | Route | Description |
| --- | --- | --- |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate user & get token |
| GET | `/user` | Get authenticated user info (requires token) |
| GEZ | `/user/scores` | Get user scores list |
| PUT | `/user` | Update authenticated user info |
| DELETE | `/user` | Delete user account |
| POST | `/auth/logout` | Logout user (invalidate token) |
| POST | `/auth/refresh` | Refresh authentication token |

## Question

| Method | Route | Description | Requirement | Return |
| --- | --- | --- | --- | --- |
| GET | `/question/`  | Retourne une question random |  | id
4 réponse (dont 1 juste)
Vidéo ID |
| GET | `/question/{id}`  | Retourne la réponse a la question demandé |  | Réponse + Résultat Info Film |

## ScoreBoard

| Method | Route | Description | Requirement | Return |
| --- | --- | --- | --- | --- |
| GET | `/scores`  | Retourne le nombre top demander | Nombre de personne |  |
| POST | `/scoreboard/score`  | Ajoute le score d’un user |  | Réponse |
|  |  |  |  |  |