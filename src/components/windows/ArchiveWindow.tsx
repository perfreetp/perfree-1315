import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { achievements as allAchievements } from '@/data/achievements'
import { cn } from '@/lib/utils'
import type { DiaryEntry } from '@/types'

type TabId = 'diary' | 'documents' | 'achievements'

const TABS: { id: TabId; label: string }[] = [
  { id: 'diary', label: '日记' },
  { id: 'documents', label: '文档' },
  { id: 'achievements', label: '成就' },
]

const DIARY_TYPE_ICONS: Record<string, string> = {
  event: '📜',
  discovery: '🔍',
  dialogue: '💬',
  deduction: '💡',
}

const DOCUMENTS_DATA: Record<string, { title: string; content: string[] }> = {
  'anonymous-letter': {
    title: '匿名信',
    content: [
      '信纸泛黄，墨迹却新，仿佛寄件人刚刚落笔便寄了出去。',
      '信上只有寥寥数语：',
      '"雾港之下，沉睡着一个作家的秘密。他的笔从未停下，只是换了一种方式书写。"',
      '信末没有署名，没有邮戳，只有一行小字：去旧墨书店，寻找第一把钥匙。',
    ],
  },
  'manuscript-fragment-a': {
    title: '手稿残页·上',
    content: [
      '手稿以寓言体写就，讲述一位灯塔守望者发现了海底的异象，却无人相信他的话。',
      '字里行间隐约可见真实事件的投影。纸张边缘有烧焦的痕迹，似乎有人曾试图销毁它。',
      '残页末尾写道："守望者决定将真相封入灯塔，用光的语言诉说给每一个愿意倾听的人。"',
    ],
  },
  'manuscript-fragment-b': {
    title: '手稿残页·下',
    content: [
      '手稿下半部分笔迹更加潦草，似乎是在匆忙中写就。',
      '"他们在黑暗中达成了交易，用沉默换取安稳。但沉默不是永恒的——文字比人更长久。"',
      '信封里还夹着一张纸条："海上的老人手中有另一半。"',
    ],
  },
  'borrow-record': {
    title: '借阅记录卡',
    content: [
      '借阅卡显示，一位姓陈的读者在过去一年间反复借阅《灯塔建造史》《密码学入门》《本地航运志》等书籍。',
      '最后一次借阅日期恰为其失踪前三天。',
      '借阅卡背面有人用铅笔写了一行小字："书页之间，真相藏匿。"',
    ],
  },
  'logbook-fragment': {
    title: '航海日志残页',
    content: [
      '日志记录着那晚灯塔信号的频率与模式：三短一长，反复循环。',
      '日志最后一页夹着一片干枯的海草，散发着咸湿的气味。',
      '旁边的暗号对照手册标注着：三短一长 = "安全通道开启"。',
    ],
  },
  'codebook': {
    title: '暗号对照手册',
    content: [
      '袖珍的暗号对照手册，封面已磨损不堪。',
      '内页密密麻麻地记录着各种信号编码与对应含义。',
      '其中被红笔圈出的一条：三短一长 → "此处安全，可传递消息"。',
    ],
  },
  'printing-plate': {
    title: '印刷模板',
    content: [
      '金属印刷模板，表面的凹凸纹路不仅是文字，还包含了一层只有在特定角度下才能看到的暗纹。',
      '暗纹与手稿文字重叠，便能揭示密函的全文。',
      '模板背面刻着一行小字："真相需要两把钥匙才能开启。"',
    ],
  },
  'secret-letter': {
    title: '密函',
    content: [
      '密函由暗语写成，破译后内容指向灯塔——',
      '"月圆之夜，三短一长，守望者将归来。"',
      '信末署名为一只振翅的鹤。',
    ],
  },
  'lighthouse-code': {
    title: '灯塔密码本',
    content: [
      '破译后的灯塔信号记录本，详细标注了每一个闪光模式的含义。',
      '核心密码：三短一长 = "安全通道开启"。',
      '备注：信号由灯塔内部操控，非自然故障。',
    ],
  },
  'author-legacy': {
    title: '作家遗稿',
    content: [
      '陈守谦三年的隐居生活中写就的遗稿，记录了雾港那段被掩埋的往事。',
      '每一个名字、每一桩事件都经过了反复考证。',
      '最后一页写着："若你读到这里，说明雾终于散了。请将这些文字带出灯塔，交给那些需要真相的人。一个作家的笔，不应该被沉默折断。"',
    ],
  },
  'old-bookmark': {
    title: '旧书签',
    content: [
      '一枚旧书签，背面刻着奇怪的文字，似乎是某种古老的密码。',
      '书签正面印着旧墨书店的标志，边角有水渍痕迹。',
    ],
  },
}

function DiaryTab({ diary }: { diary: DiaryEntry[] }) {
  if (diary.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-display text-fog-dim">日记尚无记录</p>
      </div>
    )
  }

  const sorted = [...diary].reverse()

  return (
    <div className="space-y-2 p-4">
      {sorted.map((entry) => (
        <div key={entry.id} className="diary-entry">
          <div className="mb-1 flex items-center gap-2 text-xs text-fog-dim">
            <span className="rounded bg-ink-600 px-1.5 py-0.5 text-paper-light">
              第{entry.day}天
            </span>
            <span className="rounded bg-ink-600 px-1.5 py-0.5 text-paper-light">
              {entry.timeSlot === 'dawn' ? '清晨' : entry.timeSlot === 'afternoon' ? '午后' : entry.timeSlot === 'dusk' ? '黄昏' : '深夜'}
            </span>
            <span>{DIARY_TYPE_ICONS[entry.type] ?? '📜'}</span>
          </div>
          <p className="text-sm text-fog leading-relaxed">{entry.content}</p>
        </div>
      ))}
    </div>
  )
}

function DocumentsTab({ documents }: { documents: string[] }) {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)

  if (documents.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-display text-fog-dim">尚未获得任何文档</p>
      </div>
    )
  }

  const expandedData = expandedDoc ? DOCUMENTS_DATA[expandedDoc] : null

  return (
    <div className="space-y-2 p-4">
      {documents.map((docId) => {
        const doc = DOCUMENTS_DATA[docId]
        if (!doc) return null
        return (
          <button
            key={docId}
            onClick={() => setExpandedDoc(docId)}
            className="old-paper block w-full rounded-lg p-4 text-left transition-colors hover:ring-1 hover:ring-gold/30"
          >
            <h4 className="font-display text-sm text-gold mb-1">{doc.title}</h4>
            <p className="line-clamp-1 text-xs text-fog-dim">{doc.content[0]}</p>
          </button>
        )
      })}

      <Modal
        isOpen={!!expandedData}
        onClose={() => setExpandedDoc(null)}
        title={expandedData?.title}
      >
        {expandedData && (
          <div className="space-y-3">
            {expandedData.content.map((para, i) => (
              <p key={i} className="text-sm text-paper leading-relaxed">{para}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

function AchievementsTab({ unlockedIds }: { unlockedIds: string[] }) {
  const unlockedSet = new Set(unlockedIds)
  const visibleAchievements = allAchievements.filter(
    a => !a.isHidden || unlockedSet.has(a.id)
  )

  return (
    <div className="p-4">
      <div className="mb-4 text-center text-xs text-fog-dim">
        {unlockedIds.length} / {allAchievements.length}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence>
          {visibleAchievements.map((achievement) => {
            const isUnlocked = unlockedSet.has(achievement.id)
            return (
              <motion.div
                key={achievement.id}
                className={cn(
                  'achievement-card',
                  isUnlocked ? 'unlocked' : 'locked'
                )}
                initial={isUnlocked ? { scale: 0.8, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="mb-2 text-2xl">{isUnlocked ? achievement.icon : '🔒'}</div>
                <h4 className="font-display text-xs text-paper mb-1">
                  {isUnlocked ? achievement.name : '???'}
                </h4>
                <p className="text-[10px] text-fog-dim leading-relaxed">
                  {isUnlocked ? achievement.description : '???'}
                </p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ArchiveWindow() {
  const [activeTab, setActiveTab] = useState<TabId>('diary')
  const { diary, documents, unlockedAchievements } = useGameStore()

  return (
    <Window title="档案" id="archive">
      <div className="flex h-full flex-col">
        <div className="flex border-b border-ink-600 bg-ink-800">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-body transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-fog-dim hover:text-paper'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto">
          {activeTab === 'diary' && <DiaryTab diary={diary} />}
          {activeTab === 'documents' && <DocumentsTab documents={documents} />}
          {activeTab === 'achievements' && <AchievementsTab unlockedIds={unlockedAchievements} />}
        </div>
      </div>
    </Window>
  )
}
