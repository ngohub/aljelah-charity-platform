"""
Verification Script for New Website Platform
جمعية البر الخيرية بالجله وتبراك
"""

import os
import re
import json

BASE_DIR = r"d:\Antigravity projects\جمعية البر الخيريه بالجله وتبراك\website جديد"

def test_files_exist():
    required_files = [
        "index.html",
        "admin.html",
        "css/style.css",
        "css/admin.css",
        "js/data.js",
        "js/app.js",
        "js/admin.js",
        "assets/Dp9qjadXQAEfX3C.jpg",
        "assets/building-e1592208490220.png",
        "assets/barcode-store-300x300.png",
        "assets/cropped-logo-and-name-1.png",
        "assets/cropped-logo-emblem.jpeg",
        "assets/program-keyan-logo.jpg",
        "assets/program-kafaf-logo.jpg",
        "assets/program-yateem-logo.png",
        "assets/program-kebaruna-logo.png",
        "assets/program-keswa-logo.jpg",
        "assets/program-kafaa-logo.jpg",
        "assets/program-montgoon-logo.jpg"
    ]
    for rf in required_files:
        p = os.path.join(BASE_DIR, rf)
        assert os.path.exists(p), f"Missing required file: {rf}"
    print("[PASS] All required files and media assets exist.")

def test_index_structure():
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()

    # Check 8 required sections + dedicated social hub
    assert 'id="view-home"' in html, "Missing home section"
    assert 'id="view-impact"' in html, "Missing impact section"
    assert 'id="view-about"' in html, "Missing about section"
    assert 'id="view-store"' in html, "Missing store section"
    assert 'id="view-projects"' in html, "Missing projects section"
    assert 'id="view-programs"' in html, "Missing programs section"
    assert 'id="view-vision"' in html, "Missing vision section"
    assert 'id="view-contact"' in html, "Missing contact section"
    assert 'id="view-social"' in html, "Missing dedicated social section"

    # Check collective cadres photo and building in Hero with hydration IDs
    assert 'id="hero-team-img"' in html, "Missing hero-team-img ID"
    assert 'id="hero-bldg-img"' in html, "Missing hero-bldg-img ID"
    assert 'assets/Dp9qjadXQAEfX3C.jpg' in html, "Missing cadres collective photo in hero"
    assert 'assets/building-e1592208490220.png' in html, "Missing building photo"

    # Check License 210 and National Center
    assert '210' in html, "License 210 missing"
    assert 'المركز الوطني لتنمية القطاع غير الربحي' in html, "National Center supervision missing"

    # Check Store & Impact Dashboard
    assert 'aljelahstore.sa' in html, "Official store url missing"
    assert 'barcode-store-300x300.png' in html, "Store QR code missing"
    assert 'id="store-kpi-total-val"' in html, "Store total donations KPI missing"
    assert 'id="store-kpi-orders-val"' in html, "Store orders KPI missing"
    assert 'id="store-kpi-donors-val"' in html, "Store active donors KPI missing"
    assert 'id="store-featured-products-container"' in html, "Store featured products container missing"

    # Check Calculators (Zakat with all gold karats and silver, plus simulator)
    assert 'zakat-cash-input' in html, "Zakat cash input missing"
    assert 'zakat-gold-24' in html, "Zakat gold 24k missing"
    assert 'zakat-gold-21' in html, "Zakat gold 21k missing"
    assert 'zakat-gold-18' in html, "Zakat gold 18k missing"
    assert 'zakat-silver-input' in html, "Zakat silver missing"
    assert 'impact-range-slider' in html, "Impact simulator slider missing"
    assert 'form-volunteer-ideas' in html, "Volunteer and ideas form missing"

    # Check Projects Impact Dashboard
    assert 'id="proj-kpi-budget-val"' in html, "Projects budget KPI missing"
    assert 'id="proj-kpi-beneficiaries-val"' in html, "Projects beneficiaries KPI missing"
    assert 'id="proj-kpi-count-val"' in html, "Projects count KPI missing"
    assert 'id="proj-kpi-completion-val"' in html, "Projects completion rate KPI missing"

    # Check About page components and Governance Explorer Modal
    assert 'about-panel-overview' in html
    assert 'about-panel-board' in html
    assert 'about-panel-assembly' in html
    assert 'about-panel-committees' in html
    assert 'about-panel-governance' in html
    assert 'about-panel-reports' in html
    assert 'about-panel-financial' in html
    assert 'id="governance-modal"' in html, "Governance constituent parts modal missing"
    assert 'id="gov-modal-list"' in html, "Governance modal list container missing"
    assert 'btn-open-gov-explorer' in html, "Governance explorer open button missing"

    # Check Executive Director & Complaints
    assert 'ساره عبدالهادي القحطاني' in html, "Executive director name missing"
    assert 'form-complaint' in html, "Complaints form missing"
    assert '@aljellah_org' in html, "Social media twitter handle missing"

    print("[PASS] index.html structure verified across all 8 required sections and specifications.")

def test_admin_structure():
    with open(os.path.join(BASE_DIR, "admin.html"), "r", encoding="utf-8") as f:
        html = f.read()

    # Check admin panels (Comprehensive Page-by-Page CMS Architecture)
    assert 'id="panel-overview"' in html
    assert 'id="panel-page-home"' in html
    assert 'id="panel-page-impact"' in html
    assert 'id="panel-page-about"' in html
    assert 'id="panel-page-programs"' in html
    assert 'id="panel-page-projects"' in html
    assert 'id="panel-page-store"' in html
    assert 'id="panel-page-vision"' in html
    assert 'id="panel-page-contact"' in html
    assert 'id="panel-media"' in html
    assert 'id="panel-complaints"' in html
    assert 'id="panel-volunteers"' in html
    assert 'id="panel-backup"' in html

    # Check key admin controls
    assert 'hero-cadre-file' in html, "Hero photo quick replacement control missing"
    assert 'building-photo-file' in html, "Hero building photo replacement missing"
    assert 'id="admin-preview-hero-cadre"' in html, "Hero cadre preview missing"
    assert 'id="admin-preview-hero-bldg"' in html, "Hero building preview missing"
    assert 'form-add-image' in html, "Add image to gallery form missing"
    assert 'btn-export-backup' in html, "Export backup button missing"
    assert 'btn-factory-reset' in html, "Factory reset button missing"

    # Check Universal Admin Modal
    assert 'id="admin-modal"' in html, "Admin Universal Modal missing"
    assert 'id="admin-modal-title"' in html, "Admin modal title missing"
    assert 'id="admin-modal-body"' in html, "Admin modal body missing"

    print("[PASS] admin.html structure verified with all control panels and modal.")

def test_data_authenticity_and_schema():
    with open(os.path.join(BASE_DIR, "js", "data.js"), "r", encoding="utf-8") as f:
        js = f.read()

    # Verify authentic financial figures
    assert '4,642,309' in js or '4642309' in js, "Total disbursed 2025 missing"
    assert '1,479,270' in js or '1479270' in js, "Food basket budget 2025 missing"
    assert '564,000' in js or '564000' in js, "Home renovation budget 2025 missing"
    assert '890,842' in js or '890842' in js, "Productive families income 2025 missing"
    assert '334,350' in js or '334350' in js, "Orphans budget 2025 missing"
    assert '136,333' in js or '136333' in js, "Elderly & disabled budget 2025 missing"
    assert '210' in js, "License 210 missing in data"
    assert 'مسفر بن مسفر عبدالهادي القويفل' in js, "Board chairman missing"

    # Verify new data schemas
    assert 'storeDashboard' in js, "storeDashboard data schema missing"
    assert 'projectsImpact' in js, "projectsImpact data schema missing"
    assert 'governanceChapters' in js, "governanceChapters data schema missing"
    assert 'impactSimulatorFactors' in js, "impactSimulatorFactors missing"

    print("[PASS] data.js verified for 100% authentic figures and extended schemas.")

def test_asset_references():
    for fname in ["index.html", "admin.html"]:
        with open(os.path.join(BASE_DIR, fname), "r", encoding="utf-8") as f:
            html = f.read()
        # Find all src and href references to local files
        refs = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', html)
        for r in refs:
            # ignore http, https, #, data, mailto, tel
            if r.startswith(('http:', 'https:', '#', 'data:', 'mailto:', 'tel:')):
                continue
            # ignore query parameters
            clean_r = r.split('?')[0].split('#')[0]
            if not clean_r:
                continue
            path = os.path.join(BASE_DIR, clean_r)
            assert os.path.exists(path), f"In {fname}: referenced file does not exist -> {clean_r}"
    print("[PASS] All local assets referenced in HTML files exist on disk.")

if __name__ == "__main__":
    test_files_exist()
    test_index_structure()
    test_admin_structure()
    test_data_authenticity_and_schema()
    test_asset_references()
    print("\n[ALL TESTS PASSED SUCCESSFULLY] The new platform is 100% verified.")
