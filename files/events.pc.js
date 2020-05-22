import eventScroll from "./events/eventscroll.pc"
import events from "./events.json"

import Dramatics from "./events/Dramatics.pc.html"
import Film from "./events/Film.pc.html"
import Literary from "./events/Literary.pc.html"
import Music from "./events/Music.pc.html"
import Vyaktiva from "./events/Vyaktiva.pc.html"
import FineArts from "./events/FineArts.pc.html"
import EDcell from "./events/EDcell.pc.html"

document.querySelectorAll(".registration__button").forEach(btn => {
  btn.addEventListener("click", function(evt) {
    showModal(
      evt.target.getAttribute("data-name"),
      evt.target.getAttribute("data-society"),
      events[
        evt.target
          .getAttribute("data-society")
          .split(" ")
          .join("")
      ][
        evt.target
          .getAttribute("data-name")
          .split(" ")
          .join("")
      ].isTeam,
      "form"
    )
    setTeam(
      events[
        evt.target
          .getAttribute("data-society")
          .split(" ")
          .join("")
      ][
        evt.target
          .getAttribute("data-name")
          .split(" ")
          .join("")
      ].isTeam
    )
  })
})

let team
function setTeam(isTeamEvent) {
  team = isTeamEvent
}
document.querySelectorAll(".rules__button").forEach(btn => {
  btn.addEventListener("click", function(evt) {
    showModal(
      evt.target.getAttribute("data-name"),
      null,
      evt.target.getAttribute("data-society"),
      "pdf"
    )
  })
})

document.querySelectorAll(".modal__close").forEach(btn => {
  btn.addEventListener("click", closeModal)
})

document.getElementById("modalSubmit").addEventListener("click", submitModal)

function showModal(eventName, society, isTeamEvent, content) {
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
    showFormModal(eventName, isTeamEvent, society)
  } else if (content === "pdf") {
    document.getElementById("modalContainer").classList.remove("modal__form")
    document.getElementById("modalContainer").classList.add("modal__pdf")
    showPdfModal(eventName)
  }
  document.querySelector(".skw-pages").classList.add("blur-back")
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

function showFormModal(eventName, isTeamEvent, society) {
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

  if (isTeamEvent) {
    let teamLeadContent = document.createTextNode("Team Lead:")
    teamLead.appendChild(teamLeadContent)
    muted.appendChild(
      document.createTextNode("Note: All members should have a blitz ID,")
    )
    muted.appendChild(
      document.createTextNode("team registrations will be done on spot.")
    )
    muted.classList.add("muted")

    let teamName = document.createElement("label")
    let teamNameWrapper = document.createElement("p")
    teamNameWrapper.appendChild(document.createTextNode("Team Name "))
    teamName.appendChild(teamNameWrapper)
    let input = document.createElement("input")
    input.required = true
    input.name = "teamName"
    input.placeholder = "Team Awesome"
    teamName.appendChild(input)

    let teamSize = document.createElement("label")
    let teamSizeWrapper = document.createElement("p")
    teamSizeWrapper.appendChild(document.createTextNode("Team Size "))
    teamSize.appendChild(teamSizeWrapper)
    let sizeInput = document.createElement("input")
    sizeInput.type = "number"
    sizeInput.required = true
    sizeInput.name = "teamSize"
    sizeInput.placeholder = "5"
    teamSize.appendChild(sizeInput)

    form.appendChild(teamName)
    form.appendChild(teamSize)
  }

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
  if (team) {
    teamName = form[0].value
    teamSize = form[1].value
    blitzID = form[2].value
    blitzPIN = form[3].value
    _event = form[4].value
    society = form[5].value
  } else {
    blitzID = form[0].value
    blitzPIN = form[1].value
    _event = form[2].value
    society = form[3].value
    teamName = null
    teamSize = null
  }
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
    fetch("/register/events", {
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
  document.querySelector(".skw-pages").classList.remove("blur-back")
  document.querySelector(".modal").classList.remove("submitting-modal")
  // window.location.reload()
}

document.addEventListener("keyup", e => {
  if (e.keyCode === 27) {
    closeModal()
  } else if (e.keyCode === 13) {
    submitModal()
  }
})
