# कानून की रोशनी — Kanoon Ki Roshni
## AR Legal Aid for Rural India

> Point your phone at any legal document and instantly understand your rights — in plain Hindi. Free. No app install. No lawyer needed.

---
Project - 

<img width="1341" height="678" alt="image" src="https://github.com/user-attachments/assets/a73cede1-c87f-4faf-a442-f1b46b8b198d" />

<img width="1340" height="662" alt="image" src="https://github.com/user-attachments/assets/9cd7e0a4-0e33-4bcc-82dd-fd4b4bea0807" />


---

## 🗂️ Project Structure

```
kanoon-ki-roshni/
│
├── index.html          ← Main app (single-page, all 4 screens)
├── manifest.json       ← PWA manifest (installable as app)
│
├── css/
│   └── style.css       ← All styles (themed: judicial gold + ink navy)
│
├── js/
│   ├── app.js          ← Main controller (screens, flow, state)
│   ├── ocr.js          ← Tesseract.js OCR (Hindi + English)
│   ├── ai.js           ← Groq API + offline fallback analysis
│   ├── ar.js           ← AR bubble overlay renderer
│   └── tts.js          ← Web Speech API (Hindi TTS)
│
└── assets/             ← Icons, images
```

---

## 🛠️ Tech Stack (100% Free)

| Component     | Technology              | Cost  |
|---------------|-------------------------|-------|
| AR/UI         | Vanilla HTML/CSS/JS     | Free  |
| OCR           | Tesseract.js v5         | Free  |
| AI Analysis   | Groq API (LLaMA3-8b)    | Free  |
| Hindi TTS     | Web Speech API          | Free  |
| Hosting       | Vercel / GitHub Pages   | Free  |
| Offline mode  | Rule-based fallback     | Free  |

---

## 🚀 Setup & Run

### Local Development
```bash
# No build step needed! Just serve the folder.
npx serve .
# OR
python3 -m http.server 8080
# Open http://localhost:8080
```

### Get Free Groq API Key
1. Go to https://console.groq.com
2. Sign up with Google (free)
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Paste it in the app when prompted

### Deploy to Vercel (Free)
```bash
npm i -g vercel
vercel deploy
```

---

## 📱 How It Works

```
1. User selects document type (FIR / Land / Rent / Loan)
2. Takes photo with camera OR uploads image
3. Tesseract.js performs OCR (extracts text from image)
4. Text sent to Groq API (LLaMA3) for legal analysis
5. AI returns structured JSON with:
   - Risk level (High/Medium/Low)
   - Hindi explanations per clause
   - Next steps in Hindi
6. AR color-coded bubbles overlay on document image
7. Hindi TTS reads out the analysis
```

---

## 🔌 Offline Mode
If no API key / no internet → `ai.js` uses **rule-based pattern matching** to detect:
- Non-refundable deposits
- No-notice eviction clauses
- Interest rate terms
- Penalty clauses
- Unfair maintenance clauses

Works on ₹5,000 phones with zero connectivity.

---

## 📋 Document Types Supported
- **FIR** — Police First Information Report
- **ज़मीन / Land Deed** — Khasra, Khatauni, Sale Deed
- **किराया / Rent Agreement** — Residential/Commercial lease
- **लोन / Loan Document** — Bank loans, microfinance agreements

---

## 🏆 Hackathon Notes

**Novelty:** No AR legal tool exists for Indian vernacular documents at this scale.

**Innovation:** Solves a problem affecting 300M+ rural Indians who sign documents they don't understand.

**Usability:** Zero install — open browser, scan, understand in 30 seconds.

**Scale:** Works on any Android browser. Supports 22 Indian languages via IndicTrans2 (future roadmap).

---

## 📞 Helplines Integrated
- NALSA Toll Free: **15100**
- Legal Aid: **1800-11-0001**

---

## 🗺️ Roadmap
- [ ] Live camera AR (MindAR.js integration)
- [ ] 22 Indian language support (IndicTrans2)
- [ ] Volunteer lawyer connect feature
- [ ] Gram Panchayat kiosk mode
- [ ] WhatsApp bot integration
