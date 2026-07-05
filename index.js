import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const apikey = process.env.MY_API_KEY;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index");
});
let sud = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

let sol = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

let difficulty = null;
let tofill = 0;

app.get("/next/:difficulty", async (req, res) => {
    difficulty = req.params.difficulty;

    try{
        const response = await fetch("https://youdosudoku.com/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apikey,
            },
            body: JSON.stringify({
                difficulty: difficulty,
            })
        });

        if(!response.ok) throw new Error(`Error : ${response.status}`);

        const data = await response.json();

            for(let i = 0; i < 9; i++) {
                for(let j = 0; j < 9; j++) {
                    sud[i][j]=Number(data.puzzle[i*9+j]);
                    sol[i][j]=Number(data.solution[i*9+j]);
                }
            }
        res.render("sudoku", {difficulty: difficulty, sud: sud });
    } catch(err) {
        console.log(err);
        res.status(500).send("Failed to fetch Sudoku");
    }
});

app.post("/check", async(req, res) => {
    const userBoard = req.body.board;

    const wrongCells = [];
    let notfil = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(userBoard[i][j] == 0) notfil++;
            if (userBoard[i][j] != 0 && userBoard[i][j] !== sol[i][j]) {
                wrongCells.push({ row: i, col: j });
            }
        }
    }

    res.json({wrongCells, notfil});
});

app.post("/hint", async(req, res) => {
    const row = req.body.row;
    const col = req.body.col;
    const val = sol[row][col];
    res.json({val});
})

app.get("/reset", async(req, res) => {
    res.render("sudoku", {difficulty : difficulty, sud: sud});
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});
