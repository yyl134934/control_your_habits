import { Entry } from 'Src/typings/entry';
import { objectEqual, updateObjectInArray } from 'Src/utils';

/**
 * 习惯卡key
 */
const HABIT_CARDS = 'habitCards';

// 初始化信息
export const INIT_INFO = '[{ "habitWeight":"1", "habitName": "起床", "habitType": "1"}]';

/**
 * 初始化习惯卡信息, 并返回初始化信息
 * @returns cardsInfo 习惯卡信息
 */
export function initCard() {
  localStorage.setItem(HABIT_CARDS, INIT_INFO);

  console.info('初始化习惯卡信息getCardsInfo:', INIT_INFO);

  return JSON.parse(INIT_INFO);
}

/**
 * 获取习惯卡信息
 * @returns cardsInfo 习惯卡信息
 */
export function queryCardInfo(): Entry[] {
  const infoStr = localStorage.getItem(HABIT_CARDS);

  const info = JSON.parse(infoStr || '[]');

  console.info('获取习惯卡信息getCardsInfo:', info);

  return info;
}

/**
 * 添加条目
 * @param {string} newEntryInfo - 待添加条目信息
 */
export function addEntryService(newEntry: Entry) {
  const allEntry = queryCardInfo();

  allEntry.push(newEntry);

  const newCollectStr = JSON.stringify(allEntry);
  localStorage.setItem(HABIT_CARDS, newCollectStr);

  console.info('添加习惯卡信息addEntry:', newCollectStr);
}

/**
 * 删除习惯卡信息
 * @param {string} newEntryInfo - 待删除条目信息
 */
export function deleteEntryService(entryInfo = {}) {
  console.info('删除习惯卡信息deleteEntry:', entryInfo);
  const allEntry = queryCardInfo();

  const newCollect = allEntry.filter((info) => !objectEqual(info, entryInfo));

  const newCollectStr = JSON.stringify(newCollect);
  localStorage.setItem(HABIT_CARDS, newCollectStr);
}

/**
 * 更新习惯卡信息
 * @param {string} newInfo - 待删除条目信息
 */
export function updateEntryService(newInfo = {}) {
  console.info('更新习惯卡信息updateEntry:', newInfo);
  const allEntry = queryCardInfo();

  const newCollect = updateObjectInArray(allEntry, newInfo);

  const newCollectStr = JSON.stringify(newCollect);
  localStorage.setItem(HABIT_CARDS, newCollectStr);
}
