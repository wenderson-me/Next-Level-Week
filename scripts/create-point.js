
function popularUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

popularUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    //enviando nome do estado na url
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpa o campo select e bloqueia o campo city
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}


document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta
//pegar todos os li

const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []


function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id



    // verificar se existe item selecionado, se sim pega os itens selecionados
    const alreadySelected = selectedItems.findIndex((item) => {
      const itemFound = item == itemId  //isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, 
    if (alreadySelected >= 0) {

    // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
          const itemIsDifferent = item != itemId //false
            return itemIsDifferent

        })

        selectedItems = filteredItems

    } else {
    // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }


    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
