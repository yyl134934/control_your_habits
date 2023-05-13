# control_your_habits

前段时间看了《掌控习惯》，脑子一抽就...

## 技术栈

React17 + Webpack5 + antd4 + axios + Typescript

## 项目细节

1.本地持久化策略：localstorage
2.列：localStorage.setItem("habitCards", '[{"habit_name":"起床", "habit_type":"1"},{"habit_name":"起床", "habit_type":"1"}]');
3.转为JSON：JSON.parse(localStorage.getItem("habitCards"));
