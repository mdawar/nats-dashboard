import type { FormattedStreamDetail } from '~/lib/format';
import InfoList from '~/components/dashboard/InfoList';
import DataList from '~/components/dashboard/DataList';

interface Props {
  stream: FormattedStreamDetail;
}

export default function StreamInfo(props: Props) {
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
          [props.stream.info.isKVStore ? 'Keys (Subjects)' : 'Subjects']:
            props.stream.info.state.numSubjects.str,
          [props.stream.info.isKVStore ? 'Revisions (Messages)' : 'Messages']:
            props.stream.info.state.messages.str,
          'Data Size': props.stream.info.state.data.str,
          'Num. Deleted': props.stream.info.state.numDeleted.str,
          'First Sequence':
            props.stream.info.state.messages.num > 0
              ? props.stream.info.state.firstSeq
              : undefined,
          'Last Sequence':
            props.stream.info.state.messages.num > 0
              ? props.stream.info.state.lastSeq
              : undefined,
          'First Timestamp':
            props.stream.info.state.messages.num > 0
              ? props.stream.info.state.firstTS
              : undefined,
          'Last Timestamp':
            props.stream.info.state.messages.num > 0
              ? props.stream.info.state.lastTS
              : undefined,
        }}
      />

      <DataList
        title="Cluster"
        data={{
          Name: props.stream.cluster?.name,
          Leader: props.stream.cluster?.leader,
          Replicas: props.stream.cluster?.replicas?.length,
        }}
      />
    </div>
  );
}
