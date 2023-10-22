import {TouchableRipple, useTheme} from 'react-native-paper';
import {FlatList, Image, Text, View} from 'react-native';
import {Model} from '../schema';
import {useQuery} from '../providers';
type SelectorProps = {
  onSelect: (style: Model) => void;
};
export default function Styleselector({onSelect}: SelectorProps) {
  const theme = useTheme();
  const models = useQuery(Model);
  console.log(models);
  return (
    <FlatList
      style={{marginRight: 10, marginLeft: 10, marginTop: 10, width: '100%'}}
      data={models}
      numColumns={2}
      keyExtractor={data => data.name}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flex: 0.5,
              padding: 5,
              borderRadius: 10,
            }}>
            <TouchableRipple
              onPress={() => {
                onSelect(item);
              }}>
              <>
                <Image
                  style={{
                    borderRadius: 10,
                    width: '100%',
                  }}
                  source={{uri: item.image}}
                  height={150}
                />
                <Text style={{color: theme.colors.onBackground}}>
                  {item.name.replaceAll('-', ' ')}
                </Text>
              </>
            </TouchableRipple>
          </View>
        );
      }}
    />
  );
}
