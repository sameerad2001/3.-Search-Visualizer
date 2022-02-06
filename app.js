const express = require('express')
const body_parser = require('body-parser');
const { json } = require('body-parser');

let app = express()

app.use(express.static('public'))
app.use(body_parser.urlencoded({ extended: true }));


app.set('view engine', 'ejs')


// Global Variables
let key;
let array_number = [];
let algo;
let delay;

function reset_array() {
    // Empty the global array
    array_number = []
}


// Server Routes
app.get('/', (req, res) => {
    res.render('form')
})

app.post('/', (req, res) => {

    // __________________________________________________ Collect Array and Key

    // "1,2,3,4" -----> ['', '1,2,3,4']    
    let input_string = JSON.stringify(req.body.array).split("\"")[1];
    // console.log(input_string);

    // '1,2,3,4' ------> ['1','2','3','4']
    let array_string = input_string.split(',');
    // console.log(array_string);

    // "1" -------> ['','1'] -------> 1
    key = parseInt(JSON.stringify(req.body.key).split("\"")[1]);

    algo = parseInt(JSON.stringify(req.body.algorithm).split("\"")[1]);
    console.log("Option: " + algo)

    delay = parseInt(JSON.stringify(req.body.delay).split("\"")[1]);

    reset_array()
    for (let i = 0; i < array_string.length; i++) {
        array_number[i] = array_string[i]
    }

    console.log("Array: " + array_number + "\nKey: " + key)
    res.redirect('/visualizer')
})


app.get('/visualizer', (req, res) => {

    algo_name = ""
    switch (algo) {
        case 1:
            algo_name = "Linear Search";
            break;

        case 2:
            array_number.sort((a, b) => a - b)
            algo_name = "Binary Search";
            break;

        case 3:
            array_number.sort((a, b) => a - b)
            algo_name = "Jump Search";
            break;

        case 4:
            array_number.sort((a, b) => a - b)
            algo_name = "Exponential Search";
            break;

        case 5:
            array_number.sort((a, b) => a - b)
            algo_name = "Fibonacci Search";
            break;

        case 6:
            array_number.sort((a, b) => a - b)
            algo_name = "Interpolation Search";
            break;


        default:
            algo_name = "Linear Search"
    }

    res.render('visualizer', { array_number: array_number, key: key, algo_name: algo_name, algo: algo, delay: delay })
})

app.listen(4000, () => {
    console.log('server started on port 4000')
})