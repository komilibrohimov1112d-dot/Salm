export interface NewsArticle {
  id: string;
  category: 'Tadbirlar' | 'Yutuqlar' | "E'lonlar";
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  paragraphs: string[];
}

export interface BookYouTubeEntry {
  id: string;
  keyword: string;
  title: string;
  author: string;
  genre: string;
  gradeLevel: string;
  summary: string;
  highlights: string[];
  youtubeQuery: string;
  videos: {
    title: string;
    channel: string;
    duration: string;
    query: string;
  }[];
}

export const SCHOOL_IMAGES = {
  heroCampus: '/src/assets/images/hero_school_71_1795239533288.jpg',
  library: '/src/assets/images/school_library_study_1795239514129.jpg',
  scienceLab: '/src/assets/images/news_science_olympiad_1795239514070.jpg',
  culturalEvent: '/src/assets/images/news_cultural_event_1795239512824.jpg',
  itClassroom: '/src/assets/images/school_it_classroom_1795239978631.jpg',
  sportsComplex: '/src/assets/images/school_sports_complex_1795239978422.jpg',
  booksShowcase: '/src/assets/images/youtube_books_showcase_1795239979346.jpg',
};

export const HERO_SLIDES = [
  {
    image: SCHOOL_IMAGES.heroCampus,
    alt: "Namangan shahridagi Suv xo'jaligi maktabining bosh binosi va hovlisi",
    kicker: "Namangan shahri · Suv xo'jaligi hududi",
    caption: "Maktab bosh binosi va ko'kalamzorlashtirilgan hovli",
  },
  {
    image: SCHOOL_IMAGES.library,
    alt: "Namangan shahridagi Suv xo'jaligi maktabi kutubxonasi",
    kicker: 'Axborot-resurs markazi · 18 500+ kitob fondi',
    caption: "Yorug' va zamonaviy kutubxona hamda mutolaa zali",
  },
  {
    image: SCHOOL_IMAGES.itClassroom,
    alt: "Axborot texnologiyalari va dasturlash sinfxonasi",
    kicker: 'Raqamli ta’lim · Informatika va IT',
    caption: 'Zamonaviy kompyuter sinfi va dasturlash mashg‘ulotlari',
  },
  {
    image: SCHOOL_IMAGES.scienceLab,
    alt: 'STEM va tabiiy fanlar laboratoriyasi',
    kicker: 'Amaliy fanlar · Fizika, kimyo va biologiya',
    caption: 'Laboratoriya jihozlari bilan ta’minlangan o‘quv xonasi',
  },
  {
    image: SCHOOL_IMAGES.sportsComplex,
    alt: 'Maktabning yopiq sport majmuasi',
    kicker: 'Sog‘lom avlod · Sport va jismoniy tarbiya',
    caption: 'Basketbol va voleybol mashg‘ulotlari uchun yopiq sport zali',
  },
];

export const CAMPUS_GALLERY = [
  {
    title: 'Zamonaviy kutubxona va mutolaa zali',
    caption: '18 500 dan ortiq darslik va badiiy asarlar jamg‘armasi',
    image: '/src/assets/images/school_library_study_1795239514129.jpg',
    alt: "Namangan shahridagi Suv xo'jaligi maktabining keng kutubxonasi",
  },
  {
    title: 'Axborot texnologiyalari va dasturlash xonasi',
    caption: 'Yuqori tezlikdagi internet va zamonaviy kompyuter sinflari',
    image: '/src/assets/images/school_it_classroom_1795239978631.jpg',
    alt: 'Informatika va dasturlash sinfxonasi',
  },
  {
    title: 'STEM va tabiiy fanlar laboratoriyasi',
    caption: 'Fizika, kimyo va biologiya fanlaridan amaliy tajriba mashg‘ulotlari',
    image: '/src/assets/images/news_science_olympiad_1795239514070.jpg',
    alt: 'Tabiiy fanlar laboratoriyasi',
  },
  {
    title: 'Yopiq sport majmuasi',
    caption: 'Basketbol, voleybol va jismoniy tarbiya mashg‘ulotlari zali',
    image: '/src/assets/images/school_sports_complex_1795239978422.jpg',
    alt: 'Maktabning zamonaviy sport zali',
  },
];

export const SCHOOL_STATS = [
  { value: '1 420', label: "O'quvchilar soni", note: '1–11-sinflar kesimida' },
  { value: '84', label: 'Tajribali pedagoglar', note: 'Oliy va birinchi toifali' },
  { value: '18', label: "Fan va sport to'garaklari", note: 'Darsdan tashqari mashg‘ulotlar' },
  { value: '94%', label: 'OTMga kirish natijasi', note: '2025–2026 o‘quv yili' },
];

export const ACADEMIC_DIRECTIONS = [
  {
    index: '01.',
    title: 'Aniq fanlar va axborot texnologiyalari',
    description:
      "Matematika, fizika va informatika fanlari chuqurlashtirilgan dastur asosida o'qitiladi. Zamonaviy kompyuter sinflarida dasturlash asoslari, algoritmlash va robototexnika mashg'ulotlari olib boriladi.",
  },
  {
    index: '02.',
    title: 'Xorijiy tillar va ona tili adabiyoti',
    description:
      "Ingliz, rus va nemis tillari amaliy muloqot uslubida o'rgatiladi. O'zbek va jahon adabiyoti bo'yicha mutolaa klublari o'quvchilarning nutq madaniyati va tanqidiy fikrlashini rivojlantiradi.",
  },
  {
    index: '03.',
    title: 'Tabiiy fanlar va laboratoriya amaliyoti',
    description:
      "Kimyo, biologiya va geografiya darslari jihozlangan amaliy laboratoriyalarda o'tkaziladi. O'quvchilar mikroskopiya, tajribalar va ekologik loyihalarda bevosita ishtirok etadilar.",
  },
  {
    index: '04.',
    title: "Sport, san'at va ma'naviy tarbiya",
    description:
      "Maktabimizda shaxmat, voleybol, basketbol, tasviriy san'at va musiqa to'garaklari muntazam faoliyat yuritadi. Har oyda madaniy kechalar va kitobxonlik tanlovlari tashkil etiladi.",
  },
];

export const SCHOOL_FACILITIES = [
  {
    title: 'Axborot-resurs markazi (Kutubxona)',
    detail: "18 500 dan ortiq darslik, badiiy asar va elektron qo'llanmalar fondi.",
  },
  {
    title: 'Zamonaviy STEM laboratoriyalari',
    detail: 'Fizika, kimyo va biologiya fanlari uchun xavfsiz amaliy tajriba xonalari.',
  },
  {
    title: 'Ikki qavatli sport majmuasi',
    detail: "Qishki yopiq sport zali, ochiq mini-futbol maydoni va yengil atletika yo'lagi.",
  },
  {
    title: '240 o‘rinli faollar zali',
    detail: 'Adabiy uchrashuvlar, fan olimpiadalari taqdirlash marosimlari va konferensiyalar uchun.',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'fan-olimpiadasi-2026',
    category: 'Yutuqlar',
    date: '18-noyabr, 2026',
    readTime: "3 daqiqa o'qish",
    title: "71-maktab o'quvchilari shahar fan olimpiadasida 6 ta sovrinli o'rinni qo'lga kiritdi",
    excerpt:
      "Matematika, fizika va informatika yo'nalishlarida yuqori sinf o'quvchilarimiz tuman va shahar bosqichlarida munosib ishtirok etib, faxrli o'rinlarga sazovor bo'ldilar.",
    image: SCHOOL_IMAGES.scienceLab,
    imageAlt: "71-maktab tabiiy fanlar va robototexnika laboratoriyasidagi o'quvchilar",
    featured: true,
    paragraphs: [
      "Joriy yilning noyabr oyida bo'lib o'tgan umumta'lim fanlari bo'yicha shahar olimpiadasida 71-sonli maktabning 10- va 11-sinf o'quvchilari yuqori natijalarni qayd etdilar.",
      "Matematika fanidan 11-«A» sinf o'quvchisi Sardorbek Karimov 1-o'rinni, fizika fanidan 10-«B» sinf o'quvchisi Madina Rustamova 2-o'rinni hamda informatika va axborot texnologiyalari yo'nalishida Javohir Alimov faxrli 1-o'rinni egalladi.",
      "O'quvchilarni musobaqaga tayyorlashda fidokorona mehnat qilgan ustozlarimizga va ota-onalarga maktab ma'muriyati nomidan chuqur minnatdorchilik bildiramiz. Keyingi respublika bosqichida jamoamizga omad tilaymiz.",
    ],
  },
  {
    id: 'kitobxonlik-haftaligi',
    category: 'Tadbirlar',
    date: '12-noyabr, 2026',
    readTime: "2 daqiqa o'qish",
    title: "«Zukko kitobxon» adabiy kechasi va kitob ko'rgazmasi bo'lib o'tdi",
    excerpt:
      "Maktabimiz faollar zalida o'zbek va jahon adabiyoti durdonalariga bag'ishlangan ochiq mutolaa kechasi hamda kitobxon o'quvchilar taqdirlash marosimi o'tkazildi.",
    image: SCHOOL_IMAGES.culturalEvent,
    imageAlt: "71-maktab faollar zalidagi adabiyot va kitobxonlik tadbiri",
    paragraphs: [
      "Maktab kutubxonasi va ona tili adabiyoti kafedrasi hamkorligida o'tkazilgan «Zukko kitobxon» haftaligi doirasida 5–11-sinf o'quvchilari o'rtasida badiiy asarlar muhokamasi tashkil etildi.",
      "Tadbir davomida Abdulla Qodiriy, Oybek, Cho'lpon hamda jahon klassik yozuvchilarining asarlari yuzasidan sahna ko'rinishlari namoyish etildi va eng faol kitobxonlarga esdalik sovg'alari topshirildi.",
    ],
  },
  {
    id: 'kutubxona-yangi-fond',
    category: "E'lonlar",
    date: '5-noyabr, 2026',
    readTime: "2 daqiqa o'qish",
    title: "Maktab kutubxonasi 450 ta yangi badiiy va ilmiy-ommabop kitob bilan boyitildi",
    excerpt:
      "O'quvchilar uchun darsliklardan tashqari zamonaviy ensiklopediyalar, ingliz tilidagi o'qish kitoblari va o'zbek adabiyoti to'plamlari foydalanishga topshirildi.",
    image: SCHOOL_IMAGES.library,
    imageAlt: "71-maktabning yangi kitoblar bilan boyitilgan zamonaviy kutubxonasi",
    paragraphs: [
      "71-maktab axborot-resurs markazi yangi o'quv choragi oldidan 450 nusxadagi zamonaviy adabiyotlar bilan to'ldirildi. Yangi kitoblar qatorida fizika va matematika bo'yicha olimpiada to'plamlari, shuningdek, bolalar va o'smirlar adabiyoti mavjud.",
      "Kutubxona dushanbadan shanbagacha soat 08:30 dan 17:00 gacha barcha o'quvchilar va o'qituvchilar uchun ochiq.",
    ],
  },
  {
    id: 'qishki-qabul-maslahat',
    category: "E'lonlar",
    date: '29-oktabr, 2026',
    readTime: "2 daqiqa o'qish",
    title: "Ota-onalar uchun ochiq eshiklar kuni va maslahat soatlari jadvali",
    excerpt:
      "Har shanba kuni soat 10:00 dan 13:00 gacha sinf rahbarlari va fan o'qituvchilari ota-onalar bilan o'quvchilar o'zlashtirishi yuzasidan uchrashuvlar o'tkazadilar.",
    image: SCHOOL_IMAGES.heroCampus,
    imageAlt: "71-maktab binosi va hovlisi",
    paragraphs: [
      "Ota-onalar va maktab o'rtasidagi hamkorlikni mustahkamlash maqsadida har hafta shanba kuni ochiq muloqot soatlari belgilandi.",
      "Uchrashuvlar davomida farzandingizning choraklik o'zlashtirishi, dars jadvali hamda qo'shimcha to'garaklarga qatnashishi bo'yicha batafsil ma'lumot olishingiz mumkin.",
    ],
  },
];

export const BOOK_YOUTUBE_CATALOG: BookYouTubeEntry[] = [
  {
    id: 'kitob',
    keyword: 'kitob',
    title: "Kitob — bilim manbai va mutolaa madaniyati",
    author: "O'zbek va jahon adabiyoti to'plami",
    genre: "Ta'lim, badiiy adabiyot va audiokitoblar",
    gradeLevel: '1–11-sinflar uchun tavsiya etiladi',
    summary:
      "Kitob o'qish inson tafakkurini kengaytiradi, so'z boyligini oshiradi va mustaqil fikrlash qobiliyatini shakllantiradi. 71-maktab kutubxonasida darsliklar bilan bir qatorda o'zbek mumtoz adabiyoti, zamonaviy qissalar, ilmiy-ommabop qo'llanmalar hamda YouTube platformasida ko'rish mumkin bo'lgan audiokitoblar va video tahlillar jamlangan.",
    highlights: [
      "Maktab dasturidagi asosiy badiiy asarlarning qisqacha mazmuni va tahlili",
      "Tez va samarali kitob o'qish usullari bo'yicha video darsliklar",
      "YouTube orqali o'zbek tilidagi audiokitoblar va adabiy ma'ruzalarni tinglash imkoniyati",
    ],
    youtubeQuery: 'kitob haqida malumot audiokitob uzbek',
    videos: [
      {
        title: "Kitob o'qishning foydalari va to'g'ri mutolaa qilish sirlari",
        channel: 'Ta’lim va Mutolaa YouTube',
        duration: '14:20',
        query: 'kitob oqish foydalari haqida malumot',
      },
      {
        title: "Maktab o'quvchilari o'qishi shart bo'lgan eng sara kitoblar ro'yxati",
        channel: 'Kitobxonlar Klubi',
        duration: '11:45',
        query: 'eng yaxshi kitoblar haqida malumot uzbek tilida',
      },
      {
        title: "O'zbek adabiyoti durdonalari — audiokitoblar to'plami",
        channel: 'Audiokitob UZ',
        duration: '42:10',
        query: 'ozbek adabiyoti audiokitoblar',
      },
    ],
  },
  {
    id: 'otkan-kunlar',
    keyword: "o'tkan kunlar",
    title: "O'tkan kunlar",
    author: 'Abdulla Qodiriy',
    genre: 'Tarixiy roman · O‘zbek romanchiligi maktabi',
    gradeLevel: '8–11-sinf adabiyot dasturi',
    summary:
      "O'zbek adabiyotining ilk yirik tarixiy romani bo'lib, XIX asr o'rtalaridagi Turkiston hayoti, Otabek va Kumush muhabbati hamda jamiyatdagi ijtimoiy ziddiyatlarni chuqur badiiy mahorat bilan tasvirlaydi.",
    highlights: [
      'Asarning asosiy g‘oyasi: milliy uyg‘onish, adolat va insoniy sadoqat',
      'Bosh qahramonlar: Otabek, Kumushbibi, Yusufbek hoji, O‘zbek oyim',
      'YouTube platformasida to‘liq audiokitob va maktab dars tahlillari mavjud',
    ],
    youtubeQuery: "O'tkan kunlar kitob haqida audiokitob",
    videos: [
      {
        title: "«O'tkan kunlar» romani to'liq tahlili va qahramonlar tavsifi",
        channel: 'Adabiyot Darslari',
        duration: '18:35',
        query: "O'tkan kunlar asari tahlili",
      },
      {
        title: "Abdulla Qodiriy — «O'tkan kunlar» (Audiokitob, 1-qism)",
        channel: 'Oltin Fond Audiokitob',
        duration: '54:12',
        query: "O'tkan kunlar audiokitob",
      },
    ],
  },
  {
    id: 'alisher-navoiy',
    keyword: 'alisher navoiy',
    title: 'Xamsa va G‘azallar kulliyoti',
    author: 'Alisher Navoiy',
    genre: 'Mumtoz she’riyat va dostonchilik',
    gradeLevel: '7–11-sinf adabiyot dasturi',
    summary:
      "Buyuk mutafakkir Alisher Navoiyning «Xamsa» beshligi («Hayrat ul-abror», «Farhod va Shirin», «Layli va Majnun», «Sab'ai sayyor», «Saddi Iskandariy») insonparvarlik, ilm-ma'rifat va pok axloq g'oyalarini tarannum etadi.",
    highlights: [
      '«Xamsa» dostonlarining tarixiy ahamiyati va badiiy tuzilishi',
      'G‘azal va ruboiylarning ma’naviy mazmuni hamda lug‘at izohlari',
      'Olimpiada savollari uchun video sharhlar',
    ],
    youtubeQuery: 'Alisher Navoiy kitoblari haqida malumot',
    videos: [
      {
        title: "Alisher Navoiy «Xamsa» asari haqida batafsil video ma'ruza",
        channel: 'Mumtoz Adabiyot',
        duration: '22:15',
        query: 'Alisher Navoiy Xamsa haqida',
      },
      {
        title: 'Navoiy g‘azallari sharhi — maktab o‘quvchilari uchun',
        channel: 'Ona tili va Adabiyot',
        duration: '15:40',
        query: 'Alisher Navoiy gazallari sharhi',
      },
    ],
  },
  {
    id: 'sariq-devni-minib',
    keyword: 'sariq devni minib',
    title: 'Sariq devni minib',
    author: "Xudoyberdi To'xtaboyev",
    genre: 'Bolalar va o‘smirlar sarguzasht romani',
    gradeLevel: '5–8-sinf o‘quvchilari uchun',
    summary:
      "Hoshimjon ismli qiziquvchan maktab o'quvchisining sehrli qalpoqcha topib olishi va uning boshidan kechirgan ajoyib sarguzashtlari orqali mehnatsevarlik, halollik va bilim olishning qadri haqida hikoya qiluvchi mashhur asar.",
    highlights: [
      "O'smirlar uchun qiziqarli va yengil mutolaa uslubi",
      'Hazil-mutoyiba va tarbiyaviy xulosalarning uyg‘unligi',
      'YouTube’da audiokitob va video hikoya shaklida tinglash mumkin',
    ],
    youtubeQuery: 'Sariq devni minib kitob audiokitob',
    videos: [
      {
        title: '«Sariq devni minib» — asar mazmuni va qiziqarli tahlil',
        channel: 'Bolalar Kutubxonasi',
        duration: '12:50',
        query: 'Sariq devni minib asari haqida',
      },
      {
        title: 'Xudoyberdi To‘xtaboyev — Sariq devni minib (Audiokitob)',
        channel: 'Audiokitob UZ',
        duration: '38:20',
        query: 'Sariq devni minib audiokitob',
      },
    ],
  },
  {
    id: 'matematika',
    keyword: 'matematika',
    title: 'Matematika va mantiqiy masalalar to‘plami',
    author: '71-Maktab aniq fanlar kafedrasi tavsiyasi',
    genre: "O'quv qo'llanma va olimpiada tayyorgarligi",
    gradeLevel: '5–11-sinflar uchun',
    summary:
      "Algebra, geometriya va mantiqiy fikrlashni rivojlantiruvchi masalalar to'plami hamda mavzulashtirilgan YouTube video darslari. Har bir mavzu misollar yechimi bilan tushuntirilgan.",
    highlights: [
      'Tenglamalar, funksiyalar va geometrik teoremalar isboti',
      'Olimpiada darajasidagi nostandart masalalar yechimlari',
      'Video darsliklarni YouTube orqali bepul tomosha qilish',
    ],
    youtubeQuery: 'matematika darslari kitob masalalar yechimi uzbek',
    videos: [
      {
        title: 'Matematikadan asosiy formulalar va masalalar yechish usullari',
        channel: 'Aniq Fanlar Akademiyasi',
        duration: '26:10',
        query: 'matematika video darslar uzbek tilida',
      },
      {
        title: 'Geometriya masalalarini oson yechish texnikasi',
        channel: '71-Maktab Tavsiyasi',
        duration: '19:05',
        query: 'geometriya darslari uzbek tilida',
      },
    ],
  },
  {
    id: 'fizika',
    keyword: 'fizika',
    title: 'Fizika asoslari va qiziqarli tajribalar',
    author: 'Umumiy o‘rta ta’lim dasturi asosida',
    genre: 'Tabiiy fanlar darsligi',
    gradeLevel: '6–11-sinflar uchun',
    summary:
      "Mexanika, elektr, optika va molekulyar fizika bo'limlarini hayotiy tajribalar asosida tushuntiruvchi qo'llanma va video laboratoriya darslari.",
    highlights: [
      'Nyuton qonunlari va energiya saqlanishining amaliy misollari',
      'Laboratoriya tajribalari video sharhlari',
      'Formulalar bo‘yicha tezkor takrorlash qo‘llanmasi',
    ],
    youtubeQuery: 'fizika kitob darslari tajribalar uzbek tilida',
    videos: [
      {
        title: 'Fizika darsligi: Mexanika va kinematika asoslari',
        channel: 'Fizika Online UZ',
        duration: '24:40',
        query: 'fizika video darslar uzbek tilida',
      },
      {
        title: 'Maktab laboratoriyasida qiziqarli fizik tajribalar',
        channel: 'Ilm va Tajriba',
        duration: '13:15',
        query: 'qiziqarli fizika tajribalari',
      },
    ],
  },
];

export const RASPISANIYA_DAYS = [
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
] as const;

export const RASPISANIYA_PERIODS = [1, 2, 3, 4, 5, 6] as const;
