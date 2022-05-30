/** * 
* @param  controller It imports all method to perfrom different action such as initialize driver, find elements, etc.
* @param  expect    chai library to assert  conditions
// 1.class validateGUI{} contians logic to validate the GUI scenarios
*/
const controller = require('../Controller/Generic.js');
const { expect, assert } = require('chai');
class ValidateActiveTab extends controller {

    // List of XPATHS
    get collectionActiveTabXPATH() {
        return {
            AssetDropDown: "//div[@id='demo-simple-select']",
            AssetDropDownElement: "//ul//li[1]",
            From: "//input[@id='minLevel']",
            To: "//input[@id='maxLevel']",
            FromValidationMessage: "//div[contains(text(),'Empty values are not allowed')]",
            ToValidationMessage: "//div[contains(text(),'Empty values are not allowed')]",
            AddOverRideButton: "//button[@type='submit']",
            AssetDropDownMessage: "//span[contains(text(),'Please select the asset')]",
            StartDate: "//input[@id='mui-5']",
            EndDate: "//input[@id='mui-6']",
            FromNegativeMessage: "//div[contains(text(),'FROM level outside valid range')]",
            ToNegativeMessage: "//div[contains(text(),'TO level outside valid range')]"

        }
    }


    get collectionOfActiveTabData() {
        return {
            FromData: 100,
            FromNegativeData: -100,
            ToData: 200,
            ToNegativeData: -200



        }

    }



    async checkFromAndToCantEmpty() {

        await super.click(this.collectionActiveTabXPATH.AddOverRideButton);
        let FromValidation = await super.getTextOfElement(this.collectionActiveTabXPATH.FromValidationMessage);
        await super.sendData(this.collectionActiveTabXPATH.From, this.collectionOfActiveTabData.FromData);
        let ToValidation = await super.getTextOfElement(this.collectionActiveTabXPATH.ToValidationMessage);

        if (FromValidation == "Empty values are not allowed" && ToValidation == "Empty values are not allowed") {
            expect(FromValidation).to.equal("Empty values are not allowed");
            expect(ToValidation).to.equal("Empty values are not allowed");


        }
        else {
            console.log("Failed to verify  'From and To fields can't be empty and should be +ve numeric values.' ");
            expect(FromValidation).to.equal("Empty values are not allowed");
            expect(ToValidation).to.equal("Empty values are not allowed");
        }


    }

    async checkFromAndToPostiveValue() {


        await super.clearText(this.collectionActiveTabXPATH.From);
        await super.sendData(this.collectionActiveTabXPATH.From, this.collectionOfActiveTabData.FromNegativeData);
        let FromNegativeValidation = await super.getTextOfElement(this.collectionActiveTabXPATH.FromNegativeMessage);
        await super.sendData(this.collectionActiveTabXPATH.To, this.collectionOfActiveTabData.ToNegativeData);
        let ToNegativeValidation = await super.getTextOfElement(this.collectionActiveTabXPATH.ToNegativeMessage);
        if (FromNegativeValidation == "FROM level outside valid range" && ToNegativeValidation == "TO level outside valid range") {
            expect(FromNegativeValidation).to.equal("FROM level outside valid range");
            expect(ToNegativeValidation).to.equal("TO level outside valid range");
        }
        else {
            console.log("Failed to verify  'From and To fields should be +ve numeric values.' ");
            expect(FromNegativeValidation).to.equal("FROM level outside valid range");
            expect(ToNegativeValidation).to.equal("TO level outside valid range");
        }



        await super.clearText(this.collectionActiveTabXPATH.From);
        await super.sendData(this.collectionActiveTabXPATH.From, this.collectionOfActiveTabData.FromData);
        await super.clearText(this.collectionActiveTabXPATH.To);
        await super.sendData(this.collectionActiveTabXPATH.To, this.collectionOfActiveTabData.ToData);




    }
    async checkAssetDropDownCantEmpty() {

        await super.click(this.collectionActiveTabXPATH.AddOverRideButton);
        let AssetDropDownValidation = await super.getTextOfElement(this.collectionActiveTabXPATH.AssetDropDownMessage);
        if (AssetDropDownValidation == "Please select the asset") {
            expect(AssetDropDownValidation).to.equal("Please select the asset");
        }
        else {
            console.log("Failed to verify  'Asset drop-down can't be empty.' ");
            assert(false);
        }


        await super.click(this.collectionActiveTabXPATH.AssetDropDown);
        await super.click(this.collectionActiveTabXPATH.AssetDropDownElement);



    }


    async checkStartTime() {

        let StartDateValidation = await super.getAttributeValue(this.collectionActiveTabXPATH.StartDate);
        if (StartDateValidation.includes("2022")) {

            let GetStartTime = StartDateValidation.substring(11, 16);
            var date = new Date();
            var currentHours = ('0' + date.getHours()).substr(-2);
            var currentSecond = ('0' + date.getSeconds()).substr(-2);
            let CurrentTime = currentHours + ":" + currentSecond;
            CurrentTime = parseInt(CurrentTime, 10)
            GetStartTime = parseInt(GetStartTime, 10)
            // console.log("CurrentTime: "+CurrentTime +" GetStartTime: "+ GetStartTime);
            if (GetStartTime > CurrentTime) {
                assert(true)

            }
            else {

                let StartTimeLength = StartDateValidation.length;
                await super.moverCursor(StartTimeLength, this.collectionActiveTabXPATH.StartDate);
                let IncreaseHours = Number(currentHours) + 1;
                IncreaseHours = IncreaseHours + ":" + currentSecond;
                await super.sendData(this.collectionActiveTabXPATH.StartDate, IncreaseHours);

            }

        }

    }


    async checkEndTime() {
        let EndDateValidation = await super.getAttributeValue(this.collectionActiveTabXPATH.EndDate);
        //console.log("StartDateValidation"+StartDateValidation)
        if (EndDateValidation.includes("2022")) {

            let GetStartTime = EndDateValidation.substring(11, 16);
            var date = new Date();
            var currentHours = ('0' + date.getHours()).substr(-2);
            var currentSecond = ('0' + date.getSeconds()).substr(-2);
            let CurrentTime = currentHours + ":" + currentSecond;
            CurrentTime = parseInt(CurrentTime, 10)
            GetStartTime = parseInt(GetStartTime, 10)
            if (GetStartTime > CurrentTime) {
                assert(true)

            }
            else {

                let StartTimeLength = EndDateValidation.length;
                await super.moverCursor(StartTimeLength, this.collectionActiveTabXPATH.EndDate);
                let IncreaseHours = Number(currentHours) + 1;
                IncreaseHours = IncreaseHours + ":" + currentSecond;
                await super.sendData(this.collectionActiveTabXPATH.EndDate, IncreaseHours);

            }

        }


    }


    async clickTOOverRide() {
        await super.click(this.collectionActiveTabXPATH.AddOverRideButton);
    }



}


module.exports = new ValidateActiveTab();