import React, { useEffect, useState, SyntheticEvent } from 'react';
import * as LocalStorage from 'Utils/localStorage';
import './index.less';
import Input from 'antd/lib/input/Input';
import Entry from '../Entry';

interface IProps {
  entriesInfo: Array<any>;
}

/**
 * 获得条目列表
 * @param entriesInfo
 * @returns
 */
function getEntries(infos: Array<any>) {
  const entries = infos.map((info) => {
    return <Entry entryInfo={info} /> || [];
  });

  console.info('获得条目列表getEntries:', entries);
  return entries;
}

const handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value },
  } = event;
  console.info('添加条目:', value);

  LocalStorage.addEntry(value);
};

/**
 * 记分卡
 * @param props 卡信息
 * @returns
 */
function Card(props: IProps) {
  const { entriesInfo } = props;

  // 习惯列表
  const [entries, setEntries] = useState<Array<any>>([]);

  useEffect(() => {
    const info = entriesInfo.length === 0 ? LocalStorage.initCards() : entriesInfo;

    setEntries(getEntries(info));
  }, [entriesInfo]);

  return (
    <div className='custom_card'>
      <div className='card_entries'>
        {[...entries]}
        <Input onPressEnter={handleBlur} />
      </div>
    </div>
  );
}

export default Card;
