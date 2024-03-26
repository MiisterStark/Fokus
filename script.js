const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startBotão = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const comecarOuPausar = document.querySelector('#start-pause span')
const imagemBotão = document.querySelector('.app__card-primary-butto-icon')
const timer = document.getElementById('timer')
const musica = new Audio('/sons/BrownNoise.mp3')
const start = new Audio('/sons/play.mp3')
const pause = new Audio ('/sons/pause.mp3')
const tempoAcabou = new Audio('/sons/tempoAcabou.mp3')
const startMusica = new Audio('/sons/start.mp3')
const pauseMusica = new Audio('/sons/stop.mp3')
const trocaDeModo = new Audio('/sons/som.mp3')
musica.loop = true
let tempoDecorridoEmSegundos = 5
let intervaloId = null

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 25
   alterarContexto('foco')
   focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 5
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 15
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        startMusica.play()
        musica.play()
    } else {
        pauseMusica.play()
        musica.pause()
    }
})

function alterarContexto(contexto) {
    tempoNaTela()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')})
        trocaDeModo.play()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        default:
            break;
    }
}

function alterarImagem(contexto) {
    imagemBotão.setAttribute('src', `/imagens/${contexto}.png`)
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        tempoAcabou.play()
        const FocoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (FocoAtivo) {
            const evento = new CustomEvent('tarefaFinalizada')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    tempoNaTela()
}

startBotão.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        pausarTempo()
        pause.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    start.play()
    comecarOuPausar.textContent = "Pausar"
    alterarImagem('pause')
}
function pausarTempo () {
    clearInterval(intervaloId)
    intervaloId = null
    comecarOuPausar.textContent = "Começar"
    alterarImagem('play_arrow')
}
function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
    comecarOuPausar.textContent = "Começar"
    alterarImagem('play_arrow')
    const dataContexto = html.getAttribute('data-contexto')
    if (dataContexto == 'foco') {
        tempoDecorridoEmSegundos = 60 * 25
    }

    tempoNaTela()
    }


function tempoNaTela () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString ('pt-Br', {minute:'2-digit', second:'2-digit'})
    timer.innerHTML =`${tempoFormatado}`
}
 
tempoNaTela()