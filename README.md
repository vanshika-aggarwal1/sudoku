# Sudoku

A web-based Sudoku game built with Node.js, Express, and EJS. The application generates Sudoku puzzles using an external API and lets players solve them directly in the browser.

## Features

* Generate Sudoku puzzles in multiple difficulty levels.
* Interactive 9×9 Sudoku board.
* Automatic validation of the completed board.
* Highlights incorrect entries.
* Get Hints.
* Fetches new puzzles and solutions from an external Sudoku API.
* Responsive and lightweight interface.

## Tech Stack

* Node.js
* Express.js
* EJS
* HTML
* CSS
* JavaScript

## API

This project uses the **YouDoSudoku API** to generate puzzles.

1. Generate your API key at **https://www.youdosudoku.com/**.
2. Create a `.env` file in the project root and add your api key.

The application will automatically read the API key using `dotenv`.


## Getting Started

### Prerequisites

* Node.js (v18 or later recommended)
* npm

## Installation

1. Fork this repository by clicking the **Fork** button in the top-right corner of the GitHub page.

2. Clone your fork to your local machine.

```bash
git clone https://github.com/<your-github-username>/<repository-name>.git
```

3. Navigate to the project directory.

```bash
cd <repository-name>
```

4. Install the required dependencies.

```bash
npm install
```

5. Create a `.env` file in the project root and add your API key.

```env
MY_API_KEY=your_api_key_here
```

6. Start the development server.

```bash
npm start
```

7. Open your browser and visit:

```text
http://localhost:3000
```

## Project Structure

```
.
├── public/
│   ├── css/
|   |    ├── styles.css
|   |    └── sudoku-style.css
│   └── js/
|        └── sudoku.js
├── views/
│   ├── index.ejs
│   └── sudoku.ejs
├── index.js
├── package.json
└── .env
```

## How to Play

1. Choose a difficulty level.
2. Fill the empty cells with numbers from 1 to 9.
3. Each row, column, and 3×3 box must contain every number exactly once.
4. Complete the puzzle without any incorrect entries to win.

## Future Improvements

* Timer
* Undo/redo moves
* Save and resume games
* Dark mode
* Leaderboard and best times
* Notes (pencil marks)
* Keyboard shortcuts

## License

This project is available under the MIT License.
