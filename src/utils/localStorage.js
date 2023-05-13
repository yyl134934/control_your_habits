/**
 * 习惯卡key
 */
const HABIT_CARDS = 'habitCards';

// 初始化信息
export const INIT_INFO = '[{ "habitWeight":1, "habitName": "起床", "habitType": "1"}]';

/**
 * 初始化习惯卡信息, 并返回初始化信息
 * @returns cardsInfo 习惯卡信息
 */
export function initCards() {
  localStorage.setItem(HABIT_CARDS, INIT_INFO);

  console.info('初始化习惯卡信息getCardsInfo:', INIT_INFO);

  return JSON.parse(INIT_INFO);
}

/**
 * 获取习惯卡信息
 * @returns cardsInfo 习惯卡信息
 */
export function getCardsInfo() {
  const infoStr = localStorage.getItem(HABIT_CARDS);

  const info = JSON.parse(infoStr || '[]');

  console.info('获取习惯卡信息getCardsInfo:', info);

  return info;
}

const KEYS = ['habitWeight', 'habitName', 'habitType'];

/**
 * 字符串转条目对象
 * @param {*} entryInfo
 * @returns
 */
function stringToEntry(entryInfo = '') {
  const entryFields = entryInfo.split(',');
  const newEntry = {};

  for (const [index, value] of entryFields.entries()) {
    const key = KEYS[index];
    newEntry[key] = value;
  }

  return newEntry;
}

/**
 * 添加条目
 * @returns newEntryInfo 待添加条目信息
 */
export function addEntry(newEntryInfo = '') {
  const allEntry = getCardsInfo();

  const newEntry = stringToEntry(newEntryInfo);

  const newCollect = allEntry.push(newEntry);
  const newCollectStr = JSON.stringify(newCollect);

  localStorage.setItem(HABIT_CARDS, newCollectStr);
}

export default { getCardsInfo, INIT_INFO, addEntry };
