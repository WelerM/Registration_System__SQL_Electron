


const statistic_today = document.querySelector('#statistic_today')
const statistic_month = document.querySelector('#statistic_month')
const statistic_total = document.querySelector('#statistic_total')
const statistic_line = document.querySelectorAll('.statistic_line')

//=============== SEARCH INTERFACE ================================//
// SEARCH BY NAME
document.querySelector('#pesquisar-por-nome').addEventListener('input', (e) => {


    // Get the current value of the input field
    let input_text = document.querySelector('#pesquisar-por-nome').value

    console.log('r');

    //Hides bootstrap alert "Nada encontrado"
    document.querySelector('.nada-encontrado').classList.remove('d-flex');
    document.querySelector('.nada-encontrado').classList.add('d-none');


    if (e.inputType != 'Alt' && e.inputType != 'Tab') {

        if (e.inputType === "deleteContentBackward" && input_text === '') {

            // Backspace was pressed, so just use the current input_text
            limpaColunas();

            return
        }

        // Any other key press should use the current input_text
        try {

            let obj = { name: input_text };

            window.electronAPI.search_by_name(obj);

        } catch (error) {

            console.log(error);

        } finally {

            limpaColunas(); // Clear columns each time a letter is typed

            window.electronAPI.search_by_name_return((event, data) => {


                //Presents result to the user
                data = JSON.parse(data);

                list_users(data)
            })

        }



    }



});


//SEARCH BY DOC
document.querySelector('#pesquisar-por-documento').addEventListener('keydown', (e) => {
    // Get the current value of the input field
    let input_number = e.key;


    document.querySelector('.nada-encontrado').classList.remove('d-flex');
    document.querySelector('.nada-encontrado').classList.add('d-none');

    if (input_number != 'Alt' && input_number != 'Tab') {

        if (e.inputType === "deleteContentBackward") {

            // Backspace was pressed, so just use the current input_text
            limpaColunas();

        } else {



            // Any other key press should use the current input_text
            try {

                let obj = { input_number };

                window.electronAPI.search_by_doc(input_number);

            } catch (error) {

                console.log(error);

            } finally {

                limpaColunas(); // Clear columns each time a letter is typed

                window.electronAPI.search_by_doc_return((event, data) => {

                    //Presents result to the user
                    data = JSON.parse(data);

                    list_users(data)


                })

            }

        }

    }


})


//SEARCH BY CALENDAR
document.querySelector('#procurar').addEventListener('click', () => {


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

        window.electronAPI.search_by_calendar(obj_calendar)//Maybe rename to calendar_search


    } catch (error) {
        console.log(error);

    } finally {

        window.electronAPI.search_by_calendar_return(async (event, data) => {
            //Presents result to the user
            data = JSON.parse(data);
            list_users(data)

        })

    }
})


//=============== REGISTRATION INTERFACE ================================//
document.querySelector('#btn_cadastrar').addEventListener('click', () => {
    //Validação do formulário

    let input_nome = document.querySelector('#input-nome')
    let input_documento = document.querySelector('#input-documento')
    let input_andar = document.querySelector('#input-andar')
    let andar_select =  document.querySelector('#andar-select')



    let hasError = false;

    let alertError = document.querySelector('#alert-register-error')
    alertError.classList.add('d-none');
    alertError.innerHTML = '';


    // Validação do Nome
    if (input_nome) {

        if (input_nome.value.trim() === '') {
            hasError = true;
            showError(input_nome, 'Por favor, insira o nome completo.');
        } else {
            removeError(input_nome);
        }
    }
    // Validação do Nome
    if (input_documento) {

        if (input_documento.value.trim() === '') {
            hasError = true;
            showError(input_documento, 'Por favor, insira o documento.');
        } else {
            removeError(input_documento);
        }

    }

    // Validação do Nome
    if (input_andar) {

        if (input_andar.value.trim() === '') {
            hasError = true;
            showError(input_andar, 'Por favor, insira o documento.');
        } else {
            removeError(input_andar);
        }
    }

    if (andar_select) {
        if (andar_select.value === "0") {
            hasError = true;
            showError(andar_select, 'Por favor, selecione um motivo válido.');
        } else {
            removeError(andar_select);
        }
    }




    if (hasError) {

        alertError.classList.remove('d-none');
        alertError.innerHTML = 'Por favor, corrija os erros antes de continuar.';
    }



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







    if (input_nome.value && input_documento.value && input_andar.value != '') {


        //Shows confirm registration modal screen
        // document.querySelector('.confirm-registration-screen').click();

        //Opens swal

        Swal.fire({
            title: 'Cadastrar novo usuário?',
            text: "You won't be able to     revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'

        }).then((result) => {

            if (result.isConfirmed) {


                //This function creates an object with guest's data and save it in the backend
                //and saves it in the database
                let select = document.querySelector('select');

                (async function () {
                    const data = {
                        name: input_nome.value,
                        visitor_id: input_documento.value,
                        visiting_floor: input_andar.value,
                        visit_purpose: select.options[select.selectedIndex].text
                    }

                    // Await the asynchronous insert_data call
                    await window.electronAPI.insert_data(data);


                    list_todays_visitors();
                    // Reload statistics after data is saved
                    setTimeout(reloadStatistics, 1000);

                })();


                //Cleans up inputs
                document.querySelector('#input-nome').value = ''
                document.querySelector('#input-documento').value = ''
                document.querySelector('#input-andar').value = ''

            } else {
                //Cleans up inputs
                document.querySelector('#input-nome').value = ''
                document.querySelector('#input-documento').value = ''
                document.querySelector('#input-andar').value = ''
            }
        });

    }

})





function start() {
    console.log('app initiated');

    list_todays_visitors();

}
start();


function list_users(data) {
    limpaColunas()

    if (data.length == 0) {

        document.querySelector('.nada-encontrado').classList.remove('d-none');
        document.querySelector('.nada-encontrado').classList.add('d-flex');
    } else {


        // Get the table body element
        const tableBody = document.getElementById('visitors-table-body');

        //Creates list of users within the table
        for (i of data) {


            const row = document.createElement('tr');

            // Convert the ISO date string to a Date object
            const visitante_date = new Date(i.created_at);
            const visitante_date_str = visitante_date.toLocaleDateString('pt-BR');

            // Extract the hour, minutes, and seconds
            const visitante_hour = visitante_date.getHours().toString().padStart(2, '0');
            const visitante_minute = visitante_date.getMinutes().toString().padStart(2, '0');
            const visitante_second = visitante_date.getSeconds().toString().padStart(2, '0');

            // Combine them into HH:MM:SS format
            const visitante_time = `${visitante_hour}:${visitante_minute}:${visitante_second}`;

            // Add cells to the row for each data field
            row.innerHTML = `
                <td class="px-3">${i.name}</td>
                <td>${i.visitor_id}</td>
                <td>${i.visiting_floor}</td>
                <td>${i.visit_purpose}</td>
                <td>${visitante_date_str}</td>
                <td>${visitante_time}</td>
                <td>
             
                    <button data-id="${i.id}" class="btn-register-again btn btn-warning border shadowm-sm btn-sm">
                      
                            Registrar

                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>

                    </button>

                </td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row)

            limpa_colunas_control = false
        }
        //--------------------------------------------------


        //Hnadles warning button ( Registrar ) on each register 
        document.querySelectorAll('.btn-register-again').forEach(button => {

            button.addEventListener('click', (e) => {

                Swal.fire({
                    title: 'Registrar novamente o usuário?',
                    text: "Nome: ",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Cadastrar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {

                    if (result.isConfirmed) {

                        (async function () {

                            let button_element = e.target
                            user_id = button_element.getAttribute('data-id')

                            await window.electronAPI.reassign_visitor(user_id)

                            list_todays_visitors();

                        })();
                    }
                });

            })
        })


    }
}


function list_todays_visitors() {

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

        (async function () {

            // Call the search function with the current date
            await window.electronAPI.search_by_calendar(obj_calendar);
        })();


    } catch (error) {

    } finally {

        window.electronAPI.search_by_calendar_return(async (event, data) => {
            if (!data) {

                document.querySelector('.nada-encontrado').classList.remove('d-none');
                document.querySelector('.nada-encontrado').classList.add('d-flex');
                return
            }


            document.querySelector('.nada-encontrado').classList.remove('d-flex');
            document.querySelector('.nada-encontrado').classList.add('d-none');

            data = JSON.parse(data);
            list_users(data)

            console.log(data);

        })
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








//STATISTIC INTERFACE variables

//================== STATISTIC INTERFACE =======================//

//Provides animation to statistic screen when succesful registration
function reloadStatistics() {
    for (let i = 0; i < statistic_line.length; i++) {
        statistic_line[i].style.backgroundColor = 'green'
        setTimeout(() => {
            statistic_line[i].style.backgroundColor = 'transparent'
            setTimeout(() => {
                // loadStatistics()
            }, 500)
        }, 1300)
    }
}


