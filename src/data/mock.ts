export type UserRole = "client" | "freelancer";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  city: string;
  role: UserRole;
  rating: number;
  reviews: number;
  ordersCreated: number;
  ordersCompleted: number;
  responses: number;
  bio: string;
  joinedAt: string;
  isBlocked?: boolean;
}

export interface Order {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  city: string;
  remote: boolean;
  status: "open" | "in_progress" | "completed" | "cancelled";
  clientId: string;
  createdAt: string;
  attachments: string[];
  responses: Response[];
}

export interface Response {
  id: string;
  orderId: string;
  freelancerId: string;
  price: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  image?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

export interface Notification {
  id: string;
  type: "response" | "status" | "message" | "new_order";
  title: string;
  text: string;
  read: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  targetType: "user" | "order";
  targetId: string;
  reason: string;
  details: string;
  status: "pending" | "resolved" | "rejected";
  createdAt: string;
}

export const CATEGORIES = [
  { id: "dev", name: "Разработка", icon: "💻" },
  { id: "design", name: "Дизайн", icon: "🎨" },
  { id: "marketing", name: "Маркетинг", icon: "📣" },
  { id: "copy", name: "Копирайтинг", icon: "✍️" },
  { id: "translate", name: "Переводы", icon: "🌐" },
  { id: "consult", name: "Консультации", icon: "💡" },
];

export const USERS: User[] = [
  {
    id: "u1",
    name: "Алексей Морозов",
    email: "alex@mail.ru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    city: "Москва",
    role: "client",
    rating: 4.8,
    reviews: 34,
    ordersCreated: 12,
    ordersCompleted: 9,
    responses: 0,
    bio: "Основатель стартапа в сфере EdTech. Ищу талантливых исполнителей для своих проектов.",
    joinedAt: "2024-01-15",
  },
  {
    id: "u2",
    name: "Мария Лебедева",
    email: "maria@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    city: "Санкт-Петербург",
    role: "freelancer",
    rating: 4.9,
    reviews: 67,
    ordersCreated: 0,
    ordersCompleted: 52,
    responses: 120,
    bio: "Full-stack разработчик с 6 годами опыта. Специализируюсь на React и Node.js.",
    joinedAt: "2023-08-20",
  },
  {
    id: "u3",
    name: "Дмитрий Соколов",
    email: "dmitry@yandex.ru",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    city: "Казань",
    role: "freelancer",
    rating: 4.6,
    reviews: 28,
    ordersCreated: 2,
    ordersCompleted: 31,
    responses: 85,
    bio: "UI/UX дизайнер. Создаю красивые и удобные интерфейсы для мобильных и веб-приложений.",
    joinedAt: "2023-11-05",
  },
  {
    id: "u4",
    name: "Анна Козлова",
    email: "anna@mail.ru",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    city: "Новосибирск",
    role: "client",
    rating: 4.5,
    reviews: 12,
    ordersCreated: 8,
    ordersCompleted: 5,
    responses: 0,
    bio: "Руководитель маркетингового отдела. Заказываю контент и дизайн для наших кампаний.",
    joinedAt: "2024-03-10",
  },
  {
    id: "u5",
    name: "Иван Петров",
    email: "ivan@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    city: "Екатеринбург",
    role: "freelancer",
    rating: 4.7,
    reviews: 43,
    ordersCreated: 1,
    ordersCompleted: 38,
    responses: 97,
    bio: "Копирайтер и контент-маркетолог. Пишу тексты, которые продают.",
    joinedAt: "2023-06-12",
  },
  {
    id: "me",
    name: "Елена Смирнова",
    email: "elena@delora.ru",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format",
    city: "Москва",
    role: "client",
    rating: 4.7,
    reviews: 19,
    ordersCreated: 7,
    ordersCompleted: 4,
    responses: 23,
    bio: "Предприниматель и продуктовый менеджер. Строю цифровые продукты с классными командами.",
    joinedAt: "2024-02-28",
  },
];

export const ORDERS: Order[] = [
  {
    id: "o1",
    title: "Разработка мобильного приложения для доставки еды",
    category: "dev",
    description: "Нужно разработать мобильное приложение для iOS и Android. Функционал: регистрация, каталог ресторанов, корзина, оплата, отслеживание заказа. Дизайн предоставим. Нужен опытный разработчик на React Native или Flutter.",
    budget: 150000,
    deadline: "2025-03-01",
    city: "Москва",
    remote: true,
    status: "open",
    clientId: "u1",
    createdAt: "2025-01-10",
    attachments: [],
    responses: [
      { id: "r1", orderId: "o1", freelancerId: "u2", price: 140000, message: "Готова взяться за проект. Большой опыт в React Native.", status: "pending", createdAt: "2025-01-11" },
      { id: "r2", orderId: "o1", freelancerId: "u5", price: 160000, message: "Имею опыт разработки 5 подобных приложений.", status: "pending", createdAt: "2025-01-12" },
    ],
  },
  {
    id: "o2",
    title: "Разработка фирменного стиля для IT-стартапа",
    category: "design",
    description: "Требуется создать полноценный брендбук: логотип, цветовая палитра, типографика, шаблоны презентаций и документов. Стартап в сфере финтех, целевая аудитория — молодые профессионалы.",
    budget: 45000,
    deadline: "2025-02-15",
    city: "Санкт-Петербург",
    remote: true,
    status: "open",
    clientId: "u4",
    createdAt: "2025-01-08",
    attachments: [],
    responses: [
      { id: "r3", orderId: "o2", freelancerId: "u3", price: 42000, message: "Специализируюсь именно на брендинге для IT-компаний.", status: "pending", createdAt: "2025-01-09" },
    ],
  },
  {
    id: "o3",
    title: "SEO-оптимизация интернет-магазина",
    category: "marketing",
    description: "Нужна комплексная SEO-оптимизация: технический аудит, работа с семантикой, оптимизация контента, построение ссылочного профиля. Магазин на WordPress, ~500 страниц товаров.",
    budget: 30000,
    deadline: "2025-04-01",
    city: "Казань",
    remote: true,
    status: "in_progress",
    clientId: "u1",
    createdAt: "2025-01-05",
    attachments: [],
    responses: [],
  },
  {
    id: "o4",
    title: "Написание 20 статей для блога о путешествиях",
    category: "copy",
    description: "Нужен опытный копирайтер для написания статей о путешествиях по России. Объём каждой статьи — 2000-3000 знаков. Темы предоставим. Важны уникальность и SEO-грамотность.",
    budget: 15000,
    deadline: "2025-02-28",
    city: "Новосибирск",
    remote: true,
    status: "open",
    clientId: "u4",
    createdAt: "2025-01-12",
    attachments: [],
    responses: [
      { id: "r4", orderId: "o4", freelancerId: "u5", price: 14000, message: "Пишу о путешествиях последние 3 года, есть портфолио.", status: "pending", createdAt: "2025-01-13" },
    ],
  },
  {
    id: "o5",
    title: "Перевод технической документации с английского",
    category: "translate",
    description: "Требуется перевод технической документации для программного обеспечения (~50 000 знаков). Нужен переводчик с глубоким пониманием IT-терминологии.",
    budget: 25000,
    deadline: "2025-03-15",
    city: "Екатеринбург",
    remote: true,
    status: "open",
    clientId: "u1",
    createdAt: "2025-01-14",
    attachments: [],
    responses: [],
  },
  {
    id: "o6",
    title: "Консультация по построению команды разработчиков",
    category: "consult",
    description: "Нужна консультация по найму и управлению командой разработчиков для стартапа. Как выстроить процессы, какие инструменты использовать, как оценивать кандидатов.",
    budget: 10000,
    deadline: "2025-02-01",
    city: "Москва",
    remote: false,
    status: "completed",
    clientId: "me",
    createdAt: "2025-01-02",
    attachments: [],
    responses: [],
  },
];

export const CHATS: Chat[] = [
  { id: "c1", participants: ["me", "u2"], lastMessage: "Отлично, давайте договоримся о звонке", lastMessageAt: "2025-01-14T15:30:00", unread: 2 },
  { id: "c2", participants: ["me", "u3"], lastMessage: "Могу прислать примеры работ завтра", lastMessageAt: "2025-01-13T11:20:00", unread: 0 },
  { id: "c3", participants: ["me", "u5"], lastMessage: "Спасибо за быстрый отклик!", lastMessageAt: "2025-01-12T09:45:00", unread: 1 },
];

export const MESSAGES: Message[] = [
  { id: "m1", chatId: "c1", senderId: "u2", text: "Добрый день! Увидела ваш заказ на разработку приложения.", createdAt: "2025-01-11T10:00:00" },
  { id: "m2", chatId: "c1", senderId: "me", text: "Здравствуйте! Да, нам нужен опытный разработчик.", createdAt: "2025-01-11T10:05:00" },
  { id: "m3", chatId: "c1", senderId: "u2", text: "У меня есть 6 лет опыта в React Native. Могу показать похожие проекты.", createdAt: "2025-01-11T10:07:00" },
  { id: "m4", chatId: "c1", senderId: "me", text: "Замечательно! Когда могли бы начать?", createdAt: "2025-01-14T15:28:00" },
  { id: "m5", chatId: "c1", senderId: "u2", text: "Отлично, давайте договоримся о звонке", createdAt: "2025-01-14T15:30:00" },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "response", title: "Новый отклик", text: "Мария Лебедева откликнулась на ваш заказ «Разработка мобильного приложения»", read: false, createdAt: "2025-01-14T15:31:00" },
  { id: "n2", type: "message", title: "Новое сообщение", text: "Мария Лебедева написала вам сообщение", read: false, createdAt: "2025-01-14T15:30:00" },
  { id: "n3", type: "status", title: "Заказ выполнен", text: "Заказ «Консультация по построению команды» отмечен как выполненный", read: true, createdAt: "2025-01-10T12:00:00" },
  { id: "n4", type: "new_order", title: "Новый заказ в категории Дизайн", text: "Опубликован новый заказ «Разработка фирменного стиля» с бюджетом 45 000 ₽", read: true, createdAt: "2025-01-08T09:00:00" },
  { id: "n5", type: "response", title: "Отклик принят", text: "Ваш отклик на заказ «SEO-оптимизация» был принят заказчиком", read: true, createdAt: "2025-01-07T16:00:00" },
];

export const REPORTS: Report[] = [
  { id: "rep1", targetType: "user", targetId: "u3", reason: "Мошенничество", details: "Пользователь взял предоплату и пропал.", status: "pending", createdAt: "2025-01-13T14:00:00" },
  { id: "rep2", targetType: "order", targetId: "o4", reason: "Неадекватный бюджет", details: "Слишком низкая оплата за объём работ.", status: "rejected", createdAt: "2025-01-10T10:00:00" },
];

export const FAVORITES: string[] = ["o1", "o2", "o5"];
export const WISHLIST_CATEGORIES: string[] = ["dev", "design", "consult"];
