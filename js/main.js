// ==========================
// 📦 بيانات الفعاليات
// ==========================
const eventsData = [
  {
    id: 1,
    title: "ورشة React",
    date: "2026-04-20",
    location: "أونلاين",
    category: "تقنية",
    description: "تعلم React من الصفر",
    image: "assets/Reactimg2.jpeg"
  },
  {
    id: 2,
    title: "ندوة ثقافية",
    date: "2026-04-22",
    location: "دمشق",
    category: "ثقافة",
    description: "مناقشة قضايا ثقافية",
    image: "assets/Culture1.jpg"
  },
  {
    id: 3,
    title: "بطولة رياضية",
    date: "2026-04-25",
    location: "حلب",
    category: "رياضة",
    description: "نشاطات رياضية طلابية",
    image: "assets/Sport1.jpeg"
  },
  {
    id: 4,
    title: "ورشة UI/UX",
    date: "2026-04-28",
    location: "أونلاين",
    category: "تقنية",
    description: "تصميم واجهات المستخدم",
    image: "assets/uiux.jpg"
  },
  {
    id: 5,
    title: "أمسية موسيقية",
    date: "2026-05-01",
    location: "دمشق",
    category: "موسيقى",
    description: "حفلة طلابية",
    image: "assets/musical.jpg"
  },
  {
    id: 6,
    title: "ملتقى طلابي",
    date: "2026-05-03",
    location: "حمص",
    category: "عائلي",
    description: "أنشطة وتعارف",
    image: "images/event6.jpg"
  }
];


// ==========================
// 🎯 Slider (Index) - يدوي
// ==========================
const latestContainer = document.getElementById("latestEventsContainer");

if (latestContainer) {

  let slides = [];

  // تقسيم كل 3 فعاليات
  for (let i = 0; i < eventsData.length; i += 3) {
    slides.push(eventsData.slice(i, i + 3));
  }

  latestContainer.innerHTML = slides.map((group, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <div class="row g-4 justify-content-center">

        ${group.map(event => `
          <div class="col-md-4 col-sm-6">
            <div class="card h-100 text-center">

              <img src="${event.image}" class="card-img-top">

              <div class="card-body">
                <h6>${event.title}</h6>

                <a href="pages/event-details.html?id=${event.id}" 
                   class="btn btn-primary mt-2">
                   عرض التفاصيل
                </a>

              </div>

            </div>
          </div>
        `).join("")}

      </div>
    </div>
  `).join("");
}


// ==========================
// 📄 صفحة الفعاليات (events)
// ==========================
const eventsContainer = document.getElementById("eventsContainer");

function renderEvents(data) {
  if (!eventsContainer) return;

  eventsContainer.innerHTML = data.map(event => `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4 event-card"
         data-category="${event.category}"
         data-date="${event.date}">

      <div class="card h-100">

        <img src="../${event.image}" class="card-img-top">

        <div class="card-body">
          <h5>${event.title}</h5>
          <p>📅 ${event.date}</p>
          <p>📍 ${event.location}</p>
          <p>📂 ${event.category}</p>
          <p>${event.description}</p>

          <a href="event-details.html?id=${event.id}" 
             class="btn btn-primary">
             عرض التفاصيل
          </a>

        </div>

      </div>
    </div>
  `).join("");
}

// تحميل أولي
renderEvents(eventsData);


// ==========================
// 🔍 الفلترة
// ==========================
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

function filterEvents() {
  let filtered = eventsData;

  const search = searchInput?.value.toLowerCase();
  const category = categoryFilter?.value;
  const date = dateFilter?.value;

  if (search) {
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(search)
    );
  }

  if (category) {
    filtered = filtered.filter(e => e.category === category);
  }

  if (date) {
    filtered = filtered.filter(e => e.date === date);
  }

  renderEvents(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", filterEvents);
  categoryFilter.addEventListener("change", filterEvents);
  dateFilter.addEventListener("change", filterEvents);
}


// ==========================
// 📄 صفحة التفاصيل
// ==========================
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

if (eventId) {
  const event = eventsData.find(e => e.id == eventId);
  const container = document.getElementById("eventDetails");

  if (event && container) {
    container.innerHTML = `
      <div class="col-md-6">
        <img src="../${event.image}" class="img-fluid rounded shadow">
      </div>

      <div class="col-md-6">
        <h2>${event.title}</h2>
        <p>📅 ${event.date}</p>
        <p>📍 ${event.location}</p>
        <p>📂 ${event.category}</p>
        <p>${event.description}</p>

        <a href="events.html" class="btn btn-secondary mt-3">
          العودة للفعاليات
        </a>
      </div>
    `;
  }
}


// ==========================
// 📩 Contact Form
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
      alertBox.innerHTML = `<div class="alert alert-danger">يرجى تعبئة جميع الحقول</div>`;
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
      alertBox.innerHTML = `<div class="alert alert-danger">البريد غير صحيح</div>`;
      return;
    }

    alertBox.innerHTML = `<div class="alert alert-success">تم الإرسال ✅</div>`;
    form.reset();
  });
}