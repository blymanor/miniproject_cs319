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
    /* (รายละเอียด object jobDetails เดิม คงไว้ทั้งหมด) */
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
