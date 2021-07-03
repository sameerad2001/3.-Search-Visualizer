let footer_text = document.getElementById("footer_text")
footer_text.innerHTML += new Date().getFullYear()

// Animate search _____________________
let array_numbers = document.getElementsByClassName("array_element");
let step_count = document.getElementById("step_count")
let key = document.getElementById("key")

// linear_search = async() => {
//     let count = 0
//     for (let i = 0; i < array_numbers.length; i++) {
//         count++;
//         step_count.innerHTML = count;

//         if (parseInt(array_numbers[i].innerHTML) === parseInt(key.innerHTML)) {
//             array_numbers[i].classList.add("found")
//             break;
//         }

//         array_numbers[i].classList.add("flash");

//         await new Promise(resolve => setTimeout(resolve, 500))

//         array_numbers[i].classList.remove("flash");
//         array_numbers[i].classList.add("discard");
//     }
// }


async function linear_search() {
    let count = 0
    for (let i = 0; i < array_numbers.length; i++) {
        count++;
        step_count.innerHTML = count;

        if (parseInt(array_numbers[i].innerHTML) === parseInt(key.innerHTML)) {
            array_numbers[i].classList.add("found")
            break;
        }

        array_numbers[i].classList.add("flash");

        await new Promise(resolve => setTimeout(resolve, 500))

        array_numbers[i].classList.remove("flash");
        array_numbers[i].classList.add("discard");
    }
}

async function binary_search() {
    let count = 0
    let start = 0
    let end = array_numbers.length - 1

    while (start <= end) {
        count++;
        step_count.innerHTML = count;

        let mid = parseInt((start + end) / 2)

        // Algorithm______________________________________________________________
        if (parseInt(array_numbers[mid].innerHTML) === parseInt(key.innerHTML)) {
            array_numbers[mid].classList.add("found")
            break;
        } else if (array_numbers[mid].innerHTML > parseInt(key.innerHTML)) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }

        array_numbers[mid].classList.add("flash");

        await new Promise(resolve => setTimeout(resolve, 700))
        array_numbers[mid].classList.remove("flash");
        array_numbers[mid].classList.add("discard");
    }
}

// Call sorting function
let algo = document.getElementById("algo")

function call_sort() {
    switch (parseInt(algo.innerHTML)) {
        case 1:
            linear_search()
            break

        case 2:
            binary_search()
            break
    }
}
call_sort();