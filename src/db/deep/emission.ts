import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import debug from "debug";
import * as fs from "fs";
import * as path from 'path';
const __dirname = path.resolve();
const log = debug("emission");

export const createEmission = async (
  {deep, PackageId, ContainId, JoinId, SymbolId, TypeId, NumberId, StringId, ValueId, SyncTextFileId, HandlerId, HandleInsertId, dockerSupportsBunJsId}:
  {
    deep: DeepClient,
    PackageId: number,
    ContainId: number,
    JoinId: number,
    SymbolId: number,
    TypeId: number,
    StringId: number,
    NumberId: number,
    ValueId: number,
    SyncTextFileId: number,
    HandlerId: number,
    HandleInsertId: number,
    dockerSupportsBunJsId: number
  }) => {
  
  // package
  const { data: [{ id: packageId }] } = await deep.insert({
    type_id: PackageId,
    string: { data: { value: `@suenot/emission` } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: deep.linkId,
      },
    ] },
    out: { data: [
      {
        type_id: JoinId,
        to_id: await deep.id('deep', 'users', 'packages'),
      },
      {
        type_id: JoinId,
        to_id: await deep.id('deep', 'admin'),
      },
    ] },
  });
  log({packageId});

  const AssetId = await deep.id('@suenot/asset', 'Asset');
  const WalletId = await deep.id('@suenot/wallet', 'Wallet');

  // Emission
  const { data: [{ id: EmissionId }] } = await deep.insert({
    type_id: TypeId,
    // ASK: можно добавить, что она от Asset к Wallet, а так Any к Any
    // ASK: может эмиссия это просто один из видов транзакций? Но у нее свои хендлеры (она не снимает деньги с ассета, но эту логику можно объединить в одном insert handler)
    from_id: AssetId, // AssetId,
    to_id: WalletId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Emission' } },
      },
    ] },
    out: { data: [
    ] },
  });
  log({EmissionId});

  // emissionValue
  const { data: [{ id: emissionValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'emissionValue' } },
      },
    ] },
    from_id: EmissionId,
    to_id: NumberId,
  });
  log({emissionValueId});

  // SymbolId (петличка от Emission к Emission)
  const { data: [{ id: symbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🖨️' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'symbol' } },
      },
    ] },
    from_id: EmissionId,
    to_id: EmissionId,
  });
  log({symbolId});

  // Description
  const { data: [{ id: DescriptionId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Description' } },
      },
    ] },
    from_id: EmissionId,
    to_id: EmissionId,
  });
  log({DescriptionId});

  // descriptionSymbol (петличка от Name к Name)
  const { data: [{ id: descriptionSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🔤' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'descriptionSymbol' } },
      },
    ] },
    from_id: DescriptionId,
    to_id: DescriptionId,
  });
  log({descriptionSymbolId});

  // descriptionValue
  const { data: [{ id: descriptionValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'descriptionValue' } },
      },
    ] },
    from_id: DescriptionId,
    to_id: StringId,
  });
  log({descriptionValueId});

  // syncTextFile
  const { data: [{ id: syncTextFile }] } = await deep.insert({
    type_id: SyncTextFileId,
    string: { data: {
      value: fs.readFileSync(path.join(__dirname, 'src', 'db', 'deep', 'emission-insert-handler.ts'), { encoding: 'utf-8' })
    } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'emissionSyncTextFile' } },
      },
    ] },
  });
  log({syncTextFile});

  // handler
  const { data: [{ id: handlerId }] } = await deep.insert({
    type_id: HandlerId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'emissionHandler' } },
      },
    ] },
    from_id: dockerSupportsBunJsId,
    to_id: syncTextFile,
  });
  log({handlerId});

  // handleInsert
  const { data: [{ id: handleInsertId }] } = await deep.insert({
    type_id: HandleInsertId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'emissionHandleInsert' } },
      },
    ] },
    from_id: EmissionId,
    to_id: handlerId,
  });
  log({handleInsertId});


  return {packageId, EmissionId, emissionValueId, symbolId, DescriptionId, descriptionSymbolId, descriptionValueId, syncTextFile, handlerId, handleInsertId};
};

