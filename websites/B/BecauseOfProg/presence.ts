var presence = new Presence({
    clientId: "730174059220041759"
  });
  var browsingStamp = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
    var presenceData: PresenceData = {
      largeImageKey: "bop-orange",
      startTimestamp: browsingStamp
    };
    
    if (document.location.pathname == "/") {
      presenceData.details = "https://becauseofprog.fr";
    } else if (document.location.pathname.includes("/blog")) {
      presenceData.details = "Tous les articles";
    } else if (document.location.pathname == '/page/projects') {
      presenceData.details = 'Page des projets'
    } else if (document.location.pathname == '/page/links') {
      presenceData.details = 'Liens'
    } else if (document.location.pathname == '/page/about') {
      presenceData.details = 'À propos'
    } else if (document.location.pathname.includes("/article/")) {
      const current = document.querySelector("body > div.row > div.col.l7.upper-content > div").textContent
      const author = document.querySelector("body > div.welcome.parallax-container.darker-bg > h5 > b").textContent
      presenceData.details = `Article (${author})`;
      presenceData.state = `${current}`;
    } else if (document.location.pathname.includes("/categorie/") || document.location.pathname.includes("/type/")) {
      const current = document.querySelector("body > div.container > p > a:nth-child(5)").textContent
      presenceData.state = `${current}`;
      presenceData.details = 'Catégorie :';
    } else if (document.location.pathname.includes("/user/")) {
      const current = document.querySelector("body > div.welcome.parallax-container > h2").textContent
      presenceData.details = 'Page utilisateur :'
      presenceData.state = `${current}`
    } else {
      presenceData.details = 'https://becauseofprog.fr'
    }
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });