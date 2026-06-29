import { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  User, 
  Phone, 
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';

// Cookie image imports
import biscoffCaramelImg from './assets/biscoff_caramel.png';
import doubleChocolateImg from './assets/double_chocolate.png';
import blackForestImg from './assets/black_forest.png';
import redVelvetImg from './assets/red_velvet.png';
import chocolateChipImg from './assets/chocolate_chip.png';
import logoImg from './assets/logo.jpg';

type Language = 'he' | 'en' | 'ru' | 'ar';
type PaymentMethod = 'cash' | 'paybox' | 'bit';

interface TranslationSet {
  title: string;
  subtitle: string;
  dealTitle: string;
  deal1: string;
  deal4: string;
  deal6: string;
  deal14: string;
  menuTitle: string;
  addToOrder: string;
  orderFormTitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  phoneNumber: string;
  notes: string;
  notesPlaceholder: string;
  summaryTotalCookies: string;
  summaryTotalCookiesValue: string;
  summaryBundleComposition: string;
  summaryTotalPrice: string;
  submitBtn: string;
  successTitle: string;
  successText: string;
  receiptTitle: string;
  receiptQtyUnit: string;
  successCloseBtn: string;
  followInstagram: string;
  copyright: string;
  inDealTag: string;
  bundle14Name: string;
  bundle6Name: string;
  bundle4Name: string;
  bundle1Name: string;
  
  pickupWarningTitle: string;
  pickupWarningText: string;
  pickupWarningClose: string;
  paymentModalTitle: string;
  paymentModalText: string;
  payCash: string;
  payPaybox: string;
  payBit: string;
  confirmOrder: string;
  selectedPayment: string;
  
  // New translations for cart bar & modal close
  cartBarLabel: string;
  checkoutBtn: string;
  closeBtn: string;
  
  flavors: Record<string, { name: string; desc: string }>;
}

const TRANSLATIONS: Record<Language, TranslationSet> = {
  he: {
    title: 'Ha Cookiez',
    subtitle: 'עוגיות ביתיות טריות, אפויות באהבה ובחומרי גלם הכי טובים שיש ✨',
    dealTitle: 'מבצע המארזים שלנו (ניתן לערבב טעמים!)',
    deal1: 'עוגיה 1',
    deal4: 'מארז 4',
    deal6: 'מארז 6',
    deal14: 'מארז 14',
    menuTitle: 'תפריט העוגיות שלנו',
    addToOrder: 'הוסף +',
    orderFormTitle: 'פרטי ההזמנה',
    fullName: 'שם מלא',
    fullNamePlaceholder: 'ישראל ישראלי',
    phoneNumber: 'מספר טלפון',
    notes: 'הערות מיוחדות (אלרגיות / בקשות)',
    notesPlaceholder: 'למשל: אלרגיה לאגוזים, כתיבת הקדשה, איסוף עצמי...',
    summaryTotalCookies: 'סה"כ עוגיות במגש:',
    summaryTotalCookiesValue: 'עוגיות',
    summaryBundleComposition: 'הרכב מארזים:',
    summaryTotalPrice: 'סה"כ לתשלום:',
    submitBtn: 'מעבר לתשלום',
    successTitle: 'ההזמנה התקבלה בהצלחה! 🍪',
    successText: 'איזה כיף, אנחנו כבר מתחילים להכין את הבצק! ניצור איתך קשר בהקדם בטלפון {phone} לאישור ההזמנה, תיאום איסוף עצמי והסדרת התשלום.',
    receiptTitle: 'פרטי הזמנה עבור:',
    receiptQtyUnit: 'יחידות',
    successCloseBtn: 'הבנתי, תודה!',
    followInstagram: 'עקבו אחרינו באינסטגרם',
    copyright: 'כל הזכויות שמורות.',
    inDealTag: 'במבצע',
    bundle14Name: 'מארז 14',
    bundle6Name: 'מארז 6',
    bundle4Name: 'מארז 4',
    bundle1Name: 'עוגיה בודדת',
    
    pickupWarningTitle: 'איסוף עצמי בלבד! 📍',
    pickupWarningText: 'שימו לב: המכירה והאיסוף מתבצעים באיסוף עצמי בלבד מרמת גן. אין אפשרות למשלוחים.',
    pickupWarningClose: 'אני מבין/ה, בואו נתחיל!',
    paymentModalTitle: 'בחירת שיטת תשלום 💳',
    paymentModalText: 'נא לבחור כיצד תרצו לשלם עבור ההזמנה באיסוף העצמי:',
    payCash: 'מזומן באיסוף',
    payPaybox: 'Paybox',
    payBit: 'Bit',
    confirmOrder: 'אשר ושלח הזמנה',
    selectedPayment: 'שיטת תשלום:',
    
    cartBarLabel: 'בסל שלך:',
    checkoutBtn: 'לקופה 🛒',
    closeBtn: 'סגור',
    
    flavors: {
      chocolate_chip: {
        name: "שוקולד צ'יפס קלאסי",
        desc: 'עוגיית קלאסיקה נימוחה עם שברי שוקולד מובחרים הנמסים בפה'
      },
      double_chocolate: {
        name: 'דאבל שוקולד בלגי',
        desc: 'עוגיית שוקולד כפול עשירה, קקאו כהה אינטנסיבי ושוקולד לבן איכותי'
      },
      red_velvet: {
        name: 'רד ולווט מלכותי',
        desc: 'עוגיית רד ולווט קלאסית בצבע קטיפתי עמוק עם זילוף קרם עשיר'
      },
      black_forest: {
        name: 'בלאק פורסט דובדבן',
        desc: 'עוגת היער השחור בגרסת עוגיה: בצק קקאו כהה, שוקולד לבן ונגיעות דובדבן עסיסי'
      },
      biscoff_caramel: {
        name: 'ביסקופ קרמל ומלח ים',
        desc: 'עוגיה עשירה בממרח לוטוס ופירורי ביסקוויט מקורמלים עם זילוף קרמל חם'
      },
      weekly_special: {
        name: 'הספיישל השבועי המסתורי 🌟',
        desc: 'טעם חדש ומפתיע בכל שבוע! שאלו אותנו מהו הספיישל השבוע או פשוט תנו לנו להפתיע אתכם בקופסה'
      }
    }
  },
  en: {
    title: 'Ha Cookiez',
    subtitle: 'Fresh homemade cookies, baked with love using the finest ingredients ✨',
    dealTitle: 'Our Bundle Deals (Mix & Match Flavors!)',
    deal1: '1 Cookie',
    deal4: '4 Pack',
    deal6: '6 Pack',
    deal14: '14 Pack',
    menuTitle: 'Our Cookie Menu',
    addToOrder: 'Add +',
    orderFormTitle: 'Order Details',
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    phoneNumber: 'Phone Number',
    notes: 'Special Notes (Allergies / Requests)',
    notesPlaceholder: 'E.g. Nut allergies, gift card message, pickup request...',
    summaryTotalCookies: 'Total Cookies in Tray:',
    summaryTotalCookiesValue: 'cookies',
    summaryBundleComposition: 'Bundle Breakdown:',
    summaryTotalPrice: 'Total to Pay:',
    submitBtn: 'Proceed to Payment',
    successTitle: 'Order Placed Successfully! 🍪',
    successText: "Awesome, we're already starting to prep the dough! We'll contact you shortly at {phone} to confirm your order, arrange self-pickup, and finalize payment.",
    receiptTitle: 'Order Details for:',
    receiptQtyUnit: 'qty',
    successCloseBtn: 'Got it, thanks!',
    followInstagram: 'Follow us on Instagram',
    copyright: 'All rights reserved.',
    inDealTag: 'In Deal',
    bundle14Name: '14 Pack',
    bundle6Name: '6 Pack',
    bundle4Name: '4 Pack',
    bundle1Name: 'Single Cookie',
    
    pickupWarningTitle: 'Self-Pickup Only! 📍',
    pickupWarningText: 'Please note: Orders are available for self-pickup from Ramat Gan only. No delivery services are available.',
    pickupWarningClose: 'I understand, let’s go!',
    paymentModalTitle: 'Select Payment Method 💳',
    paymentModalText: 'Please choose how you would like to pay for your pickup order:',
    payCash: 'Cash on pickup',
    payPaybox: 'Paybox',
    payBit: 'Bit',
    confirmOrder: 'Confirm & Place Order',
    selectedPayment: 'Payment Method:',
    
    cartBarLabel: 'In your cart:',
    checkoutBtn: 'Go to Checkout 🛒',
    closeBtn: 'Close',
    
    flavors: {
      chocolate_chip: {
        name: 'Classic Chocolate Chip',
        desc: 'A soft, melt-in-your-mouth classic cookie loaded with premium chocolate chunks'
      },
      double_chocolate: {
        name: 'Double Belgian Chocolate',
        desc: 'Rich double chocolate cookie with intense dark cocoa and premium white chocolate'
      },
      red_velvet: {
        name: 'Royal Red Velvet',
        desc: 'A classic deep velvety red cookie topped with a rich cream swirl'
      },
      black_forest: {
        name: 'Black Forest Cherry',
        desc: 'Black Forest cake in a cookie: dark cocoa dough, white chocolate, and juicy cherry bites'
      },
      biscoff_caramel: {
        name: 'Biscoff Caramel & Sea Salt',
        desc: 'Rich cookie with Biscoff spread, caramelized biscuit crumbs, and warm caramel drizzle'
      },
      weekly_special: {
        name: 'Mystery Weekly Special 🌟',
        desc: 'A new surprising flavor every week! Ask us what the special is or just let us surprise you in the box'
      }
    }
  },
  ru: {
    title: 'Ha Cookiez',
    subtitle: 'Свежее домашнее печенье, испеченное с любовью из лучших ингредиентов ✨',
    dealTitle: 'Наши комбо-наборы (смешивайте любые вкусы!)',
    deal1: '1 печенье',
    deal4: 'Набор из 4',
    deal6: 'Набор из 6',
    deal14: 'Набор из 14',
    menuTitle: 'Наше меню печенья',
    addToOrder: 'Добавить +',
    orderFormTitle: 'Детали заказа',
    fullName: 'Полное имя',
    fullNamePlaceholder: 'Иван Иванов',
    phoneNumber: 'Номер телефона',
    notes: 'Особые пожелания (аллергия / запросы)',
    notesPlaceholder: 'Например: аллергия на орехи, открытка в подарок, самовывоз...',
    summaryTotalCookies: 'Всего печенья в наборе:',
    summaryTotalCookiesValue: 'шт.',
    summaryBundleComposition: 'Состав наборов:',
    summaryTotalPrice: 'Итого к оплате:',
    submitBtn: 'Перейти к оплате',
    successTitle: 'Заказ успешно принят! 🍪',
    successText: 'Отлично, мы уже начинаем готовить тесто! Мы свяжемся с вами в ближайшее время по телефону {phone} для подтверждения заказа, времени самовывоза и оплаты.',
    receiptTitle: 'Детали заказа для:',
    receiptQtyUnit: 'шт.',
    successCloseBtn: 'Понятно, спасибо!',
    followInstagram: 'Подписывайтесь в Instagram',
    copyright: 'Все права защищены.',
    inDealTag: 'В комбо',
    bundle14Name: 'Набор из 14',
    bundle6Name: 'Набор из 6',
    bundle4Name: 'Набор из 4',
    bundle1Name: '1 печенье',
    
    pickupWarningTitle: 'Только самовывоз! 📍',
    pickupWarningText: 'Обратите внимание: доступен исключительно самовывоз из Рамат-Гана. Услуги доставки отсутствуют.',
    pickupWarningClose: 'Я понимаю, продолжить!',
    paymentModalTitle: 'Способ оплаты 💳',
    paymentModalText: 'Пожалуйста, выберите метод оплаты при самовывозе:',
    payCash: 'Наличными при получении',
    payPaybox: 'Paybox',
    payBit: 'Bit',
    confirmOrder: 'Подтвердить и заказать',
    selectedPayment: 'Способ оплаты:',
    
    cartBarLabel: 'В корзине:',
    checkoutBtn: 'Оформить 🛒',
    closeBtn: 'Закрыть',
    
    flavors: {
      chocolate_chip: {
        name: 'Классический Шоколад Чип',
        desc: 'Нежное классическое печенье с кусочками отборного тающего шоколада'
      },
      double_chocolate: {
        name: 'Двойной Бельгийский Шоколад',
        desc: 'Насыщенное шоколадное печенье с темным какао и качественным белым шоколадом'
      },
      red_velvet: {
        name: 'Королевский Красный Бархат',
        desc: 'Классическое печенье насыщенного бархатно-красного цвета с нежным кремом'
      },
      black_forest: {
        name: 'Черный Лес с Вишней',
        desc: 'Вкус торта «Черный лес» в печенье: темное какао, белый шоколад и сочная вишня'
      },
      biscoff_caramel: {
        name: 'Бискофф Карамель и Соль',
        desc: 'Печенье с пастой Lotus, карамельной крошкой и теплой карамельной глазурью'
      },
      weekly_special: {
        name: 'Таинственный Спешл Недели 🌟',
        desc: 'Новый удивительный вкус каждую неделю! Спросите нас о спешле или позвольте удивить вас коробкой ассорти'
      }
    }
  },
  ar: {
    title: 'Ha Cookiez',
    subtitle: 'كوكيز منزلي طازج، يُخبز بحب وبأفضل المكونات المتاحة ✨',
    dealTitle: 'عروض المجموعات لدينا (يمكنك مزج النكهات!)',
    deal1: 'كوكيز 1',
    deal4: 'علبة 4',
    deal6: 'علبة 6',
    deal14: 'علبة 14',
    menuTitle: 'قائمة الكوكيز لدينا',
    addToOrder: 'أضف +',
    orderFormTitle: 'تفاصيل الطلب',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'فلان الفلاني',
    phoneNumber: 'رقم الهاتف',
    notes: 'ملاحظات خاصة (حساسية / طلبات)',
    notesPlaceholder: 'مثال: حساسية المكسرات، بطاقة إهداء، استلام شخصي...',
    summaryTotalCookies: 'إجمالي الكوكيز في الصينية:',
    summaryTotalCookiesValue: 'كوكيز',
    summaryBundleComposition: 'تفاصيل المجموعات:',
    summaryTotalPrice: 'إجمالي الدفع:',
    submitBtn: 'الذهاب للدفع',
    successTitle: 'تم استلام الطلب بنجاح! 🍪',
    successText: 'رائع، نحن نبدأ بالفعل في تحضير العجين! سنتصل بك قريبًا على الرقم {phone} لتأكيد الطلب وتنسيق استلامك الشخصي والدفع.',
    receiptTitle: 'تفاصيل الطلب لـ:',
    receiptQtyUnit: 'حبات',
    successCloseBtn: 'فهمت، شكراً!',
    followInstagram: 'تابعونا على إنستغرام',
    copyright: 'جميع الحقوق محفوظة.',
    inDealTag: 'في العرض',
    bundle14Name: 'علبة 14',
    bundle6Name: 'علبة 6',
    bundle4Name: 'علبة 4',
    bundle1Name: 'عוגة واحدة',
    
    pickupWarningTitle: 'استلام شخصي فقط! 📍',
    pickupWarningText: 'يرجى الانتباه: بيع الكوكيز متوفر فقط عن طريق الاستلام الشخصي من رمات غان. لا تتوفر خدمة توصيل.',
    pickupWarningClose: 'فهمت، لنبدأ!',
    paymentModalTitle: 'اختر طريقة الدفع 💳',
    paymentModalText: 'يرجى اختيار الطريقة التي ترغب في الدفع بها عند الاستلام الشخصي:',
    payCash: 'نقداً عند الاستلام',
    payPaybox: 'Paybox',
    payBit: 'Bit',
    confirmOrder: 'تأكيد وإرسال الطلب',
    selectedPayment: 'طريقة الدفع:',
    
    cartBarLabel: 'في سلتك:',
    checkoutBtn: 'إتمام الطلب 🛒',
    closeBtn: 'إغلاق',
    
    flavors: {
      chocolate_chip: {
        name: 'شوكولاتة شيبس كلاسيك',
        desc: 'كعكة كلاسيكية طرية تذوب في الفم مع قطع شوكولاتة فاخرة'
      },
      double_chocolate: {
        name: 'شوكولاتة مزدوجة بلجيكية',
        desc: 'كعكة شوكولاتة مزدوجة غنية مع كاكاو داكن مكثف وشوكولاتة بيضاء فاخرة'
      },
      red_velvet: {
        name: 'ريد فيلفيت ملكي',
        desc: 'كعكة ريد فيلفيت كلاسيكية بلون مخملي عميق مع دوامة كريمة غنية'
      },
      black_forest: {
        name: 'الغابة السوداء بالكرز',
        desc: 'كعكة الغابة السوداء على شكل كوكيز: عجينة كاكاو داكنة، شوكولاتة بيضاء وقطع كرز عصيرية'
      },
      biscoff_caramel: {
        name: 'بيسكوف كراميل وملح البحر',
        desc: 'كعكة غنية بزبادي لوتس وفتات البسكويت المكرمل مع رذاذ الكراميل الدافئ'
      },
      weekly_special: {
        name: 'سبيشال الأسبوع الغامض 🌟',
        desc: 'نكهة جديدة ومفاجئة كل أسبوع! اسألنا عن نكهة الأسبوع أو دعنا نُفاجئك في الصندوق'
      }
    }
  }
};

const FLAVOR_METADATA = [
  { id: 'chocolate_chip', image: chocolateChipImg, class: 'chocolate_chip' },
  { id: 'double_chocolate', image: doubleChocolateImg, class: 'double_chocolate' },
  { id: 'red_velvet', image: redVelvetImg, class: 'red_velvet' },
  { id: 'black_forest', image: blackForestImg, class: 'black_forest' },
  { id: 'biscoff_caramel', image: biscoffCaramelImg, class: 'biscoff_caramel' },
  { id: 'weekly_special', image: '', class: 'weekly_special' }
];

interface PriceResult {
  price: number;
  counts: [number, number, number, number]; // 14, 6, 4, 1
}

function getOptimalPrice(count: number): PriceResult {
  if (count <= 0) return { price: 0, counts: [0, 0, 0, 0] };

  const options = [
    { size: 14, cost: 120 },
    { size: 6, cost: 50 },
    { size: 4, cost: 35 },
    { size: 1, cost: 10 }
  ];

  const dp: number[] = new Array(count + 1).fill(Infinity);
  const parent: number[] = new Array(count + 1).fill(-1);

  dp[0] = 0;

  for (let i = 1; i <= count; i++) {
    for (let j = 0; j < options.length; j++) {
      const opt = options[j];
      if (i >= opt.size) {
        const cost = dp[i - opt.size] + opt.cost;
        if (cost < dp[i]) {
          dp[i] = cost;
          parent[i] = j;
        }
      }
    }
  }

  const counts: [number, number, number, number] = [0, 0, 0, 0];
  let curr = count;
  while (curr > 0) {
    const optIdx = parent[curr];
    if (optIdx === -1) break;
    counts[optIdx]++;
    curr -= options[optIdx].size;
  }

  return {
    price: dp[count],
    counts
  };
}

function App() {
  const [lang, setLang] = useState<Language>('he');

  // Cart state
  const [cart, setCart] = useState<Record<string, number>>({
    chocolate_chip: 0,
    double_chocolate: 0,
    red_velvet: 0,
    black_forest: 0,
    biscoff_caramel: 0,
    weekly_special: 0,
  });

  // Customer info state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // UI Modals state
  const [showPickupWarning, setShowPickupWarning] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Selected payment method state
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  // Expanded card description state
  const [activeDesc, setActiveDesc] = useState<string | null>(null);

  // Sync HTML tag direction and lang attributes
  useEffect(() => {
    const dir = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  // Current translation set
  const t = TRANSLATIONS[lang];

  // Cart calculations
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const { price: totalPrice, counts: priceCounts } = getOptimalPrice(totalItems);

  const isFormValid = name.trim().length >= 2 && phone.trim().length >= 7 && totalItems > 0;

  // Format bundle breakdown string dynamically
  const formatBreakdown = (counts: [number, number, number, number]) => {
    const parts: string[] = [];
    if (counts[0] > 0) parts.push(`${counts[0]} × ${t.bundle14Name}`);
    if (counts[1] > 0) parts.push(`${counts[1]} × ${t.bundle6Name}`);
    if (counts[2] > 0) parts.push(`${counts[2]} × ${t.bundle4Name}`);
    if (counts[3] > 0) parts.push(`${counts[3]} × ${t.bundle1Name}`);
    return parts.join(' + ');
  };

  const priceBreakdown = formatBreakdown(priceCounts);

  // Cart modifiers
  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setShowCheckoutModal(false); // Close details modal
      setShowPaymentModal(true); // Open payment choice modal
    }
  };

  const handleConfirmPayment = () => {
    if (selectedPayment) {
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    }
  };

  const resetOrder = () => {
    setCart({
      chocolate_chip: 0,
      double_chocolate: 0,
      red_velvet: 0,
      black_forest: 0,
      biscoff_caramel: 0,
      weekly_special: 0,
    });
    setName('');
    setPhone('');
    setNotes('');
    setSelectedPayment(null);
    setActiveDesc(null);
    setShowCheckoutModal(false);
    setShowSuccessModal(false);
  };

  const getPaymentLabel = (method: PaymentMethod | null) => {
    if (!method) return '';
    if (method === 'cash') return t.payCash;
    if (method === 'paybox') return t.payPaybox;
    return t.payBit;
  };

  const translateSuccessText = (template: string, phoneVal: string) => {
    return template.replace('{phone}', phoneVal);
  };

  return (
    <div className="app-container">
      {/* Language Switcher */}
      <div className="lang-switcher">
        <button 
          type="button" 
          className={`lang-btn ${lang === 'he' ? 'active' : ''}`}
          onClick={() => setLang('he')}
        >
          <span>🇮🇱</span> עברית
        </button>
        <button 
          type="button" 
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          <span>🇺🇸</span> English
        </button>
        <button 
          type="button" 
          className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
          onClick={() => setLang('ru')}
        >
          <span>🇷🇺</span> Русский
        </button>
        <button 
          type="button" 
          className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
          onClick={() => setLang('ar')}
        >
          <span>🇸🇦</span> العربية
        </button>
      </div>

      {/* 1. Header */}
      <header className="header">
        <div className="logo-wrapper">
          <img 
            className="logo" 
            src={logoImg} 
            alt="Ha Cookiez Logo" 
          />
          <div className="logo-badge">🍪</div>
        </div>
        <h1 className="title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </header>

      {/* 2. Bundle Guide Banner */}
      <div className="pricing-banner">
        <h3 className="pricing-title">
          <Sparkles size={14} color="var(--accent)" />
          {t.dealTitle}
        </h3>
        <div className="pricing-grid">
          <div className="pricing-item">
            <span className="qty-label">{t.deal1}</span>
            <span className="price-label">10 ₪</span>
          </div>
          <div className="pricing-item">
            <span className="qty-label">{t.deal4}</span>
            <span className="price-label">35 ₪</span>
          </div>
          <div className="pricing-item">
            <span className="qty-label">{t.deal6}</span>
            <span className="price-label">50 ₪</span>
          </div>
          <div className="pricing-item">
            <span className="qty-label">{t.deal14}</span>
            <span className="price-label">120 ₪</span>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        {t.menuTitle}
      </h2>

      {/* 3. Cookie Cards */}
      <div className="flavor-list">
        {FLAVOR_METADATA.map((meta) => {
          const qty = cart[meta.id] || 0;
          const details = t.flavors[meta.id];
          return (
            <div key={meta.id} className={`flavor-card ${meta.class}`}>
              {/* Tapping the image container toggles the description overlay */}
              <div 
                className={`flavor-image-container ${!meta.image ? 'mystery' : ''}`}
                onClick={() => setActiveDesc(activeDesc === meta.id ? null : meta.id)}
                style={{ cursor: 'pointer' }}
              >
                {meta.image ? (
                  <img 
                    className="flavor-image" 
                    src={meta.image} 
                    alt={details.name} 
                  />
                ) : (
                  <span className="mystery-mark">?</span>
                )}
                
                {/* Absolute Deal Badge */}
                <span className="flavor-badge-absolute">{t.inDealTag}</span>
                
                {/* Clickable Description Overlay */}
                <div className={`flavor-desc-overlay ${activeDesc === meta.id ? 'active' : ''}`}>
                  {details.desc}
                </div>
              </div>

              <div className="flavor-info">
                {/* Flavor Name (Also clickable to toggle info) */}
                <h3 
                  className="flavor-name"
                  onClick={() => setActiveDesc(activeDesc === meta.id ? null : meta.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {details.name}
                </h3>
                
                {/* Hint Text */}
                <span 
                  className="click-hint"
                  onClick={() => setActiveDesc(activeDesc === meta.id ? null : meta.id)}
                >
                  {lang === 'he' ? 'לחצו לתיאור 📖' : lang === 'en' ? 'Click for info 📖' : lang === 'ru' ? 'Описание 📖' : 'انقر للتفاصيل 📖'}
                </span>

                <div className="card-action-bar">
                  {qty === 0 ? (
                    <button 
                      type="button" 
                      className="add-first-btn"
                      style={{ width: '100%' }}
                      onClick={() => updateQty(meta.id, 1)}
                    >
                      {t.addToOrder}
                    </button>
                  ) : (
                    <div className="qty-control" style={{ width: '100%', justifyContent: 'space-between' }}>
                      <button 
                        type="button" 
                        className="qty-btn"
                        onClick={() => updateQty(meta.id, -1)}
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button 
                        type="button" 
                        className="qty-btn"
                        onClick={() => updateQty(meta.id, 1)}
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Sticky Floating Cart Bar */}
      {totalItems > 0 && (
        <div className="cart-bar">
          <div className="cart-bar-info">
            <span className="cart-bar-count">{totalItems} {t.summaryTotalCookiesValue}</span>
            <span className="cart-bar-total">{totalPrice} ₪</span>
          </div>
          <button 
            type="button" 
            className="cart-bar-btn"
            onClick={() => setShowCheckoutModal(true)}
          >
            <span>{t.checkoutBtn}</span>
          </button>
        </div>
      )}

      {/* 5. Checkout Details Form Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal-content scrollable">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '2px dashed #efebe9', paddingBottom: 12 }}>
              <h3 className="modal-title" style={{ margin: 0 }}>{t.orderFormTitle}</h3>
              <button 
                type="button" 
                className="modal-close-btn"
                style={{ backgroundColor: '#bcaaa4', padding: '6px 16px', borderRadius: '10px' }}
                onClick={() => setShowCheckoutModal(false)}
              >
                {t.closeBtn}
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group" style={{ textAlign: 'start' }}>
                <label className="form-label" htmlFor="full-name">
                  <User size={14} style={{ marginInlineEnd: 4 }} />
                  {t.fullName}
                </label>
                <input 
                  id="full-name"
                  type="text" 
                  className="form-input" 
                  placeholder={t.fullNamePlaceholder} 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ textAlign: 'start' }}>
                <label className="form-label" htmlFor="phone-number">
                  <Phone size={14} style={{ marginInlineEnd: 4 }} />
                  {t.phoneNumber}
                </label>
                <input 
                  id="phone-number"
                  type="tel" 
                  className="form-input" 
                  placeholder="050-1234567" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ textAlign: 'start' }}>
                <label className="form-label" htmlFor="order-notes">
                  <MessageSquare size={14} style={{ marginInlineEnd: 4 }} />
                  {t.notes}
                </label>
                <textarea 
                  id="order-notes"
                  className="form-input form-textarea" 
                  placeholder={t.notesPlaceholder} 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Dynamic Summary inside Modal */}
              <div className="summary-box">
                <div className="summary-row">
                  <span>{t.summaryTotalCookies}</span>
                  <span>{totalItems} {t.summaryTotalCookiesValue}</span>
                </div>
                {totalItems > 0 && (
                  <div className="summary-row" style={{ fontSize: '13px', borderBottom: '1px solid #efebe9', paddingBottom: '6px', marginBottom: '4px' }}>
                    <span>{t.summaryBundleComposition}</span>
                    <span style={{ fontWeight: 500, color: 'var(--primary-light)' }}>{priceBreakdown}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>{t.summaryTotalPrice}</span>
                  <span>{totalPrice} ₪</span>
                </div>
              </div>

              {/* Submit to proceed to payment options */}
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!isFormValid}
              >
                <ShoppingBag size={18} />
                <span>{t.submitBtn} ({totalPrice} ₪)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Initial Warning Modal (Self-pickup only) */}
      {showPickupWarning && (
        <div className="modal-overlay">
          <div className="modal-content pickup-border">
            <div className="success-icon-wrapper" style={{ backgroundColor: '#ffebee', color: '#c62828' }}>
              <Info size={36} />
            </div>
            <h3 className="modal-title pickup-alert-title">{t.pickupWarningTitle}</h3>
            <p className="modal-text" style={{ fontWeight: '500', color: 'var(--text-main)' }}>
              {t.pickupWarningText}
            </p>
            <button 
              type="button" 
              className="modal-close-btn"
              style={{ backgroundColor: '#c62828' }}
              onClick={() => setShowPickupWarning(false)}
            >
              {t.pickupWarningClose}
            </button>
          </div>
        </div>
      )}

      {/* Payment Selection Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{t.paymentModalTitle}</h3>
            <p className="modal-text">{t.paymentModalText}</p>
            
            <div className="payment-grid">
              <button
                type="button"
                className={`payment-option-btn ${selectedPayment === 'cash' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('cash')}
              >
                <span>💵 {t.payCash}</span>
                <span className="payment-badge">Cash</span>
              </button>

              <button
                type="button"
                className={`payment-option-btn ${selectedPayment === 'paybox' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('paybox')}
              >
                <span>📦 {t.payPaybox}</span>
                <span className="payment-badge">Paybox</span>
              </button>

              <button
                type="button"
                className={`payment-option-btn ${selectedPayment === 'bit' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('bit')}
              >
                <span>📱 {t.payBit}</span>
                <span className="payment-badge">Bit</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button 
                type="button" 
                className="confirm-payment-btn"
                disabled={!selectedPayment}
                onClick={handleConfirmPayment}
              >
                {t.confirmOrder} ({totalPrice} ₪)
              </button>
              <button
                type="button"
                className="modal-close-btn"
                style={{ backgroundColor: '#bcaaa4' }}
                onClick={() => setShowPaymentModal(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon-wrapper">
              <Check size={36} />
            </div>
            <h3 className="modal-title">{t.successTitle}</h3>
            <p className="modal-text">
              {translateSuccessText(t.successText, phone)}
            </p>
            
            <div className="summary-box" style={{ textAlign: 'start', backgroundColor: '#fcf9f2', marginBottom: 20 }}>
              <div className="summary-row" style={{ fontWeight: 'bold', borderBottom: '1px solid #efebe9', paddingBottom: 6 }}>
                <span>{t.receiptTitle} {name}</span>
              </div>
              {FLAVOR_METADATA.map(meta => {
                const qty = cart[meta.id];
                const details = t.flavors[meta.id];
                if (qty > 0) {
                  return (
                    <div className="summary-row" key={meta.id}>
                      <span>{details.name}</span>
                      <span>{qty} {t.receiptQtyUnit}</span>
                    </div>
                  );
                }
                return null;
              })}
              <div className="summary-row" style={{ fontSize: '13px', borderTop: '1px dashed #efebe9', borderBottom: '1px dashed #efebe9', paddingTop: 6, paddingBottom: 6, marginTop: 4, marginBottom: 4 }}>
                <span>{t.summaryBundleComposition}</span>
                <span style={{ fontWeight: 500, color: 'var(--primary-light)' }}>{priceBreakdown}</span>
              </div>
              <div className="summary-row" style={{ fontWeight: '600', color: 'var(--primary-dark)', borderBottom: '1px dashed #efebe9', paddingBottom: 6, marginBottom: 4 }}>
                <span>{t.selectedPayment}</span>
                <span style={{ color: 'var(--accent)' }}>{getPaymentLabel(selectedPayment)}</span>
              </div>
              <div className="summary-row total">
                <span>{t.summaryTotalPrice}</span>
                <span>{totalPrice} ₪</span>
              </div>
            </div>

            <button 
              type="button" 
              className="modal-close-btn"
              onClick={resetOrder}
            >
              {t.successCloseBtn}
            </button>
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="footer">
        <span className="footer-logo">Ha Cookiez 🍪</span>
        <a 
          href="https://www.instagram.com/ha_cookiez?igsh=bXVpeXdidWx1MTBy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-link"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          {t.followInstagram}
        </a>
        <div className="copyright">
          © {new Date().getFullYear()} Ha Cookiez. {t.copyright}
        </div>
      </footer>
    </div>
  );
}

export default App;
