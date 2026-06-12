import type { LocationData } from '@/types'

export const locations: LocationData[] = [
  {
    id: 'old-bookstore',
    name: '旧墨书店',
    description: '一幢百年老屋改造的古旧书店，木质书架从地板延伸至天花板，空气中弥漫着陈旧纸张与墨水的气味。店主林雪晴常年在柜台后整理那些旁人看来毫无价值的旧籍。',
    icon: '📚',
    x: 35,
    y: 40,
    characterId: 'lin-xueqing',
    scenes: ['ch1-s3', 'ch2-s2', 'ch3-s1']
  },
  {
    id: 'harbor-dock',
    name: '港口码头',
    description: '雾气终年弥漫的老码头，锈迹斑斑的系船柱上缠绕着粗壮的缆绳，海鸥的叫声被浓雾吞没。老水手赵鹤年总在暮色降临时独自坐在码头尽头抽烟斗。',
    icon: '⚓',
    x: 20,
    y: 70,
    characterId: 'zhao-henian',
    scenes: ['ch1-s4', 'ch2-s5', 'ch3-s4']
  },
  {
    id: 'city-library',
    name: '市立图书馆',
    description: '庄严肃穆的古典建筑，廊柱上刻着建馆年份——一九二三年。馆长苏敏华治馆严谨，闭馆时间一到，再重要的读者也必须离开。',
    icon: '🏛️',
    x: 60,
    y: 30,
    characterId: 'su-minhua',
    scenes: ['ch2-s3', 'ch2-s8', 'ch3-s5']
  },
  {
    id: 'fog-harbor-inn',
    name: '雾港旅馆',
    description: '一栋维多利亚风格的三层老旅馆，门廊的油漆已经剥落大半，走廊里的煤气灯忽明忽暗。侦探何振邦已在此住了半月有余，据说是受人委托前来调查一桩失踪案。',
    icon: '🏨',
    x: 50,
    y: 55,
    characterId: 'he-zhenbang',
    scenes: ['ch1-s5', 'ch2-s6', 'ch3-s6']
  },
  {
    id: 'lighthouse-cliff',
    name: '灯塔崖岸',
    description: '城东高耸的悬崖上矗立着一座百年灯塔，涨潮时海浪拍击崖壁的声音如闷雷般回响。灯塔已废弃多年，但据说深夜时分仍有人看见顶层的灯光忽闪忽灭。',
    icon: '🔦',
    x: 75,
    y: 15,
    unlockCondition: 'hasItem:lighthouse-code',
    scenes: ['ch2-s10', 'ch3-s8']
  },
  {
    id: 'fisherman-alley',
    name: '渔人小巷',
    description: '港口附近幽深曲折的巷弄，两侧是渔民居所与杂货铺，晾晒的渔网在风中飘荡如鬼魅。巷子尽头有一扇常年紧锁的铁门，门上的锈迹隐约可见旧日编号。',
    icon: '🐟',
    x: 30,
    y: 60,
    scenes: ['ch1-s6', 'ch2-s7']
  },
  {
    id: 'abandoned-press',
    name: '废弃印刷厂',
    description: '荒废多年的印刷工坊，铁皮屋顶已被海风侵蚀得千疮百孔。残存的印刷机如巨兽遗骸般蛰伏在黑暗中，地面上散落着褪色的铅字与纸屑。',
    icon: '🖨️',
    x: 70,
    y: 65,
    unlockCondition: 'hasClue:press-ink-trace',
    scenes: ['ch2-s11', 'ch3-s7']
  }
]
