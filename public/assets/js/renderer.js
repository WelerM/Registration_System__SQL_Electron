// SEARCH BY NAME
document.querySelector('#pesquisar-por-nome').addEventListener('input', async (e) => {

    //Erases "search by document" input
    document.querySelector('#pesquisar-por-documento').value = '';

    // Get the current value of the input field
    let inputText = e.target.value.trim();

    //Blocks input if user types number
    if (Number(inputText)) {
        e.target.value = ''
        return
    }

    // If the input is empty, hide any previous error messages and return early
    if (inputText === '') {
        // Clear the result columns
        document.querySelector('.nada-encontrado').classList.add('d-none');
        document.querySelector('.nada-encontrado').classList.remove('d-flex');
        return;
    }

    // Skip handling for non-textual keys like Alt, Tab, Shift, etc.
    if (e.inputType === 'insertFromPaste' || e.inputType === 'deleteContentBackward' || e.inputType.startsWith('delete')) {
        // Handle delete and backspace operations

        document.querySelector('.nada-encontrado').classList.add('d-none');
        document.querySelector('.nada-encontrado').classList.remove('d-flex');
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

            document.querySelector('.nada-encontrado').classList.remove('d-none');
            document.querySelector('.nada-encontrado').classList.add('d-flex');
            return;
        }


        // Check if any results were found
        if (data.length === 0) {
            // Show "nothing found" message
            document.querySelector('.nada-encontrado').classList.remove('d-none');
            document.querySelector('.nada-encontrado').classList.add('d-flex');
            return;
        }

        // Call function to list users if results are found
        list_users(data);


    } catch (error) {
        limpaColunas();
        console.error('Error fetching search results:', error);

        // Optionally show a user-friendly message for errors
        document.querySelector('.nada-encontrado').classList.remove('d-none');
        document.querySelector('.nada-encontrado').classList.add('d-flex');
    }
});


// SEARCH BY DOCUMENT
document.querySelector('#pesquisar-por-documento').addEventListener('input', async (e) => {

    //Erases "search by name" input
    document.querySelector('#pesquisar-por-nome').value = ''

    // Get the current value of the input field
    let input_number = e.target.value.trim();


    // Blocks input if user doesn't type number
    if (!Number(input_number)) {
        document.querySelector('.nada-encontrado').classList.remove('d-flex');
        document.querySelector('.nada-encontrado').classList.add('d-none');
        e.target.value = ''
        return
    }

    // If the input is empty, hide any previous error messages and return early
    if (input_number === '') {

        document.querySelector('.nada-encontrado').classList.add('d-flex');
        document.querySelector('.nada-encontrado').classList.remove('d-none');
        return;
    }

    // Skip handling for non-textual keys like Alt, Tab, Shift, etc.
    if (e.inputType === 'insertFromPaste' || e.inputType === 'deleteContentBackward' || e.inputType.startsWith('delete')) {
        // Handle delete and backspace operations

        document.querySelector('.nada-encontrado').classList.add('d-flex');
        document.querySelector('.nada-encontrado').classList.remove('d-remove');
    }

    // Ensure input is a valid number
    if (isNaN(input_number)) {

        document.querySelector('.nada-encontrado').classList.add('d-flex');
        document.querySelector('.nada-encontrado').classList.remove('d-none');
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
            document.querySelector('.nada-encontrado').classList.remove('d-flex');
            document.querySelector('.nada-encontrado').classList.add('d-none');
            return;
        }


        // Check if any results were found
        if (data.length === 0) {
            document.querySelector('.nada-encontrado').classList.remove('d-flex');
            document.querySelector('.nada-encontrado').classList.add('d-none');
            return;
        }

        // Call function to list users if results are found
        list_users(data);

    } catch (error) {
        console.error('Error fetching search results:', error);
        limpaColunas();
        // Optionally show a user-friendly message for errors
        document.querySelector('.nada-encontrado').classList.remove('d-none');
        document.querySelector('.nada-encontrado').classList.add('d-flex');
    }
});



//SEARCH BY CALENDAR
document.querySelector('#procurar').addEventListener('click', async () => {


    document.querySelector('.nada-encontrado').classList.remove('d-flex');
    document.querySelector('.nada-encontrado').classList.add('d-none');

    let input_datepicker = document.querySelector('#input-datepicker').value
    let [year, month, day] = input_datepicker.split("-");

    try {

        let obj_calendar = {
            day: day,
            month: month,
            year: year,
        }


        let data = await window.electronAPI.search_by_calendar(obj_calendar)//Maybe rename to calendar_search


        if (data.length === 0) {
            document.querySelector('.nada-encontrado').classList.remove('d-none');
            document.querySelector('.nada-encontrado').classList.add('d-flex');
            return;
        }

        document.querySelector('.nada-encontrado').classList.remove('d-flex');
        document.querySelector('.nada-encontrado').classList.add('d-none');
        list_users(data);


    } catch (error) {
        console.log(error);
    }


})


//=============== REGISTRATION INTERFACE ================================//
document.querySelector('#btn_cadastrar').addEventListener('click', (e) => {
    e.preventDefault();

    //Validação do formulário
    let input_nome = document.querySelector('#input-nome')
    let input_documento = document.querySelector('#input-documento')
    let andar_select = document.querySelector('#andar-select')
    let motivo_visita_select = document.querySelector('#motivo-visita-select')


    // Validação do Nome
    if (input_nome) {

        if (input_nome.value.trim() === '') {
            // hasError = true;
            showError(input_nome, 'Por favor, insira o nome completo.');
        } else {
            removeError(input_nome);
        }
    }
    // Validação do Documento
    if (input_documento) {

        if (input_documento.value.trim() === '') {
            // hasError = true;
            showError(input_documento, 'Por favor, insira o documento.');
        } else {
            removeError(input_documento);
        }

    }

    // Validação do Andar
    if (andar_select) {
        if (andar_select.value === "0") {
            // hasError = true;
            showError(andar_select, 'Por favor, selecione um andar.');
        } else {
            removeError(andar_select);
        }
    }

    // Validação do motivo da visita select
    if (motivo_visita_select) {
        if (motivo_visita_select.value === "0") {
            // hasError = true;
            showError(motivo_visita_select, 'Por favor, selecione um motivo válido.');
        } else {
            removeError(motivo_visita_select);
        }
    }


    if (input_nome.value && input_documento.value != '' && andar_select.selectedIndex && motivo_visita_select.selectedIndex != 0) {


        //Opens swal

        Swal.fire({
            title: 'Cadastrar novo usuário?',
            text: `${input_nome.value}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'

        }).then(async (result) => {

            if (result.isConfirmed) {


                //This function creates an object with guest's data and save it in the backend
                //and saves it in the database
                let andar_select = document.querySelector('#andar-select');

                try {

                    const data = {
                        name: input_nome.value,
                        visitor_id: input_documento.value,
                        visiting_floor: andar_select.options[andar_select.selectedIndex].value,
                        visit_purpose: motivo_visita_select.options[motivo_visita_select.selectedIndex].text
                    }

                    // Await the asynchronous insert_data call
                    await window.electronAPI.insert_data(data);


                } catch (error) {
                    console.log(error);

                } finally {
                    start();
                }



                //Cleans up inputs
                document.querySelector('#input-nome').value = ''
                document.querySelector('#input-documento').value = ''
                // Reset the select elements to their default values
                document.getElementById('andar-select').selectedIndex = 0;
                document.getElementById('motivo-visita-select').selectedIndex = 0;


            } else {
                //Cleans up inputs
                document.querySelector('#input-nome').value = ''
                document.querySelector('#input-documento').value = ''
                // Reset the select elements to their default values
                document.getElementById('andar-select').selectedIndex = 0;
                document.getElementById('motivo-visita-select').selectedIndex = 0;

            }
        });

    }

})









function showError(input, message) {

    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.innerHTML = message;

    input.classList.add('is-invalid');

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }

    input.insertAdjacentElement('afterend', errorDiv);
}

function removeError(input) {


    input.classList.remove('is-invalid');

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }
}



function start() {
    console.log('app initiated');
    document.querySelector('.nada-encontrado').classList.add('d-none');
    document.querySelector('.nada-encontrado').classList.remove('d-flex');

    list_today_users_initial_load();


    //Set currente date to the calendar input
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.querySelector('#input-datepicker').value = formattedDate;

}
start();




function list_users(data) {


    limpaColunas();

    if (data.length == 0) {
        limpaColunas();
        return;
    }



    // Get the table body element
    const table_body = document.getElementById('visitors-table-body');

    //Creates list of users within the table
    for (i of data) {


        const row = document.createElement('tr');
        // Convert the ISO date string to a Date object
        const visitante_date = new Date(i.created_at);


        // Format the date in pt-BR format
        const visitante_date_str = visitante_date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        // Format the time in HH:MM:SS format in UTC
        const visitante_time = visitante_date.toLocaleTimeString('pt-BR', { hour12: false, timeZone: 'UTC' });


        // Add cells to the row for each data field
        let visitor_id = i.visitor.id
        row.setAttribute('data-id', visitor_id)

        row.innerHTML = `
                <td class="px-3">${i.visitor.name}</td>
                <td>${i.visitor.visitor_id}</td>

                <td>${i.visiting_floor}°</td>
                <td>${i.visit_purpose}</td>

                <td>${visitante_date_str}</td>
                <td>${visitante_time}</td>
                
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
        table_body.appendChild(row)

        limpa_colunas_control = false
        //---------------------------------------------------------------------------



        row.addEventListener('click', async (e) => {


            document.querySelector('#btn-new-register').classList.remove('d-none')

            let user_id = Number(row.getAttribute('data-id'));


            //Search database to retrieve user's information
            let user_information = await window.electronAPI.find_one(user_id);
            user_information = JSON.parse(user_information);

            let visits_table = document.querySelector('#visits-table')
            visits_table.classList.add('d-flex');
            visits_table.classList.remove('d-none');

            let container_form_new_register = document.querySelector('#container-form-new-register')
            container_form_new_register.classList.add('d-none');
            container_form_new_register.classList.remove('d-flex');


            document.querySelector('#td-visitor-name').innerHTML = user_information.name
            document.querySelector('#td-visitor-id').innerHTML = user_information.visitor_id


            let visits_table_body = document.querySelector('#visits-table-body')
            visits_table_body.innerHTML = ''
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

                visits_table_body.appendChild(visits_tr);


            })


            //Abrir modal user perfil
            document.querySelector('#btn-launch-modal').click();


            //Fake button for new register
            document.querySelector('#btn-new-register')
                .addEventListener('click', (e) => {

                    e.target.classList.add('d-none');


                    //Fills in input name for new register
                    document.querySelector('#input-name-new-register').value = user_information.name
                    document.querySelector('#input-document-new-register').value = user_information.visitor_id;

                    //Hides user information from the modal, allowing for a new register
                    let visits_table = document.querySelector('#visits-table')
                    visits_table.classList.add('d-none');
                    visits_table.classList.remove('d-flex');

                    //Shows new register form within the same modal
                    let container_form_new_register = document.querySelector('#container-form-new-register')
                    container_form_new_register.classList.add('d-flex');
                    container_form_new_register.classList.remove('d-none');

                    //Actual button for submitting a new register
                    document.querySelector('#btn-new-register-submit').addEventListener('click', (e) => {
                        e.preventDefault();


                        //Checks if user has selected "floor" and "visit purpose" for new register
                        let select_floor_new_register = document.querySelector('#select-floor-new-register');
                        let select_visit_purpose_new_register = document.querySelector('#select-visit-purpose-new-register');

                        if (select_floor_new_register) {
                            if (select_floor_new_register.value === "0") {
                                // hasError = true;
                                showError(select_floor_new_register, 'Por favor, selecione um andar.');
                            } else {
                                removeError(select_floor_new_register);
                            }
                        }

                        if (select_visit_purpose_new_register) {
                            if (select_visit_purpose_new_register.value === "0") {
                                // hasError = true;
                                showError(select_visit_purpose_new_register, 'Por favor, selecione um motivo da visita.');
                            } else {
                                removeError(select_visit_purpose_new_register);
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

                                    console.log(user_id);

                                    let new_register = {
                                        user_id: user_id,
                                        visiting_floor: Number(select_floor_new_register.value),
                                        visit_purpose: Number(select_visit_purpose_new_register.value)
                                    };


                                    try {
                                        await window.electronAPI.reassign_visitor(new_register)

                                    } catch (error) {
                                        console.log(error);

                                    } finally {
                                        start();

                                        document.querySelector('.btn-close').click();
                                    }

                                }
                            });

                        }



                        // When the "new register" modal is closed, removes any error the user 
                        // might have had in the in the selects
                        document.getElementById('modal').addEventListener('hidden.bs.modal', () => {
                            removeError(select_visit_purpose_new_register);
                            removeError(select_floor_new_register);

                            select_floor_new_register.value = 0;
                            select_visit_purpose_new_register.value = 0;
                        });
                        //----------------------------------------------------------------------------

                    })

                })
        })
    }

}


async function list_todays_visitors() {

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

    console.log(obj_calendar);

    try {

        // Call the search function with the current date
        let data = await window.electronAPI.search_by_calendar(obj_calendar);
        console.log(data);

        // data = JSON.parse(data);

        if (data.length === 0) {

            document.querySelector('.nada-encontrado').classList.remove('d-none');
            document.querySelector('.nada-encontrado').classList.add('d-flex');
            return;
        }

        list_users(data);


    } catch (error) {
        console.log(error);


    }

}



async function list_today_users_initial_load() {




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
        let data = await window.electronAPI.search_by_calendar(obj_calendar);

        list_users(data);

    } catch (error) {
        console.log(error);


    }

}






//================== CLEAN/RESET INTERFACES =================//
//When called, clears cols data so a new search can be done
var limpa_colunas_control = true
function limpaColunas() {
    let colunas_container = document.querySelector('#visitors-table-body')


    if (limpa_colunas_control != true) {
        colunas_container.innerHTML = ''
    }
}




//================== STATISTIC INTERFACE =======================//

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
        let today_entries = await window.electronAPI.today_entries_call();

        if (today_entries != undefined) {

            // Update the DOM with the number of entries
            document.querySelector('#statistic_today').innerHTML = `
                Hoje:  <span class="badge bg-success p-1">${today_entries.length}</span>
              `;
        }
    } catch (error) {
        console.error("Error processing today_entries_call:", error);
    }

    //-------------------------------------------------



    //Month ENTRIES 
    try {

        let month_entries = await window.electronAPI.month_entries_call();

        if (month_entries != undefined) {

            month_entries = JSON.parse(month_entries);

            document.querySelector('#statistic_month').innerHTML = `
                Mês:  <span class="badge  bg-success p-1">${month_entries.length}</span>
                `;
        }

    } catch (error) {
        console.log(error);

    }
    //--------------------------------------------




    //Total ENTRIES
    try {

        let total_entries = await window.electronAPI.all_data_call();
        console.log(total_entries);

        // total_entries = JSON.parse(total_entries);

        if (total_entries != undefined) {

            document.querySelector('#statistic_total').innerHTML = `
                Total:  <span class="badge  bg-success p-1">${total_entries.length}</span>
                `;
        }


    } catch (error) {
        console.log(error);

    }
    //--------------------------------------------

}


