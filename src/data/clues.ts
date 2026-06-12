import type { ClueData } from '@/types'

export const clues: ClueData[] = [
  {
    id: 'anonymous-letter-content',
    title: '匿名信内容',
    content: '信中写道："雾港之下，沉睡着一个作家的秘密。他的笔从未停下，只是换了一种方式书写。去旧墨书店，寻找第一把钥匙。"',
    source: '匿名信',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'early-manuscript',
    title: '作家早期手稿片段',
    content: '手稿以寓言体写就，讲述一位灯塔守望者发现了海底的异象，却无人相信他的话。字里行间隐约可见真实事件的投影。',
    source: '旧墨书店',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'borrow-record-summary',
    title: '借阅记录摘要',
    content: '借阅卡显示，一位姓陈的读者在过去一年间反复借阅《灯塔建造史》《密码学入门》《本地航运志》等书籍，最后一次借阅日期恰为其失踪前三天。',
    source: '市立图书馆',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'inn-register-info',
    title: '旅馆登记信息',
    content: '旅馆登记簿显示，失踪作家陈守谦曾于三个月前在此住宿，房间号为207。退房记录空白，但前台表示房间确已空置。',
    source: '雾港旅馆',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'secret-letter-content',
    title: '密函内容',
    content: '密函由暗语写成，破译后内容指向灯塔——"月圆之夜，三短一长，守望者将归来"。信末署名为一只振翅的鹤。',
    source: '物品合成',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'lighthouse-code-interpretation',
    title: '灯塔暗号解读',
    content: '灯塔的闪光信号并非故障，而是一套精心设计的摩尔斯密码体系，含义为："此处安全，可传递消息"。',
    source: '灯塔崖岸',
    category: 'document',
    color: '#e8d5b7'
  },
  {
    id: 'lin-xueqing-testimony',
    title: '林雪晴证词',
    content: '"守谦常来我店里，他总在角落那桌写东西。失踪前一周，他告诉我他发现了什么了不起的东西，说等写完会给所有人一个交代。"',
    source: '旧墨书店·林雪晴',
    category: 'testimony',
    color: '#a8d8ea'
  },
  {
    id: 'zhao-henian-memory',
    title: '赵鹤年回忆',
    content: '"那年台风夜，我看见灯塔上有光——不是故障，是有人在发信号。后来那个看守人就不见了。但我跟谁说都没人信。"',
    source: '港口码头·赵鹤年',
    category: 'testimony',
    color: '#a8d8ea'
  },
  {
    id: 'su-minhua-statement',
    title: '苏敏华说法',
    content: '"陈先生确实常来查阅资料，但他借阅的书籍组合很奇怪——灯塔、密码、印刷术。我原以为他在写新小说，现在想来或许另有深意。"',
    source: '市立图书馆·苏敏华',
    category: 'testimony',
    color: '#a8d8ea'
  },
  {
    id: 'he-zhenbang-notes',
    title: '何振邦调查笔记',
    content: '"此案绝非普通失踪。陈守谦失踪前有预谋地清理了住所，但刻意留下了线索——他希望有人找到他，但必须是「对的人」。"',
    source: '雾港旅馆·何振邦',
    category: 'testimony',
    color: '#a8d8ea'
  },
  {
    id: 'dock-knot-mark',
    title: '码头绳结标记',
    content: '码头系船柱上的绳结并非水手惯用打法，而是一种古老的记事结绳，记录了某个日期与方位信息。',
    source: '港口码头',
    category: 'physical',
    color: '#c8e6c9'
  },
  {
    id: 'press-ink-trace',
    title: '印刷厂油墨痕迹',
    content: '印刷厂地面残留的油墨痕迹呈现规律的几何图案，并非印刷文字，而是某种刻意留下的暗号，暗示此地曾秘密印制过特殊文件。',
    source: '废弃印刷厂',
    category: 'physical',
    color: '#c8e6c9'
  },
  {
    id: 'manuscript-disappearance-truth',
    title: '手稿失踪真相',
    content: '陈守谦的手稿并非被窃，而是他亲手拆分藏匿。他意识到手稿中的内容触动了某些人的利益，于是将真相碎片化，等待有缘人拼合。',
    source: '推理得出',
    category: 'deduction',
    color: '#ffccbc'
  },
  {
    id: 'writer-hermit-mystery',
    title: '作家隐居之谜',
    content: '陈守谦并未遇害，而是主动隐居灯塔之中。他以闪光信号向外界传递信息，等待有人破解密码，将他发现的真相公之于世。',
    source: '推理得出',
    category: 'deduction',
    color: '#ffccbc'
  }
]
