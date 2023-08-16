function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6ozLtFRtr5X":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
player.SetVar("Picture1", player.GetVar("NumericEntry1"));
}

