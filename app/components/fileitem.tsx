import {Card} from 'react-native-paper';
import {File} from '../schema';
import {View} from 'react-native';

type FileItemProps = {
  file: File;
};
export default function FileItem({file}: FileItemProps) {
  return (
    <View style={{flex: 0.5}}>
      <Card>
        <Card.Cover
          source={{uri: 'https://nftstorage.link/ipfs/' + file.cid}}
        />
      </Card>
    </View>
  );
}
