import dayjs from "dayjs"

/** バンド */
export type Band = {
  name: string
  type: BandType
  member: string[]
  slot: number
  appearance: Time
}

/** バンド種別 */
export type BandType = "EXISTING" | "PLANNING" | "NONE"

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
    } else {
      this.hour = `0${Number(this.hour) + 1}`.slice(-2)
      this.minute = `0${Number(this.minute) + (forward - 60)}`.slice(-2)
    }
    return this
  }
}

/** 並べ替え条件 */
export class Condition {
  id: number
  type: ConditionType
  target: string
  start: Time
  end: Time
  constructor(id: number, type: ConditionType, target: string, start: Time, end: Time) {
    this.id = id
    this.type = type
    this.target = target
    this.start = start
    this.end = end
  }
  static createTimeCondition(id: number) {
    return new Condition(id, "TIME", "-", new Time("0", "0"), new Time("0", "0"))
  }
}

/** 並べ替え条件種別 */
export type ConditionType = "TIME"

/** メッセージ状態 */
export type MessageStatus = "ERROR" | "WARN" | "SUCCESS"
