/**
 * 간트 차트를 그릴 때 사용하는 데이터 클래스
 *
 * @property process 프로세스
 * @property core 프로세스가 점유하고 있는 코어
 * @property time 프로세스가 코어를 점유하기 시작한 시간 ~ 끝난 시간 (start inclusive and end inclusive)
 */
export class GanttChartItem {
  /**
   * @param process 프로세스 (읽기 전용)
   * @param core 프로세스가 점유하고 있는 코어 (읽기 전용)
   * @param time 프로세스가 코어를 점유하기 시작한 시간 ~ 끝난 시간 (start inclusive and end inclusive) (읽기 전용)
   */
  constructor(
    public readonly process: Process,
    public readonly core: CoreType, // 또는 단순히 Core, 프로젝트 구조에 맞게 사용
    public readonly time: TimeRange
  ) {}

  // 선택적: Kotlin의 data class 자동 생성 메서드(equals, toString 등)는 없습니다.
  // 필요하다면 직접 구현해야 합니다.

  /**
   * 이 간트 차트 항목의 기간(시간 길이)을 계산합니다 (time.end - time.start).
   * Kotlin 확장 함수의 로직(last - first)을 따릅니다.
   * 참고: 시작과 끝을 모두 포함하는 기간은 보통 end - start + 1 로 계산합니다.
   * @returns {number} 계산된 기간
   */
  get duration(): number {
    return this.time.end - this.time.start;
  }
}

/**
 * TimeRange의 기간(시간 길이)을 계산합니다 (range.end - range.start).
 * Kotlin의 IntRange.range() 확장 함수 로직을 모방합니다.
 * 시작과 끝을 모두 포함하는 기간을 원한다면 `range.end - range.start + 1`을 사용하세요.
 *
 * @param range 기간을 계산할 TimeRange 객체
 * @returns {number} 계산된 기간
 */
export function calculateRangeDuration(range: TimeRange): number {
  return range.end - range.start;
}
