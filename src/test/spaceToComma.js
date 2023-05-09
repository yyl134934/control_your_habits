import Papa from 'papaparse';
import FileSaver from 'file-saver';

// 定义文件路径
const filePath = '../asserts/池子.csv';

/**
 * 写文件内容
 */
function saveFile(content) {
  // 将数据保存为文件
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, filePath);
}

/**
 * 更新文件
 */
export function updateFile() {
  // 读取文件
  Papa.parse(filePath, {
    header: true, // 表示 CSV 文件中有表头
    complete: (results) => {
      // 解析完成时会调用此函数
      // results.data 包含解析出来的数据
      const { data: dataArr = [] } = results;
      const fileContent = dataArr.toString();
      console.error('fileContent:', results);
      // 使用正则表达式替换空格
      const updatedContent = fileContent?.replace(/ /g, ',');

      saveFile(updatedContent);
    },
  });
}

export default { updateFile };
