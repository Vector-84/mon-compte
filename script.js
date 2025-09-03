// === PAGE COMPTE ===
if (document.body.classList.contains('main')) {
  const boutonAjouter = document.getElementById("ajouter");
  const boutonDeduire = document.getElementById("deduire");
  const champMontant = document.getElementById("montant");
  const champDescription = document.getElementById("description");
  const affichageSolde = document.getElementById("solde");
  const boutonReset = document.getElementById("reset");

  // Récupération du solde
  let solde = parseFloat(localStorage.getItem("solde")) || 0;
  affichageSolde.textContent = `${solde}€`;

  // Fonction pour mettre à jour l'historique
  function ajouterHistorique(type, montant, description) {
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    historique.push({ type, montant, description });
    localStorage.setItem("historique", JSON.stringify(historique));
  }

  // Ajouter
  boutonAjouter.addEventListener("click", () => {
    const montant = parseFloat(champMontant.value);
    if (isNaN(montant) || montant <= 0) {
      alert("Veuillez entrer un montant valide, supérieur à 0");
      return;
    }
    solde += montant;
    localStorage.setItem("solde", solde);
    affichageSolde.textContent = `${solde}€`;
    ajouterHistorique("ajout", montant, champDescription.value || ""); // description optionnelle
    champMontant.value = "";
    champDescription.value = "";
  });

  // Déduire
  boutonDeduire.addEventListener("click", () => {
    const montant = parseFloat(champMontant.value);
    const description = champDescription.value.trim();
    if (isNaN(montant) || montant <= 0) {
      alert("Veuillez entrer un montant valide, supérieur à 0");
      return;
    }
    if (!description) {
      alert("Veuillez entrer une description.");
      return;
    }
    solde -= montant;
    localStorage.setItem("solde", solde);
    affichageSolde.textContent = `${solde}€`;
    ajouterHistorique("retrait", montant, description);
    champMontant.value = "";
    champDescription.value = "";
  });

  // Reset
  boutonReset.addEventListener("click", () => {
    if (confirm("Voulez-vous vraiment réinitialiser le solde et l'historique ?")) {
      solde = 0;
      localStorage.setItem("solde", solde);
      affichageSolde.textContent = `${solde}€`;
      champMontant.value = "";
      champDescription.value = "";
      localStorage.removeItem("historique");
    }
  });
}

// === PAGE HISTORIQUE ===
if (document.body.classList.contains('historique')) {
  const container = document.querySelector('.liste-historique');
  const historique = JSON.parse(localStorage.getItem("historique")) || [];

  container.innerHTML = ""; // Nettoie le contenu

  if (historique.length === 0) {
    container.textContent = "Aucune opération enregistrée.";
  } else {
    historique.forEach(operation => {
      const p = document.createElement("p");
      const sign = operation.type === "ajout" ? "+" : "-";
      p.textContent = `${sign}${operation.montant}€ : ${operation.description}`;
      container.appendChild(p);
    });
  }
}