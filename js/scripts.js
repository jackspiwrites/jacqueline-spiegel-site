// js/scripts.js
console.log("🔧 scripts.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  // --- 1) All your PDF filenames in assets/pdfs/ ---
  const pdfFiles = [
    "ACE24005 c3 AZ GOTV 1 FINAL FPO.pdf",
    "ACE24007 c4 MI GOTV 1 FINAL FPO.pdf",
    "ACE24008 c4 MI GOTV 2_FINAL_FPO.pdf",
    "ACE24012 MT IE 2 FINAL FPO.pdf",
    "ACE24014 MT Doorhanger FINAL FPO.pdf",
    "ALL24006 AZ Voter Guide FINAL FPO.pdf",
    "ALL24013 MI Mailer FINAL FPO.pdf",
    "ALL24014 WI LIT Mailer FINAL FPO.pdf",
    "ALL24015 NV Mailer FINAL FPO.pdf",
    "ALL24016 NH Mailer_FINAL_FPO.pdf",
    "LCVN24056_V GOTV 1 v09.pdf",
    "NAACP24004 NE Voter Guide FINAL FPO.pdf",
    "NCFF24001 Mailer 1 v02.pdf",
    "NCFF24002 Mailer 2 FINAL FPO.pdf",
    "NCFF24003 Mailer 3 FINAL FPO.pdf",
    "NCFF24004 Mailer 4 FINAL FPO.pdf",
    "NCFF24005 Mailer 5 FINAL FPO.pdf",
    "NCFF24006 Mailer 6 FINAL FPO.pdf",
    "NGS24010 BVM-PAC Lit.pdf_FINAL_FPO.pdf",
    "NGS24011 Palm Cards v05.pdf",
    "NSEA24001 Mailer 1 FINAL FPO.pdf",
    "NSEA24002 Mailer 2 FINAL FPO.pdf",
    "NSEA24003 Mailer 3 FINAL FPO.pdf",
    "PPAC24027_V House 1 FPO.pdf",
    "PPAC24028_V_FINAL_FPO.pdf",
    "PPAC24029_V Courts 1_FINAL_FPO.pdf",
    "PPAC24030 V Courts 2 FINAL FPO.pdf",
    "UFD24001 Mailer 1 FPO.pdf",
    "UFD24002 Mailer 2 FPO.pdf",
    "UNI24005 MI Corporate Greed_FINAL_FPO.pdf",
    "UNI24006 MI Healthcare Comparison FINAL FPO.pdf",
    "UNI24007 MI Social Security Medicare FINAL FPO.pdf",
    "UNI24008 MI Cost of Living Comparative FINAL FPO.pdf",
    "UNI24020 OH Public Safety FINAL FPO.pdf",
    "UNI24021 OH Manufacturing and China FINAL FPO.pdf",
    "UNI24033 PA Newsletter 5 FINAL FPO.pdf",
    "UNI24034 PA Healthcare Comparison FINAL FPO.pdf",
    "UNI24035 PA Social Security Medicare FINAL FPO.pdf",
    "UNI24036 PA Cost of Living Comparative FINAL FPO.pdf",
    "UNI24037 PA Voter Guide FINAL FPO.pdf",
    "UNI24049 WI Cost of Living Comparison FINAL FPO.pdf",
    "UNI24050 WI Voter Guide FINAL FPO.pdf",
    "UNI24054 NE Cost of Living Comparison FINAL FPO.pdf",
    "UNI24055 NE Voter Guide FINAL FPO.pdf",
    "VOTO24002_V Voter Guide 2 FINAL FPO.pdf",
    "VOTO24003_V Social Pressure GOTV FINAL FPO.pdf",
    "VOTO24004 TX Social Pressure 1 FINAL FPO.pdf",
    "VOTO24005 TX Social Pressure 2 FINAL HR.pdf",
    "VOTO24006 TX Ballot Guide 1 FINAL FPO.pdf",
    "VOTO24007 TX Ballot Guide 2.pdf_FINAL_FPO.pdf",
    "VOTO24009 TX Comparative FINAL FPO.pdf",
    "YOT24009 Retention 1 FINAL FPO.pdf",
    "YOT24010 AA Mailer 1 FINAL FPO.pdf",
    "YOT24011 AA Mailer 2 FINAL FPO.pdf",
    "YOT24012 AA Mailer 3 FINAL FPO.pdf",
    "YOT24013 Retention 2 FINAL FPO.pdf",
    "YOT24014 Latino Mailer 1 8.5 x 13 FINAL FPO.pdf",
    "YOT24015 Latino Mailer 2 FINAL FPO.pdf",
    "YOT24016 Latino Mailer 3 FINAL FPO.pdf",
    "YOT24017 Retention 3 FINAL FPO.pdf",
    "YOT24018 Retention 4 FINAL FPO.pdf",
    "YOT24019 Retention 5 FINAL FPO.pdf",
    "YOT24020 Retention 6 FINAL FPO.pdf"
  ];

  // --- 3) Prefix → Section Title map ---
  const campaigns = {
    YOT:   "Yes On Two",
    VOTO:  "Voto Latino",
    UNI:   "In Union Newsletter",
    UFD:   "United For Democracy",
    PPAC:  "Personal PAC",
    REPEAL:"Repeal Measure 435",
    NSEA:  "Repeal Measure 435",
    NGS:   "Black Men Vote",
    NCFF:  "North Carolina Families First",
    NAACP: "NAACP Nebraska Voter Guide",
    LCVN:  "LCV GOTV",
    ACE:   "Climate Emergency Advocates",
    ALL:   "Alliance for Youth Action",
    AYA:   "Alliance for Youth Action"
  };

  // --- 4) Group by prefix ---
  const grouped = {};
  pdfFiles.forEach(fn => {
    const pre     = (fn.match(/^[A-Z]+/) || ["Other"])[0];
    const section = campaigns[pre] || "Other";
    (grouped[section] = grouped[section] || []).push(fn);
  });

  // --- 5) Render each section + grid with placeholders ---
  const container = document.getElementById("dynamic-portfolio");
  Object.entries(grouped).forEach(([section, files]) => {
    const secEl = document.createElement("section");
    secEl.innerHTML = `
      <h3>${section}</h3>
      <div class="portfolio-grid"></div>
    `;
    const grid = secEl.querySelector(".portfolio-grid");

    files.forEach(fn => {
      const pdfUrl   = `assets/pdfs/${encodeURIComponent(fn)}`;
     const thumbUrl = `assets/thumbs/${encodeURIComponent(
    fn.replace(/\.pdf$/i, '_page1.png'))}`;
      const card     = document.createElement('div');
      card.className = 'pdf-card hidden';

      card.innerHTML = `
        <a href="${pdfUrl}" class="pdf-link" target="_blank" rel="noopener">
          <img src="${thumbUrl}" alt="${fn}" class="pdf-thumb" />
        </a>
        <div class="pdf-label">${fn}</div>
      `;

      grid.appendChild(card);
    });

    container.appendChild(secEl);
  });

  // --- 6) Scroll‐reveal observer ---
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, {
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1
  });
  document.querySelectorAll(".pdf-card").forEach(c => obs.observe(c));

  // --- 7) Lightbox logic ---
  const modal    = document.getElementById("pdf-modal");
  const embedEl  = document.getElementById("pdf-embed");
  const closeBtn = document.getElementById("pdf-close");
  const backdrop = document.querySelector("#pdf-modal .modal-backdrop");

  document.body.addEventListener("click", e => {
    const card = e.target.closest(".pdf-card");
    if (!card) return;
    e.preventDefault();
    embedEl.src = card.querySelector("a").href;
    modal.classList.remove("hidden");
  });
  closeBtn.addEventListener("click", () => {
    embedEl.src = "";
    modal.classList.add("hidden");
  });
  backdrop.addEventListener("click", () => closeBtn.click());
});
// Simple Image Modal (Lightbox)
document.addEventListener("DOMContentLoaded", () => {
  const galleryLinks = document.querySelectorAll('.photo-gallery a');

  // Create modal elements
  const modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <img class="modal-image" src="">
    <div id="modal-close">&times;</div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector('.modal-image');
  const modalClose = modal.querySelector('#modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  // Click event to open modal
  galleryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      modalImage.src = link.href;
      modal.style.display = 'flex';
    });
  });

  // Close modal logic
  const closeModal = () => {
    modal.style.display = 'none';
    modalImage.src = '';
  };
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
});
