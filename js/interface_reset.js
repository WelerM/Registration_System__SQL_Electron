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