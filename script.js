//fetch Função nativa do JavaScript para fazer requisições HTTP (GET, POST, etc.) a servidores e APIs.
//async & await:
//async — declara que a função é assíncrona (pode ter pausas)
//await — pausa a execução da função até que a Promise seja resolvida
//.json() — converte resposta em objeto JavaScript

let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idioma = document.querySelector(".idioma")

async function traduzir() {
    if (!inputTexto.value.trim()) {
        traducaoTexto.textContent = "Digite algo para traduzir"
        return
    }

    traducaoTexto.textContent = "Traduzindo..."
    
    try {
         //monta o endereço da API
        let endereco = "https://api.mymemory.translated.net/get?q="
            + encodeURIComponent(inputTexto.value)
            + "&langpair=pt-BR|"
            + idioma.value

        //faz a requisição e guarda a resposta
        let resposta = await fetch(endereco)

        //verifica se a requisição deu certo
        if (!resposta.ok) {
            throw new Error("Erro na requisição")
        }

        //converte a resposta em JSON (objeto JavaScript)
        //é importante converter para poder acessar os dados
        let dados = await resposta.json()

        //verifica se a API retornou tradução válida
        //200 = sucesso
        //400 = erro do cliente
        //404 = não encontrado
        //500 = erro do servidor
        if (dados.responseStatus === 200 && dados.responseData.translatedText) {
            traducaoTexto.textContent = dados.responseData.translatedText
        } else {
            traducaoTexto.textContent = "Não foi possível traduzir o texto."
        }
    } catch(erro) {
        traducaoTexto.textContent = "Erro de conexão. Verifique sua internet."
        console.error("Erro:", erro)
    }

}


function ouvirVoz() {
    // verifica se o navegador suporta
    if (!window.webkitSpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz. Use o Chrome no desktop.")
        return
    }

    //ferramenta de transcrição de audio
    let voz = window.webkitSpeechRecognition

    let reconhecimento = new voz()

    //configura a ferramenta
    reconhecimento.lang = "pt-BR"

    //avisa o resultado
    reconhecimento.onresult = (evento) => {
        let transcricao = evento.results[0][0].transcript
        inputTexto.value = transcricao
        traduzir()
    }
    reconhecimento.onerror = () => {
        alert("Não consegui ouvir. Tente novamente.")
    }
    reconhecimento.start()
}