const main_container = document.querySelector('.main-container')
const left_menu = document.querySelector('.left-menu')
const input_nome = document.querySelector('#input-nome')
const input_documento = document.querySelector('#input-documento')
const input_andar = document.querySelector('#input-andar')
const options_container = document.querySelector('.options_container')
const options = document.querySelectorAll('.option')
const selecione_aqui = document.querySelector('.selecione_aqui')
const cadastro_warning = document.querySelector('.cadastro-warning-hide')
 
const pagina_cadastro = document.querySelector('.pagina-cadastro')
const btn_buscar_visitante = document.querySelector('#btn-buscar-visitante')
const icon_buscar_visitante = document.querySelector('.icon-buscar-visitante')
const btn_buscar_visitante_text = document.querySelector('.btn-buscar-visitante-text')
const pop_up_confirmation = document.querySelector('.confirm-registration-screen')
const pop_up_btn_confirm = document.querySelector('#btn-confirmar')
const pop_up_btn_cancel = document.querySelector('#btn-cancelar')
const confirm_name = document.querySelector('#confirm_name')
const confirm_doc = document.querySelector('#confirm_doc')
const confirm_floor = document.querySelector('#confirm_floor')

//STATISTIC INTERFACE variables
const statistic_today = document.querySelector('#statistic_today')
const statistic_month = document.querySelector('#statistic_month')
const statistic_total = document.querySelector('#statistic_total')
const statistic_line = document.querySelectorAll('.statistic_line')

 

//=============== REGISTRATION INTERFACE ================================//

//Clears input values

//If inputs are filled, opens up screen for registration
btn_register.addEventListener('click', () => {
    //Validação do formulário
    if (input_nome.value && input_documento.value && input_andar.value != '') {
        cadastro_warning.classList.remove('cadastro-warning-show')

        //Shows confirm registration screen
        pop_up_confirmation.classList.remove('confirm-registration-screen')
        pop_up_confirmation.classList.add('confirm-registration-screen-on')

        //Adds info to confim registration screen
        confirm_name.textContent = input_nome.value
        confirm_doc.textContent = input_documento.value
        confirm_floor.textContent = input_andar.value
    } else {
        cadastro_warning.classList.add('cadastro-warning-show')
    }

})
//Confirm btn - Triggers 'saveToDataBase' function
pop_up_btn_confirm.addEventListener('click', () => {
    pop_up_confirmation.classList.remove('confirm-registration-screen-on')
    pop_up_confirmation.classList.add('confirm-registration-screen')
    saveToDatabase()
    reloadStatistics()
})

//Cancel btn
pop_up_btn_cancel.addEventListener('click', () => {
    pop_up_confirmation.classList.remove('confirm-registration-screen-on')
    pop_up_confirmation.classList.add('confirm-registration-screen')
})




//HTML - select 'tipo de visita'
options_container.addEventListener('click', ()=>{
    options_container.classList.toggle('options_container-on')
    selecione_aqui.classList.toggle('selecione_aqui-hide')
    for (let i = 0;i< options.length; i++){
        options[i].classList.toggle('option-on')
    }
}) 


var visita_selecionada 
const visit_purpose_promise = new Promise((resolve, reject) =>{
    for (let i = 0;i< options.length; i++){
        options[i].addEventListener('click', (e)=>{
            visita_selecionada = e.target.value
            resolve(visita_selecionada)
        })
    
    }
})


//This function creates an object with guest's data and save it in the backend
//and saves it in the database
async function saveToDatabase() {
    const name = input_nome.value
    const document = input_documento.value
    const floor = input_andar.value

    visit_purpose_promise.then((data) =>{
        visita_selecionada = data
    })

    //Atribui a string do mês para ser salva no banco de dados
    if (date_month == 0) {
        month = "janeiro"
    } else if (date_month == 1) {
        month = "fevereiro"
    } else if (date_month == 2) {
        month = "março"
    } else if (date_month == 3) {
        month = "abril"
    } else if (date_month == 4) {
        month = "maio"
    } else if (date_month == 5) {
        month = "junho"
    } else if (date_month == 6) {
        month = "julho"
    } else if (date_month == 7) {
        month = "agosto"
    } else if (date_month == 8) {
        month = "setembro"
    } else if (date_month == 9) {
        month = 'outubro'
    } else if (date_month == 10) {
        month = "novembro"
    } else if (date_month == 11) {
        month = "dezembro"
    }

    const data = {
        name: name,
        document: document,
        andar: floor,
        visit_type: visita_selecionada,
        date: data_atual,
        hour: hora_atual,
        month: month, 
        day: date_day 
    }

    window.electronAPI.insert_data(data)

    visita_selecionada = ''
    setTimeout(reloadStatistics, 1000)
}

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




//============= REASSIGN GUEST =================================//

//Registrar user again
re_pop_up_btn_confirm.addEventListener('click', () => {
    reAssignGuest()
})
//Cancels re registration
re_pop_up_btn_cancel.addEventListener('click', (e) => {
    re_pop_up_confirmation.classList.remove('confirm-re-registration-screen-on')
    re_pop_up_confirmation.classList.add('confirm-re-registration-screen')
})

// This function register again some user choosen in
// the table. It's useful if someone is already registered
// so they don't need to be registered again step by step
async function reAssignGuest() {
    re_pop_up_confirmation.classList.remove('confirm-re-registration-screen-on')
    re_pop_up_confirmation.classList.add('confirm-re-registration-screen')

    const obj = {
        date: data_atual,
        hour: hora_atual,
        name: row_cols_data[2],
        document: row_cols_data[3],
        andar: row_cols_data[4],
        visit_type: row_cols_data[5],
        month: month,
        day: date_day
    }
    window.electronAPI.reassign_guest(obj)
    setTimeout(reloadStatistics, 1000)
}


