const pokemonList = document.getElementById('pokemonList')
const loadmoreButton = document.getElementById('loadMore')
const maxRecord = 151
const limit = 9
let offset = 0

// armazena informações dos pokemons já carregados na tela 
const pokemonArray = [];


function loadPokemonItens(offset, limit) {
    function convertPokemonToLi(pokemon) {
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

loadmoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadmoreButton.parentElement.removeChild(loadmoreButton)

    } else {

        loadPokemonItens(offset, limit)
    }
})
// retorna html da imagem detalhada dos pokes
function pokeInfo(pokemon) {
    return `
    <div class="fundo">
    <div class="btn-fechar">
    <button class="fechar" id="fechar">X</button>
</div>
    <div class="img-header">
  <img src="${pokemon.photo} " alt="bulba"
      class="img-box ${pokemon.type}">
      
<div class="info">
 

  <section class="poke-section">

      <header class="section-header">
          <h1>Sobre</h1>

          <ol class="types-box">
              ${pokemon.types.map((type) => `<li class="type-box ${type}">${type}</li>`).join('')}
          </ol>

      </header>
      <div class="information-block">
          <div class="infos">
              <span class="info-tag">Espécie</span>
              <span class="info-tag">Altura</span>
              <span class="info-tag">Peso</span>
              <span class="info-tag">Habilidades</span>
          </div>
          <div class="species-info">
              <span class="species-tag">${pokemon.species}</span>
              <span class="species-tag">${pokemon.height} decimetros</span>
              <span class="species-tag">${pokemon.weight} hectogramas</span>
              <span class="species-tag">${pokemon.abilities.join(', ')}</span>
          </div>
      </div>
  </section>
   </div>
    `
}

// abre a janela com informações dos pokes e puxa de acordo a comparação com o array 
function pokeBox(pokemonNumber) {
    const pokemon = pokemonArray.find(p => p.number === pokemonNumber);
    const modal = document.getElementById("janela-id")
    modal.classList.add('abrir')


    
    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-info') {
            modal.classList.remove('abrir')
        }






    })

    modal.innerHTML = pokeInfo(pokemon);


}
