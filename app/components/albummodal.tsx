import {Button, Card, Modal, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';

type CreateAlbumModalProps = {
  isVisible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
};
export default function CreateAlbumModal({
  isVisible,
  onOk,
  onCancel,
}: CreateAlbumModalProps) {
  const theme = useTheme();
  const [text, setText] = useState('');
  return (
    <Modal
      theme={theme}
      visible={isVisible}
      dismissable={true}
      dismissableBackButton={true}>
      <Card>
        <Card.Title title={'Create Album'} />
        <Card.Content>
          <TextInput
            placeholder={'Album Name'}
            onChangeText={setText}
            focusable={true}
            mode={'outlined'}
          />
        </Card.Content>
        <Card.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={() => onOk(text)}>Ok</Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
}
