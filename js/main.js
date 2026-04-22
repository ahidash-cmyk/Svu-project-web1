// ==========================
// 🔍 فلترة صفحة الفعاليات
// ==========================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");
const cards = document.querySelectorAll(".event-card");

function filterEvents() {
  if (!searchInput) return;

  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const date = dateFilter.value;

  cards.forEach(card => {
    const title = card.querySelector(".card-title").innerText.toLowerCase();
    const cardCategory = card.dataset.category;
    const cardDate = card.dataset.date;

    let match = true;

    if (search && !title.includes(search)) match = false;
    if (category && category !== cardCategory) match = false;
    if (date && date !== cardDate) match = false;

    card.style.display = match ? "block" : "none";
  });
}

if (searchInput) {
  searchInput.addEventListener("input", filterEvents);
  categoryFilter.addEventListener("change", filterEvents);
  dateFilter.addEventListener("change", filterEvents);
}



// ==========================
// 📄 صفحة التفاصيل (Details)
// ==========================

const eventsData = [
  {
    id: 1,
    title: "ورشة React",
    date: "20-04-2026",
    location: "أونلاين",
    category: "تقنية",
    description: "ورشة تطبيقية لتعلم React من الصفر حتى بناء مشروع كامل.",
    image: "../images/event1.jpg"
  },
  {
    id: 2,
    title: "ندوة ثقافية",
    date: "22-04-2026",
    location: "دمشق",
    category: "ثقافة",
    description: "ندوة تناقش قضايا ثقافية مع مجموعة من المختصين.",
    image: "../images/event2.jpg"
  },
  {
  id: 3,
  title: "بطولة رياضية",
  date: "25-04-2026",
  location: "دمشق",
  category: "رياضة",
  description: "فعالية رياضية لطلاب الجامعة.",
  image: "../images/event3.jpg"
},
{
  id: 4,
  title: "ورشة تصميم UI",
  date: "28-04-2026",
  location: "أونلاين",
  category: "تقنية",
  description: "تعلم أساسيات تصميم الواجهات.",
  image: "../images/event4.jpg"
}
];

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

if (eventId) {
  const event = eventsData.find(e => e.id == eventId);

  if (event) {
    const container = document.getElementById("eventDetails");

    if (container) {
      container.innerHTML = `
        <div class="col-md-6">
          <img src="${event.image}" class="img-fluid rounded">
        </div>

        <div class="col-md-6">
          <h2>${event.title}</h2>
          <p>📅 ${event.date}</p>
          <p>📍 ${event.location}</p>
          <p>📂 ${event.category}</p>
          <p>${event.description}</p>

          <a href="events.html" class="btn btn-secondary mt-3">العودة للفعاليات</a>
        </div>
      `;
    }
  }
}



// ==========================
// 📩 Contact Form Validation
// ==========================

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const alertBox = document.getElementById("alertBox");

    if (!name || !email || !message) {
      alertBox.innerHTML = `
        <div class="alert alert-danger">
          يرجى تعبئة جميع الحقول
        </div>
      `;
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
      alertBox.innerHTML = `
        <div class="alert alert-danger">
          صيغة البريد الإلكتروني غير صحيحة
        </div>
      `;
      return;
    }

    alertBox.innerHTML = `
      <div class="alert alert-success">
        تم إرسال رسالتك بنجاح ✅
      </div>
    `;

    form.reset();
  });
}