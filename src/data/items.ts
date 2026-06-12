import type { ItemData } from '@/types'

export const items: ItemData[] = [
  {
    id: 'anonymous-letter',
    name: '匿名信',
    description: '一封无署名的信件，信纸泛黄，墨迹却很新。信中提及"雾港藏有不可言说之秘"。',
    icon: '✉️',
    rarity: 'common'
  },
  {
    id: 'old-bookmark',
    name: '旧书签',
    description: '一枚手工制作的皮质书签，背面刻着细小的文字："真相藏于墨迹之下"。',
    icon: '🔖',
    rarity: 'common'
  },
  {
    id: 'dock-pass',
    name: '码头通行证',
    description: '港口管理部门签发的通行凭证，持证人姓名一栏已被水渍模糊。',
    icon: '🎫',
    rarity: 'common'
  },
  {
    id: 'inn-key',
    name: '旅馆钥匙',
    description: '雾港旅馆二楼某间客房的铜质钥匙，钥匙柄上刻着房间号"207"。',
    icon: '🔑',
    rarity: 'common'
  },
  {
    id: 'manuscript-fragment-a',
    name: '手稿残页A',
    description: '一份手稿的前半部分，字迹工整但内容晦涩，讲述了一个关于灯塔看守人的故事。',
    icon: '📄',
    rarity: 'uncommon',
    combinableWith: 'manuscript-fragment-b',
    combineResult: 'complete-manuscript',
    combineDescription: '两页残稿拼合在一起，故事的轮廓终于完整浮现。'
  },
  {
    id: 'manuscript-fragment-b',
    name: '手稿残页B',
    description: '一份手稿的后半部分，墨色较深，结尾处笔迹变得急促潦草，似乎作者在匆忙中完成。',
    icon: '📄',
    rarity: 'uncommon',
    combinableWith: 'manuscript-fragment-a',
    combineResult: 'complete-manuscript',
    combineDescription: '两页残稿拼合在一起，故事的轮廓终于完整浮现。'
  },
  {
    id: 'logbook-fragment',
    name: '航海日志残页',
    description: '一本航海日志的散页，记录了某次夜间航行的异常经历，提到"灯塔发出了三短一长的闪光"。',
    icon: '📒',
    rarity: 'uncommon',
    combinableWith: 'codebook',
    combineResult: 'lighthouse-code',
    combineDescription: '日志中的灯光信号与暗号手册的密码对照，灯塔密码终于破解。'
  },
  {
    id: 'borrow-record',
    name: '借阅记录',
    description: '市立图书馆的旧借阅卡，上面记录了某人频繁借阅灯塔建造史与密码学书籍的痕迹。',
    icon: '📋',
    rarity: 'uncommon'
  },
  {
    id: 'codebook',
    name: '暗号手册',
    description: '一本袖珍的暗号对照手册，封面已磨损，内页用铅笔标注了密密麻麻的记号。',
    icon: '📖',
    rarity: 'uncommon',
    combinableWith: 'logbook-fragment',
    combineResult: 'lighthouse-code',
    combineDescription: '日志中的灯光信号与暗号手册的密码对照，灯塔密码终于破解。'
  },
  {
    id: 'complete-manuscript',
    name: '完整手稿',
    description: '拼合完整的手稿讲述了一个惊心动魄的故事：灯塔看守人发现了一个惊天秘密，却被迫隐姓埋名。',
    icon: '📜',
    rarity: 'rare',
    combinableWith: 'printing-plate',
    combineResult: 'secret-letter',
    combineDescription: '手稿内容与印刷模板的暗纹完美吻合，一封隐藏的密函被揭示出来。'
  },
  {
    id: 'lighthouse-code',
    name: '灯塔密码',
    description: '破解后的灯塔信号密码，三短一长的闪光意味着"危险已过，可入灯塔"。',
    icon: '🔐',
    rarity: 'rare',
    combinableWith: 'secret-letter',
    combineResult: 'author-legacy',
    combineDescription: '密函中的隐语与灯塔密码交叉印证，作家遗稿的藏匿之处终于大白。'
  },
  {
    id: 'printing-plate',
    name: '印刷模板',
    description: '废弃印刷厂中发现的铅字排版模板，表面有特殊的凹凸纹路，似乎不仅是用于印刷文字。',
    icon: '🖨️',
    rarity: 'rare',
    combinableWith: 'complete-manuscript',
    combineResult: 'secret-letter',
    combineDescription: '手稿内容与印刷模板的暗纹完美吻合，一封隐藏的密函被揭示出来。'
  },
  {
    id: 'secret-letter',
    name: '密函',
    description: '通过手稿与印刷模板揭示的密函，内容涉及一桩被刻意掩盖的往事，措辞隐晦而急迫。',
    icon: '✉️',
    rarity: 'rare',
    combinableWith: 'lighthouse-code',
    combineResult: 'author-legacy',
    combineDescription: '密函中的隐语与灯塔密码交叉印证，作家遗稿的藏匿之处终于大白。'
  },
  {
    id: 'author-legacy',
    name: '作家遗稿',
    description: '陈守谦的最终遗稿，记录了他所发现的一切真相。他在遗稿中写道："若你读到这里，说明雾终于散了。"',
    icon: '📝',
    rarity: 'legendary'
  }
]
