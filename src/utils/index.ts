import { Entry } from 'Src/typings/entry';
/**
 * 两个对象是否相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function objectEqual(obj1: any, obj2: any): boolean {
  // 如果obj1和obj2引用相同，则它们是相等的(object.is())
  if (obj1 === obj2) {
    return true;
  }

  // 如果obj1和obj2类型不同，则它们不相等
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // 如果obj1和obj2是基本类型，则比较它们的值
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  // 获取obj1和obj2的所有属性名
  const props1 = Object.keys(obj1);
  const props2 = Object.keys(obj2);

  // 如果属性数量不同，则它们不相等
  if (props1.length !== props2.length) {
    return false;
  }

  // 遍历所有属性，并递归深度比较它们的值
  for (const prop of props1) {
    if (!objectEqual(obj1[prop], obj2[prop])) {
      return false;
    }
  }

  return true;
}

/**
 * 更新指定对象
 * @param arr
 * @param newVal
 * @returns
 */
export function updateObjectInArray<T>(arr: T[], newVal: T): T[] {
  // 创建新数组副本
  const newArr: T[] = [...arr];

  // 查找指定属性值的对象，并替换其值
  const index = newArr.findIndex((obj) => objectEqual(obj, newVal));
  if (index !== -1) {
    newArr[index] = newVal;
  }

  // 返回新数组
  return newArr;
}

/**
 * 默认习惯类型
 */
const DEFAULT_HABIT_TYPE = '1';

/**
 * 添加默认值
 * @param {string} lastIndex
 * @param {string} entryInfoArr
 * @returns
 */
export function autoAddDefaultInfo(lastIndex: string, entryInfoStr = ''): any[] {
  const entryInfoArr = entryInfoStr.split(',');
  const len = entryInfoArr.length;
  // 公差为3，为后续条目留位置
  const commonDifference = 3;

  // 如果 entryInfoArr 长度为 3，则无需添加默认值，直接返回当前数组
  if (len === 3) {
    return entryInfoArr;
  }

  // 两种情况：1.[habitName, habitType]补齐habitWeight;2.[habitWeight,habitName]补齐habitType
  if (len === 2) {
    const firstItem = entryInfoArr[0];
    // 如果第一个元素是数字，则补齐 habitType；否则补齐 habitWeight
    if (typeof firstItem === 'number') {
      return [...entryInfoArr, DEFAULT_HABIT_TYPE];
    }

    const habitWeight = `${Number.parseInt(lastIndex, 10) + commonDifference}`;
    return [habitWeight, ...entryInfoArr];
  }

  // 不考虑habitWeight、habitType缺失的情况
  if (len === 1) {
    const habitWeight = `${Number.parseInt(lastIndex, 10) + commonDifference}`;

    return [habitWeight, ...entryInfoArr, DEFAULT_HABIT_TYPE];
  }

  // 如果 entryInfoArr 长度为 0 或者大于 3，则直接返回 entryInfoArr
  return entryInfoArr;
}

const KEYS: Array<string> = ['habitWeight', 'habitName', 'habitType'];

/**
 * 字符串转条目对象
 * @param {Array<any>} entryInfoArr
 * @returns {Entry}
 */
export function stringToEntry(entryInfoArr: Array<any>): Entry {
  const newEntry: Entry = {
    habitWeight: '',
    habitName: '',
    habitType: '1',
  };

  for (const [index, value] of entryInfoArr.entries()) {
    const key = KEYS[index];
    newEntry[key as keyof Entry] = value;
  }

  console.info('字符串转条目对象stringToEntry:', newEntry);

  return newEntry;
}
