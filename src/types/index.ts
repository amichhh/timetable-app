import dayjs from "dayjs"

/** バンド */
export type Band = {
  /** バンド名 */
  name: string
  /** 既存or企画 */
  type: string
  /** バンドメンバー */
  member: string[]
  /** 時間枠 */
  slot: number
  /** 出演開始時間 */
  appearance: Time
}

/** イベント設定 */
export class EventSetting {
  title: string
  date: Date
  startTime: Time
  breakStartTime: Time
  breakTime: number
  windingCount: number
  constructor() {
    this.title = ""
    this.date = dayjs().toDate()
    this.startTime = new Time("10", "00")
    this.breakStartTime = new Time("12", "00")
    this.breakTime = 60
    this.windingCount = 5
  }
}

/** 時間 */
export class Time {
  hour: string
  minute: string
  constructor(hour: string, minute: string) {
    this.hour = hour
    this.minute = minute
  }
  isAfter(this: Time, compare: Time): boolean {
    return this.hour === compare.hour
      ? Number(this.minute) >= Number(compare.minute)
      : Number(this.hour) >= Number(compare.hour)
  }
  isBefore(this: Time, compare: Time): boolean {
    return this.hour === compare.hour
      ? Number(this.minute) <= Number(compare.minute)
      : Number(this.hour) <= Number(compare.hour)
  }
  advance(this: Time, forward: number): Time {
    if (Number(this.minute) + forward < 60) {
      this.minute = `0${Number(this.minute) + forward}`.slice(-2)
      console.log("A")
    } else {
      this.hour = `0${Number(this.hour) + 1}`.slice(-2)
      this.minute = `0${Number(this.minute) + (forward - 60)}`.slice(-2)
    }
    return this
  }
}

/** 並べ替え条件 */
export type Condition = {
  id: number
  type: string
  target: string
  start: Time
  end: Time
}

/** メッセージ状態 */
export type MessageStatus = "ERROR" | "WARN" | "SUCCESS"
