const btn_register = document.querySelector('#btn_cadastrar')

//============== MAIN INTERFACE ==================================//
const main_interface = document.querySelector('.main-interface')
const btn_unavailable = document.querySelector('.btn_unavailable')

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

window.electronAPI.search_by_month_jan()
window.electronAPI.search_by_month_feb()
window.electronAPI.search_by_month_mar()
window.electronAPI.search_by_month_apr()
window.electronAPI.search_by_month_may()
window.electronAPI.search_by_month_jun()
window.electronAPI.search_by_month_jul()
window.electronAPI.search_by_month_ago()
window.electronAPI.search_by_month_sep()
window.electronAPI.search_by_month_out()
window.electronAPI.search_by_month_nov()
window.electronAPI.search_by_month_dez()


const jan = window.electronAPI.jan
const fev = window.electronAPI.fev
const mar = window.electronAPI.mar
const apr = window.electronAPI.apr
const jun = window.electronAPI.jun
const jul = window.electronAPI.jul
const ago = window.electronAPI.ago
const set = window.electronAPI.sep
const out = window.electronAPI.out
const nov = window.electronAPI.nov
const dez = window.electronAPI.dez

var jan_data = ''
var feb_data = ''
var mar_data = ''
var apr_data = ''
var may_data = ''
var jun_data = ''
var jul_data = ''
var ago_data = ''
var sep_data = ''
var out_data = ''
var nov_data = ''
var dez_data = ''
var quick_search_name = ''
var quick_search_doc = ''


//=========== QUICK SEARCH
//By name
window.electronAPI.search_by_name_return((event, data) => {
    quick_search_name = data
})

//By doc
window.electronAPI.search_by_doc_return((event, data) => {
    quick_search_doc = data
})


//=========== SEARCH BY DATE
//Jan
window.electronAPI.search_by_month_jan_return((event, data) => {
    if (data) {
        jan_data = data
    }
})

//Feb
window.electronAPI.search_by_month_feb_return((event, data) => {
    if (data) {
        feb_data = data
    }
})

//March
window.electronAPI.search_by_month_mar_return((event, data) => {
    if (data) {
        mar_data = data

    }
})
 
//Apr
window.electronAPI.search_by_month_apr_return((event, data) => {
    if (data) {
        apr_data = data
    }
})

//May
window.electronAPI.search_by_month_may_return((event, data) => {
    if (data) {
        may_data = data
    }
})

//Jun
window.electronAPI.search_by_month_jun_return((event, data) => {
    if (data) {
        jun_data = data
    }
})

//Jul
window.electronAPI.search_by_month_jul_return((event, data) => {
    if (data) {
        jul_data = data
    }
})

//Ago
window.electronAPI.search_by_month_ago_return((event, data) => {
    if (data) {
        ago_data = data
    }
})

//Sep
window.electronAPI.search_by_month_sep_return((event, data) => {
    if (data) {
        sep_data = data
    }
})

//Out
window.electronAPI.search_by_month_out_return((event, data) => {
    if (data) {
        out_data = data
    }
})

//Nov
window.electronAPI.search_by_month_nov_return((event, data) => {
    if (data) {
        nov_data = data
    }
})

//Dez
window.electronAPI.search_by_month_dez_return((event, data) => {
    if (data) {
        dez_data = data
    }
})



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
    returnDataFromMonth(quick_search_name)
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
    returnDataFromMonth(quick_search_doc)
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
        async function getJaneiro() {
            if (dia_selecionado == "todos") {
                limpaColunas()
                window.electronAPI.search_by_month_jan()
                returnDataFromMonth(jan_data)
                //console.log(jan_data);
            } else {
                window.electronAPI.search_by_month_jan()
                const day = jan_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getJaneiro()

        //Fevereiro
    } else if (m == 1) {
        async function getFevereiro() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_feb()
                returnDataFromMonth(feb_data)
            } else {
                window.electronAPI.search_by_month_feb()
                const day = feb_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getFevereiro()
        //Março
    } else if (m == 2) {
        async function getMarço() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_mar()
                returnDataFromMonth(mar_data)
            } else {
                window.electronAPI.search_by_month_mar()
                const day = mar_data.filter(x => {
                    return x.day == dia_selecionado
                })

                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getMarço()
        //Abril
    } else if (m == 3) {
        async function getAbril() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_apr()
                returnDataFromMonth(apr_data)
            } else {
                window.electronAPI.search_by_month_apr()
                const day = apr_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)

            }
        }
        getAbril()
        //Maio
    } else if (m == 4) {
        async function getMaio() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_may()
                returnDataFromMonth(may_data)
            } else {
                window.electronAPI.search_by_month_may()
                const day = may_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)

            }
        }
        getMaio()
        //Junho
    } else if (m == 5) {
        async function getJunho() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_jun()
                returnDataFromMonth(jun_data)
            } else {
                window.electronAPI.search_by_month_jun()
                const day = jun_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getJunho()
        //Julho
    } else if (m == 6) {
        async function getJulho() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_jul()
                returnDataFromMonth(jul_data)
            } else {
                window.electronAPI.search_by_month_jul()
                const day = jul_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getJulho()
        //Agosto
    } else if (m == 7) {
        async function getAgosto() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_ago()
                returnDataFromMonth(ago_data)
            } else {
                window.electronAPI.search_by_month_ago()
                const day = ago_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getAgosto()
        //Setembro
    } else if (m == 8) {
        async function getSetembro() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_sep()
                returnDataFromMonth(sep_data)
            } else {
                window.electronAPI.search_by_month_sep()
                const day = sep_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getSetembro()
        //Outubro
    } else if (m == 9) {
        async function getOutubro() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_out()
                returnDataFromMonth(out_data)
            } else {
                window.electronAPI.search_by_month_out()
                const day = out_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getOutubro()
        //Novembro
    } else if (m == 10) {
        async function getNovembro() {
            if (dia_selecionado == "todos") {
                //Limpa colunas e adiciona novos dados
                limpaColunas()
                window.electronAPI.search_by_month_nov()
                returnDataFromMonth(nov_data)
            } else {
                window.electronAPI.search_by_month_nov()
                const day = nov_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getNovembro()
        //Dezembro
    } else if (m == 11) {
        async function getDezembro() {
            if (dia_selecionado == "todos") {
                limpaColunas()
                window.electronAPI.search_by_month_dez()
                returnDataFromMonth(dez_data)
            } else {
                //Consertar aqui
                window.electronAPI.search_by_month_dez()
                const day = dez_data.filter(x => {
                    return x.day == dia_selecionado
                })
                limpaColunas()
                returnDataFromDay(day)
            }
        }
        getDezembro()
    }
})





//================= DATA FROM BACKEND ====================//

//When called, creates table and inserts data within it
//from a single day of the month
function returnDataFromDay(data) {
    if (data.length == 0) {
        nada_encontrado.style.display = 'flex'
    } else {
        for (i of data) {
            const visitante_data = i.date
            const visitante_hora = i.hour
            const visitante_nome = i.name
            const visitante_doc = i.document
            const visitante_andar = i.andar
            const tipoVisita = i.visit_type
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
    if (data.length == 0) {
        nada_encontrado.style.display = 'flex'
    } else {
        //Retorna banco completp com todos meses
        for (i of data) {
            row_id++//deletar
            const visitante_data = i.date
            const visitante_hora = i.hour
            const visitante_nome = i.name
            const visitante_doc = i.document
            const visitante_andar = i.andar
            const tipoVisita = i.visit_type
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












