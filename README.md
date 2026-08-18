# Vietnam Biofuel Atlas — Agricultural Resource Guide
### Cẩm Nang Nguồn Lực Nông Nghiệp & Nhiên Liệu Sinh Học Việt Nam

<p align="center">
  <img src="client/public/images/ai4u-logo.png" alt="AI4U.now Logo" width="180" />
</p>

<p align="center">
  <strong>An interactive stakeholder decision guide to Vietnam's agricultural biofuel feedstocks, policy signals, sustainability safeguards, and regional deployment priorities.</strong><br />
  <em>Cẩm nang ra quyết định dành cho các bên liên quan về nguồn nguyên liệu nông nghiệp, lộ trình chính sách, khung an toàn bền vững và ưu tiên triển khai theo vùng tại Việt Nam.</em>
</p>

<p align="center">
  <a href="https://biofuel-resource-sepia.vercel.app"><img src="https://img.shields.io/badge/Live-biofuelresources.ai4u.now-e3a72f?logo=vercel" alt="Live Site" /></a>
  <a href="https://github.com/ai4u23/vietnam-biofuel-atlas"><img src="https://img.shields.io/badge/GitHub-ai4u23%2Fvietnam--biofuel--atlas-181717?logo=github" alt="GitHub" /></a>
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20VI-e3a72f" alt="Bilingual EN/VI" />
  <img src="https://img.shields.io/badge/Ecosystem-AI4U.now-e3a72f" alt="AI4U.now" />
</p>

<p align="center">
  <a href="#-english"><strong>English Documentation</strong></a> &nbsp;•&nbsp; 
  <a href="#-tiếng-việt"><strong>Tài Liệu Tiếng Việt</strong></a>
</p>

---

## 🇬🇧 English

### 🌾 Overview

**Vietnam Biofuel Atlas** translates dense agricultural-resource evidence into a transparent, interactive decision tool for policymakers, investors, researchers, and agribusiness leaders.

#### Core Strategic Focus
- **Map What is Abundant:** 40,501–84,936 GWh<sub>th</sub>/year illustrative sustainable biomass energy potential across six major crop families.
- **Prioritize What is Deliverable:** Distinguish gross theoretical potential from commercially deployable, bankable supply.
- **Residue-First Safeguards:** Enforce strict field-retention boundaries (soil carbon, nutrients, erosion) before large-scale biomass removal.

---

### ⚡ Key Interactive Modules

1. **Feedstock Field Explorer:** Filter 6 major agricultural residue pathways (*Rice Husk, Bagasse, Cassava roots, Livestock Manure, Rice Straw, Coffee/Coconut residues*) by conversion route and deployment priority.
2. **Decision & Scenario Sandbox:** Multi-variable simulation tools:
   - *Tab 1 (E10 & Cassava Matrix)*: Test national blend rates (E5–E20), plant utilization, starch export protection, and feedstock competition stress.
   - *Tab 2 (Hauling & Logistics)*: Model collection radius (10–80 km), freight rates, inland waterway barging discounts, moisture penalties, and delivered unit energy costs ($\text{VND/GJ}$ & $\text{USD/MWh}$).
   - *Tab 3 (CHP Power & Carbon)*: Calculate boiler electrical/thermal efficiencies, net electrical capacity (MW), coal displacement, lifecycle GHG reduction, and eliminated open-burning $PM_{2.5}$.
3. **Interactive Spatial Map & Regional Clusters:** Zero-dependency SVG vector cartography featuring 6 national biomass corridors:
   - **Mekong River Delta**: River-connected rice milling CHP & straw cascade cooperatives.
   - **Sugar Mill Belts**: Modernized high-pressure bagasse cogeneration ($\ge 65\text{ bar}$).
   - **Livestock Corridors**: Swine/dairy manure biodigesters and circular digestate fertilizer loops.
   - **Cassava Hinterland**: Fuel ethanol processing nodes, peel recovery & vinasse biogas.
   - **Central Highlands**: Coffee husks, parchment, and wood pellet industrial heat.
   - **Red River Delta**: Intensive paddy husk briquetting and winter air quality protection.
4. **Four Mandatory Investment Safeguards:** Structured screening criteria required prior to final investment decisions (FID): Soil protection, Opportunity-cost pricing, Logistics clustering, and Whole-system byproduct accounting.
5. **Evidence Base & Citations:** Primary references and baseline statistics from MOIT, FAO, IEA, and IRRI.

---

### 🛠️ Tech Stack

- **Framework:** React 19 (SPA) + Vite 7 + TypeScript 5.6
- **Styling:** Tailwind CSS v4, custom Field Atlas tokens, and Google Fonts (`DM Serif Display` & `Manrope`)
- **Cartography:** Tailored interactive SVG Vector Cartography of Vietnam with bi-directional cluster card synchronization
- **Calculations & Testing:** Pure TypeScript scenario simulation engine + Vitest test suite (9 unit tests)
- **Deployment:** Vercel

---

### 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/ai4u23/vietnam-biofuel-atlas.git
cd vietnam-biofuel-atlas

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run TypeScript check & Unit tests
pnpm check
npx vitest run

# Build production bundle
pnpm build
```

---
---

## 🇻🇳 Tiếng Việt

### 🌾 Tổng Quan Dự Án

**Vietnam Biofuel Atlas** chuyển hóa các cơ sở dữ liệu thực nghiệm nông nghiệp phức tạp thành công cụ tương tác minh bạch phục vụ các nhà hoạch định chính sách, nhà đầu tư năng lượng, chuyên gia nông nghiệp và hợp tác xã tại Việt Nam.

#### Định Hướng Chiến Lược Cốt Lõi
- **Bản đồ hóa tiềm năng:** Ước tính 40.501–84.936 GWh<sub>th</sub>/năm tiềm năng năng lượng sinh khối bền vững trên 6 nhóm cây trồng và phụ phẩm chủ lực.
- **Ưu tiên giải pháp khả thi:** Phân định rạch ròi giữa tiềm năng lý thuyết thô với nguồn cung thương mại sẵn sàng hòa lưới và có tính khả thi tài chính.
- **Khung an toàn ưu tiên phụ phẩm:** Thực thi nghiêm ngặt định mức hoàn trả đất (mùn hữu cơ, vi chất, chống xói mòn) trước khi thu gom sinh khối quy mô lớn.

---

### ⚡ Các Phân Hệ Tương Tác Chính

1. **Khám Phá Vùng Nguyên Liệu:** Tra cứu 6 lộ trình phụ phẩm (*Vỏ trấu, Bã mía, Củ sắn, Chất thải chăn nuôi, Rơm rạ, Phụ phẩm Cà phê & Dừa*) theo chuỗi chuyển hóa và thứ tự ưu tiên đầu tư.
2. **Hộp Cát Mô Phỏng Kịch Bản Quyết Định (Scenario Sandbox):**
   - *Phân hệ 1 (Ma trận E10 & Cạnh tranh Sắn)*: Mô phỏng tỷ lệ phối trộn (E5–E20), tỷ lệ huy động nhà máy cồn, bảo lưu sắn cho xuất khẩu tinh bột và chỉ số căng thẳng cạnh tranh nông sản.
   - *Phân hệ 2 (Bán kính Logistics & Chi phí Vận tải)*: Tính toán bán kính thu gom (10–80 km), cước vận tải đường bộ vs sà lan đường thủy ĐBSCL, suy giảm nhiệt trị do độ ẩm và giá thành năng lượng giao tại nhà máy ($\text{VND/GJ}$ và $\text{USD/MWh}$).
   - *Phân hệ 3 (Đồng phát CHP & Giảm phát thải)*: Tính toán hiệu suất phát điện lò hơi cao áp, công suất phát tịnh (MW), sản lượng điện sạch, lượng than công nghiệp thay thế và bụi mịn $PM_{2.5}$ triệt tiêu do ngừng đốt đồng.
3. **Bản Đồ Địa Lý Tương Tác & 6 Cụm Vùng Trọng Điểm:**
   - **Đồng bằng sông Cửu Long**: Cụm xay xát lúa gạo ven sông cấp nhiệt/CHP và chuỗi tuần hoàn rơm rạ.
   - **Vành đai Nhà máy Mía đường**: Đồng phát bã mía áp suất cao ($\ge 65\text{ bar}$) phát điện nền cho EVN.
   - **Hành lang Chăn nuôi & Biogas**: Xử lý chất thải trang trại lợn/bò sữa và hoàn trả bùn vi sinh.
   - **Vùng Sắn & Cồn Sinh học**: Trụ cột ethanol E10, liên kết nông dân và biogas từ bã thải vinasse.
   - **Tây Nguyên**: Vỏ cà phê, mùn vỏ và viên nén sinh khối phục vụ nhiệt sấy công nghiệp.
   - **Đồng bằng Bắc Bộ**: Ép củi trấu thay than và kiểm soát thu gom rơm rạ vụ đông giảm ô nhiễm.
4. **Bốn Khung Sàng Lọc An Toàn Bắt Buộc Trước FID:** Bảo vệ độ phì nhiêu đất, Định giá theo chi phí cơ hội, Tụ hội cụm logistics, và Thiết kế toàn diện chuỗi phụ phẩm.
5. **Cơ Sở Dẫn Chứng & Trích Dẫn:** Dữ liệu chuẩn hóa từ Bộ Công Thương (MOIT), FAO, IEA và Viện Nghiên cứu Lúa Quốc tế (IRRI).

---

### 🛠️ Cài Đặt & Phát Triển

```bash
# Sao chép kho mã nguồn
git clone https://github.com/ai4u23/vietnam-biofuel-atlas.git
cd vietnam-biofuel-atlas

# Cài đặt gói phụ thuộc
pnpm install

# Khởi chạy môi trường thử nghiệm cục bộ
pnpm dev

# Kiểm tra kiểu TypeScript & Chạy kiểm thử tự động
pnpm check
npx vitest run

# Đóng gói bản phát hành sản xuất
pnpm build
```

---

## 🌐 Triển Khai Sản Xuất (Deployment)

Dự án được cấu hình sẵn cho Vercel với `vercel.json`:

```bash
# Triển khai trực tiếp lên Vercel
vercel --prod
```

- **Live URL**: [https://biofuel-resource-sepia.vercel.app](https://biofuel-resource-sepia.vercel.app)
- **Production Alias**: `https://biofuelresources.ai4u.now`

---

## 📄 Bản Quyền & Dẫn Nguồn (License)

Dự án là một phần của hệ sinh thái **[AI4U.now](https://ai4u.now)**. Xây dựng từ Nghiên cứu Tiềm năng Nhiên liệu Sinh học Việt Nam (2024–2026).
Phát hành theo giấy phép [MIT License](LICENSE).
