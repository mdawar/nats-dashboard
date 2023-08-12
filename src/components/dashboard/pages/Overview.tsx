import MainInfo from '~/components/dashboard/MainInfo';
import Stats from '~/components/dashboard/Stats';
import ConnectionsList from '~/components/dashboard/ConnectionsList';

export default function Overview() {
  return (
    <div>
      <MainInfo />
      <Stats />
      <ConnectionsList />
    </div>
  );
}
