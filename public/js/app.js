//////////////////////////////////////////////////////////////////////////
//Konsolenaufrufe: verarbeite Daten von HTTP-Abfragen in JavaScript


// Funktion fetch holt Daten von einer HTTP-Seite
/** then: wenn der fetch-Befehl ausgeführt wurde, wird die Funktion then ausgeführt. Die Funktion then benutzt die Daten
 * von fetch und verarbeitet sie. */
fetch('http://puzzle.mead.io/puzzle').then( (response)=>{
    // die Antwort wird zu JSON umgewandelt, dann wird damit eine Funktion ausgeführt
    response.json().then( (_data)=>{
        console.log(_data)
    })
})



//////////////////////////////////////////////////////////////////////////
// document.querySelector verwandelt das HTML-Element "form" in eine JavaScript-Variable, die wir fortan ansprechen können
const weatherForm = document.querySelector('form')
// suchEingabe ist der String, den der Benutzer in das Feld "form" eingibt
const suchEingabe = document.querySelector('input')
// messageOne ist das HTML-Element mit der ID "message-1" (mit # werden IDs von HTML-Elementen bezeichnet)
const messageOne = document.querySelector('#message-1')
// messageTwo ist das HTML-Element mit der ID "message-2" (mit # werden IDs von HTML-Elementen bezeichnet)
const messageTwo = document.querySelector('#message-2')

// in den Paragraph "messageOne" kommt ein bestimmter Text
messageOne.textContent = 'From JavaScript'



// ein Listener wird dem Button hinzugefügt. Wenn der Button angeklickt wird (Event = "submit"), wird die Funktion ausgelöst
weatherForm.addEventListener('submit', (event)=>{
    // verhindere, dass sich die Webseite nach dem Klicken sofort wieder neu lädt, das ist das Default behavior
    event.preventDefault()
    
    messageOne.textContent = 'Lade ...'
    messageTwo.textContent = ''

    const location = suchEingabe.value
    const abfrageUrl = '/weather?address=' + location
    
    fetch(abfrageUrl).then( (_response)=>{
        _response.json().then( (_data)=>{
            if (_data.error){
                messageOne.textContent = _data.error
            }
            else{
                messageOne.textContent = _data.location
                messageTwo.textContent = _data.forecast
            }
        })
    })



})