const main_container = document.querySelector('.main-container')
const left_menu = document.querySelector('.left-menu')
const input_nome = document.querySelector('#input-nome')
const input_documento = document.querySelector('#input-documento')
const input_andar = document.querySelector('#input-andar')

const selecione_aqui = document.querySelector('.selecione_aqui')
const cadastro_warning = document.querySelector('.cadastro-warning-hide')

const pagina_cadastro = document.querySelector('.pagina-cadastro')
const btn_buscar_visitante = document.querySelector('#btn-buscar-visitante')
const icon_buscar_visitante = document.querySelector('.icon-buscar-visitante')
const btn_buscar_visitante_text = document.querySelector('.btn-buscar-visitante-text')
const pop_up_confirmation = document.querySelector('.confirm-registration-screen')

const pop_up_btn_cancel = document.querySelector('#btn-cancelar')
const confirm_name = document.querySelector('#confirm_name')
const confirm_doc = document.querySelector('#confirm_doc')
const confirm_floor = document.querySelector('#confirm_floor')



//=============== REGISTRATION INTERFACE ================================//

//If inputs are filled, opens up screen for registration

document.querySelector('#btn_cadastrar').addEventListener('click', () => {
    //Validação do formulário
    
    if (input_nome.value && input_documento.value && input_andar.value != '') {
        cadastro_warning.classList.remove('cadastro-warning-show')
        console.log('ffsfsd');

        //Shows confirm registration screen

        document.querySelector('.confirm-registration-screen').click();
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
document.querySelector('#btn-confirmar').addEventListener('click', () => {
    // pop_up_confirmation.classList.remove('confirm-registration-screen-on')
    // pop_up_confirmation.classList.add('confirm-registration-screen')
    saveToDatabase()
    reloadStatistics()

    document.querySelector('.btn-close').click();

    //Clean input fields
    document.querySelector('#input-nome').value=''
    document.querySelector('#input-documento').value=''
    document.querySelector('#input-andar').value=''

})






//This function creates an object with guest's data and save it in the backend
//and saves it in the database
const select = document.querySelector('select');
async function saveToDatabase() {
    const name = input_nome.value
    const document = input_documento.value
    const floor = input_andar.value

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

    let visit_selected = select.options[select.selectedIndex].text;

    const data = {
        name: name,
        visitor_id: document,
        visiting_floor: floor,
        visit_purpose: visit_selected,
        date: data_atual,
        hour: hora_atual,
        month: month,
        day: date_day
    }

    window.electronAPI.insert_data(data)

    visita_selecionada = ''
    setTimeout(reloadStatistics, 1000)
}





//============= REASSIGN GUEST =================================//
//Registrar user again
// re_pop_up_btn_confirm.addEventListener('click', () => {
//     reAssignGuest()
// })
//Cancels re registration
// re_pop_up_btn_cancel.addEventListener('click', (e) => {
//     re_pop_up_confirmation.classList.remove('confirm-re-registration-screen-on')
//     re_pop_up_confirmation.classList.add('confirm-re-registration-screen')
// })

// This function register again some user choosen in
// the table. It's useful if someone is already registered
// so they don't need to be registered again step by step
async function reAssignGuest() {
    re_pop_up_confirmation.classList.remove('confirm-re-registration-screen-on')
    re_pop_up_confirmation.classList.add('confirm-re-registration-screen')

    const obj = {
        // date: data_atual,
        // hour: hora_atual,
        name: row_cols_data[2],
        visitor_id: row_cols_data[3],
        visiting_floor: row_cols_data[4],
        visit_purpose: row_cols_data[5],
        month: month,
        day: date_day
    }
    window.electronAPI.reassign_guest(obj)
    setTimeout(reloadStatistics, 1000)
}


