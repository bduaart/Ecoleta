function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")
  
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(res => res.json())
      .then(states => {

        for(state of states) {
          ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }
      })
  }
  
  
  populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")
  
    const ufValue = (event.target.value)
  
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text;
  
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
  
      for(city of cities) {
        citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
      }
  
      citySelect.disabled = false
    })
  
  }
  
  
  document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


    // Itens de coleta

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (const item of itemsToCollect){
      item.addEventListener("click", handSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")
    
    let selectedItems = []

    function handSelectedItem(event){
        const itemLi = event.target
      
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id
        
        const alreadySelected = selectedItems.findIndex( item => item == itemId)
        /*const alreadySelected = selectedItems.findIndex(item => {
              const itemFound = item == itemId
              return itemFound  
        })*/

        if(alreadySelected >= 0 ){
          
          const filteredItems = selectedItems.filter (item => item != itemId)
          /*const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
          */ 

        selectedItems = filteredItems
        }
      else {
        selectedItems.push(itemId)

      }

      collectedItems.value = selectedItems
    }

