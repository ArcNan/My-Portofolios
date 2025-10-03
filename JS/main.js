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

// Clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// Hero Type Effect
const typed = document.querySelector(".typed");

if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 40,
    backSpeed: 30,
    backDelay: 1100,
  });
}

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
const nav = document.querySelector(".nav");

// Get the offset position of the navbar
if (nav) {
  // PERBAIKAN: Ambil posisi offset dari nav
  const stickyOffset = nav.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  const handleScroll = () => {
    // Tambah atau hapus class 'sticky' berdasarkan posisi scroll
    if (window.pageYOffset >= stickyOffset) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };

  // Clear form before unload
  window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
      form.reset();
    }
  };

  // Tambahkan event listener ke window
  window.addEventListener("scroll", handleScroll);
}
