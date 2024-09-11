
//============== MAIN INTERFACE ==================================//
const main_interface = document.querySelector('.main-interface')

//============== SEARCH INTERFACE VARIABLES ======================//
//'QUICK SEARCH'
const search_by_name = document.querySelector('#pesquisar-por-nome')
const search_by_doc = document.querySelector('#pesquisar-por-documento')
const previous_month = document.querySelector('#anterior')
const next_month = document.querySelector('#proximo')
const dias = document.querySelectorAll('.dia')
const nada_encontrado = document.querySelector('.nada-encontrado')
const array_meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

//============== TABLE (COLUMNS & ROWS) VARIABLES ================//
const colunas_container = document.querySelector('.colunas-container')
const col = document.querySelectorAll('#col')
const col_data = document.querySelector('.output-col-data')
const col_hora = document.querySelector('.output-col-hora')
const col_nome = document.querySelector('.output-col-nome')
const col_doc = document.querySelector('.output-col-documento')
const col_andar = document.querySelector('.output-col-andar')
const col_visita = document.querySelector('.output-col-visita')
const col_dia = document.querySelector('.output-col-dia')
const date = new Date()
const date_year = date.getFullYear()
const date_month = date.getMonth()
const date_month_edited = date.getMonth() + 1
const date_day = date.getDate()
const date_hour = date.getHours()
const date_min = date.getMinutes()
const hora_atual = date_hour + ':' + date_min
const data_atual = date_day + '/' + date_month_edited + '/' + date_year
const dp_mes = document.querySelector('#dp_mes')
const re_pop_up_confirmation = document.querySelector('.confirm-re-registration-screen')
const re_confirm_name = document.querySelector('#re_confirm_name')
const re_confirm_doc = document.querySelector('#re_confirm_doc')
const re_confirm_floor = document.querySelector('#re_confirm_floor')
const re_pop_up_btn_confirm = document.querySelector('#re_btn_confirmar')
const re_pop_up_btn_cancel = document.querySelector('#re_btn_cancelar')

var mes_value = date_month_edited
var m = date_month
var current_month = date_month
var text = ''
var month = ''
var x = true
var row_id = 0//deletar
var row_total = ''
var row_array_filter = []
var row_cols_data = []






//=============== SEARCH INTERFACE ================================//
// SEARCH BY NAME
search_by_name.addEventListener('input', (e) => {

    // Get the current value of the input field
    let input_text = search_by_name.value;

    nada_encontrado.style.display = 'none';


    if (e.inputType != 'Alt' && e.inputType != 'Tab') {

        if (e.inputType === "deleteContentBackward") {

            // Backspace was pressed, so just use the current input_text
            limpaColunas();

        } else {

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

    }



});


//SEARCH BY DOC
search_by_doc.addEventListener('keydown', (e) => {
    // Get the current value of the input field
    let input_number = e.key;

    nada_encontrado.style.display = 'none';


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

    nada_encontrado.style.display = 'none'

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


function start() {
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
        window.electronAPI.search_by_calendar(obj_calendar);

    } catch (error) {

    } finally {

        window.electronAPI.search_by_calendar_return(async (event, data) => {
            data = JSON.parse(data);
            list_users(data)
        })
    }
}

// Execute the function
start();



function list_users(data) {
    limpaColunas()

    //Indicates some bug:
    // console.log(data);
    // console.log('=============');


    if (data.length == 0) {
        nada_encontrado.style.display = 'flex'
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
                <td>${i.name}</td>
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

        //Adds green button on each register of the table to registar that recored again.
        document.querySelectorAll('.btn-register-again').forEach(button => {
            button.addEventListener('click', (e) => {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to     revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        // let user_id = e.getAttribute('data-id')

                        let button_element = e.target
                        user_id = button_element.getAttribute('data-id')

                        window.electronAPI.reassign_visitor(user_id)

                        //Refresh list      
                        limpaColunas();


                    }
                });

            })
        })


    }
}