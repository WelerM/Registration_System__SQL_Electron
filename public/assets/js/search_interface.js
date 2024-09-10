
//============== MAIN INTERFACE ==================================//
const main_interface = document.querySelector('.main-interface')

//============== SEARCH INTERFACE VARIABLES ======================//
//'QUICK SEARCH'
const search_by_name = document.querySelector('#pesquisar-por-nome')
const search_by_doc = document.querySelector('#pesquisar-por-documento')
const previous_month = document.querySelector('#anterior')
const next_month = document.querySelector('#proximo')
const dias = document.querySelectorAll('.dia')
const btn_search = document.querySelector('#procurar')
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




//DATE PICKER
//Arrow btn previus month
// previous_month.addEventListener('click', () => {
//     if (m == 0) {
//         m = m
//         //Shows current month on date picker screen
//         dp_mes.textContent = array_meses[m]
//     } else {
//         m = m - 1
//         dp_mes.textContent = array_meses[m]
//         mes_value = m
//     }
// })
// //Arrow btn next month
// next_month.addEventListener('click', () => {
//     if (m == 11) {
//         m = m
//         //Shows current month on date picker screen
//         dp_mes.textContent = array_meses[m]
//     } else {
//         m = m + 1
//         dp_mes.textContent = array_meses[m]
//         mes_value = m
//     }
// })
//Search button
btn_search.addEventListener('click', () => {

    nada_encontrado.style.display = 'none'
    switch (m) {
        case 0:
            prepare_search(array_meses[0], dia_selecionado)
            break
        case 1:
            prepare_search(array_meses[1], dia_selecionado)
            break
        case 2:
            prepare_search(array_meses[2], dia_selecionado)

            break
        case 3:
            prepare_search(array_meses[3], dia_selecionado)

            break
        case 4:
            prepare_search(array_meses[4], dia_selecionado)
            break
        case 5:
            prepare_search(array_meses[5], dia_selecionado)
            break
        case 6:
            prepare_search(array_meses[6], dia_selecionado)
            break
        case 7:
            prepare_search(array_meses[7], dia_selecionado)
            break
        case 8:
            prepare_search(array_meses[8], dia_selecionado)
            break
        case 9:
            prepare_search(array_meses[9], dia_selecionado)
            break
        case 10:
            prepare_search(array_meses[10], dia_selecionado)
            break
        case 11:
            prepare_search(array_meses[11], dia_selecionado)
            break
    }

    function prepare_search(month, dia_selecionado) {
        console.log(dia_selecionado);

        try {

            let obj_calendar = {
                day: dia_selecionado,
                month: month
            }

            window.electronAPI.search_by_month(obj_calendar)//Maybe rename to calendar_search

        } catch (error) {
            console.log(error);

        } finally {

            window.electronAPI.search_by_month_return(async (event, data) => {
                console.log(data);

                if (data) {
                    if (dia_selecionado == "all") {
                        list_users(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        list_users(day)
                    }
                }
            })

        }

    }

})


//================= DATA FROM BACKEND ====================//
//When called, creates table and inserts data within it
//from a single day of the month
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
            `;
        
            // Append the row to the table body
            tableBody.appendChild(row);








            // let visitante_data = new Date(i.created_at);
            // visitante_data = visitante_data.toLocaleDateString('pt-BR');

            // Convert the ISO date string to a Date object
            // let visitante_date = new Date(i.created_at);
            // Extract the hour, minutes, and seconds
            // let visitante_hour = visitante_date.getHours().toString().padStart(2, '0');
            // let visitante_minute = visitante_date.getMinutes().toString().padStart(2, '0');
            // let visitante_second = visitante_date.getSeconds().toString().padStart(2, '0');

            // Combine them into HH:MM:SS format
            // let visitante_time = `${visitante_hour}:${visitante_minute}:${visitante_second}`;

            // let visitante_nome = i.name
            // let visitante_doc = i.visitor_id
            // let visitante_andar = i.visiting_floor
            // let tipoVisita = i.visit_purpose



            // row = document.createElement('div')
            // row.classList.add('row')
            // data_div = document.createElement('div')
            // data_div.classList.add('row-col')
            // hora_div = document.createElement('div')
            // hora_div.classList.add('row-col')
            // nome_div = document.createElement('div')
            // nome_div.classList.add('row-col')
            // doc_div = document.createElement('div')
            // doc_div.classList.add('row-col')
            // andar_div = document.createElement('div')
            // andar_div.classList.add('row-col')
            // tipo_visita_div = document.createElement('div')
            // tipo_visita_div.classList.add('row-col')
            // tipo_visita_div.style.width = '180px'
            // cadastrar_novamente = document.createElement('div')
            // cadastrar_novamente.textContent = 'NOVO CADASTRO'
            // cadastrar_novamente.classList.add('cadastrar-novamente')
            // cadastrar_novamente.setAttribute('id', row_id)
            // data_div.textContent = visitante_data
            // hora_div.textContent = visitante_time
            // nome_div.textContent = visitante_nome
            // doc_div.textContent = visitante_doc
            // andar_div.textContent = visitante_andar
            // tipo_visita_div.textContent = tipoVisita
            // row.appendChild(data_div)
            // row.appendChild(hora_div)
            // row.appendChild(nome_div)
            // row.appendChild(doc_div)
            // row.appendChild(andar_div)
            // row.appendChild(tipo_visita_div)
            // row.appendChild(cadastrar_novamente)
            // colunas_container.appendChild(row)
            // colunas_container.appendChild(row)
            limpa_colunas_control = false
        }

        //Green 'new register' btn on tables for re registration
        let row_total = document.querySelectorAll('.row')
        for (let i = 0; i < row_total.length; i++) {
            row_total[i].addEventListener('click', () => {

                row_array_filter = []
                row_cols_data = []
                row_array_filter.push(row_total[i].childNodes)
                for (data of row_array_filter[0]) {
                    row_cols_data.push(data.innerHTML)
                }
                //fills re registration screen with choosen values
                re_confirm_name.textContent = row_cols_data[2]
                re_confirm_doc.textContent = row_cols_data[3]
                re_confirm_floor.textContent = row_cols_data[4]
                //Shows re registration confirm screen
                re_pop_up_confirmation.classList.remove('confirm-re-registration-screen')
                re_pop_up_confirmation.classList.add('confirm-re-registration-screen-on')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0

            })
        }
    }
}




