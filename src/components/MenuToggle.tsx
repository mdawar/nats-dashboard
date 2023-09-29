import { BarsIcon } from '~/components/icons/Bars';
import { useMobileMenu } from '~/lib/global';

interface Props {
  class?: string;
}

export default function MenuToggle(props: Props) {
  const [_, menuActions] = useMobileMenu();

  return (
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 dark:text-white"
      classList={{
        [props.class!]: !!props.class,
      }}
      onClick={menuActions.displayMenu}
    >
      <span class="sr-only">Open sidebar</span>
      <BarsIcon class="h-6 w-6" />
    </button>
  );
}
