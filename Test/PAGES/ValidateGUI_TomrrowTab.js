/** * 
* @param  controller It imports all method to perfrom different action such as initialize driver, find elements, etc.
* @param  expect    chai library to assert  conditions
// 1.class validateGUI{} contians logic to validate the GUI scenarios
*/
const controller = require('../Controller/Generic.js');
const { expect, assert } = require('chai');
class ValidateTomrrowTab extends controller {

    // List of XPATHS
    get collectionOfTomrrowXPATH() {
        return {
            TomorrowTab: "//button[@id='simple-tab-1']",
            AssetDropDown: "//div[@id='demo-simple-select']",
            AssetDropDownElement: "//ul//li[1]",
            Offer: "//input[@id='offer']",
            OfferPrice: "//input[@id='offer_price']",
            OfferUndo: "//input[@id='offer_undo']",
            Bid: "//input[@id='bid']",
            BidPrice: "//input[@id='bid_price']",
            BidUndo: "//input[@id='bid_undo']",
            AddOverRideButton: "//button[@type='submit']",
            OfferAndBidValidationMessage: "//p[contains(text(),'OFFER and BID empty')]",
            PriceGreaterMessage: "//p[contains(text(),'Offer price must be greater than Undo')]",
            UndoGreaterBidMessage: "//p[contains(text(),'Offer undo must be greater than bid price')]",
            OfferPriceGreaterThanBidMessage: "//p[contains(text(),'offer prices must be greater than bid undo')]",
            BidValueBetweenMessage: "//p[contains(text(),'Enter value between -9999 and 0')]",

        }
    }


    get collectionOfTomrrowData() {
        return {
            OfferPriceData: 100,
            OfferUndoData: 200,
            BidPriceData: 300,
            BidUndoData: 200,
            BidData: 5,
            PositiveOfferPriceData: 300,
            PositiveOfferUndoData: 100,
            PositiveBidPriceData: 70,
            PositiveBidUndoData: 20


        }

    }
    async clickOnTomorrowTab() {
        await super.click(this.collectionOfTomrrowXPATH.TomorrowTab);
    }


    async assetDropDownValidation() {

        await super.click(this.collectionOfTomrrowXPATH.AssetDropDown);
        await super.click(this.collectionOfTomrrowXPATH.AssetDropDownElement);
        let AssetDropDownValue = await super.getTextOfElement(this.collectionOfTomrrowXPATH.AssetDropDownElement);
        if (AssetDropDownValue == null) {
            expect(AssetDropDownValue).to.not.be.null;

        }
        else {
            expect(AssetDropDownValue).to.not.be.null;

        }

    }


    async clickOnAddOverRide() {
        await super.click(this.collectionOfTomrrowXPATH.AddOverRideButton)
    }

    async checkNullValueOfOfferAndBid() {

        let checkNullValidationMessage = await super.getTextOfElement(this.collectionOfTomrrowXPATH.OfferAndBidValidationMessage);
        if (checkNullValidationMessage == "OFFER and BID empty") {
            expect(checkNullValidationMessage).to.equal("OFFER and BID empty")
        }
        else {
            console.log("Failed to verify 'Check that no null values are allowed for the Offer and Bid value.' ")
            expect(checkNullValidationMessage).to.equal("OFFER and BID empty")

        }
    }

    async checkPriceGreaterThenUndo() {
        await super.sendData(this.collectionOfTomrrowXPATH.Offer, this.collectionOfTomrrowData.OfferPriceData);
        await super.sendData(this.collectionOfTomrrowXPATH.OfferPrice, this.collectionOfTomrrowData.OfferPriceData);
        await super.sendData(this.collectionOfTomrrowXPATH.OfferUndo, this.collectionOfTomrrowData.OfferUndoData);
        await super.click(this.collectionOfTomrrowXPATH.AddOverRideButton);
        let GreaterPriceValidationMessage = await super.getTextOfElement(this.collectionOfTomrrowXPATH.PriceGreaterMessage);
        if (GreaterPriceValidationMessage == "Offer price must be greater than Undo") {
            expect(GreaterPriceValidationMessage).to.equal("Offer price must be greater than Undo");

        }
        else {
            console.log("Failed to verify  'Offer Price must be greater than Offer Undo' ");
            assert(false);
        }

    }


    async checkOfferUndoGreaterThanBidPrice() {
        await super.sendData(this.collectionOfTomrrowXPATH.BidPrice, this.collectionOfTomrrowData.BidPriceData)
        let OfferUndoValidation = await super.getTextOfElement(this.collectionOfTomrrowXPATH.UndoGreaterBidMessage);
        if (OfferUndoValidation == "Offer undo must be greater than bid price") {
            expect(OfferUndoValidation).to.equal("Offer undo must be greater than bid price");

        }
        else {
            console.log("Failed to verify  'Offer Undo must be greater than Bid Price.' ");
            assert(false);
        }

    }

    async checkOfferPriceGreaterThanBidUndo() {
        await super.sendData(this.collectionOfTomrrowXPATH.BidUndo, this.collectionOfTomrrowData.BidUndoData)
        let OfferPriceGreaterThaBidPriceValidation = await super.getTextOfElement(this.collectionOfTomrrowXPATH.OfferPriceGreaterThanBidMessage);
        if (OfferPriceGreaterThaBidPriceValidation == "offer prices must be greater than bid undo") {
            expect(OfferPriceGreaterThaBidPriceValidation).to.equal("offer prices must be greater than bid undo");

        }
        else {
            console.log("Failed to verify  'Offer Price must be greater than Bid Undo' ");
            assert(false);
        }
    }



    async checkOfferPriceAndBIDPriceBetween() {
        await super.sendData(this.collectionOfTomrrowXPATH.Bid, this.collectionOfTomrrowData.BidData)
        let BidValueBetweenValidation = await super.getTextOfElement(this.collectionOfTomrrowXPATH.BidValueBetweenMessage);
        if (BidValueBetweenValidation == "Enter value between -9999 and 0") {
            expect(BidValueBetweenValidation).to.equal("Enter value between -9999 and 0");

        }
        else {
            console.log("Failed to verify  'Offer Price must be greater than Bid Undo' ");
            assert(false);
        }

    }

    async checkSingleSideJourney() {

        await super.clearText(this.collectionOfTomrrowXPATH.OfferPrice);
        await this.sendData(this.collectionOfTomrrowXPATH.OfferPrice, this.collectionOfTomrrowData.PositiveOfferPriceData);

        await super.clearText(this.collectionOfTomrrowXPATH.OfferUndo);
        await this.sendData(this.collectionOfTomrrowXPATH.OfferUndo, this.collectionOfTomrrowData.PositiveOfferUndoData);

        await super.clearText(this.collectionOfTomrrowXPATH.BidPrice);
        await super.clearText(this.collectionOfTomrrowXPATH.BidUndo);
        await super.clearText(this.collectionOfTomrrowXPATH.BidUndo);
        let BidTextBOXValue = await super.getTextOfElement(this.collectionOfTomrrowXPATH.Bid);
        let BidPriceBoXValue = await super.getTextOfElement(this.collectionOfTomrrowXPATH.BidPrice);
        let BidUndoBOXValue = await super.getTextOfElement(this.collectionOfTomrrowXPATH.BidUndo);

        if (BidTextBOXValue == "" && BidPriceBoXValue == "" && BidUndoBOXValue == "") {
            await super.click(this.collectionOfTomrrowXPATH.AddOverRideButton);
            console.log("Successfully SUbmited single Side Jouney")

        }


    }


}


module.exports = new ValidateTomrrowTab();