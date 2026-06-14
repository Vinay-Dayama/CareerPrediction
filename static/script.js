/* ================================================
   AI Career Guidance — script.js
   GSAP-powered animations (CDN loaded in index.html)
   ================================================ */

/* ─────────────────────────────────────────────────
   PAGE NAVIGATION
───────────────────────────────────────────────── */
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

/* ─────────────────────────────────────────────────
   ROLE SELECTION
───────────────────────────────────────────────── */
function handleRoleSelect() {
  var role  = document.getElementById('role-select').value;
  var errEl = document.getElementById('role-error');
  if (!role) { errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';
  var pageMap = {
    student:       'page-student',
    undergraduate: 'page-undergraduate',
    working:       'page-working'
  };
  goTo(pageMap[role]);
}

/* ─────────────────────────────────────────────────
   SCORE VALIDATION  (>100 shows error)
───────────────────────────────────────────────── */
function attachScoreValidation() {
  document.querySelectorAll('.score-field').forEach(function(input) {
    input.addEventListener('input', function() {
      var val   = parseFloat(this.value);
      var errEl = document.getElementById('err_' + this.id);
      if (!errEl) return;
      if (this.value !== '' && val > 100) {
        this.classList.add('error');
        errEl.classList.add('visible');
      } else {
        this.classList.remove('error');
        errEl.classList.remove('visible');
      }
    });
  });

  var cgpaInput = document.getElementById('u_cgpa');
  if (cgpaInput) {
    cgpaInput.addEventListener('input', function() {
      var val   = parseFloat(this.value);
      var errEl = document.getElementById('err_u_cgpa');
      if (this.value !== '' && val > 10) {
        this.classList.add('error');
        errEl.classList.add('visible');
      } else {
        this.classList.remove('error');
        errEl.classList.remove('visible');
      }
    });
  }
}

/* ─────────────────────────────────────────────────
   THOUGHT BUBBLE TEXT CYCLE  (GSAP powered)
───────────────────────────────────────────────── */
function cycleThoughtText() {
  var thoughts = [
    'Science stream? 🤔',
    'Commerce maybe? 🧐',
    'Engineering? 😰',
    'Arts vs Science? 😵',
    'What career suits me? 🌀',
    'MBA or job? 🫠',
  ];
  var el    = document.getElementById('thought-text');
  var index = 0;
  if (!el) return;

  setInterval(function() {
    gsap.to(el, {
      opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',
      onComplete: function() {
        index = (index + 1) % thoughts.length;
        el.textContent = thoughts[index];
        gsap.fromTo(el,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }
    });
  }, 2600);
}

/* ─────────────────────────────────────────────────
   GSAP LANDING PAGE ANIMATIONS
───────────────────────────────────────────────── */
function initLandingAnimations() {

  /* ── Register GSAP plugins ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. HERO TEXT  — staggered entrance ── */
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.brand-badge',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7 }
  )
  .fromTo('.landing-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.75 },
    '-=0.4'
  )
  .fromTo('.landing-sub',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.65 },
    '-=0.45'
  )
  .fromTo('.landing-cta-area',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  )
  .fromTo('.landing-scene',
    { opacity: 0, x: 50, scale: 0.92 },
    { opacity: 1, x: 0,  scale: 1, duration: 0.9, ease: 'power2.out' },
    '-=0.85'
  );

  /* ── 2. BACKGROUND BLOBS  — slow morphing float ── */
  var landingBg = document.querySelector('.landing-bg');
  if (landingBg) {
    var blob1 = document.createElement('div');
    blob1.className = 'gsap-blob blob-1';
    landingBg.appendChild(blob1);

    var blob2 = document.createElement('div');
    blob2.className = 'gsap-blob blob-2';
    landingBg.appendChild(blob2);

    var blob3 = document.createElement('div');
    blob3.className = 'gsap-blob blob-3';
    landingBg.appendChild(blob3);

    /* Blob 1 — top right, large blue */
    gsap.set(blob1, { x: -60, y: -100 });
    gsap.to(blob1, {
      x: 40, y: -40, scale: 1.15,
      duration: 9, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });

    /* Blob 2 — bottom left, lighter */
    gsap.set(blob2, { x: 20, y: 30 });
    gsap.to(blob2, {
      x: -30, y: -60, scale: 1.1, rotate: 25,
      duration: 11, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });

    /* Blob 3 — center, small accent  */
    gsap.set(blob3, { x: -20, y: 20, opacity: 0.5 });
    gsap.to(blob3, {
      x: 60, y: -30, scale: 1.2, opacity: 0.8,
      duration: 7, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });

    /* ── 3. FLOATING PARTICLES  — random dots in background ── */
    for (var i = 0; i < 18; i++) {
      var dot = document.createElement('div');
      dot.className = 'gsap-particle';
      landingBg.appendChild(dot);

      var startX = gsap.utils.random(0, window.innerWidth);
      var startY = gsap.utils.random(0, window.innerHeight);
      var size   = gsap.utils.random(4, 14);
      var dur    = gsap.utils.random(6, 14);
      var delay  = gsap.utils.random(0, 6);

      gsap.set(dot, {
        x: startX, y: startY,
        width: size, height: size,
        opacity: gsap.utils.random(0.15, 0.5)
      });

      gsap.to(dot, {
        x: '+=' + gsap.utils.random(-120, 120),
        y: '+=' + gsap.utils.random(-120, 120),
        opacity: gsap.utils.random(0.05, 0.4),
        duration: dur,
        delay: delay,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }
  }

  /* ── 4. SVG STUDENT CHARACTER  — GSAP timelines per part ── */
  if(document.getElementById('student-head')) {
    gsap.to('#student-head', {
      rotate: -8, transformOrigin: '220px 175px',
      duration: 1.6, ease: 'power1.inOut',
      yoyo: true, repeat: -1
    });
  }

  if(document.getElementById('student-body')) {
    gsap.to('#student-body', {
      y: 3, duration: 1.6, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });
  }

  if(document.getElementById('student-eyes')) {
    gsap.to('#student-eyes', {
      scaleY: 0.05, transformOrigin: '220px 148px',
      duration: 0.08, ease: 'power4.in',
      yoyo: true, repeat: -1,
      repeatDelay: 3.5
    });
  }

  if(document.getElementById('desk-pencil')) {
    gsap.to('#desk-pencil', {
      rotate: -14, transformOrigin: '310px 235px',
      duration: 0.5, ease: 'power2.inOut',
      yoyo: true, repeat: -1, repeatDelay: 0.4
    });
  }

  if(document.getElementById('books-stack')) {
    gsap.to('#books-stack', {
      skewX: -2, transformOrigin: '109px 210px',
      duration: 2.2, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });
  }

  if(document.getElementById('lamp-glow')) {
    gsap.to('#lamp-glow', {
      attr: { r: 36 }, opacity: 0.7,
      duration: 2, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });
  }

  /* ── 5. FLOATING QUESTION MARKS  — independent GSAP loops ── */
  function floatQMark(id, xEnd, yEnd, rotEnd, delay) {
    var el = document.getElementById(id);
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 0 });
    gsap.timeline({ repeat: -1, delay: delay })
      .to(el, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .to(el, {
        y: yEnd, x: xEnd, rotate: rotEnd, opacity: 0,
        duration: 2.4, ease: 'power1.inOut'
      })
      .set(el, { y: 0, x: 0, rotate: 0, opacity: 0 })
      .to({}, { duration: gsap.utils.random(0.3, 1) });
  }

  floatQMark('q-mark-1', -12, -55, -18, 0.2);
  floatQMark('q-mark-2',  16, -60,  14, 1.2);
  floatQMark('q-mark-3',   4, -52,  -6, 2.3);

  /* ── 6. THOUGHT BUBBLE  — float + pop in ── */
  if(document.querySelector('.thought-bubble')) {
    gsap.fromTo('.thought-bubble',
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1,   y: 0, duration: 0.7, delay: 1.2, ease: 'back.out(1.8)' }
    );
  }
  if(document.querySelector('.thought-text')) {
    gsap.to('.thought-text', {
      y: -6, duration: 2.2, ease: 'sine.inOut',
      yoyo: true, repeat: -1
    });
  }

  /* ── 7. CTA BUTTON  — heartbeat pulse on idle ── */
  if(document.querySelector('.btn-primary')) {
    gsap.to('.btn-primary', {
      boxShadow: '0 8px 36px rgba(37,99,235,0.55)',
      scale: 1.04,
      duration: 1.1, ease: 'sine.inOut',
      yoyo: true, repeat: -1, delay: 2
    });
  }

  /* ── Start thought text cycling ── */
  cycleThoughtText();
}

/* ─────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  attachScoreValidation();
  initLandingAnimations();
});

/* ─────────────────────────────────────────────────
   TOGGLE FIELD (for conditional field display)
───────────────────────────────────────────────── */
function toggleField(wrapperId) {
  var wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  // Determine which select triggered this
  var selectId = '';
  if (wrapperId === 'u_internships_wrapper') {
    selectId = 'u_internships_yn';
  } else if (wrapperId === 'u_projects_wrapper') {
    selectId = 'u_projects_yn';
  } else if (wrapperId === 'u_certs_wrapper') {
    selectId = 'u_certs_yn';
  }

  var selectElement = document.getElementById(selectId);
  if (selectElement && selectElement.value === 'yes') {
    wrapper.style.display = 'block';
  } else {
    wrapper.style.display = 'none';
  }
}

/* ==========================================
   CAREER AI INTEGRATION
========================================== */

function showLoading() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) { overlay.style.display = 'flex'; }
}

function hideLoading() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) { overlay.style.display = 'none'; }
}

async function sendPrediction(role, formData) {

    showLoading();

    try {

        const response = await fetch(
            "/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role: role,
                    data: formData
                })
            }
        );

        const result = await response.json();

        if (!result.success) {
            hideLoading();
            alert(result.error);
            return;
        }

        localStorage.setItem(
            "career_result",
            JSON.stringify(result.result)
        );

        window.location.href = "/result";

    } catch (error) {

        hideLoading();
        console.error(error);

        alert(
            "Something went wrong while generating prediction."
        );
    }
}


/* ---------- STUDENT ---------- */

const studentBtn =
document.getElementById("guide-btn-student");

if (studentBtn) {

    studentBtn.addEventListener(
        "click",
        async function () {

            const data = {

                maths_score:
                    document.getElementById("s_maths").value,

                science_score:
                    document.getElementById("s_science").value,

                english_score:
                    document.getElementById("s_english").value,

                overall_percentage:
                    document.getElementById("s_overall").value,

                logical_reasoning:
                    document.getElementById("s_logical").value,

                hobby:
                    document.getElementById("s_hobby").value,

                communication:
                    document.getElementById("s_comm").value,

                favourite_subject:
                    document.getElementById("s_fav_subject").value
            };

            await sendPrediction(
                "student",
                data
            );
        }
    );
}


/* ---------- UNDERGRAD ---------- */

const ugBtn =
document.getElementById("guide-btn-up");

if (ugBtn) {

    ugBtn.addEventListener(
        "click",
        async function () {

            const data = {

                cgpa:
                    document.getElementById("u_cgpa").value,

                coding_score:
                    document.getElementById("u_coding").value,

                aptitude_score:
                    document.getElementById("u_aptitude").value,

                communication_score:
                    document.getElementById("u_comm").value,

                internships_yn:
                    document.getElementById("u_internships_yn").value,

                internships:
                    document.getElementById("u_internships_count").value,

                internships_field:
                    document.getElementById("u_internships_field").value,

                projects_yn:
                    document.getElementById("u_projects_yn").value,

                projects:
                    document.getElementById("u_projects_count").value,

                projects_field:
                    document.getElementById("u_projects_field").value,

                certifications_yn:
                    document.getElementById("u_certs_yn").value,

                certifications:
                    document.getElementById("u_certs_count").value,

                certifications_field:
                    document.getElementById("u_certs_field").value,

                best_project_abstract:
                    document.getElementById("u_best_project_abstract").value,

                college_tier:
                    document.getElementById("u_college_tier").value,

                specialization:
                    document.getElementById("u_specialization").value
            };

            await sendPrediction(
                "undergraduate",
                data
            );
        }
    );
}


/* ---------- WORKING ---------- */

const workBtn =
document.getElementById("guide-btn-work");

if (workBtn) {

    workBtn.addEventListener(
        "click",
        async function () {

            const data = {

                experience:
                    document.getElementById("w_exp").value,

                salary:
                    document.getElementById("w_salary").value,

                promotions:
                    document.getElementById("w_promotions").value,

                technical_skill:
                    document.getElementById("w_technical").value,

                leadership_skill:
                    document.getElementById("w_leadership").value,

                communication_skill:
                    document.getElementById("w_comm").value,

                field_exploration:
                    document.getElementById("w_field_exploration").value,

                best_project_abstract:
                    document.getElementById("w_best_project_abstract").value
            };

            await sendPrediction(
                "working",
                data
            );
        }
    );
}