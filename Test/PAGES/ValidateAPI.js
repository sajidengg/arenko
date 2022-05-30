/** * 
* @param  controller It imports all method to perfrom different action such as GET API, POST API and PUT API.
* @param  expect    chai library to assert conditions
// 1.class ValidateAPI{} contians logic to validate the API scenarios
*/
const controller = require('../Controller/Generic.js');
const { expect } = require('chai');
class ValidateAPI extends controller {

    async getIntenSity() {

        let getIntenSityResponse = await super.getData("https://api.carbonintensity.org.uk/intensity")

        if (getIntenSityResponse[0] == 200 && getIntenSityResponse[1].data.length == 1) {
            expect(200).to.equal(getIntenSityResponse[0]);

            console.log("GET /intensity API Fetched Data Successfully ")
        }
        else {
            expect(400).to.equal(400);
            console.log("GET /intensity API  failed to Fetched Data & Status code is" + getIntenSityResponse[0])
        }
        if (getIntenSityResponse[2].toFixed(2) <= "1.0") {
            console.log("GET /intensity API response time is  less than 1 sec:" + getIntenSityResponse[2].toFixed(2));

        }
        else {
            console.log("GET /intensity API response time is greater than 1 sec:" + getIntenSityResponse[2].toFixed(2))
        }
    }








    async getIntenSityDate() {

        let getIntenSityDateResponse = await super.getData("https://api.carbonintensity.org.uk/intensity/date")
        if (getIntenSityDateResponse[0] == 200 && getIntenSityDateResponse[1].data.length == 48) {
            expect(200).to.equal(getIntenSityDateResponse[0]);
            console.log("GET /intensity/date API Fetched Data Successfully ")
        }
        else {
            expect(400).to.equal(400);
            console.log("GET /intensity/date API  failed to Fetched Data & Status code is" + getIntenSityDateResponse[0])
        }
        if (getIntenSityDateResponse[2].toFixed(2) <= "1.0") {
            console.log("GET /intensity/date API response time is  less than 1 sec:" + getIntenSityDateResponse[2].toFixed(2));

        }
        else {
            console.log("GET /intensity/date  API response time is greater than 1 sec:" + getIntenSityDateResponse[2].toFixed(2))
        }


    }

    async getIntenSityDateWithParameters() {

        let getIntenSityDateResponseParameters = await super.getData("https://api.carbonintensity.org.uk/intensity/date/2022-05-25")
        if (getIntenSityDateResponseParameters[0] == 200 && getIntenSityDateResponseParameters[1].data.length == 48) {
            expect(200).to.equal(getIntenSityDateResponseParameters[0]);
            console.log("GET /intensity/date/{date} API Fetched Data Successfully ")
        }
        else {
            expect(400).to.equal(400);
            console.log("GET /intensity/date/{date} API  failed to Fetched Data & Status code is" + getIntenSityDateResponseParameters[0])
        }
        if (getIntenSityDateResponseParameters[2].toFixed(2) <= "1.0") {
            console.log("GET /intensity/date/{date} API response time is  less than 1 sec:" + getIntenSityDateResponseParameters[2].toFixed(2));

        }
        else {
            console.log("GET /intensity/date/{date}  API response time is greater than 1 sec:" + getIntenSityDateResponseParameters[2].toFixed(2))
        }




    }





}


module.exports = new ValidateAPI();