function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}



chrome.runtime.onMessage.addListener(function (request){

	var gnome = request;
  	var frame = document.getElementsByName("RadWindow1")[0];

  	betDate = frame.contentWindow.document.getElementById("lblDate").textContent.substring(0,10);

	event = frame.contentWindow.document.getElementById("lblEvent").textContent.replace(" v ","-");
	outcome = frame.contentWindow.document.getElementById("lblOutcome1").textContent;
	backOdds = frame.contentWindow.document.getElementById("lblSimpleBackOdds").textContent;
	backOdds = backOdds.replace(".",",");
	layOdds = frame.contentWindow.document.getElementById("lblSimple_layOdds").textContent;
	layOdds = layOdds.replace(".",",");
	backAmount = frame.contentWindow.document.getElementById("lblSimpleStake").textContent;
	backAmount = backAmount.substring('KR'.length).replace(",","").replace(".",",")
	layAmount = frame.contentWindow.document.getElementById("lblSimple_layAmount").textContent;
	layAmount = layAmount.substring('KR'.length).replace(",","").replace(".",",");

	bookie = frame.contentWindow.document.getElementById("linkBookie").textContent;
	bookie = bookie.substring('Go to '.length);
	bookie = gnome+bookie[0] + bookie.substring(1).toLowerCase();
	if (bookie == "Norsk tipping"){
		bookie = "NorskTipping"
	}


	exchange = frame.contentWindow.document.getElementById("linkExchange").textContent;
	exchange = exchange.substring('Go to '.length);
	exchange = exchange[0] + exchange.substring(1).toLowerCase();

	ex_commision = frame.contentWindow.document.getElementById("txtExchangeComm").getAttribute("value");
	ex_commision = ex_commision.substring(0,ex_commision.length-4).replace(".",",");
	ex_commision = "0,0"+ex_commision;
	sport = frame.contentWindow.document.getElementById("imgSport").getAttribute("src").substring('../images/sports/'.length);
	if (sport == "2.png"){
		sport = "FB"
  } else if (sport == "3.png"){
    sport = "TE"
  } else if (sport == "904.png"){
    sport = "ES"
  } else if (sport == "7.png"){
    sport = "BB"  
  } else if (sport == "6.png"){
    sport = "IH" 
	} else if (sport == "1.png"){
    sport = "HE"
  }
	layWinBookieProfit = frame.contentWindow.document.getElementById("lblLayWin_Bookie_Profit").textContent;
	freebet = "";
	if (layWinBookieProfit == "+kr0.00"){
		freebet = "Freebet";
	}
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;


	var copyText =today+"\t"+betDate + "\t"+bookie+ "\t\t"+exchange+"\t"+ex_commision+"\t"+event+"\t"+outcome+"\t"+backOdds+"\t"+layOdds+"\t"+backAmount+"\t"+layAmount; 
  //+"\t\t\t\t\t\t\t\t\t\t\t\t"+freebet;
	copyTextToClipboard(copyText);

})	
