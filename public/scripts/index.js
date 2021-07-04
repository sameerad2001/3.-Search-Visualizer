let footer_text = document.getElementById("footer_text")
footer_text.innerHTML += new Date().getFullYear()

// Global Vars_____________________
let array_numbers = document.getElementsByClassName("array_element");
let step_count = document.getElementById("step_count")
let key = document.getElementById("key")
let index = document.getElementById("index")
let delay = 500 // 0.5 sec Default
let is_running = false // Button wont work if function is already running


// Fetch delay
let delay_raw = document.getElementById("delay")
delay = parseInt(delay_raw.innerHTML);


// ALGORITHMS_________________________________________________________________________________________________________________
async function linear_search() {

    is_running = true

    let count = 0
    for (let i = 0; i < array_numbers.length; i++) {
        index.innerHTML = i
        count++;
        step_count.innerHTML = count;

        if (parseInt(array_numbers[i].innerHTML) === parseInt(key.innerHTML)) {
            array_numbers[i].classList.add("found")
            break;
        }

        array_numbers[i].classList.add("flash");

        await new Promise(resolve => setTimeout(resolve, delay))

        array_numbers[i].classList.remove("flash");
        array_numbers[i].classList.add("discard");
    }

    is_running = false
}

async function binary_search() {

    is_running = true

    let count = 0
    let start = 0
    let end = array_numbers.length - 1

    while (start <= end) {

        // Denotes the range
        array_numbers[start].classList.add("range");
        array_numbers[end].classList.add("range");

        count++;
        step_count.innerHTML = count;

        let mid = parseInt((start + end) / 2)
        index.innerHTML = mid
        let temp_start = start
        let temp_end = end


        // Algorithm______________________________________________________________
        if (parseInt(array_numbers[mid].innerHTML) === parseInt(key.innerHTML)) {
            array_numbers[mid].classList.add("found")
            array_numbers[mid].classList.remove("range")
            break;
        } else if (array_numbers[mid].innerHTML > parseInt(key.innerHTML)) {

            // Discard the other elements in range [mid, last]
            for (let j = mid; j < array_numbers.length; j++) {
                array_numbers[j].classList.add("discard");
            }
            end = mid - 1;
        } else {

            // Discard the other elements in range [first, mid]
            for (let j = 0; j <= mid; j++) {
                array_numbers[j].classList.add("discard");
            }
            start = mid + 1;
        }

        array_numbers[mid].classList.add("flash");

        await new Promise(resolve => setTimeout(resolve, delay))
        array_numbers[mid].classList.remove("flash");
        array_numbers[temp_start].classList.remove("range")
        array_numbers[temp_end].classList.remove("range")
            // Already discarded above
            // array_numbers[mid].classList.add("discard");
    }

    is_running = false
}

async function jump_search() {

    is_running = true

    let count = 0
    let step_size = parseInt(Math.sqrt(array_numbers.length))
    let curr_index = 0

    while (curr_index < array_numbers.length) {
        count++;
        step_count.innerHTML = count;
        index.innerHTML = curr_index
        if (parseInt(array_numbers[curr_index].innerHTML) < parseInt(key.innerHTML)) {

            array_numbers[curr_index].classList.add("flash");
            await new Promise(resolve => setTimeout(resolve, delay))
            array_numbers[curr_index].classList.remove("flash");
            array_numbers[curr_index].classList.add("discard");

            // i = i + step >= n ? n - 1 : i + step 
            curr_index = curr_index + step_size >= array_numbers.length ? array_numbers.length - 1 : curr_index + step_size;
        } else {

            array_numbers[curr_index].classList.add("flash");
            await new Promise(resolve => setTimeout(resolve, delay))
            array_numbers[curr_index].classList.remove("flash");
            array_numbers[curr_index].classList.add("discard");

            curr_index -= step_size;
            // Discard all elements out of range
            let j = 0
            for (j; j < curr_index; j++) {
                array_numbers[j].classList.add("discard");
            }
            j = curr_index + step_size + 1 >= array_numbers.length ? array_numbers.length - 1 : curr_index + step_size + 1;
            for (j; j < array_numbers.length; j++) {
                array_numbers[j].classList.add("discard");
            }
            // Do NOT discard Elements in the range 
            j = curr_index
            for (j; j <= curr_index + step_size; j++) {
                array_numbers[j].classList.remove("discard");
            }

            // Linear Search in range 
            j = curr_index
            for (j; j <= curr_index + step_size; j++) {
                count++;
                step_count.innerHTML = count;
                index.innerHTML = j

                if (parseInt(array_numbers[j].innerHTML) === parseInt(key.innerHTML)) {
                    array_numbers[j].classList.add("found")
                    break;
                }

                array_numbers[j].classList.add("flash");

                await new Promise(resolve => setTimeout(resolve, delay))

                array_numbers[j].classList.remove("flash");
                array_numbers[j].classList.add("discard");
            }

            break
        }
    }

    is_running = false
}


// Call sorting function
let algo = document.getElementById("algo")

function call_search() {
    switch (parseInt(algo.innerHTML)) {
        case 1:
            linear_search()
            break

        case 2:
            binary_search()
            break

        case 3:
            jump_search()
            break

        case 4:
            // exponential_search()
            break

        case 5:
            // fibonacci_search()
            break

        case 6:
            // interpolation_search()
            break

        default:
            linear_search()
    }
}

// Don't Discard
function reset_visuals() {
    for (let i = 0; i < array_numbers.length; i++) {
        array_numbers[i].classList.remove("discard");
        array_numbers[i].classList.remove("found");
    }
}

// call_search();
let start_search = document.getElementById("start_search")
start_search.addEventListener("click", () => {

    // Button Does not work when function is already running
    if (is_running)
        return;

    reset_visuals();
    call_search();
})