import type { EndingData } from '@/types'

export const endings: EndingData[] = [
  {
    id: 'true-ending',
    name: '真结局：雾散之后',
    description: '你找到了全部真相，揭开了雾港最深处的秘密。',
    condition: 'hasClue:writer-hermit-mystery&&hasClue:manuscript-disappearance-truth&&hasItem:author-legacy&&affinity:lin-xueqing>=3&&affinity:he-zhenbang>=3&&keyChoice:ch3-s9-trust-writer',
    epilogue: [
      '你站在灯塔顶端，手中握着陈守谦的遗稿。雾气在海面上缓缓散去，露出了远方清晰的海岸线。',
      '陈守谦就站在你面前——一个比照片上苍老许多的中年人，但眼中仍有写作人的执拗与光。',
      '"你终于来了，"他微笑着说，"我就知道，总有一天会有读者找到这里。"',
      '遗稿公之于世后，雾港那些被掩盖的往事终于浮出水面。旧书店、图书馆、码头、印刷厂——这座城市每一条线索都指向了同一个真相。',
      '而你，成为了那个替迷雾点灯的人。'
    ]
  },
  {
    id: 'normal-a',
    name: '普通结局A：半掩之门',
    description: '你找到了大部分真相，但仍有迷雾未曾散去。',
    condition: 'clueCount>=8&&hasItem:complete-manuscript',
    epilogue: [
      '你拼合了手稿的全文，但作家的下落仍是一个未解之谜。遗稿中的故事令人震撼，却缺少最后一块拼图。',
      '林雪晴将手稿珍藏于书店密室，她说："也许有一天，他会回来亲自续写结局。"',
      '你离开雾港时，回头望了一眼。灯塔的光依然在夜空中闪烁，像是某种未曾终结的对话。',
      '半掩的门后，真相若隐若现。你带走了疑问，也留下了希望。'
    ]
  },
  {
    id: 'normal-b',
    name: '普通结局B：海上归人',
    description: '你从码头的线索中找到了一条独特的路径。',
    condition: 'affinity:zhao-henian>=3&&hasClue:dock-knot-mark&&hasItem:logbook-fragment',
    epilogue: [
      '赵鹤年领着你来到码头尽头，指着海面上一个若隐若现的影子。"那是他的船，"老水手的声音在海风中颤抖，"他还在等。"',
      '你们向那艘船发出了信号——三短一长的灯光。片刻之后，船上亮起了回应的灯火。',
      '但你终究没能登上那艘船。潮水正在退去，码头的缆绳在风中发出呜咽般的声响。',
      '也许下一次涨潮时，归人会真正归来。也许，等待本身就是答案。'
    ]
  },
  {
    id: 'bad-ending',
    name: '失败结局：雾锁港城',
    description: '关键线索的缺失让真相永远沉入了雾港的海底。',
    condition: 'clueCount<6||!hasItem:complete-manuscript',
    epilogue: [
      '你在雾港逗留了数日，却始终无法拼凑出完整的故事。线索像指间的雾气，握得越紧，散得越快。',
      '当你登上离开雾港的渡轮时，回望那座被浓雾吞没的港口城市，心中只剩下一片茫然。',
      '灯塔的光在雾中忽明忽暗，像是某种你永远无法读懂的语言。',
      '也许有些真相注定要永远沉睡在雾港的海底。而你，只是又一个擦肩而过的旅人。'
    ]
  },
  {
    id: 'hidden-ending',
    name: '隐藏结局：灯塔守望者',
    description: '你发现了最深的秘密，成为了新的守望者。',
    condition: 'hasItem:author-legacy&&triggeredEvent:lighthouse-night-event&&keyChoice:ch2-s10-enter-lighthouse',
    isHidden: true,
    epilogue: [
      '当你踏入灯塔的那一刻，一切谜题的答案如潮水般涌来。陈守谦并非失踪——他选择了守望。',
      '"灯塔不只是建筑，"墙上的一行字迹写道，"它是承诺。只要灯还亮着，就有人在等。"',
      '陈守谦已经离开了。他留下了遗稿，留下了密码，也留下了守望的使命。',
      '你站在灯塔的瞭望台上，望着脚下无边无际的雾海。手中的灯火轻轻摇曳，像是一颗跳动的心脏。',
      '你明白了——每一个被雾港吸引而来的人，都带着同样的使命：在黑暗中为他人点灯。',
      '于是你留了下来。当浓雾再次笼罩港口，灯塔的光芒依然准时亮起——三短一长，从未间断。'
    ]
  }
]
