const btn_register = document.querySelector('#btn_cadastrar')

//============== MAIN INTERFACE ==================================//
const main_interface = document.querySelector('.main-interface')

//============== SEARCH INTERFACE VARIABLES ======================//
//'QUICK SEARCH'
const search_by_name = document.querySelector('#pesquisar-por-nome')
const search_by_doc = document.querySelector('#pesquisar-por-documento')
const previous_month = document.querySelector('#anterior')
const next_month = document.querySelector('#proximo')
const dias = document.querySelectorAll('.dia')
const search = document.querySelector('#procurar')
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
var obj_re_entry = {
    data: '',
    hora: '',
    name: '',
    documento: '',
    andar: '',
    tipo_visita: '',
    mes: '',
    dia: ''
}


//=============== SEARCH INTERFACE ================================//
//HTML - 'Quick search'

//Search by name
search_by_name.addEventListener('keydown', (e) => {
    nada_encontrado.style.display = 'none'
    if (e.key == "Backspace") {
        text = ''
        search_by_name.value = ''
        limpaColunas()
    } else {
        text += e.key
        limpaColunas()// cada vez que digitar letra
        search_byName_saveData()
        search_byName_dataReturn()
    }

})


//These two functios are called at the same time above
async function search_byName_saveData() {
    let obj = { name: text }
    window.electronAPI.search_by_name(obj)
}
async function search_byName_dataReturn() {
    window.electronAPI.search_by_name_return((event, data) => {
        returnDataFromMonth(data)
    })
}


//Search by doc
search_by_doc.addEventListener('keydown', (e) => {
    nada_encontrado.style.display = 'none'
    if (e.key == "Backspace") {
        text =
            search_by_doc.value = ''
        limpaColunas()
    } else {
        text += e.key
        limpaColunas()// cada vez que digitar letra
        search_byDoc_saveData()
        search_byDoc_dataReturn()
    }
})
//Sends
async function search_byDoc_saveData() {
    let obj = { documento: text }
    window.electronAPI.search_by_doc(obj)

}
//Returns
async function search_byDoc_dataReturn() {
    window.electronAPI.search_by_doc_return((event, data) => {
        returnDataFromMonth(data)
    })
}


//Date Picker
/*This function inserts the current month in the Date Picker*/
function insertCurrentMonth() {
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
    dp_mes.textContent = month
}
insertCurrentMonth()
// Date picker arrow previus month
previous_month.addEventListener('click', () => {
    if (m == 0) {
        m = m
        dp_mes.textContent = array_meses[m]
    } else {
        m = m - 1
        dp_mes.textContent = array_meses[m]
        mes_value = m
    }
})
// Date picker arrow next month
next_month.addEventListener('click', () => {
    if (m == 11) {
        m = m
        dp_mes.textContent = array_meses[m]
    } else {
        m = m + 1
        dp_mes.textContent = array_meses[m]
        mes_value = m
    }
})
//HTML - 'Search button'
search.addEventListener('click', () => {
    nada_encontrado.style.display = 'none'
    //Janeiro
    if (m == 0) {//Returns choosen day within 'Janeiro' month
         function getJaneiro() {
            window.electronAPI.search_by_month_jan()
            window.electronAPI.search_by_month_jan_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getJaneiro()
        //Fevereiro
    } else if (m == 1) {
         function getFevereiro() {
            window.electronAPI.search_by_month_feb()
            window.electronAPI.search_by_month_feb_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getFevereiro()
        //Março
    } else if (m == 2) {
     function getMarço() {
            window.electronAPI.search_by_month_mar()
            window.electronAPI.search_by_month_mar_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getMarço()
        //Abril 
    } else if (m == 3) {
        function getAbril() {
            window.electronAPI.search_by_month_apr()
            window.electronAPI.search_by_month_apr_return(async (event, data) => {
                if (data) { 
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }

            })
        }
        getAbril()
        //Maio 
    } else if (m == 4) {
         function getMaio() {
            window.electronAPI.search_by_month_may()
            window.electronAPI.search_by_month_may_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getMaio()
        //Junho
    } else if (m == 5) {
         function getJunho() {
            window.electronAPI.search_by_month_jun()
            window.electronAPI.search_by_month_jun_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getJunho()
        //Julho
    } else if (m == 6) {
         function getJulho() {
            window.electronAPI.search_by_month_jul()
            window.electronAPI.search_by_month_jul_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getJulho()
        //Agosto
    } else if (m == 7) {
         function getAgosto() {
            window.electronAPI.search_by_month_ago()
            window.electronAPI.search_by_month_ago_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getAgosto()
        //Setembro
    } else if (m == 8) {
         function getSetembro() {
            window.electronAPI.search_by_month_sep()
            window.electronAPI.search_by_month_sep_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getSetembro()
        //Outubro
    } else if (m == 9) {
         function getOutubro() {
            window.electronAPI.search_by_month_out()
            window.electronAPI.search_by_month_out_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getOutubro()
        //Novembro
    } else if (m == 10) {
         function getNovembro() {
            window.electronAPI.search_by_month_nov()
            window.electronAPI.search_by_month_nov_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getNovembro()
        //Dezembro
    } else if (m == 11) {
         function getDezembro() {
            window.electronAPI.search_by_month_dez()
            window.electronAPI.search_by_month_dez_return(async (event, data) => {
                if (data) {
                    if (dia_selecionado == "all") {
                        returnDataFromMonth(data)
                    } else {
                        const day = data.filter(x => {
                            return x.day == dia_selecionado
                        })
                        returnDataFromDay(day)
                    }
                }
            })
        }
        getDezembro()
    }
})





//================= DATA FROM BACKEND ====================//

//When called, creates table and inserts data within it
//from a single day of the month
function returnDataFromDay(data) {
    limpaColunas()
    if (data.length == 0) {
        nada_encontrado.style.display = 'flex'
    } else {
        for (i of data) {
            const visitante_data = i.visit_date
            const visitante_hora = i.visit_hour
            const visitante_nome = i.name
            const visitante_doc = i.document
            const visitante_andar = i.floor
            const tipoVisita = i.visit_purpose
            row = document.createElement('div')
            row.classList.add('row')
            data_div = document.createElement('div')
            data_div.classList.add('row-col')
            hora_div = document.createElement('div')
            hora_div.classList.add('row-col')
            nome_div = document.createElement('div')
            nome_div.classList.add('row-col')
            doc_div = document.createElement('div')
            doc_div.classList.add('row-col')
            andar_div = document.createElement('div')
            andar_div.classList.add('row-col')
            tipo_visita_div = document.createElement('div')
            tipo_visita_div.classList.add('row-col')
            tipo_visita_div.style.width = '180px'
            cadastrar_novamente = document.createElement('div')
            cadastrar_novamente.textContent = 'NOVO CADASTRO'
            cadastrar_novamente.classList.add('cadastrar-novamente')
            cadastrar_novamente.setAttribute('id', row_id)
            data_div.textContent = visitante_data
            hora_div.textContent = visitante_hora
            nome_div.textContent = visitante_nome
            doc_div.textContent = visitante_doc
            andar_div.textContent = visitante_andar
            tipo_visita_div.textContent = tipoVisita
            row.appendChild(data_div)
            row.appendChild(hora_div)
            row.appendChild(nome_div)
            row.appendChild(doc_div)
            row.appendChild(andar_div)
            row.appendChild(tipo_visita_div)
            row.appendChild(cadastrar_novamente)
            colunas_container.appendChild(row)
            colunas_container.appendChild(row)
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

//When called, creates table and inserts data within it from
//all days of a choosen month
function returnDataFromMonth(data) {
    limpaColunas()
    nada_encontrado.style.display = 'none'
    if (data.length == 0) {
        nada_encontrado.style.display = 'flex'
    } else {
        //Retorna banco completp com todos meses
        for (i of data) {
            row_id++//deletar
            const visitante_data = i.visit_date
            const visitante_hora = i.visit_hour
            const visitante_nome = i.name
            const visitante_doc = i.document
            const visitante_andar = i.floor
            const tipoVisita = i.visit_purpose
            row = document.createElement('div')
            row.classList.add('row')
            data_div = document.createElement('div')
            data_div.classList.add('row-col')
            hora_div = document.createElement('div')
            hora_div.classList.add('row-col')
            nome_div = document.createElement('div')
            nome_div.classList.add('row-col')
            doc_div = document.createElement('div')
            doc_div.classList.add('row-col')
            andar_div = document.createElement('div')
            andar_div.classList.add('row-col')
            tipo_visita_div = document.createElement('div')
            tipo_visita_div.classList.add('row-col')
            tipo_visita_div.style.width = '180px'
            cadastrar_novamente = document.createElement('div')
            cadastrar_novamente.textContent = 'NOVO CADASTRO'
            cadastrar_novamente.classList.add('cadastrar-novamente')
            cadastrar_novamente.setAttribute('id', row_id)
            data_div.textContent = visitante_data
            hora_div.textContent = visitante_hora
            nome_div.textContent = visitante_nome
            doc_div.textContent = visitante_doc
            andar_div.textContent = visitante_andar
            tipo_visita_div.textContent = tipoVisita
            row.appendChild(data_div)
            row.appendChild(hora_div)
            row.appendChild(nome_div)
            row.appendChild(doc_div)
            row.appendChild(andar_div)
            row.appendChild(tipo_visita_div)
            row.appendChild(cadastrar_novamente)
            colunas_container.appendChild(row)
            limpa_colunas_control = false
        }
        //Re entry of some chosen guest
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
                re_pop_up_confirmation.classList.remove('confirm-re-registration-screen')
                re_pop_up_confirmation.classList.add('confirm-re-registration-screen-on')
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0

            })
        }
    }
}





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

 






