const pokemonList = document.getElementById('pokemonList')
const loadmoreButton = document.getElementById('loadMore')
const maxRecord = 151
const limit = 9
let offset = 0


const pokemonArray = [];


function loadPokemonItens(offset , limit ){
    function convertPokemonToLi(pokemon){
        return `
         <li class="pokemon ${pokemon.type}" onclick="pokeBox(${pokemon.number})">
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
        pokemonArray.push(...pokemons);
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

function pokeInfo(pokemon) {
    return `
             <div class="img-header">
            <img src="${pokemon.photo}" alt="bulba"
                class="img-box">
                
        <div class="info">
            <div class="btn-fechar">
                <button class="fechar" id="fechar">X</button>
            </div>

            <section class="poke-section">

                <header class="section-header">
                    <h1>Sobre</h1>
                </header>
                <div class="information-block">
                    <div class="infos">
                        <span class="info-tag">Species</span>
                        <span class="info-tag">Height</span>
                        <span class="info-tag">Weight</span>
                        <span class="info-tag">Abilities</span>
                    </div>
                    <div class="species-info">
                        <span class="species-tag">${pokemon.species}</span>
                        <span class="species-tag">${pokemon.height} decimetres</span>
                        <span class="species-tag">${pokemon.weight} hectograms</span>
                        <span class="species-tag">${pokemon.abilities.join(', ')}</span>
                    </div>
                </div>
            </section>
        </div>
    `
}


function pokeBox(pokemonNumber){
    const pokemon = pokemonArray.find(p => p.number === pokemonNumber);
    const modal = document.getElementById("janela-id")
    modal.classList.add('abrir')


    console.log(pokemon)
    modal.addEventListener('click', (e) =>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-info'){
            modal.classList.remove('abrir')
        }

    
    
         


    })
        
    modal.innerHTML = pokeInfo(pokemon);
    console.log(pokeInfo(pokemon))
     
}
