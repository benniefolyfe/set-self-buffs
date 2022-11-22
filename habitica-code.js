/****************************************************\
 *  Set Self-Buffs (Habitica) v1.0 by @benniefolyfe  *
\****************************************************/

// Add your user ID and API token in this section. Leave the quotation marks and remove the brackets.

const User_ID = "[User ID]"
const API_Token = "[API Token]" // Do not share this with anyone

// Enter your desired buff values in the next four rows as numeric values. Current examples will buff all stats to 100. Set these values BEFORE you deploy the script as a Web App.

var Strength = 100
var Intelligence = 100
var Constitution = 100
var Perception = 100

// After deploying the script, copy and paste the Web App URL here. Leave the quotation marks and remove the brackets.

const Web_App_URL = "[Web App URL]"

// The next five lines allow you to choose whether you want reward buttons for each individual buff. A value of 0 will not create the button. A value of 1 will create the button.

const Create_Set_All_Button = 1 // Change this 1 to a 0 if you do not want a reward button that updates all stat buffs.
const Create_Set_Strength_Button = 1 // Change this 1 to a 0 if you do not want a reward button that updates strength buffs.
const Create_Set_Intelligence_Button = 1 // Change this 1 to a 0 if you do not want a reward button that updates intelligence buffs.
const Create_Set_Constitution_Button = 1 // Change this 1 to a 0 if you do not want a reward button that updates consitution buffs.
const Create_Set_Perception_Button = 1 // Change this 1 to a 0 if you do not want a reward button that updates perception buffs.

/**********************************************\
 *  No need to edit anything below this line.  *
\**********************************************/

// The below functions set stat buffs at the values you input. 

const Script_Name = "Set Self-Buffs"
const Author_ID = "377a4d3d-c55c-48b8-9bf8-59b97480daf8"
const Headers = {
  "x-client": Author_ID + " - " + Script_Name,
  "x-api-user": User_ID,
  "x-api-key": API_Token,
}

const Set_All_Text = "**Set All Buffs**"
const Set_All_Alias = "all"
const Set_All_Notes = "Buff all four of your stats according to your preset values: Strength (" + Strength + "), Intelligence (" + Intelligence + "), Constitution (" + Constitution + "), Perception (" + Perception + ")."
const Set_All_Value = "0"
const Set_All_Button = {
    "text": Set_All_Text,
    "type": "reward",
    "alias": Set_All_Alias,
    "notes": Set_All_Notes,
    "value": Set_All_Value,
}

const Set_Strength_Text = "**Set Strength Buff**"
const Set_Strength_Alias = "stre"
const Set_Strength_Notes = "Buff your strength to " + Strength + "."
const Set_Strength_Value = "0"
const Set_Strength_Button = {
    "text": Set_Strength_Text,
    "type": "reward",
    "alias": Set_Strength_Alias,
    "notes": Set_Strength_Notes,
    "value": Set_Strength_Value,
}

const Set_Intelligence_Text = "**Set Intelligence Buff**"
const Set_Intelligence_Alias = "inte"
const Set_Intelligence_Notes = "Buff your intelligence to " + Intelligence + "."
const Set_Intelligence_Value = "0"
const Set_Intelligence_Button = {
    "text": Set_Intelligence_Text,
    "type": "reward",
    "alias": Set_Intelligence_Alias,
    "notes": Set_Intelligence_Notes,
    "value": Set_Intelligence_Value,
}

const Set_Constitution_Text = "**Set Constitution Buff**"
const Set_Constitution_Alias = "cons"
const Set_Constitution_Notes = "Buff your constitution to " + Constitution + "."
const Set_Constitution_Value = "0"
const Set_Constitution_Button = {
    "text": Set_Constitution_Text,
    "type": "reward",
    "alias": Set_Constitution_Alias,
    "notes": Set_Constitution_Notes,
    "value": Set_Constitution_Value,
}

const Set_Perception_Text = "**Set Perception Buff**"
const Set_Perception_Alias = "perc"
const Set_Perception_Notes = "Buff your perception to " + Perception + "."
const Set_Perception_Value = "0"
const Set_Perception_Button = {
    "text": Set_Perception_Text,
    "type": "reward",
    "alias": Set_Perception_Alias,
    "notes": Set_Perception_Notes,
    "value": Set_Perception_Value,
}

function doOneTimeSetup() {
  // These are not "else if" statements on purpose
  if (Create_Set_All_Button == 1) {
    api_createNewTaskForUser([Set_All_Button])
  }
  if (Create_Set_Strength_Button == 1) {
    api_createNewTaskForUser([Set_Strength_Button])
  }
  if (Create_Set_Intelligence_Button == 1) {
    api_createNewTaskForUser([Set_Intelligence_Button])
  }
  if (Create_Set_Constitution_Button == 1) {
    api_createNewTaskForUser([Set_Constitution_Button])
  }
  if (Create_Set_Perception_Button == 1) {
    api_createNewTaskForUser([Set_Perception_Button])
  }
  
  // Next, create the webhook

  const options = {
    "scored": true,
  }
  const payload = {
    "url": Web_App_URL,
    "label": Script_Name + "Webhook",
    "type": "taskActivity",
    "options": options,
  }
  apiMult_createNewWebhookNoDuplicates(payload)
}

// Do things when the webhook runs

function doPost(e) {
  const dataContents = JSON.parse(e.postData.contents)
  const type = dataContents.type
  const task = dataContents.task
  
// Sanitize task alias

  let sanitizedAlias = "sanitized" // This will be the value if undefined, null, or blank
  if ( (task.alias != undefined) && (task.alias != null) && (task.alias != "") ) {
    sanitizedAlias = task.alias
  }
  
  if (type == "scored") {

    // Check if the alias matches any of them
    if ( (sanitizedAlias == Set_All_Alias) || (sanitizedAlias == Set_Strength_Alias) || (sanitizedAlias == Set_Intelligence_Alias) || (sanitizedAlias == Set_Constitution_Alias) || (sanitizedAlias == Set_Perception_Alias) ) {

      // Switch-case based on which button was pressed. All button-click actions are in a separate function.
      switch (sanitizedAlias){
        case Set_All_Alias:
          set_all_buffs ();
          break;
        case Set_Strength_Alias:
          set_strength ();
          break;
        case Set_Intelligence_Alias:
          set_intelligence ();
          break;
        case Set_Constitution_Alias:
          set_constitution ();
          break;
        case Set_Perception_Alias:
          set_perception ();
          break;
      }
    }
  }
  
  return HtmlService.createHtmlOutput()
}

// When the Buff buttons are clicked

function set_all_buffs () {
  set_strength ()
  set_intelligence ()
  set_constitution ()
  set_perception ()
}

function set_strength () {
  var str = Strength
  api_updateUser({"stats.buffs.str": str})
}

function set_intelligence () {
  var int = Intelligence
  api_updateUser({"stats.buffs.int": int})
}

function set_constitution () {
  var con = Constitution
  api_updateUser({"stats.buffs.con": con})
}

function set_perception () {
  var per = Perception
  api_updateUser({"stats.buffs.per": per})
}

// Sets parameters.

function api_updateUser(payload) { 
  var params = {
    "method": "put",
    "headers": Headers,
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true,
  }
  
  var url = "https://habitica.com/api/v3/user"
  return UrlFetchApp.fetch(url, params)
}

// Create custom reward buttons

function api_createNewTaskForUser(payload) {
  var params = {
    "method": "post",
    "headers": Headers,
    "contentType": "application/json",
    "payload": JSON.stringify(payload), // Rightmost button goes on top
    "muteHttpExceptions": true,
  }

  var url = "https://habitica.com/api/v3/tasks/user"
  UrlFetchApp.fetch(url, params)
}

// Create a webhook if no duplicate exists

function apiMult_createNewWebhookNoDuplicates(payload) {
  const response = api_getWebhooks()
  const webhooks = JSON.parse(response).data
  var duplicateExists = 0
    
  for (var i in webhooks) {
    if (webhooks[i].label == payload.label) {
      duplicateExists = 1
    }
  }
  // If webhook to be created doesn't exist yet
  if (!duplicateExists) {
    api_createNewWebhook(payload)
  }
}

// Used to see existing webhooks, and therefore if there's a duplicate

function api_getWebhooks() {
  const params = {
    "method": "get",
    "headers": Headers,
    "muteHttpExceptions": true,
  }
  
  var url = "https://habitica.com/api/v3/user/webhook"
  return UrlFetchApp.fetch(url, params)
}

// Creates a webhook (as part of the "don't make it if there's a duplicate" function)

function api_createNewWebhook(payload) {
  const params = {
    "method": "post",
    "headers": Headers,
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true,
  }
   
  var url = "https://habitica.com/api/v3/user/webhook"
  return UrlFetchApp.fetch(url, params)
}
