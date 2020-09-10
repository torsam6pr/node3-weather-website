const request = require('request')

const forecastFunktion = (_latitude, _longitude, _callback) => {
    const urlString = 'http://api.weatherstack.com/current?access_key=2fd27af0c1fac3672ce014f6ff2806df&query=' + _latitude.toString() + ',' + _longitude.toString() + '&units=m'
    // console.log ('entstandener URL-String = ' + urlString )

    // Die Funktion request führt im Internet mit einer URL eine Abfrage durch und führt dann eine Funktion damit aus
    // json:true heißt, dass das Ergebnis zu einem JSON-Objekt geparst wird
    // wenn die Abfrage nicht möglich ist, wird eine Variable "error" zurückgegeben, sonst "response", was dann ausgelesen werden kann
    request({url: urlString, json: true}, (error, {body} ) => {
        if (error){
            // gebe der Callback-Funktion 2 Werte zurück: ein mal ein Text mit einer Fehlerbeschreibung (weil es einen Error gibt) und einmal "undefined", weil es kein Ergebnis der Anfrage gibt
            _callback('Verbindung zum Wetter-Service ist nicht möglich.', undefined)
        }
        else if(body.success === false){
            // gebe der Callback-Funktion 2 Werte zurück: ein mal ein Text mit einer Fehlerbeschreibung (weil es einen Error gibt) und einmal "undefined", weil es kein Ergebnis der Anfrage gibt
            _callback('Anfrage war fehlerhaft.', undefined)
        }
        else{
            // gebe der Callback-Funktion 2 Werte zurück: ein mal "undefined" (weil es keinen Error gibt) und einen String  mit den abgerufenen Werten
            _callback(undefined, 'Es ist ' + body.current.weather_descriptions[0] + '. Die Temperatur beträgt ' + body.current.temperature + '. Die gefühlte Temperatur ist ' + body.current.feelslike + '.')
        }
    })
}

module.exports = forecastFunktion