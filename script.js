'use strict';

(function () {
  // --- ÉLÉMENTS DU DOM ---
  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("project-modal-backdrop");
  const closeBtn = document.getElementById("project-modal-close");
  const titleEl = document.getElementById("project-modal-title");
  const bulletsEl = document.getElementById("project-modal-bullets");
  const imageEl = document.getElementById("project-modal-image");
  const pdfEl = document.getElementById("project-modal-pdf");

  // --- DONNÉES DES PROJETS ---
  const projectData = {
    patek: {
      title: "Patek Philippe — Master Thesis: R&D Multiphysics Modeling",
      // On garde les bullets pour la compatibilité avec ton code actuel ou un résumé rapide
      bullets: [
        "Comprehensive study of electrostatic phenomena in high-precision watchmaking.",
        "Development of a coupled Maxwell-Structural FEA workflow.",
        "Validation through experimental correlation on silicon components.",
        "Strategic audit of the Silinvar® value chain and risk mitigation."
      ],
      // Voici le nouveau contenu détaillé que nous allons injecter
      detailedContent: `
        <div class="space-y-12 text-slate-300">
          <section>
            <p class="leading-relaxed text-sm sm:text-base border-l-2 border-cyan-500/50 pl-4">
              During my Master Thesis at <strong>Patek Philippe</strong>, I specialized in quantifying 
              electrostatic phenomena in high-precision silicon movements. Here are three key examples 
              demonstrating my ability to solve complex R&D challenges using advanced multiphysics tools.
            </p>
          </section>

          <section class="space-y-4">
            <h3 class="text-slate-100 font-bold flex items-center gap-2 text-base uppercase tracking-wider">
              <span class="text-cyan-400">Example A:</span> Virtual Prototyping (FEA)
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
              I demonstrated my ability to build a numerical bridge between electromagnetism and structural mechanics 
              using <strong>Ansys Maxwell</strong> and <strong>Mechanical</strong>.
            </p>
            <div class="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
              <img src="./assets/pp1.png" alt="Ansys Maxwell Workflow" class="w-full h-auto block object-contain">
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-slate-100 font-bold flex items-center gap-2 text-base uppercase tracking-wider">
              <span class="text-cyan-400">Example B:</span> Laboratory Correlation
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
              I designed experimental protocols to validate digital models, ensuring 100% predictive accuracy 
              on silicon hairspring frequency shifts.
            </p>
            <div class="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
              <img src="./assets/pp2.png" alt="Lab validation" class="w-full h-auto block object-contain">
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-slate-100 font-bold flex items-center gap-2 text-base uppercase tracking-wider">
              <span class="text-cyan-400">Example C:</span> Non-Linear Dynamics
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
              Transient dynamic simulations of a moving escapement using <strong>LS-DYNA</strong> 
              to analyze parasitic torque influence on watch amplitude.
            </p>
            <div class="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
              <img src="./assets/pp3.png" alt="LS-DYNA Escapement" class="w-full h-auto block object-contain">
            </div>
          </section>

          <footer class="border-t border-slate-800 pt-10 pb-6 flex flex-col items-center gap-6">
            <p class="text-xs text-center text-slate-500 max-w-md italic">
              These studies resulted in comprehensive design guidelines for Patek Philippe’s R&D department.
            </p>
            
            <button 
              onclick="document.getElementById('project-modal-close').click()"
              class="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700 hover:border-cyan-500/50 hover:text-cyan-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </button>
          </footer>
        </div>
      `,
      imageSrc: "./assets/patek_resume.png",
      pdfHref: "#"
    },
    ems: {
      title: "EMS — R&D Intern: Disposable Polymer Capsules",
      bullets: [
        "Developed modeling and experimental work for disposable polymer capsules.",
        "Contributed to the technical content behind a filed patent.",
        "Achieved a 60% stability improvement through iterative design.",
        "Coordinated R&D iterations from concept to prototype testing."
      ],
      imageText: "Technical Image (EMS): coming soon",
      pdfHref: "#"
    },
    // Ajoute les autres projets ici (cleanroom, mpc, etc.) sur le même modèle
  };

  // --- FONCTIONS MODAL ---
  function openModal(projectKey) {
    const content = projectData[projectKey];
    if (!content) return;

    titleEl.textContent = content.title;

    // Masquer le bouton PDF d'origine (on n'en a plus besoin)
    if (pdfEl) pdfEl.style.display = "none"; 

    if (content.detailedContent) {
      bulletsEl.innerHTML = content.detailedContent;
      // On cache complètement le bloc image standard et son texte
      imageEl.style.display = "none"; 
    } else {
      // Mode standard pour les autres projets
      imageEl.style.display = "flex";
      if (pdfEl && content.pdfHref && content.pdfHref !== "#") {
          pdfEl.style.display = "flex";
          setPdf(content.pdfHref);
      }
      // ... reste du code standard
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // --- ÉVÉNEMENTS ---

  // Clic sur les cartes de projet
  document.querySelectorAll("[data-project-modal]").forEach(card => {
    card.addEventListener("click", (e) => {
      // On empêche la navigation vers une autre page pour rester sur la Modal
      e.preventDefault();
      const id = card.getAttribute("data-project-modal");
      openModal(id);
    });
  });

  // Fermeture
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

})();