const pokemonList = document.getElementById('pokemonList')
const loadmoreButton = document.getElementById('loadMore')
const maxRecord = 151
const limit = 9
let offset = 0





function loadPokemonItens(offset , limit ){

    function convertPokemonToLi(pokemon){
        return `
         <li class="pokemon ${pokemon.type}">
        <span class="numero">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
    
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    
    </li>`
    }


    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("")

     })
}
loadPokemonItens(offset, limit)
   
loadmoreButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        
        loadmoreButton.parentElement.removeChild(loadmoreButton)
        
    }else{

    loadPokemonItens(offset, limit)
    }
})

