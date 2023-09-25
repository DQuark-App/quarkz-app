import {Card, IconButton, Menu} from 'react-native-paper';
import {File} from '../schema';
import {View} from 'react-native';
import {useState} from 'react';

type FileItemProps = {
  file: File;
  onPreview: () => void;
};
export default function FileItem({file, onPreview}: FileItemProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{flex: 0.5}}>
      <Card
        mode={'outlined'}
        onPress={() => {
          onPreview();
        }}>
        <Card.Cover
          source={{uri: 'https://nftstorage.link/ipfs/' + file.cid}}
        />
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
              onPress={() => {}}
              title="Minting"
              leadingIcon={'palette-swatch-variant'}
            />
          </Menu>
        </Card.Actions>
      </Card>
    </View>
  );
}
