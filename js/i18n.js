// ═══════════════════════════════════════════
//  i18n.js — Internationalization Module
//  Supports: Hindi, English, Marathi, Tamil, Bengali
// ═══════════════════════════════════════════

const I18N = (() => {

  const translations = {
    hi: {
      // Risks
      'risk.high': 'खतरनाक — High Risk',
      'risk.medium': 'सावधान — Review Needed',
      'risk.low': 'सुरक्षित — Safe',

      // Sidebar
      'nav.dashboard': 'डैशबोर्ड',
      'nav.scan': 'स्कैन करें',
      'nav.history': 'इतिहास',
      'nav.settings': 'सेटिंग्स',
      'nav.helpline': 'हेल्पलाइन',

      // Header
      'header.search': 'दस्तावेज़ खोजें…',
      'header.lang': 'भाषा',

      // Cinematic Landing
      'hero.title': 'कोई वकील नहीं? कोई बात नहीं।',
      'hero.subtitle': 'AI की शक्ति से अपने कानूनी अधिकारों को जानें। जटिल दस्तावेज़ों को मिनटों में समझें।',
      'hero.cta': 'स्कैन शुरू करें',
      'hero.badge': '100% मुफ्त • सुरक्षित • ऑफलाइन समर्थन',

      'features.title': 'आधुनिक तकनीक, सरल भाषा',
      'features.subtitle': 'जटिल कानूनी भाषा को समझने के लिए हमारी तीन-स्तरीय सुरक्षा प्रणाली',

      'feature.ocr.title': 'शक्तिशाली ऑन-डिवाइस OCR',
      'feature.ocr.desc': 'Tesseract.js के माध्यम से आपके दस्तावेज़ों को सीधे आपके ब्राउज़र में पढ़ा जाता है। कोई डेटा सर्वर पर अपलोड नहीं होता।',
      
      'feature.ai.title': 'LLaMA3 कानूनी विश्लेषक',
      'feature.ai.desc': 'Groq LLaMA3-8B मॉडल के साथ जटिल कानूनी शब्दों को सरल, समझने योग्य भाषा में बदला जाता है।',

      'feature.ar.title': 'ऑगमेंटेड रियलिटी ओवरले',
      'feature.ar.desc': 'खतरनाक शर्तों को सीधे दस्तावेज़ के ऊपर इंटरेक्टिव टैग्स के साथ हाइलाइट किया जाता है।',

      // Craftsmanship Section
      'craft.label': 'डिजाइन दर्शन',
      'craft.title': 'संवेदना से निर्मित, न कि टेम्प्लेट से',
      'craft.desc': 'कानूनी ढांचा अक्सर जटिल और डराने वाला होता है। हमने इस अनुभव को सहज, मानवीय और सुलभ बनाने के लिए इसे हस्तनिर्मित किया है। हर स्क्रीन वास्तविक मानवीय लय के साथ असंतुलित दूरी, जैविक रिक्ति और कलात्मक स्पर्श के साथ डिज़ाइन की गई है।',
      'craft.quote': '"कानूनी भाषा उलझाने के लिए होती है; डिजाइन समझाने के लिए होता है।"',
      'craft.principle': '— हमारा सिद्धांत',
      'craft.badge': 'न्याय सबके लिए',
      'craft.badge.desc': 'भारतीय नागरिकों के लिए मुफ्त कानूनी साक्षरता का संकल्प।',

      'cta.banner.title': 'अपने अधिकारों की रक्षा करें',
      'cta.banner.subtitle': 'किसी भी दस्तावेज़ पर हस्ताक्षर करने से पहले उसकी पूरी जाँच करें।',
      'cta.banner.btn': 'अभी निःशुल्क स्कैन करें',

      // Dashboard
      'dash.welcome': 'नमस्ते! 🙏',
      'dash.subtitle': 'अपने कानूनी दस्तावेज़ स्कैन करें और अपने अधिकार जानें',
      'dash.stat.scanned': 'स्कैन किए गए',
      'dash.stat.alerts': 'जोखिम अलर्ट',
      'dash.stat.safe': 'सुरक्षित',
      'dash.stat.languages': 'भाषाएँ',
      'dash.quickaction': 'त्वरित कार्रवाई',
      'dash.recent': 'हाल की गतिविधि',
      'dash.norecent': 'अभी तक कोई स्कैन नहीं। शुरू करने के लिए दस्तावेज़ स्कैन करें!',

      // Doc types
      'doc.fir': 'FIR',
      'doc.fir.sub': 'पुलिस रिपोर्ट',
      'doc.land': 'ज़मीन',
      'doc.land.sub': 'भूमि दस्तावेज़',
      'doc.rent': 'किराया',
      'doc.rent.sub': 'किराया समझौता',
      'doc.loan': 'लोन',
      'doc.loan.sub': 'लोन दस्तावेज़',

      // Scan
      'scan.title': 'दस्तावेज़ स्कैन करें',
      'scan.hint': 'यहाँ दस्तावेज़ रखें',
      'scan.hint.sub': 'कैमरे के सामने दस्तावेज़ रखें',
      'scan.camera': '📸 कैमरा से खींचें',
      'scan.camera.sub': 'फ़ोटो लें',
      'scan.sample': '📄 सैंपल देखें',
      'scan.sample.sub': 'डेमो चलाएं',
      'scan.analyze': '🔍 विश्लेषण करें',
      'scan.back': '← वापस',

      // Processing
      'proc.ocr': 'OCR चल रहा है…',
      'proc.reading': 'दस्तावेज़ पढ़ा जा रहा है',
      'proc.ai': 'AI विश्लेषण…',
      'proc.ai.sub': 'कानूनी भाषा समझी जा रही है',
      'proc.render': 'परिणाम तैयार हो रहे हैं…',
      'proc.render.sub': 'AR ओवरले बन रहा है',
      'proc.done': 'तैयार! ✓',
      'proc.done.sub': 'विश्लेषण पूर्ण',
      'proc.note': 'AI कानूनी भाषा को सरल हिंदी में बदल रहा है',

      // Results
      'result.title': 'विश्लेषण',
      'result.clauses': '📋 मुख्य बातें',
      'result.steps': '👉 आगे क्या करें',
      'result.helpline.title': '🆓 मुफ्त कानूनी सहायता',
      'result.helpline.desc': 'National Legal Services Authority (NALSA)',
      'result.helpline.toll': '📞 15100 — टोल फ्री',

      // Modal
      'modal.title': '🔑 Groq API Key डालें',
      'modal.desc': 'console.groq.com पर जाकर मुफ्त API key लें',
      'modal.save': 'सेव करें',
      'modal.later': 'बाद में',
      'modal.note': 'Key आपके device पर ही सेव होगी',

      // Misc
      'badge.free': '✅ 100% Free • Works Offline • No App Install',
      'tagline.main': 'कोई वकील नहीं? कोई बात नहीं।',
      'tagline.sub': 'AI-powered legal document analysis',
    },

    en: {
      'risk.high': 'Dangerous — High Risk',
      'risk.medium': 'Caution — Review Needed',
      'risk.low': 'Safe — Low Risk',

      'nav.dashboard': 'Dashboard',
      'nav.scan': 'Scan',
      'nav.history': 'History',
      'nav.settings': 'Settings',
      'nav.helpline': 'Helpline',

      'header.search': 'Search documents…',
      'header.lang': 'Language',

      // Cinematic Landing
      'hero.title': 'No lawyer? No problem.',
      'hero.subtitle': 'Know your legal rights instantly with the power of AI. Decode complex documents in minutes.',
      'hero.cta': 'Start Scan',
      'hero.badge': '100% Free • Highly Secure • Offline Support',

      'features.title': 'Advanced Tech, Simple Terms',
      'features.subtitle': 'Our three-tiered safety net designed to translate dense legal language into clarity.',

      'feature.ocr.title': 'Powerful On-Device OCR',
      'feature.ocr.desc': 'Read documents securely in your browser using Tesseract.js. Your sensitive legal data never leaves your device.',
      
      'feature.ai.title': 'LLaMA3 Legal Intellect',
      'feature.ai.desc': 'Translate complex, deceptive clauses into clear, plain terms using Groq LLaMA3-8B.',

      'feature.ar.title': 'Augmented Reality Pointers',
      'feature.ar.desc': 'Highlight dangerous or high-risk clauses directly over the scanned document using smart visual tags.',

      // Craftsmanship Section
      'craft.label': 'DESIGN PHILOSOPHY',
      'craft.title': 'Designed with Empathy, Not Templates',
      'craft.desc': 'Legal frameworks can be cold, rigid, and intimidating. We hand-crafted this experience to feel warm, human, and accessible. Every screen is designed around real human rhythms, with asymmetric alignments, organic spacing variations, and custom visual accents that tell a story.',
      'craft.quote': '"Legalese is meant to obscure; design is meant to clarify."',
      'craft.principle': '— Our Principle',
      'craft.badge': 'Justice For All',
      'craft.badge.desc': 'A commitment to free legal literacy for all Indian citizens.',

      'cta.banner.title': 'Protect Your Rights',
      'cta.banner.subtitle': 'Never sign a document without knowing its terms completely.',
      'cta.banner.btn': 'Scan For Free Now',

      'dash.welcome': 'Welcome! 🙏',
      'dash.subtitle': 'Scan your legal documents and know your rights',
      'dash.stat.scanned': 'Scanned',
      'dash.stat.alerts': 'Risk Alerts',
      'dash.stat.safe': 'Safe',
      'dash.stat.languages': 'Languages',
      'dash.quickaction': 'Quick Actions',
      'dash.recent': 'Recent Activity',
      'dash.norecent': 'No scans yet. Scan a document to get started!',

      'doc.fir': 'FIR',
      'doc.fir.sub': 'Police Report',
      'doc.land': 'Land',
      'doc.land.sub': 'Land Deed',
      'doc.rent': 'Rent',
      'doc.rent.sub': 'Rent Agreement',
      'doc.loan': 'Loan',
      'doc.loan.sub': 'Loan Document',

      'scan.title': 'Scan Document',
      'scan.hint': 'Place document here',
      'scan.hint.sub': 'Hold your document in front of the camera',
      'scan.camera': '📸 Take Photo',
      'scan.camera.sub': 'Use Camera',
      'scan.sample': '📄 Try Sample',
      'scan.sample.sub': 'Run Demo',
      'scan.analyze': '🔍 Analyze',
      'scan.back': '← Back',

      'proc.ocr': 'Running OCR…',
      'proc.reading': 'Reading document',
      'proc.ai': 'AI Analysis…',
      'proc.ai.sub': 'Understanding legal language',
      'proc.render': 'Preparing results…',
      'proc.render.sub': 'Building AR overlay',
      'proc.done': 'Ready! ✓',
      'proc.done.sub': 'Analysis complete',
      'proc.note': 'AI is simplifying legal language for you',

      'result.title': 'Analysis',
      'result.clauses': '📋 Key Clauses',
      'result.steps': '👉 Next Steps',
      'result.helpline.title': '🆓 Free Legal Aid',
      'result.helpline.desc': 'National Legal Services Authority (NALSA)',
      'result.helpline.toll': '📞 15100 — Toll Free',

      'modal.title': '🔑 Enter Groq API Key',
      'modal.desc': 'Get a free API key from console.groq.com',
      'modal.save': 'Save',
      'modal.later': 'Later',
      'modal.note': 'Your key stays on your device only',

      'badge.free': '✅ 100% Free • Works Offline • No App Install',
      'tagline.main': 'No lawyer? No problem.',
      'tagline.sub': 'AI-powered legal document analysis',
    },

    mr: {
      'risk.high': 'धोकादायक — High Risk',
      'risk.medium': 'सावधान — Review Needed',
      'risk.low': 'सुरक्षित — Safe',

      'nav.dashboard': 'डॅशबोर्ड',
      'nav.scan': 'स्कॅन',
      'nav.history': 'इतिहास',
      'nav.settings': 'सेटिंग्ज',
      'nav.helpline': 'हेल्पलाइन',

      'header.search': 'दस्तऐवज शोधा…',
      'header.lang': 'भाषा',

      // Cinematic Landing
      'hero.title': 'वकील नाही? काळजी नाही.',
      'hero.subtitle': 'AI च्या सहाय्याने तुमचे कायदेशीर हक्क त्वरित जाणून घ्या. अवघड दस्तऐवज मिनिटांत समजून घ्या.',
      'hero.cta': 'स्कॅन सुरू करा',
      'hero.badge': '100% मोफत • सुरक्षित • ऑफलाइन समर्थन',

      'features.title': 'आधुनिक तंत्रज्ञान, सोपी भाषा',
      'features.subtitle': 'कायदेशीर भाषा समजण्यासाठी आमची त्रि-स्तरीय सुरक्षा प्रणाली',

      'feature.ocr.title': 'शक्तिशाली ऑन-डिवाइस OCR',
      'feature.ocr.desc': 'तुमचे दस्तऐवज थेट तुमच्या ब्राउझरमध्ये सुरक्षितपणे वाचले जातात. कोणताही डेटा बाहेर जात नाही.',

      'feature.ai.title': 'LLaMA3 कायदेशीर विश्लेषण',
      'feature.ai.desc': 'गुंतागुंतीचे कायदेशीर करार Groq LLaMA3 च्या सहाय्याने सोप्या भाषेत समजून घ्या.',

      'feature.ar.title': 'ऑगमेंटेड रिअॅलिटी ओव्हरले',
      'feature.ar.desc': 'धोकादायक अटी थेट दस्तऐवजावरच हायलाईट केल्या जातात.',

      // Craftsmanship Section
      'craft.label': 'रचना तत्वज्ञान',
      'craft.title': 'संवेदनशीलतेने तयार केलेले, साच्यातून नाही',
      'craft.desc': 'कायदेशीर चौकट अनेकदा क्लिष्ट आणि भीतीदायक असते. आम्ही हा अनुभव सुलभ आणि मानवी बनवण्यासाठी हस्तनिर्मित केला आहे. प्रत्येक स्क्रीन अनन्य आहे.',
      'craft.quote': '"कायद्याची भाषा गुंतागुंत करते; रचना स्पष्टता आणते."',
      'craft.principle': '— आमचे तत्व',
      'craft.badge': 'न्याय सर्वांसाठी',
      'craft.badge.desc': 'भारतीय नागरिकांसाठी मोफत कायदेशीर साक्षरतेचा संकल्प.',

      'cta.banner.title': 'तुमच्या हक्कांचे रक्षण करा',
      'cta.banner.subtitle': 'अटी पूर्णपणे समजल्याशिवाय दस्तऐवजावर स्वाक्षरी करू नका.',
      'cta.banner.btn': 'आता मोफत स्कॅन करा',

      'dash.welcome': 'नमस्कार! 🙏',
      'dash.subtitle': 'तुमचे कायदेशीर दस्तऐवज स्कॅन करा आणि तुमचे हक्क जाणून घ्या',
      'dash.stat.scanned': 'स्कॅन केलेले',
      'dash.stat.alerts': 'धोका अलर्ट',
      'dash.stat.safe': 'सुरक्षित',
      'dash.stat.languages': 'भाषा',
      'dash.quickaction': 'जलद कृती',
      'dash.recent': 'अलीकडील क्रिया',
      'dash.norecent': 'अद्याप स्कॅन नाही. सुरू करण्यासाठी दस्तऐवज स्कॅन करा!',

      'doc.fir': 'FIR',
      'doc.fir.sub': 'पोलीस रिपोर्ट',
      'doc.land': 'जमीन',
      'doc.land.sub': 'जमीन दस्तऐवज',
      'doc.rent': 'भाडे',
      'doc.rent.sub': 'भाडे करार',
      'doc.loan': 'कर्ज',
      'doc.loan.sub': 'कर्ज दस्तऐवज',

      'scan.title': 'दस्तऐवज स्कॅन करा',
      'scan.hint': 'दस्तऐवज येथे ठेवा',
      'scan.hint.sub': 'कॅमेऱ्यासमोर दस्तऐवज धरा',
      'scan.camera': '📸 फोटो काढा',
      'scan.camera.sub': 'कॅमेरा वापरा',
      'scan.sample': '📄 नमुना पहा',
      'scan.sample.sub': 'डेमो चालवा',
      'scan.analyze': '🔍 विश्लेषण करा',
      'scan.back': '← मागे',

      'proc.ocr': 'OCR चालू आहे…',
      'proc.reading': 'दस्तऐवज वाचला जात आहे',
      'proc.note': 'AI कायदेशीर भाषा सोप्या मराठीत बदलत आहे',

      'result.title': 'विश्लेषण',
      'result.clauses': '📋 मुख्य मुद्दे',
      'result.steps': '👉 पुढे काय करावे',
      'result.helpline.title': '🆓 मोफत कायदेशीर मदत',
      'result.helpline.desc': 'National Legal Services Authority (NALSA)',
      'result.helpline.toll': '📞 15100 — टोल फ्री',

      'modal.title': '🔑 Groq API Key टाका',
      'modal.desc': 'console.groq.com वर जाऊन मोफत API key घ्या',
      'modal.save': 'सेव्ह करा',
      'modal.later': 'नंतर',
      'modal.note': 'Key फक्त तुमच्या डिव्हाइसवर सेव्ह होईल',

      'badge.free': '✅ 100% मोफत • ऑफलाइन काम करते • अॅप इन्स्टॉल नाही',
      'tagline.main': 'वकील नाही? काळजी नाही.',
      'tagline.sub': 'AI-powered कायदेशीर दस्तऐवज विश्लेषण',
    },

    ta: {
      'risk.high': 'ஆபத்தானது — High Risk',
      'risk.medium': 'எச்சரிக்கை — Review Needed',
      'risk.low': 'பாதுகாப்பானது — Safe',

      'nav.dashboard': 'டாஷ்போர்டு',
      'nav.scan': 'ஸ்கேன்',
      'nav.history': 'வரலாறு',
      'nav.settings': 'அமைப்புகள்',
      'nav.helpline': 'உதவி எண்',

      'header.search': 'ஆவணங்களைத் தேடுங்கள்…',
      'header.lang': 'மொழி',

      // Cinematic Landing
      'hero.title': 'வழக்கறிஞர் இல்லையா? கவலை வேண்டாம்.',
      'hero.subtitle': 'AI இன் ஆற்றலால் உங்கள் சட்டபூர்வ உரிமைகளை உடனடியாக அறிந்து கொள்ளுங்கள். கடினமான ஆவணங்களை சில நிமிடங்களில் புரிந்து கொள்ளுங்கள்.',
      'hero.cta': 'ஸ்கேன் செய்யத் தொடங்கு',
      'hero.badge': '100% இலவசம் • பாதுகாப்பானது • ஆஃப்லைன் ஆதரவு',

      'features.title': 'நவீன தொழில்நுட்பம், எளிய சொற்கள்',
      'features.subtitle': 'கடினமான சட்ட மொழியை எளிமையாக்க எங்களின் மூன்று அடுக்கு பாதுகாப்பு முறை',

      'feature.ocr.title': 'சக்திவாய்ந்த ஆன்-சாதன OCR',
      'feature.ocr.desc': 'உங்கள் ஆவணங்களை உங்கள் சாதனத்திலேயே பாதுகாப்பாக வாசியுங்கள். உங்கள் தரவு சர்வர்களுக்கு அனுப்பப்படாது.',

      'feature.ai.title': 'LLaMA3 சட்ட பகுப்பாய்வி',
      'feature.ai.desc': 'கடினமான சட்ட ஒப்பந்தங்களை Groq LLaMA3 மூலம் எளிய சொற்களாக மாற்றுங்கள்.',

      'feature.ar.title': 'ஆக்மென்டட் ரியாலிட்டி பாயிண்டர்கள்',
      'feature.ar.desc': 'ஆபத்தான பகுதிகளை ஆவணத்தின் மீதே நேரடியாக ஹைலைட் செய்து காட்டுங்கள்.',

      // Craftsmanship Section
      'craft.label': 'வடிவமைப்பு தத்துவம்',
      'craft.title': 'வார்ப்புருக்கள் இன்றி, மனித உணர்வுடன் வடிவமைக்கப்பட்டது',
      'craft.desc': 'சட்ட திட்டங்கள் கடினமாகவும் அச்சுறுத்துவதாகவும் இருக்கலாம். இந்த தளத்தை எளிய மக்கள் எளிதாக அணுகும் வகையில் மனித உணர்வுடன் வடிவமைத்துள்ளோம். ஒவ்வொரு திரையும் தனித்துவமானது.',
      'craft.quote': '"சட்ட மொழி குழப்பக்கூடும்; வடிவமைப்பு தெளிவுபடுத்தும்."',
      'craft.principle': '— எங்கள் கொள்கை',
      'craft.badge': 'அனைவருக்கும் நீதி',
      'craft.badge.desc': 'இந்திய குடிமக்கள் அனைவருக்கும் இலவச சட்ட அறிவை வழங்கும் அர்ப்பணிப்பு.',

      'cta.banner.title': 'உங்கள் உரிமைகளைப் பாதுகாக்கவும்',
      'cta.banner.subtitle': 'நிபந்தனைகளை முழுமையாகத் தெரியாமல் எந்த ஆவணத்திலும் கையெழுத்திடாதீர்கள்.',
      'cta.banner.btn': 'இப்போது இலவசமாக ஸக்கேன் செய்க',

      'dash.welcome': 'வணக்கம்! 🙏',
      'dash.subtitle': 'உங்கள் சட்ட ஆவணங்களை ஸ்கேன் செய்து உங்கள் உரிமைகளை அறியுங்கள்',
      'dash.stat.scanned': 'ஸ்கேன் செய்யப்பட்டவை',
      'dash.stat.alerts': 'ஆபத்து எச்சரிக்கைகள்',
      'dash.stat.safe': 'பாதுகாப்பானவை',
      'dash.stat.languages': 'மொழிகள்',
      'dash.quickaction': 'விரைவு நடவடிக்கை',
      'dash.recent': 'சமீபத்திய செயல்பாடு',
      'dash.norecent': 'இன்னும் ஸ்கேன் இல்லை. தொடங்க ஒரு ஆவணத்தை ஸ்கேன் செய்யுங்கள்!',

      'doc.fir': 'FIR',
      'doc.fir.sub': 'காவல் அறிக்கை',
      'doc.land': 'நிலம்',
      'doc.land.sub': 'நில ஆவணம்',
      'doc.rent': 'வாடகை',
      'doc.rent.sub': 'வாடகை ஒப்பந்தம்',
      'doc.loan': 'கடன்',
      'doc.loan.sub': 'கடன் ஆவணம்',

      'scan.title': 'ஆவணத்தை ஸ்கேன் செய்க',
      'scan.hint': 'ஆவணத்தை இங்கே வையுங்கள்',
      'scan.hint.sub': 'கேமராவுக்கு முன் ஆவணத்தை வைக்கவும்',
      'scan.camera': '📸 புகைப்படம் எடு',
      'scan.camera.sub': 'கேமரா பயன்படுத்து',
      'scan.sample': '📄 மாதிரி பார்',
      'scan.sample.sub': 'டெமோ இயக்கு',
      'scan.analyze': '🔍 பகுப்பாய்வு',
      'scan.back': '← பின்',

      'proc.ocr': 'OCR இயங்குகிறது…',
      'proc.reading': 'ஆவணம் படிக்கப்படுகிறது',
      'proc.note': 'AI சட்ட மொழியை எளிய தமிழில் மாற்றுகிறது',

      'result.title': 'பகுப்பாய்வு',
      'result.clauses': '📋 முக்கிய அம்சங்கள்',
      'result.steps': '👉 அடுத்து என்ன செய்ய வேண்டும்',
      'result.helpline.title': '🆓 இலவச சட்ட உதவி',
      'result.helpline.desc': 'National Legal Services Authority (NALSA)',
      'result.helpline.toll': '📞 15100 — இலவச அழைப்பு',

      'modal.title': '🔑 Groq API Key உள்ளிடவும்',
      'modal.desc': 'console.groq.com-ல் இலவச API key பெறுங்கள்',
      'modal.save': 'சேமி',
      'modal.later': 'பிறகு',
      'modal.note': 'Key உங்கள் சாதனத்தில் மட்டுமே சேமிக்கப்படும்',

      'badge.free': '✅ 100% இலவசம் • ஆஃப்லைன் வேலை செய்யும் • செயலி தேவையில்லை',
      'tagline.main': 'வழக்கறிஞர் இல்லையா? பரவாயில்லை.',
      'tagline.sub': 'AI-powered சட்ட ஆவண பகுப்பாய்வு',
    },

    bn: {
      'risk.high': 'ঝুঁকিপূর্ণ — High Risk',
      'risk.medium': 'সতর্কতা — Review Needed',
      'risk.low': 'নিরাপদ — Safe',

      'nav.dashboard': 'ড্যাশবোর্ড',
      'nav.scan': 'স্ক্যান',
      'nav.history': 'ইতিহাস',
      'nav.settings': 'সেটিংস',
      'nav.helpline': 'হেল্পলাইন',

      'header.search': 'নথি খুঁজুন…',
      'header.lang': 'ভাষা',

      // Cinematic Landing
      'hero.title': 'উকিল নেই? সমস্যা নেই।',
      'hero.subtitle': 'AI এর সহায়তায় আপনার আইনি অধিকারগুলি সাথে সাথে জেনে নিন। জটিল চুক্তিপত্র বুঝুন কয়েক মিনিটে।',
      'hero.cta': 'স্ক্যান শুরু করুন',
      'hero.badge': '১০০% নিখরচায় • সুরক্ষিত • অফলাইন সাপোর্ট',

      'features.title': 'আধুনিক প্রযুক্তি, সহজ ভাষা',
      'features.subtitle': 'জটিল আইনি ভাষায় লেখা নथিপত্রকে আপনার কাছে স্পষ্ট করতে আমাদের ত্রিমাত্রিক সুরক্ষা কবচ',

      'feature.ocr.title': 'শক্তিশালী অন-ডিভাইস OCR',
      'feature.ocr.desc': 'আপনার নথিগুলি সুরক্ষিতভাবে ব্রাউজারে পড়া হয়। কোনো তথ্যই আপনার ডিভাইসের বাইরে যায় না।',

      'feature.ai.title': 'LLaMA3 আইনি বিশ্লেষক',
      'feature.ai.desc': 'জটিল আইনি চুক্তিগুলি Groq LLaMA3 এর মাধ্যমে সহজ বাংলায় রূপান্তর করুন।',

      'feature.ar.title': 'অগমেন্টের রিয়ালিটি নির্দেশক',
      'feature.ar.desc': 'ঝুঁকিপূর্ণ শর্তগুলি সরাসরি নথির ওপরেই রঙিন লেবেলে চিহ্নিত করে দেখায়।',

      // Craftsmanship Section
      'craft.label': 'ডিজাইন দর্শন',
      'craft.title': 'টেমপ্লেট নয়, সহানুভূতির সাথে ডিজাইন করা',
      'craft.desc': 'আইনি ভাষা সাধারণত জটিল ও ভীতিজনক হয়। আমরা এই অভিজ্ঞতাকে সহজ, মানবিক এবং সুলভ করার জন্য এটিকে নিজের হাতে যত্ন সহকারে ডিজাইন করেছি। প্রতিটি পর্দা আলাদা ও নিজস্ব ঢঙে তৈরি।',
      'craft.quote': '"আইনি ভাষা জটিলতা তৈরি করে; ডিজাইন আমাদের পথ দেখায়।"',
      'craft.principle': '— আমাদের মূলনীতি',
      'craft.badge': 'সবার জন্য ন্যায়',
      'craft.badge.desc': 'ভারতীয় নাগরিকদের জন্য সম্পূর্ণ বিনামূল্যে আইনি শিক্ষার সংকল্প।',

      'cta.banner.title': 'আপনার অধিকার সুরক্ষিত রাখুন',
      'cta.banner.subtitle': 'শর্তাবলী সম্পূর্ণভাবে না বুঝে কোনো নথিতে স্বাক্ষর করবেন না।',
      'cta.banner.btn': 'এখনই সম্পূর্ণ বিনামূল্যে স্ক্যান করুন',

      'dash.welcome': 'নমস্কার! 🙏',
      'dash.subtitle': 'আপনার আইনি নথি স্ক্যান করুন এবং আপনার অধিকার জানুন',
      'dash.stat.scanned': 'স্ক্যান করা হয়েছে',
      'dash.stat.alerts': 'ঝুঁকি সতর্কতা',
      'dash.stat.safe': 'নিরাপদ',
      'dash.stat.languages': 'ভাষা',
      'dash.quickaction': 'দ্রুত পদক্ষেপ',
      'dash.recent': 'সাম্প্রতিক কার্যকলাপ',
      'dash.norecent': 'এখনও কোনো স্ক্যান নেই। শুরু করতে একটি নথি স্ক্যান করুন!',

      'doc.fir': 'FIR',
      'doc.fir.sub': 'পুলিশ রিপোর্ট',
      'doc.land': 'জমি',
      'doc.land.sub': 'জমির দলিল',
      'doc.rent': 'ভাড়া',
      'doc.rent.sub': 'ভাড়া চুক্তি',
      'doc.loan': 'ঋণ',
      'doc.loan.sub': 'ঋণ নথি',

      'scan.title': 'নথি স্ক্যান করুন',
      'scan.hint': 'নথি এখানে রাখুন',
      'scan.hint.sub': 'ক্যামেরার সামনে নথি ধরুন',
      'scan.camera': '📸 ছবি তুলুন',
      'scan.camera.sub': 'ক্যামেরা ব্যবহার করুন',
      'scan.sample': '📄 নমুনা দেখুন',
      'scan.sample.sub': 'ডেমো চালান',
      'scan.analyze': '🔍 বিশ্লেষণ',
      'scan.back': '← ফিরে যান',

      'proc.ocr': 'OCR চলছে…',
      'proc.reading': 'নথি পড়া হচ্ছে',
      'proc.note': 'AI আইনি ভাষা সহজ বাংলায় রূপান্তর করছে',

      'result.title': 'বিশ্লেষণ',
      'result.clauses': '📋 মূল বিষয়',
      'result.steps': '👉 এরপর কী করবেন',
      'result.helpline.title': '🆓 বিনামূল্যে আইনি সহায়তা',
      'result.helpline.desc': 'National Legal Services Authority (NALSA)',
      'result.helpline.toll': '📞 15100 — টোল ফ্রি',

      // Modal
      'modal.title': '🔑 Groq API Key দিন',
      'modal.desc': 'console.groq.com-এ গিয়ে বিনামূল্যে API key নিন',
      'modal.save': 'সেভ করুন',
      'modal.later': 'পরে',
      'modal.note': 'Key শুধুমাত্র আপনার ডিভাইসে সেভ হবে',

      // Misc
      'badge.free': '✅ ১০০% বিনামূল্যে • অফলাইনে কাজ করে • কোনো অ্যাপ ডাউনলোড নয়',
      'tagline.main': 'উকিল নেই? সমস্যা নেই।',
      'tagline.sub': 'AI-powered আইনি নথি বিশ্লেষণ',
    }
  };

  let currentLang = 'hi';

  /**
   * Initialize — load saved language preference
   */
  function init() {
    const saved = localStorage.getItem('kanoon_lang');
    if (saved && translations[saved]) {
      currentLang = saved;
    }
    applyTranslations();
  }

  /**
   * Set language and apply translations
   */
  function setLang(langCode) {
    if (!translations[langCode]) {
      console.warn(`[I18N] Language '${langCode}' not found, falling back to Hindi`);
      langCode = 'hi';
    }
    currentLang = langCode;
    localStorage.setItem('kanoon_lang', langCode);
    applyTranslations();
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  function applyTranslations() {
    const lang = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (lang[key]) {
        el.textContent = lang[key];
      }
    });
    // Also update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (lang[key]) {
        el.placeholder = lang[key];
      }
    });
  }

  /**
   * Get a translated string by key
   */
  function t(key) {
    return translations[currentLang]?.[key] || translations['hi']?.[key] || key;
  }

  /**
   * Get current language code
   */
  function getLang() {
    return currentLang;
  }

  /**
   * Get language display name
   */
  function getLangName(code) {
    const names = {
      hi: 'हिंदी',
      en: 'English',
      mr: 'मराठी',
      ta: 'தமிழ்',
      bn: 'বাংলা'
    };
    return names[code] || code;
  }

  return { init, setLang, getLang, getLangName, t, applyTranslations };
})();
