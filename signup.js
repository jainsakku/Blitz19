(function(){
  var questions = [
    {question:"What's your first name?", type: "text"},
    {question:"What's your last name?", type: "text"},
    {question:"What's your email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"What's your mobile?", pattern: /^\d{10}$/},
    {question:"What's your college?", type: "text"},
    {question:"What's your college ID?", type: "text"},
    {question:"Create your PIN (4 Digits)", type: "password", pattern: /^[1-9]\d{3}$/},
    {question:"Do you need accomodation?(yes/no)", type: "text", pattern: /^yes|no$/i },
    {question:"Are you an MNIT student?(yes/no)", type: "text", pattern: /^yes|no$/i },
  ]

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms
  var position = 0

  putQuestion()
  progressButtonNext.addEventListener('click', validate)
  progressButtonPrev.addEventListener('click', goBack)
  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(e.keyCode == 13) validate()
  })

  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'  
    inputField.focus()
    showCurrent()
  }
  
  function done() {
    register.className = 'close'
    let h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('Thanks for registering, ' + questions[0].value + '!'))
    setTimeout(function() {
      register.parentElement.appendChild(h1)     
      setTimeout(function() {h1.style.opacity = 1}, 50)
    }, eTime)

    let note = document.createElement('h2')
    note.appendChild(document.createTextNode('Please give us a moment to fetch your BlitzID'))
    setTimeout(function() {
      register.parentElement.appendChild(note)     
      setTimeout(function() {note.style.opacity = 1}, 50)
    }, eTime)
    const body = {
      firstName: questions[0].value,
      lastName: questions[1].value,
      email: questions[2].value,
      mob: questions[3].value,
      college: questions[4].value,
      collegeID: questions[5].value,
      PIN: questions[6].value,
      honeypot: document.getElementById("honeypot").value,
      accomodation: questions[7].value,
      isMNIT: questions[8].value
    }
    fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      note.removeChild(note.firstChild)
      if (res.ok) {
        const blitzID = res.data.blitzID
        note.appendChild(document.createTextNode(`Your Blitz ID is 'Blitz@${blitzID}'. Keep Blitzing!!`))
      } else {
        if (res.data.isRegistered) {
          note.appendChild(document.createTextNode(`You have already registered`))
        } else {
          note.appendChild(document.createTextNode(`There was a problem getting your Blitz ID, try registering again`))
        }
      }
    })
    .catch(err => console.error(err))
  }

  function validate() {

    questions[position].value = inputField.value

    if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
    else ok(function() {
      progress.style.width = ++position * 100 / questions.length + 'vw'
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)
              
    })
  }

  function goBack() {
    if (position) {
      progress.style.width = --position * 100 / questions.length + 'vw'
      if (questions[position]) hideCurrent(putQuestion)
    }
  }

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }

  function wrong(callback) {
    register.className = 'wrong'
    for(var i = 0; i < 6; i++) // shaking motion
      setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
    setTimeout(transform, tTime * 6, 0, 0)
    setTimeout(callback,  tTime * 7)
  }

}())