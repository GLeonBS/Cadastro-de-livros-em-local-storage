import Book from "./entities/Book.js"
import Periodical from "./entities/Periodical.js"
import Person from "./entities/Person"

const selectType = document.querySelector<HTMLSelectElement>('#tipo')!
const title = document.querySelector<HTMLInputElement>('#title')!
const subtitle = document.querySelector<HTMLInputElement>('#subtitle')!
const publishedAt = document.querySelector<HTMLInputElement>('#publishedAt')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const isbn = document.querySelector<HTMLInputElement>('#isbn')!
const edition = document.querySelector<HTMLInputElement>('#edition')!
const volume = document.querySelector<HTMLInputElement>('#volume')!
const issn = document.querySelector<HTMLInputElement>('#issn')!
const issue = document.querySelector<HTMLInputElement>('#issue')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const formulario = document.querySelector<HTMLFormElement>('form')!
const btn = document.querySelector<HTMLButtonElement>('#btnDoc')!
const titulo = document.querySelector<HTMLTitleElement>('#titulo')!

title.focus()
let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons") || '{}')
let nomes = personsLocalStorage.map(p => p.name)
function carregarAuthor() {
    author.options.length = 0
    author.add(new Option("Selecione um autor:", ""))
    for (var i = 0; i < nomes.length; i++) {
        author.add(new Option(nomes[i].toString(), i.toString()));
    }
}
selectType.addEventListener('change', (event) => {
    // fazer if se seleção igual a book (aparecer campos da class)
    if (selectType.value == "l") {
        titulo.innerText = "Cadastro de Livros:"
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        isbn.style.display = "block";
        edition.style.display = "block";
        volume.style.display = "block";
        issue.style.display = "none";
        issn.style.display = "none";
        btn.style.display = "block"
        message.innerText = 'Insira um subtítulo!'
        message.innerText = 'Cadastrando um livro!'
        carregarAuthor()
    } else if (selectType.value == "p") {
        titulo.innerText = "Cadastro de Periódicos:"
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        issue.style.display = "block";
        issn.style.display = "block";
        volume.style.display = "block";
        isbn.style.display = "none";
        edition.style.display = "none";
        btn.style.display = "block"
        message.innerText = 'Cadastrando um periódico!'
        carregarAuthor()
    } else {
        titulo.innerText = "O que você deseja cadastrar?"
        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edition.style.display = "none";
        message.innerText = 'Cadastre seus livros ou periódicos aqui!'
        btn.style.display = "none"
        carregarAuthor()
    }
});

const books: Book[] = []
const periodicos: Periodical[] = []
showBooks()
showPeriodical()

formulario.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    var indice = author.value
    let person = personsLocalStorage[parseInt(indice)]

    const dataPub = new Date(publishedAt.value.trim())
    const valorAuthor = author.value.trim()


    if (!title.value.trim()) {
        message.innerText = 'Insira um título!'
        title.focus()
        return
    } else if (!selectType.value.trim()) {
        message.innerText = 'Escolha um campo!'
        subtitle.focus()
        return
    } else if (!subtitle.value.trim()) {
        message.innerText = 'Insira um subtítulo!'
        subtitle.focus()
        return
    } else if (!dataPub) {
        message.innerText = 'Insira uma data de publicação!'
        publishedAt.focus()
        return
    } else if (!valorAuthor) {
        message.innerText = 'Insira um autor!'
        author.focus()
        return
    } else if (!volume.value.trim()) {
        message.innerText = 'Insira um volume!'
        volume.focus()
        return
    } else if (isNaN(parseInt(volume.value))) {
        message.innerText = 'Insira um número no campo de volume!'
        volume.focus()
        return
    } else if (selectType.value == "l") {
        if (!isbn.value.trim()) {
            message.innerText = 'Insira um número isbn!'
            isbn.focus()
            return
        } else if (isNaN(parseInt(isbn.value))) {
            message.innerText = 'Insira um número no campo de isbn!'
            isbn.focus()
            return
        } else if (!edition.value.trim()) {
            message.innerText = 'Insira um número de edição!'
            edition.focus()
            return
        } else if (isNaN(parseInt(edition.value))) {
            message.innerText = 'Insira um número no campo da edição!'
            edition.focus()
            return
        }
    } else if (selectType.value == "p") {
        if (!issn.value.trim()) {
            message.innerText = 'Insira um número de issn!'
            issn.focus()
            return
        } else if (isNaN(parseInt(issn.value))) {
            message.innerText = 'Insira um número no campo issn!'
            volume.focus()
            return
        } else if (!issue.value.trim()) {
            message.innerText = 'Insira um número de issue!'
            issue.focus()
            return
        } else if (isNaN(parseInt(issue.value))) {
            message.innerText = 'Insira um número no campo issue!'
            volume.focus()
            return
        }
    }

    if (selectType.value == 'l') {
        try {

            const isbnNumb = parseInt(isbn.value)
            const editionNumb = parseInt(edition.value)
            const volumeNumb = parseInt(volume.value)
            const livro = new Book(isbnNumb, editionNumb, volumeNumb, title.value, subtitle.value, dataPub, person)

            books.push(livro)
            localStorage.setItem('books', JSON.stringify(books))
            showBooks()
            isbn.value = ""
            edition.value = ""
            volume.value = ""
            title.value = ""
            subtitle.value = ""
            publishedAt.value = ""
            author.value = ""
            message.innerText="Livro cadastrado com sucesso!"
            return
        }
        catch {
            message.innerText = 'Error'
            return
        }
    } else if (selectType.value == 'p') {
        try {

            const issnNumb = parseInt(isbn.value)
            const issueNumb = parseInt(edition.value)
            const volumeNumb = parseInt(volume.value)
            const periodical = new Periodical(issnNumb, volumeNumb, issueNumb, title.value, subtitle.value, dataPub, person)

            periodicos.push(periodical)
            localStorage.setItem('periodicos', JSON.stringify(periodicos))
            showPeriodical()
            message.innerText = "Periódico cadastrado com sucesso!"
            issn.value = ""
            issue.value = ""
            volume.value = ""
            title.value = ""
            subtitle.value = ""
            publishedAt.value = ""
            author.value = ""
            return
        }
        catch {
            message.innerText = 'Error'
            return
        }
    }
})

function showBooks() {
    if (localStorage.getItem('books')) {
        const data = JSON.parse(localStorage.getItem('books')!)

        books.splice(0)

        for (const item of data) {
            books.push(new Book(
                item.isbn,
                item.edition,
                item.volume,
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author))
        }
    }
}
function showPeriodical() {
    if (localStorage.getItem('periodicos')) {
        const data = JSON.parse(localStorage.getItem('periodicos')!)

        periodicos.splice(0)

        for (const item of data) {
            periodicos.push(new Periodical(
                item.issn,
                item.volume,
                item.issue,
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author))
        }
    }
}