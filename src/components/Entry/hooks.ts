interface ColorProps {
  '0': string; // bad
  '1': string; // normal
  '2': string; // good
}

type typeProps = '2' | '1' | '0';

const color: ColorProps = {
  '0': '#ff4d4f',
  '1': '#ffffff',
  '2': '#95de64',
};

export const useColor = (type: typeProps) => {
  return [{ style: { backgroundColor: color[type] } }];
};
