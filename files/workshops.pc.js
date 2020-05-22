import eventScroll from './events/eventscroll.pc'
// import navbar from './navbar'
import workshops from './workshops.json'

// import Dramatics from './workshops/Dramatics.pc.html'
// import Film from './workshops/Film.pc.html'
// import Literary from './workshops/Literary.pc.html'
// import Music from './workshops/Music.pc.html'
// import Vyaktiva from './workshops/Vyaktiva.pc.html'
import FineArts from '../workshops/FineArts.pc.html'
// import EDcell from './workshops/EDcell.pc.html'

document.querySelectorAll('.registration__button').forEach((btn) => {
    btn.addEventListener('click', function (evt) {
        showModal(evt.target.getAttribute('data-name'), evt.target.getAttribute('data-society'), 'form')
    })
})

document.querySelectorAll('.rules__button').forEach((btn) => {
  btn.addEventListener('click', function (evt) {
      showModal(evt.target.getAttribute('data-name'), evt.target.getAttribute('data-society') ,'pdf')
  })
})

document.querySelectorAll('.modal__close').forEach((btn) => {
  btn.addEventListener('click', closeModal)
})

document.getElementById('modalSubmit').addEventListener('click', () => submitModal())

function showModal (eventName, society, content) {
    let eventNameContainer = document.getElementById('eventNameContainer')
    eventNameContainer.innerHTML = ""
    let title = document.createTextNode(eventName)

    eventNameContainer.appendChild(title)
    if (content === 'form') {
      document.getElementById('modalContainer').classList.remove('modal__pdf')
      document.getElementById('modalContainer').classList.add('modal__form')
      showFormModal(eventName, society)
    } else if (content === 'pdf') {
      document.getElementById('modalContainer').classList.remove('modal__form')
      document.getElementById('modalContainer').classList.add('modal__pdf')
      showPdfModal(eventName)
    }
    document.querySelector('.skw-pages').classList.add('blur-back')
    document.getElementById('modalContainer').classList.add('active')
}

function showPdfModal (eventName) {
  document.querySelector('body').classList.add('pdf-modal')
  const frame = document.getElementById('pdfContainer')
  const srcPrefix = "https://docs.google.com/gview?url=blitzschlag.org/pdf"
  const srcSuffix = "&embedded=true"
  const src = `${srcPrefix}/${eventName.split(" ").join("")}${srcSuffix}`
  frame.src = src
}

function showFormModal (eventName, society) {
  document.querySelector('body').classList.add('form-modal')
  let form = document.getElementById('eventRegistration')
  form.innerHTML = ""

  let blitzIDInput = document.createElement('input')
    blitzIDInput.required = "true"
    blitzIDInput.name = "blitzID"
    blitzIDInput.placeholder = "blitz@1234"
  let blitzID = document.createElement('label')
  let blitzIDContentWrapper = document.createElement('p')
  blitzIDContentWrapper.appendChild(document.createTextNode("Blitz ID "))
  blitzID.appendChild(blitzIDContentWrapper)
  blitzID.appendChild(blitzIDInput)

  let blitzPIN = document.createElement('label')
  let blitzPINContentWrapper = document.createElement('p')
  blitzPINContentWrapper.appendChild(document.createTextNode("PIN "))
  blitzPIN.appendChild(blitzPINContentWrapper)
  let _input = document.createElement('input')
  _input.type = "password"
  _input.required = "true"
  _input.name = "blitzPIN"
  _input.placeholder = "****"
  blitzPIN.appendChild(_input)

  let eventNameField = document.createElement('input')
  eventNameField.hidden = true
  eventNameField.disabled = true
  eventNameField.value = eventName.split(' ').join('')
  eventNameField.name = "event"

  let eventSocietyField = document.createElement('input')
  eventSocietyField.hidden = true
  eventSocietyField.disabled = true
  eventSocietyField.value = society.split(' ').join('')
  eventSocietyField.name = "society"

  form.appendChild(blitzID)
  form.appendChild(blitzPIN)
  form.appendChild(eventNameField)
  form.appendChild(eventSocietyField)
}

function submitModal () {
  let form = document.getElementById('eventRegistration')
  let blitzID = form[0].value
  let blitzPIN = form[1].value
  let _event = form[2].value
  let society = form[3].value
  if(form.reportValidity() && blitzID.match(/^blitz@\d{4,}/im)) {
    const body = {
      blitzID,
      blitzPIN,
      _event,
      society
    }
  console.log(body)
    fetch('/register/workshops', {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      let ContentThanks
      let Contentblitz
      if (res.ok) {
        ContentThanks = document.createTextNode('Thanks for registering for the event!')
        Contentblitz = document.createTextNode("See you soon at BLITZSCHLAG'19!")
      } else {
        ContentThanks = document.createTextNode('There was an error in registration.')
        Contentblitz = document.createTextNode("Please try again after some time")
      }
      let Contentblitzing = document.createTextNode('keep BLITZING!')
      let modalBody = document.querySelector('.modal__body')
      modalBody.innerHTML = ''
      let ContentThanksWrapper = document.createElement('p')
      ContentThanksWrapper.appendChild(ContentThanks)
      let ContentblitzWrapper = document.createElement('p')
      ContentblitzWrapper.appendChild(Contentblitz)
      let ContentblitzingWrapper = document.createElement('p')
      ContentblitzingWrapper.appendChild(Contentblitzing)
      modalBody.appendChild(ContentThanksWrapper)
      modalBody.appendChild(ContentblitzWrapper)
      modalBody.appendChild(ContentblitzingWrapper)

      // closeModal()
    })
  }
}

function closeModal () {
  document.querySelector('body').classList.remove('form-modal')
  document.querySelector('body').classList.remove('pdf-modal')
  document.getElementById('modalContainer').classList.remove('active')
  document.querySelector('.skw-pages').classList.remove('blur-back')
}

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 27) {
    closeModal()
  } else if (e.keyCode === 13) {
    submitModal()
  }
})
