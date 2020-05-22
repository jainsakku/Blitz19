import pc from "./workshops.pc.html"
import mob from "./workshops.mob.html"

import fullpage from "../fullpage"
import sixth from './src/images/sixth.jpg'
import iot from './src/images/iot.jpg'
import ml from './src/images/ml.jpg'
import hacking from './src/images/hacking.jpg'
import automobile from './src/images/automobile.jpg'


new fullpage("#content", {
  scrollingSpeed: 500,
  dragAndMove: true,
  scrollHorizontally: true,
  recordHistory: false,
  slidesNavigation: true,
  loopHorizontal: false,
  scrollingSpeed: 475
})

document.querySelectorAll(".register").forEach(btn => {
  btn.addEventListener("click", function(evt) {
    showModal(
      evt.target.getAttribute("data-name"),
      evt.target.getAttribute("data-society"),
      "form"
    )
  })
})



document.querySelectorAll(".modal__close").forEach(btn => {
  btn.addEventListener("click", closeModal)
})

document.getElementById("modalSubmit").addEventListener("click", submitModal)

function showModal(eventName, society, content) {
  let teamLead = document.getElementById("teamLead")
  teamLead.innerHTML = ""
  let muted = document.getElementById("muted")
  muted.innerHTML = ""
  let eventNameContainer = document.getElementById("eventNameContainer")
  eventNameContainer.innerHTML = ""
  let title = document.createTextNode(eventName)
  eventNameContainer.appendChild(title)

  if (content === "form") {
    document.getElementById("modalContainer").classList.remove("modal__pdf")
    document.getElementById("modalContainer").classList.add("modal__form")
    showFormModal(eventName, society)
  } else if (content === "pdf") {
    document.getElementById("modalContainer").classList.remove("modal__form")
    document.getElementById("modalContainer").classList.add("modal__pdf")
    showPdfModal(eventName)
  }
  document.getElementById("content").classList.add("blur-back")
  document.getElementById("modalContainer").classList.add("active")
}

function showPdfModal(eventName) {
  document.querySelector("body").classList.add("pdf-modal")
  const frame = document.getElementById("pdfContainer")
  const srcPrefix = "https://docs.google.com/gview?url=blitzschlag.org/pdf"
  const srcSuffix = "&embedded=true"
  const src = `${srcPrefix}/${eventName.split(" ").join("")}${srcSuffix}`
  console.log(src)
  frame.src = src
}

function showFormModal(eventName, society) {
  document.querySelector("body").classList.add("form-modal")
  let form = document.getElementById("eventRegistration")
  form.innerHTML = ""

  let blitzIDInput = document.createElement("input")
  blitzIDInput.required = "true"
  blitzIDInput.name = "blitzID"
  blitzIDInput.placeholder = "blitzID@1234"
  let blitzID = document.createElement("label")
  let blitzIDContentWrapper = document.createElement("p")
  blitzIDContentWrapper.appendChild(document.createTextNode("Blitz ID "))
  blitzID.appendChild(blitzIDContentWrapper)
  blitzID.appendChild(blitzIDInput)

  let blitzPIN = document.createElement("label")
  let blitzPINContentWrapper = document.createElement("p")
  blitzPINContentWrapper.appendChild(document.createTextNode("PIN "))
  blitzPIN.appendChild(blitzPINContentWrapper)
  let _input = document.createElement("input")
  _input.type = "number"
  _input.required = "true"
  _input.name = "blitzPIN"
  _input.placeholder = "****"
  blitzPIN.appendChild(_input)

  let eventNameField = document.createElement("input")
  eventNameField.hidden = true
  eventNameField.disabled = true
  eventNameField.value = eventName.split(" ").join("")
  eventNameField.name = "event"

  let eventSocietyField = document.createElement("input")
  eventSocietyField.hidden = true
  eventSocietyField.disabled = true
  eventSocietyField.value = society.split(" ").join("")
  eventSocietyField.name = "society"

  form.appendChild(blitzID)
  form.appendChild(blitzPIN)
  form.appendChild(eventNameField)
  form.appendChild(eventSocietyField)
}

function submitModal() {
  let form
  let teamName
  let teamSize
  let blitzID
  let blitzPIN
  let _event
  let society
  form = document.getElementById("eventRegistration")

    blitzID = form[0].value
    blitzPIN = form[1].value
    _event = form[2].value
    society = form[3].value
    teamName = null
    teamSize = null
  console.log(blitzID)
  console.log(blitzPIN)
  console.log(_event)
  console.log(society)
  if (form.reportValidity() && blitzID.match(/^blitz@\d{4,}/im)) {
    form[2].classList.remove("wrong")
    let modal = document.querySelector(".modal")
    modal.classList.add("submitting-modal")
    form.innerHTML = ""
    let wait = document.createElement("p")
    wait.appendChild(
      document.createTextNode("Hold on while we register you for the event")
    )
    form.appendChild(wait)
    const body = {
      blitzID,
      blitzPIN,
      _event,
      society,
      teamName,
      teamSize
    }
    fetch("/register/workshops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => {
      let ContentThanks
      let Contentblitz
      if (res.ok) {
        ContentThanks = document.createTextNode(
          "Thanks for registering for the event!"
        )
        Contentblitz = document.createTextNode(
          "See you soon at BLITZSCHLAG'19!"
        )
      } else {
        ContentThanks = document.createTextNode(
          "There was an error in registration."
        )
        Contentblitz = document.createTextNode("please try again")
      }
      form.innerHTML = ""
      let Contentblitzing = document.createTextNode("keep BLITZING!")
      let ContentThanksWrapper = document.createElement("p")
      ContentThanksWrapper.appendChild(ContentThanks)
      let ContentblitzWrapper = document.createElement("p")
      ContentblitzWrapper.appendChild(Contentblitz)
      let ContentblitzingWrapper = document.createElement("p")
      ContentblitzingWrapper.appendChild(Contentblitzing)
      form.appendChild(ContentThanksWrapper)
      form.appendChild(ContentblitzWrapper)
      form.appendChild(ContentblitzingWrapper)
      window.setTimeout(closeModal, 4000)
    })
  } else {
    form[2].classList.add("wrong")
  }
}

function closeModal() {
  document.querySelector("body").classList.remove("form-modal")
  document.querySelector("body").classList.remove("pdf-modal")
  document.getElementById("modalContainer").classList.remove("active")
  document.getElementById("content").classList.remove("blur-back")
  // modal.classList.remove("submitting-modal")
  window.location.reload()
}

document.addEventListener("keyup", e => {
  if (e.keyCode === 27) {
    closeModal()
  } else if (e.keyCode === 13) {
    submitModal()
  }
})
