//////////////////////////////////////////////////////////////////
/////////////////////Importe und Konstanten///////////////////////
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//Importe
const path = require('path')
const express = require('express')  //die Express-Library ist eine einzige Funktion
const hbs = require('hbs')
const geocodeJS = require('./utils/geocode')
const forecastJS = require('./utils/forecast')

// console.log(__dirname)  //"__dirname" gibt den Standardpfad wieder, in dem dieses Skript sitzt
// // mit dem Paket "path" und der Funktion "join", kann ein Pfad verändert werden.
// // hier wird __dirname so geändert, dass eine Ebene nach oben gegangen wird (mit '..' ) und in dem darüberliegenden Ordner dann in den Unterordner "public"
// console.log(path.join(__dirname, '../public'))


//////////////////////////////////////////////////////////////////
//Konstanten
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//////////////////////////////////////////////////////////////////
//Lege Handlebars Engine und Views Ordner fest
app.set('view engine', 'hbs')   //Die Methode "set" sagt dem Paket Express, dass als "Template Engine"  das Paket "hbs" verwendet wird
app.set('views', viewsPath)     //teilt Express mit, dass die Views im Ordner "viewsPath" liegen
hbs.registerPartials(partialsPath)     //teilt Express mit, dass die Partials im Ordner "partialsPath" liegen

//Lege statischen Ordner zum Bedienen fest
app.use(express.static(publicDirectoryPath))




//////////////////////////////////////////////////////////////////
/////////////////////////////Unterseiten//////////////////////////
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// wenn die Root-Page aufgerufen wird, sendet der Server die Datei "index.hbs" zurück
app.get('', (req, res)=>{
    res.render( 'index', {
        title: 'Weather App Seite',
        name: 'torsam'
    })
})


//////////////////////////////////////////////////////////////////
app.get( '/about', (req, res) => {
    res.render('about', {
        title: 'About Seite',
        name: 'torsam'
    })
})


//////////////////////////////////////////////////////////////////
app.get( '/help', (req, res) => {
    res.render('help', {
        title: 'Help Seite',
        helpText: 'Hier steht ab jetzt ein neuer Hilfetext',
        name: 'torsam'
    })
})


//////////////////////////////////////////////////////////////////
app.get('/weather', (req, res)=>{
    if ( !req.query.address ) {
        return res.send({
            error: 'Fehler. Sie müssen eine Suchadressen (Key = "address")'
        })
    }

    const suchOrt = req.query.address
    geocodeJS(suchOrt, (_errorGeocode, {latitude, longitude, location} = {}) => {
        if (_errorGeocode){
            return res.send({ _errorGeocode })
        }
    
        forecastJS(latitude, longitude, (_errorForecast, _dataForecast) => {
            if (_errorForecast){
                res.send({ _errorForecast })
            }
            
            // sende ein JSON-Objekt zurück
            res.send({
                forecast: _dataForecast,
                location: location,
                address: suchOrt
            })

        })
    })



    

})


//////////////////////////////////////////////////////////////////
app.get('/products', (req, res)=>{
    // req.query liest aus, was für eine Query-Anfrage in der URL angegeben wurde
    //Beispiel: DEr Nutzer ruft folgende Internetseite auf: "localhost:3000/products?search=games&rating5"
    //req.query enthält dann folgendes JSON-Objekt:
    // { search: 'games', rating: 5 }

    // wenn in der Abfrage kein Search-Term angegeben wurde, wird der restliche Code nicht ausgeführt
    if ( !req.query.search ) {
        return res.send({
            error: 'Fehler. Sie müssen einen Suchbegriff angeben (Key = search)'
        })
    }

    console.log( req.query.search)
    
    // sende ein JSON-Objekt zurück
    res.send({
        products: []
    })
})


//////////////////////////////////////////////////////////////////
//wenn eine unbekannte Unterseite von help aufgerufen wird, wird diese Funktion ausgelöst
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Seite',
        name: 'torsam',
        errorMessage: 'Help page not found.'
    })
})


//////////////////////////////////////////////////////////////////
//Diese Funktion wird ausgelöst, wenn eine Seite aufgerufen wird, die nicht existiert. Also eine 404-Seite.
//* ist eine Wildcard, steht für alle Eingaben: Wenn irgendeine Eingabe erfolgt, die keiner der oben angegebenen Unterseiten entspricht, wird diese Funktion ausgelöst
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Seite',
        name: 'torsam',
        errorMessage: 'Page not found.'
    })
})


////////////////////////////////////////////////////////////////////
/////////////////////////Server einrichten//////////////////////////
////////////////////////////////////////////////////////////////////
/*  "app.listen(3000, _Funktion)" richtet einen Server ein, auf Port 3000. Im Browser kann man den Server dann unter der Adresse "localhost:3000" besuchen.
Das geht aber nur vom eigenen Computer aus, der Server wird lokal auf dem eigenen Computer gehostet. 
Wenn der Server eingerichtet wird, wird die als Parameter angegebene Funktion ausgeführt. */
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})









////////////////////////////////////////////////////////////////////
///////////////////////////Grundlagen///////////////////////////////
////////////////////////////////////////////////////////////////////


// //app.get: wenn eine Webseite besucht wird (z.B. "www.app.com/about", wird eine bestimmte Funktion ausgeführt)
// //'': Get wird ausgeführt, wenn die Root-Page dieser Webseite besucht wird, also z.B. "www.app.com"
// //req = Anfrage (Request)
// //res = Antwort (Response)
// app.get('', (req, res)=>{
//     //Als Antwort wird gesendet "Hello Express", wenn der Nutzer die Seite aufruft
//     res.send('<h1>Weather</h1>')
// })

// //'/help':  Code wird ausgeführt , wenn Unterseite "www.app.com/help" besucht wird.
// //wenn es eine entsprechende HTML-Seite gibt (help.html), und der Ordner bei Aufruf des Servers mit "use" aufgerufen wird, kann das weggelassen werden
// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })