/**
 * 获取习惯卡信息
 * @returns cardsInfo 习惯卡信息
 */
export function getCardsInfo() {
  const habitCardsStr = 'habitCards';
  const infoStr = localStorage.getItem(habitCardsStr);

  const info = JSON.parse(infoStr || '[]');

  return info;
}

export default { getCardsInfo };
