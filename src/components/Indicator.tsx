const indicatorColors = {
  gray: 'bg-gray-100 text-gray-500 dark:bg-gray-100/10 dark:text-gray-500',
  green:
    'bg-emerald-500/20 text-emerald-500 dark:bg-green-400/10 dark:text-green-400',
  red: 'bg-red-100 text-red-400 dark:bg-rose-400/10 dark:text-rose-400',
};

type IndicatorColor = keyof typeof indicatorColors;

interface Props {
  color?: IndicatorColor;
}

export default function Indicator(props: Props) {
  return (
    <div
      class="flex-none rounded-full p-1"
      classList={{
        [indicatorColors[props.color ?? 'gray']]: true,
      }}
    >
      <div class="h-2 w-2 rounded-full bg-current"></div>
    </div>
  );
}
