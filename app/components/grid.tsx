import {FlexAlignType, View} from 'react-native';
import {useTheme} from 'react-native-paper';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | undefined;
interface GridProps {
  children: React.ReactNode;
  alignItems: FlexAlignType;
  justifyContent: JustifyContent;
}
export function Row({children, alignItems, justifyContent}: GridProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: alignItems,
        justifyContent: justifyContent,
      }}>
      {children}
    </View>
  );
}

export function Container({children}: {children: React.ReactNode}) {
  const theme = useTheme();
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: theme.colors.onBackground,
      }}>
      {children}
    </View>
  );
}

export function Column({children, alignItems, justifyContent}: GridProps) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: alignItems,
        justifyContent: justifyContent,
      }}>
      {children}
    </View>
  );
}
