import {Card} from 'react-native-paper';
import {File} from '../schema';
import {View} from 'react-native';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';

type FileItemProps = {
  file: File;
  onPreview: () => void;
};
export default function FileItem({file, onPreview}: FileItemProps) {
  return (
    <View style={{flex: 0.5, padding: 5}}>
      <Card
        mode={'outlined'}
        onPress={() => {
          onPreview();
        }}>
        <Card.Cover
          source={{uri: IPFS_GATEWAY + file.cid}}
          style={{zIndex: 1}}
        />
      </Card>
    </View>
  );
}
