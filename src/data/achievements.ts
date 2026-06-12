import type { AchievementData } from '@/types'

export const achievements: AchievementData[] = [
  {
    id: 'arrive-fog-harbor',
    name: '初到雾港',
    description: '踏上雾港码头的那一刻，浓雾便将你包裹。一段不可思议的旅程就此开始。',
    icon: '🌊',
    condition: 'completeScene:ch1-s1'
  },
  {
    id: 'seven-locations',
    name: '七处踏遍',
    description: '雾港的每一寸土地都留下了你的足迹，即便是最隐秘的角落也未逃过你的探索。',
    icon: '🗺️',
    condition: 'visitAllLocations'
  },
  {
    id: 'bookstore-friend',
    name: '书香门第',
    description: '林雪晴向你敞开了书店的密室——那里藏着连老顾客都不知道的秘密。',
    icon: '📚',
    condition: 'affinity:lin-xueqing>=3'
  },
  {
    id: 'old-sea-friend',
    name: '海上老友',
    description: '赵鹤年终于卸下戒备，将那段尘封的海上往事向你娓娓道来。',
    icon: '⚓',
    condition: 'affinity:zhao-henian>=3'
  },
  {
    id: 'librarian-favor',
    name: '馆长青睐',
    description: '苏敏华破例在闭馆后为你留门，让你独享图书馆禁书区的珍贵藏书。',
    icon: '🏛️',
    condition: 'affinity:su-minhua>=3'
  },
  {
    id: 'detective-ally',
    name: '侦探之友',
    description: '何振邦将调查笔记与你分享，这是他从未对任何人做过的信任之举。',
    icon: '🔍',
    condition: 'affinity:he-zhenbang>=3'
  },
  {
    id: 'pages-united',
    name: '残页合一',
    description: '散落的手稿残页在你手中合而为一，一个完整的故事从碎片中重生。',
    icon: '📜',
    condition: 'hasItem:complete-manuscript'
  },
  {
    id: 'code-breaker',
    name: '密码破译者',
    description: '灯塔的闪光不再是无意义的闪烁，你读懂了守望者沉默的语言。',
    icon: '🔐',
    condition: 'hasItem:lighthouse-code'
  },
  {
    id: 'legacy-revealed',
    name: '遗稿现世',
    description: '作家的遗稿终于重见天日，雾港最深处的秘密在文字中苏醒。',
    icon: '📝',
    condition: 'hasItem:author-legacy'
  },
  {
    id: 'clue-master',
    name: '线索大师',
    description: '你收集了雾港所有的线索，每一条都被你细心地钉在了线索板上。',
    icon: '🧩',
    condition: 'clueCount>=12'
  },
  {
    id: 'diary-full',
    name: '日记满篇',
    description: '你的调查日记写满了整整一本，每一页都记录着向真相靠近的一步。',
    icon: '📓',
    condition: 'diaryCount>=15'
  },
  {
    id: 'truth-revealed',
    name: '真相大白',
    description: '迷雾散尽，真相浮出水面。你终于理解了陈守谦的抉择与牺牲。',
    icon: '☀️',
    condition: 'ending:true-ending'
  },
  {
    id: 'fog-walker',
    name: '雾中行者',
    description: '在夜幕下的雾港独自穿行，你听见了这座城市最隐秘的心跳。',
    icon: '🌫️',
    condition: 'visitAtTime:night'
  },
  {
    id: 'night-light-seeker',
    name: '暗夜寻光',
    description: '深夜站在灯塔之下仰望光柱，你终于理解了守望者的使命。',
    icon: '🔦',
    condition: 'visitAtTime:night&&location:lighthouse-cliff'
  },
  {
    id: 'time-traveler',
    name: '时光旅人',
    description: '你在雾港度过了全部七个日夜，与这座城市的脉搏共振至最后一刻。',
    icon: '⏳',
    condition: 'day>=7',
    isHidden: true
  }
]
