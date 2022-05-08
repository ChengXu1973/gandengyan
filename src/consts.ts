export const NICK_LENTH = 8;

/** 默认3人一副牌 */
export const PLAYER_PER_SET = 3;
/** 最少玩家数 */
export const MIN_PLAYER = 2;
/** 最大玩家数 */
export const MAX_PLAYER = 6;
/** 一副牌的张数 */
export const CARD_COUNT_IN_ONE_SET = 54;
/** 初始手牌数量 */
export const INITIAL_CARD_COUNT = 5;
/** 首家初始手牌数量 */
export const INITIAL_CARD_COUNT_BANKER = 6;
/**
 * 过牌
 * @description 不同客户端之间的Symbol无法同步，改为string
 */
// export const PASS = Symbol("PASS") as any;
export const PASS = String("symbol_pass") as any;

export const enum ConnectEvent {
    Open = "open",
    Data = "data",
    Send = "send",
    Connection = "connection",
    Error = "error",
}

export const enum UrlParamKey {
    Room = "room",
}

export const enum StorageKey {
    PeerId = "peer_id",
    NickName = "nick_name",
}

export const enum MessageType {
    Room = "room",
    Game = "game",
    Discard = "discard",
}

export const enum RequestType {
    Nick = "nick",
    Player = "user",
    Discard = "discard",
    Restart = "restart",
}

export const enum TipLevel {
    Info = "info",
    Warn = "warn",
    Error = "error",
}

/** 点数 */
export const enum CardPoint {
    Number3,
    Number4,
    Number5,
    Number6,
    Number7,
    Number8,
    Number9,
    Number10,
    Jack,
    Queen,
    King,
    Ace,
    Number2,
    BlackJoker,
    RedJoker,
}

export const TypeStr = [
    // Invalid
    "不要",
    // Single
    "一个",
    // Pair
    "一对",
    // Sequence
    "顺子",
    // SequenceOfPairs
    "连对",
    // Bomb
    "炸弹",
];

export const PointStr = [
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "J",
    "Q",
    "K",
    "A",
    "二",
    "小王",
    "大王",
];

/** 花色 */
export const enum CardSuit {
    None,
    /** 红心 */
    Heart,
    /** 黑桃 */
    Spade,
    /** 方块 */
    Diamond,
    /** 梅花 */
    Club,
}

/** 牌型 */
export const enum CombinationType {
    Invalid,
    /** 单牌 ：牌的大小以排序一一相连，前一张只能用比它大那张接，不能跳跃式接。 */
    Single,
    /** 双牌：(两张同样对牌)，规则类似单牌。对牌中22最大，可以接任何一对双牌。 */
    Pair,
    /** 顺子：3张以上(含3张)一一相邻的连牌。如出4、5、6,只能用5、6、7接牌，其余顺子均无法接牌。 */
    Sequence,
    /** 连对：两两相邻的4张以上(含4张)的牌，如：4455或JJQQKK。 */
    SequenceOfPairs,
    /** 炸弹：任何3张相同的牌即为炸弹，可以接单牌，双牌，顺子或连对 */
    Bomb,
}
