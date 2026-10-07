/**
 * Frontend Controller & Reactive Interactivity
 * جمعية البر الخيرية بالجله وتبراك (ترخيص رقم 210)
 */

document.addEventListener("DOMContentLoaded", () => {
  initSvgIcons();
  initHero();
  initBrandInfo();
  initRouter();
  initImpactDashboard();
  initStoreDashboard();
  initProjectsImpact();
  initPrograms();
  initSeasonalProjects();
  initSwipeCarousels();
  initAboutSections();
  initGovernanceExplorer();
  initCalculators();
  initVisionGoals();
  initContactAndSocial();
  initForms();
  initMobileNav();
});

function initSvgIcons() {
  if (!window.getSvgIcon) return;

  // Header Nav & CTA Icons
  const navBtnIcon = document.getElementById("nav-btn-icon");
  if (navBtnIcon) navBtnIcon.innerHTML = window.getSvgIcon("heart", "", "16px");

  const navAdminIcon = document.getElementById("nav-admin-icon");
  if (navAdminIcon) navAdminIcon.innerHTML = window.getSvgIcon("settings", "", "18px");

  const mobileMenuIcon = document.getElementById("mobile-menu-icon");
  if (mobileMenuIcon) mobileMenuIcon.innerHTML = window.getSvgIcon("menu", "", "22px");

  // Mobile Bottom Nav & Action Sheet Icons
  document.querySelectorAll(".mobile-bottom-icon[data-icon], .mobile-sheet-icon[data-icon]").forEach(el => {
    const iconName = el.dataset.icon;
    el.innerHTML = window.getSvgIcon(iconName, "", "20px");
  });

  // Hero CTAs
  document.querySelectorAll(".hero-cta-cart-icon").forEach(el => {
    el.innerHTML = window.getSvgIcon("shopping-cart", "", "18px");
  });
  document.querySelectorAll(".hero-cta-impact-icon").forEach(el => {
    el.innerHTML = window.getSvgIcon("trending-up", "", "18px");
  });
  document.querySelectorAll(".hero-cta-calc-icon").forEach(el => {
    el.innerHTML = window.getSvgIcon("calculator", "", "18px");
  });

  // Home KPI Cards Icons (6 Balanced Dual Impact Cards)
  const kpiCases = document.getElementById("home-kpi-icon-cases");
  if (kpiCases) kpiCases.innerHTML = window.getSvgIcon("users", "", "24px");

  const kpiFam = document.getElementById("home-kpi-icon-families");
  if (kpiFam) kpiFam.innerHTML = window.getSvgIcon("package", "", "24px");

  const kpiWater = document.getElementById("home-kpi-icon-water");
  if (kpiWater) kpiWater.innerHTML = window.getSvgIcon("droplet", "", "24px");

  const kpiOrph = document.getElementById("home-kpi-icon-orphans");
  if (kpiOrph) kpiOrph.innerHTML = window.getSvgIcon("child", "", "24px");

  const kpiTrain = document.getElementById("home-kpi-icon-training");
  if (kpiTrain) kpiTrain.innerHTML = window.getSvgIcon("graduation-cap", "", "24px");

  const kpiHouse = document.getElementById("home-kpi-icon-housing");
  if (kpiHouse) kpiHouse.innerHTML = window.getSvgIcon("home", "", "24px");

  const kpiVill = document.getElementById("home-kpi-icon-villages");
  if (kpiVill) kpiVill.innerHTML = window.getSvgIcon("map-pin", "", "24px");

  // Home Store Callout
  const calloutCart = document.getElementById("callout-cart-icon");
  if (calloutCart) calloutCart.innerHTML = window.getSvgIcon("shopping-cart", "", "18px");

  const calloutCalc = document.getElementById("callout-calc-icon");
  if (calloutCalc) calloutCalc.innerHTML = window.getSvgIcon("calculator", "", "18px");

  // Store View KPIs
  const storeCard = document.getElementById("store-kpi-icon-card");
  if (storeCard) storeCard.innerHTML = window.getSvgIcon("card", "", "24px");

  const storeRepeat = document.getElementById("store-kpi-icon-repeat");
  if (storeRepeat) storeRepeat.innerHTML = window.getSvgIcon("repeat", "", "24px");

  const storeUsers = document.getElementById("store-kpi-icon-users");
  if (storeUsers) storeUsers.innerHTML = window.getSvgIcon("users", "", "24px");

  const storeTarget = document.getElementById("store-kpi-icon-target");
  if (storeTarget) storeTarget.innerHTML = window.getSvgIcon("target", "", "24px");

  const storeHeroCart = document.getElementById("store-hero-cart-icon");
  if (storeHeroCart) storeHeroCart.innerHTML = window.getSvgIcon("shopping-cart", "", "18px");

  const storeHeroCalc = document.getElementById("store-hero-calc-icon");
  if (storeHeroCalc) storeHeroCalc.innerHTML = window.getSvgIcon("calculator", "", "18px");

  // Projects View KPIs
  const projWallet = document.getElementById("proj-kpi-icon-wallet");
  if (projWallet) projWallet.innerHTML = window.getSvgIcon("wallet", "", "24px");

  const projUsers = document.getElementById("proj-kpi-icon-users");
  if (projUsers) projUsers.innerHTML = window.getSvgIcon("users", "", "24px");

  const projList = document.getElementById("proj-kpi-icon-list");
  if (projList) projList.innerHTML = window.getSvgIcon("file-text", "", "24px");

  const projCheck = document.getElementById("proj-kpi-icon-check");
  if (projCheck) projCheck.innerHTML = window.getSvgIcon("shield-check", "", "24px");

  // Calculator Tabs & Results
  const tabZakat = document.getElementById("tab-icon-zakat");
  if (tabZakat) tabZakat.innerHTML = window.getSvgIcon("wallet", "", "18px");

  const tabImpact = document.getElementById("tab-icon-impact");
  if (tabImpact) tabImpact.innerHTML = window.getSvgIcon("sparkles", "", "18px");

  const zakatPayIcon = document.getElementById("zakat-card-pay-icon");
  if (zakatPayIcon) zakatPayIcon.innerHTML = window.getSvgIcon("card", "", "18px");

  const simFood = document.getElementById("sim-icon-food");
  if (simFood) simFood.innerHTML = window.getSvgIcon("package", "", "22px");

  const simWater = document.getElementById("sim-icon-water");
  if (simWater) simWater.innerHTML = window.getSvgIcon("droplet", "", "22px");

  const simOrphan = document.getElementById("sim-icon-orphan");
  if (simOrphan) simOrphan.innerHTML = window.getSvgIcon("child", "", "22px");

  const simClothes = document.getElementById("sim-icon-clothes");
  if (simClothes) simClothes.innerHTML = window.getSvgIcon("shirt", "", "22px");

  const simLaunch = document.getElementById("sim-cart-launch-icon");
  if (simLaunch) simLaunch.innerHTML = window.getSvgIcon("shopping-cart", "", "18px");

  // Contact Channels Icons
  const cntMap = document.getElementById("contact-icon-map");
  if (cntMap) cntMap.innerHTML = window.getSvgIcon("map-pin", "", "22px");

  const cntPost = document.getElementById("contact-icon-post");
  if (cntPost) cntPost.innerHTML = window.getSvgIcon("file-text", "", "22px");

  const cntPhone = document.getElementById("contact-icon-phone");
  if (cntPhone) cntPhone.innerHTML = window.getSvgIcon("phone", "", "22px");

  const cntWarehouse = document.getElementById("contact-icon-warehouse");
  if (cntWarehouse) cntWarehouse.innerHTML = window.getSvgIcon("package", "", "22px");

  const cntEmail = document.getElementById("contact-icon-email");
  if (cntEmail) cntEmail.innerHTML = window.getSvgIcon("mail", "", "22px");

  // Social view store cart
  document.querySelectorAll(".social-store-cart-icon").forEach(el => {
    el.innerHTML = window.getSvgIcon("shopping-cart", "", "16px");
  });

  // Footer Icons
  const footerCart = document.getElementById("footer-cart-icon");
  if (footerCart) footerCart.innerHTML = window.getSvgIcon("shopping-cart", "", "16px");

  const footerAdmin = document.getElementById("footer-admin-icon");
  if (footerAdmin) footerAdmin.innerHTML = window.getSvgIcon("settings", "", "16px");
}

/* ==========================================================================
   1. Hero & Brand Dynamic Data Hydration
   ========================================================================== */
function initHero() {
  const h = window.siteData.hero;
  if (!h) return;

  setElemText("hero-badge-tag", h.badge || "مسجلة بوزارة الموارد البشرية والمركز الوطني برقم 210");
  setElemText("hero-title-text", h.title || "خيرٌ ونورٌ يبلغ الآفاق في الجلة وتبراك");
  setElemText("hero-subtitle-text", h.subtitle || "تسعى الجمعية إلى دعم الفقراء وتمكين الأسر المحتاجة للوصول إلى الخدمات الأساسية.");
  setElemText("hero-stat-years-val", h.statYears ? `${h.statYears} عاماً` : "24 عاماً");
  setElemText("hero-stat-villages-val", h.statVillages || "+100");
  setElemText("hero-stat-beneficiaries-val", h.statBeneficiaries || "+3,750");

  const teamImg = document.getElementById("hero-team-img");
  if (teamImg && h.imageTeam) {
    teamImg.src = h.imageTeam;
  }

  const bldgImg = document.getElementById("hero-bldg-img");
  if (bldgImg && h.imageBuilding) {
    bldgImg.src = h.imageBuilding;
  }
}

function initBrandInfo() {
  const b = window.siteData.brand;
  if (!b) return;

  setElemText("exec-director-name", `الأستاذة / ${b.executive_director_name}`);
  setElemText("exec-director-title", b.executive_director_title);
  setElemText("exec-director-phone", b.executive_phone);
  setElemText("exec-director-fax", b.executive_fax);
  
  const emailEl = document.getElementById("exec-director-email");
  if (emailEl) {
    emailEl.textContent = b.executive_email;
    emailEl.href = `mailto:${b.executive_email}`;
  }

  // Render Bank Accounts in Store Strip
  const bankStrip = document.getElementById("store-bank-accounts-container");
  if (bankStrip && b.bank_accounts) {
    bankStrip.innerHTML = b.bank_accounts.slice(0, 3).map(acc => `
      <div style="background: var(--color-bg); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
        <strong style="display: block; color: var(--color-primary-dark); font-size: 0.95rem;">${acc.purpose} - ${acc.bank}</strong>
        <code style="font-size: 0.85rem; direction: ltr; display: block; margin-top: 0.25rem;">${acc.iban}</code>
      </div>
    `).join("");
  }
}

/* ==========================================================================
   2. Router (Hash Based Single Page Platform)
   ========================================================================== */
function initRouter() {
  const routes = ["home", "impact", "about", "store", "projects", "programs", "vision", "contact", "social"];

  function handleRoute() {
    let hash = window.location.hash.replace("#", "") || "home";
    const parts = hash.split("/");
    const mainRoute = routes.includes(parts[0]) ? parts[0] : "home";

    // Switch active view
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const targetSec = document.getElementById(`view-${mainRoute}`);
    if (targetSec) {
      targetSec.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update active nav state
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${mainRoute}`) {
        link.classList.add("active");
      }
    });

    // Update mobile bottom nav active state
    document.querySelectorAll(".mobile-bottom-nav-item").forEach(item => {
      item.classList.remove("active");
      if (item.dataset.tab === mainRoute) {
        item.classList.add("active");
      }
    });

    // Close mobile menu & backdrop if open
    const nav = document.querySelector(".main-nav");
    const backdrop = document.getElementById("mobile-nav-backdrop");
    if (nav) nav.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
    const iconSpan = document.getElementById("mobile-menu-icon");
    if (iconSpan && window.getSvgIcon) {
      iconSpan.innerHTML = window.getSvgIcon("menu", "", "22px");
    }

    // Handle sub-route triggers
    if (mainRoute === "about" && parts[1]) {
      activateAboutSubTab(parts[1]);
      if (parts[1] === "governance") {
        window.openGovernanceExplorerModal();
      }
    } else if (mainRoute === "store" && parts[1]) {
      activateStoreSubTab(parts[1]);
    }
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle-btn") || document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".main-nav");
  const backdrop = document.getElementById("mobile-nav-backdrop");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      if (backdrop) backdrop.classList.toggle("active", isOpen);
      const iconSpan = document.getElementById("mobile-menu-icon");
      if (iconSpan && window.getSvgIcon) {
        iconSpan.innerHTML = isOpen ? window.getSvgIcon("x", "", "22px") : window.getSvgIcon("menu", "", "22px");
      }
    });
  }

  if (backdrop && nav) {
    backdrop.addEventListener("click", () => {
      nav.classList.remove("open");
      backdrop.classList.remove("active");
      const iconSpan = document.getElementById("mobile-menu-icon");
      if (iconSpan && window.getSvgIcon) {
        iconSpan.innerHTML = window.getSvgIcon("menu", "", "22px");
      }
    });
  }

  // Close mobile nav when any link is clicked
  document.querySelectorAll(".main-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
      if (backdrop) backdrop.classList.remove("active");
      const iconSpan = document.getElementById("mobile-menu-icon");
      if (iconSpan && window.getSvgIcon) {
        iconSpan.innerHTML = window.getSvgIcon("menu", "", "22px");
      }
    });
  });
}

// Action Sheet Modal Controllers
window.openMobileActionSheet = function() {
  const sheet = document.getElementById("mobile-action-sheet");
  if (sheet) {
    sheet.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
};

window.closeMobileActionSheet = function(event) {
  if (event && event.target && event.target.closest(".mobile-action-sheet-drawer") && !event.target.closest(".mobile-sheet-close-btn") && !event.target.closest(".mobile-sheet-card")) {
    return;
  }
  const sheet = document.getElementById("mobile-action-sheet");
  if (sheet) {
    sheet.style.display = "none";
    document.body.style.overflow = "";
  }
};

/* ==========================================================================
   3. Impact Dashboard Controller (Current Year vs 5 Years)
   ========================================================================== */
let currentDashboardMode = "currentYear";

function initImpactDashboard() {
  const btnCurrent = document.getElementById("btn-impact-current");
  const btnFive = document.getElementById("btn-impact-five");

  if (btnCurrent && btnFive) {
    btnCurrent.addEventListener("click", () => {
      currentDashboardMode = "currentYear";
      btnCurrent.classList.add("active");
      btnFive.classList.remove("active");
      renderImpactData();
    });

    btnFive.addEventListener("click", () => {
      currentDashboardMode = "fiveYears";
      btnFive.classList.add("active");
      btnCurrent.classList.remove("active");
      renderImpactData();
    });
  }

  renderImpactData();
}

function renderImpactData() {
  const data = window.siteData.impactDashboard[currentDashboardMode];
  if (!data) return;

  // Title & label
  const periodLabel = document.getElementById("impact-period-label");
  if (periodLabel) periodLabel.textContent = data.yearLabel;

  // 6 Primary Balanced Dual Impact Metric Cards
  setElemText("kpi-beneficiaries-val", data.beneficiariesTotal || data.meatBeneficiaries || "+3,750");
  setElemText("kpi-disbursed-val", `${data.totalDisbursed} ر.س`);
  
  setElemText("kpi-families-val", data.beneficiaryFamilies || "750+");
  setElemText("kpi-families-tag", currentDashboardMode === "currentYear" ? "1,479,270 ر.س" : "7,500,000+ ر.س");

  setElemText("kpi-water-val", data.waterBeneficiaries || "20,000");
  setElemText("kpi-water-tag", currentDashboardMode === "currentYear" ? "78,053 ر.س" : "تشغيل مستدام للتحلية");

  setElemText("kpi-orphans-val", data.orphansSponsored || "55");
  setElemText("kpi-orphans-tag", currentDashboardMode === "currentYear" ? "334,350 ر.س" : "1,650,000+ ر.س");

  setElemText("kpi-training-val", data.trainingGraduates || "220");
  setElemText("kpi-training-tag", currentDashboardMode === "currentYear" ? "284,294 ر.س" : "تأهيل معتمد");

  setElemText("kpi-housing-val", data.housingClothingTotal || data.clothingBeneficiaries || "1,150+");
  setElemText("kpi-housing-tag", currentDashboardMode === "currentYear" ? "911,050 ر.س" : "4,600,000+ ر.س");

  // Breakdown grid: Integrated Human Impact Cards (بطاقات أثر متكاملة)
  const breakdownContainer = document.getElementById("impact-breakdown-container");
  if (breakdownContainer && data.metrics) {
    breakdownContainer.innerHTML = data.metrics.map(m => `
      <div class="breakdown-row-card">
        <div class="breakdown-header">
          <span class="breakdown-title">${m.title}</span>
          <span class="badge badge-primary">${m.badge || "أثر معتمد"}</span>
        </div>
        <div class="breakdown-human-hero">
          <span class="breakdown-cases-highlight">${m.casesCount || m.count}</span>
          <span class="breakdown-val">${m.value}</span>
        </div>
        <div class="breakdown-progress-track">
          <div class="breakdown-progress-fill" style="width: ${Math.min(100, Math.max(10, m.percent * 2.5))}%;"></div>
        </div>
        <div class="breakdown-aid-desc">
          ${m.aidDescription || m.count}
        </div>
      </div>
    `).join("");
  }
}

/* ==========================================================================
   4. Store Impact Dashboard & Embedded Portal
   ========================================================================== */
function initStoreDashboard() {
  const sd = window.siteData.storeDashboard;
  if (!sd) return;

  setElemText("store-kpi-total-val", sd.totalStoreDonations);
  setElemText("store-kpi-orders-val", sd.totalDonationTransactions);
  setElemText("store-kpi-donors-val", sd.activeDigitalDonors);
  setElemText("store-kpi-projects-val", sd.fundedProjectsCount);

  // Badges with SVG Icons
  const badgesContainer = document.getElementById("store-impact-badges-container");
  if (badgesContainer && sd.impactMetrics) {
    badgesContainer.innerHTML = sd.impactMetrics.map(m => {
      const iconKey = m.icon || "sparkles";
      const svgIcon = window.getSvgIcon ? window.getSvgIcon(iconKey, "", "22px") : "";
      return `
        <div class="store-impact-tag-card">
          <span class="store-impact-tag-icon">${svgIcon}</span>
          <div>
            <span style="font-size: 0.82rem; color: var(--color-text-muted); display: block;">${m.title}</span>
            <strong style="font-size: 1.05rem; color: var(--color-text-title);">${m.value}</strong>
          </div>
        </div>
      `;
    }).join("");
  }

  // Featured Products inside Embed
  const prodContainer = document.getElementById("store-featured-products-container");
  if (prodContainer && sd.featuredStoreLinks) {
    prodContainer.innerHTML = sd.featuredStoreLinks.map(p => `
      <div class="store-product-quick-card">
        <span class="badge badge-primary" style="font-size: 0.72rem; align-self: center;">${p.category}</span>
        <div class="store-product-title">${p.name}</div>
        <div class="store-product-price">${p.price}</div>
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="margin-top: auto;">
          <span>تبرع فوري</span>
        </a>
      </div>
    `).join("");
  }
}

/* ==========================================================================
   5. Projects Impact Dashboard & Seasonal Projects Renderer
   ========================================================================== */
function initProjectsImpact() {
  const pi = window.siteData.projectsImpact;
  if (!pi) return;

  setElemText("proj-kpi-budget-val", pi.totalBudget);
  setElemText("proj-kpi-beneficiaries-val", pi.totalBeneficiaries);
  setElemText("proj-kpi-count-val", pi.activeProjectsCount);
  setElemText("proj-kpi-completion-val", pi.completionRate);

  const container = document.getElementById("projects-impact-highlights-container");
  if (container && pi.impactHighlights) {
    container.innerHTML = pi.impactHighlights.map(h => `
      <div class="breakdown-row-card">
        <div class="breakdown-header">
          <span class="breakdown-title">${h.title}</span>
          <span class="breakdown-val">${h.budget}</span>
        </div>
        <div class="breakdown-meta" style="margin-top: 0.5rem;">
          <span style="font-weight: 600; color: var(--color-text-title);">${h.beneficiaries}</span>
          <span class="badge badge-gold">${h.badge}</span>
        </div>
      </div>
    `).join("");
  }
}

function initSeasonalProjects() {
  const container = document.getElementById("seasonal-projects-container");
  const homeContainer = document.getElementById("home-projects-highlights");
  const projects = window.siteData.seasonalProjects || [];

  function makeCard(p, idx) {
    const iconCard = window.getSvgIcon ? window.getSvgIcon("card", "", "14px") : "";
    const counterBadge = (typeof idx === 'number') ? `<span class="mobile-card-counter">${idx + 1} / 3</span>` : "";
    return `
      <div class="bento-cell" style="gap: 1.25rem;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <span class="badge badge-gold">${p.category}</span>
            ${counterBadge}
          </div>
          <h3 class="bento-title" style="font-size: 1.2rem; margin-top: 0.4rem;">${p.name}</h3>
          <p class="bento-desc" style="font-size: 0.92rem;">${p.description}</p>
        </div>
        <div style="background: var(--color-bg); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem;">
            <span style="color: var(--color-text-muted);">المبلغ المخصص:</span>
            <strong style="color: var(--color-primary-dark);">${p.amount}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">المستفيدون:</span>
            <strong>${p.beneficiaries}</strong>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <span class="badge badge-primary">${p.status}</span>
          <a href="https://aljelahstore.sa" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            ${iconCard}
            <span>ساهم بالمشروع</span>
          </a>
        </div>
      </div>
    `;
  }

  if (container) {
    container.innerHTML = projects.map(p => makeCard(p)).join("");
  }
  if (homeContainer) {
    homeContainer.innerHTML = projects.slice(0, 3).map((p, idx) => makeCard(p, idx)).join("");
  }
}

/* ==========================================================================
   6. Programs Renderer (Horizontal Detailed Cards)
   ========================================================================== */
function initPrograms() {
  const container = document.getElementById("programs-cards-container");
  const homeContainer = document.getElementById("home-programs-highlights");
  const programs = window.siteData.programs || [];

  // Horizontal Rich Program Card for Programs View
  function makeHorizontalCard(p) {
    const iconCheck = window.getSvgIcon ? window.getSvgIcon("check", "", "14px") : "✓";
    return `
      <div class="program-horizontal-card">
        <div class="program-h-aside">
          <img src="${p.logo}" alt="${p.name}" class="program-h-logo" onerror="this.src='assets/cropped-logo-emblem.jpeg'">
          <span class="badge badge-primary">${p.category || "برنامج استراتيجي"}</span>
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">
            المصروفات: <strong style="color: var(--color-primary-dark); display: block; font-size: 1.05rem;">${p.budget2025}</strong>
          </div>
        </div>

        <div class="program-h-main">
          <h3 class="program-h-title">${p.name}</h3>
          <div style="font-size: 0.9rem; font-weight: 600; color: var(--color-secondary-dark);">${p.subtitle}</div>
          <p class="program-h-desc">${p.description}</p>
          <ul class="program-h-bullets">
            ${(p.keyFeatures || []).map(f => `<li><span style="color: var(--color-primary);">${iconCheck}</span> ${f}</li>`).join("")}
          </ul>
        </div>

        <div class="program-h-cta">
          <a href="${p.storeProductUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width: 100%;">
            <span>دعم البرنامج بالمتجر</span>
          </a>
          <a href="${p.licensePdf}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width: 100%;">
            <span>ترخيص البرنامج (PDF)</span>
          </a>
        </div>
      </div>
    `;
  }

  // Clean Grid Card for Home View
  function makeHomeCard(p, idx) {
    const counterBadge = (typeof idx === 'number') ? `<span class="mobile-card-counter">${idx + 1} / 3</span>` : "";
    return `
      <div class="program-card">
        <div class="program-card-head">
          <img src="${p.logo}" alt="${p.name}" class="program-logo-thumb" onerror="this.src='assets/cropped-logo-emblem.jpeg'">
          <div class="program-head-info" style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
              <h3 style="margin: 0;">${p.name}</h3>
              ${counterBadge}
            </div>
            <p>${p.subtitle}</p>
          </div>
        </div>
        <div class="program-card-body">
          <div class="program-budget-box">
            <span>المصروفات لـ 2025:</span>
            <span class="program-budget-val">${p.budget2025}</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--color-text-body); line-height: 1.6;">${p.description}</p>
        </div>
        <div class="program-card-footer">
          <a href="${p.licensePdf}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <span>الترخيص (PDF)</span>
          </a>
          <a href="${p.storeProductUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>دعم البرنامج</span>
          </a>
        </div>
      </div>
    `;
  }

  if (container) {
    container.innerHTML = programs.map(makeHorizontalCard).join("");
  }
  if (homeContainer) {
    homeContainer.innerHTML = programs.slice(0, 3).map((p, idx) => makeHomeCard(p, idx)).join("");
  }
}

/* ==========================================================================
   7. About Sub-sections & Governance Explorer
   ========================================================================== */
function initAboutSections() {
  // Subnav tabs
  const subnavBtns = document.querySelectorAll(".about-subnav-btn");
  subnavBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.aboutTab;
      activateAboutSubTab(tab);
    });
  });

  // Render Board Members
  const boardContainer = document.getElementById("about-board-container");
  if (boardContainer && window.siteData.boardMembers) {
    const userSvg = window.getSvgIcon ? window.getSvgIcon("users", "", "28px") : "";
    boardContainer.innerHTML = window.siteData.boardMembers.map(m => `
      <div class="board-member-card">
        <div class="board-member-avatar">${userSvg}</div>
        <h4 class="board-member-name">${m.name}</h4>
        <div class="board-member-role">${m.role}</div>
        <p class="board-member-bio">${m.bio}</p>
        <span class="badge badge-primary" style="margin-top: auto; align-self: flex-start;">${m.tag}</span>
      </div>
    `).join("");
  }

  // Render General Assembly (40 Members)
  const assemblyContainer = document.getElementById("about-assembly-container");
  if (assemblyContainer && window.siteData.generalAssemblyMembers) {
    assemblyContainer.innerHTML = window.siteData.generalAssemblyMembers.map((name, i) => `
      <div class="assembly-member-chip">
        <span style="color: var(--color-primary); font-weight: 700;">${i + 1}.</span>
        <span>${name}</span>
      </div>
    `).join("");
  }

  // Render Working Committees
  const committeesContainer = document.getElementById("about-committees-container");
  if (committeesContainer && window.siteData.workingCommittees) {
    committeesContainer.innerHTML = window.siteData.workingCommittees.map(c => `
      <div class="committee-card">
        <h3 class="committee-head">${c.name}</h3>
        <div class="committee-leader">${c.head}</div>
        <div style="font-size: 0.9rem; margin-bottom: 0.75rem;">
          <strong style="color: var(--color-text-muted);">الأعضاء:</strong>
          <ul style="margin-top: 0.25rem; display: flex; flex-direction: column; gap: 0.2rem;">
            ${c.members.map(m => `<li style="padding-right: 1rem; position: relative;">• ${m}</li>`).join("")}
          </ul>
        </div>
        <p style="font-size: 0.88rem; color: var(--color-text-muted); background: var(--color-bg); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">${c.mission}</p>
      </div>
    `).join("");
  }

  // Render Governance Policies (10 Chapters)
  const govContainer = document.getElementById("about-governance-container");
  if (govContainer && window.siteData.governanceChapters) {
    govContainer.innerHTML = window.siteData.governanceChapters.map(g => `
      <div class="policy-accordion-item" id="policy-${g.id}">
        <div class="policy-accordion-header" onclick="togglePolicyItem('policy-${g.id}')">
          <div class="policy-header-left">
            <span class="policy-number">${g.num}</span>
            <span class="policy-title-text">${g.title}</span>
          </div>
          <span style="font-size: 1.25rem; color: var(--color-primary);">▾</span>
        </div>
        <div class="policy-accordion-content">
          <p style="margin-bottom: 0.75rem; font-size: 0.92rem; color: var(--color-text-body); line-height: 1.7;">${g.description}</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="${g.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              <span>تحميل الوثيقة المعتمدة (PDF)</span>
            </a>
            <button class="btn btn-ghost btn-sm" onclick="openGovernanceExplorerModal()">
              <span>عرض تفاصيل الأبواب والمواد</span>
              ${window.getSvgIcon('arrow-left', '', '16px')}
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Render Financial Reports Table
  const financeTbody = document.getElementById("about-financial-tbody");
  if (financeTbody && window.siteData.financialReports) {
    financeTbody.innerHTML = window.siteData.financialReports.map(f => `
      <tr>
        <td><strong>${f.year}</strong></td>
        <td>${f.period}</td>
        <td>${f.type}</td>
        <td><span class="badge badge-primary">${f.status}</span></td>
        <td>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${f.mainBudgetUrl ? `<a href="${f.mainBudgetUrl}" target="_blank" class="btn btn-outline btn-sm">الميزانية كاملة</a>` : ""}
            ${f.revenueUrl ? `<a href="${f.revenueUrl}" target="_blank" class="btn btn-outline btn-sm">الإيرادات</a>` : ""}
            ${f.expenseUrl ? `<a href="${f.expenseUrl}" target="_blank" class="btn btn-outline btn-sm">المصروفات</a>` : ""}
          </div>
        </td>
      </tr>
    `).join("");
  }
}

function activateAboutSubTab(tabId) {
  document.querySelectorAll(".about-subnav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.aboutTab === tabId);
  });
  document.querySelectorAll(".about-tab-content").forEach(content => {
    content.style.display = content.id === `about-panel-${tabId}` ? "block" : "none";
  });
}

window.togglePolicyItem = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("open");
};

/* ==========================================================================
   8. Governance Explorer Modal (جميع الأجزاء الخاصة باللوائح)
   ========================================================================== */
function initGovernanceExplorer() {
  renderGovernanceModalList(window.siteData.governanceChapters || []);
}

function renderGovernanceModalList(list) {
  const container = document.getElementById("gov-modal-list");
  if (!container) return;

  container.innerHTML = list.map(g => `
    <div class="governance-modal-item">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="badge badge-primary">اللائحة رقم (${g.num})</span>
          <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-title); margin: 0.4rem 0;">${g.title}</h4>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">
            الاعتماد: ${g.approvedBy || "مجلس الإدارة"} • التاريخ: ${g.approvalDate || "1441هـ"} • (${g.articlesCount || "مواد نظامية"})
          </span>
        </div>
        <a href="${g.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>تحميل الوثيقة المعتمدة (PDF)</span>
        </a>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-body); margin: 0.75rem 0; line-height: 1.7;">
        ${g.description}
      </p>
      ${g.parts && g.parts.length ? `
        <div style="margin-top: 0.75rem;">
          <strong style="font-size: 0.85rem; color: var(--color-text-muted);">الأبواب والأجزاء الخاصة باللائحة:</strong>
          <div class="gov-parts-list">
            ${g.parts.map(p => `<div class="gov-part-chip"><span>•</span><span>${p}</span></div>`).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `).join("");
}

window.openGovernanceExplorerModal = function() {
  const modal = document.getElementById("governance-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
};

window.closeGovernanceExplorerModal = function() {
  const modal = document.getElementById("governance-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

window.filterGovernanceModal = function(q) {
  const query = (q || "").trim().toLowerCase();
  const all = window.siteData.governanceChapters || [];
  if (!query) {
    renderGovernanceModalList(all);
    return;
  }
  const filtered = all.filter(g => 
    g.title.toLowerCase().includes(query) ||
    g.description.toLowerCase().includes(query) ||
    (g.parts && g.parts.some(p => p.toLowerCase().includes(query)))
  );
  renderGovernanceModalList(filtered);
};

/* ==========================================================================
   9. Calculators (Zakat Calculator, Impact Simulator)
   ========================================================================== */
function initCalculators() {
  initZakatCalculator();
  initImpactSimulator();

  // Tab switching between Zakat and Impact
  document.querySelectorAll(".calc-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".calc-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".calc-panel-view").forEach(p => p.style.display = "none");
      btn.classList.add("active");
      const target = document.getElementById(`calc-view-${btn.dataset.calcTab}`);
      if (target) target.style.display = "block";
    });
  });
}

function initZakatCalculator() {
  const cashInput = document.getElementById("zakat-cash-input");
  const goldGrams24Input = document.getElementById("zakat-gold-24");
  const goldGrams21Input = document.getElementById("zakat-gold-21");
  const goldGrams18Input = document.getElementById("zakat-gold-18");
  const silverInput = document.getElementById("zakat-silver-input");
  const tradeInput = document.getElementById("zakat-trade-input");

  function calculate() {
    const cash = Math.max(0, parseFloat(cashInput?.value) || 0);
    const gold24 = Math.max(0, parseFloat(goldGrams24Input?.value) || 0);
    const gold21 = Math.max(0, parseFloat(goldGrams21Input?.value) || 0);
    const gold18 = Math.max(0, parseFloat(goldGrams18Input?.value) || 0);
    const silver = Math.max(0, parseFloat(silverInput?.value) || 0);
    const trade = Math.max(0, parseFloat(tradeInput?.value) || 0);

    const cfg = window.siteData.calculatorSettings || {};
    const p24 = cfg.goldGramPrice24k || 340;
    const p21 = cfg.goldGramPrice21k || 297.5;
    const p18 = cfg.goldGramPrice18k || 255;
    const pSilver = cfg.silverGramPrice || 3.8;
    const nisabGrams = cfg.nisabGoldGrams || 85;

    const goldValue = (gold24 * p24) + (gold21 * p21) + (gold18 * p18);
    const silverValue = silver * pSilver;
    const totalWealth = cash + goldValue + silverValue + trade;
    const nisabThreshold = nisabGrams * p24;
    const isDue = totalWealth >= nisabThreshold;
    const zakatAmount = isDue ? totalWealth * 0.025 : 0;

    setElemText("zakat-total-wealth", formatCurrency(totalWealth));
    setElemText("zakat-nisab-threshold", formatCurrency(nisabThreshold));
    setElemText("zakat-due-amount", formatCurrency(zakatAmount));

    const statusBadge = document.getElementById("zakat-status-badge");
    if (statusBadge) {
      if (isDue) {
        statusBadge.textContent = "بلغ النصاب الشرعي (تجب الزكاة 2.5%)";
        statusBadge.className = "badge badge-primary";
      } else {
        statusBadge.textContent = "أقل من النصاب (لا تجب الزكاة شرعاً)";
        statusBadge.className = "badge badge-gold";
      }
    }
  }

  [cashInput, goldGrams24Input, goldGrams21Input, goldGrams18Input, silverInput, tradeInput].forEach(inp => {
    if (inp) inp.addEventListener("input", calculate);
  });
  calculate();
}

function initImpactSimulator() {
  const slider = document.getElementById("impact-range-slider");
  const amountInput = document.getElementById("impact-amount-input");
  const chips = document.querySelectorAll(".preset-impact-chip");

  function updateSimulation(rawAmount) {
    const amount = Math.max(10, rawAmount);
    if (slider) slider.value = amount;
    if (amountInput) amountInput.value = amount;

    chips.forEach(c => {
      c.classList.toggle("active", parseFloat(c.dataset.amount) === amount);
    });

    const factors = (window.siteData.calculatorSettings && window.siteData.calculatorSettings.impactSimulatorFactors) || {
      foodPerDayCost: 10,
      waterLitersPerSar: 25,
      orphanMonthlyCost: 250,
      clothingUnitCost: 300
    };

    const daysOfFood = Math.floor(amount / (factors.foodPerDayCost || 10));
    const waterLiters = amount * (factors.waterLitersPerSar || 25);
    const orphanMonths = (amount / (factors.orphanMonthlyCost || 250)).toFixed(1);
    const clothingCount = Math.floor(amount / (factors.clothingUnitCost || 300));

    setElemText("impact-sim-food", `${daysOfFood} يوم إطعام لأسرة`);
    setElemText("impact-sim-water", `${waterLiters.toLocaleString()} لتر ماء شرب محلى`);
    setElemText("impact-sim-orphan", `${orphanMonths} شهراً كفالة يتيم`);
    setElemText("impact-sim-clothes", `${clothingCount} كسوة عيد لطفل`);
  }

  if (slider) {
    slider.addEventListener("input", (e) => {
      updateSimulation(parseFloat(e.target.value) || 0);
    });
  }

  if (amountInput) {
    amountInput.addEventListener("input", (e) => {
      updateSimulation(parseFloat(e.target.value) || 0);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      updateSimulation(parseFloat(chip.dataset.amount) || 0);
    });
  });

  updateSimulation(250);
}

function activateStoreSubTab(tab) {
  const btn = document.querySelector(`.calc-tab-btn[data-calc-tab="${tab}"]`);
  if (btn) btn.click();
}

/* ==========================================================================
   10. Vision 2030 Goals Renderer
   ========================================================================== */
function initVisionGoals() {
  const container = document.getElementById("vision-2030-cards-container");
  const goals = (window.siteData.vision2030Goals && window.siteData.vision2030Goals.goals2030) || [];

  if (container) {
    container.innerHTML = goals.map(g => `
      <div class="goal-2030-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: var(--color-primary); font-size: 1.15rem;">مستهدف ${g.num}</span>
          <span class="goal-metric-badge">${g.targetMetric}</span>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text-title);">${g.title}</h3>
        <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.7;">${g.desc}</p>
        <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px dashed var(--color-border); font-size: 0.82rem; color: var(--color-text-muted);">
          <strong>الموقف الحالي:</strong> ${g.currentStatus}
        </div>
      </div>
    `).join("");
  }
}

/* ==========================================================================
   11. Contact & Social Media Station
   ========================================================================== */
function initContactAndSocial() {
  const feedContainer = document.getElementById("social-feed-container");
  const dedicatedFeed = document.getElementById("dedicated-social-feed-container");
  const campaigns = (window.siteData.socialMediaContext && window.siteData.socialMediaContext.featuredCampaigns) || [];

  function makeSocialCard(c) {
    return `
      <div class="social-post-card">
        <img src="${c.image}" alt="${c.title}" class="social-post-img" onerror="this.src='assets/tweet_1_national_day_1.jpg'">
        <div class="social-post-body">
          <span class="badge badge-gold" style="align-self: flex-start;">${c.date}</span>
          <h4 style="font-weight: 700; color: var(--color-text-title); font-size: 1.05rem;">${c.title}</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-body); line-height: 1.6;">${c.content}</p>
          <span style="font-size: 0.82rem; color: var(--color-primary-dark); font-weight: 700; margin-top: auto;">${c.tag}</span>
        </div>
      </div>
    `;
  }

  if (feedContainer) {
    feedContainer.innerHTML = campaigns.map(makeSocialCard).join("");
  }
  if (dedicatedFeed) {
    dedicatedFeed.innerHTML = campaigns.map(makeSocialCard).join("");
  }
}

/* ==========================================================================
   12. Interactive Forms (Complaints & Volunteers / Ideas)
   ========================================================================== */
function initForms() {
  // Complaints & Suggestions
  const compForm = document.getElementById("form-complaint");
  if (compForm) {
    compForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newEntry = {
        id: `comp-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split("T")[0],
        senderName: document.getElementById("comp-name")?.value || "فاعل خير",
        email: document.getElementById("comp-email")?.value || "",
        department: document.getElementById("comp-dept")?.value || "الإدارة العامة",
        subject: document.getElementById("comp-subject")?.value || "بدون عنوان",
        message: document.getElementById("comp-message")?.value || "",
        status: "جديدة ومسجلة"
      };

      if (!window.siteData.complaintsInbox) window.siteData.complaintsInbox = [];
      window.siteData.complaintsInbox.unshift(newEntry);
      window.saveSiteData(window.siteData);

      showToast(`تم استلام رسالتكم بنجاح برقم قيد #${newEntry.id} وسيتم التواصل معكم.`);
      compForm.reset();
    });
  }

  // Volunteer & Ideas
  const volForm = document.getElementById("form-volunteer-ideas");
  if (volForm) {
    volForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newVol = {
        id: `vol-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split("T")[0],
        name: document.getElementById("vol-name")?.value || "متطوع",
        email: document.getElementById("vol-email")?.value || "",
        phone: document.getElementById("vol-phone")?.value || "",
        specialization: document.getElementById("vol-spec")?.value || "تطوع عام",
        type: document.getElementById("vol-type")?.value || "تطوع بالوقت",
        hoursAvailable: document.getElementById("vol-hours")?.value || "حسب الحاجة",
        details: document.getElementById("vol-details")?.value || "",
        status: "طلب جديد"
      };

      if (!window.siteData.volunteersInbox) window.siteData.volunteersInbox = [];
      window.siteData.volunteersInbox.unshift(newVol);
      window.saveSiteData(window.siteData);

      showToast(`شكراً لعطائكم! تم تسجيل مشاركتكم التطوعية برقم #${newVol.id}.`);
      volForm.reset();
    });
  }
}

/* ==========================================================================
   Utilities & Helpers
   ========================================================================== */
function setElemText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function formatCurrency(num) {
  return (Math.round(num) || 0).toLocaleString() + " ر.س";
}

function showToast(msg) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✓</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

window.showToast = showToast;

/* ==========================================================================
   Mobile Swipe Carousels Controller (Sync dots, touch arrows, and scroll)
   ========================================================================== */
function initSwipeCarousels() {
  function setupCarousel(containerId, dotsId, prevBtnId, nextBtnId) {
    const container = document.getElementById(containerId);
    const dotsContainer = document.getElementById(dotsId);
    if (!container || !dotsContainer) return;

    const cards = container.children;
    if (!cards || cards.length === 0) return;

    let currentIndex = 0;

    function updateActiveDot(idx) {
      if (idx < 0 || idx >= cards.length) return;
      currentIndex = idx;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
    }

    function scrollToIndex(idx) {
      if (idx < 0 || idx >= cards.length) return;
      currentIndex = idx;
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      updateActiveDot(idx);
    }

    // Dot click
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      scrollToIndex(idx);
    });

    // Arrow clicks
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (prevBtn) {
      // In Arabic RTL, prev moves towards right (index - 1)
      prevBtn.addEventListener('click', () => {
        const target = Math.max(0, currentIndex - 1);
        scrollToIndex(target);
      });
    }

    if (nextBtn) {
      // In Arabic RTL, next moves towards left (index + 1)
      nextBtn.addEventListener('click', () => {
        const target = Math.min(cards.length - 1, currentIndex + 1);
        scrollToIndex(target);
      });
    }

    // High performance IntersectionObserver to sync active dot on swipe
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = Array.from(cards).indexOf(entry.target);
            if (idx !== -1) {
              updateActiveDot(idx);
            }
          }
        });
      }, { root: container, threshold: 0.55 });

      Array.from(cards).forEach(c => observer.observe(c));
    } else {
      container.addEventListener('scroll', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth : 300;
        const idx = Math.round(Math.abs(container.scrollLeft) / cardWidth);
        updateActiveDot(Math.min(cards.length - 1, Math.max(0, idx)));
      }, { passive: true });
    }
  }

  setupCarousel('home-programs-highlights', 'programs-carousel-dots', 'programs-prev-btn', 'programs-next-btn');
  setupCarousel('home-projects-highlights', 'projects-carousel-dots', 'projects-prev-btn', 'projects-next-btn');
}

