document.querySelector('#input-name').addEventListener('input', (e) => {

    // Get the current value of the input field
    let value = e.target.value;

    // Allow only alphabetic characters (A-Z and a-z)
    e.target.value = value.replace(/[^a-zA-Z]/g, '');

})

document.querySelector('#input-document').addEventListener('input', (e) => {
    let value = e.target.value;
    // Allow only numeric characters (0-9)
    e.target.value = value.replace(/[^0-9]/g, '');
})




// INPUT SEARCH BY NAME
document.querySelector('#search-by-name').addEventListener('input', async (e) => {
    //Erases "search by document" input
    document.querySelector('#search-by-document').value = '';

    // Get the current value of the input field
    let inputText = e.target.value.trim();

    //Blocks input if user types number
    if (Number(inputText) && e.inputType != 'deleteContentBackward') {
        e.target.value = ''
        return
    }


    clear_results(false);

    // If the input is empty, hide any previous error messages and return early
    if (inputText === '') {

        // Clear the result columns
        list_users(null);
        // clear_results(true);
        return;
    }

    // Skip handling for non-textual keys like Alt, Tab, Shift, etc.
    if (e.inputType === 'insertFromPaste' || e.inputType === 'deleteContentBackward' || e.inputType.startsWith('delete')) {
        // Handle delete and backspace operations

        document.querySelector('.nothing-found').classList.add('d-none');
        document.querySelector('.nothing-found').classList.remove('d-flex');
    }



    // Skip input if the user entered a number (not applicable for name search)
    if (!isNaN(inputText)) {

        return;
    }

    // Proceed with search if valid text input
    try {
        let obj = { name: inputText };

        // Call the search API with the user input
        let data = await window.electronAPI.search_by_name(obj);

        if (typeof data != 'object' && data === null) {

            document.querySelector('.nothing-found').classList.remove('d-none');
            document.querySelector('.nothing-found').classList.add('d-flex');
            return;
        }


        // Check if any results were found
        if (data.length === 0) {
            clear_results(true);
            // Show "nothing found" message
            document.querySelector('.nothing-found').classList.remove('d-none');
            document.querySelector('.nothing-found').classList.add('d-flex');
            return;
        }


        // Call function to list users if results are found
        list_users(data);


    } catch (error) {
        clear_results();
        console.error('Error fetching search results:', error);

        // Optionally show a user-friendly message for errors
        document.querySelector('.nothing-found').classList.remove('d-none');
        document.querySelector('.nothing-found').classList.add('d-flex');
    }
});

//INPUT SEARCH BY DOCUMENT
document.querySelector('#search-by-document').addEventListener('input', async (e) => {

    //Erases "search by name" input
    document.querySelector('#search-by-name').value = ''

    // Get the current value of the input field
    let input_number = e.target.value.trim();


    // Blocks input if user doesn't type number
    if (!Number(input_number) && e.inputType != 'deleteContentBackward') {

        e.target.value = ''
        return
    }



    // If the input is empty, hide any previous error messages and return early
    if (input_number === '') {
        clear_results(false);
        list_users(null);
        return;
    }

    // Skip handling for non-textual keys like Alt, Tab, Shift, etc.
    if (e.inputType === 'insertFromPaste' || e.inputType === 'deleteContentBackward' || e.inputType.startsWith('delete') && e.inputText != '') {
        clear_results(false);
        list_users(null);
    }


    // Ensure input is a valid number
    if (isNaN(input_number)) {

        document.querySelector('.nothing-found').classList.add('d-flex');
        document.querySelector('.nothing-found').classList.remove('d-none');

        return;

    }

    // Proceed with search if valid numeric input
    try {


        input_number = Number(input_number);


        let obj = { visitor_id: input_number };

        // Call the search API with the document number input
        let data = await window.electronAPI.search_by_doc(obj);


        if (typeof data != 'object' && data === null) {
            // If data is an array, no results were found, show the error message
            document.querySelector('.nothing-found').classList.remove('d-flex');
            document.querySelector('.nothing-found').classList.add('d-none');
            return;
        }


        // Check if any results were found
        if (data.length === 0) {
            clear_results(true);
            document.querySelector('.nothing-found').classList.remove('d-none');
            document.querySelector('.nothing-found').classList.add('d-flex');
            return;
        }

        // Call function to list users if results are found
        list_users(data);

    } catch (error) {
        console.error('Error fetching search results:', error);
        clear_results();
        // Optionally show a user-friendly message for errors
        document.querySelector('.nothing-found').classList.remove('d-none');
        document.querySelector('.nothing-found').classList.add('d-flex');
    }
});



//=====================================================================================






//SEARCH BY PERIOD, DATE BEGIN 
// Initialize Flatpickr on the date input
flatpickr("#datepicker-begin", {
    dateFormat: "Y-m-d",
    allowInput: true,
    locale: "pt"
});
document.querySelector('#datepicker-begin').addEventListener('keydown', (e) => {
    e.preventDefault();
    document.querySelector('#datepicker-begin')._flatpickr.open();
});


//SEARCH BY PERIOD, DATE END
// Initialize Flatpickr on the date input
flatpickr("#datepicker-end", {
    dateFormat: "Y-m-d",
    allowInput: true,
    locale: "pt"
});
document.querySelector('#datepicker-end').addEventListener('keydown', (e) => {
    e.preventDefault();
    document.querySelector('#datepicker-end')._flatpickr.open();
});

document.querySelector('#btn-search-by-period').addEventListener('click', async () => {

    document.querySelector('.nothing-found').classList.remove('d-flex');
    document.querySelector('.nothing-found').classList.add('d-none');

    let initial_date = document.querySelector('#datepicker-begin').value;
    let ending_date = document.querySelector('#datepicker-end').value;

    if (initial_date === '' || ending_date === '') {
        return
    }


    let obj = {
        initial_date: initial_date,
        ending_date: ending_date
    }

    try {



        let data = JSON.parse(await window.electronAPI.search_by_period(obj))//Maybe rename to calendar_search



        if (data.length === 0) {
            clear_results(true);
            document.querySelector('.nothing-found').classList.remove('d-none');
            document.querySelector('.nothing-found').classList.add('d-flex');


            document.querySelector('#datepicker-begin').value = ''
            document.querySelector('#datepicker-end').value = ''

            setTimeout(() => {
                list_users(null);
            }, 2000)
            return;
        }

        document.querySelector('.nothing-found').classList.remove('d-flex');
        document.querySelector('.nothing-found').classList.add('d-none');

        //Cleans of input date picker
        document.querySelector('#datepicker-begin').value = ''
        document.querySelector('#datepicker-end').value = ''

        list_users(data);


    } catch (error) {
        console.log(error);
    }




})

//=====================================================================================








//INPUT SEARCH BY CALENDAR (DATEPICKER)
flatpickr("#input-datepicker", {
    dateFormat: "Y-m-d",
    allowInput: true,
    locale: "pt"
});
document.querySelector('#input-datepicker').addEventListener('keydown', (e) => {
    e.preventDefault();
    document.querySelector('#input-datepicker')._flatpickr.open();
});

document.querySelector('#search').addEventListener('click', async () => {


    document.querySelector('.nothing-found').classList.remove('d-flex');
    document.querySelector('.nothing-found').classList.add('d-none');

    let input_datepicker = document.querySelector('#input-datepicker').value

    if (input_datepicker === '') {
        return
    }

    let [year, month, day] = input_datepicker.split("-");

    try {

        let obj_calendar = {
            day: day,
            month: month,
            year: year,
        }


        let data = await window.electronAPI.search_by_calendar(obj_calendar)//Maybe rename to calendar_search


        if (data.length === 0) {

            clear_results(true);

            document.querySelector('.nothing-found').classList.remove('d-none');
            document.querySelector('.nothing-found').classList.add('d-flex');

            //Cleans off input datepicker
            document.querySelector('#input-datepicker').value = ''

            setTimeout(() => {
                list_users(null);
            }, 2000)

            return;
        }

        document.querySelector('.nothing-found').classList.remove('d-flex');
        document.querySelector('.nothing-found').classList.add('d-none');
        list_users(data);


    } catch (error) {
        console.log(error);
    }


})







//=============== REGISTRATION INTERFACE ================================//
document.querySelector('#btn-register').addEventListener('click', (e) => {
    e.preventDefault();

    //Validação do formulário
    let input_name = document.querySelector('#input-name')
    let input_document = document.querySelector('#input-document')
    let floor_select = document.querySelector('#floor-select')
    let visit_purpose_select = document.querySelector('#visit-purpose-select')


    // Validação do Nome
    if (input_name) {

        if (input_name.value.trim() === '') {
            // hasError = true;
            show_error(input_name, 'Por favor, insira o nome completo.');
        } else {
            remove_error(input_name);
        }
    }

    // Validação do Documento
    if (input_document) {

        if (input_document.value.trim() === '') {
            // hasError = true;
            show_error(input_document, 'Por favor, insira o documento.');
        } else {
            remove_error(input_document);
        }

    }

    // Validação do Andar
    if (floor_select) {
        if (floor_select.value === "0") {
            // hasError = true;
            show_error(floor_select, 'Por favor, selecione um andar.');
        } else {
            remove_error(floor_select);
        }
    }

    // Validação do motivo da visita select
    if (visit_purpose_select) {
        if (visit_purpose_select.value === "0") {
            // hasError = true;
            show_error(visit_purpose_select, 'Por favor, selecione um motivo válido.');
        } else {
            remove_error(visit_purpose_select);
        }
    }




    if (input_name.value && input_document.value != '' && floor_select.selectedIndex && visit_purpose_select.selectedIndex != 0) {


        //Opens swal

        Swal.fire({
            title: 'Cadastrar novo usuário?',
            text: `${input_name.value}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'

        }).then(async (result) => {

            if (result.isConfirmed) {


                //This function creates an object with guest's data and save it in the backend
                //and saves it in the database
                let floor_select = document.querySelector('#floor-select');

                try {

                    const data = {
                        name: input_name.value,
                        visitor_id: input_document.value,
                        visiting_floor: floor_select.options[floor_select.selectedIndex].value,
                        visit_purpose: visit_purpose_select.options[visit_purpose_select.selectedIndex].text
                    }

                    // Await the asynchronous insert_data call
                    await window.electronAPI.insert_data(data);


                } catch (error) {
                    console.log(error);

                } finally {
                    clear_results(null);
                    show_loading_status();

                    //Delays for 500ms to prevent erros when refreshing
                    setTimeout(() => {

                        list_users(null);

                    }, 1000);
                }



                //Cleans up inputs
                document.querySelector('#input-name').value = ''
                document.querySelector('#input-document').value = ''
                // Reset the select elements to their default values
                document.getElementById('floor-select').selectedIndex = 0;
                document.getElementById('visit-purpose-select').selectedIndex = 0;


            } else {
                //Cleans up inputs
                document.querySelector('#input-name').value = ''
                document.querySelector('#input-document').value = ''
                // Reset the select elements to their default values
                document.getElementById('floor-select').selectedIndex = 0;
                document.getElementById('visit-purpose-select').selectedIndex = 0;

            }
        });

    }

})











function start() {

    console.log('app initiated');
    document.querySelector('.nothing-found').classList.add('d-none');
    document.querySelector('.nothing-found').classList.remove('d-flex');

    list_users(null);
    reloadStatistics();

}
start();


let user_information;
let user_id;

async function list_users(data) {

    let results = data;

    clear_results(false);
    remove_loading_statsus();

    //List today's visits
    if (results === null) {

        // Get the current date
        const now = new Date();

        // Extract day, month, and year
        const day = now.getDate(); // 1-31
        const month = now.getMonth() + 1; // 0-11 (Add 1 to get 1-12)
        const year = now.getFullYear(); // YYYY

        // Format day and month with leading zeros if necessary
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        // Prepare the object for searching
        let obj_calendar = {
            day: formattedDay,
            month: formattedMonth,
            year: year,
        };

        try {

            // Call the search function with the current date
            results = await window.electronAPI.search_by_calendar(obj_calendar);


        } catch (error) {
            console.log(error);

        }
    }
    //-------------------------------------------------------



    //Creates list of users within the table
    for (i of results) {

        const row = document.createElement('tr');
        row.classList.add('tr-visit')
        // Convert the ISO date string to a Date object
        const visitor_date = new Date(i.created_at);


        // Format the date in pt-BR format
        const visitor_date_str = visitor_date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        // Format the time in HH:MM:SS format in UTC
        const visitor_time = visitor_date.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' });


        // Add cells to the row for each data field
        let visitor_id = i.visitor.id
        row.setAttribute('data-id', visitor_id)

        row.innerHTML = `
                <td class="px-3">${i.visitor.name}</td>
                <td>${i.visitor.visitor_id}</td>

                <td>${i.visiting_floor}°</td>
                <td>${i.visit_purpose}</td>

                <td>${visitor_date_str}</td>
                <td>${visitor_time}</td>
                
                <td>
             
                    <button  class="btn-register-again btn btn-success border shadowm-sm btn-sm">
                      
                            Ver

                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>

                    </button>

                </td>
            `;

        // Append the row to the table body
        document.getElementById('visitors-table-body').appendChild(row)

        //---------------------------------------------------------------------------


        //Opnes modal with user information
        row.addEventListener('click', async (e) => {

            //Cleans off previous rows from the table
            document.querySelector('#visits-table-body').innerHTML = ''

            document.querySelector('#btn-new-register').classList.remove('d-none')


            document.querySelector('#visits-table').classList.add('d-flex');
            document.querySelector('#visits-table').classList.remove('d-none');


            document.querySelector('#container-form-new-register').classList.add('d-none');
            document.querySelector('#container-form-new-register').classList.remove('d-flex');


            //Search database to retrieve user's information
            user_id = Number(row.getAttribute('data-id'));
            user_information = JSON.parse(await window.electronAPI.find_one(user_id));

            document.querySelector('#td-visitor-name').innerHTML = user_information.name
            document.querySelector('#td-visitor-id').innerHTML = user_information.visitor_id




            //------------------------------------


            let user_visits = user_information.visits;
            user_visits.reverse();

            user_visits.map(visit => {

                let visits_tr = document.createElement('tr')
                visits_tr.setAttribute('style', 'max-height: 400px; overflow-y: scroll; ')
                visits_tr.classList.add('bg-success')

                let valuesArray = Object.values(visit);
                valuesArray = valuesArray.reverse();

                for (let i = 0; i < 3; i++) {

                    if (i === 0) {
                        valuesArray[i] = new Date(valuesArray[i])
                            .toLocaleString('pt-BR', { timeZone: 'UTC' })
                            .replace(' ', ' às ');
                    }

                    if (i === 2) {
                        valuesArray[i] = `${valuesArray[i]}°`
                    }

                    let td = document.createElement('td');

                    td.textContent = valuesArray[i]
                    visits_tr.appendChild(td);
                }

                document.querySelector('#visits-table-body').appendChild(visits_tr);


            })



            //Abrir modal user perfil
            document.querySelector('#btn-launch-modal').click();



        })
    }

}


//Opnes modal for new register
document.querySelector('#btn-new-register')
    .addEventListener('click', (e) => {


        //Hides user information from the modal, allowing for a new register
        e.target.classList.add('d-none');
        let visits_table = document.querySelector('#visits-table')
        visits_table.classList.add('d-none');
        visits_table.classList.remove('d-flex');


        //Fills in input name for new register
        document.querySelector('#input-name-new-register').value = user_information.name
        document.querySelector('#input-document-new-register').value = user_information.visitor_id;

        //Set curent date to new register
        let today = new Date();
        today = today.toISOString().split('T')[0];
        let date_parts = today.split('-');
        date_parts.reverse();
        let formatted_date = `${date_parts[0]}/${date_parts[1]}/${date_parts[2]}`
        document.querySelector('#input-date-new-register').value = formatted_date


        //Shows new register form within the same modal
        let container_form_new_register = document.querySelector('#container-form-new-register')
        container_form_new_register.classList.add('d-flex');
        container_form_new_register.classList.remove('d-none');

    })

//Actual button for submitting a new register
document.querySelector('#btn-new-register-submit').addEventListener('click', (e) => {


    e.preventDefault();


    //Checks if user has selected "floor" and "visit purpose" for new register
    let select_floor_new_register = document.querySelector('#select-floor-new-register');
    let select_visit_purpose_new_register = document.querySelector('#select-visit-purpose-new-register');

    if (select_floor_new_register) {
        if (select_floor_new_register.value === "0") {
            // hasError = true;
            show_error(select_floor_new_register, 'Por favor, selecione um andar.');
        } else {
            remove_error(select_floor_new_register);
        }
    }

    if (select_visit_purpose_new_register) {
        if (select_visit_purpose_new_register.value === "0") {
            // hasError = true;
            show_error(select_visit_purpose_new_register, 'Por favor, selecione um motivo da visita.');
        } else {
            remove_error(select_visit_purpose_new_register);
        }
    }
    //---------------------------------------------------------------------------

    if (select_visit_purpose_new_register.value != 0 && select_floor_new_register.value != 0) {

        Swal.fire({
            title: 'Registrar novamente o usuário?',
            text: "Nome: ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {

            if (result.isConfirmed) {

                let new_register = {
                    user_id: user_id,
                    visiting_floor: Number(select_floor_new_register.value),
                    visit_purpose: Number(select_visit_purpose_new_register.value)
                };


                try {
                    await window.electronAPI.new_visit(new_register)

                } catch (error) {
                    console.log(error);

                } finally {

                    clear_results(null);
                    show_loading_status();

                    //Delays for 500ms to prevent erros when refreshing
                    setTimeout(() => {

                        list_users(null);

                    }, 1000);
                    document.querySelector('.btn-close').click();
                }

            }
        });

    }


    // When the "new register" modal is closed, removes any error the user 
    // might have had in the in the selects
    document.getElementById('modal').addEventListener('hidden.bs.modal', () => {
        remove_error(select_visit_purpose_new_register);
        remove_error(select_floor_new_register);

        select_floor_new_register.value = 0;
        select_visit_purpose_new_register.value = 0;


    });


    //----------------------------------------------------------------------------

})



function show_error(input, message) {

    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.innerHTML = message;

    input.classList.add('is-invalid');

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }

    input.insertAdjacentElement('afterend', errorDiv);
}

function remove_error(input) {


    input.classList.remove('is-invalid');

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }
}



function clear_results(error) {

    //Removes old results

    document.querySelector('#visitors-table-body').innerHTML = '';

    if (error) {//Shows alert "nothing found"

        document.querySelector('.nothing-found').classList.add('d-flex');
        document.querySelector('.nothing-found').classList.remove('d-remove');

    } else {//Removes alert "nothing found"

        document.querySelector('.nothing-found').classList.add('d-none');
        document.querySelector('.nothing-found').classList.remove('d-flex');
    };


}


async function reloadStatistics() {
    let statistic_line = document.querySelectorAll('.statistic_line')

    //Provides animation to statistic screen when succesful registration
    for (let i = 0; i < statistic_line.length; i++) {
        statistic_line[i].style.backgroundColor = 'green'
        setTimeout(() => {
            statistic_line[i].style.backgroundColor = 'transparent'

        }, 1300)
    }
    //----------------------------------------------------------------

    //Today ENTRIES 

    try {
        // Invoke the main process function and get the result directly
        let today_entries = await window.electronAPI.today_visits();

        today_entries = JSON.parse(today_entries);

        if (today_entries != undefined) {

            // Update the DOM with the number of entries
            document.querySelector('#statistic_today').value = `Hoje:  ${today_entries.length}`;
        }
    } catch (error) {
        console.error("Error processing today_entries_call:", error);
    }

    //-------------------------------------------------



    //Month ENTRIES 
    try {

        let month_entries = await window.electronAPI.month_visits();
        // month_entries = JSON.parse(month_entries);

        if (month_entries != undefined) {


            document.querySelector('#statistic_month').value = `Mês: ${month_entries.length}`;
        }

    } catch (error) {
        console.log(error);

    }
    //--------------------------------------------




    //Total ENTRIES
    try {

        let total_entries = await window.electronAPI.all_visits();

        total_entries = JSON.parse(total_entries);


        if (total_entries != undefined) {

            document.querySelector('#statistic_total').value = `Total: ${total_entries.length}`;
        }


    } catch (error) {
        console.log(error);

    }
    //--------------------------------------------

}



function show_loading_status() {
    document.querySelector('#gif-loading-status').classList.remove('d-none');
    document.querySelector('#gif-loading-status').classList.add('d-flex');

}

function remove_loading_statsus() {
    document.querySelector('#gif-loading-status').classList.add('d-none');
    document.querySelector('#gif-loading-status').classList.remove('d-flex');
}