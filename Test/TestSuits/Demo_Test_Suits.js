
let AutomatedAPITask = require('../SPEC/Task1_AutomatedAPI');
let ActiveTab = require('../SPEC/Task2_1_ActiveTab_GUI');
let TomrrowTab = require('../SPEC/Task2_2_TomorrowTab_GUI');

let demoSuits = async function () {

    try {
        await AutomatedAPITask.AutomatedAPI();
        await ActiveTab.automatedActiveTab();
        await TomrrowTab.automatedTomorrowTab();
    }
    catch (error) {
        console.log("Demo suits is failed:" + error)

    }
}
demoSuits();