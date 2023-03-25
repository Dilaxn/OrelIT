# Todo app

This is a simple Todo app built with React, Redux, Node.js, and MySQL. It allows you to add, edit,mark complete and delete Todo items.

## Installation

1. Clone the repository - git clone https://github.com/Dilaxn/OrelIT.git
2. In the repo frontend and backend are inside the main folder
3. backend (todo_server)
4. goto server - cd todo_server
5. Install dependencies with `npm install`
6. change MySQL parameters in dependencies/dependencies.js
7. then run the backend server - npm start
8. Backend will start in defined port - 5000
9. Create a MySQL database and table - I have attached the exported data in todo_server/db/ folder
10. import it to your workbench
11. frontend (todo_client)
12. goto client - cd todo_client
13. Install dependencies with `npm install`
14. change base url from Const.js according to your backend
15. then run the client - npm start
16. Open `http://localhost:3000` in your browser

## Usage

- Add a new Todo item: Enter a title and click "+"
- Edit a Todo item: Click the item to edit, make changes, and click "Save"
- Delete a Todo item: Click the item to delete, and click "Delete"
- Complete a Todo item: Click the right side check complete the task
