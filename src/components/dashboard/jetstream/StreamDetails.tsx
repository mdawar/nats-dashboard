import type { FormattedStreamDetail } from '~/lib/format';
import InfoList from '~/components/dashboard/InfoList';
import DataList from '~/components/dashboard/DataList';

interface Props {
  stream: FormattedStreamDetail;
}

export default function StreamDetails(props: Props) {
  return (
    <div class="space-y-6">
      <InfoList
        info={{
          Name: props.stream.name,
          Type: props.stream.info.label,
          Created: props.stream.info.created,
        }}
      />

      <DataList
        title="State"
        data={{
          Consumers: props.stream.info.state.consumerCount,
          Subjects: props.stream.info.state.numSubjects.str,
          Messages: props.stream.info.state.messages.str,
          'Data Size': props.stream.info.state.data.str,
          'Num. Deleted': props.stream.info.state.numDeleted.str,
          'First Sequence': props.stream.info.state.firstSeq,
          'Last Sequence': props.stream.info.state.lastSeq,
          'First Timestamp': props.stream.info.state.firstTS,
          'Last Timestamp': props.stream.info.state.lastTS,
        }}
      />
    </div>
  );
}
