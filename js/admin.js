/**
 * Admin CMS Controller - Full Professional Management Suite
 * جمعية البر الخيرية بالجله وتبراك (ترخيص رقم 210)
 * Complete Page-by-Page Management & Full Content Synchronization
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure data exists
  if (!window.siteData && typeof window.loadSiteData === "function") {
    window.siteData = window.loadSiteData();
  }

  initAdminNavigation();
  initAdminMobileSidebar();
  initSubtabs();
  makeTablesResponsive();
  renderAdminSvgIcons();
  renderOverviewStats();

  // Page 1: Home Page CMS
  renderHeroForm();
  renderBrandForm();

  // Page 2: Impact Page CMS
  renderImpactCurrentForm();
  renderImpactFiveForm();
  renderImpactSectorsTable();

  // Page 3: About & Governance & Financials CMS
  renderBoardTable();
  renderAssemblyList();
  renderCommitteesList();
  renderGovernancePoliciesList();
  renderFinancialReportsTable();
  renderAnnualReportsList();

  // Page 4: Strategic Programs CMS
  renderProgramsTable();

  // Page 5: Field Projects CMS
  renderProjectsImpactForm();
  renderProjectsTable();

  // Page 6: Store & Calculators CMS
  renderStoreDashboardForm();
  renderStoreFeaturedLinksTable();
  renderBanksTable();
  renderZakatCalculatorForm();
  renderImpactSimulatorForm();
  renderSimulationPresetsList();

  // Page 7: Vision & 2030 Goals CMS
  renderVisionMissionForm();
  renderVisionGoalsList();

  // Page 8: Contact & Media CMS
  renderExecutiveForm();
  renderSocialCampaignsList();

  // Shared Assets & Inboxes
  renderMediaManager();
  renderComplaintsInbox();
  renderVolunteersLog();
  initBackupAndRestore();
});

/* ==========================================================================
   1. Universal SVG Icons Injection & Navigation
   ========================================================================== */
function renderAdminSvgIcons() {
  document.querySelectorAll(".nav-icon[data-icon]").forEach(el => {
    const iconName = el.dataset.icon;
    if (window.getSvgIcon) {
      el.innerHTML = window.getSvgIcon(iconName, "", "18px");
    }
  });
}

function initAdminNavigation() {
  document.querySelectorAll(".admin-nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const panelId = item.dataset.panel;
      if (!panelId) return;

      document.querySelectorAll(".admin-nav-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".admin-panel").forEach(p => p.classList.remove("active"));

      item.classList.add("active");
      const targetPanel = document.getElementById(`panel-${panelId}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
        const titleElem = document.getElementById("admin-page-title");
        const labelSpan = item.querySelector("span:not(.nav-icon)");
        if (titleElem && labelSpan) {
          titleElem.textContent = labelSpan.textContent.trim();
        }
      }

      // Auto-close sidebar on mobile/tablet upon selection
      if (window.innerWidth <= 1024) {
        const sidebar = document.querySelector(".admin-sidebar");
        const backdrop = document.getElementById("admin-sidebar-backdrop");
        if (sidebar) sidebar.classList.remove("open");
        if (backdrop) backdrop.classList.remove("active");
      }
    });
  });
}

function initAdminMobileSidebar() {
  const toggleBtn = document.getElementById("admin-sidebar-toggle");
  const sidebar = document.querySelector(".admin-sidebar");
  const backdrop = document.getElementById("admin-sidebar-backdrop");

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      backdrop.classList.toggle("active");
    });

    backdrop.addEventListener("click", () => {
      sidebar.classList.remove("open");
      backdrop.classList.remove("active");
    });
  }
}

function makeTablesResponsive() {
  document.querySelectorAll(".admin-table").forEach(table => {
    if (!table.parentElement.classList.contains("admin-table-responsive")) {
      const wrapper = document.createElement("div");
      wrapper.className = "admin-table-responsive";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

function initSubtabs() {
  document.querySelectorAll(".admin-subtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const subtab = btn.dataset.subtab;
      const parentNav = btn.closest(".admin-subtabs-nav");
      const parentPanel = btn.closest(".admin-panel");
      if (!parentNav || !parentPanel) return;

      parentNav.querySelectorAll(".admin-subtab-btn").forEach(b => b.classList.remove("active"));
      parentPanel.querySelectorAll(".admin-subtab-content").forEach(c => c.style.display = "none");

      btn.classList.add("active");
      const target = document.getElementById(`subtab-panel-${subtab}`);
      if (target) target.style.display = "block";
    });
  });
}

function renderOverviewStats() {
  setElemText("stat-programs-count", (window.siteData.programs || []).length);
  setElemText("stat-projects-count", (window.siteData.seasonalProjects || []).length);
  setElemText("stat-board-count", (window.siteData.boardMembers || []).length);
  setElemText("stat-policies-count", (window.siteData.governancePolicies || []).length);
  setElemText("stat-financials-count", (window.siteData.financialReports || []).length);
  setElemText("stat-complaints-count", (window.siteData.complaintsInbox || []).length);
}

/* ==========================================================================
   2. PAGE 1: Home Page CMS (الهيرو، الصور والكلمة)
   ========================================================================== */
function renderHeroForm() {
  const h = window.siteData.hero || {};
  setVal("edit-hero-badge", h.badge || "");
  setVal("edit-hero-title", h.title || "");
  setVal("edit-hero-subtitle", h.subtitle || "");
  setVal("edit-hero-stat-years", h.statYears || "");
  setVal("edit-hero-stat-years-lbl", h.statYearsLabel || "");
  setVal("edit-hero-stat-villages", h.statVillages || "");
  setVal("edit-hero-stat-villages-lbl", h.statVillagesLabel || "");
  setVal("edit-hero-stat-beneficiaries", h.statBeneficiaries || "");
  setVal("edit-hero-stat-beneficiaries-lbl", h.statBeneficiariesLabel || "");
  setVal("edit-hero-cta1-text", h.primaryCtaText || "");
  setVal("edit-hero-cta1-link", h.primaryCtaLink || "");
  setVal("edit-hero-cta2-text", h.secondaryCtaText || "");
  setVal("edit-hero-cta2-link", h.secondaryCtaLink || "");

  const form = document.getElementById("form-edit-hero");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.hero) window.siteData.hero = {};
      const hero = window.siteData.hero;
      hero.badge = getVal("edit-hero-badge");
      hero.title = getVal("edit-hero-title");
      hero.subtitle = getVal("edit-hero-subtitle");
      hero.statYears = getVal("edit-hero-stat-years");
      hero.statYearsLabel = getVal("edit-hero-stat-years-lbl");
      hero.statVillages = getVal("edit-hero-stat-villages");
      hero.statVillagesLabel = getVal("edit-hero-stat-villages-lbl");
      hero.statBeneficiaries = getVal("edit-hero-stat-beneficiaries");
      hero.statBeneficiariesLabel = getVal("edit-hero-stat-beneficiaries-lbl");
      hero.primaryCtaText = getVal("edit-hero-cta1-text");
      hero.primaryCtaLink = getVal("edit-hero-cta1-link");
      hero.secondaryCtaText = getVal("edit-hero-cta2-text");
      hero.secondaryCtaLink = getVal("edit-hero-cta2-link");

      window.saveSiteData(window.siteData);
      showToast("تم حفظ وتحديث نصوص وإحصائيات الهيرو بنجاح!");
    };
  }

  // Previews
  const cadreImg = document.getElementById("admin-preview-hero-cadre");
  if (cadreImg && h.imageTeam) cadreImg.src = h.imageTeam;
  const bldgImg = document.getElementById("admin-preview-hero-bldg");
  if (bldgImg && h.imageBuilding) bldgImg.src = h.imageBuilding;
}

window.saveHeroCadrePhoto = function() {
  const fileInp = document.getElementById("hero-cadre-file");
  const urlInp = document.getElementById("hero-cadre-url");

  if (fileInp.files && fileInp.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      window.siteData.hero.imageTeam = evt.target.result;
      window.saveSiteData(window.siteData);
      document.getElementById("admin-preview-hero-cadre").src = evt.target.result;
      showToast("تم تحديث صورة الكوادر الجماعية في الهيرو بنجاح!");
    };
    reader.readAsDataURL(fileInp.files[0]);
  } else if (urlInp.value) {
    window.siteData.hero.imageTeam = urlInp.value.trim();
    window.saveSiteData(window.siteData);
    document.getElementById("admin-preview-hero-cadre").src = urlInp.value.trim();
    showToast("تم تحديث صورة الكوادر الجماعية في الهيرو بنجاح!");
  } else {
    alert("يرجى اختيار ملف صورة أو إدخال رابط URL لصورة الكوادر!");
  }
};

window.saveBuildingPhoto = function() {
  const fileInp = document.getElementById("building-photo-file");
  const urlInp = document.getElementById("building-photo-url");

  if (fileInp.files && fileInp.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      window.siteData.hero.imageBuilding = evt.target.result;
      window.saveSiteData(window.siteData);
      document.getElementById("admin-preview-hero-bldg").src = evt.target.result;
      showToast("تم تحديث صورة مقر الجمعية الرسمي بنجاح!");
    };
    reader.readAsDataURL(fileInp.files[0]);
  } else if (urlInp.value) {
    window.siteData.hero.imageBuilding = urlInp.value.trim();
    window.saveSiteData(window.siteData);
    document.getElementById("admin-preview-hero-bldg").src = urlInp.value.trim();
    showToast("تم تحديث صورة مقر الجمعية الرسمي بنجاح!");
  } else {
    alert("يرجى اختيار ملف أو وضع رابط URL لصورة المقر!");
  }
};

/* ==========================================================================
   3. PAGE 2: Impact Page CMS (الأثر ومؤشرات الأداء)
   ========================================================================== */
function renderImpactCurrentForm() {
  const cur = (window.siteData.impactDashboard && window.siteData.impactDashboard.currentYear) || {};
  setVal("kpi-edit-cur-total-cases", cur.beneficiariesTotal || "");
  setVal("kpi-edit-cur-disbursed", cur.totalDisbursed || "");
  setVal("kpi-edit-cur-families", cur.beneficiaryFamilies || "");
  setVal("kpi-edit-cur-villages", cur.villagesCovered || "");
  setVal("kpi-edit-cur-water", cur.waterBeneficiaries || "");
  setVal("kpi-edit-cur-orphans", cur.orphansSponsored || "");
  setVal("kpi-edit-cur-productive", cur.productiveFamiliesIncome || "");
  setVal("kpi-edit-cur-housing", cur.housingRenovationsCost || "");
  setVal("kpi-edit-cur-training", cur.trainingGraduates || "");
  setVal("kpi-edit-cur-disabled", cur.disabledAndElderly || "");
  setVal("kpi-edit-cur-iftar", cur.iftarMeals || "");
  setVal("kpi-edit-cur-clothing", cur.clothingBeneficiaries || "");
  setVal("kpi-edit-cur-zakat", cur.zakatDisbursed || "");

  const form = document.getElementById("form-edit-impact-current");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.impactDashboard) window.siteData.impactDashboard = {};
      if (!window.siteData.impactDashboard.currentYear) window.siteData.impactDashboard.currentYear = {};
      const c = window.siteData.impactDashboard.currentYear;

      c.beneficiariesTotal = getVal("kpi-edit-cur-total-cases");
      c.totalDisbursed = getVal("kpi-edit-cur-disbursed");
      c.beneficiaryFamilies = getVal("kpi-edit-cur-families");
      c.villagesCovered = getVal("kpi-edit-cur-villages");
      c.waterBeneficiaries = getVal("kpi-edit-cur-water");
      c.orphansSponsored = getVal("kpi-edit-cur-orphans");
      c.productiveFamiliesIncome = getVal("kpi-edit-cur-productive");
      c.housingRenovationsCost = getVal("kpi-edit-cur-housing");
      c.trainingGraduates = getVal("kpi-edit-cur-training");
      c.disabledAndElderly = getVal("kpi-edit-cur-disabled");
      c.iftarMeals = getVal("kpi-edit-cur-iftar");
      c.clothingBeneficiaries = getVal("kpi-edit-cur-clothing");
      c.zakatDisbursed = getVal("kpi-edit-cur-zakat");

      window.saveSiteData(window.siteData);
      showToast("تم تحديث مؤشرات أثر عام 2025 بنجاح!");
    };
  }
}

function renderImpactFiveForm() {
  const five = (window.siteData.impactDashboard && window.siteData.impactDashboard.fiveYears) || {};
  setVal("kpi-edit-five-total-cases", five.beneficiariesTotal || "");
  setVal("kpi-edit-five-disbursed", five.totalDisbursed || "");
  setVal("kpi-edit-five-families", five.beneficiaryFamilies || "");
  setVal("kpi-edit-five-water", five.waterBeneficiaries || "");
  setVal("kpi-edit-five-productive", five.productiveFamiliesIncome || "");
  setVal("kpi-edit-five-housing", five.housingRenovationsCost || "");
  setVal("kpi-edit-five-orphans", five.orphansSponsored || "");

  const form = document.getElementById("form-edit-impact-five");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.impactDashboard) window.siteData.impactDashboard = {};
      if (!window.siteData.impactDashboard.fiveYears) window.siteData.impactDashboard.fiveYears = {};
      const f = window.siteData.impactDashboard.fiveYears;

      f.beneficiariesTotal = getVal("kpi-edit-five-total-cases");
      f.totalDisbursed = getVal("kpi-edit-five-disbursed");
      f.beneficiaryFamilies = getVal("kpi-edit-five-families");
      f.waterBeneficiaries = getVal("kpi-edit-five-water");
      f.productiveFamiliesIncome = getVal("kpi-edit-five-productive");
      f.housingRenovationsCost = getVal("kpi-edit-five-housing");
      f.orphansSponsored = getVal("kpi-edit-five-orphans");

      window.saveSiteData(window.siteData);
      showToast("تم تحديث المؤشرات التراكمية لـ 5 سنوات بنجاح!");
    };
  }
}

function renderImpactSectorsTable() {
  const tbody = document.getElementById("admin-sectors-tbody");
  if (!tbody) return;

  const sectors = (window.siteData.impactDashboard && window.siteData.impactDashboard.currentYear && window.siteData.impactDashboard.currentYear.metrics) || [];
  tbody.innerHTML = sectors.map((sec, idx) => `
    <tr>
      <td style="font-weight: 700;">${sec.title}</td>
      <td style="color: var(--admin-primary); font-weight: 700;">${sec.casesCount || sec.count}</td>
      <td style="color: #475569; font-size: 0.85rem;">${sec.aidDescription || "-"}</td>
      <td style="color: #0F172A; font-weight: 600;">${sec.value}</td>
      <td><span class="badge badge-indigo">${sec.percent}%</span></td>
      <td><span class="badge badge-primary">${sec.badge || "قطاع رئيسي"}</span></td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditSectorModal(${idx})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteSector(${idx})">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddSectorModal = function() {
  const html = `
    <form id="modal-form-add-sector">
      <div class="admin-form-group">
        <label class="admin-label">اسم القطاع:</label>
        <input type="text" id="sec-add-title" class="admin-input" required placeholder="مثال: السلال الغذائية والتموين المباشر (كفاف)">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الحالات / الأسر المستفيدة:</label>
        <input type="text" id="sec-add-cases" class="admin-input" required placeholder="مثال: 750+ أسرة مستفيدة">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">طبيعة الدعم والمساعدة المقدمة:</label>
        <input type="text" id="sec-add-aid-desc" class="admin-input" placeholder="مثال: سلال غذائية شهرية وكوبونات شراء مباشر">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المبلغ المنصرف (ر.س):</label>
        <input type="text" id="sec-add-value" class="admin-input" required placeholder="مثال: 1,479,270 ر.س">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">النسبة المئوية (%):</label>
        <input type="number" id="sec-add-percent" class="admin-input" min="1" max="100" required placeholder="32">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوسم / التصنيف:</label>
        <input type="text" id="sec-add-badge" class="admin-input" placeholder="أسر مستورة">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة القطاع</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة قطاع صرف جديد", html);

  document.getElementById("modal-form-add-sector").onsubmit = function(e) {
    e.preventDefault();
    const newSec = {
      title: getVal("sec-add-title"),
      casesCount: getVal("sec-add-cases"),
      count: getVal("sec-add-cases"),
      aidDescription: getVal("sec-add-aid-desc"),
      value: getVal("sec-add-value"),
      percent: parseInt(getVal("sec-add-percent"), 10) || 10,
      badge: getVal("sec-add-badge") || "قطاع رئيسي"
    };
    if (!window.siteData.impactDashboard.currentYear.metrics) window.siteData.impactDashboard.currentYear.metrics = [];
    window.siteData.impactDashboard.currentYear.metrics.push(newSec);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderImpactSectorsTable();
    showToast("تمت إضافة قطاع الصرف بنجاح!");
  };
};

window.openEditSectorModal = function(idx) {
  const metrics = window.siteData.impactDashboard.currentYear.metrics || [];
  const sec = metrics[idx];
  if (!sec) return;

  const html = `
    <form id="modal-form-edit-sector">
      <div class="admin-form-group">
        <label class="admin-label">اسم القطاع:</label>
        <input type="text" id="sec-edit-title" class="admin-input" value="${sec.title}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الحالات / الأسر المستفيدة:</label>
        <input type="text" id="sec-edit-cases" class="admin-input" value="${sec.casesCount || sec.count || ''}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">طبيعة الدعم والمساعدة المقدمة:</label>
        <input type="text" id="sec-edit-aid-desc" class="admin-input" value="${sec.aidDescription || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المبلغ المنصرف (ر.س):</label>
        <input type="text" id="sec-edit-value" class="admin-input" value="${sec.value}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">النسبة المئوية (%):</label>
        <input type="number" id="sec-edit-percent" class="admin-input" value="${sec.percent}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوسم / التصنيف:</label>
        <input type="text" id="sec-edit-badge" class="admin-input" value="${sec.badge || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل قطاع الصرف", html);

  document.getElementById("modal-form-edit-sector").onsubmit = function(e) {
    e.preventDefault();
    sec.title = getVal("sec-edit-title");
    sec.casesCount = getVal("sec-edit-cases");
    sec.count = getVal("sec-edit-cases");
    sec.aidDescription = getVal("sec-edit-aid-desc");
    sec.value = getVal("sec-edit-value");
    sec.percent = parseInt(getVal("sec-edit-percent"), 10) || 10;
    sec.badge = getVal("sec-edit-badge");
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderImpactSectorsTable();
    showToast("تم تحديث بيانات قطاع الصرف بنجاح!");
  };
};

window.deleteSector = function(idx) {
  if (!confirm("هل أنت متأكد من حذف هذا القطاع؟")) return;
  window.siteData.impactDashboard.currentYear.metrics.splice(idx, 1);
  window.saveSiteData(window.siteData);
  renderImpactSectorsTable();
  showToast("تم حذف قطاع الصرف بنجاح.");
};

/* ==========================================================================
   4. PAGE 3: About Us, Governance & Financials CMS (عن الجمعية)
   ========================================================================== */
function renderBrandForm() {
  const b = window.siteData.brand || {};
  setVal("edit-brand-name-ar", b.name_ar || "");
  setVal("edit-brand-name-en", b.name_en || "");
  setVal("edit-brand-license", b.license_number || "");
  setVal("edit-brand-date", b.establishment_date_hijri || "");
  setVal("edit-brand-supervision", b.supervision || "");
  setVal("edit-brand-postal", b.postal_address || "");
  setVal("edit-brand-headquarters", b.headquarters || "");

  const form = document.getElementById("form-edit-brand");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.brand) window.siteData.brand = {};
      const brand = window.siteData.brand;
      brand.name_ar = getVal("edit-brand-name-ar");
      brand.name_en = getVal("edit-brand-name-en");
      brand.license_number = getVal("edit-brand-license");
      brand.establishment_date_hijri = getVal("edit-brand-date");
      brand.supervision = getVal("edit-brand-supervision");
      brand.postal_address = getVal("edit-brand-postal");
      brand.headquarters = getVal("edit-brand-headquarters");

      window.saveSiteData(window.siteData);
      showToast("تم حفظ بيانات الترخيص والتأسيس بنجاح!");
    };
  }
}

// 4.1 Board of Directors
function renderBoardTable() {
  const tbody = document.getElementById("admin-board-tbody");
  if (!tbody) return;
  const list = window.siteData.boardMembers || [];
  tbody.innerHTML = list.map(m => `
    <tr>
      <td style="font-weight: 700;">${m.name}</td>
      <td><span class="badge badge-primary">${m.role}</span></td>
      <td>${m.committee || "عضو مجلس"}</td>
      <td style="font-size: 0.85rem; color: #64748B;">${m.experience || "-"}</td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditBoardMemberModal('${m.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteBoardMember('${m.id}')">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddBoardMemberModal = function() {
  const html = `
    <form id="modal-form-add-board">
      <div class="admin-form-group">
        <label class="admin-label">الاسم الكريم:</label>
        <input type="text" id="bm-name" class="admin-input" required placeholder="مثال: فهد بن مسفر القحطاني">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المنصب في المجلس:</label>
        <input type="text" id="bm-role" class="admin-input" required placeholder="مثال: رئيس مجلس الإدارة / نائب الرئيس / عضو">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">اللجنة / الاختصاص:</label>
        <input type="text" id="bm-committee" class="admin-input" placeholder="مثال: اللجنة التنفيذية / لجنة المراجعة الداخلية">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الخبرة والتأهيل:</label>
        <input type="text" id="bm-exp" class="admin-input" placeholder="مثال: خبرة إدارية في القطاع غير الربحي لأكثر من 15 عاماً">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة العضو</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة عضو مجلس إدارة جديد", html);

  document.getElementById("modal-form-add-board").onsubmit = function(e) {
    e.preventDefault();
    const newMember = {
      id: `bm-${Date.now()}`,
      name: getVal("bm-name"),
      role: getVal("bm-role"),
      committee: getVal("bm-committee"),
      experience: getVal("bm-exp"),
      term: "الدورة الحالية"
    };
    if (!window.siteData.boardMembers) window.siteData.boardMembers = [];
    window.siteData.boardMembers.push(newMember);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderBoardTable();
    renderOverviewStats();
    showToast("تمت إضافة عضو مجلس الإدارة بنجاح!");
  };
};

window.openEditBoardMemberModal = function(id) {
  const m = (window.siteData.boardMembers || []).find(b => b.id === id);
  if (!m) return;

  const html = `
    <form id="modal-form-edit-board">
      <div class="admin-form-group">
        <label class="admin-label">الاسم الكريم:</label>
        <input type="text" id="bm-edit-name" class="admin-input" value="${m.name}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المنصب:</label>
        <input type="text" id="bm-edit-role" class="admin-input" value="${m.role}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">اللجنة:</label>
        <input type="text" id="bm-edit-committee" class="admin-input" value="${m.committee || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الخبرة والتأهيل:</label>
        <input type="text" id="bm-edit-exp" class="admin-input" value="${m.experience || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل عضو مجلس إدارة", html);

  document.getElementById("modal-form-edit-board").onsubmit = function(e) {
    e.preventDefault();
    m.name = getVal("bm-edit-name");
    m.role = getVal("bm-edit-role");
    m.committee = getVal("bm-edit-committee");
    m.experience = getVal("bm-edit-exp");
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderBoardTable();
    showToast("تم تحديث بيانات عضو المجلس بنجاح!");
  };
};

window.deleteBoardMember = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا العضو؟")) return;
  window.siteData.boardMembers = (window.siteData.boardMembers || []).filter(b => b.id !== id);
  window.saveSiteData(window.siteData);
  renderBoardTable();
  renderOverviewStats();
  showToast("تم حذف العضو بنجاح.");
};

// 4.2 General Assembly
function renderAssemblyList() {
  const container = document.getElementById("admin-assembly-list");
  if (!container) return;
  const list = window.siteData.generalAssembly || [];
  container.innerHTML = list.map(m => `
    <div class="admin-item-card" style="padding: 1rem;">
      <div class="admin-item-header">
        <span style="font-weight: 700; color: #0F172A;">${m.name}</span>
        <span class="badge badge-gold" style="font-size: 0.7rem;">${m.role || "عضو"}</span>
      </div>
      <div style="font-size: 0.78rem; color: #64748B;">نوع العضوية: ${m.membership || "عامل"}</div>
      <div class="admin-item-actions" style="margin-top: 0.5rem; padding-top: 0.4rem;">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditAssemblyMemberModal('${m.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteAssemblyMember('${m.id}')">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddAssemblyMemberModal = function() {
  const html = `
    <form id="modal-form-add-assembly">
      <div class="admin-form-group">
        <label class="admin-label">اسم العضو:</label>
        <input type="text" id="as-name" class="admin-input" required placeholder="مثال: خالد بن إبراهيم الراجحي">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الصفة / الدور:</label>
        <input type="text" id="as-role" class="admin-input" placeholder="مثال: عضو جمعية عمومية / مؤسس">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نوع العضوية:</label>
        <input type="text" id="as-membership" class="admin-input" value="عضو عامل">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة العضو</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة عضو جمعية عمومية", html);

  document.getElementById("modal-form-add-assembly").onsubmit = function(e) {
    e.preventDefault();
    const newMember = {
      id: `as-${Date.now()}`,
      name: getVal("as-name"),
      role: getVal("as-role") || "عضو",
      membership: getVal("as-membership") || "عامل"
    };
    if (!window.siteData.generalAssembly) window.siteData.generalAssembly = [];
    window.siteData.generalAssembly.push(newMember);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderAssemblyList();
    showToast("تمت إضافة عضو الجمعية العمومية بنجاح!");
  };
};

window.openEditAssemblyMemberModal = function(id) {
  const m = (window.siteData.generalAssembly || []).find(a => a.id === id);
  if (!m) return;

  const html = `
    <form id="modal-form-edit-assembly">
      <div class="admin-form-group">
        <label class="admin-label">اسم العضو:</label>
        <input type="text" id="as-edit-name" class="admin-input" value="${m.name}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الصفة / الدور:</label>
        <input type="text" id="as-edit-role" class="admin-input" value="${m.role || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نوع العضوية:</label>
        <input type="text" id="as-edit-membership" class="admin-input" value="${m.membership || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل عضو جمعية عمومية", html);

  document.getElementById("modal-form-edit-assembly").onsubmit = function(e) {
    e.preventDefault();
    m.name = getVal("as-edit-name");
    m.role = getVal("as-edit-role");
    m.membership = getVal("as-edit-membership");
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderAssemblyList();
    showToast("تم تحديث بيانات عضو العمومية بنجاح!");
  };
};

window.deleteAssemblyMember = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا العضو؟")) return;
  window.siteData.generalAssembly = (window.siteData.generalAssembly || []).filter(a => a.id !== id);
  window.saveSiteData(window.siteData);
  renderAssemblyList();
  showToast("تم حذف العضو بنجاح.");
};

// 4.3 Working Committees
function renderCommitteesList() {
  const container = document.getElementById("admin-committees-container");
  if (!container) return;
  const list = window.siteData.committees || [];
  container.innerHTML = list.map(c => `
    <div class="admin-item-card">
      <div class="admin-item-header">
        <div>
          <h4 class="admin-item-title">${c.name}</h4>
          <span style="font-size: 0.85rem; color: var(--admin-primary); font-weight: 600;">رئيس اللجنة: ${c.head}</span>
        </div>
        <span class="badge badge-primary">${c.meetingFreq || "اجتماعات دورية"}</span>
      </div>
      <p style="font-size: 0.88rem; color: #475569; margin: 0.4rem 0;">${c.mandate || ""}</p>
      <div style="font-size: 0.82rem; color: #64748B;">الأعضاء: ${Array.isArray(c.members) ? c.members.join("، ") : c.members}</div>
      <div class="admin-item-actions">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditCommitteeModal('${c.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteCommittee('${c.id}')">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddCommitteeModal = function() {
  const html = `
    <form id="modal-form-add-committee">
      <div class="admin-form-group">
        <label class="admin-label">اسم اللجنة:</label>
        <input type="text" id="com-name" class="admin-input" required placeholder="مثال: لجنة المراجعة الداخلية والتدقيق">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رئيس اللجنة:</label>
        <input type="text" id="com-head" class="admin-input" required placeholder="مثال: أ. عبدالله بن سعد">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الأعضاء (مفصولين بفواصل):</label>
        <input type="text" id="com-members" class="admin-input" placeholder="مثال: عضو 1، عضو 2، عضو 3">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نطاق عمل واختصاص اللجنة:</label>
        <textarea id="com-mandate" class="admin-textarea" placeholder="شرح موجز لاختصاصات ومهام اللجنة..."></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">دورية الاجتماعات:</label>
        <input type="text" id="com-freq" class="admin-input" value="اجتماع ربع سنوي بانتظام">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة اللجنة</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة لجنة عاملة جديدة", html);

  document.getElementById("modal-form-add-committee").onsubmit = function(e) {
    e.preventDefault();
    const membersArr = getVal("com-members").split("،").map(s => s.trim()).filter(Boolean);
    const newCom = {
      id: `com-${Date.now()}`,
      name: getVal("com-name"),
      head: getVal("com-head"),
      members: membersArr,
      mandate: getVal("com-mandate"),
      meetingFreq: getVal("com-freq")
    };
    if (!window.siteData.committees) window.siteData.committees = [];
    window.siteData.committees.push(newCom);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderCommitteesList();
    showToast("تمت إضافة اللجنة العاملة بنجاح!");
  };
};

window.openEditCommitteeModal = function(id) {
  const c = (window.siteData.committees || []).find(item => item.id === id);
  if (!c) return;

  const html = `
    <form id="modal-form-edit-committee">
      <div class="admin-form-group">
        <label class="admin-label">اسم اللجنة:</label>
        <input type="text" id="com-edit-name" class="admin-input" value="${c.name}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رئيس اللجنة:</label>
        <input type="text" id="com-edit-head" class="admin-input" value="${c.head}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الأعضاء:</label>
        <input type="text" id="com-edit-members" class="admin-input" value="${Array.isArray(c.members) ? c.members.join("، ") : (c.members || '')}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نطاق العمل والاختصاص:</label>
        <textarea id="com-edit-mandate" class="admin-textarea">${c.mandate || ''}</textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">دورية الاجتماعات:</label>
        <input type="text" id="com-edit-freq" class="admin-input" value="${c.meetingFreq || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل اللجنة العاملة", html);

  document.getElementById("modal-form-edit-committee").onsubmit = function(e) {
    e.preventDefault();
    c.name = getVal("com-edit-name");
    c.head = getVal("com-edit-head");
    c.members = getVal("com-edit-members").split("،").map(s => s.trim()).filter(Boolean);
    c.mandate = getVal("com-edit-mandate");
    c.meetingFreq = getVal("com-edit-freq");
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderCommitteesList();
    showToast("تم تحديث بيانات اللجنة بنجاح!");
  };
};

window.deleteCommittee = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذه اللجنة؟")) return;
  window.siteData.committees = (window.siteData.committees || []).filter(c => c.id !== id);
  window.saveSiteData(window.siteData);
  renderCommitteesList();
  showToast("تم حذف اللجنة بنجاح.");
};

// 4.4 Governance Policies (اللوائح والسياسات الـ 10)
function renderGovernancePoliciesList() {
  const container = document.getElementById("admin-policies-container");
  if (!container) return;
  const list = window.siteData.governancePolicies || [];
  container.innerHTML = list.map((p, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-header">
        <div>
          <span class="badge badge-gold" style="font-size: 0.75rem; margin-bottom: 0.35rem;">لائحة رقم (${p.num || (idx+1)})</span>
          <h4 class="admin-item-title">${p.title}</h4>
        </div>
        <a href="${p.pdfUrl || '#'}" target="_blank" class="badge badge-primary" style="text-decoration: none;">تحميل PDF ↗</a>
      </div>
      <div style="display: flex; gap: 1.5rem; font-size: 0.82rem; color: #64748B; margin: 0.3rem 0;">
        <span>الاعتماد: ${p.approvedBy || "مجلس الإدارة"}</span>
        <span>التاريخ: ${p.approvalDate || "-"}</span>
        <span>المواد: ${p.articlesCount || "-"}</span>
      </div>
      <p style="font-size: 0.88rem; color: #475569; margin: 0.4rem 0;">${p.description || ""}</p>
      ${p.parts && p.parts.length ? `
        <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 0.75rem; margin-top: 0.5rem; font-size: 0.82rem;">
          <strong style="color: #0F172A;">الأبواب والمواد المدرجة:</strong>
          <ul style="margin: 0.35rem 1.25rem 0 0; padding: 0; color: #475569;">
            ${p.parts.slice(0, 3).map(part => `<li>${part}</li>`).join("")}
            ${p.parts.length > 3 ? `<li>... وعدد ${p.parts.length - 3} أبواب أخرى</li>` : ''}
          </ul>
        </div>
      ` : ''}
      <div class="admin-item-actions">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditPolicyModal('${p.id}')">تعديل اللائحة</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deletePolicy('${p.id}')">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddPolicyModal = function() {
  const html = `
    <form id="modal-form-add-policy">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رقم اللائحة التسلسلي:</label>
          <input type="text" id="pol-num" class="admin-input" placeholder="مثال: 11">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عنوان اللائحة أو السياسة:</label>
          <input type="text" id="pol-title" class="admin-input" required placeholder="مثال: سياسة حماية البيانات والخصوصية">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">جهة الاعتماد:</label>
          <input type="text" id="pol-approved-by" class="admin-input" value="مجلس الإدارة بجلسته المعتمدة">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">تاريخ الاعتماد الهجري:</label>
          <input type="text" id="pol-date" class="admin-input" placeholder="1445/05/10هـ">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">عدد المواد النظامية:</label>
        <input type="text" id="pol-articles" class="admin-input" placeholder="12 مادة تنظيمية">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ملف PDF الرسمي المعتمد:</label>
        <input type="url" id="pol-pdf" class="admin-input" placeholder="https://aljelah.com/wp-content/uploads/...">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف التفسيري للائحة:</label>
        <textarea id="pol-desc" class="admin-textarea" placeholder="شرح مبادئ وأهداف هذه السياسة..."></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">أبواب اللائحة (كل باب في سطر منفصل):</label>
        <textarea id="pol-parts" class="admin-textarea" placeholder="الباب الأول: ...&#10;الباب الثاني: ..."></textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة اللائحة</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة لائحة حوكمة جديدة", html);

  document.getElementById("modal-form-add-policy").onsubmit = function(e) {
    e.preventDefault();
    const partsArr = getVal("pol-parts").split("\n").map(s => s.trim()).filter(Boolean);
    const newPolicy = {
      id: `gov-${Date.now()}`,
      num: getVal("pol-num") || "11",
      title: getVal("pol-title"),
      approvedBy: getVal("pol-approved-by"),
      approvalDate: getVal("pol-date"),
      articlesCount: getVal("pol-articles"),
      pdfUrl: getVal("pol-pdf"),
      description: getVal("pol-desc"),
      parts: partsArr
    };
    if (!window.siteData.governancePolicies) window.siteData.governancePolicies = [];
    window.siteData.governancePolicies.push(newPolicy);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderGovernancePoliciesList();
    renderOverviewStats();
    showToast("تمت إضافة لائحة الحوكمة بنجاح!");
  };
};

window.openEditPolicyModal = function(id) {
  const p = (window.siteData.governancePolicies || []).find(item => item.id === id);
  if (!p) return;

  const html = `
    <form id="modal-form-edit-policy">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رقم اللائحة:</label>
          <input type="text" id="pol-edit-num" class="admin-input" value="${p.num || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عنوان اللائحة:</label>
          <input type="text" id="pol-edit-title" class="admin-input" value="${p.title}" required>
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">جهة الاعتماد:</label>
          <input type="text" id="pol-edit-approved-by" class="admin-input" value="${p.approvedBy || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">تاريخ الاعتماد:</label>
          <input type="text" id="pol-edit-date" class="admin-input" value="${p.approvalDate || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">عدد المواد:</label>
        <input type="text" id="pol-edit-articles" class="admin-input" value="${p.articlesCount || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ملف PDF:</label>
        <input type="url" id="pol-edit-pdf" class="admin-input" value="${p.pdfUrl || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف التفصيلي:</label>
        <textarea id="pol-edit-desc" class="admin-textarea">${p.description || ''}</textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">أبواب اللائحة (كل باب في سطر منفصل):</label>
        <textarea id="pol-edit-parts" class="admin-textarea">${(p.parts || []).join("\n")}</textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل لائحة الحوكمة", html);

  document.getElementById("modal-form-edit-policy").onsubmit = function(e) {
    e.preventDefault();
    p.num = getVal("pol-edit-num");
    p.title = getVal("pol-edit-title");
    p.approvedBy = getVal("pol-edit-approved-by");
    p.approvalDate = getVal("pol-edit-date");
    p.articlesCount = getVal("pol-edit-articles");
    p.pdfUrl = getVal("pol-edit-pdf");
    p.description = getVal("pol-edit-desc");
    p.parts = getVal("pol-edit-parts").split("\n").map(s => s.trim()).filter(Boolean);

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderGovernancePoliciesList();
    showToast("تم تحديث بيانات اللائحة بنجاح!");
  };
};

window.deletePolicy = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذه اللائحة؟")) return;
  window.siteData.governancePolicies = (window.siteData.governancePolicies || []).filter(p => p.id !== id);
  window.saveSiteData(window.siteData);
  renderGovernancePoliciesList();
  renderOverviewStats();
  showToast("تم حذف اللائحة بنجاح.");
};

// 4.5 Audited Financial Reports Archive
function renderFinancialReportsTable() {
  const tbody = document.getElementById("admin-financials-tbody");
  if (!tbody) return;
  const list = window.siteData.financialReports || [];
  tbody.innerHTML = list.map((r, idx) => `
    <tr>
      <td style="font-weight: 700;">${r.year}</td>
      <td>
        <div style="font-weight: 600; color: #0F172A;">${r.period}</div>
        <span style="font-size: 0.78rem; color: #64748B;">${r.type}</span>
      </td>
      <td><span class="badge badge-primary">${r.status || "معتمد ومدقق"}</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${r.mainBudgetUrl ? `<a href="${r.mainBudgetUrl}" target="_blank" class="badge badge-indigo" style="text-decoration: none;">الميزانية كاملة ↗</a>` : ''}
          ${r.revenueUrl ? `<a href="${r.revenueUrl}" target="_blank" class="badge badge-gold" style="text-decoration: none;">الإيرادات ↗</a>` : ''}
          ${r.expenseUrl ? `<a href="${r.expenseUrl}" target="_blank" class="badge badge-gray" style="text-decoration: none;">المصروفات ↗</a>` : ''}
        </div>
      </td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditFinancialReportModal(${idx})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteFinancialReport(${idx})">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddFinancialReportModal = function() {
  const html = `
    <form id="modal-form-add-fin">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السنة المالية:</label>
          <input type="text" id="fin-year" class="admin-input" required placeholder="مثال: 2026">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">الفترة المالية:</label>
          <input type="text" id="fin-period" class="admin-input" required placeholder="مثال: الربع الثالث 2026 أو ميزانية 2025 كاملة">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نوع التقرير المالي:</label>
        <input type="text" id="fin-type" class="admin-input" required placeholder="تقرير إيرادات ومصاريف ربعي / القوائم المالية المدققة">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ملف الميزانية المعتمدة الكاملة (PDF):</label>
        <input type="url" id="fin-budget-url" class="admin-input" placeholder="https://aljelah.com/wp-content/uploads/...">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رابط تقرير الإيرادات (PDF):</label>
          <input type="url" id="fin-rev-url" class="admin-input" placeholder="اختياري">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">رابط تقرير المصروفات (PDF):</label>
          <input type="url" id="fin-exp-url" class="admin-input" placeholder="اختياري">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">حالة التقرير:</label>
        <input type="text" id="fin-status" class="admin-input" value="معتمد ومدقق من المحاسب القانوني">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة التقرير المالي</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة تقرير مالي / ميزانية مدققة", html);

  document.getElementById("modal-form-add-fin").onsubmit = function(e) {
    e.preventDefault();
    const newReport = {
      year: getVal("fin-year"),
      period: getVal("fin-period"),
      type: getVal("fin-type"),
      mainBudgetUrl: getVal("fin-budget-url"),
      revenueUrl: getVal("fin-rev-url"),
      expenseUrl: getVal("fin-exp-url"),
      status: getVal("fin-status") || "معتمد ومدقق"
    };
    if (!window.siteData.financialReports) window.siteData.financialReports = [];
    window.siteData.financialReports.unshift(newReport);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderFinancialReportsTable();
    renderOverviewStats();
    showToast("تمت إضافة التقرير المالي بنجاح!");
  };
};

window.openEditFinancialReportModal = function(idx) {
  const r = (window.siteData.financialReports || [])[idx];
  if (!r) return;

  const html = `
    <form id="modal-form-edit-fin">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السنة:</label>
          <input type="text" id="fin-edit-year" class="admin-input" value="${r.year}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">الفترة:</label>
          <input type="text" id="fin-edit-period" class="admin-input" value="${r.period}" required>
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">النوع:</label>
        <input type="text" id="fin-edit-type" class="admin-input" value="${r.type}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط الميزانية الرئيسية (PDF):</label>
        <input type="url" id="fin-edit-budget" class="admin-input" value="${r.mainBudgetUrl || ''}">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رابط تقرير الإيرادات:</label>
          <input type="url" id="fin-edit-rev" class="admin-input" value="${r.revenueUrl || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">رابط تقرير المصروفات:</label>
          <input type="url" id="fin-edit-exp" class="admin-input" value="${r.expenseUrl || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الحالة:</label>
        <input type="text" id="fin-edit-status" class="admin-input" value="${r.status || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل التقرير المالي", html);

  document.getElementById("modal-form-edit-fin").onsubmit = function(e) {
    e.preventDefault();
    r.year = getVal("fin-edit-year");
    r.period = getVal("fin-edit-period");
    r.type = getVal("fin-edit-type");
    r.mainBudgetUrl = getVal("fin-edit-budget");
    r.revenueUrl = getVal("fin-edit-rev");
    r.expenseUrl = getVal("fin-edit-exp");
    r.status = getVal("fin-edit-status");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderFinancialReportsTable();
    showToast("تم تحديث بيانات التقرير المالي بنجاح!");
  };
};

window.deleteFinancialReport = function(idx) {
  if (!confirm("هل أنت متأكد من حذف هذا التقرير المالي؟")) return;
  window.siteData.financialReports.splice(idx, 1);
  window.saveSiteData(window.siteData);
  renderFinancialReportsTable();
  renderOverviewStats();
  showToast("تم حذف التقرير المالي بنجاح.");
};

// 4.6 Annual Reports
function renderAnnualReportsList() {
  const container = document.getElementById("admin-annual-reports-container");
  if (!container) return;
  const list = window.siteData.annualReports || [];
  container.innerHTML = list.map((a, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-header">
        <h4 class="admin-item-title">${a.title}</h4>
        <span class="badge badge-primary">${a.year}</span>
      </div>
      <p style="font-size: 0.85rem; color: #475569; margin: 0.4rem 0;">${a.subtitle || ""}</p>
      <div style="font-size: 0.78rem; color: #64748B;">الصفحات: ${a.pages || "-"} • ${a.highlight || ""}</div>
      <div class="admin-item-actions">
        <a href="${a.pdfUrl || '#'}" target="_blank" class="admin-btn admin-btn-outline admin-btn-sm" style="text-decoration: none;">فتح PDF ↗</a>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditAnnualReportModal(${idx})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteAnnualReport(${idx})">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddAnnualReportModal = function() {
  const html = `
    <form id="modal-form-add-annual">
      <div class="admin-form-group">
        <label class="admin-label">عنوان التقرير السنوي:</label>
        <input type="text" id="ann-title" class="admin-input" required placeholder="مثال: التقرير السنوي الشامل 2025">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف الموجز:</label>
        <input type="text" id="ann-sub" class="admin-input" placeholder="يوثق كافة إنجازات البرامج والمشاريع والمصروفات بالأرقام">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السنة:</label>
          <input type="text" id="ann-year" class="admin-input" required placeholder="2025">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عدد الصفحات:</label>
          <input type="text" id="ann-pages" class="admin-input" placeholder="24 صفحة">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ملف PDF:</label>
        <input type="url" id="ann-pdf" class="admin-input" required placeholder="https://aljelah.com/wp-content/uploads/...">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة التقرير</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة تقرير سنوي جديد", html);

  document.getElementById("modal-form-add-annual").onsubmit = function(e) {
    e.preventDefault();
    const newRep = {
      title: getVal("ann-title"),
      subtitle: getVal("ann-sub"),
      year: getVal("ann-year"),
      pages: getVal("ann-pages"),
      pdfUrl: getVal("ann-pdf")
    };
    if (!window.siteData.annualReports) window.siteData.annualReports = [];
    window.siteData.annualReports.unshift(newRep);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderAnnualReportsList();
    showToast("تمت إضافة التقرير السنوي بنجاح!");
  };
};

window.openEditAnnualReportModal = function(idx) {
  const a = (window.siteData.annualReports || [])[idx];
  if (!a) return;

  const html = `
    <form id="modal-form-edit-annual">
      <div class="admin-form-group">
        <label class="admin-label">عنوان التقرير:</label>
        <input type="text" id="ann-edit-title" class="admin-input" value="${a.title}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف:</label>
        <input type="text" id="ann-edit-sub" class="admin-input" value="${a.subtitle || ''}">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السنة:</label>
          <input type="text" id="ann-edit-year" class="admin-input" value="${a.year}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">الصفحات:</label>
          <input type="text" id="ann-edit-pages" class="admin-input" value="${a.pages || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط PDF:</label>
        <input type="url" id="ann-edit-pdf" class="admin-input" value="${a.pdfUrl || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل التقرير السنوي", html);

  document.getElementById("modal-form-edit-annual").onsubmit = function(e) {
    e.preventDefault();
    a.title = getVal("ann-edit-title");
    a.subtitle = getVal("ann-edit-sub");
    a.year = getVal("ann-edit-year");
    a.pages = getVal("ann-edit-pages");
    a.pdfUrl = getVal("ann-edit-pdf");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderAnnualReportsList();
    showToast("تم تحديث بيانات التقرير السنوي بنجاح!");
  };
};

window.deleteAnnualReport = function(idx) {
  if (!confirm("هل أنت متأكد من حذف هذا التقرير؟")) return;
  window.siteData.annualReports.splice(idx, 1);
  window.saveSiteData(window.siteData);
  renderAnnualReportsList();
  showToast("تم حذف التقرير بنجاح.");
};

/* ==========================================================================
   5. PAGE 4: Strategic Programs CMS (البرامج الاستراتيجية)
   ========================================================================== */
function renderProgramsTable() {
  const tbody = document.getElementById("admin-programs-tbody");
  if (!tbody) return;
  const list = window.siteData.programs || [];
  tbody.innerHTML = list.map(p => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A;">${p.name}</div>
        <div style="font-size: 0.8rem; color: #64748B;">${p.subtitle || ""}</div>
      </td>
      <td><span class="badge badge-primary">${p.category}</span></td>
      <td style="color: var(--admin-primary); font-weight: 700;">${p.budget2025 || "-"}</td>
      <td>${p.beneficiaries || "-"}</td>
      <td>
        ${p.licensePdf ? `<a href="${p.licensePdf}" target="_blank" class="badge badge-indigo" style="text-decoration: none;">${p.license || "الترخيص"} ↗</a>` : (p.license || "-")}
      </td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditProgramModal('${p.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteProgram('${p.id}')">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddProgramModal = function() {
  const html = `
    <form id="modal-form-add-program">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">اسم البرنامج:</label>
          <input type="text" id="prog-name" class="admin-input" required placeholder="مثال: برنامج كفاف">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">العنوان الفرعي التوضيحي:</label>
          <input type="text" id="prog-sub" class="admin-input" placeholder="لتأمين السلال الغذائية الأساسية">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="prog-cat" class="admin-input" required placeholder="أمن غذائي / سكن كريم / تمكين">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">رقم الترخيص:</label>
          <input type="text" id="prog-lic" class="admin-input" value="ترخيص رقم 2026">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المصروفات والميزانية (2025):</label>
          <input type="text" id="prog-budget" class="admin-input" placeholder="مثال: 564,000 ر.س">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عدد المستفيدين:</label>
          <input type="text" id="prog-ben" class="admin-input" placeholder="مثال: 750+ أسرة دورياً">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ترخيص البرنامج (PDF):</label>
        <input type="url" id="prog-lic-pdf" class="admin-input" placeholder="https://aljelah.com/wp-content/uploads/...">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط صفحة البرنامج بالمتجر للتبرع:</label>
        <input type="url" id="prog-store-url" class="admin-input" placeholder="https://aljelahstore.sa/product/...">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف الكامل للبرنامج وأهدافه:</label>
        <textarea id="prog-desc" class="admin-textarea" rows="3" placeholder="شرح وافٍ عن طبيعة البرنامج وأهميته..."></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">محاور وإنجازات البرنامج (كل محور في سطر منفصل):</label>
        <textarea id="prog-features" class="admin-textarea" rows="4" placeholder="المحور الأول: ...&#10;المحور الثاني: ..."></textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة البرنامج</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة برنامج استراتيجي جديد", html);

  document.getElementById("modal-form-add-program").onsubmit = function(e) {
    e.preventDefault();
    const featArr = getVal("prog-features").split("\n").map(s => s.trim()).filter(Boolean);
    const newProg = {
      id: `prog-${Date.now()}`,
      name: getVal("prog-name"),
      subtitle: getVal("prog-sub"),
      category: getVal("prog-cat"),
      license: getVal("prog-lic"),
      licensePdf: getVal("prog-lic-pdf"),
      budget2025: getVal("prog-budget"),
      beneficiaries: getVal("prog-ben"),
      storeProductUrl: getVal("prog-store-url"),
      description: getVal("prog-desc"),
      keyFeatures: featArr,
      logo: "assets/program-kafaf-logo.jpg",
      banner: "assets/main-programs-banner.png"
    };
    if (!window.siteData.programs) window.siteData.programs = [];
    window.siteData.programs.push(newProg);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderProgramsTable();
    renderOverviewStats();
    showToast("تمت إضافة البرنامج الاستراتيجي بنجاح!");
  };
};

window.openEditProgramModal = function(id) {
  const p = (window.siteData.programs || []).find(item => item.id === id);
  if (!p) return;

  const html = `
    <form id="modal-form-edit-program">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">اسم البرنامج:</label>
          <input type="text" id="prog-edit-name" class="admin-input" value="${p.name}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">العنوان الفرعي:</label>
          <input type="text" id="prog-edit-sub" class="admin-input" value="${p.subtitle || ''}">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="prog-edit-cat" class="admin-input" value="${p.category}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">رقم الترخيص:</label>
          <input type="text" id="prog-edit-lic" class="admin-input" value="${p.license || ''}">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المصروفات لـ 2025:</label>
          <input type="text" id="prog-edit-budget" class="admin-input" value="${p.budget2025 || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">المستفيدون:</label>
          <input type="text" id="prog-edit-ben" class="admin-input" value="${p.beneficiaries || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط ترخيص البرنامج (PDF):</label>
        <input type="url" id="prog-edit-lic-pdf" class="admin-input" value="${p.licensePdf || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط التبرع بالمتجر:</label>
        <input type="url" id="prog-edit-store-url" class="admin-input" value="${p.storeProductUrl || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف الكامل:</label>
        <textarea id="prog-edit-desc" class="admin-textarea" rows="3">${p.description || ''}</textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">محاور البرنامج (كل محور في سطر منفصل):</label>
        <textarea id="prog-edit-features" class="admin-textarea" rows="4">${(p.keyFeatures || []).join("\n")}</textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل البرنامج الاستراتيجي", html);

  document.getElementById("modal-form-edit-program").onsubmit = function(e) {
    e.preventDefault();
    p.name = getVal("prog-edit-name");
    p.subtitle = getVal("prog-edit-sub");
    p.category = getVal("prog-edit-cat");
    p.license = getVal("prog-edit-lic");
    p.licensePdf = getVal("prog-edit-lic-pdf");
    p.budget2025 = getVal("prog-edit-budget");
    p.beneficiaries = getVal("prog-edit-ben");
    p.storeProductUrl = getVal("prog-edit-store-url");
    p.description = getVal("prog-edit-desc");
    p.keyFeatures = getVal("prog-edit-features").split("\n").map(s => s.trim()).filter(Boolean);

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderProgramsTable();
    showToast("تم تحديث بيانات البرنامج بنجاح!");
  };
};

window.deleteProgram = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا البرنامج؟")) return;
  window.siteData.programs = (window.siteData.programs || []).filter(p => p.id !== id);
  window.saveSiteData(window.siteData);
  renderProgramsTable();
  renderOverviewStats();
  showToast("تم حذف البرنامج بنجاح.");
};

/* ==========================================================================
   6. PAGE 5: Seasonal & Field Projects CMS (المشاريع الميدانية)
   ========================================================================== */
function renderProjectsImpactForm() {
  const p = window.siteData.projectsImpact || {};
  setVal("proj-edit-budget", p.totalBudget || "");
  setVal("proj-edit-beneficiaries", p.totalBeneficiaries || "");
  setVal("proj-edit-count", p.activeProjectsCount || "");
  setVal("proj-edit-completion", p.completionRate || "");

  const form = document.getElementById("form-edit-projects-impact");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.projectsImpact) window.siteData.projectsImpact = {};
      const pi = window.siteData.projectsImpact;
      pi.totalBudget = getVal("proj-edit-budget");
      pi.totalBeneficiaries = getVal("proj-edit-beneficiaries");
      pi.activeProjectsCount = getVal("proj-edit-count");
      pi.completionRate = getVal("proj-edit-completion");

      window.saveSiteData(window.siteData);
      showToast("تم تحديث مؤشرات أثر المشاريع بنجاح!");
    };
  }
}

function renderProjectsTable() {
  const tbody = document.getElementById("admin-projects-tbody");
  if (!tbody) return;
  const list = window.siteData.seasonalProjects || [];
  tbody.innerHTML = list.map(p => `
    <tr>
      <td style="font-weight: 700;">${p.name}</td>
      <td><span class="badge badge-primary">${p.category}</span></td>
      <td style="color: var(--admin-primary); font-weight: 700;">${p.amount || "-"}</td>
      <td>${p.beneficiaries || "-"}</td>
      <td><span class="badge badge-gold">${p.status || "نشط"}</span></td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditProjectModal('${p.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteProject('${p.id}')">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddProjectModal = function() {
  const html = `
    <form id="modal-form-add-project">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">اسم المشروع:</label>
          <input type="text" id="prj-name" class="admin-input" required placeholder="مثال: مشروع كسوة وبطانيات الشتاء">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="prj-cat" class="admin-input" required placeholder="كسوة / سقيا / إغاثة / أيتام">
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المبلغ والارتباط المالي:</label>
          <input type="text" id="prj-amount" class="admin-input" placeholder="347,050 ر.س">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عدد المستفيدين:</label>
          <input type="text" id="prj-ben" class="admin-input" placeholder="1,150 مستفيد">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">حالة المشروع:</label>
        <input type="text" id="prj-status" class="admin-input" value="نشط ومستمر">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف والأهداف:</label>
        <textarea id="prj-desc" class="admin-textarea" placeholder="شرح موجز لأهداف المشروع ونطاقه..."></textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة المشروع</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة مشروع ميداني جديد", html);

  document.getElementById("modal-form-add-project").onsubmit = function(e) {
    e.preventDefault();
    const newPrj = {
      id: `proj-${Date.now()}`,
      name: getVal("prj-name"),
      category: getVal("prj-cat"),
      amount: getVal("prj-amount"),
      beneficiaries: getVal("prj-ben"),
      status: getVal("prj-status"),
      description: getVal("prj-desc")
    };
    if (!window.siteData.seasonalProjects) window.siteData.seasonalProjects = [];
    window.siteData.seasonalProjects.push(newPrj);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderProjectsTable();
    renderOverviewStats();
    showToast("تمت إضافة المشروع الميداني بنجاح!");
  };
};

window.openEditProjectModal = function(id) {
  const p = (window.siteData.seasonalProjects || []).find(item => item.id === id);
  if (!p) return;

  const html = `
    <form id="modal-form-edit-project">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">اسم المشروع:</label>
          <input type="text" id="prj-edit-name" class="admin-input" value="${p.name}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="prj-edit-cat" class="admin-input" value="${p.category}" required>
        </div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المبلغ المالي:</label>
          <input type="text" id="prj-edit-amount" class="admin-input" value="${p.amount || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">المستفيدون:</label>
          <input type="text" id="prj-edit-ben" class="admin-input" value="${p.beneficiaries || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الحالة:</label>
        <input type="text" id="prj-edit-status" class="admin-input" value="${p.status || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف:</label>
        <textarea id="prj-edit-desc" class="admin-textarea">${p.description || ''}</textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل المشروع الميداني", html);

  document.getElementById("modal-form-edit-project").onsubmit = function(e) {
    e.preventDefault();
    p.name = getVal("prj-edit-name");
    p.category = getVal("prj-edit-cat");
    p.amount = getVal("prj-edit-amount");
    p.beneficiaries = getVal("prj-edit-ben");
    p.status = getVal("prj-edit-status");
    p.description = getVal("prj-edit-desc");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderProjectsTable();
    showToast("تم تحديث بيانات المشروع بنجاح!");
  };
};

window.deleteProject = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
  window.siteData.seasonalProjects = (window.siteData.seasonalProjects || []).filter(p => p.id !== id);
  window.saveSiteData(window.siteData);
  renderProjectsTable();
  renderOverviewStats();
  showToast("تم حذف المشروع بنجاح.");
};

/* ==========================================================================
   7. PAGE 6: Store & Calculators CMS (المتجر والحاسبات)
   ========================================================================== */
function renderStoreDashboardForm() {
  const s = window.siteData.storeDashboard || {};
  setVal("store-edit-total", s.totalStoreDonations || "");
  setVal("store-edit-orders", s.totalDonationTransactions || "");
  setVal("store-edit-donors", s.activeDigitalDonors || "");
  setVal("store-edit-projects", s.fundedProjectsCount || "");

  const form = document.getElementById("form-edit-store-dashboard");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.storeDashboard) window.siteData.storeDashboard = {};
      const sd = window.siteData.storeDashboard;
      sd.totalStoreDonations = getVal("store-edit-total");
      sd.totalDonationTransactions = getVal("store-edit-orders");
      sd.activeDigitalDonors = getVal("store-edit-donors");
      sd.fundedProjectsCount = getVal("store-edit-projects");

      window.saveSiteData(window.siteData);
      showToast("تم تحديث مؤشرات المتجر الإلكتروني بنجاح!");
    };
  }
}

function renderStoreFeaturedLinksTable() {
  const tbody = document.getElementById("admin-store-links-tbody");
  if (!tbody) return;
  const list = (window.siteData.storeDashboard && window.siteData.storeDashboard.featuredStoreLinks) || [];
  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="font-weight: 700;">${item.name}</td>
      <td style="color: var(--admin-primary); font-weight: 700;">${item.price}</td>
      <td><span class="badge badge-primary">${item.category}</span></td>
      <td><a href="${item.link}" target="_blank" class="badge badge-indigo" style="text-decoration: none;">زيارة المنتج ↗</a></td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditStoreLinkModal(${item.id})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteStoreLink(${item.id})">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddStoreLinkModal = function() {
  const html = `
    <form id="modal-form-add-store-link">
      <div class="admin-form-group">
        <label class="admin-label">اسم الفرصة أو السهم:</label>
        <input type="text" id="stl-name" class="admin-input" required placeholder="مثال: صدقة سقيا الماء العذب">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السعر / التكلفة:</label>
          <input type="text" id="stl-price" class="admin-input" required placeholder="50 ر.س">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="stl-cat" class="admin-input" placeholder="سقيا ماء / أمن غذائي">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط المنتج بالمتجر:</label>
        <input type="url" id="stl-link" class="admin-input" required placeholder="https://aljelahstore.sa">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة الفرصة</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة فرصة تبرع بالمتجر", html);

  document.getElementById("modal-form-add-store-link").onsubmit = function(e) {
    e.preventDefault();
    const newL = {
      id: Date.now(),
      name: getVal("stl-name"),
      price: getVal("stl-price"),
      category: getVal("stl-cat") || "عام",
      link: getVal("stl-link")
    };
    if (!window.siteData.storeDashboard.featuredStoreLinks) window.siteData.storeDashboard.featuredStoreLinks = [];
    window.siteData.storeDashboard.featuredStoreLinks.push(newL);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderStoreFeaturedLinksTable();
    showToast("تمت إضافة فرصة التبرع بنجاح!");
  };
};

window.openEditStoreLinkModal = function(id) {
  const list = window.siteData.storeDashboard.featuredStoreLinks || [];
  const item = list.find(l => l.id == id);
  if (!item) return;

  const html = `
    <form id="modal-form-edit-store-link">
      <div class="admin-form-group">
        <label class="admin-label">اسم الفرصة:</label>
        <input type="text" id="stl-edit-name" class="admin-input" value="${item.name}" required>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">السعر:</label>
          <input type="text" id="stl-edit-price" class="admin-input" value="${item.price}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">التصنيف:</label>
          <input type="text" id="stl-edit-cat" class="admin-input" value="${item.category}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الرابط:</label>
        <input type="url" id="stl-edit-link" class="admin-input" value="${item.link}" required>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل فرصة التبرع بالمتجر", html);

  document.getElementById("modal-form-edit-store-link").onsubmit = function(e) {
    e.preventDefault();
    item.name = getVal("stl-edit-name");
    item.price = getVal("stl-edit-price");
    item.category = getVal("stl-edit-cat");
    item.link = getVal("stl-edit-link");
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderStoreFeaturedLinksTable();
    showToast("تم تحديث فرصة التبرع بنجاح!");
  };
};

window.deleteStoreLink = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذه الفرصة؟")) return;
  window.siteData.storeDashboard.featuredStoreLinks = (window.siteData.storeDashboard.featuredStoreLinks || []).filter(l => l.id != id);
  window.saveSiteData(window.siteData);
  renderStoreFeaturedLinksTable();
  showToast("تم حذف فرصة التبرع.");
};

// 7.2 Bank Accounts
function renderBanksTable() {
  const tbody = document.getElementById("admin-banks-tbody");
  if (!tbody) return;
  const list = (window.siteData.brand && window.siteData.brand.bank_accounts) || [];
  tbody.innerHTML = list.map(b => `
    <tr>
      <td style="font-weight: 700;">${b.bank}</td>
      <td><span class="badge badge-primary">${b.purpose}</span></td>
      <td style="font-family: monospace; direction: ltr; text-align: right; font-weight: 700;">${b.iban}</td>
      <td>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditBankAccountModal(${b.id})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteBankAccount(${b.id})">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.openAddBankAccountModal = function() {
  const html = `
    <form id="modal-form-add-bank">
      <div class="admin-form-group">
        <label class="admin-label">اسم البنك:</label>
        <input type="text" id="bank-name" class="admin-input" required placeholder="مثال: مصرف الراجحي">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الغرض والمصرف:</label>
        <input type="text" id="bank-purpose" class="admin-input" required placeholder="مثال: الزكاة الشرعية / الصدقات">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الآيبان الدولي (IBAN):</label>
        <input type="text" id="bank-iban" class="admin-input" required placeholder="SA5980000414608010000990" style="direction: ltr;">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة الحساب</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة حساب بنكي معتمد", html);

  document.getElementById("modal-form-add-bank").onsubmit = function(e) {
    e.preventDefault();
    const newB = {
      id: Date.now(),
      bank: getVal("bank-name"),
      purpose: getVal("bank-purpose"),
      iban: getVal("bank-iban").trim()
    };
    if (!window.siteData.brand.bank_accounts) window.siteData.brand.bank_accounts = [];
    window.siteData.brand.bank_accounts.push(newB);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderBanksTable();
    showToast("تمت إضافة الحساب البنكي بنجاح!");
  };
};

window.openEditBankAccountModal = function(id) {
  const list = window.siteData.brand.bank_accounts || [];
  const b = list.find(item => item.id == id);
  if (!b) return;

  const html = `
    <form id="modal-form-edit-bank">
      <div class="admin-form-group">
        <label class="admin-label">اسم البنك:</label>
        <input type="text" id="bank-edit-name" class="admin-input" value="${b.bank}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الغرض:</label>
        <input type="text" id="bank-edit-purpose" class="admin-input" value="${b.purpose}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الآيبان (IBAN):</label>
        <input type="text" id="bank-edit-iban" class="admin-input" value="${b.iban}" required style="direction: ltr;">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل الحساب البنكي", html);

  document.getElementById("modal-form-edit-bank").onsubmit = function(e) {
    e.preventDefault();
    b.bank = getVal("bank-edit-name");
    b.purpose = getVal("bank-edit-purpose");
    b.iban = getVal("bank-edit-iban").trim();
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderBanksTable();
    showToast("تم تحديث الحساب البنكي بنجاح!");
  };
};

window.deleteBankAccount = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا الحساب؟")) return;
  window.siteData.brand.bank_accounts = (window.siteData.brand.bank_accounts || []).filter(b => b.id != id);
  window.saveSiteData(window.siteData);
  renderBanksTable();
  showToast("تم حذف الحساب البنكي.");
};

// 7.3 Zakat Calculator Form
function renderZakatCalculatorForm() {
  const c = window.siteData.calculatorSettings || {};
  setVal("calc-edit-gold24", c.goldGramPrice24k || 340);
  setVal("calc-edit-gold21", c.goldGramPrice21k || 297.5);
  setVal("calc-edit-gold18", c.goldGramPrice18k || 255);
  setVal("calc-edit-silver", c.silverGramPrice || 3.8);
  setVal("calc-edit-nisab-gold", c.nisabGoldGrams || 85);
  setVal("calc-edit-nisab-silver", c.nisabSilverGrams || 595);

  const form = document.getElementById("form-edit-zakat-calc");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.calculatorSettings) window.siteData.calculatorSettings = {};
      const cs = window.siteData.calculatorSettings;
      cs.goldGramPrice24k = parseFloat(getVal("calc-edit-gold24")) || 340;
      cs.goldGramPrice21k = parseFloat(getVal("calc-edit-gold21")) || 297.5;
      cs.goldGramPrice18k = parseFloat(getVal("calc-edit-gold18")) || 255;
      cs.silverGramPrice = parseFloat(getVal("calc-edit-silver")) || 3.8;
      cs.nisabGoldGrams = parseFloat(getVal("calc-edit-nisab-gold")) || 85;
      cs.nisabSilverGrams = parseFloat(getVal("calc-edit-nisab-silver")) || 595;

      window.saveSiteData(window.siteData);
      showToast("تم تحديث إعدادات وأسعار حاسبة الزكاة بنجاح!");
    };
  }
}

// 7.4 Impact Simulator Form & Presets
function renderImpactSimulatorForm() {
  const c = window.siteData.calculatorSettings || {};
  const f = c.impactSimulatorFactors || {};
  setVal("calc-edit-factor-food", f.foodPerDayCost || 10);
  setVal("calc-edit-factor-water", f.waterLitersPerSar || 25);
  setVal("calc-edit-factor-orphan", f.orphanMonthlyCost || 250);
  setVal("calc-edit-factor-clothes", f.clothingUnitCost || 300);

  const form = document.getElementById("form-edit-impact-simulator");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.calculatorSettings) window.siteData.calculatorSettings = {};
      if (!window.siteData.calculatorSettings.impactSimulatorFactors) window.siteData.calculatorSettings.impactSimulatorFactors = {};
      const isf = window.siteData.calculatorSettings.impactSimulatorFactors;
      isf.foodPerDayCost = parseFloat(getVal("calc-edit-factor-food")) || 10;
      isf.waterLitersPerSar = parseFloat(getVal("calc-edit-factor-water")) || 25;
      isf.orphanMonthlyCost = parseFloat(getVal("calc-edit-factor-orphan")) || 250;
      isf.clothingUnitCost = parseFloat(getVal("calc-edit-factor-clothes")) || 300;

      window.saveSiteData(window.siteData);
      showToast("تم تحديث معاملات محاكاة أثر التبرع بنجاح!");
    };
  }
}

function renderSimulationPresetsList() {
  const container = document.getElementById("admin-presets-container");
  if (!container) return;
  const list = (window.siteData.calculatorSettings && window.siteData.calculatorSettings.impactPresets) || [];
  container.innerHTML = list.map((pr, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-header">
        <div>
          <span style="font-size: 1.25rem; font-weight: 700; color: var(--admin-primary);">${pr.amount} ر.س</span>
          <h4 class="admin-item-title">${pr.title}</h4>
        </div>
        <span class="badge badge-primary">${pr.badge || "شريحة أثر"}</span>
      </div>
      <p style="font-size: 0.85rem; color: #475569; margin: 0.4rem 0;">${pr.description}</p>
      <div class="admin-item-actions">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditPresetModal(${idx})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deletePreset(${idx})">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddPresetModal = function() {
  const html = `
    <form id="modal-form-add-preset">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المبلغ (ر.س):</label>
          <input type="number" id="pre-amount" class="admin-input" required placeholder="مثال: 50">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">عنوان الأثر:</label>
          <input type="text" id="pre-title" class="admin-input" required placeholder="مثال: سقيا ماء شرب عذب">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوسم / التصنيف:</label>
        <input type="text" id="pre-badge" class="admin-input" placeholder="سقيا ماء / أمن غذائي">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">وصف ما يحققه هذا التبرع بالأرقام:</label>
        <textarea id="pre-desc" class="admin-textarea" required placeholder="يوفر 1,250 لتراً من مياه الشرب النقية للأسر..."></textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة الشريحة</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة شريحة محاكاة أثر", html);

  document.getElementById("modal-form-add-preset").onsubmit = function(e) {
    e.preventDefault();
    const newPr = {
      amount: parseInt(getVal("pre-amount"), 10) || 50,
      title: getVal("pre-title"),
      badge: getVal("pre-badge") || "أثر تبرع",
      description: getVal("pre-desc"),
      icon: "sparkles"
    };
    if (!window.siteData.calculatorSettings.impactPresets) window.siteData.calculatorSettings.impactPresets = [];
    window.siteData.calculatorSettings.impactPresets.push(newPr);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderSimulationPresetsList();
    showToast("تمت إضافة شريحة محاكاة الأثر بنجاح!");
  };
};

window.openEditPresetModal = function(idx) {
  const list = window.siteData.calculatorSettings.impactPresets || [];
  const pr = list[idx];
  if (!pr) return;

  const html = `
    <form id="modal-form-edit-preset">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">المبلغ (ر.س):</label>
          <input type="number" id="pre-edit-amount" class="admin-input" value="${pr.amount}" required>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">العنوان:</label>
          <input type="text" id="pre-edit-title" class="admin-input" value="${pr.title}" required>
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوسم:</label>
        <input type="text" id="pre-edit-badge" class="admin-input" value="${pr.badge || ''}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوصف التفصيلي للأثر:</label>
        <textarea id="pre-edit-desc" class="admin-textarea" required>${pr.description}</textarea>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل شريحة محاكاة الأثر", html);

  document.getElementById("modal-form-edit-preset").onsubmit = function(e) {
    e.preventDefault();
    pr.amount = parseInt(getVal("pre-edit-amount"), 10) || 50;
    pr.title = getVal("pre-edit-title");
    pr.badge = getVal("pre-edit-badge");
    pr.description = getVal("pre-edit-desc");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderSimulationPresetsList();
    showToast("تم تحديث شريحة محاكاة الأثر بنجاح!");
  };
};

window.deletePreset = function(idx) {
  if (!confirm("هل أنت متأكد من حذف هذه الشريحة؟")) return;
  window.siteData.calculatorSettings.impactPresets.splice(idx, 1);
  window.saveSiteData(window.siteData);
  renderSimulationPresetsList();
  showToast("تم حذف الشريحة بنجاح.");
};

/* ==========================================================================
   8. PAGE 7: Vision & 2030 Goals CMS (الرؤية ومستهدفات 2030)
   ========================================================================== */
function renderVisionMissionForm() {
  const v = window.siteData.vision2030Goals || {};
  setVal("edit-vision-text", v.vision || "");
  setVal("edit-mission-text", v.mission || "");

  const form = document.getElementById("form-edit-vision-mission");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.vision2030Goals) window.siteData.vision2030Goals = {};
      window.siteData.vision2030Goals.vision = getVal("edit-vision-text");
      window.siteData.vision2030Goals.mission = getVal("edit-mission-text");

      window.saveSiteData(window.siteData);
      showToast("تم حفظ نصوص الرؤية والرسالة بنجاح!");
    };
  }
}

function renderVisionGoalsList() {
  const container = document.getElementById("admin-vision-goals-container");
  if (!container) return;
  const list = (window.siteData.vision2030Goals && window.siteData.vision2030Goals.goals2030) || [];
  container.innerHTML = list.map(g => `
    <div class="admin-item-card">
      <div class="admin-item-header">
        <div>
          <span class="badge badge-gold" style="font-size: 0.75rem;">هدف (${g.num || '2030'})</span>
          <h4 class="admin-item-title" style="margin-top: 0.35rem;">${g.title}</h4>
        </div>
        <span class="badge badge-primary">${g.targetMetric}</span>
      </div>
      <p style="font-size: 0.88rem; color: #475569; margin: 0.4rem 0;">${g.desc}</p>
      <div style="background: #F1F5F9; border-radius: 8px; padding: 0.75rem; font-size: 0.82rem; color: #334155;">
        <strong>الوضع الراهن والتقدم:</strong> ${g.currentStatus}
      </div>
      <div class="admin-item-actions">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditVisionGoalModal('${g.id}')">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteVisionGoal('${g.id}')">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddVisionGoalModal = function() {
  const html = `
    <form id="modal-form-add-goal">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رقم المستهدف:</label>
          <input type="text" id="goal-num" class="admin-input" placeholder="06">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">العام المستهدف:</label>
          <input type="text" id="goal-year" class="admin-input" value="2030">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">عنوان المستهدف التنموي:</label>
        <input type="text" id="goal-title" class="admin-input" required placeholder="مثال: التحول التنموي الشامل للأسر القادرة">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المؤشر الرقمي المستهدف:</label>
        <input type="text" id="goal-metric" class="admin-input" required placeholder="مثال: 100% تمكين أو صفر منازل غير مؤهلة">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الشرح التفصيلي للهدف:</label>
        <textarea id="goal-desc" class="admin-textarea" required placeholder="شرح ما تسعى الجمعية لتحقيقه..."></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوضع الراهن للتقدم والإنجاز:</label>
        <input type="text" id="goal-status" class="admin-input" placeholder="مثال: تمكين أكثر من 45 أسرة منتجة وتوليد 890 ألف ريال">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة المستهدف</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة مستهدف 2030 جديد", html);

  document.getElementById("modal-form-add-goal").onsubmit = function(e) {
    e.preventDefault();
    const newGoal = {
      id: `goal-${Date.now()}`,
      num: getVal("goal-num") || "06",
      targetYear: getVal("goal-year") || "2030",
      title: getVal("goal-title"),
      targetMetric: getVal("goal-metric"),
      desc: getVal("goal-desc"),
      currentStatus: getVal("goal-status")
    };
    if (!window.siteData.vision2030Goals.goals2030) window.siteData.vision2030Goals.goals2030 = [];
    window.siteData.vision2030Goals.goals2030.push(newGoal);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderVisionGoalsList();
    showToast("تمت إضافة مستهدف 2030 بنجاح!");
  };
};

window.openEditVisionGoalModal = function(id) {
  const g = (window.siteData.vision2030Goals.goals2030 || []).find(item => item.id === id);
  if (!g) return;

  const html = `
    <form id="modal-form-edit-goal">
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">رقم المستهدف:</label>
          <input type="text" id="goal-edit-num" class="admin-input" value="${g.num || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">العام المستهدف:</label>
          <input type="text" id="goal-edit-year" class="admin-input" value="${g.targetYear || '2030'}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">عنوان المستهدف:</label>
        <input type="text" id="goal-edit-title" class="admin-input" value="${g.title}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المؤشر المستهدف:</label>
        <input type="text" id="goal-edit-metric" class="admin-input" value="${g.targetMetric}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الشرح التفصيلي:</label>
        <textarea id="goal-edit-desc" class="admin-textarea" required>${g.desc}</textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">الوضع الراهن:</label>
        <input type="text" id="goal-edit-status" class="admin-input" value="${g.currentStatus || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل مستهدف 2030", html);

  document.getElementById("modal-form-edit-goal").onsubmit = function(e) {
    e.preventDefault();
    g.num = getVal("goal-edit-num");
    g.targetYear = getVal("goal-edit-year");
    g.title = getVal("goal-edit-title");
    g.targetMetric = getVal("goal-edit-metric");
    g.desc = getVal("goal-edit-desc");
    g.currentStatus = getVal("goal-edit-status");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderVisionGoalsList();
    showToast("تم تحديث مستهدف 2030 بنجاح!");
  };
};

window.deleteVisionGoal = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا المستهدف؟")) return;
  window.siteData.vision2030Goals.goals2030 = (window.siteData.vision2030Goals.goals2030 || []).filter(g => g.id !== id);
  window.saveSiteData(window.siteData);
  renderVisionGoalsList();
  showToast("تم حذف المستهدف بنجاح.");
};

/* ==========================================================================
   9. PAGE 8: Contact & Media CMS (تواصل والمركز الإعلامي)
   ========================================================================== */
function renderExecutiveForm() {
  const b = window.siteData.brand || {};
  setVal("edit-exec-name", b.executive_director_name || "");
  setVal("edit-exec-title", b.executive_director_title || "");
  setVal("edit-exec-email", b.executive_email || "");
  setVal("edit-exec-phone", b.executive_phone || "");
  setVal("edit-exec-fax", b.executive_fax || "");
  setVal("edit-brand-email", b.official_email || "");

  const form = document.getElementById("form-edit-executive");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!window.siteData.brand) window.siteData.brand = {};
      const brand = window.siteData.brand;
      brand.executive_director_name = getVal("edit-exec-name");
      brand.executive_director_title = getVal("edit-exec-title");
      brand.executive_email = getVal("edit-exec-email");
      brand.executive_phone = getVal("edit-exec-phone");
      brand.executive_fax = getVal("edit-exec-fax");
      brand.official_email = getVal("edit-brand-email");

      window.saveSiteData(window.siteData);
      showToast("تم حفظ بيانات الإدارة التنفيذية وقنوات التواصل بنجاح!");
    };
  }
}

function renderSocialCampaignsList() {
  const container = document.getElementById("admin-social-campaigns-container");
  if (!container) return;
  const list = (window.siteData.socialMediaContext && window.siteData.socialMediaContext.featuredCampaigns) || [];
  container.innerHTML = list.map(c => `
    <div class="admin-item-card">
      ${c.image ? `<img src="${c.image}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 6px; margin-bottom: 0.5rem;" onerror="this.style.display='none'">` : ''}
      <div class="admin-item-header">
        <h4 class="admin-item-title">${c.title}</h4>
        <span class="badge badge-primary">${c.date || "مستمر"}</span>
      </div>
      <p style="font-size: 0.85rem; color: #475569; margin: 0.4rem 0;">${c.content}</p>
      <div style="font-size: 0.8rem; color: var(--admin-primary); font-weight: 600;">${c.tag || ""}</div>
      <div class="admin-item-actions">
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openEditSocialCampaignModal(${c.id})">تعديل</button>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteSocialCampaign(${c.id})">حذف</button>
      </div>
    </div>
  `).join("");
}

window.openAddSocialCampaignModal = function() {
  const html = `
    <form id="modal-form-add-campaign">
      <div class="admin-form-group">
        <label class="admin-label">عنوان الحملة / المنشور:</label>
        <input type="text" id="camp-title" class="admin-input" required placeholder="مثال: مشروع السقيا والتحلية">
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">التاريخ / المناسبة:</label>
          <input type="text" id="camp-date" class="admin-input" placeholder="مستمر طوال العام / 23 سبتمبر">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">الوسوم (هاشتاق):</label>
          <input type="text" id="camp-tag" class="admin-input" placeholder="#صدقة_جارية #جمعية_البر">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">نص التغريدة أو المحتوى الإعلامي:</label>
        <textarea id="camp-content" class="admin-textarea" rows="3" required placeholder="نص المنشور الإعلامي المؤثر..."></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط الصورة المرفقة أو مسارها:</label>
        <input type="text" id="camp-img" class="admin-input" placeholder="assets/tweet_3_water_desalination.jpg">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">إضافة الحملة</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("إضافة حملة إعلامية جديدة", html);

  document.getElementById("modal-form-add-campaign").onsubmit = function(e) {
    e.preventDefault();
    const newCamp = {
      id: Date.now(),
      title: getVal("camp-title"),
      date: getVal("camp-date") || "مستمر",
      tag: getVal("camp-tag"),
      content: getVal("camp-content"),
      image: getVal("camp-img") || "assets/tweet_1_national_day_1.jpg"
    };
    if (!window.siteData.socialMediaContext.featuredCampaigns) window.siteData.socialMediaContext.featuredCampaigns = [];
    window.siteData.socialMediaContext.featuredCampaigns.push(newCamp);
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderSocialCampaignsList();
    showToast("تمت إضافة الحملة الإعلامية بنجاح!");
  };
};

window.openEditSocialCampaignModal = function(id) {
  const list = window.siteData.socialMediaContext.featuredCampaigns || [];
  const c = list.find(item => item.id == id);
  if (!c) return;

  const html = `
    <form id="modal-form-edit-campaign">
      <div class="admin-form-group">
        <label class="admin-label">العنوان:</label>
        <input type="text" id="camp-edit-title" class="admin-input" value="${c.title}" required>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label class="admin-label">التاريخ:</label>
          <input type="text" id="camp-edit-date" class="admin-input" value="${c.date || ''}">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">الوسوم:</label>
          <input type="text" id="camp-edit-tag" class="admin-input" value="${c.tag || ''}">
        </div>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">المحتوى:</label>
        <textarea id="camp-edit-content" class="admin-textarea" rows="3" required>${c.content}</textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">مسار الصورة:</label>
        <input type="text" id="camp-edit-img" class="admin-input" value="${c.image || ''}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل الحملة الإعلامية", html);

  document.getElementById("modal-form-edit-campaign").onsubmit = function(e) {
    e.preventDefault();
    c.title = getVal("camp-edit-title");
    c.date = getVal("camp-edit-date");
    c.tag = getVal("camp-edit-tag");
    c.content = getVal("camp-edit-content");
    c.image = getVal("camp-edit-img");

    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderSocialCampaignsList();
    showToast("تم تحديث الحملة الإعلامية بنجاح!");
  };
};

window.deleteSocialCampaign = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذه الحملة؟")) return;
  window.siteData.socialMediaContext.featuredCampaigns = (window.siteData.socialMediaContext.featuredCampaigns || []).filter(c => c.id != id);
  window.saveSiteData(window.siteData);
  renderSocialCampaignsList();
  showToast("تم حذف الحملة بنجاح.");
};

/* ==========================================================================
   10. Shared Media Library (مكتبة الصور والوسائط)
   ========================================================================== */
function renderMediaManager() {
  const container = document.getElementById("admin-gallery-grid");
  const gallery = window.siteData.gallery || [];

  if (container) {
    container.innerHTML = gallery.map(img => `
      <div class="media-item-card">
        <img src="${img.url}" alt="${img.title}" class="media-item-thumb" onerror="this.src='assets/cropped-logo-emblem.jpeg'">
        <div class="media-item-info">
          <span class="badge badge-primary" style="align-self: flex-start; font-size: 0.72rem;">${img.category}</span>
          <h4>${img.title}</h4>
          <span style="font-size: 0.72rem; color: #64748B; word-break: break-all;">${img.url.slice(0, 40)}...</span>
        </div>
        <div class="media-item-actions">
          <button class="admin-btn admin-btn-outline" style="flex: 1; font-size: 0.8rem;" onclick="openEditImageModal('${img.id}')">تعديل</button>
          <button class="admin-btn admin-btn-danger" style="font-size: 0.8rem;" onclick="deleteImage('${img.id}')">حذف</button>
        </div>
      </div>
    `).join("");
  }

  const addImageForm = document.getElementById("form-add-image");
  if (addImageForm) {
    addImageForm.onsubmit = function(e) {
      e.preventDefault();
      const title = document.getElementById("new-img-title").value;
      const category = document.getElementById("new-img-category").value;
      const fileInput = document.getElementById("new-img-file");
      const urlInput = document.getElementById("new-img-url");

      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          saveNewImage(title, category, evt.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else if (urlInput.value) {
        saveNewImage(title, category, urlInput.value.trim());
      } else {
        alert("يرجى اختيار ملف صورة أو إدخال رابط!");
      }
    };
  }
}

function saveNewImage(title, category, url) {
  const newImg = {
    id: `img-${Date.now()}`,
    title: title,
    category: category,
    url: url
  };
  if (!window.siteData.gallery) window.siteData.gallery = [];
  window.siteData.gallery.unshift(newImg);
  window.saveSiteData(window.siteData);
  renderMediaManager();
  document.getElementById("form-add-image").reset();
  showToast("تمت إضافة الصورة بنجاح إلى المعرض!");
}

window.deleteImage = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
  window.siteData.gallery = (window.siteData.gallery || []).filter(img => img.id !== id);
  window.saveSiteData(window.siteData);
  renderMediaManager();
  showToast("تم حذف الصورة بنجاح.");
};

window.openEditImageModal = function(id) {
  const img = (window.siteData.gallery || []).find(i => i.id === id);
  if (!img) return;

  const html = `
    <form id="modal-form-edit-img">
      <div class="admin-form-group">
        <label class="admin-label">عنوان الصورة:</label>
        <input type="text" id="modal-img-title" class="admin-input" value="${img.title}" required>
      </div>
      <div class="admin-form-group">
        <label class="admin-label">التصنيف:</label>
        <input type="text" id="modal-img-category" class="admin-input" value="${img.category}">
      </div>
      <div class="admin-form-group">
        <label class="admin-label">رابط الصورة (URL):</label>
        <input type="text" id="modal-img-url" class="admin-input" value="${img.url}">
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="submit" class="admin-btn admin-btn-primary" style="flex: 1;">حفظ التعديلات</button>
        <button type="button" class="admin-btn admin-btn-outline" onclick="closeAdminModal()">إلغاء</button>
      </div>
    </form>
  `;
  openAdminModal("تعديل بيانات الصورة", html);

  document.getElementById("modal-form-edit-img").onsubmit = function(e) {
    e.preventDefault();
    img.title = document.getElementById("modal-img-title").value.trim();
    img.category = document.getElementById("modal-img-category").value.trim();
    img.url = document.getElementById("modal-img-url").value.trim();
    window.saveSiteData(window.siteData);
    closeAdminModal();
    renderMediaManager();
    showToast("تم تحديث بيانات الصورة بنجاح!");
  };
};

/* ==========================================================================
   11. Complaints & Volunteers Log (الشكاوى والمتطوعين)
   ========================================================================== */
function renderComplaintsInbox() {
  const tbody = document.getElementById("admin-complaints-tbody");
  if (!tbody) return;
  const list = window.siteData.complaintsInbox || [];
  tbody.innerHTML = list.map(c => `
    <tr>
      <td style="font-family: monospace; font-weight: 700;">#${c.id}</td>
      <td>${c.date}</td>
      <td>
        <div style="font-weight: 700;">${c.senderName}</div>
        <div style="font-size: 0.75rem; color: #64748B;">${c.email || c.phone || ""}</div>
      </td>
      <td><span class="badge badge-indigo">${c.department || "عام"}</span></td>
      <td>
        <div style="font-weight: 600; color: #0F172A;">${c.subject}</div>
        <div style="font-size: 0.8rem; color: #64748B; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.message}</div>
      </td>
      <td>
        <span class="badge ${c.status === 'مكتملة ومغلقة' ? 'badge-primary' : 'badge-gold'}">${c.status || 'قيد المتابعة'}</span>
        <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="toggleComplaintStatus('${c.id}')">تغيير الحالة</button>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteComplaint('${c.id}')">حذف</button>
        </div>
      </td>
    </tr>
  `).join("");
}

window.toggleComplaintStatus = function(id) {
  const c = (window.siteData.complaintsInbox || []).find(item => item.id === id);
  if (!c) return;
  c.status = c.status === "مكتملة ومغلقة" ? "قيد المتابعة" : "مكتملة ومغلقة";
  window.saveSiteData(window.siteData);
  renderComplaintsInbox();
  showToast("تم تغيير حالة الرسالة بنجاح!");
};

window.deleteComplaint = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
  window.siteData.complaintsInbox = (window.siteData.complaintsInbox || []).filter(item => item.id !== id);
  window.saveSiteData(window.siteData);
  renderComplaintsInbox();
  renderOverviewStats();
  showToast("تم حذف الرسالة بنجاح.");
};

function renderVolunteersLog() {
  const tbody = document.getElementById("admin-volunteers-tbody");
  if (!tbody) return;
  const list = window.siteData.volunteersInbox || [];
  tbody.innerHTML = list.map(v => `
    <tr>
      <td style="font-family: monospace; font-weight: 700;">#${v.id}</td>
      <td>${v.date}</td>
      <td>
        <div style="font-weight: 700;">${v.fullName}</div>
        <div style="font-size: 0.75rem; color: #64748B;">${v.phone || ""} • ${v.email || ""}</div>
      </td>
      <td><span class="badge badge-primary">${v.skillType || "تطوع عام"}</span></td>
      <td style="font-size: 0.82rem; color: #475569; max-width: 250px;">${v.notes || v.idea || "-"}</td>
      <td>
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="deleteVolunteer('${v.id}')">حذف</button>
      </td>
    </tr>
  `).join("");
}

window.deleteVolunteer = function(id) {
  if (!confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
  window.siteData.volunteersInbox = (window.siteData.volunteersInbox || []).filter(item => item.id !== id);
  window.saveSiteData(window.siteData);
  renderVolunteersLog();
  showToast("تم حذف سجل المتطوع بنجاح.");
};

/* ==========================================================================
   12. Backup & Restore (النسخ الاحتياطي وإدارة النظام)
   ========================================================================== */
function initBackupAndRestore() {
  const btnExport = document.getElementById("btn-export-backup");
  if (btnExport) {
    btnExport.onclick = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.siteData, null, 2));
      const dlAnchor = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `aljelah_backup_${dateStr}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast("تم تصدير ملف النسخة الاحتياطية بنجاح!");
    };
  }

  const fileInput = document.getElementById("backup-file-input");
  if (fileInput) {
    fileInput.onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed && parsed.brand && parsed.hero) {
            window.siteData = parsed;
            window.saveSiteData(parsed);
            alert("تم استيراد النسخة الاحتياطية وتحديث بيانات الموقع بنجاح! سيتم تحديث الصفحة الآن.");
            window.location.reload();
          } else {
            alert("الملف غير متوافق مع هيكل بيانات الجمعية!");
          }
        } catch (err) {
          alert("خطأ في قراءة ملف JSON: " + err.message);
        }
      };
      reader.readAsText(file);
    };
  }

  const btnReset = document.getElementById("btn-factory-reset");
  if (btnReset) {
    btnReset.onclick = () => {
      if (confirm("تحذير: هل أنت متأكد من استعادة البيانات الرسمية الأصلية؟ سيتم تصفير جميع التعديلات المحلية.")) {
        if (typeof window.resetSiteDataToDefault === "function") {
          window.siteData = window.resetSiteDataToDefault();
        } else {
          localStorage.removeItem("aljelah_site_data");
        }
        alert("تمت استعادة البيانات الرسمية المعتمدة بنجاح! جاري تحديث الصفحة.");
        window.location.reload();
      }
    };
  }
}

/* ==========================================================================
   Universal Modal & UI Helpers
   ========================================================================== */
window.openAdminModal = function(title, bodyHtml) {
  const modal = document.getElementById("admin-modal");
  const titleElem = document.getElementById("admin-modal-title");
  const bodyElem = document.getElementById("admin-modal-body");

  if (modal && titleElem && bodyElem) {
    titleElem.textContent = title;
    bodyElem.innerHTML = bodyHtml;
    modal.style.display = "flex";
  }
};

window.closeAdminModal = function() {
  const modal = document.getElementById("admin-modal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("admin-modal-body").innerHTML = "";
  }
};

window.showToast = function(msg) {
  const existing = document.querySelector(".admin-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "admin-toast";
  const iconSvg = window.getSvgIcon ? window.getSvgIcon("check-circle", "", "20px") : "";
  toast.innerHTML = `${iconSvg} <span>${msg}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Safe DOM Helper Functions
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function setElemText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
