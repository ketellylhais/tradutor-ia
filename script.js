//fetch / ferramenta do js para entrar em contato com um servidor
//async & await, usamos await para a função esperar pela resposta e usamos async para avisar a função que quando executada ela terá que parar por um momento
//json converte para um formato legivel

let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idioma = document.querySelector(".idioma")

async function traduzir(){
    if (!inputTexto.value.trim()) {
        traducaoTexto.textContent = "Digite algo para traduzir"
        return
    }
    let endereco = "https://api.mymemory.translated.net/get?q="
    + inputTexto.value
    + "&langpair=pt-BR|"
    + idioma.value

    let resposta = await fetch(endereco)
    let dados = await resposta.json()

    traducaoTexto.textContent = dados.responseData.translatedText  
}


function ouvirVoz() {
    //ferramenta de transcrição de audio
    let voz = window.webkitSpeechRecognition

    //instacia
    let reconhecimento = new voz()

    //configura a ferramenta
    reconhecimento.lang = "pt-BR"

    //avisa o resultado
    reconhecimento.onresult = (evento) => {
        let transcricao = evento.results[0][0].transcript

        inputTexto.value = transcricao

        traduzir()
    }

    reconhecimento.start()
}