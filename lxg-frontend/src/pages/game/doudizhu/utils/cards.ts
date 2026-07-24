export type CardSuit = 'spade' | 'heart' | 'club' | 'diamond' | 'joker';

export type CardRank = 
  | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' 
  | 'J' | 'Q' | 'K' | 'A' | '2' | 'smallJoker' | 'bigJoker';

export interface Card {
  id: string;
  suit: CardSuit;
  rank: CardRank;
  value: number;
  deck: number;
}

export const RANK_VALUES: Record<CardRank, number> = {
  '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14, '2': 15,
  'smallJoker': 16, 'bigJoker': 17
};

export const RANK_DISPLAY: Record<CardRank, string> = {
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
  'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A', '2': '2',
  'smallJoker': '小王', 'bigJoker': '大王'
};

export const SUIT_SYMBOLS: Record<CardSuit, string> = {
  'spade': '♠',
  'heart': '♥',
  'club': '♣',
  'diamond': '♦',
  'joker': ''
};

export function createDeck(deckIndex: number): Card[] {
  const suits: CardSuit[] = ['spade', 'heart', 'club', 'diamond'];
  const ranks: CardRank[] = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
  const cards: Card[] = [];
  let id = 0;

  for (const suit of suits) {
    for (const rank of ranks) {
      cards.push({
        id: `${deckIndex}-${id++}`,
        suit,
        rank,
        value: RANK_VALUES[rank],
        deck: deckIndex
      });
    }
  }

  cards.push({
    id: `${deckIndex}-${id++}`,
    suit: 'joker',
    rank: 'smallJoker',
    value: RANK_VALUES['smallJoker'],
    deck: deckIndex
  });

  cards.push({
    id: `${deckIndex}-${id++}`,
    suit: 'joker',
    rank: 'bigJoker',
    value: RANK_VALUES['bigJoker'],
    deck: deckIndex
  });

  return cards;
}

export function createDoubleDeck(): Card[] {
  return [...createDeck(0), ...createDeck(1)];
}

export function shuffleCards(cards: Card[]): Card[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(cards: Card[]): { players: Card[][]; bottom: Card[] } {
  const shuffled = shuffleCards(cards);
  const bottom = shuffled.slice(0, 8);
  const players: Card[][] = [[], [], [], []];
  
  for (let i = 0; i < 100; i++) {
    players[i % 4].push(shuffled[8 + i]);
  }
  
  players.forEach(p => sortCards(p));
  sortCards(bottom);
  
  return { players, bottom };
}

export function sortCards(cards: Card[]): Card[] {
  return cards.sort((a, b) => a.value - b.value);
}

export function sortCardsDesc(cards: Card[]): Card[] {
  return cards.sort((a, b) => b.value - a.value);
}
