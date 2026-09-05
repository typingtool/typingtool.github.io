// passages.js — SSC Typing Test Simulator Passage Database
// Each passage has: id, text, exam, language, difficulty, wordCount

const PASSAGES = {
  english: [
    {
      id: "en_cgl_1",
      exam: "SSC CGL",
      title: "Indian Economy",
      difficulty: "Medium",
      text: "The Indian economy has witnessed remarkable growth over the past few decades, transforming from a primarily agrarian society to a diversified economy with significant contributions from the services and manufacturing sectors. The liberalization policies introduced in 1991 opened up the economy to foreign investment and trade, leading to unprecedented growth rates. India's gross domestic product has grown substantially, making it one of the fastest-growing major economies in the world. The information technology sector has been a major driver of this growth, with cities like Bangalore, Hyderabad, and Pune emerging as global technology hubs. The government has implemented various initiatives such as Make in India, Digital India, and Startup India to further boost economic growth and create employment opportunities for the country's young population. Despite these achievements, challenges such as income inequality, rural poverty, and infrastructure gaps continue to persist, requiring sustained policy intervention and investment."
    },
    {
      id: "en_cgl_2",
      exam: "SSC CGL",
      title: "Indian Constitution",
      difficulty: "Medium",
      text: "The Constitution of India is the supreme law of the country and establishes the framework for the fundamental political principles, procedures, rights, and duties of the government and its citizens. It was adopted by the Constituent Assembly on November 26, 1949, and came into effect on January 26, 1950. Dr. Bhimrao Ramji Ambedkar is widely regarded as the chief architect of the Indian Constitution. The document draws inspiration from several sources, including the constitutions of the United States, the United Kingdom, Ireland, and Australia. The Constitution originally consisted of 395 articles organized into 22 parts and 8 schedules. Over the years, it has been amended more than 100 times to address changing social, political, and economic needs. The Preamble to the Constitution declares India to be a sovereign, socialist, secular, democratic republic, committed to securing justice, liberty, equality, and fraternity for all its citizens. The fundamental rights guaranteed by the Constitution include the right to equality, the right to freedom, the right against exploitation, the right to freedom of religion, cultural and educational rights, and the right to constitutional remedies."
    },
    {
      id: "en_cgl_3",
      exam: "SSC CGL",
      title: "Environmental Conservation",
      difficulty: "Hard",
      text: "Environmental conservation has become one of the most pressing challenges facing humanity in the twenty-first century. The rapid industrialization and urbanization witnessed across the globe have led to significant degradation of natural ecosystems, depletion of natural resources, and alarming levels of pollution. Climate change, driven primarily by the emission of greenhouse gases from burning fossil fuels, poses an existential threat to life on Earth. Rising global temperatures are causing melting of polar ice caps, rising sea levels, and more frequent extreme weather events such as hurricanes, droughts, and floods. The Paris Agreement, signed by nearly 200 countries in 2015, represents a landmark global effort to limit temperature rise to 1.5 degrees Celsius above pre-industrial levels. India has committed to achieving net-zero carbon emissions by 2070 and has made significant investments in renewable energy sources, particularly solar and wind power. The country's International Solar Alliance initiative aims to promote solar energy adoption across tropical nations."
    },
    {
      id: "en_chsl_1",
      exam: "SSC CHSL",
      title: "Digital India",
      difficulty: "Easy",
      text: "The Digital India programme is a flagship initiative of the Government of India with a vision to transform India into a digitally empowered society and knowledge economy. Launched on July 1, 2015, by Prime Minister Narendra Modi, the programme aims to ensure that government services are made available to citizens electronically by improving online infrastructure and by increasing internet connectivity. The initiative encompasses several key areas including digital infrastructure as a utility for every citizen, governance and services on demand, and digital empowerment of citizens. Under this programme, numerous projects have been implemented such as BharatNet, which aims to provide broadband connectivity to all gram panchayats, and the Unified Payments Interface which has revolutionized digital payments in India. The programme has significantly contributed to financial inclusion through initiatives like Jan Dhan Yojana and has made government services more accessible and transparent through platforms like DigiLocker and the UMANG app."
    },
    {
      id: "en_chsl_2",
      exam: "SSC CHSL",
      title: "Space Research",
      difficulty: "Easy",
      text: "The Indian Space Research Organisation, commonly known as ISRO, is the national space agency of India headquartered in the city of Bangalore. Established in 1969, ISRO has grown to become one of the most respected space agencies in the world, known for its cost-effective and innovative approach to space exploration. The organization has achieved numerous milestones, including the successful Mars Orbiter Mission in 2014, which made India the first Asian country to reach Mars orbit and the first nation to do so on its maiden attempt. The Chandrayaan missions have significantly advanced our understanding of the Moon, with Chandrayaan-3 successfully achieving a soft landing near the lunar south pole in August 2023, making India the fourth country to land on the Moon. ISRO has also launched hundreds of satellites for communication, navigation, earth observation, and scientific research purposes. The organization continues to work on ambitious projects, including the Gaganyaan mission, which aims to send Indian astronauts to space."
    },
    {
      id: "en_ntpc_1",
      exam: "Railway NTPC",
      title: "Indian Railways",
      difficulty: "Medium",
      text: "Indian Railways is one of the largest railway networks in the world, spanning over 68,000 kilometres of track across the length and breadth of the country. Established in 1853 with the first passenger train running between Mumbai and Thane, the Indian Railways has grown into a vast network that serves as the lifeline of the nation. It operates more than 13,000 passenger trains daily, carrying approximately 23 million passengers each day, and runs about 9,000 freight trains, transporting over 3 million tonnes of freight daily. The railway system is divided into 18 zones, each managed by a general manager. In recent years, Indian Railways has undergone significant modernization efforts, including the introduction of high-speed trains like Vande Bharat Express, electrification of routes to reduce carbon emissions, implementation of automatic signalling systems for enhanced safety, and the development of dedicated freight corridors to improve cargo transportation efficiency. The railways remain one of the largest employers in the world, providing livelihood to over 1.2 million people."
    },
    {
      id: "en_ntpc_2",
      exam: "Railway NTPC",
      title: "Public Health",
      difficulty: "Medium",
      text: "Public health is a critical component of national development and well-being. In India, the healthcare system has undergone significant transformation over the decades, evolving from a primarily curative approach to one that increasingly emphasizes preventive and primary healthcare. The Ayushman Bharat scheme, launched in 2018, is one of the world's largest government-funded healthcare programmes, aiming to provide health coverage of up to five lakh rupees per family per year for secondary and tertiary hospitalization. The scheme has benefited millions of underprivileged families across the country. The National Health Mission continues to strengthen healthcare delivery in rural and urban areas through the establishment of health and wellness centres. India's successful vaccination campaigns, including the massive COVID-19 vaccination drive that administered over two billion doses, demonstrate the country's capacity to execute large-scale public health interventions. Despite these achievements, challenges such as a shortage of healthcare professionals, inadequate rural healthcare infrastructure, and the rising burden of non-communicable diseases require continued attention and investment."
    },
    {
      id: "en_cgl_4",
      exam: "SSC CGL",
      title: "Taxation System",
      difficulty: "Hard",
      text: "The taxation system in India has undergone a historic transformation with the introduction of the Goods and Services Tax on July 1, 2017. The GST replaced a complex web of indirect taxes levied by the central and state governments, including excise duty, service tax, value added tax, and various cesses and surcharges. This landmark reform was aimed at creating a unified national market by eliminating cascading taxation and interstate barriers to trade. The GST Council, a constitutional body comprising the Union Finance Minister and state finance ministers, is responsible for making recommendations on tax rates, exemptions, and administrative matters. The tax is structured into multiple slabs of 5, 12, 18, and 28 percent, with essential commodities either exempted or taxed at the lowest rate. On the direct taxation front, the Income Tax Act of 1961 governs the levy and collection of income tax from individuals, Hindu undivided families, companies, firms, and other entities. The government has progressively simplified the tax filing process through digital platforms and has introduced faceless assessment and appeal mechanisms to enhance transparency and reduce corruption in tax administration."
    },
    {
      id: "en_chsl_3",
      exam: "SSC CHSL",
      title: "Education System",
      difficulty: "Easy",
      text: "The education system in India is one of the largest in the world, catering to millions of students across schools, colleges, and universities. The National Education Policy 2020 represents a comprehensive framework for transforming the education landscape in India. It replaces the previous policy that was formulated in 1986 and aims to make India a global knowledge superpower by 2040. The policy introduces several significant changes, including the restructuring of the school curriculum into a 5+3+3+4 system, emphasis on mother tongue or local language as the medium of instruction up to grade five, integration of vocational education from grade six onwards, and the establishment of a single regulatory body for higher education. The policy also promotes multidisciplinary education, allowing students to choose subjects across streams, and proposes the introduction of coding and computational thinking from the middle school level. These reforms are expected to enhance access to quality education, promote critical thinking and creativity among students, and prepare them for the challenges of the modern global economy."
    },
    {
      id: "en_ntpc_3",
      exam: "Railway NTPC",
      title: "Renewable Energy",
      difficulty: "Medium",
      text: "India has emerged as a global leader in renewable energy adoption, with ambitious targets to achieve 500 gigawatts of non-fossil fuel energy capacity by the year 2030. The country's renewable energy portfolio includes solar, wind, hydroelectric, and biomass sources, with solar energy witnessing the most rapid growth in recent years. India is home to some of the world's largest solar parks, including the Bhadla Solar Park in Rajasthan, which has an installed capacity exceeding 2,200 megawatts. The government's push for clean energy is driven by multiple factors, including the need to reduce dependence on imported fossil fuels, address growing energy demand from a rapidly developing economy, and meet international climate commitments. The production-linked incentive scheme for solar module manufacturing aims to build domestic manufacturing capacity and reduce reliance on imports. Wind energy also plays a crucial role, with India being the fourth-largest wind energy producer globally. The offshore wind energy sector presents significant untapped potential along India's extensive coastline, and the government has set targets for developing offshore wind capacity in the coming decade."
    }
  ],
  hindi: [
    {
      id: "hi_cgl_1",
      exam: "SSC CGL",
      title: "भारतीय अर्थव्यवस्था",
      difficulty: "Medium",
      text: "भारतीय अर्थव्यवस्था विश्व की सबसे तेजी से बढ़ती प्रमुख अर्थव्यवस्थाओं में से एक है। पिछले कुछ दशकों में भारत ने आर्थिक विकास के क्षेत्र में उल्लेखनीय प्रगति की है। 1991 में शुरू किए गए आर्थिक उदारीकरण ने भारतीय अर्थव्यवस्था को वैश्विक बाजार के लिए खोल दिया, जिससे विदेशी निवेश में भारी वृद्धि हुई। सूचना प्रौद्योगिकी क्षेत्र ने भारत को विश्व मानचित्र पर एक प्रमुख स्थान दिलाया है। बेंगलुरु, हैदराबाद और पुणे जैसे शहर वैश्विक प्रौद्योगिकी केंद्रों के रूप में उभरे हैं। सरकार ने मेक इन इंडिया, डिजिटल इंडिया और स्टार्टअप इंडिया जैसी पहलों के माध्यम से आर्थिक विकास को और गति प्रदान की है। इन उपलब्धियों के बावजूद, आय असमानता, ग्रामीण गरीबी और बुनियादी ढांचे की कमी जैसी चुनौतियां अभी भी बनी हुई हैं जिन पर निरंतर ध्यान देने की आवश्यकता है।"
    },
    {
      id: "hi_cgl_2",
      exam: "SSC CGL",
      title: "भारतीय संविधान",
      difficulty: "Medium",
      text: "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है जो देश की सर्वोच्च विधि है। इसे 26 नवंबर 1949 को संविधान सभा द्वारा अंगीकृत किया गया और 26 जनवरी 1950 को यह लागू हुआ। डॉक्टर भीमराव अंबेडकर को भारतीय संविधान का मुख्य शिल्पकार माना जाता है। संविधान में मूल रूप से 395 अनुच्छेद 22 भागों और 8 अनुसूचियों में व्यवस्थित थे। वर्षों में इसमें 100 से अधिक संशोधन किए जा चुके हैं। संविधान की प्रस्तावना भारत को एक संप्रभु समाजवादी धर्मनिरपेक्ष लोकतांत्रिक गणराज्य घोषित करती है। मौलिक अधिकारों में समानता का अधिकार, स्वतंत्रता का अधिकार, शोषण के विरुद्ध अधिकार, धार्मिक स्वतंत्रता का अधिकार, संस्कृति और शिक्षा संबंधी अधिकार तथा संवैधानिक उपचारों का अधिकार शामिल हैं। नीति निदेशक तत्व राज्य को सामाजिक और आर्थिक न्याय सुनिश्चित करने का मार्गदर्शन करते हैं।"
    },
    {
      id: "hi_chsl_1",
      exam: "SSC CHSL",
      title: "डिजिटल भारत",
      difficulty: "Easy",
      text: "डिजिटल इंडिया कार्यक्रम भारत सरकार की एक प्रमुख पहल है जिसका उद्देश्य भारत को एक डिजिटल रूप से सशक्त समाज और ज्ञान अर्थव्यवस्था में बदलना है। इस कार्यक्रम को 1 जुलाई 2015 को प्रधानमंत्री नरेंद्र मोदी द्वारा शुरू किया गया था। इसका लक्ष्य सरकारी सेवाओं को इलेक्ट्रॉनिक रूप से नागरिकों तक पहुंचाना है। भारतनेट परियोजना के तहत सभी ग्राम पंचायतों को ब्रॉडबैंड कनेक्टिविटी प्रदान करने का लक्ष्य रखा गया है। यूनिफाइड पेमेंट्स इंटरफेस ने भारत में डिजिटल भुगतान में क्रांति ला दी है। जन धन योजना के माध्यम से वित्तीय समावेशन को बढ़ावा दिया गया है। डिजिलॉकर और उमंग ऐप जैसे प्लेटफॉर्म ने सरकारी सेवाओं को अधिक सुलभ और पारदर्शी बनाया है।"
    },
    {
      id: "hi_ntpc_1",
      exam: "Railway NTPC",
      title: "भारतीय रेलवे",
      difficulty: "Medium",
      text: "भारतीय रेलवे विश्व के सबसे बड़े रेल नेटवर्कों में से एक है जो देश भर में 68000 किलोमीटर से अधिक ट्रैक पर फैला हुआ है। 1853 में मुंबई और ठाणे के बीच पहली यात्री ट्रेन के संचालन के साथ स्थापित भारतीय रेलवे राष्ट्र की जीवनरेखा के रूप में विकसित हुआ है। यह प्रतिदिन 13000 से अधिक यात्री ट्रेनों का संचालन करता है जो लगभग 2.3 करोड़ यात्रियों को ले जाती हैं। हाल के वर्षों में भारतीय रेलवे ने वंदे भारत एक्सप्रेस जैसी उच्च गति वाली ट्रेनों की शुरूआत, मार्गों के विद्युतीकरण, स्वचालित सिग्नलिंग प्रणालियों के कार्यान्वयन और समर्पित माल गलियारों के विकास सहित महत्वपूर्ण आधुनिकीकरण प्रयास किए हैं। रेलवे विश्व के सबसे बड़े नियोक्ताओं में से एक है जो 12 लाख से अधिक लोगों को रोजगार प्रदान करता है।"
    },
    {
      id: "hi_chsl_2",
      exam: "SSC CHSL",
      title: "शिक्षा व्यवस्था",
      difficulty: "Easy",
      text: "भारत की शिक्षा प्रणाली विश्व की सबसे बड़ी शिक्षा प्रणालियों में से एक है। राष्ट्रीय शिक्षा नीति 2020 भारत में शिक्षा के परिदृश्य को बदलने के लिए एक व्यापक रूपरेखा प्रस्तुत करती है। यह नीति 1986 में बनी पिछली नीति का स्थान लेती है और 2040 तक भारत को वैश्विक ज्ञान महाशक्ति बनाने का लक्ष्य रखती है। इस नीति में विद्यालय पाठ्यक्रम को 5 जमा 3 जमा 3 जमा 4 प्रणाली में पुनर्गठित करना, कक्षा पांच तक मातृभाषा या स्थानीय भाषा में शिक्षा पर जोर देना, कक्षा छह से व्यावसायिक शिक्षा का एकीकरण करना और उच्च शिक्षा के लिए एकल नियामक निकाय की स्थापना जैसे कई महत्वपूर्ण परिवर्तन शामिल हैं। इन सुधारों से गुणवत्तापूर्ण शिक्षा तक पहुंच बढ़ने और विद्यार्थियों में रचनात्मकता को बढ़ावा मिलने की उम्मीद है।"
    },
    {
      id: "hi_ntpc_2",
      exam: "Railway NTPC",
      title: "भारतीय कृषि",
      difficulty: "Medium",
      text: "भारत एक कृषि प्रधान देश है जहां लगभग 58 प्रतिशत जनसंख्या अपनी आजीविका के लिए कृषि पर निर्भर है। भारतीय कृषि क्षेत्र देश के सकल घरेलू उत्पाद में लगभग 18 प्रतिशत का योगदान देता है। हरित क्रांति ने 1960 के दशक में भारतीय कृषि का कायाकल्प कर दिया जिससे खाद्यान्न उत्पादन में अभूतपूर्व वृद्धि हुई। वर्तमान में भारत विश्व में चावल, गेहूं, दूध, फलों और सब्जियों का प्रमुख उत्पादक है। प्रधानमंत्री किसान सम्मान निधि योजना के तहत किसानों को प्रतिवर्ष 6000 रुपये की आर्थिक सहायता प्रदान की जाती है। सरकार ने ई-नाम पोर्टल के माध्यम से कृषि उत्पादों के ऑनलाइन व्यापार को सुगम बनाया है। जैविक खेती और प्राकृतिक खेती को बढ़ावा देने के लिए भी अनेक योजनाएं चलाई जा रही हैं।"
    },
    {
      id: "hi_cgl_3",
      exam: "SSC CGL",
      title: "बैंकिंग व्यवस्था",
      difficulty: "Hard",
      text: "भारतीय बैंकिंग प्रणाली देश की अर्थव्यवस्था की रीढ़ है। भारतीय रिजर्व बैंक देश का केंद्रीय बैंक है जो मौद्रिक नीति का निर्धारण करता है और बैंकिंग क्षेत्र का नियमन करता है। 1969 और 1980 में प्रमुख वाणिज्यिक बैंकों के राष्ट्रीयकरण ने बैंकिंग सेवाओं को आम जनता तक पहुंचाने में महत्वपूर्ण भूमिका निभाई। जन धन योजना के तहत करोड़ों लोगों के बैंक खाते खोले गए जिससे वित्तीय समावेशन को बल मिला। डिजिटल बैंकिंग, मोबाइल बैंकिंग और यूपीआई जैसी तकनीकों ने भारतीय बैंकिंग क्षेत्र में क्रांतिकारी परिवर्तन लाए हैं। नई निजी बैंकों और लघु वित्त बैंकों की स्थापना से प्रतिस्पर्धा बढ़ी है और ग्राहकों को बेहतर सेवाएं मिल रही हैं।"
    },
    {
      id: "hi_ntpc_3",
      exam: "Railway NTPC",
      title: "भारतीय विज्ञान",
      difficulty: "Easy",
      text: "भारत ने विज्ञान और प्रौद्योगिकी के क्षेत्र में उल्लेखनीय प्रगति की है। भारतीय अंतरिक्ष अनुसंधान संगठन इसरो ने अंतरिक्ष अनुसंधान में विश्व स्तर पर अपनी पहचान बनाई है। चंद्रयान मिशन और मंगलयान मिशन की सफलता ने भारत को अंतरिक्ष विज्ञान में अग्रणी देशों की श्रेणी में ला दिया है। भारत परमाणु ऊर्जा, जैव प्रौद्योगिकी, सूचना प्रौद्योगिकी और दवा निर्माण के क्षेत्रों में भी अग्रणी है। भारत विश्व की फार्मेसी के रूप में जाना जाता है क्योंकि यह विश्व में सबसे अधिक जेनेरिक दवाओं का उत्पादन और निर्यात करता है। वैज्ञानिक अनुसंधान के लिए सरकार ने अनेक संस्थानों और प्रयोगशालाओं की स्थापना की है।"
    }
  ]
};

// Exam configurations
const EXAM_CONFIG = {
  "SSC CGL": {
    name: "SSC CGL (DEST)",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    duration: 15,
    requirement: "8,000 KDPH (Key Depressions Per Hour)",
    minKDPH: 8000,
    description: "Data Entry Speed Test — 15 Minutes",
    icon: "📋"
  },
  "SSC CHSL": {
    name: "SSC CHSL",
    fullName: "Staff Selection Commission - Combined Higher Secondary Level",
    duration: 10,
    requirement: "35 WPM (English) / 30 WPM (Hindi)",
    minWPMEnglish: 35,
    minWPMHindi: 30,
    description: "Typing Skill Test — 10 Minutes",
    icon: "📝"
  },
  "Railway NTPC": {
    name: "Railway NTPC",
    fullName: "Railway Recruitment Board - Non Technical Popular Categories",
    duration: 10,
    requirement: "30 WPM (English) / 25 WPM (Hindi)",
    minWPMEnglish: 30,
    minWPMHindi: 25,
    description: "Typing Skill Test — 10 Minutes",
    icon: "🚂"
  },
  "Custom": {
    name: "Custom Practice",
    fullName: "Free Practice Mode",
    duration: 5,
    requirement: "No minimum — Just practice!",
    description: "Practice at your own pace",
    icon: "⚡"
  }
};
