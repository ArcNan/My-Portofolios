// File: main.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("File main.js Berhasil Dimuat dan Dijalankan!");

  // Inisialisasi AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Toggle & Responsive Navigation
  const navSlide = () => {
    const burger = document.querySelector(".burger");
    const navLists = document.querySelector("nav");

    if (burger && navLists) {
      burger.addEventListener("click", () => {
        navLists.classList.toggle("nav-active");
        burger.classList.toggle("toggle-burger");
      });
    }
  };
  navSlide();

  // Hero Type Effect
  const typed = document.querySelector(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
    });
  }

  // Portfolio Filter Logic
  const filterButtons = document.querySelectorAll(
    ".filter-btn:not(#more-certs-btn)"
  );
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const moreCertsBtn = document.getElementById("more-certs-btn");

  const filterPortfolio = (filterValue) => {
    // Sembunyikan tombol "More" setiap kali filter diubah
    moreCertsBtn.classList.add("hidden");
    let certCounter = 0;
    const allCertificates = document.querySelectorAll(".portfolio-item.certif");

    portfolioItems.forEach((item) => {
      item.classList.remove("show");

      const matchesFilter =
        filterValue === "all" || item.classList.contains(filterValue);

      if (matchesFilter) {
        if (filterValue === "certif") {
          // Jika filter adalah "certif", batasi hanya 6 yang tampil
          if (certCounter < 6) {
            item.classList.add("show");
            certCounter++;
          }
        } else {
          item.classList.add("show");
        }
      }
    });
    // Tampilkan tombol "More" jika ada lebih dari 6 sertifikat dan filter adalah "certif"
    if (filterValue === "certif" && allCertificates.length > 6) {
      moreCertsBtn.classList.remove("hidden");
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filterValue = button.getAttribute("data-filter");
      filterPortfolio(filterValue);
    });
  });

  // Tampilkan portofolio default saat halaman dimuat
  filterPortfolio("porto");

  // Event Listener untuk tombol "More"
  if (moreCertsBtn) {
    moreCertsBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".portfolio-item.certif:not(.show)")
        .forEach((cert) => {
          cert.classList.add("show");
        });
      // Sembunyikan tombol "More" setelah diklik
      moreCertsBtn.classList.add("hidden");
    });
  }

  // ===== Modal logic for certificates =====
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const pageWrapper = document.querySelector(".page-wrapper");

  const openCertificateModal = (imgElement) => {
    if (modal && modalImg && captionText) {
      modal.style.display = "flex";
      modalImg.src = imgElement.src;
      captionText.innerHTML = imgElement.alt || "Sertifikat";

      if (pageWrapper) pageWrapper.style.filter = "blur(5px)";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const overlay = imgElement.parentElement.querySelector(".overlay");
      const h4 = overlay ? overlay.querySelector("h4") : null;
      const p = overlay ? overlay.querySelector("p") : null;
      const modalDesc = document.getElementById("modalDesc");
      if (modalDesc) {
        modalDesc.innerHTML = "";
        if (h4) modalDesc.innerHTML += `<h4>${h4.textContent}</h4>`;
        if (p) modalDesc.innerHTML += `<p>${p.textContent}</p>`;
      }
    }
  };

  const closeCertificateModal = () => {
    if (modal) {
      modal.style.display = "none";
      if (pageWrapper) pageWrapper.style.filter = "none";
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  };

  document
    .querySelectorAll(".portfolio-item.certif .portfolio-item-inner img")
    .forEach((img) => {
      img.addEventListener("click", function () {
        openCertificateModal(this);
      });
    });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCertificateModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeCertificateModal();
      }
    });
  }
});

window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
