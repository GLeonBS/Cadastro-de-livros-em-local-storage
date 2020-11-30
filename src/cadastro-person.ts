import Person, { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const form = document.querySelector('form')!

const persons: Person[] = []
showPersons()

name.focus()

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  const valorNome = name.value.trim()
  const valorBirth = new Date(birth.value.trim())
  const valorGender = gender.value.trim()

  if (!valorNome) {
    message.innerText = 'Preencha o campo Nome!'
    name.focus()
    return
  } else if (!valorBirth) {
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


function showPersons(){
  if(localStorage.getItem('persons')){
    const data = JSON.parse(localStorage.getItem('persons')!)

    persons.splice(0)

    for(const item of data){
      persons.push(new Person(
        item.name,
        item.birth,
        item.gender
      ))
    }
  }
}