import {Button, Card, Modal, TextInput, useTheme} from 'react-native-paper';
import {useEffect, useState} from 'react';

type AlbumModalProps = {
  previousText: string | null;
  isVisible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
};
export default function AlbumModal({
  previousText,
  isVisible,
  onOk,
  onCancel,
}: AlbumModalProps) {
  const theme = useTheme();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(previousText || '');
  }, []);

  return (
    <Modal
      theme={theme}
      visible={isVisible}
      dismissable={true}
      dismissableBackButton={true}>
      <Card style={{margin: 20}}>
        <Card.Title
          title={previousText == null ? 'Create Album' : 'Edit Album'}
        />
        <Card.Content>
          <TextInput
            placeholder={'Album Name'}
            onChangeText={setText}
            value={text}
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
