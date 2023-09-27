import Realm from 'realm';

export class Folder extends Realm.Object<Folder> {
  public name!: string;
  public createdAt!: Date;
  public uid!: string;
  public userId!: string;
  public updatedAt!: Date;
  static schema = {
    name: 'Folder',
    primaryKey: 'uid',
    properties: {
      name: 'string',
      uid: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      userId: 'string',
    },
  };
}

export class File extends Realm.Object<File> {
  public cid!: string;
  public albumUid!: string;
  public createdAt!: Date;
  static schema = {
    name: 'File',
    primaryKey: 'cid',
    properties: {
      cid: 'string',
      albumUid: 'string',
      createdAt: 'date',
    },
  };
}

export class Model extends Realm.Object<File> {
  public name!: string;
  public image!: string;
  static schema = {
    name: 'Model',
    primaryKey: 'name',
    properties: {
      name: 'string',
      image: 'string',
    },
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Folder, File, Model],
};

export default realmConfig;
