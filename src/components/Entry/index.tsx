import React, { useEffect, useState } from 'react';
import * as LocalStorage from 'Utils/localStorage';
import './index.less';
import { Button } from 'antd';

// 默认习惯
const DEFAULT_HABIT_KEY = '1';
const DEFAULT_HABIT_VALUE = '=';

/**
 * - 坏习惯
 * = 一般习惯
 * + 好习惯
 */
const SYMBOL_DIR = {
  '0': '-',
  '1': '=',
  '2': '+',
};

const NEXT_SYMBOL = {
  '-': '=',
  '=': '+',
  '+': '-',
};

/**
 * 获取下一个符号
 * @param getNextType
 * @returns
 */
function getNextType(currentType: string) {
  switch (currentType) {
    case '-':
      return '=';
    case '=':
      return '+';
    case '+':
      return '-';
    default:
      return DEFAULT_HABIT_VALUE;
  }
}

interface EntryProps {
  habitWeight: number;
  habitName: string;
  habitType: '0' | '1' | '2';
}

interface IProps {
  entryInfo: EntryProps;
}

/**
 * 1.右侧习惯评分默认为 =
 * 2.循环顺序为 = -> + -> -
 * 3.数据字典0 - -，1 - =, 2 - +
 * 4.编号“1”为条目权重，数字越小权重越高，
 * 排列位置也就越靠前
 * 5.权重初始设置为公差为3的等差数列
 * 6.自定义权重
 * @param props 条目信息
 * @returns
 */
function Entry(props: IProps) {
  const {
    entryInfo: { habitWeight, habitName, habitType },
  } = props;
  const [type, setType] = useState<string>(SYMBOL_DIR[habitType]);

  /**
   * 循环顺序为 = -> + -> -
   * @param currentType
   */
  const onTypeChange = () => {
    const nextType = getNextType(type);

    setType(nextType);
  };

  return (
    <>
      <span>{habitWeight}</span>
      <span>{habitName}</span>
      <Button type='text' onClick={onTypeChange}>
        {type}
      </Button>
    </>
  );
}

export default Entry;
