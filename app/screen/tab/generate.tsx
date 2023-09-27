import {Text, View} from 'react-native';
import {
  Button,
  SegmentedButtons,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Column, Row} from '../../components/grid';
import {useState} from 'react';

export default function Generate() {
  const theme = useTheme();
  const [mode, setMode] = useState('standard');
  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
        }}>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 30,
            fontWeight: 'bold',
            padding: 15,
          }}>
          Create Art
        </Text>
        <Column alignItems={'stretch'} justifyContent={'flex-start'}>
          <Row alignItems={'center'} justifyContent={'flex-start'}>
            <SegmentedButtons
              value={mode}
              style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                width: 200,
              }}
              onValueChange={value => setMode(value)}
              buttons={[
                {
                  value: 'standard',
                  label: 'Standard',
                },
                {
                  value: 'hd',
                  label: 'HD',
                },
              ]}
            />
          </Row>
          <TextInput
            style={{marginRight: 10, marginLeft: 10, marginTop: 10}}
            mode={'outlined'}
            label={'Prompt'}
            multiline={true}
            numberOfLines={4}
            placeholder={'eg. A cat in a hat'}
          />
          <Text style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
            Style
          </Text>
          <Button mode={'contained'} style={{margin: 10}}>
            <Text>Generate</Text>
          </Button>
        </Column>
      </View>
    </>
  );
}
