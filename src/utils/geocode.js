const request = require('request')

const geocodeFunktion = (_address, _callback) => {
    // die Anfrage-URL wird so umgebaut, dass die Adresse in der Mitte eingesetzt wird
    const urlString = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(_address) + '.json?access_token=pk.eyJ1IjoidG9yc2FtIiwiYSI6ImNrZXNmcHl0ZDA0enkyeHJ1ejlmNWJoMmEifQ._3DSw2dXU4O7qba_kVMKdw&limit=1'


    // // Die Funktion request führt im Internet mit einer URL eine Abfrage durch und führt dann eine Funktion damit aus
    // //json:true heißt, dass das Ergebnis zu einem JSON-Objekt geparst wird
    // error, response: die Funktion bekommt die beiden Parameter error und response und führt damit die folgende Funktion aus
    // error entsteht, wenn die Anfrage fehlerhaft ist. response enthält die Daten der HTTP-Abfrage
    request({url: urlString, json: true}, (error, {body})=>{
        if (error){
            _callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0){
            _callback('Unable to find location. Try another search.', undefined)
        }
        else{
            // alles hier angegebene wird der Funktion als "_data" zurückgegeben
            _callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocodeFunktion