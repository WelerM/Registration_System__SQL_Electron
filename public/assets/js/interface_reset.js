const clear_inputs = document.querySelector('#limpar-dados')
const clean_columns = document.querySelector('#btn_clean_columns')
//================== CLEAN/RESET INTERFACES =================//
//When called, clears cols data so a new search can be done
var limpa_colunas_control = true
function limpaColunas() {
    let colunas_container = document.querySelector('#visitors-table-body')

    if (limpa_colunas_control != true) {
        colunas_container.innerHTML=''
    }
}
  
//This function cleans up previous button clicked
// and restores it to its original style
//const dias = document.querySelectorAll('.dia')
// function clean_backgroundd() {
//     for (i of dias) {
//         i.style.backgroundColor = 'rgba(42, 42, 42, 0.516)'
//         i.style.color = 'white'
//     }
// }

//HTML - This forloop runs through every day buttons
// and controls their style when user clicks over them
// var dia_selecionado = 0
// for (let i = 0; i < dias.length; i++) {
    
//     dias[i].addEventListener('click', (e) => {
//         dia_selecionado = e.target.innerHTML
//         clean_backgroundd()
//         dias[i].style.backgroundColor = 'black'
//         dias[i].style.color = 'gray'
//     })
// }
// btn_search.addEventListener('click', () => {
//     let dias = document.querySelectorAll('.dia')
//     for (let i = 0; i < dias.length; i++) {
//             dias[i].style.backgroundColor = 'rgba(42, 42, 42, 0.516)'
//             dias[i].style.color = 'white'
        
//     } 
// })
 
clean_columns.addEventListener('click', () => {
    limpaColunas()
})

clear_inputs.addEventListener('click', () => {
    input_nome.value = ''
    input_documento.value = ''
    input_andar.value = ''

})




//STATISTIC INTERFACE variables
const statistic_today = document.querySelector('#statistic_today')
const statistic_month = document.querySelector('#statistic_month')
const statistic_total = document.querySelector('#statistic_total')
const statistic_line = document.querySelectorAll('.statistic_line')
//================== STATISTIC INTERFACE =======================//

//HTML - 'Statistics screen'
//Filters and fetches entries of current month in the database
//By sending to the server an object
//that matches what i'm looking for

//Loads statistics in the inicialization
// function loadStatistics() {
//     //Today entries
//     window.electronAPI.today_entries_call({ date: data_atual })
//     window.electronAPI.today_entries_return((event, data) => {
//         statistic_today.innerHTML = data.length
//     })

//     //Month entries
//     window.electronAPI.month_entries_call({ month: array_meses[current_month] })
//     window.electronAPI.month_entries_return((event, data) => {
//         statistic_month.textContent = data.length
//     })

//     //All entries
//     window.electronAPI.all_data_call()
//     window.electronAPI.all_data_return((event, data) => {
//         statistic_total.textContent = data.length
//     })
// }
// loadStatistics()

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
 





//Date Picker
/*This function inserts the current month in the Date Picker*/
// function insertCurrentMonth() {
//     if (date_month == 0) {
//         month = "janeiro"
//     } else if (date_month == 1) {
//         month = "fevereiro"
//     } else if (date_month == 2) {
//         month = "março"
//     } else if (date_month == 3) {
//         month = "abril"
//     } else if (date_month == 4) {
//         month = "maio"
//     } else if (date_month == 5) {
//         month = "junho"
//     } else if (date_month == 6) {
//         month = "julho"
//     } else if (date_month == 7) {
//         month = "agosto"
//     } else if (date_month == 8) {
//         month = "setembro"
//     } else if (date_month == 9) {
//         month = 'outubro'
//     } else if (date_month == 10) {
//         month = "novembro"
//     } else if (date_month == 11) {
//         month = "dezembro"
//     }
//     // dp_mes.textContent = month
// }
// insertCurrentMonth()
