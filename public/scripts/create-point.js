function populateUFs(){
    const ufSelect =  document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
        }
    })
}

populateUFs()


function getCities(event){
    const citySelect =  document.querySelector("[name=city]")
    const stateInput =  document.querySelector("[name=state]")
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
   
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.innerHTML.disabled = true;
        
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option> `
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



    //Items de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    //add or remove class with javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verify selected itens, if exists, catch them
    const alreadySelected = selectedItems.findIndex( item => item == itemId)

    //if already selected, 
    if(alreadySelected >= 0){
        //then remove.
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems

    //if not selected, then add.
    }else{
        selectedItems.push(itemId)
    }

    console.log(selectedItems.sort())

//refresh hidden fields with selected itens
collectedItems.value = selectedItems
}

