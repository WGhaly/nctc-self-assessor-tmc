export const TRL = [
  {
    level: 1,
    label: { en: 'Basic Principle Observed', ar: 'رصد المبدأ الأساسي' },
    criterion: {
      en: "You've identified a scientific principle that could underpin your invention, but haven't yet thought of a specific application for it.",
      ar: 'لقد أدركتَ مبدأ علمياً يمكن أن يكون أساساً لاختراعك، غير أنك لم تُفكّر بعد في تطبيق محدد له.',
    },
    info: {
      en: "At this stage you've noticed something interesting in science — a physical, chemical, or biological behaviour — and think it could eventually be useful. For example, a researcher observes that a certain plant extract inhibits bacterial growth and thinks it could become an antibiotic. No application is designed yet; just the spark of a scientific idea. Most university research begins here.",
      ar: 'في هذه المرحلة، لاحظتَ ظاهرة علمية مثيرة وتعتقد أنها قد تكون مفيدة في المستقبل. مثال: يلاحظ باحث أن مستخلصاً نباتياً يمنع نمو البكتيريا ويفكر في تطويره كمضاد حيوي. لا يوجد تطبيق مصمم بعد — فقط شرارة الفكرة العلمية. تبدأ معظم أبحاث الجامعات من هنا.',
    },
  },
  {
    level: 2,
    label: { en: 'Concept Formulated', ar: 'صياغة المفهوم' },
    criterion: {
      en: "You've identified a potential application for that principle, but haven't run any experiments to test it yet.",
      ar: 'لقد تعرّفتَ على تطبيق محتمل لذلك المبدأ، لكنك لم تُجرِ أي تجارب للتحقق منه بعد.',
    },
    info: {
      en: "You've moved from observation to idea. You now have a specific application in mind — such as 'I want to use this extract to create an antibacterial surface coating for hospitals.' But no lab tests have been done yet. This stage involves literature reviews and theoretical modelling to check that the idea makes scientific sense.",
      ar: 'انتقلتَ من الملاحظة إلى الفكرة. لديك تطبيق محدد في ذهنك، لكنك لم تختبره في المختبر بعد. تتضمن هذه المرحلة مراجعة الأدبيات العلمية والنمذجة النظرية للتحقق من منطقية الفكرة.',
    },
  },
  {
    level: 3,
    label: { en: 'Proof of Concept', ar: 'إثبات المفهوم' },
    criterion: {
      en: "You've run lab experiments or analytical tests confirming the core idea could work, but the components haven't been integrated or tested together yet.",
      ar: 'أجريتَ تجارب معملية أو اختبارات تحليلية تُؤكد أن الفكرة الجوهرية قابلة للتطبيق، غير أن المكونات لم تُدمَج أو تُختبر معاً بعد.',
    },
    info: {
      en: "You've done lab work to show that the core principle works. Individual components have been tested in isolation. For example, you've proven that your compound inhibits bacteria in a petri dish. But you haven't yet built a complete working device or product — the pieces work, but aren't connected.",
      ar: 'أجريتَ اختبارات معملية لإثبات أن المبدأ الأساسي يعمل. اختُبر كل مكوّن على حدة. مثال: أثبتَّ أن مركبك الكيميائي يمنع البكتيريا في طبق بتري. لكن لم تُبنَ أداة أو منتج كامل بعد.',
    },
  },
  {
    level: 4,
    label: { en: 'Lab Prototype Built and Tested', ar: 'بناء نموذج أولي معملي واختباره' },
    criterion: {
      en: "You've integrated the key components into a basic working prototype and confirmed it functions in a controlled lab — but it's a rough assembly, not yet tested under realistic conditions.",
      ar: 'دمجتَ المكونات الرئيسية في نموذج أولي أساسي وتأكدتَ من أنه يعمل في بيئة معملية محكومة — غير أنه تجميع خام ولم يُختبر في ظروف واقعية بعد.',
    },
    info: {
      en: "You've built a rough first prototype — not polished, not optimised, but it works on the lab bench. All main components are connected and working together for the first time. The prototype hasn't left the controlled lab environment yet.",
      ar: 'بنيتَ نموذجاً أولياً خاماً — غير مصقول لكنه يعمل على طاولة المختبر. جميع المكونات الرئيسية متصلة وتعمل معاً للمرة الأولى. لا يزال في بيئة المختبر المحكومة ولم يُخرج إلى البيئة الحقيقية.',
    },
  },
  {
    level: 5,
    label: { en: 'Lab Prototype Tested in a Realistic Setting', ar: 'اختبار النموذج الأولي في بيئة واقعية' },
    criterion: {
      en: "You've tested that same prototype in conditions that simulate the real-world environment it's intended for — but it's still at component level, not a full system yet.",
      ar: 'اختبرتَ النموذج الأولي في ظروف تحاكي البيئة الحقيقية المقصودة — لكنه لا يزال على مستوى المكونات وليس نظاماً متكاملاً بعد.',
    },
    info: {
      en: "Same prototype from TRL 4, but now tested in conditions designed to resemble the real deployment environment. For a medical device, this might be a simulated hospital ward setting. For an agricultural tool, a greenhouse with field-like conditions. The device hasn't changed — but it's been proven to work beyond the lab bench.",
      ar: 'نفس النموذج من TRL 4، لكن تم اختباره في ظروف تُحاكي بيئة الاستخدام الفعلية. مثال: جهاز طبي في بيئة تشبه جناح المستشفى. النموذج لم يتغيّر — لكن تم إثبات أنه يعمل خارج بيئة المختبر.',
    },
  },
  {
    level: 6,
    label: { en: 'Full Prototype Demonstrated in a Realistic Setting', ar: 'إثبات النموذج الكامل في بيئة واقعية' },
    criterion: {
      en: "You've scaled up to a full representative prototype of the complete system and demonstrated it works in a realistic environment — but not yet in an actual real-world setting.",
      ar: 'وسّعتَ النطاق ليشمل نموذجاً أولياً كاملاً وتمثيلياً للنظام بأكمله، وأثبتَّ أنه يعمل في بيئة واقعية — لكن ليس في بيئة تشغيلية فعلية بعد.',
    },
    info: {
      en: "You've built a full, representative version of the complete system — not just the core component, but everything needed for it to work in the real world. You've demonstrated it in a realistic environment. Unlike TRL 5, this is the full system, not individual components.",
      ar: 'بنيتَ نسخة كاملة تمثيلية من النظام بأكمله — ليس فقط المكون الأساسي. أثبتَّ أنها تعمل في بيئة واقعية. الفرق عن TRL 5: هنا النظام كامل، وليس مجرد مكونات منفصلة.',
    },
  },
  {
    level: 7,
    label: { en: 'Full Prototype Demonstrated in a Real Operational Setting', ar: 'إثبات النموذج الكامل في بيئة تشغيلية حقيقية' },
    criterion: {
      en: "You've demonstrated that full prototype in an actual real-world operational environment — but it's still a prototype, not the final production-ready version.",
      ar: 'أثبتَّ عمل هذا النموذج الأولي الكامل في بيئة تشغيلية حقيقية — لكنه لا يزال نموذجاً أولياً وليس نسخة إنتاجية نهائية.',
    },
    info: {
      en: "Your full prototype has been taken into an actual operational environment — not a simulation, but a real deployment location. For software, a real hospital using it. For hardware, a real factory or field site. It is still a prototype, not the final product — but it works in the real world.",
      ar: 'نموذجك الأولي الكامل تم اختباره في بيئة تشغيلية حقيقية — ليس محاكاة، بل موقع نشر فعلي. لا يزال نموذجاً أولياً، لكنه يعمل في العالم الحقيقي.',
    },
  },
  {
    level: 8,
    label: { en: 'Final System Built and Qualified', ar: 'بناء النظام النهائي وتأهيله' },
    criterion: {
      en: "You've built the final production-ready system and completed all testing and qualification — but it hasn't yet accumulated a track record of sustained real-world operation.",
      ar: 'قمتَ ببناء النظام النهائي الجاهز للإنتاج وأكملتَ جميع الاختبارات والتأهيل — لكنه لم يجمع بعد سجل حافل من التشغيل المستدام في الواقع.',
    },
    info: {
      en: "You've built the final version — the one that will actually be sold or deployed. It has passed all tests, certifications, and quality checks required. The difference from TRL 7: this is the real thing, not a prototype. It just hasn't been running in the field long enough to have an operational track record.",
      ar: 'بنيتَ النسخة النهائية — النسخة التي ستُباع أو تُنشر فعلياً. اجتازتْ جميع الاختبارات والشهادات الرسمية. الفرق عن TRL 7: هذه النسخة الحقيقية وليست نموذجاً أولياً. لكنها لم تُشغَّل في الميدان لفترة كافية لإثبات موثوقيتها التاريخية.',
    },
  },
  {
    level: 9,
    label: { en: 'System Proven in Real-World Operation', ar: 'إثبات النظام في التشغيل الفعلي' },
    criterion: {
      en: "Your final system has been deployed and proven to work reliably under actual operating conditions over time.",
      ar: 'تم نشر نظامك النهائي وأثبتَ كفاءته وموثوقيته تحت ظروف التشغيل الفعلية على مدار الزمن.',
    },
    info: {
      en: "Your final system has been operating in the real world and proven it works reliably. You have a track record — data showing it performs as expected over an extended period. This is the highest level of technology maturity.",
      ar: 'نظامك النهائي يعمل في الواقع ويُثبت موثوقيته على مدار الزمن. لديك سجل بيانات يُثبت أداءه المستمر. هذا أعلى مستوى من النضج التكنولوجي.',
    },
  },
];

export const MRL = [
  {
    level: 1,
    label: { en: 'Manufacturing Awareness', ar: 'الوعي بالتصنيع' },
    criterion: {
      en: "You've started exploring what it would generally take to manufacture something like your invention — but no specific concepts or plans exist yet.",
      ar: 'بدأتَ في استكشاف ما يلزم بشكل عام لتصنيع شيء مثل اختراعك — لكن لا توجد مفاهيم أو خطط محددة بعد.',
    },
    info: {
      en: "You're asking the basic question: 'Could something like this be manufactured?' There are no specific plans, equipment lists, or process designs yet — just a general awareness that manufacturing will eventually need to happen. Most inventors reach this level naturally when they first imagine their invention at scale.",
      ar: 'أنتَ تطرح السؤال الأساسي: "هل يمكن تصنيع شيء كهذا؟" لا توجد خطط أو قوائم معدات أو تصاميم عمليات محددة بعد — فقط إدراك عام بأن التصنيع سيكون ضرورياً في النهاية.',
    },
  },
  {
    level: 2,
    label: { en: 'Manufacturing Concepts Identified', ar: 'تحديد مفاهيم التصنيع' },
    criterion: {
      en: "You've identified initial ideas for materials, processes, and suppliers — but no assessment of feasibility or cost has been done yet.",
      ar: 'حددتَ أفكاراً أولية عن المواد والعمليات والموردين — لكن لم يُجرَ أي تقييم للجدوى أو التكلفة بعد.',
    },
    info: {
      en: "You've started thinking specifically about how your invention would be made. Initial ideas about raw materials, basic production processes, and potential suppliers exist on paper or in your head. These are rough ideas — nothing has been tested or costed yet. Think of this as your first manufacturing brainstorm.",
      ar: 'بدأتَ في التفكير بشكل محدد حول كيفية تصنيع اختراعك. لديك أفكار أولية عن المواد الخام والعمليات الأساسية والموردين المحتملين. هذه مجرد أفكار خام — لم يُختبر أو يُكلَّف أي شيء بعد.',
    },
  },
  {
    level: 3,
    label: { en: 'Manufacturing Feasibility Assessed', ar: 'تقييم جدوى التصنيع' },
    criterion: {
      en: "You've done a first assessment of whether your invention can actually be manufactured — but no risks have been formally identified or documented yet.",
      ar: 'أجريتَ تقييماً أولياً لما إذا كان اختراعك قابلاً للتصنيع فعلاً — لكن لم تُحدَّد المخاطر أو توثَّق رسمياً بعد.',
    },
    info: {
      en: "You've done a structured first assessment of manufacturability — looking at your invention and asking: can it actually be made? You understand the basic process steps, rough cost categories, and main technical challenges. But you haven't formally written down risks or what could go wrong in production.",
      ar: 'أجريتَ تقييماً منظماً لقابلية التصنيع — سؤالاً: هل يمكن صنع هذا فعلاً؟ تفهم الخطوات الأساسية والتكاليف التقريبية والتحديات التقنية الرئيسية. لكن لم توثّق رسمياً المخاطر أو ما قد يسوء في الإنتاج.',
    },
  },
  {
    level: 4,
    label: { en: 'Manufacturing Risks Identified', ar: 'تحديد مخاطر التصنيع' },
    criterion: {
      en: "You've identified and documented the key manufacturing risks with mitigation plans — but haven't tested any materials or processes in a realistic setting yet.",
      ar: 'حددتَ مخاطر التصنيع الرئيسية ووثّقتَها مع خطط للتخفيف منها — لكن لم تختبر أي مواد أو عمليات في بيئة واقعية بعد.',
    },
    info: {
      en: "You've formally documented key manufacturing risks — things that could prevent your invention from being made at scale or at an acceptable cost — and identified mitigation strategies for each. For example: 'The rare metal we need has supply chain risk → mitigation: identify three alternative suppliers.' But no actual material or process testing has happened yet.",
      ar: 'وثّقتَ رسمياً مخاطر التصنيع الرئيسية واستراتيجيات التخفيف منها. مثال: "المعدن النادر الذي نحتاجه لديه خطر في سلسلة التوريد → التخفيف: تحديد ثلاثة موردين بديلين." لكن لم يحدث أي اختبار فعلي للمواد أو العمليات بعد.',
    },
  },
  {
    level: 5,
    label: { en: 'Component Testing with Production Materials', ar: 'اختبار المكونات بمواد الإنتاج' },
    criterion: {
      en: "You've tested individual components using production materials — but you're still figuring out the processes.",
      ar: 'اختبرتَ المكونات الفردية باستخدام مواد الإنتاج الفعلية — لكنك لا تزال تعمل على تحديد العمليات المناسبة.',
    },
    info: {
      en: "You've actually tested individual parts of your invention using the real production materials, not lab substitutes. For example, if your invention uses a specific polymer, you've tested how that polymer behaves when processed. You're still exploring which manufacturing processes to use, but you're working with the real thing.",
      ar: 'اختبرتَ فعلياً أجزاء منفردة من اختراعك باستخدام مواد الإنتاج الحقيقية، وليس بدائل معملية. لا تزال تستكشف العمليات المناسبة للتصنيع، لكنك تعمل مع المواد الحقيقية.',
    },
  },
  {
    level: 6,
    label: { en: 'Subsystem Processes Defined and Tested', ar: 'تحديد عمليات الأنظمة الفرعية واختبارها' },
    criterion: {
      en: "You've defined most processes and tested at subsystem level — but haven't proven them in a realistic production setting yet.",
      ar: 'حددتَ معظم العمليات واختبرتَ على مستوى الأنظمة الفرعية — لكن لم تُثبت جدواها في بيئة إنتاج واقعية بعد.',
    },
    info: {
      en: "Most of your manufacturing processes are defined on paper and have been tested at the subsystem level in a lab or workshop. You know what machines are needed, what tolerances are required, and what quality checks are needed at each step. But you haven't run these processes in a real factory or production-representative environment.",
      ar: 'معظم عملياتك التصنيعية محددة على الورق وتم اختبارها على مستوى الأنظمة الفرعية في مختبر أو ورشة عمل. تعرف الآن المعدات والتفاوتات ومعايير الجودة المطلوبة. لكن لم تُشغَّل هذه العمليات في بيئة مصنع حقيقي بعد.',
    },
  },
  {
    level: 7,
    label: { en: 'Processes Demonstrated in Production Environment', ar: 'إثبات العمليات في بيئة إنتاج تمثيلية' },
    criterion: {
      en: "You've fully demonstrated those processes in a production-representative environment — but no production line exists yet.",
      ar: 'أثبتَّ هذه العمليات بالكامل في بيئة تمثيلية للإنتاج — لكن لا يوجد خط إنتاج فعلي بعد.',
    },
    info: {
      en: "Your manufacturing processes have been fully demonstrated in a production-representative environment — a facility designed to simulate a real factory, like a pilot facility or advanced workshop. You can prove the process works. But there's no actual production line built yet; this was a demonstration, not a real manufacturing operation.",
      ar: 'تم إثبات عملياتك التصنيعية بالكامل في بيئة تمثيلية للإنتاج — مثل منشأة تجريبية أو ورشة متقدمة. يمكنك إثبات أن العملية تعمل. لكن لا يوجد خط إنتاج فعلي بعد.',
    },
  },
  {
    level: 8,
    label: { en: 'Pilot Production Line Validated', ar: 'التحقق من خط الإنتاج التجريبي' },
    criterion: {
      en: "A complete pilot production line has been built, run, and validated end-to-end.",
      ar: 'تم بناء خط إنتاج تجريبي كامل وتشغيله والتحقق منه بشكل متكامل من البداية إلى النهاية.',
    },
    info: {
      en: "A complete pilot production line has been built, operated, and validated. Real machines, real operators, real production flow — all running end-to-end and producing your invention at small scale. Quality targets, cycle times, and costs have been measured. This is the last step before full-rate production.",
      ar: 'تم بناء خط إنتاج تجريبي كامل وتشغيله والتحقق منه. آلات حقيقية، مشغّلون حقيقيون، تدفق إنتاج حقيقي — كل شيء يعمل من البداية للنهاية وينتج وحدات فعلية بكميات صغيرة. هذه المرحلة الأخيرة قبل الإنتاج بالمعدل الكامل.',
    },
  },
  {
    level: 9,
    label: { en: 'Low-Rate Production Active', ar: 'الإنتاج بمعدل منخفض جارٍ' },
    criterion: {
      en: "Your invention is now in active low-rate production and consistently meeting quality and cost targets.",
      ar: 'اختراعك الآن في مرحلة الإنتاج بمعدل منخفض ويلبي أهداف الجودة والتكلفة باستمرار.',
    },
    info: {
      en: "Your invention is being manufactured in real units in small quantities and consistently meeting quality and cost targets. The production line is operational. There may still be room for optimisation, but the process works and delivers.",
      ar: 'اختراعك يُصنَّع في وحدات حقيقية بكميات صغيرة ويلبي أهداف الجودة والتكلفة باستمرار. خط الإنتاج يعمل. قد لا يزال هناك مجال للتحسين، لكن العملية فعّالة ومنتجة.',
    },
  },
  {
    level: 10,
    label: { en: 'Full-Rate Production', ar: 'الإنتاج بالمعدل الكامل' },
    criterion: {
      en: "Your invention is in full-rate production and the focus has shifted to continuous improvement.",
      ar: 'اختراعك في مرحلة الإنتاج بالمعدل الكامل وقد انتقل التركيز إلى التحسين المستمر.',
    },
    info: {
      en: "You're manufacturing at the volume your market requires. The focus has shifted from 'can we make it?' to 'how do we make it better, faster, and cheaper?' Continuous improvement principles — lean manufacturing, Six Sigma — are now the priority.",
      ar: 'التصنيع يجري بالحجم الذي يتطلبه السوق. انتقل التركيز من "هل يمكن صنعه؟" إلى "كيف نصنعه بشكل أفضل وأسرع وأرخص؟" مبادئ التحسين المستمر كالتصنيع الرشيق وسيكس سيجما باتت هي الأولوية.',
    },
  },
];

export const CRL = [
  {
    level: 1,
    label: { en: 'Problem & Concept Identified', ar: 'تحديد المشكلة والمفهوم' },
    criterion: {
      en: "You have identified a problem and thought of a unique solution. No specific plans or drawings exist yet.",
      ar: 'حددتَ مشكلة وفكّرتَ في حل فريد لها. لا توجد خطط أو رسومات محددة بعد.',
    },
    info: {
      en: "You've identified a real problem that people face, and you've thought of a unique way to solve it. At this stage there are no concrete plans, business models, diagrams, or prototypes — just the idea and the problem it solves. This is the starting point of your commercialisation journey.",
      ar: 'حددتَ مشكلة حقيقية يعاني منها الناس، وفكّرتَ في طريقة فريدة لحلها. في هذه المرحلة لا توجد خطط أو نماذج أعمال أو رسومات أو نماذج أولية ملموسة — فقط الفكرة والمشكلة التي تحلها. هذه هي نقطة البداية في رحلة التسويق.',
    },
  },
  {
    level: 2,
    label: { en: 'Market & Environment Scanned', ar: 'دراسة السوق والبيئة' },
    criterion: {
      en: "You have looked at the market, rules, and operating environment. You have identified possible applications and competitors. You also have a rough idea of how to make money and what value you offer.",
      ar: 'درستَ السوق والأنظمة والبيئة التشغيلية. حددتَ التطبيقات المحتملة والمنافسين. لديك فكرة تقريبية عن كيفية تحقيق الدخل وعن القيمة التي تقدمها.',
    },
    info: {
      en: "You've done preliminary market research. You understand the general environment your invention will operate in: who the competitors are, what regulations might apply, and what applications it could be used for. You have an early idea of how money could be made — such as direct sales, licensing, or a service model. Nothing has been validated with real customers yet.",
      ar: 'أجريتَ بحثاً تمهيدياً للسوق. تفهم البيئة العامة التي سيعمل فيها اختراعك: المنافسون، اللوائح المحتملة، التطبيقات الممكنة. لديك فكرة مبدئية عن كيفية تحقيق الدخل. لكن لم يُتحقَّق من أي شيء مع عملاء حقيقيين بعد.',
    },
  },
  {
    level: 3,
    label: { en: 'Customer Validation & Business Case', ar: 'تحقق العملاء وبناء الحالة التجارية' },
    criterion: {
      en: "You have talked to real customers and done a detailed survey. You have evidence that your business case makes sense. You understand the value chain, competing products, and target applications well.",
      ar: 'تحدثتَ مع عملاء حقيقيين وأجريتَ مسحاً مفصلاً. لديك دليل على أن حالتك التجارية منطقية. تفهم سلسلة القيمة والمنافسين والتطبيقات المستهدفة.',
    },
    info: {
      en: "You've spoken directly with real potential customers — not assumed who they are. You have survey data or interview notes showing that the problem is real and your solution is valued. You can now clearly articulate who your customer is, what they'll pay, and where your invention fits in the market.",
      ar: 'تحدثتَ مباشرة مع عملاء محتملين حقيقيين — وليس افتراضاً لمن هم. لديك بيانات مسح أو ملاحظات مقابلات تُثبت أن المشكلة حقيقية وأن حلك ذو قيمة. يمكنك الآن تحديد عميلك بوضوح.',
    },
  },
  {
    level: 4,
    label: { en: 'Business Plan Written', ar: 'كتابة خطة الأعمال' },
    criterion: {
      en: "You have written a simple business plan that covers costs, income, supply chain, distribution channels, target markets, and investment needs.",
      ar: 'كتبتَ خطة عمل بسيطة تتضمن التكاليف والدخل وسلاسل التوريد وقنوات التوزيع والأسواق المستهدفة واحتياجات الاستثمار.',
    },
    info: {
      en: "You have a written business plan — a real document, not just ideas in your head. It covers: how much it will cost to develop and produce your invention, how much revenue you expect, where materials will come from, how you'll reach customers, and how much investment is needed.",
      ar: 'لديك خطة عمل مكتوبة — وثيقة حقيقية، ليست مجرد أفكار في ذهنك. تتضمن: تكاليف التطوير والإنتاج، الإيرادات المتوقعة، مصادر المواد، كيفية الوصول إلى العملاء، واحتياجات الاستثمار.',
    },
  },
  {
    level: 5,
    label: { en: 'Regulatory & Standards Compliance Mapped', ar: 'رسم خريطة الامتثال التنظيمي والمعايير' },
    criterion: {
      en: "You have identified the relevant industry standards and regulations. You have obtained the necessary approvals, or you are in the process of getting them. You have also considered standardisation requirements.",
      ar: 'حددتَ المعايير والأنظمة ذات الصلة. حصلتَ على الموافقات اللازمة أو أنت في طريقك للحصول عليها. أخذتَ متطلبات التوحيد القياسي بعين الاعتبار.',
    },
    info: {
      en: "You've identified all the relevant standards (ISO, national standards) and regulations your invention must comply with to be sold legally. You know what approvals and certifications are required. You may already have some of these, or you're actively working to obtain them.",
      ar: 'حددتَ جميع المعايير واللوائح التنظيمية التي يجب على اختراعك الامتثال لها لكي يُباع بشكل قانوني. تعرف التصاريح والاعتمادات المطلوبة، وقد تكون بدأت بالحصول على بعضها.',
    },
  },
  {
    level: 6,
    label: { en: 'Commercialisation Plan Developed', ar: 'تطوير خطة التسويق' },
    criterion: {
      en: "You have a clear vision and story for your invention. You have a plan to commercialise it, including how to make it, market it, and deliver it.",
      ar: 'لديك رؤية وقصة واضحة لاختراعك. لديك خطة لتسويقه وتجاريته، بما في ذلك كيفية تصنيعه وتسويقه وتوصيله.',
    },
    info: {
      en: "You have a clear, compelling narrative for your invention — a story that explains what it is, why it matters, and why you're the right team to bring it to market. You have a full commercialisation plan covering manufacturing strategy, marketing approach, sales channels, and customer delivery.",
      ar: 'لديك سرد واضح ومقنع لاختراعك — قصة تشرح ما هو، لماذا يهم، ولماذا أنت الفريق المناسب لطرحه في السوق. لديك خطة تسويق شاملة تغطي استراتيجية التصنيع والتسويق وقنوات البيع وتوصيل المنتج.',
    },
  },
  {
    level: 7,
    label: { en: 'Strategic Partnership & Go-to-Market Strategy', ar: 'الشراكة الاستراتيجية واستراتيجية الدخول للسوق' },
    criterion: {
      en: "You have a strategic partnership to work with another party to sell your invention. Your detailed business plan has been validated. You have a Go-to-Market strategy in place.",
      ar: 'لديك شراكة استراتيجية مع طرف آخر للتعاون في بيع اختراعك. خطة عملك المفصّلة تم التحقق منها. لديك استراتيجية للذهاب إلى السوق.',
    },
    info: {
      en: "You have at least one strategic partnership in place — a company, distributor, licensee, or institutional partner who has agreed to work with you to bring your invention to market. Your business plan has been reviewed and validated externally. You have a specific Go-to-Market strategy with timelines and milestones.",
      ar: 'لديك شراكة استراتيجية واحدة على الأقل — شركة أو موزع أو مرخّص أو شريك مؤسسي وافق على العمل معك للوصول إلى السوق. خطة عملك تمت مراجعتها والتحقق منها خارجياً. لديك استراتيجية محددة للدخول إلى السوق مع جداول زمنية ومعالم.',
    },
  },
  {
    level: 8,
    label: { en: 'Supply Chain & Distribution Operational', ar: 'تشغيل سلسلة التوريد والتوزيع' },
    criterion: {
      en: "You have confirmed supply and demand routes. Your value chain, distribution, and marketing plans are operational. Production has been confirmed. Certification and regulatory work is underway.",
      ar: 'أكّدتَ مسارات العرض والطلب. سلسلة قيمتك وخطط التوزيع والتسويق باتت تعمل. تم تأكيد الإنتاج. العمل على الاعتمادات والمتطلبات التنظيمية جارٍ.',
    },
    info: {
      en: "Your supply and distribution chains are confirmed and operational — suppliers are secured, distribution agreements are signed, and marketing channels are active. Production has started or been formally confirmed. Your certification and regulatory processes are underway with a clear timeline.",
      ar: 'سلاسل التوريد والتوزيع مؤكدة وتعمل — الموردون محددون، اتفاقيات التوزيع موقّعة، وقنوات التسويق نشطة. الإنتاج بدأ أو تم تأكيده رسمياً. عمليات الاعتماد والمتطلبات التنظيمية جارية ضمن جدول زمني واضح.',
    },
  },
  {
    level: 9,
    label: { en: 'Market Ready — Full Launch Planned', ar: 'جاهز للسوق — الإطلاق الكامل مخطط' },
    criterion: {
      en: "Your final Go-to-Market strategy is ready. All certifications and regulatory requirements have been met. You have a phased launch plan ready to implement.",
      ar: 'استراتيجية الذهاب إلى السوق النهائية جاهزة. جميع الاعتمادات والمتطلبات التنظيمية تم استيفاؤها. لديك خطة إطلاق مرحلية جاهزة للتنفيذ.',
    },
    info: {
      en: "Everything is in place for launch. All certifications and legal requirements are met. Your final Go-to-Market strategy is complete with a phased market entry plan — when, where, and how you'll launch, and what success looks like in the first 6, 12, and 24 months.",
      ar: 'كل شيء جاهز للإطلاق. جميع الاعتمادات والمتطلبات القانونية مستوفاة. استراتيجية الدخول إلى السوق كاملة مع خطة مرحلية — متى وأين وكيف ستطلق، وما يبدو عليه النجاح خلال الأشهر الـ 6 والـ 12 والـ 24 الأولى.',
    },
  },
];

export const MATRIX_META = {
  trl: {
    key: 'trl',
    levels: TRL,
    min: 1,
    max: 9,
    color: '#2015ff',
    title: { en: 'Technology Readiness Level', ar: 'مستوى الجاهزية التكنولوجية' },
    abbr: 'TRL',
    description: {
      en: 'TRL measures how mature your technology is — from a basic scientific observation (TRL 1) all the way to a proven system deployed in the real world (TRL 9). Select the level that best describes where your invention is today.',
      ar: 'يقيس TRL مدى نضج تقنيتك — من ملاحظة علمية أساسية (TRL 1) وصولاً إلى نظام مُثبت ومنشور في العالم الحقيقي (TRL 9). اختر المستوى الذي يصف بشكل أفضل وضع اختراعك اليوم.',
    },
  },
  mrl: {
    key: 'mrl',
    levels: MRL,
    min: 1,
    max: 10,
    color: '#2015ff',
    title: { en: 'Manufacturing Readiness Level', ar: 'مستوى الاستعداد التصنيعي' },
    abbr: 'MRL',
    description: {
      en: 'MRL measures how ready your invention is to be manufactured — from initial exploration of what manufacturing would involve (MRL 1) to full-rate production (MRL 10). Select the level that best describes your manufacturing status today.',
      ar: 'يقيس MRL مدى جاهزية اختراعك للتصنيع — من الاستكشاف الأولي لمتطلبات التصنيع (MRL 1) إلى الإنتاج بالمعدل الكامل (MRL 10). اختر المستوى الذي يصف وضعك التصنيعي اليوم.',
    },
  },
  crl: {
    key: 'crl',
    levels: CRL,
    min: 1,
    max: 9,
    color: '#2015ff',
    title: { en: 'Commercialisation Readiness Level', ar: 'مستوى الاستعداد التجاري' },
    abbr: 'CRL',
    description: {
      en: 'CRL measures how ready your invention is for the market — from identifying a problem and a solution (CRL 1) to having a full go-to-market plan ready to launch (CRL 9). Select the level that best describes your commercialisation progress today.',
      ar: 'يقيس CRL مدى جاهزية اختراعك للسوق — من تحديد مشكلة وحلها (CRL 1) إلى امتلاك خطة تسويق كاملة جاهزة للإطلاق (CRL 9). اختر المستوى الذي يصف تقدمك التجاري اليوم.',
    },
  },
};
