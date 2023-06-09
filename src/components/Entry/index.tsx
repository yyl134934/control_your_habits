import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { deleteEntryService, updateEntryService } from 'Src/services';
import { Entry } from 'Src/typings/entry';
import { deleteEntry, updateEntry } from 'Src/store/redux/entries.redux';
import './index.less';
import { useDispatch } from 'react-redux';

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

/**
 * 获取下一个符号
 * @param getNextType
 * @returns
 */
function getNextType(currentType: string) {
  switch (currentType) {
    case '-':
      return '1';
    case '=':
      return '2';
    case '+':
      return '0';
    default:
      return DEFAULT_HABIT_KEY;
  }
}

const typeProps = '0' || '1' || '2';

interface IProps {
  entryInfo: Entry;
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
function EntryComponent(props: IProps) {
  const {
    entryInfo: { habitWeight, habitName, habitType },
  } = props;
  const typeValue = SYMBOL_DIR[habitType];
  const dispatch = useDispatch();

  /**
   * 循环顺序为 = -> + -> -
   * @param currentType
   */
  const onTypeChange = () => {
    const nextType = getNextType(typeValue);
    const currentEntry: Entry = { habitWeight, habitName, habitType: nextType };

    updateEntryService(currentEntry);
    dispatch(updateEntry(currentEntry));
  };

  const handleDelete = () => {
    const currentEntry: Entry = { habitWeight, habitName, habitType };

    deleteEntryService(currentEntry);
    dispatch(deleteEntry(currentEntry));
  };

  return (
    <div className='custom_entry'>
      <div className='entry_weight'>{habitWeight}</div>
      <div className='entry_name' title={habitName}>
        {habitName}
      </div>
      <Button type='text' onClick={onTypeChange}>
        {typeValue}
      </Button>
      <Button type='text' className='entry_delete_btn' onClick={handleDelete} icon={<CloseOutlined />} />
    </div>
  );
}

export default EntryComponent;
