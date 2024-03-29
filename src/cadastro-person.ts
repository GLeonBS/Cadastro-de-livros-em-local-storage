import Person, { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const table = document.querySelector('table')!
const filterPersons = document.querySelector<HTMLInputElement>('#filterPerson')!
const form = document.querySelector('form')!
const btnCad = document.querySelector<HTMLButtonElement>("#btnCad")!
const btnClear = document.querySelector<HTMLButtonElement>('#btnClear')!

type ObjectWitchName = { name: string }
const sortName = (a: ObjectWitchName, b: ObjectWitchName) => a.name.localeCompare(b.name)
const persons: Person[] = []
showPersons()


name.focus()

btnCad.addEventListener('click', (e: Event) => {
  e.preventDefault()

  const capitalize = (text: string) => {
    const words = text.split(' ')

    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].substr(0, 1).toUpperCase() +
        words[i].substr(1).toLowerCase()
    }

    return words.join(' ').replace(/ e /gi, ' e ')
      .replace(/ dos /gi, ' dos ')
      .replace(/ do /gi, ' do ')
      .replace(/ de /gi, ' de ')
      .replace(/ da /gi, ' da ')
  }
  const trimAll = (text: string) =>
    text.trim().replace(/\s+/g, ' ')

  const valorNome = capitalize(trimAll(name.value))
  const valorBirth = new Date(birth.value)
  const valorGender = gender.value.trim()


  if (!valorNome) {
    message.innerText = 'Preencha o campo Nome!'
    name.focus()
    return
  } else if (!birth.value) {
    message.innerText = 'Preencha a data de nascimento!'
    birth.focus()
    return
  } else if (!valorGender) {
    message.innerText = 'Preencha o campo sexo!'
    gender.focus()
    return
  }

  const regexNome = /\w+\s\w+/g
  if (!regexNome.test(valorNome)) {
    message.innerText = "Digite seu nome completo!"
    name.focus()
    return
  }
  const dataNascimento = new Date(`${birth.value}T00:00:00`)
  console.log(birth.value)


  if (Date.now() - Number(dataNascimento) < 0) {
    message.innerText = 'Digite uma data de nascimento válida!'
    birth.focus()
    return
  }

  try {
    const person = new Person(
      valorNome,
      valorBirth,
      valorGender === 'f' ? Gender.Female : Gender.Male,
    )

    persons.push(person)
    localStorage.setItem('persons', JSON.stringify(persons))
    showPersons()
  }
  catch (error: any) {
    message.innerText = "Ocorreu algum erro."
    return
  }
  name.value = ''
  birth.value = ''
  gender.value = ''

  message.innerText = 'Cadastrado com Sucesso!'
})


function showPersons() {
  if (localStorage.getItem('persons')) {
    const data = JSON.parse(localStorage.getItem('persons')!)

    persons.splice(0)

    for (const item of data) {
      persons.push(new Person(
        item.name,
        item.birth,
        item.gender
      ))
    }
  }

  let aux = [...persons].sort(sortName)
  let lines = ''



  for (const people of aux) {

    lines += `
      <tr>
         <td>${(people as Person).name}</td>
         <td>${(people as Person).birth}</td>
         <td><center>${(people as Person).gender}</center></td>
      </tr>
      `


  }

  table.innerHTML = `
    <thead>
      <tr> 
          <th>Nome:</th>
          <th>Data de Nascimento:</th>
          <th>Genero:</th>
      </tr>
    </thead>
    <tbody>
      ${lines}
    </tbody>
    `

}

filterPersons.addEventListener("keyup", filter)
function filter() {
  if (!filterPersons.value) {
    showPersons()
  } else {
    let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons")!)

    const onlyPersons = (obj: typeof personsLocalStorage[0]) => obj.name.includes(filterPersons.value)

    let filtrar = personsLocalStorage.filter(onlyPersons)
    let lines = ''
    for (const people of filtrar) {
      lines += `
      <tr>
         <td>${(people as Person).name}</td>
         <td>${(people as Person).birth}</td>
         <td><center>${(people as Person).gender}</center></td>
      </tr>
      `


    }

    table.innerHTML = `
    <thead>
      <tr> 
          <th>Nome:</th>
          <th>Data de Nascimento:</th>
          <th>Genero:</th>
      </tr>
    </thead>
    <tbody>
      ${lines}
    </tbody>
    `
  }
}
btnClear.addEventListener('click', (e: Event) => {
  e.preventDefault()
  filterPersons.value = ""
  showPersons()
})






