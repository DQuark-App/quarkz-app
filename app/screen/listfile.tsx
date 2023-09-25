import {FAB, IconButton, useTheme} from 'react-native-paper';
import {Row} from '../components/grid';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DQService, {FileResponse} from '../service';
import {AxiosError} from 'axios';
import {useQuery, useRealm} from '../providers';
import {File} from '../schema';
import FileItem from '../components/fileitem';

export default function ListFile({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const queryFile = useQuery(File);
  const realm = useRealm();
  const files = queryFile.filtered(`albumUid = "${route.params?.albumUid}"`);

  const syncFile = async () => {
    const res = await DQService.instance.getFiles(route.params?.albumUid || '');
    const files = res.data.data as FileResponse[];
    for (const file of files) {
      realm.write(() => {
        realm.create(File, {
          cid: file.cid,
          albumUid: file.album_uid,
          createdAt: new Date(file.created_at),
        });
      });
    }
  };
  const pickImage = async () => {
    const grantedCamera = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    const grantReadMedua = await PermissionsAndroid.check(
      (Platform.Version as number) >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (grantedCamera && grantReadMedua) {
      console.log('granted');
      try {
        const image = await ImagePicker.openPicker({
          multiple: false,
          mediaType: 'photo',
          cropping: true,
        });
        const result = await DQService.instance.uploadFile(
          route.params?.albumUid || '',
          image.path,
        );

        if (result.data.status === 'success') {
          ToastAndroid.show('File uploaded', ToastAndroid.SHORT);
          syncFile();
        }
      } catch (e) {
        console.log(e);
        const error = e as AxiosError;
        const errorMessage = error.message || 'Network error';
        Alert.alert('Error', errorMessage);
      }
    } else {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        (Platform.Version as number) >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }
  };

  useEffect(() => {
    syncFile();
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
          paddingTop: 15,
          paddingRight: 15,
        }}>
        <Row alignItems={'center'} justifyContent={'flex-start'}>
          <IconButton
            icon={'chevron-left'}
            onPress={() => {
              navigation.goBack();
            }}
            size={30}
          />
          <Text
            style={{
              color: theme.colors.onBackground,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            File List
          </Text>
        </Row>
        <View style={{flex: 1, padding: 15}}>
          <FlatList
            numColumns={2}
            data={files}
            keyExtractor={item => item.cid.toString()}
            renderItem={({item}) => {
              return <FileItem file={item} />;
            }}
          />
        </View>
      </View>
      <FAB.Group
        open={open}
        icon={open ? 'close' : 'plus'}
        visible={true}
        actions={[
          {
            icon: 'file',
            label: 'Upload File',
            onPress: () => pickImage(),
          },
        ]}
        onStateChange={({open}) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </>
  );
}
