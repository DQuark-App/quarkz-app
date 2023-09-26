import {Card, IconButton, Menu} from 'react-native-paper';
import {File} from '../schema';
import {View} from 'react-native';
import {useState} from 'react';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';

type FileItemProps = {
  file: File;
  onPreview: () => void;
  onMint: () => void;
};
export default function FileItem({file, onPreview, onMint}: FileItemProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{flex: 0.5}}>
      <Card
        mode={'outlined'}
        onPress={() => {
          onPreview();
        }}>
        <Card.Cover source={{uri: IPFS_GATEWAY + file.cid}} />
        <Card.Actions style={{height: 30}}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                icon={'dots-vertical'}
                onPress={() => setVisible(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                setVisible(false);
                onPreview();
              }}
              title="Preview"
              leadingIcon={'magnify'}
            />
            <Menu.Item
              onPress={() => {
                setVisible(false);
                onMint();
              }}
              title="Minting"
              leadingIcon={'palette-swatch-variant'}
            />
          </Menu>
        </Card.Actions>
      </Card>
    </View>
  );
}
