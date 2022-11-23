/***************************************************\
*  Set Self-Buffs (Habitica) v1.1 by @benniefolyfe  *
\***************************************************/

// Add your user ID and API token in this section. Leave the quotation marks and remove the brackets.

const User_ID = "[User ID]"
const API_Token = "[API Token]" // Do not share this with anyone

// Enter your desired buff values in the next four rows as numeric values. Current examples will buff all stats to 100.

var Strength = 100
var Intelligence = 100
var Constitution = 100
var Perception = 100

/*********************************************\
*  No need to edit anything below this line.  *
\*********************************************/

// The below functions set stat buffs at the values you input. 

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

const Script_Name = "Set Self-Buffs (Script)"
const Author_ID = "377a4d3d-c55c-48b8-9bf8-59b97480daf8"

function api_updateUser(payload) { 
  var params = {
    "method": "put",
    "headers": {
      "x-client": Author_ID + " - " + Script_Name,
      "x-api-user": User_ID,
      "x-api-key": API_Token,
    } ,
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true,
  }
  
  var url = "https://habitica.com/api/v3/user"
  return UrlFetchApp.fetch(url, params)
}
