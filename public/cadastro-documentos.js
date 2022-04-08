import Book from "./entities/Book.js";
import Periodical from "./entities/Periodical.js";
const selectType = document.querySelector('#tipo');
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const publishedAt = document.querySelector('#publishedAt');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const edition = document.querySelector('#edition');
const volume = document.querySelector('#volume');
const issn = document.querySelector('#issn');
const issue = document.querySelector('#issue');
const message = document.querySelector('#message');
const formulario = document.querySelector('form');
const btn = document.querySelector('#btnDoc');
const titulo = document.querySelector('#titulo');
const table = document.querySelector('table');
const filterBook = document.querySelector('#filterBook');
const filterPer = document.querySelector('#filterPer');
const btnClear = document.querySelector('#limparPesquisa');
const sortTitle = (a, b) => a.title.localeCompare(b.title);
title.focus();
let personsLocalStorage = JSON.parse(localStorage.getItem("persons") || '{}');
let nomes = personsLocalStorage.map(p => p.name);
function carregarAuthor() {
    author.options.length = 0;
    author.add(new Option("Selecione um autor:", ""));
    for (var i = 0; i < nomes.length; i++) {
        author.add(new Option(nomes[i].toString(), i.toString()));
    }
}
selectType.addEventListener('change', (event) => {
    // fazer if se seleção igual a book (aparecer campos da class)
    if (selectType.value == "l") {
        titulo.innerText = "Cadastro de Livros:";
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        isbn.style.display = "block";
        edition.style.display = "block";
        volume.style.display = "block";
        issue.style.display = "none";
        issn.style.display = "none";
        btn.style.display = "block";
        message.innerText = 'Pesquise um livro já cadastrado:';
        table.style.display = "block";
        filterBook.style.display = 'block';
        filterPer.style.display = "none";
        btnClear.style.display = "block";
        carregarAuthor();
        showBooks();
    }
    else if (selectType.value == "p") {
        titulo.innerText = "Cadastro de Periódicos:";
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        issue.style.display = "block";
        issn.style.display = "block";
        volume.style.display = "block";
        isbn.style.display = "none";
        edition.style.display = "none";
        btn.style.display = "block";
        message.innerText = 'Pesquise um periódico já cadastrado:';
        filterPer.style.display = 'block';
        carregarAuthor();
        table.style.display = "block";
        filterBook.style.display = "none";
        btnClear.style.display = "block";
        showPeriodical();
    }
    else {
        titulo.innerText = "O que você deseja cadastrar?";
        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edition.style.display = "none";
        message.innerText = 'Cadastre ou pesquise um livro ou periódico aqui!';
        btn.style.display = "none";
        table.style.display = "none";
        filterBook.style.display = "none";
        filterPer.style.display = "none";
        btnClear.style.display = "none";
        carregarAuthor();
    }
});
const books = [];
const periodicos = [];
showBooks();
showPeriodical();
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const capitalize = (text) => {
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] =
                words[i].substr(0, 1).toUpperCase() +
                    words[i].substr(1).toLowerCase();
        }
        return words.join(' ').replace(/ e /gi, ' e ')
            .replace(/ dos /gi, ' dos ')
            .replace(/ das /gi, ' das ')
            .replace(/ do /gi, ' do ')
            .replace(/ de /gi, ' de ')
            .replace(/ da /gi, ' da ')
            .replace(/ a /gi, ' a ')
            .replace(/ o /gi, ' o ')
            .replace(/ no /gi, ' no ')
            .replace(/ nos /gi, ' nos ')
            .replace(/ nas /gi, ' nas ')
            .replace(/ na /gi, ' na ');
    };
    const trimAll = (text) => text.trim().replace(/\s+/g, ' ');
    var indice = author.value;
    let person = personsLocalStorage[parseInt(indice)];
    const dataPub = new Date(publishedAt.value.trim());
    const valorAuthor = author.value.trim();
    if (!title.value.trim()) {
        message.innerText = 'Insira um título!';
        title.focus();
        return;
    }
    else if (!selectType.value.trim()) {
        message.innerText = 'Escolha um campo!';
        subtitle.focus();
        return;
    }
    else if (!subtitle.value.trim()) {
        message.innerText = 'Insira um subtítulo!';
        subtitle.focus();
        return;
    }
    else if (!dataPub) {
        message.innerText = 'Insira uma data de publicação!';
        publishedAt.focus();
        return;
    }
    else if (!valorAuthor) {
        message.innerText = 'Insira um autor!';
        author.focus();
        return;
    }
    else if (!volume.value.trim()) {
        message.innerText = 'Insira um volume!';
        volume.focus();
        return;
    }
    else if (isNaN(parseInt(volume.value))) {
        message.innerText = 'Insira um número no campo de volume!';
        volume.focus();
        return;
    }
    else if (selectType.value == "l") {
        if (!isbn.value.trim()) {
            message.innerText = 'Insira um número isbn!';
            isbn.focus();
            return;
        }
        else if (isNaN(parseInt(isbn.value))) {
            message.innerText = 'Insira um número no campo de isbn!';
            isbn.focus();
            return;
        }
        else if (!edition.value.trim()) {
            message.innerText = 'Insira um número de edição!';
            edition.focus();
            return;
        }
        else if (isNaN(parseInt(edition.value))) {
            message.innerText = 'Insira um número no campo da edição!';
            edition.focus();
            return;
        }
    }
    else if (selectType.value == "p") {
        if (!issn.value.trim()) {
            message.innerText = 'Insira um número de issn!';
            issn.focus();
            return;
        }
        else if (isNaN(parseInt(issn.value))) {
            message.innerText = 'Insira um número no campo issn!';
            volume.focus();
            return;
        }
        else if (!issue.value.trim()) {
            message.innerText = 'Insira um número de issue!';
            issue.focus();
            return;
        }
        else if (isNaN(parseInt(issue.value))) {
            message.innerText = 'Insira um número no campo issue!';
            volume.focus();
            return;
        }
    }
    if (selectType.value == 'l') {
        try {
            const isbnNumb = parseInt(isbn.value);
            const editionNumb = parseInt(edition.value);
            const volumeNumb = parseInt(volume.value);
            const livro = new Book(isbnNumb, editionNumb, volumeNumb, capitalize(trimAll(title.value)), subtitle.value, dataPub, person);
            books.push(livro);
            localStorage.setItem('books', JSON.stringify(books));
            showBooks();
            isbn.value = "";
            edition.value = "";
            volume.value = "";
            title.value = "";
            subtitle.value = "";
            publishedAt.value = "";
            author.value = "";
            message.innerText = "Livro cadastrado com sucesso!";
            return;
        }
        catch (_a) {
            message.innerText = 'Error';
            return;
        }
    }
    else if (selectType.value == 'p') {
        try {
            const issnNumb = parseInt(isbn.value);
            const issueNumb = parseInt(edition.value);
            const volumeNumb = parseInt(volume.value);
            const periodical = new Periodical(issnNumb, volumeNumb, issueNumb, capitalize(trimAll(title.value)), subtitle.value, dataPub, person);
            periodicos.push(periodical);
            localStorage.setItem('periodicos', JSON.stringify(periodicos));
            showPeriodical();
            message.innerText = "Periódico cadastrado com sucesso!";
            issn.value = "";
            issue.value = "";
            volume.value = "";
            title.value = "";
            subtitle.value = "";
            publishedAt.value = "";
            author.value = "";
            return;
        }
        catch (_b) {
            message.innerText = 'Error';
            return;
        }
    }
});
function showBooks() {
    if (localStorage.getItem('books')) {
        const data = JSON.parse(localStorage.getItem('books'));
        books.splice(0);
        for (const item of data) {
            books.push(new Book(item.isbn, item.edition, item.volume, item.title, item.subtitle, item.publishedAt, item.author));
        }
    }
    if (selectType.value == 'l') {
        let aux = [...books].sort(sortTitle);
        var lines = '';
        for (const titulos of aux) {
            lines += `
        <tr>
           <td>${titulos.title}</td>
           <td>${titulos.subtitle}</td>
           <td>${titulos.volume}</td>
           <td>${titulos.edition}</td>
           <td>${titulos.isbn}</td>
           <td>${titulos.publishedAt}</td>
           <td>${titulos.author.name}</td>
        </tr>
        `;
        }
        table.innerHTML = `
      <thead>
        <tr> 
            <th>Titulo:</th>
            <th>Subtitulo:</th>
            <th>Volume:</th>
            <th>Edição:</th>
            <th>Isbn:</th>
            <th>Data da publicação:</th>
            <th>Autor:</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
      `;
    }
}
function showPeriodical() {
    if (localStorage.getItem('periodicos')) {
        const data = JSON.parse(localStorage.getItem('periodicos'));
        periodicos.splice(0);
        for (const item of data) {
            periodicos.push(new Periodical(item.issn, item.volume, item.issue, item.title, item.subtitle, item.publishedAt, item.author));
        }
    }
    if (selectType.value == 'p') {
        let aux2 = [...periodicos].sort(sortTitle);
        var lines = '';
        for (const titulos of aux2) {
            lines += `
        <tr>
           <td>${titulos.title}</td>
           <td>${titulos.subtitle}</td>
           <td>${titulos.volume}</td>
           <td>${titulos.issn}</td>
           <td>${titulos.issue}</td>
           <td>${titulos.publishedAt}</td>
           <td>${titulos.author.name}</td>
        </tr>
        `;
        }
        table.innerHTML = `
      <thead>
        <tr> 
            <th>Titulo:</th>
            <th>Subtitulo:</th>
            <th>Volume:</th>
            <th>Edição:</th>
            <th>Isbn:</th>
            <th>Data da publicação:</th>
            <th>Autor:</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
      `;
    }
}
filterBook.addEventListener("keyup", filter);
function filter() {
    if (!filterBook.value) {
        showBooks();
    }
    else {
        let personsLocalStorage = JSON.parse(localStorage.getItem("books"));
        const onlyTitle = (obj) => obj.title.includes(filterBook.value);
        let filtrar = personsLocalStorage.filter(onlyTitle);
        let lines = '';
        for (const titulos of filtrar) {
            lines += `
        <tr>
           <td>${titulos.title}</td>
           <td>${titulos.subtitle}</td>
           <td>${titulos.volume}</td>
           <td>${titulos.edition}</td>
           <td>${titulos.isbn}</td>
           <td>${titulos.publishedAt}</td>
           <td>${titulos.author.name}</td>
        </tr>
        `;
        }
        table.innerHTML = `
  <thead>
    <tr> 
        <th>Titulo:</th>
        <th>Subtitulo:</th>
        <th>Volume:</th>
        <th>Edição:</th>
        <th>Isbn:</th>
        <th>Data da publicação:</th>
        <th>Autor:</th>
    </tr>
  </thead>
  <tbody>
    ${lines}
  </tbody>
  `;
    }
}
filterPer.addEventListener("keyup", filter1);
function filter1() {
    if (!filterPer.value) {
        showPeriodical();
    }
    else {
        let personsLocalStorage = JSON.parse(localStorage.getItem("periodicos"));
        const onlyTitle = (obj) => obj.title.includes(filterPer.value);
        let filtrar = personsLocalStorage.filter(onlyTitle);
        let lines = '';
        for (const titulos of filtrar) {
            lines += `
        <tr>
           <td>${titulos.title}</td>
           <td>${titulos.subtitle}</td>
           <td>${titulos.volume}</td>
           <td>${titulos.edition}</td>
           <td>${titulos.isbn}</td>
           <td>${titulos.publishedAt}</td>
           <td>${titulos.author.name}</td>
        </tr>
        `;
        }
        table.innerHTML = `
  <thead>
    <tr> 
        <th>Titulo:</th>
        <th>Subtitulo:</th>
        <th>Volume:</th>
        <th>Edição:</th>
        <th>Isbn:</th>
        <th>Data da publicação:</th>
        <th>Autor:</th>
    </tr>
  </thead>
  <tbody>
    ${lines}
  </tbody>
  `;
    }
}
btnClear.addEventListener('click', (e) => {
    e.preventDefault();
    filterBook.value = "";
    filterPer.value = "";
    if (selectType.value == 'l') {
        showBooks();
    }
    else if (selectType.value == 'p') {
        showPeriodical();
    }
});
