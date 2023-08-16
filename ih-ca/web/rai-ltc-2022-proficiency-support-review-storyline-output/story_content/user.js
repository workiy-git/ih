function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6pPAuzsleoI":
        Script1();
        break;
      case "6N0ptnxnUKi":
        Script2();
        break;
  }
}

function Script1()
{
  GetPlayer().SetVar("resume_data_length", lmsAPI.GetDataChunk().length);
}

function Script2()
{
  GetPlayer().SetVar("resume_data_length", lmsAPI.GetDataChunk().length);
}

