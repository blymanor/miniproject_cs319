document.addEventListener('DOMContentLoaded', () => {
  // --- Helpers ---
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // ---------- Navigation ----------
  const navLinks = $$('.nav-link');
  const sections = $$('.page-section');
  const mobileMenuBtn = $('#mobile-menu-button');
  const mobileMenu = $('#mobile-menu');

  function setActiveLink(targetId) {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === targetId));
  }

  function showPage(targetId) {
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(targetId) || document.getElementById('home');
    target.classList.add('active');
    setActiveLink(target.id);
    mobileMenu.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.hash.substring(1) !== target.id) location.hash = target.id;
  }
  window.showPage = showPage;

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.target);
    });
  });

  window.addEventListener('hashchange', () => {
    showPage(location.hash.substring(1) || 'home');
  });

  showPage(location.hash.substring(1) || 'home');

  mobileMenuBtn.addEventListener('click', () => {
    const expanded = mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
  });

  // ---------- Modals (Message / Job / Course) ----------
  const messageModal = $('#messageModal');
  const modalText = $('#modalMessageText');
  const modalClose = $('#modalCloseButton');

  function openModal(el) { document.body.classList.add('no-scroll'); el.classList.remove('hidden'); }
  function closeModal(el) { el.classList.add('hidden'); document.body.classList.remove('no-scroll'); }
  function showMessage(msg) { modalText.textContent = msg; openModal(messageModal); }

  modalClose.addEventListener('click', () => closeModal(messageModal));
  messageModal.addEventListener('click', (e) => { if (e.target === messageModal) closeModal(messageModal); });

  // --- Job Detail ---
  const jobDetails = {
    'ux-ui-designer': {
                    title: 'UX/UI Designer - Innovate Hub Corp.',
                    content: `
            <div class="space-y-6">
              <!-- Info Cards -->
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-building text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">บริษัท</p>
                    <p>Innovate Hub Corp.</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-map-marker-alt text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">สถานที่</p>
                    <p>อโศก</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-money-bill text-green-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">เงินเดือน</p>
                    <p class="text-green-600 font-semibold">65,000-110,000 บาท</p>
                  </div>
                </div>
              </div>
    
              <!-- Responsibilities -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-clipboard-check text-blue-600 mr-2"></i> ความรับผิดชอบหลัก
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>ออกแบบ UX/UI ให้ใช้งานง่าย สวยงาม และตอบโจทย์ผู้ใช้</li>
                  <li>ทำ Wireframe, Mockup, Prototype ด้วย Figma หรือ Adobe XD</li>
                  <li>ทำงานร่วมกับทีม Product และ Developer เพื่อนำ Design ไปใช้จริง</li>
                  <li>ศึกษาและปรับปรุงจาก Feedback และ Usability Test</li>
                </ul>
              </div>
    
              <!-- Qualifications -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-user-graduate text-indigo-600 mr-2"></i> คุณสมบัติที่ต้องการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>ปริญญาตรีด้านออกแบบหรือสาขาที่เกี่ยวข้อง</li>
                  <li>มีประสบการณ์ 1–2 ปี (หรือมี Portfolio ที่โดดเด่น)</li>
                  <li>ใช้เครื่องมือออกแบบได้คล่อง เช่น Figma, Adobe XD</li>
                  <li>เข้าใจหลักการ UX, Usability, Responsive Design</li>
                  <li>มีทักษะการสื่อสารและทำงานเป็นทีม</li>    
                </ul>
              </div>
    
              <!-- Benefits -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-gift text-green-600 mr-2"></i> สวัสดิการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>เครื่องคอมพิวเตอร์และซอฟต์แวร์ที่จำเป็น</li>
                  <li>WFH 2 วัน/สัปดาห์</li>
                  <li>ทุนสนับสนุนการเรียนรู้และ Tech Conference</li>
                  <li>โบนัสตามผลงานและการเติบโตของบริษัท</li>
                </ul>
              </div>
            </div>
          `
                },
                'frontend-developer': {
                    title: 'Frontend Developer - Creative Tech Inc.',
                    content: `
            <div class="space-y-6">
              <!-- Info Cards -->
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-building text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">บริษัท</p>
                    <p>Creative Tech Inc.</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-map-marker-alt text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">สถานที่</p>
                    <p>สุขุมวิท</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-money-bill text-green-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">เงินเดือน</p>
                    <p class="text-green-600 font-semibold">75,000-150,000 บาท</p>
                  </div>
                </div>
              </div>
    
              <!-- Responsibilities -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-clipboard-check text-blue-600 mr-2"></i> ความรับผิดชอบหลัก
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>ออกแบบและสร้าง User Interface ที่ใช้งานง่ายและตอบสนองได้ดีบนทุกอุปกรณ์</li>
                  <li>ทำงานร่วมกับทีม UX/UI เพื่อแปลง Mockup เป็นโค้ดที่ใช้งานได้จริง</li>
                  <li>เสนอแนะวิธีการปรับปรุงกระบวนการพัฒนาและโปรเจกต์ในอนาคต</li>
                </ul>
              </div>
    
              <!-- Qualifications -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-user-graduate text-indigo-600 mr-2"></i> คุณสมบัติที่ต้องการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>ปริญญาตรี/โท สาขาวิทยาการคอมพิวเตอร์หรือที่เกี่ยวข้อง</li>
                  <li>ประสบการณ์ 2+ ปีในการพัฒนาเว็บด้วย JavaScript Frameworks (ยินดีรับนักศึกษาจบใหม่)</li>
                  <li>เชี่ยวชาญ React/Vue/Angular, HTML5, CSS3, JavaScript</li>
                  <li>เข้าใจ Responsive Design และ Cross-browser</li>
                </ul>
              </div>
    
              <!-- Benefits -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-gift text-green-600 mr-2"></i> สวัสดิการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>เครื่องคอมพิวเตอร์สเปคสูงและซอฟต์แวร์ที่จำเป็น</li>
                  <li>WFH 2 วัน/สัปดาห์</li>
                  <li>ทุนสนับสนุนการเรียนรู้และ Tech Conference</li>
                  <li>โบนัสตามผลงานและการเติบโตของบริษัท</li>
                </ul>
              </div>
            </div>
          `
                },
                'data-scientist': {
                    title: 'Data Scientist - Data Insights Corp.',
                    content: `
            <div class="space-y-6">
              <!-- Info Cards -->
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-building text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">บริษัท</p>
                    <p>Data Insights Corp.</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-map-marker-alt text-blue-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">สถานที่</p>
                    <p>สีลม</p>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <i class="fas fa-money-bill text-green-600"></i>
                  <div>
                    <p class="text-sm text-gray-500">เงินเดือน</p>
                    <p class="text-green-600 font-semibold">90,000-180,000 บาท</p>
                  </div>
                </div>
              </div>
    
              <!-- Responsibilities -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-clipboard-check text-blue-600 mr-2"></i> ความรับผิดชอบหลัก
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>วิเคราะห์ข้อมูลขนาดใหญ่พื่อค้นหาแนวโน้มและข้อมูลเชิงลึกทางธุรกิจ</li>
                  <li>สร้างและพัฒนาโมเดล Machine Learning</li>
                  <li>ทำ Visualization และรายงานเชิงธุรกิจ</li>
                </ul>
              </div>
    
              <!-- Qualifications -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-user-graduate text-indigo-600 mr-2"></i> คุณสมบัติที่ต้องการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>ปริญญาตรี/โท สาขาวิทยาการคอมพิวเตอร์, สถิติ, คณิตศาสตร์ หรือที่เกี่ยวข้อง</li>
                  <li>ประสบการณ์ 2+ ปีในสาย Data Science หรือ Data Analysis(ยินดีรับนักศึกษาจบใหม่)</li>
                  <li>เชี่ยวชาญ Python (Pandas, Scikit-learn, Matplotlib) และ SQL</li>
                  <li>ความรู้ด้านสถิติและ Machine Learning / Deep Learning</li>
                  <li>สามารถใช้เครื่องมือ BI เช่น Tableau หรือ Power BI</li>
                </ul>
              </div>
    
              <!-- Benefits -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-gift text-green-600 mr-2"></i> สวัสดิการ
                </h3>
                <ul class="list-disc list-inside pl-1 space-y-1 text-sm">
                  <li>เครื่องคอมพิวเตอร์สเปคสูงสำหรับการวิเคราะห์ข้อมูล</li>
                  <li>WFH 2 วัน/สัปดาห์</li>
                  <li>ทุนการศึกษาสำหรับหลักสูตร Data Science</li>
                  <li>โบนัสตามผลงานและการเติบโตของบริษัท</li>
                </ul>
              </div>
            </div>
          `
                }
  };

  const jobModal = $('#jobModal');
  const jobModalTitle = $('#jobModalTitle');
  const jobModalContent = $('#jobModalContent');
  const jobModalClose = $('#jobModalClose');
  const applyJobBtn = $('#applyJobBtn');

  $$('.job-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.job;
      const detail = jobDetails[key];
      if (detail) {
        jobModalTitle.textContent = detail.title;
        jobModalContent.innerHTML = detail.content;
        openModal(jobModal);
      }
    });
  });
  jobModalClose.addEventListener('click', () => closeModal(jobModal));
  jobModal.addEventListener('click', (e) => { if (e.target === jobModal) closeModal(jobModal); });

  const regForm = $('#registrationForm');
  applyJobBtn.addEventListener('click', () => {
    closeModal(jobModal);
    regForm.scrollIntoView({ behavior: 'smooth' });
  });

  // ---------- Training: ดูรายละเอียดคอร์ส ----------
  $$('.course-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = btn.dataset.course ? `course-${btn.dataset.course}` : null;
      if (pageId) showPage(pageId);
    });
  });

  // ---------- Course Modal ----------
  const courseModal = $('#courseModal');
  const courseModalClose = $('#courseModalClose');
  const courseForm = $('#courseForm');

  $$('section[id^="course-"] button').forEach(btn => {
    if (btn.textContent.trim().includes('สมัครเรียนเลย')) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal(courseModal);
      });
    }
  });
  courseModalClose.addEventListener('click', () => closeModal(courseModal));
  courseModal.addEventListener('click', (e) => { if (e.target === courseModal) closeModal(courseModal); });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [messageModal, jobModal, courseModal].forEach(m => m && !m.classList.contains('hidden') && closeModal(m));
    }
  });

  // ---------- Helpers (forms) ----------
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^0\d{9}$/;
  const normalizePhone = v => (v || '').replace(/[^\d]/g, '');

  function showError(el, msg) {
    const err = el.nextElementSibling;
    el.classList.add('border-red-500');
    if (err) err.textContent = msg;
  }
  function clearError(el) {
    const err = el.nextElementSibling;
    el.classList.remove('border-red-500');
    if (err) err.textContent = '';
  }

  // ---------- Registration Form Validation ----------
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    const fields = {
      fname: regForm.elements.firstname,
      lname: regForm.elements.lastname,
      email: regForm.elements.email,
      phone: regForm.elements.phone,
      education: regForm.elements.education,
      address: regForm.elements.address
    };

    Object.values(fields).forEach(clearError);

    if (!fields.fname.value.trim()) { showError(fields.fname, 'กรุณากรอกชื่อจริง'); ok = false; }
    if (!fields.lname.value.trim()) { showError(fields.lname, 'กรุณากรอกนามสกุล'); ok = false; }

    if (!fields.email.value.trim()) { showError(fields.email, 'กรุณากรอกอีเมล'); ok = false; }
    else if (!emailRe.test(fields.email.value.trim())) { showError(fields.email, 'รูปแบบอีเมลไม่ถูกต้อง'); ok = false; }

    const phone = normalizePhone(fields.phone.value);
    if (!phone) { showError(fields.phone, 'กรุณากรอกเบอร์โทรศัพท์'); ok = false; }
    else if (!phoneRe.test(phone)) { showError(fields.phone, 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก และขึ้นต้นด้วย 0'); ok = false; }

    if (!fields.education.value) { showError(fields.education, 'กรุณาเลือกระดับการศึกษา'); ok = false; }
    if (!fields.address.value.trim()) { showError(fields.address, 'กรุณากรอกที่อยู่'); ok = false; }

    if (ok) { showMessage('ส่งข้อมูลการลงทะเบียนเรียบร้อยแล้ว!'); regForm.reset(); }
    else { showMessage('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง'); }
  });

  // ---------- Contact Form Validation ----------
  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    const fields = {
      name: contactForm.elements.contact_name,
      email: contactForm.elements.contact_email,
      subject: contactForm.elements.contact_subject
    };
    Object.values(fields).forEach(clearError);

    if (!fields.name.value.trim()) { showError(fields.name, 'กรุณากรอกชื่อ'); ok = false; }
    if (!fields.email.value.trim()) { showError(fields.email, 'กรุณากรอกอีเมล'); ok = false; }
    else if (!emailRe.test(fields.email.value.trim())) { showError(fields.email, 'รูปแบบอีเมลไม่ถูกต้อง'); ok = false; }
    if (!fields.subject.value.trim()) { showError(fields.subject, 'กรุณากรอกข้อความ'); ok = false; }

    if (ok) { showMessage('ส่งข้อความของคุณเรียบร้อยแล้ว!'); contactForm.reset(); }
    else { showMessage('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง'); }
  });

  // ---------- Course Form Validation ----------
  courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    courseForm.querySelectorAll('input, select').forEach(el => {
      const msg = el.nextElementSibling;
      if (msg) msg.textContent = '';
      if (!el.value.trim()) {
        if (msg) msg.textContent = 'กรุณากรอกข้อมูล';
        ok = false;
      } else if (el.name === 'email' && !emailRe.test(el.value.trim())) {
        if (msg) msg.textContent = 'อีเมลไม่ถูกต้อง';
        ok = false;
      } else if (el.name === 'phone' && !phoneRe.test(normalizePhone(el.value))) {
        if (msg) msg.textContent = 'เบอร์โทรต้องมี 10 หลัก และขึ้นต้นด้วย 0';
        ok = false;
      }
    });
    if (ok) {
      showMessage('ส่งข้อมูลสมัครเรียนเรียบร้อยแล้ว!');
      closeModal(courseModal);
      courseForm.reset();
    }
  });
});

