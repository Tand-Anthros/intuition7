import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { TypesStore } from "./typesStore";
import debug from "debug";
import * as fs from "fs";
import * as path from 'path';
const __dirname = path.resolve();
const log = debug("transaction");


export const createTransaction = async ({deep, Types, packageName, packageId}: {
  deep: DeepClient,
  packageName: string,
  Types: TypesStore,
  packageId: number,
}) => {
  const {
    ContainId,
    SymbolId,
    TypeId,
    StringId,
    ValueId,
    NumberId,
    SyncTextFileId,
    HandlerId,
    HandleInsertId,
    HandleUpdateId,
    dockerSupportsBunJsId,
  } = Types;
  console.log({packageName, ContainId, SymbolId, TypeId, StringId, ValueId, NumberId, SyncTextFileId, HandlerId, HandleInsertId, dockerSupportsBunJsId});

  const WalletId = await deep.id('@suenot/wallet', 'Wallet');

  // Transaction
  const { data: [{ id: TransactionId }] } = await deep.insert({
    type_id: TypeId,
    from_id: WalletId,
    to_id: WalletId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Transaction' } },
      },
    ] },
    out: { data: [
    ] },
  });
  log({TransactionId});

  // transactionValue
  const { data: [{ id: transactionValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'transactionValue' } },
      },
    ] },
    from_id: TransactionId,
    to_id: NumberId,
  });
  log({transactionValueId});

  // SymbolId (петличка от Transaction к Transaction)
  const { data: [{ id: symbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🐪' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'symbol' } },
      },
    ] },
    from_id: TransactionId,
    to_id: TransactionId,
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
    from_id: TransactionId,
    to_id: TransactionId,
  });
  log({DescriptionId});

  // descriptionSymbol
  const { data: [{ id: descriptionSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '✍️' } },
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
      value: fs.readFileSync(path.join(__dirname, 'src', 'db', 'deep', 'transaction-insert-handler.ts'), { encoding: 'utf-8' })
    } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'transactionSyncTextFile' } },
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
        string: { data: { value: 'transactionHandler' } },
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
        string: { data: { value: 'transactionHandleInsert' } },
      },
    ] },
    from_id: TransactionId,
    to_id: handlerId,
  });
  log({handleInsertId});

  // handleUpdate
  const { data: [{ id: handleUpdateId }] } = await deep.insert({
    type_id: HandleUpdateId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'transactionHandleUpdate' } },
      },
    ] },
    from_id: TransactionId,
    to_id: handlerId,
  });
  log({handleUpdateId});

  // Status
  const { data: [{ id: StatusId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Status' } },
      },
    ] },
    from_id: TransactionId,
    to_id: TransactionId,
  });
  log({StatusId});

  // statusSymbol
  const { data: [{ id: statusSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🔄' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'statusSymbol' } },
      },
    ] },
    from_id: StatusId,
    to_id: StatusId,
  });
  log({statusSymbolId});

  // statusValue
  const { data: [{ id: statusValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'statusValue' } },
      },
    ] },
    from_id: StatusId,
    to_id: StringId,
  });
  log({statusValueId});

  return {packageId, TransactionId, transactionValueId, symbolId, DescriptionId, descriptionSymbolId, descriptionValueId, syncTextFile, handlerId, handleInsertId, handleUpdateId, StatusId, statusSymbolId, statusValueId};
};

