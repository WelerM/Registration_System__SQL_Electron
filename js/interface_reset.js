const clear_inputs = document.querySelector('#limpar-dados')
const clean_columns = document.querySelector('#btn_clean_columns')
//================== CLEAN/RESET INTERFACES =================//

//When called, clears cols data so a new search can be done
var limpa_colunas_control = true
function limpaColunas() {
    let row_total = document.querySelectorAll('.row')
    if (limpa_colunas_control != true) {
        for (let i = 0; i < row_total.length; i++) {
            colunas_container.removeChild(row_total[i])
        }
    }
}

//This function cleans up previous button clicked
// and restores it to its original style
//const dias = document.querySelectorAll('.dia')
function clean_backgroundd() {
    for (i of dias) {
        i.style.backgroundColor = 'rgba(42, 42, 42, 0.516)'
        i.style.color = 'white'
    }
}

//HTML - This forloop runs through every day buttons
// and controls their style when user clicks over them
var dia_selecionado = 0
for (let i = 0; i < dias.length; i++) {
    dias[i].addEventListener('click', (e) => {
        dia_selecionado = e.target.innerHTML
        clean_backgroundd()
        dias[i].style.backgroundColor = 'black'
        dias[i].style.color = 'gray'
    })
}

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
function loadStatistics() {
    //Today entries
    window.electronAPI.today_entries_call({ data: data_atual })
    window.electronAPI.today_entries_return((event, data) => {
        statistic_today.innerHTML = data.length
    })

    //Month entries
    window.electronAPI.month_entries_call({ mes: array_meses[current_month] })
    window.electronAPI.month_entries_return((event, data) => {
        statistic_month.textContent = data.length
    })

    //All entries
    window.electronAPI.all_data_call()
    window.electronAPI.all_data_return((event, data) => {
        statistic_total.textContent = data.length
    })
}
loadStatistics()

//Provides animation to statistic screen when succesful registration
function reloadStatistics() {
    for (let i = 0; i < statistic_line.length; i++) {
        statistic_line[i].style.backgroundColor = 'green'
        setTimeout(() => {
            statistic_line[i].style.backgroundColor = 'transparent'
            setTimeout(() => {
                loadStatistics()
            }, 500) 
        }, 1300)
    }
}
 



