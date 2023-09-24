import Realm from 'realm';

export class Folder extends Realm.Object<Folder> {
  public name!: string;
  public createdAt!: Date;
  public uid!: string;
  static schema = {
    name: 'Folder',
    primaryKey: 'uid',
    properties: {
      name: 'string',
      uid: 'string',
      createdAt: 'date',
    },
  };
}

export class File extends Realm.Object<File> {
  public cid!: string;
  public user_id!: string;
  public album_uid!: string;
  public createdAt!: Date;
  static schema = {
    name: 'File',
    primaryKey: 'cid',
    properties: {
      cid: 'string',
      user_id: 'string',
      album_uid: 'string',
      createdAt: 'date',
    },
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Folder, File],
};

export default realmConfig;
