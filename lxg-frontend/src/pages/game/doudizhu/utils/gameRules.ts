import { Card, sortCards, sortCardsDesc } from './cards';

export type CardType =
  | 'single'
  | 'pair'
  | 'triple'
  | 'tripleWithSingle'
  | 'tripleWithPair'
  | 'straight'
  | 'doubleStraight'
  | 'airplane'
  | 'airplaneWithSingles'
  | 'airplaneWithPairs'
  | 'fourWithTwoSingles'
  | 'fourWithTwoPairs'
  | 'bomb'
  | 'rocket'
  | 'invalid';

export interface PlayedCards {
  cards: Card[];
  type: CardType;
  mainValue: number;
  length: number;
}

export function getValueCountMap(cards: Card[]): Map<number, number> {
  const map = new Map<number, number>();
  for (const card of cards) {
    map.set(card.value, (map.get(card.value) || 0) + 1);
  }
  return map;
}

export function getCardsByValue(cards: Card[], value: number): Card[] {
  return cards.filter(c => c.value === value);
}

export function isSingle(cards: Card[]): boolean {
  return cards.length === 1;
}

export function isPair(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  return cards[0].value === cards[1].value;
}

export function isTriple(cards: Card[]): boolean {
  if (cards.length !== 3) return false;
  return cards[0].value === cards[1].value && cards[1].value === cards[2].value;
}

export function isTripleWithSingle(cards: Card[]): boolean {
  if (cards.length !== 4) return false;
  const valueMap = getValueCountMap(cards);
  const counts = Array.from(valueMap.values()).sort((a, b) => b - a);
  return counts[0] === 3 && counts[1] === 1;
}

export function isTripleWithPair(cards: Card[]): boolean {
  if (cards.length !== 5) return false;
  const valueMap = getValueCountMap(cards);
  const counts = Array.from(valueMap.values()).sort((a, b) => b - a);
  return counts[0] === 3 && counts[1] === 2;
}

export function isStraight(cards: Card[]): boolean {
  if (cards.length < 5) return false;
  const sorted = sortCards(cards);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1].value - sorted[i].value !== 1) return false;
    if (sorted[i].value >= 15) return false;
  }
  if (sorted[sorted.length - 1].value >= 15) return false;
  return true;
}

export function isDoubleStraight(cards: Card[]): boolean {
  if (cards.length < 6 || cards.length % 2 !== 0) return false;
  const valueMap = getValueCountMap(cards);
  const values = Array.from(valueMap.keys()).sort((a, b) => a - b);
  if (values.length !== cards.length / 2) return false;
  for (const count of valueMap.values()) {
    if (count !== 2) return false;
  }
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] - values[i] !== 1) return false;
    if (values[i] >= 15) return false;
  }
  if (values[values.length - 1].valueOf() >= 15) return false;
  return true;
}

export function isBomb(cards: Card[]): boolean {
  if (cards.length !== 4) return false;
  const value = cards[0].value;
  return cards.every(c => c.value === value);
}

export function isRocket(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  const values = cards.map(c => c.value).sort((a, b) => a - b);
  return values[0] === 16 && values[1] === 17;
}

export function isFourWithTwoSingles(cards: Card[]): boolean {
  if (cards.length !== 6) return false;
  const valueMap = getValueCountMap(cards);
  const counts = Array.from(valueMap.values()).sort((a, b) => b - a);
  return counts[0] === 4 && counts[1] === 1 && counts[2] === 1;
}

export function isFourWithTwoPairs(cards: Card[]): boolean {
  if (cards.length !== 8) return false;
  const valueMap = getValueCountMap(cards);
  const counts = Array.from(valueMap.values()).sort((a, b) => b - a);
  return counts[0] === 4 && counts[1] === 2 && counts[2] === 2;
}

export function isAirplane(cards: Card[]): { isAirplane: boolean; mainValue: number; length: number } {
  if (cards.length < 6 || cards.length % 3 !== 0) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  const valueMap = getValueCountMap(cards);
  const tripleValues: number[] = [];
  for (const [value, count] of valueMap.entries()) {
    if (count === 3) {
      tripleValues.push(value);
    } else {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  tripleValues.sort((a, b) => a - b);
  if (tripleValues.length !== cards.length / 3) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  for (let i = 0; i < tripleValues.length - 1; i++) {
    if (tripleValues[i + 1] - tripleValues[i] !== 1) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
    if (tripleValues[i] >= 15) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  if (tripleValues[tripleValues.length - 1] >= 15) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  return { isAirplane: true, mainValue: tripleValues[0], length: tripleValues.length };
}

export function isAirplaneWithSingles(cards: Card[]): { isAirplane: boolean; mainValue: number; length: number } {
  if (cards.length < 8 || cards.length % 4 !== 0) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  const valueMap = getValueCountMap(cards);
  const tripleValues: number[] = [];
  let singleCount = 0;
  for (const [value, count] of valueMap.entries()) {
    if (count === 3) {
      tripleValues.push(value);
    } else if (count === 1) {
      singleCount++;
    } else {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  if (tripleValues.length === 0 || tripleValues.length !== singleCount) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  tripleValues.sort((a, b) => a - b);
  for (let i = 0; i < tripleValues.length - 1; i++) {
    if (tripleValues[i + 1] - tripleValues[i] !== 1) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
    if (tripleValues[i] >= 15) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  if (tripleValues[tripleValues.length - 1] >= 15) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  return { isAirplane: true, mainValue: tripleValues[0], length: tripleValues.length };
}

export function isAirplaneWithPairs(cards: Card[]): { isAirplane: boolean; mainValue: number; length: number } {
  if (cards.length < 10 || cards.length % 5 !== 0) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  const valueMap = getValueCountMap(cards);
  const tripleValues: number[] = [];
  let pairCount = 0;
  for (const [value, count] of valueMap.entries()) {
    if (count === 3) {
      tripleValues.push(value);
    } else if (count === 2) {
      pairCount++;
    } else {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  if (tripleValues.length === 0 || tripleValues.length !== pairCount) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  tripleValues.sort((a, b) => a - b);
  for (let i = 0; i < tripleValues.length - 1; i++) {
    if (tripleValues[i + 1] - tripleValues[i] !== 1) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
    if (tripleValues[i] >= 15) {
      return { isAirplane: false, mainValue: 0, length: 0 };
    }
  }
  if (tripleValues[tripleValues.length - 1] >= 15) {
    return { isAirplane: false, mainValue: 0, length: 0 };
  }
  return { isAirplane: true, mainValue: tripleValues[0], length: tripleValues.length };
}

export function getPlayedCardsInfo(cards: Card[]): PlayedCards {
  const sorted = sortCardsDesc([...cards]);
  
  if (isRocket(cards)) {
    return { cards: sorted, type: 'rocket', mainValue: 17, length: 2 };
  }
  
  if (isBomb(cards)) {
    return { cards: sorted, type: 'bomb', mainValue: cards[0].value, length: 4 };
  }
  
  if (isSingle(cards)) {
    return { cards: sorted, type: 'single', mainValue: cards[0].value, length: 1 };
  }
  
  if (isPair(cards)) {
    return { cards: sorted, type: 'pair', mainValue: cards[0].value, length: 2 };
  }
  
  if (isTriple(cards)) {
    return { cards: sorted, type: 'triple', mainValue: cards[0].value, length: 3 };
  }
  
  if (isTripleWithSingle(cards)) {
    const valueMap = getValueCountMap(cards);
    let mainValue = 0;
    for (const [value, count] of valueMap.entries()) {
      if (count === 3) mainValue = value;
    }
    return { cards: sorted, type: 'tripleWithSingle', mainValue, length: 4 };
  }
  
  if (isTripleWithPair(cards)) {
    const valueMap = getValueCountMap(cards);
    let mainValue = 0;
    for (const [value, count] of valueMap.entries()) {
      if (count === 3) mainValue = value;
    }
    return { cards: sorted, type: 'tripleWithPair', mainValue, length: 5 };
  }
  
  if (isStraight(cards)) {
    const sortedAsc = sortCards([...cards]);
    return { cards: sorted, type: 'straight', mainValue: sortedAsc[0].value, length: cards.length };
  }
  
  if (isDoubleStraight(cards)) {
    const valueMap = getValueCountMap(cards);
    const values = Array.from(valueMap.keys()).sort((a, b) => a - b);
    return { cards: sorted, type: 'doubleStraight', mainValue: values[0], length: cards.length };
  }
  
  const airplane = isAirplane(cards);
  if (airplane.isAirplane) {
    return { cards: sorted, type: 'airplane', mainValue: airplane.mainValue, length: airplane.length };
  }
  
  const airplaneWithSingles = isAirplaneWithSingles(cards);
  if (airplaneWithSingles.isAirplane) {
    return { cards: sorted, type: 'airplaneWithSingles', mainValue: airplaneWithSingles.mainValue, length: airplaneWithSingles.length };
  }
  
  const airplaneWithPairs = isAirplaneWithPairs(cards);
  if (airplaneWithPairs.isAirplane) {
    return { cards: sorted, type: 'airplaneWithPairs', mainValue: airplaneWithPairs.mainValue, length: airplaneWithPairs.length };
  }
  
  if (isFourWithTwoSingles(cards)) {
    const valueMap = getValueCountMap(cards);
    let mainValue = 0;
    for (const [value, count] of valueMap.entries()) {
      if (count === 4) mainValue = value;
    }
    return { cards: sorted, type: 'fourWithTwoSingles', mainValue, length: 6 };
  }
  
  if (isFourWithTwoPairs(cards)) {
    const valueMap = getValueCountMap(cards);
    let mainValue = 0;
    for (const [value, count] of valueMap.entries()) {
      if (count === 4) mainValue = value;
    }
    return { cards: sorted, type: 'fourWithTwoPairs', mainValue, length: 8 };
  }
  
  return { cards: sorted, type: 'invalid', mainValue: 0, length: 0 };
}

export function canBeat(newCards: PlayedCards, lastCards: PlayedCards | null): boolean {
  if (!lastCards) return true;
  if (newCards.type === 'invalid') return false;
  
  if (newCards.type === 'rocket') return true;
  
  if (newCards.type === 'bomb' && lastCards.type !== 'bomb' && lastCards.type !== 'rocket') {
    return true;
  }
  
  if (newCards.type === 'bomb' && lastCards.type === 'bomb') {
    return newCards.mainValue > lastCards.mainValue;
  }
  
  if (newCards.type !== lastCards.type) return false;
  if (newCards.length !== lastCards.length) return false;
  
  return newCards.mainValue > lastCards.mainValue;
}
