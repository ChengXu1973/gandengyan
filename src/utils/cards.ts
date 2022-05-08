import {
    CardPoint,
    CardSuit,
    CARD_COUNT_IN_ONE_SET,
    CombinationType,
    PASS,
} from "../consts";
import { ICardsInfo } from "../types";

export class Cards {
    /** 0 ~ set * 54 - 1 */
    public static GetShuffledCards(setCount: number) {
        const cards = Cards.GetCardsBySetCount(setCount);
        return Cards.Shuffle(cards);
    }

    public static GetCardsInfo(
        cards: number[],
        priorityType?: CombinationType
    ): ICardsInfo {
        if (cards === PASS || cards.length === 0) {
            return {
                type: CombinationType.Invalid,
                base: 0,
                order: 0,
                range: 0,
                cards: [],
            };
        }
        const points = cards.map((id) => Cards.GetCardPointById(id));
        const type = Cards.GetCardsType(points, priorityType);
        const order = points.length;
        const { range, base } = Cards.GetCardsRangeValue(type, points);
        return { type, base, range, order, cards };
    }

    /**
     * 检查出牌要不要
     * @param $current 对象按引用传递，内部会修改其value
     * @param recent 要counter的牌
     * @returns 要不要得起
     */
    public static CheckCombinationCounter(
        $current: ICardsInfo,
        recent: ICardsInfo
    ): boolean {
        // 牌型不合法，打咩
        if ($current.type === CombinationType.Invalid) {
            return false;
        }
        // 首家出牌，整大的
        if (recent === PASS) {
            $current.value = $current.base + $current.range;
            return true;
        }
        // 康康是不是炸弹
        if ($current.type === CombinationType.Bomb) {
            return Cards.CheckBombCounter($current, recent);
        }
        // 不是炸弹，牌型不一样，寄
        if ($current.type !== recent.type) {
            return false;
        }
        // 阶数不一样，寄
        if ($current.order !== recent.order) {
            return false;
        }
        // 看看是不是连子
        if ($current.type >= CombinationType.Sequence) {
            return Cards.CheckSequenceCounter($current, recent);
        }
        // 平凡无奇的牌
        return Cards.CheckNumberCounter($current, recent);
    }

    public static SortCardByPoint(id1: number, id2: number): number {
        const p1 = Cards.GetCardPointById(id1);
        const p2 = Cards.GetCardPointById(id2);
        return p1 - p2 || id1 - id2;
    }

    // ================================= card set =================================

    private static Shuffle(arr: number[], random: () => number = Math.random) {
        return arr.sort(() => 0.5 - random());
    }

    private static GetSingleSet() {
        return Array(CARD_COUNT_IN_ONE_SET)
            .fill(0)
            .map((zero, index) => index);
    }

    private static GetCardsBySetCount(setCount: number) {
        const cards: number[] = [];
        Array(setCount)
            .fill(Cards.GetSingleSet())
            .forEach((setCards: number[], setIndex) => {
                cards.push(
                    ...setCards.map(
                        (cardId) => cardId + setIndex * CARD_COUNT_IN_ONE_SET
                    )
                );
            });
        return cards;
    }

    private static GetPointCount(points: CardPoint[]): number[] {
        const count = Array(CardPoint.RedJoker + 1).fill(0);
        points.forEach((p) => count[p]++);
        return count;
    }

    // ================================= single card =================================

    public static GetCardPointById(cardId: number): CardPoint {
        const singledId = cardId % CARD_COUNT_IN_ONE_SET;
        if (singledId === CARD_COUNT_IN_ONE_SET - 2) {
            return CardPoint.BlackJoker;
        }
        if (singledId === CARD_COUNT_IN_ONE_SET - 1) {
            return CardPoint.RedJoker;
        }
        return singledId % 13;
    }

    public static GetCardSuitById(cardId: number): CardSuit {
        const singledId = cardId % CARD_COUNT_IN_ONE_SET;
        if (singledId >= CARD_COUNT_IN_ONE_SET - 2) {
            return CardSuit.None;
        }
        return ~~(singledId / 13) + 1;
    }

    // ================================= joker card =================================

    private static GetJokerCount(points: CardPoint[]): number {
        return points.filter((p) => p >= CardPoint.BlackJoker).length;
    }

    /** 王不能单独出 */
    private static CheckJokerRule(points: CardPoint[]): boolean {
        return points.some((p) => p < CardPoint.BlackJoker);
    }
    /** 王不能单独出 */
    private static ObeyJokerRule(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const origin = descriptor.value;
        descriptor.value = function (points: CardPoint[]) {
            return Cards.CheckJokerRule(points) && origin(points);
        };
    }

    // ================================= cards info =================================

    private static GetCardsType(
        points: CardPoint[],
        priorityType?: CombinationType
    ): CombinationType {
        console.log("GetCardsType", points);
        const checkList = {
            [CombinationType.Bomb]: Cards.CheckIsBomb,
            [CombinationType.SequenceOfPairs]: Cards.CheckIsSequenceOfPairs,
            [CombinationType.Sequence]: Cards.CheckIsSequence,
            [CombinationType.Pair]: Cards.CheckIsPair,
            [CombinationType.Single]: Cards.CheckIsSingle,
        };
        /**
         * 有序的checkList属性名列表
         * @desc 需注意v8的对象中elements与properties的区别
         */
        let types = [
            CombinationType.Bomb,
            CombinationType.SequenceOfPairs,
            CombinationType.Sequence,
            CombinationType.Pair,
            CombinationType.Single,
        ];
        // undefined dose mot matter
        if (priorityType) {
            types = types.filter((t) => t !== priorityType);
            types.unshift(priorityType);
        }
        for (let index = 0; index < types.length; index++) {
            const type = types[index];
            const method = (checkList as any)[type];
            if (method?.(points)) {
                return +type as CombinationType;
            }
        }
        return CombinationType.Invalid;
    }

    private static GetCardsRangeValue(
        type: CombinationType,
        points: CardPoint[]
    ) {
        if (type === CombinationType.Sequence) {
            return Cards.GetRangeOfSequence(points);
        }
        if (type === CombinationType.SequenceOfPairs) {
            return Cards.GetRangeOfSequenceOfPairs(points);
        }
        return {
            range: 0,
            base: points.sort((a, b) => a - b)[0],
        };
    }

    // ================================= check combination =================================

    @Cards.ObeyJokerRule
    /** 是否是单牌 */
    private static CheckIsSingle(points: CardPoint[]): boolean {
        return points.length === 1;
    }

    @Cards.ObeyJokerRule
    /** 是否是对子 */
    private static CheckIsPair(points: CardPoint[]): boolean {
        const isTwo = points.length === 2;
        const isSame =
            points[0] === points[1] || Cards.GetJokerCount(points) === 1;
        return isTwo && isSame;
    }

    @Cards.ObeyJokerRule
    /** 是否是连子 */
    private static CheckIsSequence(points: CardPoint[]): boolean {
        // 最少3张
        if (points.length < 3) {
            return false;
        }
        // 最多到A
        if (points.length - 1 > CardPoint.Ace) {
            return false;
        }
        const count = Cards.GetPointCount(points);
        const numberCount = count.slice(0, CardPoint.Number2);
        // 每种牌最多一张
        if (numberCount.some((c) => c > 1)) {
            return false;
        }
        // 不连续点数不能超过王的张数
        // range - (total - joker) <= joker
        // range <= total
        const numberRange =
            numberCount.lastIndexOf(1) - numberCount.indexOf(1) + 1;
        return numberRange <= points.length;
    }

    @Cards.ObeyJokerRule
    /** 是否是连对 */
    private static CheckIsSequenceOfPairs(points: CardPoint[]): boolean {
        // 偶数张
        if (points.length % 2 !== 0) {
            return false;
        }
        // 最少4张
        if (points.length < 4) {
            return false;
        }
        // 最多到A
        if (points.length / 2 - 1 > CardPoint.Ace) {
            return false;
        }
        const count = Cards.GetPointCount(points);
        const numberCount = count.slice(0, CardPoint.Number2);
        // 每种牌最多2张
        if (numberCount.some((c) => c > 2)) {
            return false;
        }
        const countJoker = Cards.GetJokerCount(points);
        const countSingle = numberCount.filter((c) => c === 1).length;
        // 王的张数与单张的张数加起来必须为偶数
        const countFlex = countJoker + countSingle;
        if (countFlex % 2 !== 0) {
            return false;
        }
        // 萝卜坑不能比萝卜多
        const numberCountBool = numberCount.map((i) => i > 0);
        const numberRange =
            numberCountBool.lastIndexOf(true) -
            numberCountBool.indexOf(true) +
            1;
        return numberRange <= points.length / 2;
    }

    @Cards.ObeyJokerRule
    /** 是否是炸弹 */
    private static CheckIsBomb(points: CardPoint[]): boolean {
        // 最少3张
        if (points.length < 3) {
            return false;
        }
        const count = Cards.GetPointCount(points);
        const numberCount = count.slice(0, CardPoint.Number2 + 1);
        // 只能有一种点数
        return numberCount.filter((p) => p > 0).length === 1;
    }

    // ================================= check range =================================

    /** 计算连子的基数与浮动范围 */
    private static GetRangeOfSequence(points: CardPoint[]) {
        const count = Cards.GetPointCount(points);
        const numberCount = count.slice(0, CardPoint.Number2);
        const numberRange =
            numberCount.lastIndexOf(1) - numberCount.indexOf(1) + 1;
        const fullRange = points.length;
        const flex = fullRange - numberRange;
        const range = Math.min(
            // 多余王的数量
            flex,
            // 向下不超过3
            numberCount.indexOf(1) - CardPoint.Number3,
            // 向上不超过ace
            CardPoint.Ace + numberCount.lastIndexOf(1),
            // 张数不能超过12
            CardPoint.Ace + 1 - points.length
        );
        const base =
            points.sort((a, b) => a - b)[0] -
            Math.min(
                // 多余王的数量
                flex,
                // 向下不超过3
                numberCount.indexOf(1) - CardPoint.Number3
            );
        return { range, base };
    }

    /** 计算连对的基数与浮动范围 */
    private static GetRangeOfSequenceOfPairs(points: CardPoint[]) {
        const count = Cards.GetPointCount(points);
        const numberCount = count.slice(0, CardPoint.Number2);
        const numberCountBool = numberCount.map((i) => i > 0);
        const countJoker = Cards.GetJokerCount(points);
        const countSingle = numberCount.filter((c) => c === 1).length;
        const flex = (countJoker - countSingle) / 2;
        const range = Math.min(
            // 多余王的数量
            flex,
            // 向下不超过3
            numberCountBool.indexOf(true) - CardPoint.Number3,
            // 向上不超过ace
            CardPoint.Ace + numberCountBool.lastIndexOf(true),
            // 张数不能超过12 * 2
            CardPoint.Ace + 1 - points.length / 2
        );
        const base =
            points.sort((a, b) => a - b)[0] -
            Math.min(
                // 多余王的数量
                flex,
                // 向下不超过3
                numberCountBool.indexOf(true) - CardPoint.Number3
            );
        return { range, base };
    }

    // ================================= check counter =================================

    private static CheckBombCounter(
        $current: ICardsInfo,
        recent: ICardsInfo
    ): boolean {
        // 炸弹counter所有非炸弹
        if (recent.type !== CombinationType.Bomb) {
            return true;
        }
        // 张数越多越牛逼
        if ($current.order !== recent.order) {
            return $current.order > recent.order;
        }
        // 张数一样，那就比大小嘛
        return $current.base > recent.base;
    }

    private static CheckSequenceCounter(
        $current: ICardsInfo,
        recent: ICardsInfo
    ): boolean {
        const min = $current.base;
        const max = $current.base + $current.range;
        const target = recent.value! + 1;
        // 要在range范围内
        if (target < min || target > max) {
            return false;
        }
        $current.value = target;
        return true;
    }

    private static CheckNumberCounter(
        $current: ICardsInfo,
        recent: ICardsInfo
    ): boolean {
        // 2最大
        if (recent.base === CardPoint.Number2) {
            return false;
        }
        if ($current.base === CardPoint.Number2) {
            return true;
        }
        // 大1
        return $current.base === recent.base + 1;
    }
}
