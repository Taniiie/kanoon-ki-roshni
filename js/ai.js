// ═══════════════════════════════════════════
//  ai.js — Groq API Analysis Module
//  Uses LLaMA3 via Groq (100% free tier)
//  Fully supports multilingual output dynamically
// ═══════════════════════════════════════════

const AI = (() => {

  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const MODEL = 'llama-3.1-8b-instant'; // free, active model on Groq

  const localizedFallbacks = {
    hi: {
      riskLabels: { high: 'खतरनाक — High Risk', medium: 'सावधान — Review Needed', low: 'सुरक्षित — Safe' },
      patterns: [
        {
          pattern: /non.?refundable|refund nahi/i,
          hindi: 'जमानत राशि वापस नहीं मिलेगी — यह आपके लिए नुकसानदायक है।',
          action: 'इस पर हस्ताक्षर करने से पहले बातचीत करें।',
          risk: 'high'
        },
        {
          pattern: /vacate.*24.?hour|24.*hour.*vacate|immediate.*evict/i,
          hindi: 'मकान मालिक बिना नोटिस के 24 घंटे में निकाल सकता है — यह गैरकानूनी हो सकता है।',
          action: 'किराया नियंत्रण अधिनियम के तहत आपको 30 दिन का नोटिस मिलना चाहिए।',
          risk: 'high'
        },
        {
          pattern: /increase rent|rent.*increase|किराया.*बढ़/i,
          hindi: 'किराया बढ़ाने की शर्त है — जानें कितना और कब बढ़ सकता है।',
          action: 'हर वर्ष अधिकतम 10% की वृद्धि उचित है।',
          risk: 'medium'
        },
        {
          pattern: /all repairs|maintenance.*tenant|tenant.*maintenance/i,
          hindi: 'सभी मरम्मत का खर्च किरायेदार पर डाला गया है — यह अनुचित है।',
          action: 'बड़ी मरम्मत मकान मालिक की जिम्मेदारी होती है।',
          risk: 'medium'
        },
        {
          pattern: /subletting.*prohibited|no.*sublet/i,
          hindi: 'घर आगे किराये पर देना मना है।',
          action: 'यह सामान्य शर्त है, पालन करें।',
          risk: 'low'
        },
        {
          pattern: /penalty|fine|जुर्माना/i,
          hindi: 'नियम तोड़ने पर जुर्माना लगेगा — राशि जाँचें।',
          action: 'जुर्माने की राशि और कारण स्पष्ट रूप से लिखवाएं।',
          risk: 'medium'
        },
        {
          pattern: /interest.*per.*month|monthly.*interest/i,
          hindi: 'मासिक ब्याज का उल्लेख है — दर जाँचें।',
          action: 'RBI के अनुसार ब्याज दर 36% वार्षिक से अधिक नहीं होनी चाहिए।',
          risk: 'high'
        },
        {
          pattern: /without.*notice|no.*notice/i,
          hindi: 'बिना सूचना के कार्रवाई की जा सकती है — यह आपके अधिकारों के विरुद्ध हो सकता है।',
          action: 'किसी भी कार्रवाई के लिए लिखित नोटिस की माँग करें।',
          risk: 'high'
        }
      ],
      defaultClause: {
        risk: 'medium',
        explanation_hindi: 'दस्तावेज़ स्कैन किया गया। ऑफलाइन मोड में विस्तृत विश्लेषण के लिए Groq API key डालें।',
        what_to_do: 'NALSA हेल्पलाइन 15100 पर कॉल करें।'
      },
      summary: (risk) => `यह दस्तावेज़ ${risk === 'high' ? 'खतरनाक शर्तें' : 'कुछ महत्वपूर्ण बातें'} रखता है। हस्ताक्षर से पहले सभी शर्तें ध्यान से पढ़ें।`,
      next_steps: [
        'सभी शर्तें ध्यान से पढ़ें और समझें।',
        'कोई भी संदिग्ध शर्त पर हस्ताक्षर करने से पहले बदलवाने की कोशिश करें।',
        'NALSA हेल्पलाइन 15100 पर मुफ्त कानूनी सलाह लें।',
        'दस्तावेज़ की एक प्रति अपने पास रखें।'
      ]
    },
    en: {
      riskLabels: { high: 'Dangerous — High Risk', medium: 'Caution — Review Needed', low: 'Safe — Low Risk' },
      patterns: [
        {
          pattern: /non.?refundable|refund nahi/i,
          hindi: 'Security deposit is non-refundable — this is disadvantageous to you.',
          action: 'Negotiate this clause before signing the document.',
          risk: 'high'
        },
        {
          pattern: /vacate.*24.?hour|24.*hour.*vacate|immediate.*evict/i,
          hindi: 'Landlord can evict you in 24 hours without notice — this is highly illegal.',
          action: 'Demand a standard 30-day notice period as per Rent Control Act.',
          risk: 'high'
        },
        {
          pattern: /increase rent|rent.*increase|किराया.*बढ़/i,
          hindi: 'Rent increase clause is present — check the rate and frequency.',
          action: 'A maximum annual increase of 5-10% is standard and reasonable.',
          risk: 'medium'
        },
        {
          pattern: /all repairs|maintenance.*tenant|tenant.*maintenance/i,
          hindi: 'Tenant is burdened with all maintenance and repairs — this is unfair.',
          action: 'Major structural repairs must be the landlord\'s responsibility.',
          risk: 'medium'
        },
        {
          pattern: /subletting.*prohibited|no.*sublet/i,
          hindi: 'Subletting the property is prohibited.',
          action: 'This is a standard clause, follow accordingly.',
          risk: 'low'
        },
        {
          pattern: /penalty|fine|जुर्माना/i,
          hindi: 'A penalty fee is mentioned for rule violations — check the exact amount.',
          action: 'Ensure the penalty triggers and amounts are clearly defined.',
          risk: 'medium'
        },
        {
          pattern: /interest.*per.*month|monthly.*interest/i,
          hindi: 'Monthly interest rate is mentioned — verify the rate.',
          action: 'Per RBI guidelines, exorbitant rates above 2-3% per month are predatory.',
          risk: 'high'
        },
        {
          pattern: /without.*notice|no.*notice/i,
          hindi: 'Action can be taken without prior notice — this violates your basic rights.',
          action: 'Always demand a written notice requirement for any legal action.',
          risk: 'high'
        }
      ],
      defaultClause: {
        risk: 'medium',
        explanation_hindi: 'Document scanned. For advanced deep AI analysis, configure your Groq API Key.',
        what_to_do: 'Call NALSA helpline 15100 for free legal assistance.'
      },
      summary: (risk) => `This document contains ${risk === 'high' ? 'highly critical risk clauses' : 'several important clauses'}. Read carefully before signing.`,
      next_steps: [
        'Read all terms and conditions slowly and carefully.',
        'Protest or renegotiate any high-risk terms before signing.',
        'Get free legal consultation by calling NALSA Helpline 15100.',
        'Always keep a physical and digital copy of the signed document.'
      ]
    },
    mr: {
      riskLabels: { high: 'धोकादायक — High Risk', medium: 'सावधान — Review Needed', low: 'सुरक्षित — Safe' },
      patterns: [
        {
          pattern: /non.?refundable|refund nahi/i,
          hindi: 'ठेव परतावा मिळणार नाही — हे तुमच्यासाठी नुकसानकारक आहे.',
          action: 'स्वाक्षरी करण्यापूर्वी यावर चर्चा करून बदल करा.',
          risk: 'high'
        },
        {
          pattern: /vacate.*24.?hour|24.*hour.*vacate|immediate.*evict/i,
          hindi: 'मकान मालक नोटीसशिवाय २४ तासांत बाहेर काढू शकतो — हे बेकायदेशीर आहे.',
          action: 'भाडे नियंत्रण कायद्यानुसार ३० दिवसांची नोटीस मिळणे आवश्यक आहे.',
          risk: 'high'
        },
        {
          pattern: /increase rent|rent.*increase|किराया.*बढ़/i,
          hindi: 'भाडे वाढीची अट समाविष्ट आहे — किती आणि कधी वाढेल हे तपासा.',
          action: 'दरवर्षी जास्तीत जास्त १०% वाढ योग्य मानली जाते.',
          risk: 'medium'
        },
        {
          pattern: /all repairs|maintenance.*tenant|tenant.*maintenance/i,
          hindi: 'दुरुस्तीचा सर्व खर्च भाडेकरूवर टाकण्यात आला आहे — हे अयोग्य आहे.',
          action: 'मोठ्या दुरुस्तीचे काम मालकाची जबाबदारी असावी.',
          risk: 'medium'
        },
        {
          pattern: /subletting.*prohibited|no.*sublet/i,
          hindi: 'घर पुढे भाड्याने देणे प्रतिबंधित आहे.',
          action: 'ही एक सामान्य अट आहे, तिचे पालन करा.',
          risk: 'low'
        },
        {
          pattern: /penalty|fine|जुर्माना/i,
          hindi: 'नियम मोडल्यास दंडाची तरतूद आहे — दंडाची रक्कम तपासा.',
          action: 'दंडाचे कारण आणि अचूक रक्कम स्पष्टपणे लिहून घ्या.',
          risk: 'medium'
        },
        {
          pattern: /interest.*per.*month|monthly.*interest/i,
          hindi: 'मासिक व्याजाचा उल्लेख आहे — दर तपासा.',
          action: 'RBI च्या मार्गदर्शक तत्त्वांनुसार व्याजदर जास्त नसावा.',
          risk: 'high'
        },
        {
          pattern: /without.*notice|no.*notice/i,
          hindi: 'पूर्वसूचनेशिवाय कारवाई केली जाऊ शकते — हे तुमच्या हक्कांचे उल्लंघन आहे.',
          action: 'कारवाईपूर्वी लेखी नोटीस देण्याची मागणी करा.',
          risk: 'high'
        }
      ],
      defaultClause: {
        risk: 'medium',
        explanation_hindi: 'दस्तऐवज स्कॅन केला. तपशीलवार विश्लेषणासाठी Groq API key प्रविष्ट करा.',
        what_to_do: 'मोफत कायदेशीर सल्ल्यासाठी NALSA हेल्पलाइन १५१०० वर कॉल करा.'
      },
      summary: (risk) => `या दस्तऐवजात ${risk === 'high' ? 'धोकादायक अटी' : 'काही महत्त्वाच्या बाबी'} आहेत. स्वाक्षरीपूर्वी काळजीपूर्वक वाचा.`,
      next_steps: [
        'सर्व अटी व शर्ती काळजीपूर्वक वाचा आणि समजून घ्या.',
        'स्वाक्षरी करण्यापूर्वी कोणत्याही संशयास्पद अटी बदलून घ्या.',
        'NALSA हेल्पलाइन १५१०० वर मोफत कायदेशीर सल्ला घ्या.',
        'दस्तऐवजाची एक प्रत नेहमी स्वतःकडे ठेवा.'
      ]
    },
    ta: {
      riskLabels: { high: 'ஆபத்தானது — High Risk', medium: 'எச்சரிக்கை — Review Needed', low: 'பாதுகாப்பானது — Safe' },
      patterns: [
        {
          pattern: /non.?refundable|refund nahi/i,
          hindi: 'முன்பணம் திரும்பப் பெறப்பட மாட்டாது — இது உங்களுக்கு நஷ்டத்தை ஏற்படுத்தும்.',
          action: 'கையெழுத்திடுவதற்கு முன்பு இந்த நிபந்தனையை மாற்ற பேசி விவாதியுங்கள்.',
          risk: 'high'
        },
        {
          pattern: /vacate.*24.?hour|24.*hour.*vacate|immediate.*evict/i,
          hindi: 'முன்னறிவிப்பு இன்றி 24 மணிநேரத்தில் காலி செய்யச் சொல்லலாம் — இது சட்டவிரோதமானது.',
          action: 'வாடகை கட்டுப்பாட்டு சட்டத்தின்படி 30 நாட்கள் முன்னறிவிப்பு கோரவும்.',
          risk: 'high'
        },
        {
          pattern: /increase rent|rent.*increase|किराया.*बढ़/i,
          hindi: 'வாடகை உயர்வுக்கான நிபந்தனை உள்ளது — அதன் அளவு மற்றும் கால அளவை சரிபார்க்கவும்.',
          action: 'ஆண்டுக்கு அதிகபட்சம் 10% வாடகை உயர்வு மட்டுமே நியாயமானது.',
          risk: 'medium'
        },
        {
          pattern: /all repairs|maintenance.*tenant|tenant.*maintenance/i,
          hindi: 'அனைத்து பழுதுபார்ப்புச் செலவுகளும் வாடகைதாரர் மீது சுமத்தப்பட்டுள்ளது — இது நியாயமற்றது.',
          action: 'பெரிய பழுதுபார்ப்புகள் வீட்டு உரிமையாளரின் பொறுப்பாக இருக்க வேண்டும்.',
          risk: 'medium'
        },
        {
          pattern: /subletting.*prohibited|no.*sublet/i,
          hindi: 'வீட்டை உள்வாடகைக்கு விடுவது தடைசெய்யப்பட்டுள்ளது.',
          action: 'இது ஒரு பொதுவான நிபந்தனை, பின்பற்றவும்.',
          risk: 'low'
        },
        {
          pattern: /penalty|fine|जुर्माना/i,
          hindi: 'விதிமுறை மீறல்களுக்கு அபராதம் விதிக்கப்படும் — தொகையை சரிபார்க்கவும்.',
          action: 'அபராதத்திற்கான காரணம் மற்றும் தொகையை தெளிவாக எழுதச் சொல்லுங்கள்.',
          risk: 'medium'
        },
        {
          pattern: /interest.*per.*month|monthly.*interest/i,
          hindi: 'மாதாந்திர வட்டி குறிப்பிடப்பட்டுள்ளது — வட்டி விகிதத்தை சரிபார்க்கவும்.',
          action: 'RBI வழிகாட்டுதலின்படி அதிகப்படியான வட்டி வசூலிப்பது சட்டவிரோதமானது.',
          risk: 'high'
        },
        {
          pattern: /without.*notice|no.*notice/i,
          hindi: 'முன்னறிவிப்பு இல்லாமல் நடவடிக்கை எடுக்கலாம் — இது உங்கள் உரிமைகளுக்கு எதிரானது.',
          action: 'எந்தவொரு நடவடிக்கைக்கும் எழுத்துப்பூர்வமான முன்னறிவிப்பை கட்டாயமாக்க கோரவும்.',
          risk: 'high'
        }
      ],
      defaultClause: {
        risk: 'medium',
        explanation_hindi: 'ஆவணம் ஸ்கேன் செய்யப்பட்டது. விரிவான பகுப்பாய்விற்கு Groq API சாவி-ஐ உள்ளிடவும்.',
        what_to_do: 'இலவச சட்ட உதவிக்கு NALSA உதவி எண் 15100 ஐ அழைக்கவும்.'
      },
      summary: (risk) => `இந்த ஆவணம் ${risk === 'high' ? 'ஆபத்தான நிபந்தனைகளை' : 'சில முக்கியமான விஷயங்களை'} கொண்டுள்ளது. கையெழுத்திடும் முன் படிக்கவும்.`,
      next_steps: [
        'அனைத்து நிபந்தனைகளையும் கவனமாகப் படித்துப் புரிந்து கொள்ளுங்கள்.',
        'சந்தேகத்திற்குரிய நிபந்தனைகளை கையெழுத்திடும் முன் மாற்ற முயற்சி செய்யுங்கள்.',
        'NALSA உதவி எண் 15100 மூலம் இலவச சட்ட ஆலோசனையைப் பெறுங்கள்.',
        'ஆவணத்தின் நகலை எப்போதும் உங்களிடம் வைத்திருக்கவும்.'
      ]
    },
    bn: {
      riskLabels: { high: 'ঝুঁকিপূর্ণ — High Risk', medium: 'সতর্কতা — Review Needed', low: 'নিরাপদ — Safe' },
      patterns: [
        {
          pattern: /non.?refundable|refund nahi/i,
          hindi: 'আমানত ফেরতযোগ্য নয় — এটি আপনার জন্য ক্ষতিকর হতে পারে।',
          action: 'স্বাক্ষর করার আগে এই শর্তটি নিয়ে আলোচনা করুন।',
          risk: 'high'
        },
        {
          pattern: /vacate.*24.?hour|24.*hour.*vacate|immediate.*evict/i,
          hindi: 'বাড়িওয়ালা নোটিশ ছাড়া ২৪ ঘণ্টার মধ্যে উচ্ছেদ করতে পারেন — এটি বেআইনি।',
          action: 'ভাড়া নিয়ন্ত্রণ আইন অনুযায়ী ৩০ দিনের নোটিশের দাবি করুন।',
          risk: 'high'
        },
        {
          pattern: /increase rent|rent.*increase|किराया.*बढ़/i,
          hindi: 'ভাড়া বৃদ্ধির শর্ত রয়েছে — কত এবং কখন বাড়বে তা যাচাই করুন।',
          action: 'প্রতি বছর সর্বোচ্চ ১০% ভাড়া বৃদ্ধি যুক্তিসঙ্গত।',
          risk: 'medium'
        },
        {
          pattern: /all repairs|maintenance.*tenant|tenant.*maintenance/i,
          hindi: 'মেরামতের সমস্ত খরচ ভাড়াটিয়ার ওপর দেওয়া হয়েছে — এটি অনুচিত।',
          action: 'বড় ধরনের মেরামতের দায়িত্ব বাড়িওয়ালার হওয়া উচিত।',
          risk: 'medium'
        },
        {
          pattern: /subletting.*prohibited|no.*sublet/i,
          hindi: 'উপভাড়া দেওয়া সম্পূর্ণ নিষিদ্ধ।',
          action: 'এটি একটি সাধারণ শর্ত, মেনে চলুন।',
          risk: 'low'
        },
        {
          pattern: /penalty|fine|जुर्माना/i,
          hindi: 'নিয়ম ভঙ্গের জন্য জরিমানার উল্লেখ আছে — জরিমানার পরিমাণ দেখুন।',
          action: 'জরিমানার কারণ এবং পরিমাণ স্পষ্টভাবে লিখিয়ে নিন।',
          risk: 'medium'
        },
        {
          pattern: /interest.*per.*month|monthly.*interest/i,
          hindi: 'মাসিক সুদের উল্লেখ আছে — সুদের হার যাচাই করুন।',
          action: 'RBI এর নির্দেশিকা অনুযায়ী অত্যধিক সুদ নেওয়া দণ্ডনীয় অপরাধ।',
          risk: 'high'
        },
        {
          pattern: /without.*notice|no.*notice/i,
          hindi: 'নোটিশ ছাড়াই পদক্ষেপ নেওয়া হতে পারে — এটি আপনার অধিকার লঙ্ঘন করে।',
          action: 'যেকোনো পদক্ষেপের জন্য লিখিত নোটিশের প্রয়োজনীয়তার দাবি করুন।',
          risk: 'high'
        }
      ],
      defaultClause: {
        risk: 'medium',
        explanation_hindi: 'নথি স্ক্যান করা হয়েছে। বিস্তারিত বিশ্লেষণের জন্য Groq API Key যুক্ত করুন।',
        what_to_do: 'বিনামূল্যে আইনি পরামর্শের জন্য NALSA হেল্পলাইন ১৫১০০ এ কল করুন।'
      },
      summary: (risk) => `এই নথিতে ${risk === 'high' ? 'ঝুঁকিপূর্ণ শর্তাবলী' : 'কিছু গুরুত্বপূর্ণ বিষয়'} রয়েছে। স্বাক্ষরের আগে সতর্কতার সাথে পড়ুন।`,
      next_steps: [
        'সমস্ত শর্তাবলী মনোযোগ দিয়ে পড়ুন এবং বুঝুন।',
        'স্বাক্ষর করার আগে যেকোনো সন্দেহজনক শর্ত পরিবর্তন করার চেষ্টা করুন।',
        'NALSA হেল্পলাইন ১৫১০০ এ কল করে বিনামূল্যে আইনি পরামর্শ নিন।',
        'নথির একটি কপি সবসময় নিজের কাছে রাখুন।'
      ]
    }
  };

  /**
   * Build the legal analysis prompt
   */
  function buildPrompt(text, docType, langCode) {
    const langNames = {
      hi: 'Hindi',
      en: 'English',
      mr: 'Marathi',
      ta: 'Tamil',
      bn: 'Bengali'
    };
    const targetLang = langNames[langCode] || 'Hindi';

    return `You are a professional legal aid assistant for common citizens in India. Analyze the following legal document and respond ONLY with a valid JSON object. No markdown, no pre-text, no post-text.

Document type hint: ${docType === 'auto' ? 'auto-detect' : docType}
Document text:
"""
${text.substring(0, 2000)}
"""

Respond ONLY with this exact JSON structure:
{
  "document_type": "fir|land|rent|loan|other",
  "risk_level": "high|medium|low",
  "summary_hindi": "2 sentence summary of the document, translated completely to clear and simple ${targetLang}",
  "clauses": [
    {
      "risk": "high|medium|low",
      "explanation_hindi": "Simple explanation of this clause in simple ${targetLang} (max 2 sentences)",
      "what_to_do": "Brief practical advice in simple ${targetLang}"
    }
  ],
  "next_steps": [
    "Step 1 in simple ${targetLang}",
    "Step 2 in simple ${targetLang}",
    "Step 3 in simple ${targetLang}"
  ]
}

Rules:
- Crucial: The values for "summary_hindi", "explanation_hindi", "what_to_do", and "next_steps" MUST be fully and entirely written in simple ${targetLang} (e.g. if the user language is English, write these values in plain English. If Marathi, in plain Marathi).
- Use simple terms easily understandable by a person with a 5th-grade education.
- Identify 3-5 most critical clauses that affect the person's rights or financial/legal risk.
- "next_steps" must consist of exactly 3 or 4 practical, actionable steps written in simple ${targetLang}.
- If there are highly unfavorable or unfair terms (e.g. immediate eviction, non-refundable deposit, excessive interest), mark "risk_level" as "high".`;
  }

  /**
   * Analyze document text using Groq API
   */
  async function analyze(text, docType, apiKey, langCode = 'hi') {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'user',
              content: buildPrompt(text, docType, langCode)
            }
          ],
          max_tokens: 1500,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const rawContent = data.choices[0]?.message?.content || '';

      console.log('[AI] Raw response:', rawContent.substring(0, 300));

      // Parse JSON — strip any markdown fences if present
      const cleaned = rawContent
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const analysis = JSON.parse(cleaned);
      return sanitizeAnalysis(analysis);

    } catch (err) {
      console.error('[AI] Error:', err);

      // If API fails, use offline rule-based fallback
      console.log('[AI] Falling back to offline analysis in', langCode);
      return offlineAnalysis(text, docType, langCode);
    }
  }

  /**
   * Sanitize and validate analysis object
   */
  function sanitizeAnalysis(raw) {
    return {
      document_type: raw.document_type || 'other',
      risk_level: ['high','medium','low'].includes(raw.risk_level) ? raw.risk_level : 'medium',
      summary_hindi: raw.summary_hindi || 'विश्लेषण पूर्ण हुआ।',
      clauses: (raw.clauses || []).slice(0, 6).map(c => ({
        risk: ['high','medium','low'].includes(c.risk) ? c.risk : 'medium',
        explanation_hindi: c.explanation_hindi || 'इस खंड की जाँच करें।',
        what_to_do: c.what_to_do || 'वकील से सलाह लें।'
      })),
      next_steps: (raw.next_steps || []).slice(0, 5)
    };
  }

  /**
   * Offline rule-based analysis fallback
   */
  function offlineAnalysis(text, docType, langCode) {
    const config = localizedFallbacks[langCode] || localizedFallbacks['hi'];
    const clauses = [];
    let riskLevel = 'low';

    config.patterns.forEach(p => {
      if (p.pattern.test(text)) {
        clauses.push({
          risk: p.risk,
          explanation_hindi: p.hindi,
          what_to_do: p.action
        });
        if (p.risk === 'high') riskLevel = 'high';
        else if (p.risk === 'medium' && riskLevel !== 'high') riskLevel = 'medium';
      }
    });

    if (clauses.length === 0) {
      clauses.push({
        risk: config.defaultClause.risk,
        explanation_hindi: config.defaultClause.explanation_hindi,
        what_to_do: config.defaultClause.what_to_do
      });
    }

    return {
      document_type: docType,
      risk_level: riskLevel,
      summary_hindi: config.summary(riskLevel),
      clauses,
      next_steps: config.next_steps
    };
  }

  return { analyze };
})();
